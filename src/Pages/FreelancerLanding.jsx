import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Search, Users, TrendingUp, Globe, Zap } from "lucide-react";
import { categories } from "../data/categories";

export default function FreelancerLanding() {
  const navigate = useNavigate();
  const categoriesRef = useRef(null);
  const onExplore = (e) => {
    e.preventDefault();
    categoriesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="bg-black text-white">
      <header className="bg-gradient-to-b from-zinc-900 to-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Find Top Talent. Grow Your Business.
              </h1>
              <p className="mt-4 text-zinc-300 text-lg md:text-xl max-w-2xl">
                Hire vetted freelancers for web development, design, writing, and more. Post your job and get matched fast.
              </p>
              <div className="mt-8 flex gap-4">
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
                >
                  Get Started
                </Link>
                <a
                  href="#categories"
                  onClick={onExplore}
                  className="px-6 py-3 border border-zinc-700 hover:border-green-500 hover:text-green-400 rounded-lg font-medium transition"
                >
                  Explore Categories
                </a>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-video w-full rounded-xl bg-zinc-800/70 border border-zinc-700 grid place-items-center text-zinc-300">
                <div className="text-center p-6">
                  <div className="text-7xl mb-4">💼</div>
                  <p className="text-zinc-300">Thousands of projects completed by top-rated freelancers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="categories" ref={categoriesRef} className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Explore Categories</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c) => (
            <div key={c.slug} className="group cursor-pointer" onClick={() => navigate(`/portfolio/${encodeURIComponent(c.slug)}`)}>
              <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/40 hover:border-green-600 transition">
                <img src={c.img} alt={c.title} className="h-44 w-full object-cover" />
                <div className="p-6">
                  <div className="text-xl font-semibold group-hover:text-green-400">{c.title}</div>
                  <div className="mt-1 text-zinc-400">Browse top {c.title}.</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Why Choose GigConnect?</h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Secure Payments", desc: "Protected transactions with escrow system and milestone-based payments." },
              { icon: Search, title: "Smart Matching", desc: "AI-powered matching system connects you with the perfect talent or projects." },
              { icon: Users, title: "Verified Profiles", desc: "All freelancers and clients go through our verification process." },
              { icon: TrendingUp, title: "Growth Tracking", desc: "Detailed analytics and insights to help you grow your business." },
              { icon: Globe, title: "Global Reach", desc: "Connect with talent and opportunities from around the world." },
              { icon: Zap, title: "Fast Hiring", desc: "Streamlined process to get your projects started quickly." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:shadow-[0_0_0_1px] hover:shadow-pink-500/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-md bg-gradient-to-r from-pink-500 to-violet-600 inline-flex items-center justify-center">
                    {(() => { const Icon = f.icon; return <Icon className="w-5 h-5 text-white" />; })()}
                  </span>
                  <div className="text-xl font-semibold">{f.title}</div>
                </div>
                <div className="mt-2 text-zinc-400">{f.desc}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[ 
              { label: "Active Users", value: "50K+" },
              { label: "Paid to Freelancers", value: "$10M+" },
              { label: "Success Rate", value: "98%" },
              { label: "Average Rating", value: "4.9/5" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="p-6 text-center rounded-xl border border-zinc-800 bg-zinc-900/30 hover:shadow-[0_0_0_1px] hover:shadow-violet-500/30"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              >
                <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">{s.value}</div>
                <div className="mt-2 text-zinc-400 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/signup"
              className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
            >
              Create your free account
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-8 text-zinc-400 text-sm">
          © {new Date().getFullYear()} GigConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
}


