"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ACCENT = "#C77DFF";
const ACCENT_DIM = "rgba(199,125,255,";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 0.8], [0, -60]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Neural network background */}
      <div className="absolute inset-0 z-0">
        {/* Synapse lines */}
        <div className="absolute inset-0 opacity-[0.05]">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-full"
              style={{
                left: `${(i * 4.2) % 100}%`,
                width: "1px",
                background: `linear-gradient(180deg, transparent 0%, ${ACCENT} 50%, transparent 100%)`,
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{
                delay: i * 0.04,
                duration: 1.4,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Horizontal synapse lines */}
        <div className="absolute inset-0 opacity-[0.03]">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute w-full"
              style={{
                top: `${(i * 8.3) % 100}%`,
                height: "1px",
                background: `linear-gradient(90deg, transparent 0%, ${ACCENT} 50%, transparent 100%)`,
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{
                delay: 0.5 + i * 0.06,
                duration: 1.2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${ACCENT_DIM}0.08) 0%, transparent 70%)`,
          }}
        />

        {/* Top accent stripe */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(to right, transparent, ${ACCENT}, transparent)`,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        style={{ opacity: heroOpacity, scale: heroScale, y: textY }}
      >
        {/* Overline */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-3 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="h-px w-8 sm:w-12" style={{ background: ACCENT }} />
          <span
            className="text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)]"
            style={{ color: ACCENT }}
          >
            Alcovia Workshop
          </span>
          <span className="h-px w-8 sm:w-12" style={{ background: ACCENT }} />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-[family-name:var(--font-milan)] leading-[0.85] tracking-tight mb-2 sm:mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block text-[clamp(2.2rem,7vw,6rem)] text-white" style={{ textShadow: "0 0 40px rgba(255,255,255,0.1)" }}>
            The Invisible
          </span>
          <span
            className="block text-[clamp(2.2rem,7vw,6rem)]"
            style={{ color: ACCENT, textShadow: "0 0 30px rgba(199,125,255,0.3)" }}
          >
            Influence
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-[clamp(0.9rem,2.2vw,1.5rem)] font-[family-name:var(--font-monument)] uppercase tracking-[0.15em] text-white/80 mb-3 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Brand Warfare &{" "}
          <span style={{ color: ACCENT }}>Neuromarketing</span>
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-16 sm:w-24 h-px mx-auto mb-3 sm:mb-8"
          style={{ background: `${ACCENT_DIM}0.4)` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        />

        {/* Hook line */}
        <motion.p
          className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-playfair)] italic text-white/75 max-w-xl mx-auto mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
        >
          You think you choose what you buy. You don&apos;t.
        </motion.p>

        {/* Stat callout */}
        <motion.p
          className="text-xs sm:text-sm text-white/55 font-[family-name:var(--font-satoshi)] max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          95% of your purchasing decisions are made by your subconscious.
          <br />
          This workshop shows you how.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="mt-5 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <a
            href="https://rzp.io/rzp/neuromarketingalcovia"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden"
          >
            <span
              className="relative z-10 inline-flex items-center gap-3 text-[#08261e] font-[family-name:var(--font-monument)] uppercase tracking-wider text-sm sm:text-base px-8 sm:px-12 py-4 sm:py-5 rounded-full font-semibold transition-all duration-500 group-hover:scale-105"
              style={{ background: ACCENT }}
            >
              Claim Your Seat
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </motion.div>

        {/* Date + limited seats */}
        <motion.div
          className="mt-3 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke={ACCENT}
              strokeWidth={1.5}
              className="w-4 h-4"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span className="text-xs sm:text-sm text-white/60 font-[family-name:var(--font-satoshi)]">
              28th March, 2026
            </span>
          </div>
          <div
            className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5"
            style={{ borderColor: `${ACCENT_DIM}0.2)` }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: ACCENT }}
            />
            <span className="text-xs sm:text-sm tracking-wider text-white/60 font-[family-name:var(--font-satoshi)]">
              Limited Seats
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - subtle arrow only */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-5 h-5 text-white/20"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.div>

      {/* Corner accents */}
      <div
        className="hidden sm:block absolute top-8 left-8 w-12 h-12 border-t border-l"
        style={{ borderColor: `${ACCENT_DIM}0.2)` }}
      />
      <div
        className="hidden sm:block absolute top-8 right-8 w-12 h-12 border-t border-r"
        style={{ borderColor: `${ACCENT_DIM}0.2)` }}
      />
      <div
        className="hidden sm:block absolute bottom-8 left-8 w-12 h-12 border-b border-l"
        style={{ borderColor: `${ACCENT_DIM}0.2)` }}
      />
      <div
        className="hidden sm:block absolute bottom-8 right-8 w-12 h-12 border-b border-r"
        style={{ borderColor: `${ACCENT_DIM}0.2)` }}
      />
    </section>
  );
}
