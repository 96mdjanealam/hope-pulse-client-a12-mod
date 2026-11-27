import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Shield, UserCheck, Ban, CheckCircle, Users } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Pagination from "../../components/ui/Pagination";

const PAGE_LIMIT = 10;

export default function AllUsersPage() {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);

  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allUsers?page=${page}&limit=${PAGE_LIMIT}`
      );
      return res.data;
    },
    placeholderData: (prev) => prev,
  });

  const allUsers = Array.isArray(response) ? response : response?.data || [];
  const pagination = Array.isArray(response) ? null : response?.pagination;

  const handleStatusChange = async (id, status) => {
    await axiosSecure.patch(`/user-update/status/${id}`, { status });
    await refetch();
  };

  const handleRoleChange = async (id, role) => {
    await axiosSecure.patch(`/user-update/role/${id}`, { role });
    await refetch();
  };

  return (
    <div>
      <PageHeader
        title="All Users"
        subtitle="Manage user roles and account status across HopePulse."
      />

      {isLoading ? (
        <LoadingSpinner label="Loading users..." />
      ) : allUsers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No users found"
          description="Registered users will appear here."
        />
      ) : (
        <>
          <Card padding="p-0" className="overflow-hidden">
            <div
              tabIndex={0}
              role="region"
              aria-label="All registered users"
              className="table-wrapper responsive-table"
            >
              <table>
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      User
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Role
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>
                    <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {allUsers.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-50/80">
                      <td data-label="User" className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              u.image ||
                              "https://ui-avatars.com/api/?name=" +
                                encodeURIComponent(u.name || "User")
                            }
                            alt={u.name}
                            className="h-9 w-9 rounded-full border border-slate-200 object-cover"
                          />
                          <span className="text-sm font-semibold text-slate-900">
                            {u.name}
                          </span>
                        </div>
                      </td>
                      <td data-label="Email" className="px-5 py-3.5 text-sm text-slate-600">
                        {u.email}
                      </td>
                      <td data-label="Role" className="px-5 py-3.5 text-sm">
                        <Badge>{u.role}</Badge>
                      </td>
                      <td data-label="Status" className="px-5 py-3.5 text-sm">
                        <Badge>{u.status}</Badge>
                      </td>
                      <td data-label="Actions" className="px-5 py-3.5 text-right">
                        <div className="inline-flex flex-wrap justify-end gap-1.5">
                          {u.role !== "Admin" && (
                            <Button
                              variant="secondary"
                              size="xs"
                              onClick={() => handleRoleChange(u._id, "Admin")}
                            >
                              <Shield className="h-3.5 w-3.5" aria-hidden="true" />
                              Make Admin
                            </Button>
                          )}
                          {u.role !== "Volunteer" && (
                            <Button
                              variant="secondary"
                              size="xs"
                              onClick={() =>
                                handleRoleChange(u._id, "Volunteer")
                              }
                            >
                              <UserCheck
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                              Make Volunteer
                            </Button>
                          )}
                          {u.status !== "Active" ? (
                            <Button
                              variant="success"
                              size="xs"
                              onClick={() =>
                                handleStatusChange(u._id, "Active")
                              }
                            >
                              <CheckCircle
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                              Unblock
                            </Button>
                          ) : (
                            <Button
                              variant="danger"
                              size="xs"
                              onClick={() =>
                                handleStatusChange(u._id, "Blocked")
                              }
                            >
                              <Ban className="h-3.5 w-3.5" aria-hidden="true" />
                              Block
                            </Button>
                          )}
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
