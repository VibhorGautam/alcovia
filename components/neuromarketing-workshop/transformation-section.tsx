"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ACCENT = "#C77DFF";

const transformations = [
  {
    number: "01",
    title: "Decode the Invisible Playbook",
    subtitle: "See what brands don't want you to see",
    description:
      "Learn the exact neuromarketing techniques billion-dollar companies use to hijack your decisions. From colour psychology (why every fast food logo is red and yellow) to scarcity drops (why Nike SNKRS sells out in minutes) to sensory branding (why Coca-Cola's bottle makes that specific sound).",
    stat: "85%",
    statLabel: "of purchases influenced by colour",
  },
  {
    number: "02",
    title: "Build a Brand That Weaponizes Psychology",
    subtitle: "Move from consumer to creator",
    description:
      "Design your own brand strategy using the same emotional triggers, cognitive biases, and sensory hooks that Apple, Nike, and Zomato deploy on you daily. Build a brand identity, craft positioning, and design a launch campaign using real neuromarketing frameworks.",
    stat: "28%",
    statLabel: "increase in value via sensory branding",
  },
  {
    number: "03",
    title: "Become Manipulation-Proof",
    subtitle: "The ultimate consumer superpower",
    description:
      "Once you understand how your subconscious is being targeted, you reclaim the power. Learn to audit your own purchasing decisions, recognize dark patterns, and make choices driven by genuine preference, not engineered impulse.",
    stat: "95%",
    statLabel: "of decisions happen subconsciously",
  },
];

export default function TransformationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  });

  return (
    <section
      ref={containerRef}
      className="relative py-10 sm:py-16 lg:py-24 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(199,125,255,0.04) 0%, transparent 70%)",
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
            The Transformation
          </motion.span>

          <motion.h2
            className="text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight mb-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            What you&apos;ll walk out with
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base text-white/60 font-[family-name:var(--font-satoshi)] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            This isn&apos;t a lecture. It&apos;s an immersive, hands-on deep
            dive into the science that shapes every purchase, every scroll, and
            every &ldquo;add to cart&rdquo; moment.
          </motion.p>
        </div>

        {/* Transformation cards - stacked */}
        <div className="space-y-3 sm:space-y-6">
          {transformations.map((item, i) => {
            const start = i / transformations.length;
            const end = start + 0.5 / transformations.length;

            return (
              <motion.div
                key={item.number}
                className="group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="relative border border-[#F7F7F3]/[0.06] rounded-2xl overflow-hidden bg-[#F7F7F3]/[0.02] transition-all duration-500 hover:border-[#C77DFF]/20 hover:bg-[#F7F7F3]/[0.04]">
                  {/* Top accent line */}
                  <div
                    className="h-px"
                    style={{
                      background: `linear-gradient(to right, transparent, ${ACCENT}40, transparent)`,
                    }}
                  />

                  <div className="p-4 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-12">
                    {/* Left: number + stat */}
                    <div className="flex-shrink-0 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-6 lg:w-32">
                      <span className="text-[#C77DFF]/25 text-4xl sm:text-6xl lg:text-7xl font-[family-name:var(--font-monument)] font-bold leading-none group-hover:text-[#C77DFF]/35 transition-colors duration-500">
                        {item.number}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className="text-xl sm:text-2xl font-[family-name:var(--font-monument)] font-bold"
                          style={{ color: ACCENT }}
                        >
                          {item.stat}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-white/45 font-[family-name:var(--font-satoshi)] leading-tight max-w-[80px]">
                          {item.statLabel}
                        </span>
                      </div>
                    </div>

                    {/* Right: content */}
                    <div className="flex-1">
                      <div className="mb-1">
                        <span
                          className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-satoshi)]"
                          style={{ color: `${ACCENT}99` }}
                        >
                          {item.subtitle}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-[family-name:var(--font-milan)] text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/60 font-[family-name:var(--font-satoshi)] leading-snug max-w-2xl">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
