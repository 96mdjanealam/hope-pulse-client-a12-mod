import { useContext, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faHome,
  faUser,
  faUsers,
  faEdit,
  faPlusCircle,
  faListAlt,
  faFileAlt,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../providers/AuthProvider";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userInfo, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin] = useAdmin();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const isSelected = (path) => {
    return location.pathname === path ? "bg-red-500/50 border-2 border-red-500" : "";
  };

  const links = (
    <>
      <ul className="text-lg">
        <li className="mb-4">
          <Link
            onClick={toggleSidebar}
            to="/"
            className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected("/")}`}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home Page
          </Link>
        </li>
        <li className="mb-4">
          <Link
            onClick={toggleSidebar}
            to="/dashboard/profile"
            className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected("/dashboard/profile")}`}
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </Link>
        </li>
        {isAdmin && (
          <li className="mb-4">
            <Link
              onClick={toggleSidebar}
              to="/dashboard/all-users"
              className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected("/dashboard/all-users")}`}
            >
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              All Users
            </Link>
          </li>
        )}
        {(isAdmin || userInfo?.role === "Volunteer") && (
          <>
            <li className="mb-4">
              <Link
                onClick={toggleSidebar}
                to="/dashboard/all-donation-requests"
                className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected("/dashboard/all-donation-requests")}`}
              >
                <FontAwesomeIcon icon={faListAlt} className="mr-2" />
                All Donation Requests
              </Link>
            </li>
            <li className="mb-4">
              <Link
                onClick={toggleSidebar}
                to="/dashboard/content-management"
                className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected("/dashboard/content-management")}`}
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Content Management
              </Link>
            </li>
          </>
        )}

        <li className="mb-4">
          <Link
            onClick={toggleSidebar}
            to="/dashboard/createDonation"
            className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected("/dashboard/createDonation")}`}
          >
            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
            Create Donation Request
          </Link>
        </li>

        {!(isAdmin || userInfo?.role === "Volunteer") && (
          <li className="mb-4">
            <Link
              onClick={toggleSidebar}
              to="/dashboard/my-donation-requests"
              className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected("/dashboard/my-donation-requests")}`}
            >
              <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
              My Donation Requests
            </Link>
          </li>
        )}
        <li className="mb-4">
          <Link
            onClick={toggleSidebar}
            to="/settings"
            className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected("/settings")}`}
          >
            <FontAwesomeIcon icon={faCogs} className="mr-2" />
            Settings
          </Link>
        </li>
      </ul>
    </>
  );

  return (
    <div className="font-ysabeau-infant flex min-h-screen bg-gray-100">
      {/* Fixed Sidebar for Desktop */}
      <aside className="bg-gray-700 text-white w-64 p-4 fixed top-0 left-0 h-full hidden md:block">
        <Link onClick={toggleSidebar} to="/dashboard">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        </Link>

        <nav>{links}</nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-x-auto md:ml-64">
        {/* Header for Mobile */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
          <Link to="/dashboard">
            <h1 className="text-lg font-bold cursor-pointer">Dashboard</h1>
          </Link>

          <button onClick={toggleSidebar}>
            <FontAwesomeIcon
              className="text-lg w-6"
              icon={isSidebarOpen ? faXmark : faBars}
            />
          </button>
        </header>

        {/* Buttons for Navigation and Logout */}
        <div className="flex justify-end p-6 mx-auto gap-4 border-b-2 border-gray-300">
          <button
            onClick={() => navigate("/")}
            className="btn btn-success btn-sm"
          >
            Go Home
          </button>
          <button
            onClick={handleLogOut}
            className="btn btn-warning btn-sm"
          >
            Log Out
          </button>
        </div>

        {/* Mobile Sidebar */}
        <aside
          id="mobileSidebar"
          className={`bg-gray-700 text-white w-64 p-4 fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <Link onClick={toggleSidebar} to="/dashboard">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          </Link>

          <nav>{links}</nav>
        </aside>

        {/* Main Content */}
        <main className="p-6 overflow-x-auto">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;