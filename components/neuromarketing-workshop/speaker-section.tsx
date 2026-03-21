"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ACCENT = "#C77DFF";

export default function SpeakerSection() {
  return (
    <section className="relative py-10 sm:py-16 lg:py-24 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(199,125,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          className="text-center mb-6 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs sm:text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-satoshi)]"
            style={{ color: ACCENT }}
          >
            Meet Your Speaker
          </span>
        </motion.div>

        {/* Speaker card */}
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Image placeholder */}
          <div className="relative flex-shrink-0">
            <div className="relative w-48 h-60 sm:w-72 sm:h-96 lg:w-80 lg:h-[28rem]">
              {/* Outer border */}
              <div
                className="absolute inset-0 border rounded-2xl"
                style={{ borderColor: `rgba(199,125,255,0.15)` }}
              />

              {/* Speaker photo */}
              <div className="absolute inset-3 rounded-xl overflow-hidden">
                <Image
                  src="/images/austin-varughese.png"
                  alt="Austin Varughese"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                  priority
                />
              </div>

              {/* Corner accents */}
              <div
                className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-2 border-l-2 rounded-tl-md"
                style={{ borderColor: `rgba(199,125,255,0.4)` }}
              />
              <div
                className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-2 border-r-2 rounded-tr-md"
                style={{ borderColor: `rgba(199,125,255,0.4)` }}
              />
              <div
                className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-2 border-l-2 rounded-bl-md"
                style={{ borderColor: `rgba(199,125,255,0.4)` }}
              />
              <div
                className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-2 border-r-2 rounded-br-md"
                style={{ borderColor: `rgba(199,125,255,0.4)` }}
              />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#08261e] border border-[#C77DFF]/30 rounded-full px-4 py-1.5 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: ACCENT }}
              />
              <span
                className="text-[10px] sm:text-xs font-[family-name:var(--font-satoshi)] font-medium tracking-wider uppercase whitespace-nowrap"
                style={{ color: ACCENT }}
              >
                Affective Neuroscientist
              </span>
            </motion.div>
          </div>

          {/* Speaker info */}
          <div className="text-center lg:text-left flex-1">
            <motion.div
              className="space-y-3 sm:space-y-5"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Speaker Header */}
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-milan)] text-white mb-2">
                  Austin Varughese
                </h3>
                <p
                  className="text-base sm:text-lg font-[family-name:var(--font-satoshi)] font-medium mb-1"
                  style={{ color: ACCENT }}
                >
                  Affective Neuroscientist
                </p>
                <p className="text-sm text-white/50 font-[family-name:var(--font-satoshi)]">
                  Researcher at Temple &middot; MS Neuroscience, NBRC Gurgaon
                </p>
              </div>

              {/* LinkedIn link */}
              <a
                href="https://www.linkedin.com/in/austin-varughese-he-him-50561072"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-[family-name:var(--font-satoshi)] transition-opacity hover:opacity-80"
                style={{ color: `rgba(199,125,255,0.7)` }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                View LinkedIn Profile
              </a>

              {/* Divider */}
              <div
                className="w-12 h-px mx-auto lg:mx-0"
                style={{ background: `rgba(199,125,255,0.3)` }}
              />

              {/* Bio content */}
              <div className="text-sm sm:text-base text-white/80 font-[family-name:var(--font-satoshi)] leading-snug max-w-lg mx-auto lg:mx-0 space-y-2 text-left">
                <p>
                  Austin is an Affective Neuroscientist and researcher exploring
                  the neuroscience of emotion, perception, and decision-making.
                  With a Master&apos;s in Neuroscience from the{" "}
                  <span style={{ color: ACCENT }} className="font-medium">
                    National Brain Research Centre
                  </span>{" "}
                  and research experience at{" "}
                  <span style={{ color: ACCENT }} className="font-medium">
                    IISc Bangalore
                  </span>
                  , he brings deep scientific rigour to the question of why we
                  buy what we buy.
                </p>
                <p className="text-white/60">
                  A published researcher in the journal{" "}
                  <span className="italic">PAIN</span>, Austin bridges the gap
                  between laboratory neuroscience and real-world consumer
                  behaviour. He doesn&apos;t teach from textbooks. He brings the
                  science straight from the lab to the boardroom.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mt-4">
                {[
                  "Neuroscience",
                  "Affective Science",
                  "Consumer Behaviour",
                  "Published Researcher",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-xs border border-[#F7F7F3]/10 rounded-full px-3 py-1.5 text-white/50 font-[family-name:var(--font-satoshi)] tracking-wider uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
