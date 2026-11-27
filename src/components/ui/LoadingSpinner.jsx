import React from "react";

export default function LoadingSpinner({ label = "Loading...", className = "" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 py-12 text-slate-500 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-rose-600" />
      {label && <p className="text-sm font-medium">{label}</p>}
    </div>
  );
}
