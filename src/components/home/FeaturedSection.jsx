import React from "react";
import { Droplets, HeartHandshake, Hospital, Activity } from "lucide-react";
import Card from "../ui/Card";

const FEATURES = [
  {
    icon: Droplets,
    title: "Fast Donor Matching",
    description:
      "Filter donors by blood group, district, and upazilla in seconds when every minute matters.",
  },
  {
    icon: Hospital,
    title: "Hospital-Ready Requests",
    description:
      "Create structured donation requests with hospital name, address, date, and urgency notes.",
  },
  {
    icon: Activity,
    title: "Live Status Tracking",
    description:
      "Track requests seamlessly from pending to in-progress and completed with full transparency.",
  },
  {
    icon: HeartHandshake,
    title: "Community Funding",
    description:
      "Support blood drives and emergency medical logistics through secure Stripe contributions.",
  },
];

export default function FeaturedSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-600">
          Why HopePulse
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Built for speed, trust, and saving lives
        </h2>
        <p className="mt-3 text-base text-slate-600">
          Everything donors, recipients, and volunteers need to coordinate
          life-saving blood donations without friction.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="transition-shadow duration-200 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
