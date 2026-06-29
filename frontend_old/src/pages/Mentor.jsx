import { motion } from "framer-motion";

const messages = [
  {
    role: "assistant",
    text: "Hi, I’m your AI career mentor. Tell me your current goal and I’ll help you plan the next move.",
  },
  {
    role: "user",
    text: "I want to become a frontend developer and get placed in 3 months.",
  },
  {
    role: "assistant",
    text: "Great target. Let’s focus on projects, interview prep, and ATS optimization in a structured 12-week plan.",
  },
];

const quickPrompts = [
  "Review my career roadmap",
  "What skills should I learn next?",
  "Improve my resume summary",
  "Make a 12-week placement plan",
];

export default function Mentor() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.35fr_0.8fr]">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl"
      >
        <div className="border-b border-white/10 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-purple-300/70">AI Career Mentor</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Chat with your mentor</h2>
          <p className="mt-2 text-sm text-white/55">
            Ask for career advice, learning paths, resume help, and placement strategy.
          </p>
        </div>

        <div className="flex h-[620px] flex-col p-6">
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={[
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start",
                ].join(" ")}
              >
                <div
                  className={[
                    "max-w-[82%] rounded-3xl px-4 py-3 text-sm leading-6",
                    message.role === "user"
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-[0_0_24px_rgba(168,85,247,0.18)]"
                      : "border border-white/10 bg-white/5 text-white/80 backdrop-blur-xl",
                  ].join(" ")}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex justify-start"
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-white/55 [animation-delay:-0.2s]" />
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-white/55 [animation-delay:-0.1s]" />
                  <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-white/55" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-black/10 p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {quickPrompts.map((item) => (
                <button
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/70 transition hover:bg-white/10"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-white/40">
                  Message
                </label>
                <textarea
                  rows="3"
                  placeholder="Ask your mentor anything..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-purple-400/50"
                />
              </div>

              <button className="rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-3 font-medium shadow-[0_0_28px_rgba(168,85,247,0.22)] transition hover:opacity-95">
                Send
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.aside
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">Mentor focus</p>
          <div className="mt-5 space-y-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 bg-black/10 p-4">Career roadmap optimization</div>
            <div className="rounded-2xl border border-white/10 bg-black/10 p-4">Interview readiness strategy</div>
            <div className="rounded-2xl border border-white/10 bg-black/10 p-4">Resume and profile improvement</div>
            <div className="rounded-2xl border border-white/10 bg-black/10 p-4">Skill gap analysis</div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">Current guidance</p>
          <p className="mt-4 text-sm leading-7 text-white/65">
            Your next best move is to build one polished frontend project, improve your resume summary, and practice
            interview answers daily using a structured feedback loop.
          </p>
        </div>
      </motion.aside>
    </div>
  );
}