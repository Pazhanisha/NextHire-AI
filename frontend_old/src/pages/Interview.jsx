import { motion } from "framer-motion";

const messages = [
  {
    role: "assistant",
    text: "Tell me about a project where you solved a difficult technical problem.",
  },
  {
    role: "user",
    text: "I built a resume analyzer that extracts resume data and scores ATS compatibility...",
  },
  {
    role: "assistant",
    text: "Good. Now explain the trade-offs you made in the architecture and how you validated the results.",
  },
];

const questionPanel = [
  "Tell me about yourself.",
  "Why do you want this role?",
  "Describe a challenging project.",
  "How do you handle tight deadlines?",
];

const feedbackItems = [
  { label: "Clarity", score: 8.6 },
  { label: "Confidence", score: 7.9 },
  { label: "Technical depth", score: 8.2 },
  { label: "Structure", score: 7.4 },
];

export default function Interview() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_0.85fr]">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl"
      >
        <div className="border-b border-white/10 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-blue-300/70">AI Interview Simulator</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Mock interview session</h2>
              <p className="mt-2 text-sm text-white/55">
                Practice with an AI interviewer and get real-time feedback after each response.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-black/10 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">Session progress</p>
              <p className="mt-1 text-lg font-medium">Question 3 of 10</p>
            </div>
          </div>
        </div>

        <div className="flex h-[560px] flex-col p-6">
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={[
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start",
                ].join(" ")}
              >
                <div
                  className={[
                    "max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-6",
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-[0_0_24px_rgba(59,130,246,0.18)]"
                      : "border border-white/10 bg-white/5 text-white/80 backdrop-blur-xl",
                  ].join(" ")}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-black/10 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-white/40">
                  Your response
                </label>
                <textarea
                  rows="3"
                  placeholder="Type your answer here..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-blue-400/50"
                />
              </div>

              <div className="flex items-center gap-3">
                <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg transition hover:bg-white/10">
                  🎙
                </button>
                <button className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-3 font-medium shadow-[0_0_28px_rgba(59,130,246,0.22)] transition hover:opacity-95">
                  Send answer
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">Question panel</p>
          <div className="mt-5 space-y-3">
            {questionPanel.map((item, index) => (
              <div
                key={item}
                className={[
                  "rounded-2xl border px-4 py-3 text-sm transition",
                  index === 1
                    ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-100"
                    : "border-white/10 bg-black/10 text-white/65",
                ].join(" ")}
              >
                {item}
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">Feedback</p>
          <div className="mt-5 space-y-4">
            {feedbackItems.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-white/75">{item.label}</span>
                  <span className="text-white/45">{item.score}/10</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${item.score * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-emerald-400/10 bg-emerald-400/5 p-4">
            <p className="text-sm text-emerald-200">Strength</p>
            <p className="mt-1 text-sm text-white/65">
              Your technical explanation is strong. Add more measurable impact and structured delivery.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}