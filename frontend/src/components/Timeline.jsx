import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Target, FolderOpen, Trophy } from "lucide-react";

const roadmapSteps = [
  {
    icon: CheckCircle2,
    label: "Current Skills",
    description: "React, TypeScript, Node.js, CSS",
    status: "completed",
    color: "#10b981",
  },
  {
    icon: Target,
    label: "Missing Skills",
    description: "System Design, Cloud, DevOps",
    status: "active",
    color: "#818cf8",
  },
  {
    icon: FolderOpen,
    label: "Projects",
    description: "Build 3 portfolio projects",
    status: "upcoming",
    color: "#f59e0b",
  },
  {
    icon: Trophy,
    label: "Placement Ready",
    description: "Apply to top companies",
    status: "upcoming",
    color: "#ec4899",
  },
];

const activityItems = [
  {
    text: "Resume analyzed",
    subtext: "Improved ATS score from 71% to 88%",
    time: "2h ago",
    color: "#10b981",
  },
  {
    text: "Mock interview completed",
    subtext: "Scored 78/100 in Frontend round",
    time: "Yesterday",
    color: "#818cf8",
  },
  {
    text: "Skills improved",
    subtext: "Completed React Advanced module",
    time: "2 days ago",
    color: "#f59e0b",
  },
];

export function CareerRoadmap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl p-6"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.07)",
      }}
    >
      <h3 className="text-base font-bold text-white mb-6">Career Roadmap</h3>

      <div className="relative">
        <div
          className="absolute left-[22px] top-6 bottom-6 w-0.5"
          style={{
            background:
              "linear-gradient(180deg, #10b981, #818cf8, #f59e0b, #ec4899)",
          }}
        />

        <div className="space-y-6">
          {roadmapSteps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="relative flex items-start gap-4 pl-1"
            >
              <motion.div
                className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    step.status === "completed"
                      ? `${step.color}25`
                      : step.status === "active"
                      ? `${step.color}20`
                      : "rgba(255,255,255,0.04)",
                  border: `2px solid ${
                    step.status !== "upcoming"
                      ? step.color
                      : "rgba(255,255,255,0.1)"
                  }`,
                  boxShadow:
                    step.status !== "upcoming"
                      ? `0 0 15px ${step.color}40`
                      : "none",
                }}
                animate={
                  step.status === "active"
                    ? {
                        boxShadow: [
                          `0 0 10px ${step.color}30`,
                          `0 0 25px ${step.color}60`,
                          `0 0 10px ${step.color}30`,
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                <step.icon
                  style={{
                    color:
                      step.status !== "upcoming"
                        ? step.color
                        : "rgba(148,163,184,0.3)",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </motion.div>

              <div className="flex-1 min-w-0 pt-1.5">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-white">{step.label}</p>
                  {step.status === "completed" && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: `${step.color}20`,
                        color: step.color,
                      }}
                    >
                      Done
                    </span>
                  )}
                  {step.status === "active" && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: `${step.color}20`,
                        color: step.color,
                      }}
                    >
                      In Progress
                    </span>
                  )}
                </div>
                <p className="text-xs" style={{ color: "rgba(148, 163, 184, 0.55)" }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function RecentActivity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative overflow-hidden rounded-2xl p-6"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.07)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-bold text-white">Recent Activity</h3>
        <button
          className="text-xs font-medium"
          style={{ color: "#818cf8" }}
        >
          View all →
        </button>
      </div>

      <div className="space-y-4">
        {activityItems.map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.12 }}
            className="flex items-start gap-3 group cursor-pointer"
          >
            <div className="relative mt-1.5 flex-shrink-0">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: item.color, boxShadow: `0 0 8px ${item.color}80` }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors duration-200">
                {item.text}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(148, 163, 184, 0.55)" }}>
                {item.subtext}
              </p>
            </div>
            <span
              className="text-xs flex-shrink-0 mt-0.5"
              style={{ color: "rgba(148, 163, 184, 0.4)" }}
            >
              {item.time}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
