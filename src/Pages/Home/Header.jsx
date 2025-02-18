import React, { useContext } from "react";
import header_img from "../../assets/images/header_img.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header className="bg-gray-50 py-10">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
        {/* Left Section */}
        <div className="md:w-1/2 text-center md:text-left mt-8 sm:mt-0">
          <h1 className="text-4xl mt-10 md:mt-0 font-bold text-red-600">
            Give Blood, Save Lives
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Join the HopePulse initiative and make a difference in someone's
            life today. Your small act of kindness can bring a big change.
          </p>

          <div className="flex gap-4 mt-6 justify-center md:justify-start">
            {!user && (
              <Link to="/registration">
                <button className="btn btn-error">
                  Become a Donor
                </button>
              </Link>
            )}
            <Link to="/searchDonors">
              <button className="btn btn-success">
                Search Donors
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2">
          <img
            src={header_img}
            alt="Blood Donation"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </header>
  );
}
