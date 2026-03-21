"use client";

import { motion } from "framer-motion";

const ACCENT = "#C77DFF";

export default function ClosingCtaSection() {
  return (
    <section
      id="register"
      className="relative py-10 sm:py-16 lg:py-24 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 80%, rgba(199,125,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <motion.h2
          className="text-[clamp(1.75rem,5vw,3.5rem)] font-[family-name:var(--font-milan)] leading-tight mb-2 sm:mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Ready to see through
          <br />
          <span style={{ color: ACCENT }}>the invisible?</span>
        </motion.h2>

        <motion.p
          className="text-sm sm:text-base lg:text-lg text-white/60 font-[family-name:var(--font-satoshi)] max-w-xl mx-auto mb-4 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Limited seats. One day. The knowledge that MBA students pay lakhs for,
          distilled into an immersive experience built for young minds.
        </motion.p>

        {/* Event details mini */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 mb-5 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
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

        {/* Price + CTA */}
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-baseline gap-2">
            <span
              className="text-4xl sm:text-5xl font-[family-name:var(--font-monument)] font-bold"
              style={{ color: ACCENT }}
            >
              &#8377;3,999
            </span>
            <span className="text-sm text-white/50 font-[family-name:var(--font-satoshi)]">
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
              className="relative z-10 inline-flex items-center gap-3 text-[#08261e] font-[family-name:var(--font-monument)] uppercase tracking-wider text-sm sm:text-base px-10 sm:px-14 py-4 sm:py-5 rounded-full font-semibold transition-all duration-500 group-hover:scale-105 group-hover:bg-[#F7F7F3]"
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

        {/* Divider */}
        <motion.div
          className="w-16 h-px bg-[#F7F7F3]/10 mx-auto mt-8 sm:mt-14 mb-6 sm:mb-10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* Contact + Social */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Contact */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a
              href="mailto:info@alcovia.life"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-[#C77DFF] transition-colors font-[family-name:var(--font-satoshi)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-4 h-4"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              info@alcovia.life
            </a>
            <a
              href="tel:8085901818"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-[#C77DFF] transition-colors font-[family-name:var(--font-satoshi)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-4 h-4"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              8085901818
            </a>
          </div>

          {/* Share links */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] sm:text-xs text-white/30 font-[family-name:var(--font-satoshi)] tracking-wider uppercase mr-2">
              Share
            </span>
            {/* WhatsApp */}
            <a
              href="https://wa.me/?text=Check%20out%20this%20Neuromarketing%20Workshop%20by%20Alcovia%20-%20The%20Invisible%20Influence!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#F7F7F3]/10 flex items-center justify-center text-[#F7F7F3]/30 hover:text-[#C77DFF] hover:border-[#C77DFF]/30 transition-all duration-300"
              aria-label="Share on WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            {/* X / Twitter */}
            <a
              href="https://twitter.com/intent/tweet?text=Check%20out%20this%20Neuromarketing%20Workshop%20by%20Alcovia%20-%20The%20Invisible%20Influence!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#F7F7F3]/10 flex items-center justify-center text-[#F7F7F3]/30 hover:text-[#C77DFF] hover:border-[#C77DFF]/30 transition-all duration-300"
              aria-label="Share on X"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url="
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#F7F7F3]/10 flex items-center justify-center text-[#F7F7F3]/30 hover:text-[#C77DFF] hover:border-[#C77DFF]/30 transition-all duration-300"
              aria-label="Share on LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/alcovia.life/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#F7F7F3]/10 flex items-center justify-center text-[#F7F7F3]/30 hover:text-[#C77DFF] hover:border-[#C77DFF]/30 transition-all duration-300"
              aria-label="Follow on Instagram"
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
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-[#C77DFF]/60 transition-colors font-[family-name:var(--font-satoshi)] tracking-wider uppercase mt-4 cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-3 h-3 rotate-180"
            >
              <path d="M12 5v14M5 12l7-7 7 7" />
            </svg>
            Back to top
          </button>
        </motion.div>
      </div>
    </section>
  );
}
