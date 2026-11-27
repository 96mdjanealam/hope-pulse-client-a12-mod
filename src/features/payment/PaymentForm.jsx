import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ShieldCheck } from "lucide-react";
import CheckoutForm from "./CheckoutForm";
import Card from "../../components/ui/Card";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

export default function PaymentForm() {
  return (
    <Card className="mx-auto max-w-xl">
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Make a Contribution
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Your support helps fund emergency blood drives and logistics.
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Stripe Secured
        </div>
      </div>

      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Card>
  );
}
