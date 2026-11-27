import React, { useState } from "react";
import { CreditCard, List } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import PaymentForm from "../../features/payment/PaymentForm";
import AllFundingList from "../../features/payment/AllFundingList";

export default function FundingPage() {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Community Funding"
        subtitle="Support HopePulse blood drives or view recent community contributions."
        action={
          <div
            role="tablist"
            aria-label="Funding views"
            className="inline-flex w-full rounded-xl border border-slate-200 bg-white p-1 shadow-sm sm:w-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "list"}
              onClick={() => setActiveTab("list")}
              className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors sm:flex-initial ${
                activeTab === "list"
                  ? "bg-rose-600 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <List className="h-4 w-4" aria-hidden="true" />
              All Funding
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "pay"}
              onClick={() => setActiveTab("pay")}
              className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors sm:flex-initial ${
                activeTab === "pay"
                  ? "bg-rose-600 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <CreditCard className="h-4 w-4" aria-hidden="true" />
              Make Payment
            </button>
          </div>
        }
      />

      {activeTab === "pay" ? <PaymentForm /> : <AllFundingList />}
    </div>
  );
}
