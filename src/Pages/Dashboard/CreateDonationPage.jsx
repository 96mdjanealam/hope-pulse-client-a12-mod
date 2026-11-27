import React, { useContext, useState } from "react";
import { AlertCircle, PlusCircle } from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  ALL_DISTRICTS,
  BLOOD_GROUPS,
  getUpazillasByDistrictId,
} from "../../config/constants";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

export default function CreateDonationPage() {
  const { user, userInfo } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtUpazillas, setDistrictUpazillas] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const isBlocked = userInfo?.status === "Blocked";

  const handleDistrictChange = (e) => {
    const selectedId = e.target.value;
    const found = ALL_DISTRICTS.find((item) => item.id === selectedId) || null;
    setSelectedDistrict(found);
    setDistrictUpazillas(getUpazillasByDistrictId(selectedId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBlocked) {
      Swal.fire({
        icon: "error",
        title: "Account Blocked",
        text: "You cannot create donation requests while your account is blocked.",
      });
      return;
    }

    const form = e.target;
    const donationRequest = {
      requesterEmail: form.requesterEmail.value,
      requesterName: form.requesterName.value,
      district: selectedDistrict?.name || "",
      upazilla: form.upazilla.value,
      hospital: form.hospital.value,
      recipientName: form.recipientName.value,
      bloodGroup: form.bloodGroup.value,
      fullAddress: form.fullAddress.value,
      date: form.date.value,
      time: form.time.value,
      message: form.message.value,
      donationStatus: "pending",
    };

    setSubmitting(true);
    try {
      await axiosSecure.post("/createDonationRequest", donationRequest);
      Swal.fire({
        icon: "success",
        title: "Donation request created!",
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset();
      setSelectedDistrict(null);
      setDistrictUpazillas([]);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Create Donation Request"
        subtitle="Provide accurate hospital and patient details so donors can respond quickly."
      />

      {isBlocked && (
        <div
          role="alert"
          className="mb-6 flex items-center gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Your account is blocked. You cannot create donation requests.</span>
        </div>
      )}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="req-name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Requester Name
              </label>
              <input
                id="req-name"
                name="requesterName"
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-sm text-slate-600"
              />
            </div>

            <div>
              <label
                htmlFor="req-email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Requester Email
              </label>
              <input
                id="req-email"
                name="requesterEmail"
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-sm text-slate-600"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="recipient-name"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Recipient Name
            </label>
            <input
              id="recipient-name"
              name="recipientName"
              type="text"
              required
              placeholder="Enter recipient's full name"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="req-district"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Recipient District
              </label>
              <select
                id="req-district"
                name="district"
                defaultValue=""
                required
                onChange={handleDistrictChange}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
              >
                <option value="" disabled>
                  Select district
                </option>
                {ALL_DISTRICTS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="req-upazilla"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Recipient Upazilla
              </label>
              <select
                id="req-upazilla"
                name="upazilla"
                defaultValue=""
                required
                disabled={!selectedDistrict}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 disabled:bg-slate-100 focus:border-rose-500 focus:outline-none"
              >
                <option value="" disabled>
                  Select upazilla
                </option>
                {districtUpazillas.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="req-hospital"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Hospital Name
              </label>
              <input
                id="req-hospital"
                name="hospital"
                type="text"
                required
                placeholder="e.g. Dhaka Medical College Hospital"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="req-bloodGroup"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Blood Group
              </label>
              <select
                id="req-bloodGroup"
                name="bloodGroup"
                defaultValue=""
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
              >
                <option value="" disabled>
                  Select blood group
                </option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="req-address"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Full Address
            </label>
            <input
              id="req-address"
              name="fullAddress"
              type="text"
              required
              autoComplete="street-address"
              placeholder="e.g. Zahir Raihan Rd, Dhaka"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="req-date"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Donation Date
              </label>
              <input
                id="req-date"
                name="date"
                type="date"
                required
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="req-time"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Donation Time
              </label>
              <input
                id="req-time"
                name="time"
                type="time"
                required
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="req-message"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Request Message
            </label>
            <textarea
              id="req-message"
              name="message"
              rows={3}
              required
              placeholder="Explain why blood is needed and any ward/contact instructions"
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              disabled={submitting || isBlocked}
            >
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              {submitting ? "Submitting..." : "Create Request"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
