import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { HeartHandshake, Calendar } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Pagination from "../../components/ui/Pagination";

const PAGE_LIMIT = 10;

export default function AllFundingList() {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);

  const { data: response, isLoading } = useQuery({
    queryKey: ["allFunding", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allFunding?page=${page}&limit=${PAGE_LIMIT}`
      );
      return res.data;
    },
    placeholderData: (prev) => prev,
  });

  const allFunding = Array.isArray(response)
    ? response
    : response?.data || [];
  const pagination = Array.isArray(response) ? null : response?.pagination;

  if (isLoading) {
    return <LoadingSpinner label="Loading funding records..." />;
  }

  if (allFunding.length === 0) {
    return (
      <EmptyState
        icon={HeartHandshake}
        title="No funding records yet"
        description="Be the first to support HopePulse blood drives and community logistics."
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-3">
        {allFunding.map((item) => (
          <Card
            key={item._id}
            padding="p-4 sm:p-5"
            className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <HeartHandshake className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {item.name || "Anonymous Supporter"}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.date
                    ? format(new Date(item.date), "MMM dd, yyyy")
                    : "—"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                ${item.amount} USD
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Pagination pagination={pagination} onPageChange={setPage} />
    </div>
  );
}
