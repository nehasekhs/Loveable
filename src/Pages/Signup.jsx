// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { signupApi } from "../api";

 function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "client" });
  const [freelancer, setFreelancer] = useState({ title: "", bio: "", location: "", experienceYears: "", hourlyRate: "", portfolioUrl: "", skills: "", categories: "", availability: "Available", avatarUrl: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!form.name || !form.email || !form.password) return "Please fill all fields";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    if (form.role === "freelancer") {
      if (!freelancer.title) return "Please add your professional title";
      if (!freelancer.skills) return "Please add your skills";
    }
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) return setError(v);
    try {
      setLoading(true);
      const payload = { ...form };
      if (form.role === "freelancer") {
        payload.title = freelancer.title;
        payload.bio = freelancer.bio;
        payload.location = freelancer.location;
        payload.experienceYears = freelancer.experienceYears ? Number(freelancer.experienceYears) : undefined;
        payload.hourlyRate = freelancer.hourlyRate ? Number(freelancer.hourlyRate) : undefined;
        payload.portfolioUrl = freelancer.portfolioUrl;
        payload.avatarUrl = freelancer.avatarUrl;
        payload.skills = freelancer.skills.split(",").map(s => s.trim()).filter(Boolean);
        payload.categories = freelancer.categories.split(",").map(s => s.trim()).filter(Boolean);
        payload.availability = freelancer.availability;
      }
      await signupApi(payload);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl p-8 bg-card shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-1 bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
          Create your account
        </h2>
        <p className="text-sm text-gray-300 mb-6">Start hiring or selling your services.</p>

        {error && <div className="mb-4 text-red-400">{error}</div>}

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-300">Full name</span>
            <input
              className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">I am a</span>
            <select
              className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="client">Client (hire freelancers)</option>
              <option value="freelancer">Freelancer (offer services)</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Email</span>
            <input
              type="email"
              className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Password</span>
            <input
              type="password"
              className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>

          {form.role === "freelancer" && (
            <div className="space-y-4 pt-2 border-t border-gray-800">
              <h3 className="text-lg font-semibold">Freelancer Details</h3>
              <label className="block">
                <span className="text-sm text-gray-300">Profile Photo URL</span>
                <input className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500" value={freelancer.avatarUrl} onChange={(e) => setFreelancer({ ...freelancer, avatarUrl: e.target.value })} />
              </label>
              <label className="block">
                <span className="text-sm text-gray-300">Professional Title</span>
                <input className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500" value={freelancer.title} onChange={(e) => setFreelancer({ ...freelancer, title: e.target.value })} />
              </label>
              <label className="block">
                <span className="text-sm text-gray-300">Location</span>
                <input className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500" value={freelancer.location} onChange={(e) => setFreelancer({ ...freelancer, location: e.target.value })} />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-sm text-gray-300">Experience (years)</span>
                  <input type="number" min="0" className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500" value={freelancer.experienceYears} onChange={(e) => setFreelancer({ ...freelancer, experienceYears: e.target.value })} />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-300">Hourly Rate ($)</span>
                  <input type="number" min="0" className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500" value={freelancer.hourlyRate} onChange={(e) => setFreelancer({ ...freelancer, hourlyRate: e.target.value })} />
                </label>
              </div>
              <label className="block">
                <span className="text-sm text-gray-300">Skills (comma separated)</span>
                <input className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500" value={freelancer.skills} onChange={(e) => setFreelancer({ ...freelancer, skills: e.target.value })} />
              </label>
              <label className="block">
                <span className="text-sm text-gray-300">Categories (comma separated)</span>
                <input className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500" value={freelancer.categories} onChange={(e) => setFreelancer({ ...freelancer, categories: e.target.value })} />
              </label>
              <label className="block">
                <span className="text-sm text-gray-300">Portfolio URL</span>
                <input className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500" value={freelancer.portfolioUrl} onChange={(e) => setFreelancer({ ...freelancer, portfolioUrl: e.target.value })} />
              </label>
              <label className="block">
                <span className="text-sm text-gray-300">Availability</span>
                <select className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500" value={freelancer.availability} onChange={(e) => setFreelancer({ ...freelancer, availability: e.target.value })}>
                  <option>Available</option>
                  <option>Busy</option>
                  <option>On Vacation</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-gray-300">Short Bio</span>
                <textarea rows="4" className="mt-1 w-full rounded-lg px-4 py-3 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500" value={freelancer.bio} onChange={(e) => setFreelancer({ ...freelancer, bio: e.target.value })} />
              </label>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium mt-2"
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            )}
            {loading ? "Creating account..." : "Sign up"}
          </motion.button>
        </form>

        <p className="mt-4 text-center text-gray-400 text-sm">
          Already have an account? <Link to="/login" className="text-pink-400">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
export default Signup;