"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ACCENT = "#C77DFF";

const audiences = [
  {
    emoji: "🔍",
    title: "The Curious Consumer",
    description:
      "You've caught yourself wondering why you 'needed' something you saw on Instagram. You're the one in your friend group who points out when an ad is playing tricks.",
  },
  {
    emoji: "🚀",
    title: "The Future Founder",
    description:
      "You want to start a brand or a D2C business. You know marketing matters but nobody ever taught you the psychology behind it.",
  },
  {
    emoji: "🧠",
    title: "The Psychology Nerd",
    description:
      "You're fascinated by how the brain works. You've watched The Social Dilemma, read about cognitive biases, and want to combine psychology with business.",
  },
  {
    emoji: "🎯",
    title: "The Brand Strategist",
    description:
      "You can spot a Zara campaign from H&M in seconds. You follow brand teardowns and advertising case studies. You want to move from 'I love brands' to 'I build brands'.",
  },
];

export default function AudienceSection() {
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
          background:
            "linear-gradient(180deg, transparent 0%, rgba(199,125,255,0.015) 30%, rgba(199,125,255,0.015) 70%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-6 sm:mb-10">
          <motion.span
            className="inline-block text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)] mb-4"
            style={{ color: ACCENT }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Who Is This For
          </motion.span>

          <motion.h2
            className="text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            For the <span style={{ color: ACCENT }}>1%</span> who want to
            <br />
            understand the other 99%
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base text-white/50 font-[family-name:var(--font-playfair)] italic max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            If you&apos;ve never wondered why you buy what you buy, this
            workshop isn&apos;t for you.
          </motion.p>
        </div>

        {/* Audience grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 max-w-4xl mx-auto">
          {audiences.map((item, i) => (
            <motion.div
              key={item.title}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative h-full border border-[#F7F7F3]/[0.06] rounded-2xl p-4 sm:p-6 bg-[#F7F7F3]/[0.02] transition-all duration-500 hover:border-[#C77DFF]/20 hover:bg-[#F7F7F3]/[0.04]">
                {/* Emoji */}
                <span className="text-2xl sm:text-4xl mb-2 block">
                  {item.emoji}
                </span>

                {/* Title */}
                <h3 className="text-sm sm:text-lg font-[family-name:var(--font-monument)] uppercase tracking-wider text-white mb-1.5">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-white/60 font-[family-name:var(--font-satoshi)] leading-snug">
                  {item.description}
                </p>

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
