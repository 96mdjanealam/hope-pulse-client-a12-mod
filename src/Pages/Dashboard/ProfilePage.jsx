import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Pencil, X, Save } from "lucide-react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  ALL_DISTRICTS,
  BLOOD_GROUPS,
  getUpazillasByDistrictId,
  getUpazillasByDistrictName,
} from "../../config/constants";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

export default function ProfilePage() {
  const { user, updateProfileInfo } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [userData, setUserData] = useState(null);
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [districtUpazillas, setDistrictUpazillas] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure.get(`/user?email=${user.email}`).then((res) => {
      const data = res.data;
      setUserData(data);
      setPhotoURL(data?.image || "");
      setSelectedDistrictName(data?.district || "");
      setDistrictUpazillas(getUpazillasByDistrictName(data?.district));
    });
  }, [user?.email, axiosSecure]);

  const handleDistrictChange = (e) => {
    const selectedId = e.target.value;
    const found = ALL_DISTRICTS.find((item) => item.id === selectedId);
    setSelectedDistrictName(found?.name || "");
    setDistrictUpazillas(getUpazillasByDistrictId(selectedId));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const form = e.target;

    try {
      let finalImageUrl = photoURL;
      if (photo) {
        const formData = new FormData();
        formData.append("image", photo);
        const imgRes = await axios.post(imageHostingApi, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (imgRes.data?.success) {
          finalImageUrl = imgRes.data.data.display_url;
        }
      }

      const updatedInfo = {
        name: form.name.value,
        bloodGroup: form.bloodGroup.value,
        district: selectedDistrictName || userData.district,
        upazilla: form.upazilla.value,
        image: finalImageUrl,
      };

      await updateProfileInfo(updatedInfo.name, updatedInfo.image);
      const res = await axiosSecure.patch(
        `/user-update/${userData._id}`,
        updatedInfo
      );

      if (res.data?.modifiedCount) {
        setUserData((prev) => ({ ...prev, ...updatedInfo }));
        setPhotoURL(finalImageUrl);
        setPhoto(null);
        setIsEditable(false);
        Swal.fire({
          icon: "success",
          title: "Profile updated!",
          showConfirmButton: false,
          timer: 1400,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes detected",
          showConfirmButton: false,
          timer: 1300,
        });
        setIsEditable(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: "Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!userData) {
    return <LoadingSpinner label="Loading profile..." />;
  }

  return (
    <div>
      <PageHeader
        title={isEditable ? "Edit Profile" : "My Profile"}
        subtitle="Manage your personal details and donor availability."
        action={
          <Button
            variant={isEditable ? "secondary" : "primary"}
            size="sm"
            onClick={() => setIsEditable((prev) => !prev)}
          >
            {isEditable ? (
              <>
                <X className="h-4 w-4" aria-hidden="true" />
                Cancel
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4" aria-hidden="true" />
                Edit Profile
              </>
            )}
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Avatar Card */}
        <Card className="flex flex-col items-center justify-center text-center lg:col-span-4">
          <img
            src={
              photoURL ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(userData.name || "User")
            }
            alt={userData.name}
            className="h-36 w-36 rounded-full border-4 border-rose-50 object-cover shadow-sm"
          />
          <h2 className="mt-4 text-lg font-bold text-slate-900">
            {userData.name}
          </h2>
          <p className="text-sm text-slate-500">{userData.email}</p>
          <div className="mt-3 flex items-center gap-2">
            <Badge>{userData.role}</Badge>
            <Badge tone="danger">{userData.bloodGroup}</Badge>
          </div>
        </Card>

        {/* Form Card */}
        <Card className="lg:col-span-8">
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label
                htmlFor="profile-name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Full Name
              </label>
              <input
                id="profile-name"
                name="name"
                type="text"
                defaultValue={userData.name}
                readOnly={!isEditable}
                required
                className={`w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none ${
                  !isEditable ? "bg-slate-100 text-slate-600" : "bg-white"
                }`}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="profile-email"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>
                <input
                  id="profile-email"
                  name="email"
                  type="email"
                  value={userData.email || ""}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-sm text-slate-500"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-bloodGroup"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Blood Group
                </label>
                <select
                  id="profile-bloodGroup"
                  name="bloodGroup"
                  defaultValue={userData.bloodGroup}
                  disabled={!isEditable}
                  required
                  className={`w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none ${
                    !isEditable ? "bg-slate-100 text-slate-600" : "bg-white"
                  }`}
                >
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="profile-district"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  District
                </label>
                <select
                  id="profile-district"
                  name="district"
                  defaultValue={
                    ALL_DISTRICTS.find((d) => d.name === userData.district)?.id ||
                    ""
                  }
                  disabled={!isEditable}
                  onChange={handleDistrictChange}
                  required
                  className={`w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none ${
                    !isEditable ? "bg-slate-100 text-slate-600" : "bg-white"
                  }`}
                >
                  {ALL_DISTRICTS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="profile-upazilla"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Upazilla
                </label>
                <select
                  id="profile-upazilla"
                  name="upazilla"
                  defaultValue={userData.upazilla}
                  disabled={!isEditable}
                  required
                  className={`w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none ${
                    !isEditable ? "bg-slate-100 text-slate-600" : "bg-white"
                  }`}
                >
                  {districtUpazillas.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {isEditable && (
              <div>
                <label
                  htmlFor="profile-photo"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Update Profile Photo (optional)
                </label>
                <input
                  id="profile-photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-rose-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-rose-700"
                />
              </div>
            )}

            {isEditable && (
              <div className="flex justify-end pt-2">
                <Button type="submit" variant="primary" disabled={saving}>
                  <Save className="h-4 w-4" aria-hidden="true" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}
