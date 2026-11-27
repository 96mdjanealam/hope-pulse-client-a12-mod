import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Button from "../ui/Button";

export default function ErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
        <AlertTriangle className="h-8 w-8" aria-hidden="true" />
      </div>
      <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-rose-600">
        404 Error
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-600">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been
        moved or removed.
      </p>
      <div className="mt-8 flex gap-3">
        <Link to="/">
          <Button variant="primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Button>
        </Link>
        <Link to="/pending-donation-requests">
          <Button variant="secondary">View Requests</Button>
        </Link>
      </div>
    </main>
  );
}
