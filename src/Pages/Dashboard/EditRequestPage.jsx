import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Save } from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  ALL_DISTRICTS,
  BLOOD_GROUPS,
  getUpazillasByDistrictName,
} from "../../config/constants";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function EditRequestPage() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const [donationRequest, setDonationRequest] = useState(null);
  const [districtUpazillas, setDistrictUpazillas] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axiosSecure.get(`/donationRequest/${id}`).then((res) => {
      setDonationRequest(res.data);
      setDistrictUpazillas(getUpazillasByDistrictName(res.data?.district));
    });
  }, [axiosSecure, id]);

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrictUpazillas(getUpazillasByDistrictName(selectedDistrict));
    setDonationRequest((prev) => ({
      ...prev,
      district: selectedDistrict,
      upazilla: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axiosSecure.patch(`/requestUpdate/${id}`, donationRequest);
      if (res.data?.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Donation request updated!",
          showConfirmButton: false,
          timer: 1400,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes made",
          showConfirmButton: false,
          timer: 1400,
        });
      }
    } finally {
      setSaving(false);
    }
  };

  if (!donationRequest) {
    return <LoadingSpinner label="Loading request..." />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Edit Donation Request"
        subtitle="Update recipient, hospital, or schedule details."
      />

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="edit-req-name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Requester Name
              </label>
              <input
                id="edit-req-name"
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-sm text-slate-600"
              />
            </div>

            <div>
              <label
                htmlFor="edit-req-email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Requester Email
              </label>
              <input
                id="edit-req-email"
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-sm text-slate-600"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="edit-recipient"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Recipient Name
            </label>
            <input
              id="edit-recipient"
              type="text"
              required
              value={donationRequest.recipientName || ""}
              onChange={(e) =>
                setDonationRequest((prev) => ({
                  ...prev,
                  recipientName: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="edit-district"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Recipient District
              </label>
              <select
                id="edit-district"
                value={donationRequest.district || ""}
                onChange={handleDistrictChange}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
              >
                <option value="" disabled>
                  Select district
                </option>
                {ALL_DISTRICTS.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="edit-upazilla"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Recipient Upazilla
              </label>
              <select
                id="edit-upazilla"
                value={donationRequest.upazilla || ""}
                onChange={(e) =>
                  setDonationRequest((prev) => ({
                    ...prev,
                    upazilla: e.target.value,
                  }))
                }
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
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
                htmlFor="edit-hospital"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Hospital Name
              </label>
              <input
                id="edit-hospital"
                type="text"
                required
                value={donationRequest.hospital || ""}
                onChange={(e) =>
                  setDonationRequest((prev) => ({
                    ...prev,
                    hospital: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="edit-bloodGroup"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Blood Group
              </label>
              <select
                id="edit-bloodGroup"
                value={donationRequest.bloodGroup || ""}
                onChange={(e) =>
                  setDonationRequest((prev) => ({
                    ...prev,
                    bloodGroup: e.target.value,
                  }))
                }
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
              >
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
              htmlFor="edit-address"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Full Address
            </label>
            <input
              id="edit-address"
              type="text"
              required
              value={donationRequest.fullAddress || ""}
              onChange={(e) =>
                setDonationRequest((prev) => ({
                  ...prev,
                  fullAddress: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="edit-date"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Donation Date
              </label>
              <input
                id="edit-date"
                type="date"
                required
                value={donationRequest.date || ""}
                onChange={(e) =>
                  setDonationRequest((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="edit-time"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Donation Time
              </label>
              <input
                id="edit-time"
                type="time"
                required
                value={donationRequest.time || ""}
                onChange={(e) =>
                  setDonationRequest((prev) => ({
                    ...prev,
                    time: e.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="edit-message"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Request Message
            </label>
            <textarea
              id="edit-message"
              rows={3}
              required
              value={donationRequest.message || ""}
              onChange={(e) =>
                setDonationRequest((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" disabled={saving}>
              <Save className="h-4 w-4" aria-hidden="true" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
