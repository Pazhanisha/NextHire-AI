import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex items-center justify-between px-6 py-4 flex-shrink-0"
      style={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        background: "rgba(5, 8, 22, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Left - Page title */}
      <div>
        <h2 className="text-base font-semibold text-white">Dashboard</h2>
        <p className="text-xs mt-0.5" style={{ color: "rgba(148, 163, 184, 0.5)" }}>
          Saturday, June 27, 2026
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <motion.div
          className="relative flex items-center"
          animate={{ width: searchFocused ? 240 : 200 }}
          transition={{ duration: 0.3 }}
        >
          <Search
            className="absolute left-3 w-4 h-4 pointer-events-none"
            style={{ color: searchFocused ? "#a78bfa" : "rgba(148, 163, 184, 0.4)" }}
          />
          <input
            type="text"
            placeholder="Search anything..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl outline-none transition-all duration-300"
            style={{
              background: searchFocused
                ? "rgba(139, 92, 246, 0.1)"
                : "rgba(255, 255, 255, 0.04)",
              border: searchFocused
                ? "1px solid rgba(139, 92, 246, 0.4)"
                : "1px solid rgba(255, 255, 255, 0.06)",
              color: "rgba(226, 232, 240, 0.9)",
            }}
          />
          {searchFocused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)" }}
            />
          )}
        </motion.div>

        {/* Notifications */}
        <motion.button
          className="relative flex items-center justify-center w-9 h-9 rounded-xl"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
          whileHover={{
            borderColor: "rgba(139, 92, 246, 0.3)",
            background: "rgba(139, 92, 246, 0.08)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-4 h-4" style={{ color: "rgba(148, 163, 184, 0.7)" }} />
          <motion.span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "#818cf8", boxShadow: "0 0 6px #818cf8" }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>

        {/* User avatar */}
        <motion.button
          className="flex items-center gap-2.5"
          whileHover={{ opacity: 0.85 }}
          whileTap={{ scale: 0.97 }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              boxShadow: "0 0 15px rgba(124, 58, 237, 0.4)",
            }}
          >
            P
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-white leading-tight">
              Pazhanisha
            </p>
            <p
              className="text-xs leading-tight"
              style={{ color: "rgba(148, 163, 184, 0.5)" }}
            >
              Free Plan
            </p>
          </div>
          <ChevronDown
            className="w-3.5 h-3.5"
            style={{ color: "rgba(148, 163, 184, 0.4)" }}
          />
        </motion.button>
      </div>
    </motion.header>
  );
}
