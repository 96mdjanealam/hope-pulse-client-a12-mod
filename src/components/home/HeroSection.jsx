import React from "react";
import { Link } from "react-router-dom";
import {
  HeartPulse,
  Search,
  UserPlus,
  ShieldCheck,
  Clock,
  MapPin,
} from "lucide-react";
import Button from "../ui/Button";
import headerImg from "../../assets/images/header_img.jpg";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
        {/* Left Copy */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1.5 text-xs font-semibold text-rose-700">
            <HeartPulse className="h-3.5 w-3.5" aria-hidden="true" />
            Community Blood Donation Network
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
            Every drop of blood{" "}
            <span className="text-rose-600">gives someone</span> another
            tomorrow.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Connect directly with verified blood donors across Bangladesh,
            respond to urgent hospital requests, and help save lives in your
            community.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/registration">
              <Button variant="primary" size="lg">
                <UserPlus className="h-4 w-4" aria-hidden="true" />
                Join as a Donor
              </Button>
            </Link>
            <Link to="/searchDonors">
              <Button variant="secondary" size="lg">
                <Search className="h-4 w-4" aria-hidden="true" />
                Search Donors
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-100 pt-6">
            <div>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                <ShieldCheck className="h-4 w-4 text-rose-600" aria-hidden="true" />
                Verified
              </div>
              <p className="mt-0.5 text-xs text-slate-500">Donor profiles</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                <Clock className="h-4 w-4 text-rose-600" aria-hidden="true" />
                Real-Time
              </div>
              <p className="mt-0.5 text-xs text-slate-500">Urgent requests</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                <MapPin className="h-4 w-4 text-rose-600" aria-hidden="true" />
                64 Districts
              </div>
              <p className="mt-0.5 text-xs text-slate-500">Nationwide reach</p>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="lg:col-span-6">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-lg">
            <img
              src={headerImg}
              alt="Blood donation community support"
              className="h-[340px] w-full object-cover sm:h-[420px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-white/95 p-4 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-rose-600">
                    Need Blood Urgently?
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-slate-900">
                    Browse active pending requests near you
                  </p>
                </div>
                <Link to="/pending-donation-requests">
                  <Button variant="primary" size="sm">
                    View Requests
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
