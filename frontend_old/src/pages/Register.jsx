import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.2),_transparent_26%),linear-gradient(to_bottom,_#050816,_#070c1c_45%,_#040611)]" />
      <div className="fixed inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:70px_70px]" />

      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden flex-col justify-between p-10 lg:flex">
          <div>
            <div className="text-xl font-semibold tracking-tight">NextHire AI</div>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/60">
              Join a premium AI workspace designed to improve your career outcomes with clarity and confidence.
            </p>
          </div>

          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-300/70">Create account</p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-tight">
              Start with a smarter
              <br />
              career foundation.
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/60">
              Build your profile, analyze your resume, and prepare for interviews using AI-driven insights from day one.
            </p>
          </div>

          <div className="grid max-w-lg grid-cols-3 gap-4">
            {["Profile Setup", "Resume Score", "AI Interview"].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-[0_0_24px_rgba(168,85,247,0.3)]" />
                <p className="mt-4 text-sm text-white/75">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/8 p-8 shadow-2xl backdrop-blur-2xl"
          >
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">Sign up</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Create your account</h2>
              <p className="mt-2 text-sm text-white/55">
                Register to unlock your AI career workspace.
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-white/70">Full name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-purple-400/50 focus:bg-white/8"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-purple-400/50 focus:bg-white/8"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-purple-400/50 focus:bg-white/8"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Career goal</label>
                <select className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-purple-400/50 focus:bg-white/8">
                  <option className="bg-slate-900">Software Developer</option>
                  <option className="bg-slate-900">Data Analyst</option>
                  <option className="bg-slate-900">Product Manager</option>
                  <option className="bg-slate-900">Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-3 font-medium shadow-[0_0_30px_rgba(168,85,247,0.25)] transition hover:opacity-95"
              >
                Create Account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-white/55">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-300 transition hover:text-purple-200">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}