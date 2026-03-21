"use client";

import { motion } from "framer-motion";

const ACCENT = "#C77DFF";

const credentials = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-6 h-6"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "We Teach What Schools Won't",
    description:
      "Neuromarketing, consumer psychology, and brand warfare sit at the intersection of psychology, business, and real-world decision-making. Subjects the formal education system ignores entirely.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-6 h-6"
      >
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Industry Operators, Not Theorists",
    description:
      "Our speakers come from the brands you interact with daily. Red Bull, Disney+ Hotstar, Flipkart. People who build the playbooks, not people who read about them.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-6 h-6"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Immersive, Not Passive",
    description:
      "You won't sit and watch slides. You'll decode real brand campaigns, run live brand-building simulations, and compete against other teams using real neuromarketing strategies.",
  },
];

const logos = [
  "Red Bull",
  "Flipkart",
  "Disney+ Hotstar",
  "IIM",
  "McKinsey",
  "Bain",
];

export default function AuthoritySection() {
  return (
    <section className="relative py-10 sm:py-16 lg:py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(199,125,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.span
            className="inline-block text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] mb-4"
            style={{ color: ACCENT }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Alcovia
          </motion.span>

          <motion.h2
            className="text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Built by the{" "}
            <span style={{ color: ACCENT }}>top 1%</span>
            <br />
            for the next 1%
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base text-white/60 font-[family-name:var(--font-satoshi)] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Alcovia is India&apos;s first ambition-building program for
            teenagers. With a 3% selection rate, we don&apos;t do generic. We
            build for those who dream bigger and push harder.
          </motion.p>
        </div>

        {/* Credential cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 mb-8 sm:mb-12">
          {credentials.map((cred, i) => (
            <motion.div
              key={cred.title}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative h-full border border-[#F7F7F3]/[0.06] rounded-2xl p-4 sm:p-6 bg-[#F7F7F3]/[0.02] transition-all duration-500 hover:border-[#C77DFF]/20 hover:bg-[#F7F7F3]/[0.04]">
                <div className="text-[#C77DFF]/60 mb-2 group-hover:text-[#C77DFF] transition-colors duration-500">
                  {cred.icon}
                </div>
                <h3 className="text-sm sm:text-lg font-[family-name:var(--font-monument)] uppercase tracking-wider text-white mb-1.5">
                  {cred.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-[family-name:var(--font-satoshi)] leading-snug">
                  {cred.description}
                </p>

                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#C77DFF] to-transparent group-hover:w-full transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo strip */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/35 font-[family-name:var(--font-satoshi)] mb-3">
            Our mentors come from
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {logos.map((logo) => (
              <span
                key={logo}
                className="text-xs sm:text-sm border border-[#F7F7F3]/[0.08] rounded-full px-4 py-2 text-white/40 font-[family-name:var(--font-satoshi)] tracking-wider uppercase transition-colors duration-300 hover:border-[#C77DFF]/20 hover:text-white/60"
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
