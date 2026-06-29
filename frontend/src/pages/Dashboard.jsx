import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Video, Award, Brain, Lightbulb, Eye } from "lucide-react";
import ProgressCard from "@/components/ProgressCard";
import AnalyticsCard from "@/components/AnalyticsCard";
import FeatureCard from "@/components/FeatureCard";
import { CareerRoadmap, RecentActivity } from "@/components/Timeline";

const analyticsData = [
  {
    title: "Resume Score",
    percentage: 91,
    icon: FileText,
    description: "AI-powered resume rating",
    color: "#818cf8",
    delay: 0.15,
  },
  {
    title: "ATS Match",
    percentage: 88,
    icon: Award,
    description: "Applicant tracking match",
    color: "#10b981",
    delay: 0.2,
  },
  {
    title: "Interview Skills",
    percentage: 75,
    icon: Video,
    description: "Mock interview performance",
    color: "#f59e0b",
    delay: 0.25,
  },
  {
    title: "Career Readiness",
    percentage: 72,
    icon: Brain,
    description: "Overall placement readiness",
    color: "#ec4899",
    delay: 0.3,
  },
];

export default function Dashboard() {


const navigate = useNavigate();


const [user,setUser] = useState(null);



useEffect(()=>{


const storedUser = localStorage.getItem("user");


if(storedUser){

setUser(
JSON.parse(storedUser)
);

}


},[]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hero greeting */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-white">Welcome back, </span>
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {user?.name || "User"} 👋
            </span>
          </h1>
          <p className="mt-1 text-sm" style={{ color: "rgba(148, 163, 184, 0.65)" }}>
            Your AI career growth companion — let&#39;s make today count
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl"
          style={{
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
          }}
        >
          <div
            className="w-2 h-2 rounded-full bg-emerald-400"
            style={{ boxShadow: "0 0 8px #10b981" }}
          />
          <span className="text-sm font-medium" style={{ color: "#6ee7b7" }}>
            AI Ready
          </span>
        </motion.div>
      </motion.div>

      {/* Career Progress + Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <ProgressCard />
        </div>
        <div className="lg:col-span-3 grid grid-cols-2 gap-4">
          {analyticsData.map((card) => (
            <AnalyticsCard key={card.title} {...card} />
          ))}
        </div>
      </div>

      {/* AI Tools */}
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-3 mb-4"
        >
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
          >
            <Brain style={{ color: "white", width: "14px", height: "14px" }} />
          </div>
          <h2 className="text-base font-bold text-white">AI Tools</h2>
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(139,92,246,0.3), transparent)",
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard
            title="AI Resume Analyzer"
            description="Get AI-powered feedback and improve your resume instantly. Boost your ATS score and stand out."
            icon={FileText}
            buttonText="Analyze Resume"
            gradient="linear-gradient(135deg, rgba(124, 58, 237, 0.06) 0%, rgba(59, 130, 246, 0.04) 100%)"
            glowColor="#818cf8"
            delay={0.4}
          />
          <FeatureCard
            title="AI Interview Simulator"
            description="Practice real interviews with AI and get instant feedback. Build confidence for your dream role."
            icon={Video}
            buttonText="Start Interview"
            gradient="linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(59, 130, 246, 0.04) 100%)"
            glowColor="#10b981"
            delay={0.45}
          />
        </div>
      </div>

      {/* AI Career Insight */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative overflow-hidden rounded-2xl p-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(37, 99, 235, 0.08) 50%, rgba(236, 72, 153, 0.06) 100%)",
          border: "1px solid rgba(139, 92, 246, 0.25)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-48 h-48 pointer-events-none opacity-20"
          style={{
            background: "radial-gradient(circle, #818cf8, transparent 70%)",
            filter: "blur(40px)",
            transform: "translate(20%, -20%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none opacity-15"
          style={{
            background: "radial-gradient(circle, #ec4899, transparent 70%)",
            filter: "blur(30px)",
            transform: "translate(-20%, 20%)",
          }}
        />

        <div className="relative flex items-start gap-4">
          <motion.div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(124, 58, 237, 0.4), rgba(37, 99, 235, 0.3))",
              border: "1px solid rgba(139, 92, 246, 0.4)",
              boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
            }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Lightbulb style={{ color: "#a78bfa", width: "24px", height: "24px" }} />
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#a78bfa" }}
              >
                AI Career Insight
              </p>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: "rgba(167, 139, 250, 0.15)", color: "#c4b5fd" }}
              >
                Personalized
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "rgba(226, 232, 240, 0.85)" }}
            >
              Your strengths lie in{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 600,
                }}
              >
                Frontend Development
              </span>{" "}
              and{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 600,
                }}
              >
                Problem Solving
              </span>
              . Focus on{" "}
              <span className="text-amber-400 font-semibold">System Design</span>,{" "}
              <span className="text-amber-400 font-semibold">Backend</span> and{" "}
              <span className="text-amber-400 font-semibold">Cloud technologies</span> to
              become placement ready.
            </p>
            <motion.button

  onClick={() => navigate("/career-mentor")}

  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"

  style={{
    background:"linear-gradient(135deg,#7c3aed,#2563eb)",
    boxShadow:"0 4px 20px rgba(124,58,237,0.4)"
  }}

  whileHover={{
    scale:1.05,
    boxShadow:"0 6px 30px rgba(124,58,237,0.6)"
  }}

>
  <Eye className="w-4 h-4"/>

  View Full Insight

</motion.button>

            
          </div>
        </div>
      </motion.div>

      {/* Career Roadmap + Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
        <CareerRoadmap />
        <RecentActivity />
      </div>
    </div>
  );
}
