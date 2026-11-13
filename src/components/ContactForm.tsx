"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { site } from "@/data/projects";

export const topics = ["Internship", "Freelance website", "Collaboration", "Website samples", "Something else"] as const;
type Topic = (typeof topics)[number];

const EVENT = "enquiry:prefill";

/** A link that scrolls to the contact form and pre-selects a topic. */
export function EnquiryLink({ topic, className, children }: { topic: Topic; className?: string; children: ReactNode }) {
  return (
    <a
      href="#contact"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(EVENT, { detail: topic }))}
    >
      {children}
    </a>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border-b border-day/20 bg-transparent py-3 text-[16px] text-day placeholder:text-day/35 outline-none transition-colors focus:border-accent";

export function ContactForm() {
  const [topic, setTopic] = useState<Topic>("Internship");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      setTopic((e as CustomEvent<Topic>).detail);
      setStatus("idle");
      setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 600);
    };
    window.addEventListener(EVENT, onPrefill);
    return () => window.removeEventListener(EVENT, onPrefill);
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, topic }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex h-full min-h-[380px] flex-col justify-center rounded-[10px] border border-day/10 bg-white/[0.03] p-8" role="status">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-white">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight">Message sent.</h3>
        <p className="mt-3 text-[16px] leading-relaxed text-day/60">
          Thanks for reaching out. I&apos;ll reply to your email soon.
        </p>
        <button onClick={() => setStatus("idle")} className="pop mt-8 w-fit rounded-full border border-day/30 px-5 py-2.5 text-[14px] hover:border-day">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[10px] border border-day/10 bg-white/[0.03] p-6 md:p-8"
      aria-label="Contact form"
    >
      <p className="label text-day/50!">Send me a message</p>

      <fieldset className="mt-5">
        <legend className="text-[14px] text-day/60">I&apos;m reaching out about</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={`pop rounded-full border px-3.5 py-1.5 text-[13px] ${
                topic === t ? "border-accent bg-accent text-white" : "border-day/20 text-day/80 hover:border-day/60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Your name</span>
          <input ref={nameRef} name="name" required maxLength={80} autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="block">
          <span className="sr-only">Your email</span>
          <input name="email" type="email" required maxLength={120} autoComplete="email" placeholder="Your email" className={field} />
        </label>
      </div>
      <label className="mt-2 block">
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={4}
          placeholder="What would you like to make or talk about?"
          className={`${field} resize-none`}
        />
      </label>
      {/* honeypot: hidden from people, catches bots */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="pop glow group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-medium text-white disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
        {status === "error" && (
          <p className="text-[14px] text-day/70" role="alert">
            {error} You can also email{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
