# HopePulse Client

Frontend web application for **HopePulse**, built with React, Vite, Tailwind CSS, TanStack Query, Firebase Authentication, and Stripe.

- **Live Site URL:** [HopePulse](https://hopepulse-90981.web.app/)
- **Live Server API:** [HopePulse API](https://hope-pulse-server.vercel.app/)

**Admin Panel Demo Credentials**
- **Username:** `alamrayhan025@gmail.com`
- **Password:** `123456`

---

## About HopePulse

HopePulse is a platform dedicated to bridging the gap between blood donors and recipients. The application is designed to make blood donation accessible, efficient, and community-driven—featuring donor search by blood group and location, real-time donation request tracking, role-based dashboards (Donor, Volunteer, Admin), community blogs, and Stripe-powered funding.

---

## Key Features

- **Donor Registration & Search:** Register with blood group, district, upazilla, and profile photo, and search donors across 64 districts.
- **Donation Requests & Tracking:** Create, edit, view, and respond to blood donation requests (`pending`, `inprogress`, `done`, `canceled`).
- **Role-Based Dashboard:**
  - **Donor:** Manage profile, create requests, and track personal donation requests.
  - **Volunteer:** View platform statistics, manage all donation requests, and draft blog posts.
  - **Admin:** Full user management (promote to Admin/Volunteer, block/unblock), delete requests, and publish/unpublish blogs.
- **Server-Side Pagination:** Paginated lists across users, donation requests, blogs, and funding records.
- **Community Blog:** Rich-text blog authoring (`jodit-react`) and a public reader modal.
- **Funding & Analytics:** Stripe card payments (`@stripe/react-stripe-js`) and a Recharts funding chart on the admin/volunteer overview.
- **Responsive & Accessible UI:** Built with **Inter** typography, **Lucide React** icons, native `<dialog>` modals, and container-query responsive tables.

---

## Tech Stack

- **Core:** React `^18.3.1`, Vite `^6.0.5`, React Router `^7.1.1`
- **State & Data Fetching:** TanStack React Query `^5.64.2`, Axios `^1.7.9`
- **Styling & Icons:** Tailwind CSS `^3.4.17`, DaisyUI `^4.12.23`, Lucide React, Inter font
- **Forms & Rich Text:** React Hook Form `^7.54.2`, Jodit React `^5.0.10`
- **Auth & Payments:** Firebase `^11.2.0`, Stripe (`@stripe/react-stripe-js`, `@stripe/stripe-js`)
- **Charts, Dates & UI Feedback:** Recharts `^2.15.1`, `date-fns`, Lottie React, SweetAlert2
- **Hosting:** Firebase Hosting

---

## Project Structure

```text
hope-pulse-client-a12-mod/
├── firebase.json                    # Firebase Hosting config (dist + SPA rewrites)
├── .firebaserc                      # Firebase project alias (hopepulse-90981)
├── firebase.config.js               # Firebase SDK initialization
├── index.html                       # Google Fonts (Inter) + app root
├── package.json
├── tailwind.config.js
└── src/
    ├── main.jsx                     # App bootstrap (AuthProvider, QueryClientProvider, RouterProvider)
    ├── index.css                    # Tailwind base, <dialog> backdrop, responsive table rules
    ├── config/
    │   └── constants.js             # Blood groups & district/upazilla helpers
    ├── data/
    │   ├── districts.json
    │   └── upazillas.json
    ├── providers/
    │   └── AuthProvider.jsx         # Firebase auth + JWT & user session sync
    ├── hooks/
    │   ├── useAdmin.jsx
    │   ├── useAllDonationRequests.jsx
    │   ├── useAllFunding.jsx
    │   ├── useAllUsers.jsx
    │   ├── useAxiosPublic.jsx
    │   └── useAxiosSecure.jsx
    ├── Routes/
    │   ├── Routes.jsx
    │   ├── PrivateRoute.jsx
    │   └── AdminRoute.jsx
    ├── layouts/
    │   ├── MainLayout.jsx           # Public shell (Navbar + Outlet + Footer)
    │   └── DashboardLayout.jsx      # Responsive sidebar & mobile drawer shell
    ├── components/
    │   ├── ui/                      # Button, Card, Badge, Modal, Pagination, PageHeader, EmptyState, LoadingSpinner
    │   ├── shared/                  # Navbar, Footer, ErrorPage
    │   └── home/                    # HeroSection, FeaturedSection, TestimonialsSection, PartnersSection, FaqSection, VolunteerSection, ContactSection
    ├── features/
    │   ├── dashboard/FundingChart.jsx
    │   └── payment/                 # PaymentForm, CheckoutForm, AllFundingList
    └── Pages/
        ├── public/                  # HomePage, LoginPage, RegistrationPage, SearchDonorsPage, PendingRequestsPage, DonationDetailsPage, BlogsPage, FundingPage
        └── dashboard/               # DashboardHomePage, ProfilePage, CreateDonationPage, EditRequestPage, MyDonationRequestsPage, AllDonationRequestsPage, AllUsersPage, ContentManagementPage, AddBlogPage
```

---

## Routes Overview

### Public Routes
- `/` — Home page
- `/pending-donation-requests` — Paginated list of pending blood donation requests
- `/searchDonors` — Search donors by blood group, district, and upazilla
- `/blogs` — Paginated published community blog posts
- `/login` — Sign in
- `/registration` — Donor registration

### Protected Routes (`PrivateRoute`)
- `/donation-request-details/:id` — Request details & donation confirmation
- `/payment` — Community funding list & Stripe checkout
- `/dashboard` — Role-aware overview
- `/dashboard/profile` — View & edit user profile
- `/dashboard/createDonation` — Create a blood donation request
- `/dashboard/my-donation-requests` — Paginated personal donation requests
- `/dashboard/request/edit/:id` & `/dashboard/request/view/:id` — Edit or view a request
- `/dashboard/all-donation-requests` — Paginated all donation requests (Admin/Volunteer)
- `/dashboard/content-management` & `/dashboard/content-management/add-blog` — Blog management (Admin/Volunteer)
- `/dashboard/all-users` — Paginated user management (`AdminRoute` only)

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Firebase project (Authentication enabled)
- Stripe publishable key
- ImgBB API key (for profile & blog image uploads)

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root of `hope-pulse-client-a12-mod`:

```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_IMAGE_HOSTING_KEY=your_imgbb_api_key
VITE_Payment_Gateway_PK=your_stripe_publishable_key
```

### 3. Available Scripts

```bash
npm run dev      # Start Vite dev server (http://localhost:5173)
npm run build    # Build production bundle into dist/
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

---

## Deployment (Firebase Hosting)

[firebase.json](firebase.json) is configured to deploy the `dist/` directory with SPA rewrites to `/index.html`.

```bash
npm run build
npx firebase-tools login
npx firebase-tools deploy --only hosting
```
