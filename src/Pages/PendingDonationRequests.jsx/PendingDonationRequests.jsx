import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

export default function PendingDonationRequests() {
    const axiosPublic = useAxiosPublic();
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        axiosPublic.get("/pending-donation-requests").then((res) => {
            setPendingRequests(res.data);
        });
    }, [axiosPublic]);

    return (
        <div className="container mx-auto p-4 my-4">
            {pendingRequests.length < 1 ? (
                <h1 className="text-2xl mb-4">No Pending Donation Requests found</h1>
            ) : (
                <h1 className="text-2xl font-bold mb-4">Pending Donation Requests</h1>
            )}

            <div className="overflow-x-auto rounded-xl shadow-xl">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Recipient Name</th>
                            <th className="py-2 px-4 border-b text-left">Location</th>
                            <th className="py-2 px-4 border-b text-left">Blood Group</th>
                            <th className="py-2 px-4 border-b text-left">Date</th>
                            <th className="py-2 px-4 border-b text-left">Time</th>
                            <th className="py-2 px-4 border-b text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingRequests.map((request) => (
                            <tr key={request._id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{request.recipientName}</td>
                                <td className="py-2 px-4 border-b">{`${request.district}, ${request.upazilla}, ${request.hospital}`}</td>
                                <td className="py-2 px-4 border-b">{request.bloodGroup}</td>
                                <td className="py-2 px-4 border-b">{request.date}</td>
                                <td className="py-2 px-4 border-b">{request.time}</td>
                                <td className="py-2 px-4 border-b">
                                    <Link to={`/donation-request-details/${request._id}`}>
                                        <button className="btn btn-sm btn-warning">
                                            View
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}