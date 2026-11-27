import React from "react";
import { Link } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";
import Button from "../ui/Button";

export default function VolunteerSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10 lg:flex-row lg:items-center lg:py-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-rose-300">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            Become a Volunteer
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Help coordinate life-saving blood drives in your district
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Join our volunteer network to verify requests, publish awareness
            blogs, and connect hospitals with local donors faster.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <Link to="/registration">
            <Button variant="primary" size="lg">
              Get Started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
