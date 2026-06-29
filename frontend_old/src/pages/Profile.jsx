import { motion } from "framer-motion";

const skills = [
  { name: "React", level: 92 },
  { name: "JavaScript", level: 88 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Node.js", level: 72 },
  { name: "DSA", level: 65 },
];

const achievements = [
  "Completed 12 mock interviews",
  "Improved ATS score by 18 points",
  "Built 3 portfolio projects",
  "Reached career readiness milestone",
];

export default function Profile() {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
      >
        <div className="flex flex-col items-center text-center">
          <div className="h-24 w-24 rounded-[2rem] bg-gradient-to-br from-blue-500 to-purple-500 shadow-[0_0_30px_rgba(59,130,246,0.25)]" />
          <h2 className="mt-5 text-2xl font-semibold tracking-tight">User Name</h2>
          <p className="mt-1 text-sm text-white/55">Aspiring Frontend Developer</p>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 px-4 py-2 text-sm text-white/70">
            Career Readiness: 88%
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { label: "Resume", value: "84" },
            { label: "Interview", value: "69" },
            { label: "Mentor", value: "92" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-black/10 p-4 text-center">
              <p className="text-xl font-semibold">{item.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/40">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/10 p-4">
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">About</p>
          <p className="mt-3 text-sm leading-7 text-white/65">
            Building a strong foundation in frontend development with a focus on React, UI systems, and interview
            readiness. Using NextHire AI to improve resume quality, practice interviews, and guide career growth.
          </p>
        </div>
      </motion.section>

      <div className="space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">Skills</p>
          <div className="mt-5 space-y-4">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-white/75">{skill.name}</span>
                  <span className="text-white/45">{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1 }}
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-white/40">Achievements</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {achievements.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/10 p-4 text-sm text-white/70">
                {item}
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}