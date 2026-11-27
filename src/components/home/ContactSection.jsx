import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    e.target.reset();
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Info */}
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-600">
            Contact Us
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Have questions or urgent inquiries?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Reach out to our coordination team for hospital partnerships,
            volunteer onboarding, or blood drive support.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Helpline</p>
                <p className="text-sm text-slate-600">+880 1700-000000</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <Mail className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Email</p>
                <p className="text-sm text-slate-600">support@hopepulse.org</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Location</p>
                <p className="text-sm text-slate-600">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7">
          <Card>
            {submitted ? (
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col items-center py-8 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  Message received
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Thank you for reaching out. Our team will get back to you
                  shortly.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-5"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="How can we help?"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <Button type="submit" variant="primary" className="w-full sm:w-auto">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send Message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
