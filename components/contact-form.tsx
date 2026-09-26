"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import type { Dict } from "@/lib/i18n";

const inputClasses =
  "mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-ink placeholder:text-ink-muted/60 transition-colors focus:border-ink/60 focus-visible:outline-none aria-[invalid=true]:border-ink";

const ERROR_ID = "contact-form-error";

/**
 * The inquiry form. Posts to /api/contact, which validates every field
 * (including the project type against its allowlist) and sends through
 * Resend. Before posting, empty required fields and a malformed email are
 * caught here: they are marked aria-invalid, tied to the (localised) error
 * message, and focus moves to the first one.
 */
export function ContactForm({ dict }: { dict: Dict }) {
  const t = dict.contact;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<Set<string>>(new Set());

  // Props for a field that can be flagged: aria-invalid plus a pointer to the
  // message, and the flag clears as soon as the visitor edits the field.
  const fieldState = (name: string) => ({
    "aria-invalid": invalid.has(name) || undefined,
    "aria-describedby": invalid.has(name) ? ERROR_ID : undefined,
    onInput: () =>
      setInvalid((prev) => {
        if (!prev.has(name)) return prev;
        const next = new Set(prev);
        next.delete(name);
        return next;
      }),
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    // noValidate turns off the browser's own bubbles, not the constraint
    // checks, so checkValidity() still reports required and type="email".
    const fields = Array.from(event.currentTarget.elements).filter(
      (el): el is HTMLInputElement | HTMLTextAreaElement =>
        (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) && el.willValidate
    );
    const bad = fields.filter((el) => !el.checkValidity());
    if (bad.length) {
      setInvalid(new Set(bad.map((el) => el.name)));
      setError(t.invalid);
      bad[0]?.focus();
      return;
    }
    setInvalid(new Set());

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      projectType: formData.get("projectType"),
      message: formData.get("message"),
    };

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error || t.genericError);
        return;
      }

      setSubmitted(true);
    } catch {
      setError(t.networkError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {submitted ? (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-lg border border-border bg-surface p-10 text-center">
          <CheckCircle size={40} className="text-accent" />
          <h3 className="mt-4 text-2xl font-medium tracking-[-0.02em] text-ink">
            {t.successTitle}
          </h3>
          <p className="mt-2 max-w-sm text-ink-muted">
            {t.successBody}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <label className="block text-sm text-ink">
              {t.name}<span className="text-accent">*</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                className={inputClasses}
                {...fieldState("name")}
              />
            </label>

            <label className="block text-sm text-ink">
              {t.email}<span className="text-accent">*</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                className={inputClasses}
                {...fieldState("email")}
              />
            </label>

            <label className="block text-sm text-ink sm:col-span-2">
              {t.projectType}
              <select
                name="projectType"
                defaultValue={t.projectTypes[0]?.value}
                className={inputClasses}
              >
                {t.projectTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm text-ink sm:col-span-2">
              {t.message}<span className="text-accent">*</span>
              <textarea
                name="message"
                required
                rows={5}
                className={`${inputClasses} resize-none`}
                {...fieldState("message")}
              />
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="mt-8"
            disabled={loading}
          >
            {loading ? t.sending : t.send}
          </Button>

          {error ? (
            <p id={ERROR_ID} role="alert" className="mt-4 text-sm text-accent">
              {error}
            </p>
          ) : null}
        </form>
      )}
    </>
  );
}
