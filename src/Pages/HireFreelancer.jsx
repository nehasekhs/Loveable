import React from "react";
import { motion } from "framer-motion";

export default function HireFreelancer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-black to-pink-900 px-4 py-12 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-2xl bg-gray-900/90 rounded-2xl shadow-2xl p-8 border border-pink-500/30"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent mb-6">
          Hire a Top Freelancer
        </h1>
        <p className="text-gray-300 text-center mb-8 text-lg">
          Post your project and get matched with the best freelance talent for your needs. Describe your requirements, set your budget, and start receiving proposals within minutes.
        </p>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-pink-400 mb-2">Project Title</label>
            <input
              type="text"
              placeholder="e.g. Build a React Website"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-pink-400 mb-2">Project Description</label>
            <textarea
              rows={4}
              placeholder="Describe your project, deliverables, and expectations..."
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">Budget ($)</label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 500"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">Deadline</label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-violet-600 text-white focus:ring-2 focus:ring-pink-500 outline-none"
                required
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, background: "linear-gradient(90deg,#8b5cf6,#ec4899)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold text-lg shadow-lg transition-all"
          >
            Post Project
          </motion.button>
        </form>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-400">Need help? <span className="text-pink-400 font-semibold cursor-pointer hover:underline">Contact our support team</span></p>
        </motion.div>
      </motion.div>
    </div>
  );
}
