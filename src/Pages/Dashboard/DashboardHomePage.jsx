import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Users,
  DollarSign,
  Droplets,
  Check,
  X,
  Pencil,
  Trash2,
  Eye,
  PlusCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAllUsers from "../../hooks/useAllUsers";
import useAllDonationRequests from "../../hooks/useAllDonationRequests";
import useAdmin from "../../hooks/useAdmin";
import useAllFunding from "../../hooks/useAllFunding";
import FundingChart from "../../features/dashboard/FundingChart";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";

export default function DashboardHomePage() {
  const { user, userInfo } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const allUsers = useAllUsers();
  const [allFunding] = useAllFunding();
  const [isAdmin] = useAdmin();
  const fetchAllRequests = useAllDonationRequests();

  const isStaff = isAdmin || userInfo?.role === "Volunteer";
  const fundingSum = allFunding.reduce((acc, item) => acc + (item.amount || 0), 0);

  const { data: donationRequestsDB = [] } = useQuery({
    queryKey: ["donationRequestsDB"],
    queryFn: fetchAllRequests,
    enabled: Boolean(isStaff),
  });

  const { data: recentUserRequests = [], refetch: refetchUserRequests } = useQuery({
    queryKey: ["recentDonationRequests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests?email=${user?.email}`);
      return res.data;
    },
    enabled: Boolean(user?.email) && !isStaff,
  });

  const handleStatusUpdate = async (id, status) => {
    await axiosSecure.patch(`/request-status-update/${id}`, { status });
    await refetchUserRequests();
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
        await refetchUserRequests();
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
        title={`Welcome back, ${user?.displayName || "Donor"}`}
        subtitle={
          isStaff
            ? "Here is an overview of platform activity and community funding."
            : "Manage your recent blood donation requests."
        }
        action={
          <Link to="/dashboard/createDonation">
            <Button variant="primary" size="sm">
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              New Request
            </Button>
          </Link>
        }
      />

      {isStaff ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                <Users className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Total Users
                </p>
                <p className="mt-0.5 text-2xl font-bold text-slate-900">
                  {allUsers.length}
                </p>
              </div>
            </Card>

            <Card className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <DollarSign className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Total Funding
                </p>
                <p className="mt-0.5 text-2xl font-bold text-slate-900">
                  ${fundingSum.toLocaleString()}
                </p>
              </div>
            </Card>

            <Card className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                <Droplets className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Donation Requests
                </p>
                <p className="mt-0.5 text-2xl font-bold text-slate-900">
                  {donationRequestsDB.length}
                </p>
              </div>
            </Card>
          </div>

          <FundingChart />
        </div>
      ) : recentUserRequests.length === 0 ? (
        <EmptyState
          icon={Droplets}
          title="No donation requests yet"
          description="Create a blood donation request whenever you or someone you know needs urgent help."
          action={
            <Link to="/dashboard/createDonation">
              <Button variant="primary" size="sm">
                <PlusCircle className="h-4 w-4" aria-hidden="true" />
                Create Donation Request
              </Button>
            </Link>
          }
        />
      ) : (
        <Card padding="p-0" className="overflow-hidden">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-900">
              Your Latest Donation Requests
            </h2>
          </div>
          <div
            tabIndex={0}
            role="region"
            aria-label="Latest donation requests"
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
                {recentUserRequests.map((item) => (
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
                      {item.date ? format(new Date(item.date), "MMM dd, yyyy") : "—"}
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
                              onClick={() => handleStatusUpdate(item._id, "done")}
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
          <div className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-right">
            <Link
              to="/dashboard/my-donation-requests"
              className="text-xs font-semibold text-rose-600 hover:underline"
            >
              View all my requests →
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
