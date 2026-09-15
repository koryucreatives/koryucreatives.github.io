"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Reveal } from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { sendContactEmail } from "@/lib/actions";

type FormState = {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  businessType: "",
  message: "",
};

const BUSINESS_TYPES = [
  "Retail / E-commerce",
  "Home & Trade Services",
  "Restaurant / Hospitality",
  "Health & Wellness",
  "Professional Services",
  "Other",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(state: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!state.name.trim()) errors.name = "Tell us your name.";
  if (!state.email.trim()) {
    errors.email = "We'll need an email to reach you.";
  } else if (!EMAIL_RE.test(state.email)) {
    errors.email = "That email doesn't look quite right.";
  }
  if (!state.businessType) errors.businessType = "Pick the closest fit.";
  if (!state.message.trim()) errors.message = "Tell us a bit about the project.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    const result = await sendContactEmail(form);
    setStatus(result.success ? "success" : "error");
  }

  function resetForm() {
    setForm(INITIAL_STATE);
    setErrors({});
    setStatus("idle");
  }

  return (
    <section id="contact" className="relative bg-ink-900 px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-content">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="label">Start Your Transformation</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-ink-50">
                Let&rsquo;s build the story your business deserves.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md leading-relaxed text-ink-400">
                Tell us where things stand today. We&rsquo;ll follow up with a
                straightforward read on what your digital presence needs:
                no jargon, no pressure.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-12 space-y-6 border-t border-ink-50/10 pt-8">
                <div>
                  <span className="label">Email</span>
                  <a
                    href="mailto:contactus@koryucreatives.com"
                    data-cursor="link"
                    className="mt-2 block text-lg text-ink-200 transition-colors hover:text-ink-50"
                  >
                    contactus@koryucreatives.com
                  </a>
                </div>
                <div>
                  <span className="label">Elsewhere</span>
                  <div className="mt-2 flex gap-5">
                    {["Instagram", "LinkedIn", "TikTok"].map((social) => (
                      <a
                        key={social}
                        href="#"
                        data-cursor="link"
                        className="text-sm text-ink-300 underline decoration-ink-600 underline-offset-4 transition-colors hover:text-ink-50"
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-ink-50/10 bg-ink-950/60 p-8 sm:p-10">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex min-h-[320px] flex-col items-center justify-center text-center"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ink-50/30">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <motion.path
                          d="M4 12.5L9.5 18L20 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-ink-50"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        />
                      </svg>
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-medium text-ink-50">
                      Message sent.
                    </h3>
                    <p className="mt-3 max-w-sm text-ink-400">
                      Thanks for reaching out. We&rsquo;ll get back to you
                      within one business day.
                    </p>
                    <button
                      type="button"
                      data-cursor="link"
                      onClick={resetForm}
                      className="mt-8 text-sm text-ink-300 underline decoration-ink-600 underline-offset-4 hover:text-ink-50"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <Field
                        label="Name"
                        error={errors.name}
                        htmlFor="contact-name"
                      >
                        <input
                          id="contact-name"
                          type="text"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          autoComplete="name"
                          className={fieldClasses(!!errors.name)}
                        />
                      </Field>

                      <Field
                        label="Email"
                        error={errors.email}
                        htmlFor="contact-email"
                      >
                        <input
                          id="contact-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          autoComplete="email"
                          className={fieldClasses(!!errors.email)}
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <Field
                        label="Phone (optional)"
                        error={errors.phone}
                        htmlFor="contact-phone"
                      >
                        <input
                          id="contact-phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          autoComplete="tel"
                          className={fieldClasses(!!errors.phone)}
                        />
                      </Field>

                      <Field
                        label="Business type"
                        error={errors.businessType}
                        htmlFor="contact-business"
                      >
                        <select
                          id="contact-business"
                          value={form.businessType}
                          onChange={(e) => update("businessType", e.target.value)}
                          className={clsx(fieldClasses(!!errors.businessType), "appearance-none")}
                        >
                          <option value="" disabled>
                            Select one
                          </option>
                          {BUSINESS_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field
                      label="Message"
                      error={errors.message}
                      htmlFor="contact-message"
                    >
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        className={clsx(fieldClasses(!!errors.message), "resize-none")}
                      />
                    </Field>

                    <MagneticButton type="submit" className="w-full sm:w-auto">
                      {status === "submitting" ? "Sending…" : "Send Message"}
                    </MagneticButton>

                    {status === "error" && (
                      <p role="alert" className="text-sm text-red-400">
                        Something went wrong sending that. Please try again, or email us directly at{" "}
                        <a href="mailto:contactus@koryucreatives.com" className="underline">
                          contactus@koryucreatives.com
                        </a>
                        .
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function fieldClasses(hasError: boolean) {
  return clsx(
    "w-full rounded-xl border bg-ink-900/60 px-4 py-3 text-ink-50 outline-none transition-colors placeholder:text-ink-600",
    "focus:border-ink-50/60",
    hasError ? "border-red-400/50" : "border-ink-50/15"
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label mb-2 block">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
