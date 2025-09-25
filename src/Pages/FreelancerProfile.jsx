import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getFreelancerProfile, getCategoryTitle } from "../data/freelancers";

function FreelancerProfile() {
  const { category, id } = useParams();
  const title = getCategoryTitle(category);
  const person = getFreelancerProfile(title, id);

  if (!person) {
    return <p className="text-center text-red-500 mt-10">Freelancer not found.</p>;
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen px-6 py-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
        <motion.img
          src={person.img}
          alt={person.name}
          className="w-40 h-40 rounded-full border-4 border-green-500"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{person.name}</h1>
          <p className="text-gray-400 text-lg">{person.title}</p>
          <p className="text-gray-400 mt-1">{person.location}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="bg-green-600 px-2 py-1 rounded text-sm">{person.topRated}</span>
            {person.verified && <span className="bg-blue-600 px-2 py-1 rounded text-sm">Verified</span>}
          </div>
          <div className="flex gap-6 mt-3 text-gray-300">
            <p>⭐ {person.rating}</p>
            <p>${person.price}/hr</p>
            <p>{person.successRate}</p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">About</h2>
        <p className="text-gray-300 leading-relaxed">{person.bio}</p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {person.skills?.map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-green-600 rounded-full text-sm">{skill}</span>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Work History</h2>
        <div className="space-y-4">
          {person.history?.map((job, i) => (
            <motion.div key={i} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * i }}
            >
              <div>
                <p className="font-semibold">{job.title}</p>
                <p className="text-gray-400 text-sm">{job.status}</p>
              </div>
              <div className="text-yellow-400 font-semibold">⭐ {job.rating}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {person.portfolio && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-3">Portfolio</h2>
          <a href={person.portfolio} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Visit Portfolio</a>
        </div>
      )}

      {/* Reviews Section */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Reviews & Ratings</h2>
          <Link
            to={`/reviews/${id}`}
            className="text-pink-400 hover:text-pink-300 text-sm"
          >
            View All Reviews
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700 text-center">
            <div className="text-2xl font-bold text-yellow-400">4.8</div>
            <div className="text-sm text-gray-400">Average Rating</div>
            <div className="flex justify-center mt-1">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < 4 ? "text-yellow-400" : "text-gray-400"}>★</span>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700 text-center">
            <div className="text-2xl font-bold text-green-400">127</div>
            <div className="text-sm text-gray-400">Total Reviews</div>
          </div>
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700 text-center">
            <div className="text-2xl font-bold text-blue-400">98%</div>
            <div className="text-sm text-gray-400">Success Rate</div>
          </div>
        </div>

        {/* Sample Reviews */}
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">Sarah Johnson</span>
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <span className="text-sm text-gray-400">2 days ago</span>
            </div>
            <h3 className="font-medium mb-1">Excellent work quality!</h3>
            <p className="text-gray-300 text-sm">
              John delivered exactly what was promised and exceeded expectations. 
              Great communication throughout the project.
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">Mike Chen</span>
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <span className="text-sm text-gray-400">1 week ago</span>
            </div>
            <h3 className="font-medium mb-1">Professional and reliable</h3>
            <p className="text-gray-300 text-sm">
              Very professional approach to the project. Delivered on time and 
              provided excellent support after completion.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
        <div>
          <h3 className="font-semibold mb-1">Languages</h3>
          <p>{person.languages?.join(", ")}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Education</h3>
          <p>{person.education}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Total Jobs</h3>
          <p>{person.jobs}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Total Hours</h3>
          <p>{person.hours}</p>
        </div>
      </div>
    </div>
  );
}

export default FreelancerProfile;
