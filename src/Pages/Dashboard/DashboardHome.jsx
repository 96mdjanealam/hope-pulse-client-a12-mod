import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaUsers, FaDollarSign, FaHandHoldingHeart } from "react-icons/fa";
import useAllUsers from "../../hooks/useAllUsers";
import useAllDonationRequests from "../../hooks/useAllDonationRequests";
import useAdmin from "../../hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import useAllFunding from "../../hooks/useAllfunding";
import Chart from "./Chart";

export default function DashboardHome() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [tableData, setTableData] = useState([]);
  const allUsers = useAllUsers();
  const [allFunding] = useAllFunding();

  const fundingSum = allFunding.reduce((acc, item) => acc + item.amount, 0);

  const { data: donationRequestsDB = [] } = useQuery({
    queryKey: ["donationRequestsDB"],
    queryFn: useAllDonationRequests(),
  });

  const { userInfo } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  useEffect(() => {
    axiosSecure
      .get(`/donationRequests?email=${user?.email}`)
      .then((res) => {
        setTableData(res.data);
      })
      .catch(() => {});
  }, [axiosSecure, user?.email]);

  const handleDone = (id) => {
    axiosSecure
      .patch(`/request-status-update/${id}`, { status: "done" })
      .then(() => {
        window.location.reload();
      });
  };

  const handleCancel = (id) => {
    axiosSecure
      .patch(`/request-status-update/${id}`, { status: "canceled" })
      .then(() => {
        window.location.reload();
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/requestDelete/${id}`).then(() => {
          setTableData((prevData) =>
            prevData.filter((item) => item._id !== id)
          );
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <div>
      {user ? (
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
            Welcome {user?.displayName}
          </h2>
          {!(isAdmin || userInfo?.role === "Volunteer") && (
            <>
              {tableData.length < 1 ? (
                <p className="mb-4">
                  You don't have any blood donation requests.
                </p>
              ) : (
                <p className="mb-4">Your latest blood donation requests</p>
              )}
            </>
          )}

          {isAdmin || userInfo?.role === "Volunteer" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Total Users Card */}
              <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex items-center">
                <div className="text-blue-500 text-3xl md:text-4xl">
                  <FaUsers />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm md:text-lg font-semibold text-gray-700">
                    Total Users
                  </h3>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">
                    {allUsers.length}
                  </p>
                </div>
              </div>

              {/* Total Funding Card */}
              <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex items-center">
                <div className="text-green-500 text-3xl md:text-4xl">
                  <FaDollarSign />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm md:text-lg font-semibold text-gray-700">
                    Total Funding
                  </h3>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">
                    $ {fundingSum}
                  </p>
                </div>
              </div>

              {/* Total Blood Donation Requests Card */}
              <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex items-center">
                <div className="text-red-500 text-3xl md:text-4xl">
                  <FaHandHoldingHeart />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm md:text-lg font-semibold text-gray-700">
                    Blood Donation Requests
                  </h3>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">
                    {donationRequestsDB?.length}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {tableData.length > 0 && (
                <div className="overflow-x-auto rounded-lg shadow-sm">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase">
                          Recipient Name
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase">
                          Recipient Location
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase">
                          Donation Date
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase">
                          Donation Time
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase">
                          Blood Group
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase">
                          Donor Information
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase">
                          Donation Status
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {tableData.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {item.recipientName}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {`${item.upazilla}, ${item.district}`}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {format(new Date(item.date), "MM-dd-yyyy")}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {item.time}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {item.bloodGroup}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            {item.donorName}, <br />
                            {item.donorEmail}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                item.donationStatus === "inprogress"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : item.donationStatus === "done"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.donationStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-700">
                            <div className="flex flex-wrap gap-2">
                              {item?.donationStatus === "inprogress" && (
                                <>
                                  <button
                                    onClick={() => handleDone(item._id)}
                                    className="btn btn-xs btn-success"
                                  >
                                    Done
                                  </button>
                                  <button
                                    onClick={() => handleCancel(item._id)}
                                    className="btn btn-xs btn-warning"
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}
                              <Link to={`/dashboard/request/edit/${item._id}`}>
                                <button className="btn btn-xs btn-success">
                                  Edit
                                </button>
                              </Link>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="btn btn-error btn-xs"
                              >
                                Delete
                              </button>
                              <Link to={`/dashboard/request/view/${item._id}`}>
                                <button className="btn btn-xs btn-neutral">
                                  View
                                </button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="w-full h-24 flex items-center justify-center">
          <span className="loading loading-bars loading-md"></span>
        </div>
      )}
      <hr className="border border-t mt-4" />
      <Chart></Chart>
    </div>
  );
}