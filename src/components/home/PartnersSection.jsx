import React from "react";
import { Building2, Heart, Stethoscope, Shield } from "lucide-react";

const PARTNERS = [
  { name: "City Care Hospital", icon: Building2 },
  { name: "Red Crescent Youth", icon: Heart },
  { name: "MedBridge Clinics", icon: Stethoscope },
  { name: "SafeBlood Alliance", icon: Shield },
];

export default function PartnersSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
        Supported by healthcare &amp; volunteer networks
      </p>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {PARTNERS.map((partner) => {
          const Icon = partner.icon;
          return (
            <div
              key={partner.name}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-4 py-4 text-sm font-semibold text-slate-700 shadow-sm"
            >
              <Icon className="h-4 w-4 text-rose-600" aria-hidden="true" />
              <span>{partner.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
