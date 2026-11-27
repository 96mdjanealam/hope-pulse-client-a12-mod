import React from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Who is eligible to donate blood?",
    a: "Generally, healthy adults aged 18 to 60 weighing at least 50 kg can donate blood every 3 to 4 months.",
  },
  {
    q: "How do I respond to a pending donation request?",
    a: "Visit the Donation Requests page, click View on any pending request, and confirm your donation. The request status will update to in-progress with your contact details.",
  },
  {
    q: "Is there any cost to use HopePulse?",
    a: "No. HopePulse is completely free for donors and recipients. Optional financial contributions on the Funding page help cover community blood drive logistics.",
  },
  {
    q: "How long does a blood donation take?",
    a: "The actual blood draw takes around 8–10 minutes. Including registration and a brief rest afterward, the whole visit takes about 30–45 minutes.",
  },
];

export default function FaqSection() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-600">
          FAQ
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Frequently asked questions
        </h2>
      </div>

      <div className="mt-10 space-y-3">
        {FAQS.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-900 sm:text-base">
              <span>{item.q}</span>
              <ChevronDown
                className="h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
