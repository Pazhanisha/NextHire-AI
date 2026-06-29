import React from "react";
import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="lg:hidden">
          <span className="text-lg font-semibold tracking-tight">NextHire AI</span>
        </div>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <div className="hidden md:flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_0_24px_rgba(59,130,246,0.08)] backdrop-blur-xl">
            <Search className="h-4 w-4 text-white/40" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-56 bg-transparent text-sm text-white placeholder:text-white/35 outline-none"
            />
            <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/40">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>

          <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition-all hover:bg-white/10 hover:text-white">
            <Bell className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur-xl">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
              alt="User avatar"
              className="h-9 w-9 rounded-full object-cover ring-2 ring-purple-500/40"
            />
            <div className="hidden sm:block pr-1">
              <p className="text-sm font-medium leading-none">Pazhanisha</p>
              <p className="mt-1 text-[11px] text-white/45">Premium user</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}