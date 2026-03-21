"use client";

import { motion } from "framer-motion";

const ACCENT = "#C77DFF";

export default function CtaMidSection() {
  return (
    <section className="relative py-8 sm:py-16 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(199,125,255,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="relative border border-[#C77DFF]/15 rounded-3xl overflow-hidden bg-[#C77DFF]/[0.03]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Top stripe */}
          <div
            className="h-1"
            style={{
              background: `linear-gradient(to right, transparent, ${ACCENT}, transparent)`,
            }}
          />

          <div className="p-5 sm:p-10 lg:p-14">
            <motion.p
              className="text-[clamp(1.25rem,3vw,2rem)] font-[family-name:var(--font-playfair)] italic text-white/90 mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              &ldquo;The best way to predict behaviour
            </motion.p>
            <motion.p
              className="text-[clamp(1.25rem,3vw,2rem)] font-[family-name:var(--font-playfair)] italic mb-5"
              style={{ color: ACCENT }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              is to understand the brain behind it.&rdquo;
            </motion.p>

            {/* Price + CTA */}
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex items-baseline gap-2">
                <span
                  className="text-3xl sm:text-4xl font-[family-name:var(--font-monument)] font-bold"
                  style={{ color: ACCENT }}
                >
                  &#8377;3,999
                </span>
                <span className="text-xs sm:text-sm text-white/50 font-[family-name:var(--font-satoshi)]">
                  per seat
                </span>
              </div>

              <a
                href="https://rzp.io/rzp/neuromarketingalcovia"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 overflow-hidden"
              >
                <span
                  className="relative z-10 inline-flex items-center gap-3 text-[#08261e] font-[family-name:var(--font-monument)] uppercase tracking-wider text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold transition-all duration-500 group-hover:scale-105"
                  style={{ background: ACCENT }}
                >
                  Register Now
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
              </a>

              <p className="text-[10px] sm:text-xs text-white/40 font-[family-name:var(--font-satoshi)]">
                Lunch included &middot; 28th March, 2026 &middot; 11 AM to 4 PM
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
