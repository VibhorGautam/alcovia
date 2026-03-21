"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ACCENT = "#C77DFF";

const problems = [
  {
    number: "01",
    question:
      "Why do you always pick Coca-Cola, even though you can't tell it apart in a blind test?",
    insight:
      "Your taste buds didn't choose your favourite drink. A boardroom full of neuroscientists did. Every colour, sound, and curve on that bottle is engineered to make you feel before you think.",
    stat: "85%",
    statLabel: "of buying decisions are influenced by colour alone",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
      >
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    number: "02",
    question:
      "Why does unboxing a new phone feel better than actually using it? And why does that high vanish in 3 days?",
    insight:
      "Apple engineered the magnetic lid, the slow reveal, the peel of the screen protector to trigger a dopamine spike that peaks at the unbox. Then social media extends the loop: post it, get likes, see someone else's unboxing, feel FOMO, repeat.",
    stat: "60%",
    statLabel: "of consumers buy on impulse driven by FOMO",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
      >
        <path d="M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0l-9-5-9 5m18 0l-9 5m9-5v0M3 8l9 5m0 0v8" />
      </svg>
    ),
  },
  {
    number: "03",
    question:
      "Why do you feel personally attacked when someone says your favourite brand is overrated?",
    insight:
      "Nike, Apple, and Zara aren't selling products. They're selling identity. When someone insults the brand, your brain processes it like a personal insult because the brand has wired itself into your sense of self.",
    stat: "95%",
    statLabel: "of purchase decisions happen subconsciously",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
      >
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-10 sm:py-16 lg:py-24 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, transparent 0%, rgba(199,125,255,0.02) 50%, transparent 100%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <motion.span
            className="inline-block text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] mb-4"
            style={{ color: ACCENT }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            The Problem
          </motion.span>

          <motion.h2
            className="text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Every purchase you&apos;ve ever made
            <br />
            <span style={{ color: ACCENT }}>was engineered</span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base lg:text-lg text-white/70 font-[family-name:var(--font-satoshi)] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Billion-dollar brands spend millions studying your brain. They know
            exactly which colours, sounds, and words make you reach for your
            wallet without thinking. Here&apos;s what they don&apos;t want you
            to know.
          </motion.p>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.number}
              className="group relative"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative h-full border border-[#F7F7F3]/[0.06] rounded-2xl p-4 sm:p-8 bg-[#F7F7F3]/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#C77DFF]/20 hover:bg-[#F7F7F3]/[0.04]">
                {/* Top accent */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-[#C77DFF]/40 transition-all duration-500" />

                {/* Number */}
                <span className="block text-[#C77DFF]/20 text-4xl sm:text-6xl font-[family-name:var(--font-monument)] font-bold leading-none mb-2 group-hover:text-[#C77DFF]/30 transition-colors duration-500">
                  {problem.number}
                </span>

                {/* Icon */}
                <div className="text-[#C77DFF]/60 mb-2 group-hover:text-[#C77DFF] transition-colors duration-500">
                  {problem.icon}
                </div>

                {/* Question */}
                <h3 className="text-base sm:text-lg font-[family-name:var(--font-playfair)] italic text-white mb-2 leading-snug">
                  &ldquo;{problem.question}&rdquo;
                </h3>

                {/* Insight */}
                <p className="text-xs sm:text-sm text-white/60 font-[family-name:var(--font-satoshi)] leading-snug mb-3">
                  {problem.insight}
                </p>

                {/* Stat badge */}
                <div className="flex items-baseline gap-2 mt-auto">
                  <span
                    className="text-2xl sm:text-3xl font-[family-name:var(--font-monument)] font-bold"
                    style={{ color: ACCENT }}
                  >
                    {problem.stat}
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/50 font-[family-name:var(--font-satoshi)] leading-tight">
                    {problem.statLabel}
                  </span>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#C77DFF] to-transparent group-hover:w-full transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
