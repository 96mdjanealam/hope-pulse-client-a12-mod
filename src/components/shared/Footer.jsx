import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HeartPulse, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "../ui/Button";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link
              to="/"
              className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-600 text-white">
                <HeartPulse className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                Hope<span className="text-rose-400">Pulse</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Connecting voluntary blood donors with patients and hospitals in
              real time. Every drop counts toward saving a life.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Platform
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/pending-donation-requests"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Pending Donation Requests
                </Link>
              </li>
              <li>
                <Link
                  to="/searchDonors"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Search Blood Donors
                </Link>
              </li>
              <li>
                <Link
                  to="/registration"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Community Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/payment"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Support & Funding
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Stay Updated
            </h3>
            <p className="mt-4 text-sm text-slate-400">
              Get notified about urgent blood drives and community updates.
            </p>
            {subscribed ? (
              <div
                role="status"
                className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Thanks for subscribing to HopePulse updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
                <label htmlFor="footer-newsletter" className="sr-only">
                  Email address
                </label>
                <div className="relative flex-1">
                  <Mail
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    id="footer-newsletter"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-400 focus:border-rose-500 focus:outline-none"
                  />
                </div>
                <Button type="submit" variant="primary" size="md">
                  <span className="sr-only sm:not-sr-only">Subscribe</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} HopePulse. All rights reserved.</p>
          <p>Built with care for blood donors & recipients.</p>
        </div>
      </div>
    </footer>
  );
}
