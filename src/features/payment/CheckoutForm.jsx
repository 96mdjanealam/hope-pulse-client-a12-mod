import React, { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { DollarSign, CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import Button from "../../components/ui/Button";

export default function CheckoutForm() {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const handleSetAmount = () => {
    const amount = parseFloat(amountInput);
    if (!isNaN(amount) && amount > 0) {
      setError("");
      setPaymentAmount(amount);
    } else {
      setPaymentAmount(null);
      setClientSecret("");
      setError("Please enter a valid donation amount greater than $0.");
    }
  };

  useEffect(() => {
    if (paymentAmount) {
      axiosSecure
        .post("/create-payment-intent", {
          donationAmount: paymentAmount,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(() => {
          setError("Unable to initialize payment. Please try again.");
        });
    }
  }, [axiosSecure, paymentAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    setError("");

    const { error: pmError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (pmError) {
      setError(pmError.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message || "Payment failed. Please try again.");
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const payment = {
        name: user?.displayName,
        email: user?.email,
        amount: paymentAmount,
        transactionId: paymentIntent.id,
        date: new Date(),
      };

      const res = await axiosSecure.post("/payments", payment);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Payment successful!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setAmountInput("");
      setPaymentAmount(null);
      setClientSecret("");
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="donation-amount"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Donation Amount (USD)
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <DollarSign
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              id="donation-amount"
              name="amount"
              type="text"
              inputMode="decimal"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder="e.g. 25"
              className="w-full rounded-xl border border-slate-300 py-2.5 pl-9 pr-3.5 text-sm text-slate-900 placeholder-slate-400 focus:border-rose-500 focus:outline-none"
            />
          </div>
          <Button type="button" variant="secondary" onClick={handleSetAmount}>
            Set Amount
          </Button>
        </div>
        {paymentAmount && (
          <p className="mt-1.5 text-xs font-medium text-emerald-700">
            Ready to contribute ${paymentAmount} USD
          </p>
        )}
      </div>

      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
          <CreditCard className="h-4 w-4 text-slate-400" aria-hidden="true" />
          Card Details
        </label>
        <div className="rounded-xl border border-slate-300 bg-white px-3.5 py-3 focus-within:border-rose-500">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "15px",
                  fontFamily: "Inter, system-ui, sans-serif",
                  color: "#0f172a",
                  "::placeholder": {
                    color: "#94a3b8",
                  },
                },
                invalid: {
                  color: "#e11d48",
                },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      {transactionId && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-sm text-emerald-800"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            Transaction ID: <strong className="font-semibold">{transactionId}</strong>
          </span>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={!stripe || !clientSecret || processing}
      >
        {processing
          ? "Processing..."
          : paymentAmount
          ? `Pay $${paymentAmount}`
          : "Set amount to pay"}
      </Button>
    </form>
  );
}
