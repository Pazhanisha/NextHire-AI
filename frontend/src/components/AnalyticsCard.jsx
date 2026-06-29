import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function SmallRing({ percentage, color }) {
  const size = 70;
  const strokeWidth = 6;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [animated, setAnimated] = useState(false);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated ? percentage / 100 : 0) * circumference;
  const gradientId = `sr-${percentage}-${color.replace("#", "")}`;

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setAnimated(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color + "99"} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
        />
        <circle
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
            filter: `drop-shadow(0 0 6px ${color}80)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-white">{percentage}%</span>
      </div>
    </div>
  );
}

export default function AnalyticsCard({ title, percentage, icon: Icon, description, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden rounded-2xl p-5 card-hover cursor-pointer group"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.07)",
      }}
      whileHover={{
        borderColor: color + "40",
        boxShadow: `0 0 30px ${color}20`,
      }}
    >
      <div
        className="absolute top-0 right-0 w-28 h-28 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 70%)`,
          filter: "blur(20px)",
          transform: "translate(20%, -20%)",
        }}
      />

      <div className="relative flex items-start justify-between mb-4">
        <div>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
            style={{ background: color + "20", border: `1px solid ${color}30` }}
          >
            <Icon style={{ color, width: "18px", height: "18px" }} />
          </div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(148, 163, 184, 0.55)" }}>
            {description}
          </p>
        </div>
        <SmallRing percentage={percentage} color={color} />
      </div>

      <div
        className="h-1.5 w-full rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
        />
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="text-xs font-medium" style={{ color: "rgba(148, 163, 184, 0.5)" }}>
          Score
        </span>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: color + "20", color }}
        >
          {percentage >= 85 ? "Excellent" : percentage >= 70 ? "Good" : "Needs Work"}
        </span>
      </div>
    </motion.div>
  );
}
