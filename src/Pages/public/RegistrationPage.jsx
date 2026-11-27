import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import { UserPlus } from "lucide-react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import {
  ALL_DISTRICTS,
  BLOOD_GROUPS,
  getUpazillasByDistrictId,
} from "../../config/constants";
import signupLottie from "../../assets/signUpJsonlottie.json";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

export default function RegistrationPage() {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateProfileInfo, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtUpazillas, setDistrictUpazillas] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleDistrictChange = (e) => {
    const selectedId = e.target.value;
    const found = ALL_DISTRICTS.find((item) => item.id === selectedId) || null;
    setSelectedDistrict(found);
    setDistrictUpazillas(getUpazillasByDistrictId(selectedId));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.passwordConfirm.value !== form.password.value) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Please confirm your password.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", photo);
      const response = await axios.post(imageHostingApi, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.success) {
        const newUser = {
          name: form.name.value,
          email: form.email.value,
          bloodGroup: form.bloodGroup.value,
          district: selectedDistrict?.name || "",
          upazilla: form.upazilla.value,
          role: "Donor",
          status: "Active",
          image: response.data.data.display_url,
        };

        await createUser(newUser.email, form.password.value);
        await updateProfileInfo(newUser.name, newUser.image);
        await axiosPublic.post("/users", newUser);

        await Swal.fire({
          icon: "success",
          title: "Account created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: error?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        {/* Form */}
        <div className="lg:col-span-7">
          <Card className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Create a Donor Account
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Join the HopePulse network and help save lives in your area.
            </p>

            <form onSubmit={handleRegister} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="reg-name"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Full Name
                </label>
                <input
                  id="reg-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="reg-email"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="reg-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reg-bloodGroup"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Blood Group
                  </label>
                  <select
                    id="reg-bloodGroup"
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
                  htmlFor="reg-photo"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Profile Photo
                </label>
                <input
                  id="reg-photo"
                  name="profile-image"
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-rose-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-rose-700 hover:file:bg-rose-100"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="reg-district"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    District
                  </label>
                  <select
                    id="reg-district"
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
                    htmlFor="reg-upazilla"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Upazilla
                  </label>
                  <select
                    id="reg-upazilla"
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
                    htmlFor="reg-password"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>
                  <input
                    id="reg-password"
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="At least 6 characters"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reg-passwordConfirm"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="reg-passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Re-enter password"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={submitting}
              >
                <UserPlus className="h-4 w-4" aria-hidden="true" />
                {submitting ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-rose-600 hover:text-rose-700 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </Card>
        </div>

        {/* Illustration */}
        <div className="hidden justify-center lg:col-span-5 lg:flex">
          <div className="w-full max-w-sm rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
            <Lottie animationData={signupLottie} loop autoplay />
          </div>
        </div>
      </div>
    </section>
  );
}
