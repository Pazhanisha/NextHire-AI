import { motion } from "framer-motion";

const stats = [
  { label: "ATS Score", value: 82, color: "from-cyan-400 to-blue-500" },
  { label: "Resume Score", value: 88, color: "from-purple-400 to-pink-500" },
  { label: "Keyword Match", value: 74, color: "from-emerald-400 to-cyan-500" },
];

const suggestions = [
  "Add measurable impact to your project bullets.",
  "Include more ATS-friendly keywords from the target role.",
  "Rewrite summary with a stronger career objective.",
  "Use consistent formatting for education and experience.",
];

const keywords = [
  { label: "React", match: true },
  { label: "Tailwind CSS", match: true },
  { label: "Node.js", match: false },
  { label: "System Design", match: false },
  { label: "REST APIs", match: true },
  { label: "CI/CD", match: false },
];

function ScoreRing({ value, label, color }) {
  const radius = 42;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/70">{label}</p>
        <span className="text-sm text-white/45">{value}%</span>
      </div>

      <div className="mt-5 flex items-center justify-center">
        <div className="relative h-28 w-28">
          <svg height="112" width="112" className="-rotate-90">
            <circle
              stroke="rgba(255,255,255,0.08)"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx="56"
              cy="56"
            />
            <motion.circle
              stroke="url(#ringGradient)"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              r={normalizedRadius}
              cx="56"
              cy="56"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-semibold">{value}</div>
              <div className="text-xs text-white/40">score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Resume() {
  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-300/70">Resume Analyzer</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Upload your resume and get instant AI analysis.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              Get ATS insights, keyword gaps, and professional suggestions to make your resume stronger for hiring systems.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-r from-blue-500/15 to-purple-500/15 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">Analysis status</p>
            <p className="mt-2 text-lg font-medium">Ready to review</p>
            <p className="mt-1 text-sm text-white/55">PDF upload supported up to 5MB.</p>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-dashed border-white/15 bg-white/5 p-8 backdrop-blur-xl"
        >
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[1.75rem] border border-white/10 bg-black/10 px-6 py-10 text-center">
            <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-[0_0_30px_rgba(59,130,246,0.28)]" />
            <h3 className="mt-6 text-2xl font-semibold">Drag and drop your PDF resume</h3>
            <p className="mt-3 max-w-lg text-sm leading-7 text-white/55">
              Upload a resume file to analyze ATS compatibility, content quality, and missing skills.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-3 font-medium shadow-[0_0_28px_rgba(59,130,246,0.22)] transition hover:opacity-95">
                Browse PDF
              </button>
              <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-white/80 transition hover:bg-white/10">
                Analyze sample resume
              </button>
            </div>

            <p className="mt-6 text-xs text-white/35">Supported format: .pdf only</p>
          </div>
        </motion.div>

        <div className="grid gap-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <ScoreRing {...item} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">AI Suggestions</p>
          <div className="mt-5 space-y-3">
            {suggestions.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/10 p-4 text-sm text-white/70">
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">Keyword Match</p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {keywords.map((item) => (
              <div
                key={item.label}
                className={[
                  "rounded-2xl border p-4 text-sm transition",
                  item.match
                    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                    : "border-white/10 bg-black/10 text-white/55",
                ].join(" ")}
              >
                {item.label}
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}