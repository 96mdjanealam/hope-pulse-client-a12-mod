import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Eye, Droplets, Calendar, Clock, MapPin } from "lucide-react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Pagination from "../../components/ui/Pagination";

const PAGE_LIMIT = 10;

export default function PendingRequestsPage() {
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(1);

  const { data: response, isLoading } = useQuery({
    queryKey: ["pendingDonationRequests", page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/pending-donation-requests?page=${page}&limit=${PAGE_LIMIT}`
      );
      return res.data;
    },
    placeholderData: (prev) => prev,
  });

  const pendingRequests = Array.isArray(response)
    ? response
    : response?.data || [];
  const pagination = Array.isArray(response) ? null : response?.pagination;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Pending Donation Requests"
        subtitle="Urgent blood donation requests awaiting a donor response."
      />

      {isLoading ? (
        <LoadingSpinner label="Loading pending requests..." />
      ) : pendingRequests.length === 0 ? (
        <EmptyState
          icon={Droplets}
          title="No pending donation requests"
          description="There are currently no active blood donation requests."
        />
      ) : (
        <>
          <Card padding="p-0" className="overflow-hidden">
            <div
              tabIndex={0}
              role="region"
              aria-labelledby="pending-requests-caption"
              className="table-wrapper responsive-table"
            >
              <table>
                <caption id="pending-requests-caption" className="sr-only">
                  Pending blood donation requests
                </caption>
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Recipient
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Location &amp; Hospital
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Blood Group
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Date &amp; Time
                    </th>
                    <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {pendingRequests.map((request) => (
                    <tr
                      key={request._id}
                      className="transition-colors hover:bg-slate-50/80"
                    >
                      <td
                        data-label="Recipient"
                        className="px-5 py-4 text-sm font-semibold text-slate-900"
                      >
                        {request.recipientName}
                      </td>
                      <td
                        data-label="Location"
                        className="px-5 py-4 text-sm text-slate-600"
                      >
                        <div className="flex items-start gap-1.5">
                          <MapPin
                            className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                            aria-hidden="true"
                          />
                          <span>
                            {request.hospital}, {request.upazilla},{" "}
                            {request.district}
                          </span>
                        </div>
                      </td>
                      <td data-label="Blood Group" className="px-5 py-4 text-sm">
                        <Badge tone="danger">{request.bloodGroup}</Badge>
                      </td>
                      <td
                        data-label="Schedule"
                        className="px-5 py-4 text-sm text-slate-600"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar
                              className="h-3.5 w-3.5 text-slate-400"
                              aria-hidden="true"
                            />
                            {request.date}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                            {request.time}
                          </span>
                        </div>
                      </td>
                      <td data-label="Action" className="px-5 py-4 text-right">
                        <Link to={`/donation-request-details/${request._id}`}>
                          <Button variant="secondary" size="xs">
                            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Pagination pagination={pagination} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
