import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Video,
  GraduationCap,
  BarChart3,
  Zap,
  Bookmark,
  User,
  Settings,
  History,
  Sparkles,
  ChevronUp,
  Crown,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },

  { icon: FileText, label: "Resume Analyzer", path: "/resume-analyzer" },

  { icon: Video, label: "AI Interview", path: "/ai-interview" },

  { icon: GraduationCap, label: "Career Mentor", path: "/career-mentor" },

  { icon: BarChart3, label: "Analytics", path: "/analytics" },

  { icon: Zap, label: "Skill Tracker", path: "/skill-tracker" },

  { icon: Bookmark, label: "Saved Jobs", path: "/saved-jobs" },

  { icon: User, label: "Profile", path: "/profile" },

  { icon: Settings, label: "Settings", path: "/settings" },
  {
 icon: History,
 label:"Resume History",
 path:"/resume-history"
},
];

function AILogoIcon() {
  return (
    <motion.div
      className="relative flex items-center justify-center w-10 h-10 rounded-xl"
      style={{
        background: "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
        boxShadow:
          "0 0 20px rgba(124, 58, 237, 0.6), 0 0 40px rgba(124, 58, 237, 0.3)",
      }}
      animate={{
        boxShadow: [
          "0 0 20px rgba(124,58,237,0.6)",
          "0 0 35px rgba(124,58,237,0.9)",
          "0 0 20px rgba(124,58,237,0.6)",
        ],
      }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <Sparkles className="w-5 h-5 text-white" />
    </motion.div>
  );
}

export default function Sidebar() {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex flex-col w-64 h-full flex-shrink-0"
      style={{
        background: "rgba(5, 8, 22, 0.95)",
        borderRight: "1px solid rgba(139, 92, 246, 0.15)",
        boxShadow: "4px 0 40px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <AILogoIcon />
        <div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            NextHire AI
          </span>
          <p
            className="text-xs mt-0.5"
            style={{ color: "rgba(148, 163, 184, 0.6)" }}
          >
            Career OS
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        className="mx-4 mb-4 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)",
        }}
      />

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <p
          className="text-xs font-semibold uppercase tracking-widest px-3 mb-3"
          style={{ color: "rgba(148, 163, 184, 0.4)" }}
        >
          Main
        </p>
        {menuItems.map((item) => {
          const active = isActive(item.path);
          const hovered = hoveredItem === item.label;

          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer"
                style={
                  active
                    ? {
                        background:
                          "linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, rgba(37, 99, 235, 0.2) 100%)",
                        border: "1px solid rgba(139, 92, 246, 0.4)",
                        boxShadow:
                          "0 0 20px rgba(124, 58, 237, 0.2), inset 0 0 20px rgba(124, 58, 237, 0.05)",
                      }
                    : hovered
                    ? {
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(139, 92, 246, 0.15)",
                      }
                    : {
                        border: "1px solid transparent",
                      }
                }
                onHoverStart={() => setHoveredItem(item.label)}
                onHoverEnd={() => setHoveredItem(null)}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.15 }}
              >
                {active && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                    style={{
                      background: "linear-gradient(180deg, #a78bfa, #60a5fa)",
                    }}
                  />
                )}
                <item.icon
                  style={{
                    color: active
                      ? "#a78bfa"
                      : hovered
                      ? "#818cf8"
                      : "rgba(148, 163, 184, 0.6)",
                    width: "18px",
                    height: "18px",
                    flexShrink: 0,
                  }}
                />
                <span
                  className="text-sm font-medium"
                  style={{
                    color: active
                      ? "#e2d9f3"
                      : hovered
                      ? "#c4b5fd"
                      : "rgba(148, 163, 184, 0.7)",
                  }}
                >
                  {item.label}
                </span>
                {active && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ background: "#a78bfa", boxShadow: "0 0 6px #a78bfa" }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Upgrade to Pro card */}
      <div className="px-3 pb-3">
        <motion.div
          className="relative overflow-hidden rounded-xl p-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #7c3aed, transparent)",
              filter: "blur(20px)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4" style={{ color: "#fbbf24" }} />
            <span className="text-sm font-semibold text-white">
              Upgrade to Pro
            </span>
          </div>
          <p
            className="text-xs mb-3"
            style={{ color: "rgba(148, 163, 184, 0.7)" }}
          >
            Unlock unlimited AI features &amp; insights
          </p>
          <button
            className="w-full py-2 rounded-lg text-xs font-semibold text-white transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              boxShadow: "0 4px 15px rgba(124, 58, 237, 0.4)",
            }}
          >
            Upgrade Now →
          </button>
        </motion.div>
      </div>

      {/* User profile */}
      <div className="px-3 pb-4">
        <motion.div
          className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
          whileHover={{
            background: "rgba(255, 255, 255, 0.07)",
            borderColor: "rgba(139, 92, 246, 0.2)",
          }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
          >
            P
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white truncate">
              Pazhanisha
            </p>
            <p
              className="text-xs truncate"
              style={{ color: "rgba(148, 163, 184, 0.5)" }}
            >
              Free Plan
            </p>
          </div>
          <ChevronUp
            className="w-4 h-4 flex-shrink-0"
            style={{ color: "rgba(148, 163, 184, 0.4)" }}
          />
        </motion.div>
      </div>
    </motion.aside>
  );
}
