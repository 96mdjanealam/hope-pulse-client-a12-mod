import React from "react";
import { Quote } from "lucide-react";
import Card from "../ui/Card";

const TESTIMONIALS = [
  {
    quote:
      "Finding O- blood at midnight felt impossible until we posted on HopePulse. Within 25 minutes a verified donor reached Dhaka Medical.",
    name: "Nusrat Jahan",
    role: "Recipient Family, Dhaka",
  },
  {
    quote:
      "I've donated four times through HopePulse. The request details are always clear, and I know exactly which hospital needs help.",
    name: "Tanvir Ahmed",
    role: "Regular Donor (A+), Chattogram",
  },
  {
    quote:
      "Coordinating blood requests for our local clinic used to take dozens of phone calls. HopePulse keeps everything organized in one place.",
    name: "Dr. Farhana Karim",
    role: "Volunteer Coordinator, Sylhet",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="border-y border-slate-200/80 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-600">
            Community Stories
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Trusted by donors and families
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <Card key={item.name} className="flex flex-col justify-between">
              <div>
                <Quote
                  className="h-6 w-6 text-rose-200"
                  aria-hidden="true"
                />
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-sm font-semibold text-slate-900">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500">{item.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
