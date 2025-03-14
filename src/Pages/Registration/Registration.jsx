import React, { useContext, useEffect, useState } from "react";
import bloodDrop_img from "../../assets/images/blood_drop.png";
import districts from "../../data/districts.json";
import upazillas from "../../data/upazillas.json";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import signuplottie from '../../assets/signUpJsonlottie.json'
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function Registration() {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateProfileInfo, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const allDistricts = districts[2]?.data;
  const allUpazillas = upazillas[2]?.data;

  const [district, setDistrict] = useState({});
  // const [upazilla, setUpazilla] = useState({});
  const [photo, setPhoto] = useState(null);

  const [districtUpazillas, setDistrictUpazillas] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleDistrict = (e) => {
    e.preventDefault();
    const selectedId = e.target.value;
    const selectedDistrict = allDistricts.find(
      (item) => item.id === selectedId
    );
    const upazillas = allUpazillas.filter(
      (item) => item.district_id === selectedId
    );
    setDistrict(selectedDistrict);
    setDistrictUpazillas(upazillas);
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.passwordConfirm.value !== form.password.value) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password didn't match!",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", photo);
    try {
      const response = await axios.post(image_hosting_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        const newUser = {
          name: form.name.value,
          email: form.email.value,
          bloodGroup: form.bloodGroup.value,
          district: district.name,
          upazilla: form.upazilla.value,
          role: "Donor",
          status: "Active",
          image: response.data.data.display_url,
        };
        createUser(newUser.email, form.password.value)
          .then(() => {
            updateProfileInfo(newUser.name, newUser.image);
            axiosPublic.post("/users", newUser).then(() => {
            });
            Swal.fire({
              icon: "success",
              title: "User created successfully!",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              navigate("/");
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              showConfirmButton: false,
              timer: 1500
            });
          });
      }
    } catch (error) {
      console.error("error uploading image:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="w-full h-24 flex items-center justify-center">
          <span className="loading loading-bars loading-md"></span>
        </div>
      ) : (
        <section className="bg-gray-50 py-10">
          <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
            {/* Left Section: Form */}
            <div className="md:w-1/2 bg-white p-6  rounded-lg shadow-lg w-full mt-8 sm:mt-0">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Create an Account
              </h2>
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    autoComplete="username"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                {/* Email Input */}

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      autoComplete="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="bloodGroup"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Blood group
                    </label>
                    <select
                      name="bloodGroup"
                      id="bloodGroup"
                      defaultValue=""
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    >
                      <option value="" disabled>
                        Select your blood group
                      </option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div>
                    <label
                      htmlFor=""
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Profile Image
                    </label>
                    <input
                      id="profile-image"
                      name="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}

                <div className=" flex gap-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="district"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Your district
                    </label>
                    <select
                      id="district"
                      name="district"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      defaultValue=""
                      onChange={handleDistrict}
                      required
                    >
                      <option value="" disabled>
                        Select district
                      </option>
                      {allDistricts.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-1/2">
                    <label
                      htmlFor="upazilla"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Your upazilla
                    </label>
                    <select
                      id="upazilla"
                      name="upazilla"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                      defaultValue=""
                      // onChange={handleUpazilla}
                      required
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

                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="passwordConfirm"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    autoComplete="new-password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn w-full btn-success"
                >
                  Register
                </button>
              </form>
              <p className="text-center mt-4">
                Already a user? Please{" "}
                <Link to="/login">
                  <span className="text-blue-500 font-semibold hover:underline">
                    login.
                  </span>
                </Link>
              </p>
            </div>

           
            <div className="md:w-1/2 flex justify-center">
            <Lottie
            animationData={signuplottie} 
            loop={true}
            autoplay={true}
            style={{ width: "100%", maxWidth: "400px" }} 
          />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
