import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  HeartPulse,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Search,
  Droplets,
  BookOpen,
  HeartHandshake,
} from "lucide-react";
import { AuthContext } from "../../providers/AuthProvider";
import Button from "../ui/Button";

const navLinkClass = ({ isActive }) =>
  `inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-rose-50 text-rose-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

export default function Navbar() {
  const { user, logOut, loading } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    setIsMobileOpen(false);
    logOut();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-600 text-white shadow-sm">
            <HeartPulse className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            Hope<span className="text-rose-600">Pulse</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          <NavLink to="/pending-donation-requests" className={navLinkClass}>
            <Droplets className="h-4 w-4" aria-hidden="true" />
            Donation Requests
          </NavLink>
          <NavLink to="/searchDonors" className={navLinkClass}>
            <Search className="h-4 w-4" aria-hidden="true" />
            Search Donors
          </NavLink>
          <NavLink to="/blogs" className={navLinkClass}>
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Blog
          </NavLink>
          <NavLink to="/payment" className={navLinkClass}>
            <HeartHandshake className="h-4 w-4" aria-hidden="true" />
            Funding
          </NavLink>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                <img
                  src={user?.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.displayName || "User")}
                  alt={user?.displayName || "User avatar"}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="hidden max-w-[120px] truncate sm:inline">
                  {user?.displayName || "Account"}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
              </button>

              {isDropdownOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg"
                >
                  <div className="border-b border-slate-100 px-3 py-2">
                    <p className="truncate text-xs font-semibold text-slate-900">
                      {user?.displayName || "User"}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {user?.email}
                    </p>
                  </div>
                  <Link
                    to="/dashboard"
                    role="menuitem"
                    onClick={() => setIsDropdownOpen(false)}
                    className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    <LayoutDashboard className="h-4 w-4 text-slate-500" aria-hidden="true" />
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/registration">
                <Button variant="primary" size="sm">
                  Join as Donor
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-expanded={isMobileOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          >
            {isMobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            <NavLink
              to="/pending-donation-requests"
              className={navLinkClass}
              onClick={() => setIsMobileOpen(false)}
            >
              <Droplets className="h-4 w-4" aria-hidden="true" />
              Donation Requests
            </NavLink>
            <NavLink
              to="/searchDonors"
              className={navLinkClass}
              onClick={() => setIsMobileOpen(false)}
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Search Donors
            </NavLink>
            <NavLink
              to="/blogs"
              className={navLinkClass}
              onClick={() => setIsMobileOpen(false)}
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Blog
            </NavLink>
            <NavLink
              to="/payment"
              className={navLinkClass}
              onClick={() => setIsMobileOpen(false)}
            >
              <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              Funding
            </NavLink>
            {!user && (
              <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-3">
                <Link to="/login" onClick={() => setIsMobileOpen(false)}>
                  <Button variant="secondary" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link to="/registration" onClick={() => setIsMobileOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Join as Donor
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
