import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Rocket } from "lucide-react";

export function ProgressRing({ percentage, size = 120, strokeWidth = 8, color = "#7c3aed" }) {
  const circleRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const [animated, setAnimated] = useState(false);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated ? percentage / 100 : 0) * circumference;

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setAnimated(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const gradientId = `ring-gradient-${percentage}-${color.replace("#", "")}`;

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
            filter: `drop-shadow(0 0 8px ${color}80)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-white">{percentage}%</span>
      </div>
    </div>
  );
}

export default function ProgressCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative overflow-hidden rounded-2xl p-6 card-hover h-full"
      style={{
        background:
          "linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(37, 99, 235, 0.1) 50%, rgba(16, 185, 129, 0.08) 100%)",
        border: "1px solid rgba(139, 92, 246, 0.35)",
        boxShadow:
          "0 0 40px rgba(124, 58, 237, 0.1), inset 0 0 40px rgba(124, 58, 237, 0.05)",
      }}
    >
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.3), transparent 70%)",
          filter: "blur(30px)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="relative flex items-center gap-6">
        <ProgressRing percentage={78} size={110} strokeWidth={9} />
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: "rgba(167, 139, 250, 0.7)" }}
          >
            Career Progress
          </p>
          <h3 className="text-2xl font-bold text-white mb-2">78% Complete</h3>
          <div className="flex items-center gap-2">
            <Rocket className="w-4 h-4" style={{ color: "#fbbf24" }} />
            <p className="text-sm" style={{ color: "rgba(148, 163, 184, 0.8)" }}>
              You&#39;re doing great! Keep going
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            {[
              { label: "Goals", value: "12/15" },
              { label: "Streak", value: "14d" },
              { label: "Rank", value: "Top 8%" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-base font-bold text-white">{stat.value}</p>
                <p className="text-xs" style={{ color: "rgba(148, 163, 184, 0.5)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
