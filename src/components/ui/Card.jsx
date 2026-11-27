import React from "react";

export default function Card({ children, className = "", padding = "p-6" }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm ${padding} ${className}`}
    >
      {children}
    </div>
  );
}
