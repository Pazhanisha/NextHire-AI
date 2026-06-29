import React from "react";
import {
  LayoutDashboard,
  FileSearch,
  Bot,
  Briefcase,
  LineChart,
  BadgeCheck,
  Bookmark,
  User,
  Settings,
  Sparkles,
  Crown,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Resume Analyzer", icon: FileSearch, path: "/resume-analyzer" },
  { name: "AI Interview", icon: Bot, path: "/ai-interview" },
  { name: "Career Mentor", icon: Briefcase, path: "/career-mentor" },
  { name: "Analytics", icon: LineChart, path: "/analytics" },
  { name: "Skill Tracker", icon: BadgeCheck, path: "/skill-tracker" },
  { name: "Saved Jobs", icon: Bookmark, path: "/saved-jobs" },
  { name: "Profile", icon: User, path: "/profile" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-white/10 bg-[#050816]/95 backdrop-blur-xl lg:flex flex-col">
      <div className="px-6 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 shadow-[0_0_30px_rgba(124,58,237,0.45)]">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">NextHire AI</h1>
            <p className="text-xs text-white/45">AI Career Operating System</p>
          </div>
        </div>
      </div>

      <nav className="mt-8 flex-1 px-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  [
                    "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-r from-purple-500/30 to-blue-500/25 text-white shadow-[0_0_24px_rgba(124,58,237,0.28)] ring-1 ring-white/10"
                      : "text-white/65 hover:bg-white/5 hover:text-white",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={[
                        "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                        isActive ? "text-purple-300" : "text-white/45",
                      ].join(" ")}
                    />
                    <span>{item.name}</span>
                    {isActive && <ChevronRight className="ml-auto h-4 w-4 text-white/60" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="px-4 pb-4 space-y-4">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 shadow-[0_0_40px_rgba(59,130,246,0.1)] backdrop-blur-xl">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500">
              <Crown className="h-4 w-4 text-white" />
            </div>
            <p className="font-semibold">Upgrade to Pro</p>
          </div>
          <p className="text-sm leading-6 text-white/60">
            Unlock advanced AI insights, premium feedback, and priority support.
          </p>
          <button className="mt-4 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-sm font-semibold shadow-[0_0_30px_rgba(99,102,241,0.35)] transition-transform hover:scale-[1.02]">
            Upgrade Now
          </button>
        </div>

        <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
              alt="User avatar"
              className="h-11 w-11 rounded-full object-cover ring-2 ring-purple-500/40"
            />
            <div>
              <p className="font-medium leading-none">Pazhanisha</p>
              <p className="mt-1 text-xs text-white/45">Free Plan</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-white/40" />
        </div>
      </div>
    </aside>
  );
}