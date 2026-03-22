"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/footer";

const ACCENT = "#C77DFF";
const ACCENT_DIM = "rgba(199,125,255,";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function ThankYouPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Purchase", {
        value: 3999,
        currency: "INR",
        content_name: "The Invisible Influence: Neuromarketing Workshop",
        content_category: "Workshop",
      });
    }
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.05]">
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-full"
              style={{
                left: `${(i * 6.25) % 100}%`,
                width: "1px",
                background: `linear-gradient(180deg, transparent 0%, ${ACCENT} 50%, transparent 100%)`,
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: i * 0.04, duration: 1.4, ease: "easeOut" }}
            />
          ))}
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${ACCENT_DIM}0.08) 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Checkmark */}
          <motion.div
            className="mx-auto mb-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
            style={{ background: `${ACCENT_DIM}0.12)`, border: `2px solid ${ACCENT}` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              stroke={ACCENT}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10 sm:w-12 sm:h-12"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.path
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              />
            </motion.svg>
          </motion.div>

          {/* Overline */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="h-px w-8 sm:w-12" style={{ background: ACCENT }} />
            <span
              className="text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)]"
              style={{ color: ACCENT }}
            >
              Payment Successful
            </span>
            <span className="h-px w-8 sm:w-12" style={{ background: ACCENT }} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-[family-name:var(--font-milan)] text-[clamp(2rem,5vw,4rem)] leading-[0.95] mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="block text-white">You&apos;re In.</span>
            <span className="block" style={{ color: ACCENT }}>
              Welcome to the Workshop.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-sm sm:text-base lg:text-lg text-white/60 font-[family-name:var(--font-satoshi)] max-w-lg mx-auto mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Your seat for <strong className="text-white/80">The Invisible Influence</strong> is
            confirmed. Check your email for the confirmation and further details.
          </motion.p>

          {/* Event details */}
          <motion.div
            className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-8 mb-10 sm:mb-12 px-6 sm:px-10 py-5 rounded-2xl"
            style={{ background: `${ACCENT_DIM}0.06)`, border: `1px solid ${ACCENT_DIM}0.15)` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
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
              <span className="text-sm text-white/70 font-[family-name:var(--font-satoshi)]">
                28th March, 2026
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke={ACCENT}
                strokeWidth={1.5}
                className="w-4 h-4"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span className="text-sm text-white/70 font-[family-name:var(--font-satoshi)]">
                11:00 AM to 4:00 PM
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke={ACCENT}
                strokeWidth={1.5}
                className="w-4 h-4"
              >
                <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
              </svg>
              <span className="text-sm text-white/70 font-[family-name:var(--font-satoshi)]">
                Lunch Included
              </span>
            </div>
          </motion.div>

          {/* CTA back to home */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Link
              href="/"
              className="group relative inline-flex items-center gap-3 overflow-hidden"
            >
              <span
                className="relative z-10 inline-flex items-center gap-3 text-[#08261e] font-[family-name:var(--font-monument)] uppercase tracking-wider text-sm px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold transition-all duration-500 group-hover:scale-105"
                style={{ background: ACCENT }}
              >
                Back to Home
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            <a
              href="https://www.instagram.com/alcovia.life/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors font-[family-name:var(--font-satoshi)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-4 h-4"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              Follow us on Instagram
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
