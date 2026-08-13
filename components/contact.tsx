"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { EnvelopeSimple, CheckCircle } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const PROJECT_TYPES = [
  "Web Design",
  "Landing Page",
  "AI Creative",
  "Not sure yet",
];

const inputClasses =
  "mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-ink placeholder:text-ink-muted/60 transition-colors focus:border-accent focus-visible:outline-none";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

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
        setError(body?.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border py-24 sm:py-32">
      <div className="absolute inset-0">
        <Image
          src="/images/restaurant.png"
          alt=""
          fill
          className="object-cover opacity-[0.08] grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/95 to-bg" />
      </div>

      <div className="container-px relative z-10 mx-auto max-w-content">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contact"
              title={
                <>
                  Let&apos;s build something{" "}
                  <span className="font-display italic text-accent">
                    premium.
                  </span>
                </>
              }
              description="Tell us about your project and we'll reply within one business day. Prefer email? Reach us directly below."
            />

            <Reveal delay={0.15} className="mt-8">
              <a
                href="mailto:hello@drypointcreative.com"
                className="inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
              >
                <EnvelopeSimple size={20} />
                hello@drypointcreative.com
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              {submitted ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-border bg-surface p-10 text-center">
                  <CheckCircle size={40} className="text-accent" />
                  <h3 className="mt-4 font-display text-2xl text-ink">
                    Message received.
                  </h3>
                  <p className="mt-2 max-w-sm text-ink-muted">
                    Thanks for reaching out — we&apos;ll follow up within one
                    business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <label className="block text-sm text-ink">
                      Name<span className="text-accent">*</span>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        className={inputClasses}
                      />
                    </label>

                    <label className="block text-sm text-ink">
                      Email<span className="text-accent">*</span>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        className={inputClasses}
                      />
                    </label>

                    <label className="block text-sm text-ink sm:col-span-2">
                      Project type
                      <select
                        name="projectType"
                        defaultValue={PROJECT_TYPES[0]}
                        className={inputClasses}
                      >
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block text-sm text-ink sm:col-span-2">
                      Message<span className="text-accent">*</span>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        className={`${inputClasses} resize-none`}
                      />
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="mt-8"
                    disabled={loading}
                  >
                    {loading ? "Sending…" : "Send Message"}
                  </Button>

                  {error ? (
                    <p role="alert" className="mt-4 text-sm text-accent">
                      {error}
                    </p>
                  ) : null}
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
