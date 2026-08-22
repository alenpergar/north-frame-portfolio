"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { EnvelopeSimple, CheckCircle } from "@phosphor-icons/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import type { Dict } from "@/lib/i18n";

const inputClasses =
  "mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-ink placeholder:text-ink-muted/60 transition-colors focus:border-accent focus-visible:outline-none";

export function Contact({ dict }: { dict: Dict }) {
  const t = dict.contact;
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
              eyebrow={t.eyebrow}
              title={
                <>
                  {t.title.lead}{" "}
                  <span className="font-display italic text-accent">
                    {t.title.accent}
                  </span>
                </>
              }
              description={t.description}
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
