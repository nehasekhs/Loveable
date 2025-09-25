// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import PortfolioPage from "./Pages/PortfolioPage";
import FreelancerProfile from "./Pages/FreelancerProfile";
import FreelancerLanding from "./Pages/FreelancerLanding";
import Dashboard from "./Pages/Dashboard"; // Freelancer Dashboard
import Payments from "./Pages/Payments"; // Payments Page
import ClientJobs from "./Pages/ClientJobs"; // Client Job Listings
import JobForm from "./Pages/JobForm"; // Job Create/Edit Form
import BrowseProjects from "./Pages/BrowseProjects"; // Browse Projects for Freelancers
import ClientDashboard from "./Pages/ClientDashboard"; // Client Dashboard
import ProjectRoom from "./Pages/ProjectRoom";
import Reviews from "./Pages/Reviews";
import WriteReview from "./Pages/WriteReview";
import Settings from "./Pages/Settings";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <Routes>
          {/* Landing page */}
          <Route path="/" element={<FreelancerLanding />} />

          {/* Auth pages */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

          {/* Portfolio & Freelancer Profile */}
          <Route path="/portfolio/:category" element={<PortfolioPage />} />
          <Route path="/Freelancers/:category/:id" element={<FreelancerProfile />} />

          {/* Freelancer Specific Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/projects" element={<BrowseProjects />} /> {/* New: Browse Projects */}

          {/* Client Specific Routes */}
          <Route path="/client/dashboard" element={<ClientDashboard />} /> {/* New: Client Dashboard */}
          <Route path="/client/jobs" element={<ClientJobs />} />
          <Route path="/client/jobs/new" element={<JobForm />} />
          <Route path="/client/jobs/:id/edit" element={<JobForm />} />

          {/* Collaboration */}
          <Route path="/project-room/:roomId" element={<ProjectRoom />} />

          {/* Reviews */}
          <Route path="/reviews/:userId" element={<Reviews />} />
          <Route path="/review/:userId" element={<Reviews />} />
          <Route path="/write-review/:projectId/:revieweeId/:type" element={<WriteReview />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
