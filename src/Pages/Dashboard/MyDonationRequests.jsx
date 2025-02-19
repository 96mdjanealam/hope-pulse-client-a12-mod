import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function MyDonationRequests() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/allDonationRequests?email=${user?.email}`)
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
      })
      
  };

  const handleCancel = (id) => {
    axiosSecure
      .patch(`/request-status-update/${id}`, { status: "canceled" })
      .then(() => {
        window.location.reload();
      })
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
        axiosSecure
          .delete(`/requestDelete/${id}`)
          .then(() => {
            setTableData((prevData) =>
              prevData.filter((item) => item._id !== id)
            );
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
      }
    });
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        My Donation Requests
      </h2>
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
          <td className="py-3 px-4 text-sm text-gray-700">{item.time}</td>
          <td className="py-3 px-4 text-sm text-gray-700">{item.bloodGroup}</td>
          <td className="py-3 px-4 text-sm text-gray-700">
            {item.donorName}, <br />
            {item.donorEmail}
          </td>
          <td className="py-3 px-4 text-sm text-gray-700">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                item.donationStatus === "inprogress"
                  ? "bg-yellow-200 text-yellow-800"
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
                    className="btn btn-warning btn-xs"
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


    </div>
  );
}