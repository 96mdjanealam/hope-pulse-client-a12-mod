import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  MapPin,
  Hospital,
  Droplet,
  Calendar,
  Clock,
  MessageSquare,
  HeartHandshake,
} from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function DonationDetailsPage() {
  const { userInfo } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    data: donationRequest = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donationRequest", id],
    queryFn: () =>
      axiosSecure.get(`/donationRequest/${id}`).then((res) => res.data),
  });

  const handleConfirmDonation = async () => {
    setSubmitting(true);
    try {
      await axiosSecure.patch(`/request-status-update/${donationRequest._id}`, {
        status: "inprogress",
        donorName: userInfo?.name,
        donorEmail: userInfo?.email,
      });
      await refetch();
      setIsModalOpen(false);
      Swal.fire({
        icon: "success",
        title: "Donation confirmed!",
        text: "Status updated to in-progress.",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner label="Loading request details..." />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Donation Request Details"
        subtitle="Review recipient and hospital information before confirming."
        action={
          <Badge>{donationRequest.donationStatus || "pending"}</Badge>
        }
      />

      <Card className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Recipient
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {donationRequest.recipientName}
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-rose-50 px-4 py-2.5 text-rose-700">
            <Droplet className="h-5 w-5" aria-hidden="true" />
            <span className="text-lg font-bold">
              {donationRequest.bloodGroup}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-slate-400" aria-hidden="true" />
            <div>
              <p className="text-xs font-medium text-slate-500">Location</p>
              <p className="text-sm font-medium text-slate-900">
                {donationRequest.upazilla}, {donationRequest.district}
              </p>
              {donationRequest.fullAddress && (
                <p className="text-xs text-slate-500">
                  {donationRequest.fullAddress}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Hospital
              className="mt-0.5 h-5 w-5 text-slate-400"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-medium text-slate-500">Hospital</p>
              <p className="text-sm font-medium text-slate-900">
                {donationRequest.hospital}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar
              className="mt-0.5 h-5 w-5 text-slate-400"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-medium text-slate-500">
                Donation Date
              </p>
              <p className="text-sm font-medium text-slate-900">
                {donationRequest.date}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 text-slate-400" aria-hidden="true" />
            <div>
              <p className="text-xs font-medium text-slate-500">
                Donation Time
              </p>
              <p className="text-sm font-medium text-slate-900">
                {donationRequest.time}
              </p>
            </div>
          </div>
        </div>

        {donationRequest.message && (
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
              Request Message
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
              {donationRequest.message}
            </p>
          </div>
        )}

        <div className="flex justify-end border-t border-slate-100 pt-4">
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            disabled={donationRequest.donationStatus !== "pending"}
          >
            <HeartHandshake className="h-4 w-4" aria-hidden="true" />
            {donationRequest.donationStatus === "pending"
              ? "Donate Blood"
              : `Status: ${donationRequest.donationStatus}`}
          </Button>
        </div>
      </Card>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Blood Donation"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Confirming will assign you as the donor and update this request to{" "}
            <strong>in-progress</strong>.
          </p>
          <div>
            <label
              htmlFor="confirm-donor-name"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Donor Name
            </label>
            <input
              id="confirm-donor-name"
              type="text"
              value={userInfo?.name || ""}
              readOnly
              className="w-full rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-sm text-slate-700"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-donor-email"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Donor Email
            </label>
            <input
              id="confirm-donor-email"
              type="email"
              value={userInfo?.email || ""}
              readOnly
              className="w-full rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-sm text-slate-700"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="secondary"
              size="sm"
              autoFocus
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={submitting}
              onClick={handleConfirmDonation}
            >
              {submitting ? "Confirming..." : "Confirm Donation"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
