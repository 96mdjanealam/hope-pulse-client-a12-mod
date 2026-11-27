import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../components/shared/ErrorPage";

import HomePage from "../pages/public/HomePage";
import RegistrationPage from "../pages/public/RegistrationPage";
import LoginPage from "../pages/public/LoginPage";
import SearchDonorsPage from "../pages/public/SearchDonorsPage";
import PendingRequestsPage from "../pages/public/PendingRequestsPage";
import DonationDetailsPage from "../pages/public/DonationDetailsPage";
import BlogsPage from "../pages/public/BlogsPage";
import FundingPage from "../pages/public/FundingPage";

import DashboardHomePage from "../pages/dashboard/DashboardHomePage";
import ProfilePage from "../pages/dashboard/ProfilePage";
import CreateDonationPage from "../pages/dashboard/CreateDonationPage";
import EditRequestPage from "../pages/dashboard/EditRequestPage";
import MyDonationRequestsPage from "../pages/dashboard/MyDonationRequestsPage";
import AllDonationRequestsPage from "../pages/dashboard/AllDonationRequestsPage";
import AllUsersPage from "../pages/dashboard/AllUsersPage";
import ContentManagementPage from "../pages/dashboard/ContentManagementPage";
import AddBlogPage from "../pages/dashboard/AddBlogPage";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/registration",
        element: <RegistrationPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/searchDonors",
        element: <SearchDonorsPage />,
      },
      {
        path: "/pending-donation-requests",
        element: <PendingRequestsPage />,
      },
      {
        path: "/donation-request-details/:id",
        element: (
          <PrivateRoute>
            <DonationDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs",
        element: <BlogsPage />,
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <FundingPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardHomePage />,
      },
      {
        path: "/dashboard/profile",
        element: <ProfilePage />,
      },
      {
        path: "/dashboard/createDonation",
        element: <CreateDonationPage />,
      },
      {
        path: "/dashboard/request/edit/:id",
        element: <EditRequestPage />,
      },
      {
        path: "/dashboard/request/view/:id",
        element: <DonationDetailsPage />,
      },
      {
        path: "/dashboard/my-donation-requests",
        element: <MyDonationRequestsPage />,
      },
      {
        path: "/dashboard/all-donation-requests",
        element: <AllDonationRequestsPage />,
      },
      {
        path: "/dashboard/all-users",
        element: (
          <AdminRoute>
            <AllUsersPage />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/content-management",
        element: <ContentManagementPage />,
      },
      {
        path: "/dashboard/content-management/add-blog",
        element: <AddBlogPage />,
      },
    ],
  },
]);
