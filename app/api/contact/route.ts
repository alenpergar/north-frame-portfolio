import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL = "alen.pergar466@gmail.com";
const FROM_EMAIL = "DRYPOINT <onboarding@resend.dev>";

const PROJECT_TYPES = ["Web Design", "Landing Page", "AI Creative", "Not sure yet"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_LENGTHS = {
  name: 200,
  email: 320,
  projectType: 50,
  message: 5000,
};

type ContactPayload = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

function validate(body: unknown): { data: ContactPayload } | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Invalid request body." };
  }

  const { name, email, projectType, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return { error: "Name is required." };
  }
  if (name.trim().length > MAX_LENGTHS.name) {
    return { error: "Name is too long." };
  }

  if (typeof email !== "string" || email.trim().length === 0) {
    return { error: "Email is required." };
  }
  const trimmedEmail = email.trim();
  if (trimmedEmail.length > MAX_LENGTHS.email || !EMAIL_RE.test(trimmedEmail)) {
    return { error: "Please enter a valid email address." };
  }

  if (typeof projectType !== "string" || !PROJECT_TYPES.includes(projectType)) {
    return { error: "Please select a valid project type." };
  }

  if (typeof message !== "string" || message.trim().length === 0) {
    return { error: "Message is required." };
  }
  if (message.trim().length > MAX_LENGTHS.message) {
    return { error: "Message is too long." };
  }

  return {
    data: {
      name: name.trim(),
      email: trimmedEmail,
      projectType,
      message: message.trim(),
    },
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email is not configured on the server." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = validate(body);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { name, email, projectType, message } = result.data;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${name} — ${projectType}`,
      text: `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        { error: "Failed to send your message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again." },
      { status: 500 }
    );
  }
}
