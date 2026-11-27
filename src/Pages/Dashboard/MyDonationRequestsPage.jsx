import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Check, X, Pencil, Trash2, Eye, Droplets, PlusCircle } from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Pagination from "../../components/ui/Pagination";

const PAGE_LIMIT = 10;

export default function MyDonationRequestsPage() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);

  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myDonationRequests", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allDonationRequests?email=${user?.email}&page=${page}&limit=${PAGE_LIMIT}`
      );
      return res.data;
    },
    enabled: Boolean(user?.email),
    placeholderData: (prev) => prev,
  });

  const tableData = Array.isArray(response) ? response : response?.data || [];
  const pagination = Array.isArray(response) ? null : response?.pagination;

  const handleStatusUpdate = async (id, status) => {
    await axiosSecure.patch(`/request-status-update/${id}`, { status });
    await refetch();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/requestDelete/${id}`);
        await refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Donation request has been removed.",
          icon: "success",
          showConfirmButton: false,
          timer: 1300,
        });
      }
    });
  };

  return (
    <div>
      <PageHeader
        title="My Donation Requests"
        subtitle="Track and manage every blood donation request you have submitted."
        action={
          <Link to="/dashboard/createDonation">
            <Button variant="primary" size="sm">
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              New Request
            </Button>
          </Link>
        }
      />

      {isLoading ? (
        <LoadingSpinner label="Loading your requests..." />
      ) : tableData.length === 0 ? (
        <EmptyState
          icon={Droplets}
          title="No donation requests found"
          description="You haven't submitted any blood donation requests yet."
        />
      ) : (
        <>
          <Card padding="p-0" className="overflow-hidden">
            <div
              tabIndex={0}
              role="region"
              aria-label="My donation requests"
              className="table-wrapper responsive-table"
            >
              <table>
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Recipient
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Date &amp; Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Group
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Donor
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {tableData.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/80">
                      <td
                        data-label="Recipient"
                        className="px-4 py-3.5 text-sm font-medium text-slate-900"
                      >
                        {item.recipientName}
                      </td>
                      <td
                        data-label="Location"
                        className="px-4 py-3.5 text-sm text-slate-600"
                      >
                        {item.upazilla}, {item.district}
                      </td>
                      <td
                        data-label="Schedule"
                        className="px-4 py-3.5 text-sm text-slate-600"
                      >
                        {item.date
                          ? format(new Date(item.date), "MMM dd, yyyy")
                          : "—"}
                        <span className="block text-xs text-slate-400">
                          {item.time}
                        </span>
                      </td>
                      <td data-label="Group" className="px-4 py-3.5 text-sm">
                        <Badge tone="danger">{item.bloodGroup}</Badge>
                      </td>
                      <td data-label="Donor" className="px-4 py-3.5 text-xs text-slate-600">
                        {item.donorName ? (
                          <>
                            <p className="font-medium text-slate-900">
                              {item.donorName}
                            </p>
                            <p className="text-slate-500">{item.donorEmail}</p>
                          </>
                        ) : (
                          <span className="text-slate-400">Unassigned</span>
                        )}
                      </td>
                      <td data-label="Status" className="px-4 py-3.5 text-sm">
                        <Badge>{item.donationStatus}</Badge>
                      </td>
                      <td data-label="Actions" className="px-4 py-3.5 text-right">
                        <div className="inline-flex flex-wrap justify-end gap-1.5">
                          {item.donationStatus === "inprogress" && (
                            <>
                              <Button
                                variant="success"
                                size="xs"
                                onClick={() =>
                                  handleStatusUpdate(item._id, "done")
                                }
                                title="Mark as Done"
                              >
                                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                              </Button>
                              <Button
                                variant="secondary"
                                size="xs"
                                onClick={() =>
                                  handleStatusUpdate(item._id, "canceled")
                                }
                                title="Cancel"
                              >
                                <X className="h-3.5 w-3.5" aria-hidden="true" />
                              </Button>
                            </>
                          )}
                          <Link to={`/dashboard/request/edit/${item._id}`}>
                            <Button variant="secondary" size="xs" title="Edit">
                              <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                            </Button>
                          </Link>
                          <Button
                            variant="danger"
                            size="xs"
                            onClick={() => handleDelete(item._id)}
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          </Button>
                          <Link to={`/dashboard/request/view/${item._id}`}>
                            <Button variant="ghost" size="xs" title="View">
                              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                            </Button>
                          </Link>
                        </div>
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
