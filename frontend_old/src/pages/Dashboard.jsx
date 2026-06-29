
import { motion } from "framer-motion";

const animateRing = (value, colorClass) => ({
  background: `conic-gradient(var(--ring-color) ${value}%, rgba(255,255,255,0.08) ${value}% 100%)`,
  "--ring-color": colorClass,
});

function CircularProgress({ value, size = 92, stroke = 10, label, sublabel, icon: Icon, color = "rgba(34,197,94,1)" }) {
  const inner = size - stroke * 2;
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative grid place-items-center rounded-full"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(${color} ${value}%, rgba(255,255,255,0.08) ${value}% 100%)`,
          boxShadow: `0 0 30px ${color}33`,
        }}
      >
        <div
          className="grid place-items-center rounded-full bg-[#050816] text-white"
          style={{ width: inner, height: inner }}
        >
          {Icon ? <Icon className="h-5 w-5 text-white/75" /> : null}
          <div className="mt-1 text-sm font-semibold">{value}%</div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-white/85">{label}</p>
        {sublabel ? <p className="mt-1 text-xs text-white/45">{sublabel}</p> : null}
      </div>
    </div>
  );
}

const statCards = [
  { label: "Resume Score", value: 91, desc: "Excellent ATS fit", icon: FileText, color: "#34d399" },
  { label: "ATS Match", value: 88, desc: "Strong keyword alignment", icon: ShieldCheck, color: "#60a5fa" },
  { label: "Interview Skills", value: 75, desc: "Good speaking pace", icon: Mic, color: "#f59e0b" },
  { label: "Career Readiness", value: 72, desc: "Nearly placement ready", icon: BriefcaseBusiness, color: "#f59e0b" },
];

const roadmap = [
  { title: "Current Skills", note: "You're here" },
  { title: "Missing Skills", note: "In Progress" },
  { title: "Projects", note: "Next Step" },
  { title: "Placement Ready", note: "Goal" },
];

const activities = [
  { title: "Resume analyzed", desc: "Improved ATS score", time: "2h ago", icon: CheckCircle2, color: "from-emerald-400 to-green-500" },
  { title: "Mock interview completed", desc: "Round 1 - Frontend Developer", time: "1d ago", icon: Mic, color: "from-blue-400 to-cyan-500" },
  { title: "Skills improved", desc: "React Advanced completed", time: "2d ago", icon: TrendingUp, color: "from-purple-400 to-pink-500" },
];

function GlassCard({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] ${className}`}>
      {children}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Welcome back, <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Pazhanisha</span> 👋
          </h2>
          <p className="text-sm sm:text-base text-white/55">Your AI career growth companion</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_1fr]">
        <GlassCard className="relative overflow-hidden bg-gradient-to-br from-purple-600/70 via-indigo-600/60 to-blue-500/70 p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.25),transparent_40%)]" />
          <div className="relative flex h-full flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-medium text-white/80">Career Progress</p>
              <div className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">78%</div>
              <p className="mt-4 text-sm text-white/80">You&apos;re doing great! Keep going 🚀</p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <CircularProgress
                value={78}
                size={170}
                stroke={14}
                color="#8b5cf6"
                label=""
              />
            </div>
          </div>
        </GlassCard>

        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          {statCards.map((item) => {
            const Icon = item.icon;
            return (
              <GlassCard key={item.label} className="p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 ring-1 ring-white/10">
                    <Icon className="h-5 w-5 text-white/80" />
                  </div>
                  <div className="text-right text-xs text-white/45">{item.desc}</div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-white/75">{item.label}</p>
                  <div className="mt-4">
                    <CircularProgress
                      value={item.value}
                      size={92}
                      stroke={8}
                      color={item.color}
                      label=""
                    />
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <GlassCard className="p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-300" />
            <h3 className="text-lg font-semibold">AI Tools</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.22),transparent_40%)]" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_24px_rgba(59,130,246,0.25)]">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h4 className="mt-4 text-lg font-semibold">AI Resume Analyzer</h4>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Get AI-powered feedback and improve your resume instantly.
                </p>
                <button className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium transition-all hover:bg-white/15">
                  Analyze Resume <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.24),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.25),transparent_42%)]" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-[0_0_24px_rgba(168,85,247,0.25)]">
                  <Mic className="h-5 w-5 text-white" />
                </div>
                <h4 className="mt-4 text-lg font-semibold">AI Interview Simulator</h4>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Practice real interviews with AI and get instant feedback.
                </p>
                <button className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium transition-all hover:bg-white/15">
                  Start Interview <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-blue-300" />
              <h3 className="text-lg font-semibold">AI Career Insight</h3>
            </div>
            <Sparkles className="h-5 w-5 text-purple-300" />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/75">
            <p className="leading-7">
              Your strengths lie in Frontend Development and Problem Solving.
              Focus on System Design, Backend and Cloud technologies to become placement ready.
            </p>
          </div>

          <button className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-4 py-3 text-sm font-medium ring-1 ring-white/10 transition-all hover:from-blue-500/30 hover:to-purple-500/30">
            View Full Insight <ArrowRight className="h-4 w-4" />
          </button>
        </GlassCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <GlassCard className="p-5 sm:p-6">
          <h3 className="text-lg font-semibold">Career Roadmap</h3>

          <div className="mt-8 grid gap-6 md:grid-cols-4 md:gap-4">
            {roadmap.map((step, index) => (
              <div key={step.title} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_30px_rgba(139,92,246,0.45)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#050816] text-lg font-semibold">
                    {index + 1}
                  </div>
                </div>
                {index < roadmap.length - 1 && (
                  <div className="absolute left-[calc(50%+2rem)] top-8 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-blue-400/70 to-purple-500/70 md:block" />
                )}
                <p className="mt-4 font-medium">{step.title}</p>
                <p className="mt-1 text-sm text-white/45">{step.note}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <button className="text-sm text-white/45 hover:text-white/70">View All</button>
          </div>

          <div className="space-y-4">
            {activities.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-4 rounded-3xl border border-white/8 bg-white/5 p-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-[0_0_24px_rgba(59,130,246,0.2)]`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-medium">{item.title}</p>
                      <span className="text-xs text-white/35">{item.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-white/50">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </section>
    </div>
  );
}