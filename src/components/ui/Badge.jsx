import React from "react";

const TONES = {
  neutral: "bg-slate-100 text-slate-700 ring-slate-200",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  warning: "bg-amber-50 text-amber-700 ring-amber-200",
  danger: "bg-rose-50 text-rose-700 ring-rose-200",
  info: "bg-sky-50 text-sky-700 ring-sky-200",
};

export function getStatusTone(status = "") {
  const normalized = status.toLowerCase();
  if (["done", "active", "published"].includes(normalized)) return "success";
  if (["pending", "inprogress", "volunteer"].includes(normalized)) return "warning";
  if (["canceled", "blocked"].includes(normalized)) return "danger";
  if (["admin"].includes(normalized)) return "info";
  return "neutral";
}

export default function Badge({ children, tone, className = "" }) {
  const resolvedTone = tone || getStatusTone(typeof children === "string" ? children : "");
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset capitalize ${
        TONES[resolvedTone] || TONES.neutral
      } ${className}`}
    >
      {children}
    </span>
  );
}
