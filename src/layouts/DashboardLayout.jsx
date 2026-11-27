import React, { useContext, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  LayoutDashboard,
  User,
  Users,
  ListChecks,
  FileText,
  PlusCircle,
  ClipboardList,
  Home,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, userInfo, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAdmin] = useAdmin();

  const isStaff = isAdmin || userInfo?.role === "Volunteer";

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-rose-50 text-rose-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between">
      <div>
        {/* Brand */}
        <div className="flex items-center justify-between px-2 py-1">
          <Link
            to="/"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-600 text-white shadow-sm">
              <HeartPulse className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              Hope<span className="text-rose-600">Pulse</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Nav Links */}
        <nav aria-label="Dashboard navigation" className="mt-6 space-y-1">
          <NavLink
            to="/dashboard"
            end
            className={navItemClass}
            onClick={() => setIsSidebarOpen(false)}
          >
            <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
            Overview
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={navItemClass}
            onClick={() => setIsSidebarOpen(false)}
          >
            <User className="h-4 w-4" aria-hidden="true" />
            My Profile
          </NavLink>

          <NavLink
            to="/dashboard/createDonation"
            className={navItemClass}
            onClick={() => setIsSidebarOpen(false)}
          >
            <PlusCircle className="h-4 w-4" aria-hidden="true" />
            Create Request
          </NavLink>

          {!isStaff && (
            <NavLink
              to="/dashboard/my-donation-requests"
              className={navItemClass}
              onClick={() => setIsSidebarOpen(false)}
            >
              <ClipboardList className="h-4 w-4" aria-hidden="true" />
              My Requests
            </NavLink>
          )}

          {isAdmin && (
            <NavLink
              to="/dashboard/all-users"
              className={navItemClass}
              onClick={() => setIsSidebarOpen(false)}
            >
              <Users className="h-4 w-4" aria-hidden="true" />
              All Users
            </NavLink>
          )}

          {isStaff && (
            <>
              <NavLink
                to="/dashboard/all-donation-requests"
                className={navItemClass}
                onClick={() => setIsSidebarOpen(false)}
              >
                <ListChecks className="h-4 w-4" aria-hidden="true" />
                All Donation Requests
              </NavLink>
              <NavLink
                to="/dashboard/content-management"
                className={navItemClass}
                onClick={() => setIsSidebarOpen(false)}
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Content Management
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* Bottom User Card */}
      <div className="border-t border-slate-200 pt-4">
        <div className="mb-3 flex items-center gap-3 px-2">
          <img
            src={
              user?.photoURL ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(user?.displayName || "User")
            }
            alt={user?.displayName || "User"}
            className="h-9 w-9 rounded-full border border-slate-200 object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              {user?.displayName || "User"}
            </p>
            <div className="mt-0.5">
              <Badge>{userInfo?.role || "Donor"}</Badge>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link to="/" onClick={() => setIsSidebarOpen(false)}>
            <Button variant="secondary" size="sm" className="w-full">
              <Home className="h-3.5 w-3.5" aria-hidden="true" />
              Home
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogOut}
            className="w-full text-rose-600 hover:bg-rose-50 hover:text-rose-700"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white p-4 lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white p-4 transition-transform duration-200 lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        {/* Mobile Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md lg:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="text-sm font-semibold text-slate-900">Dashboard</span>
          <Link to="/" className="text-xs font-medium text-rose-600">
            Home
          </Link>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
