"use client";

import { motion } from "framer-motion";

const ACCENT = "#C77DFF";

const stats = [
  {
    number: "3%",
    label: "Selection Rate",
    description: "Only the most driven students make the cut",
  },
  {
    number: "15+",
    label: "Industry Mentors",
    description: "From Red Bull, Google, Flipkart, McKinsey & more",
  },
  {
    number: "5hrs",
    label: "Immersive Workshop",
    description: "Hands-on simulations, not boring lectures",
  },
  {
    number: "$1.7B",
    label: "Neuromarketing Industry",
    description: "Growing to $2.6B by 2030. Get ahead of the curve.",
  },
];

const testimonials = [
  {
    quote:
      "After the F1 workshop, I started noticing how every brand around me is designed to make me feel something. I can't unsee it now.",
    name: "Aksh",
    age: "16",
  },
  {
    quote:
      "I used to think marketing was just ads. Alcovia showed me it's psychology, strategy, and storytelling all rolled into one. Genuinely changed how I think.",
    name: "Ansh",
    age: "15",
  },
  {
    quote:
      "The best part is you're not just sitting and listening. You're actually building things, competing, and making real decisions. Nothing like school.",
    name: "Aryaana",
    age: "14",
  },
  {
    quote:
      "I walked in thinking I knew how brands worked. I walked out realizing I had no idea. That's what makes Alcovia different.",
    name: "Aanya",
    age: "15",
  },
  {
    quote:
      "My parents thought it was just another workshop. By dinner I was explaining to them why Zomato's logo is red and they were genuinely impressed.",
    name: "Taashi",
    age: "16",
  },
];

export default function SocialProofSection() {
  return (
    <section className="relative py-10 sm:py-16 lg:py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(199,125,255,0.02) 50%, transparent 100%)",
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
            The Proof
          </motion.span>

          <motion.h2
            className="text-[clamp(1.5rem,4vw,3rem)] font-[family-name:var(--font-milan)] leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Numbers don&apos;t lie.{" "}
            <span style={{ color: ACCENT }}>Neither do they.</span>
          </motion.h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="group text-center p-3 sm:p-5 border border-[#F7F7F3]/[0.06] rounded-2xl bg-[#F7F7F3]/[0.02] transition-all duration-500 hover:border-[#C77DFF]/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <span
                className="block text-2xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-monument)] font-bold mb-1"
                style={{ color: ACCENT }}
              >
                {stat.number}
              </span>
              <span className="block text-xs sm:text-sm font-[family-name:var(--font-monument)] uppercase tracking-wider text-white mb-1.5">
                {stat.label}
              </span>
              <span className="block text-[10px] sm:text-xs text-white/50 font-[family-name:var(--font-satoshi)] leading-snug">
                {stat.description}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              className={`relative border border-[#F7F7F3]/[0.06] rounded-2xl p-4 sm:p-6 bg-[#F7F7F3]/[0.02]${i === 4 ? " md:col-span-2 lg:col-span-1" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.08 }}
            >
              {/* Quote mark */}
              <span
                className="block text-3xl sm:text-5xl font-[family-name:var(--font-playfair)] leading-none mb-2"
                style={{ color: `${ACCENT}30` }}
              >
                &ldquo;
              </span>

              <p className="text-xs sm:text-base text-white/80 font-[family-name:var(--font-playfair)] italic leading-snug mb-3">
                {item.quote}
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-[family-name:var(--font-monument)] font-bold text-[#08261e]"
                  style={{ background: ACCENT }}
                >
                  {item.name[0]}
                </div>
                <div>
                  <span className="block text-sm text-white/90 font-[family-name:var(--font-satoshi)] font-medium">
                    {item.name}
                  </span>
                  <span className="block text-[10px] text-white/45 font-[family-name:var(--font-satoshi)]">
                    Age {item.age} &middot; Alcovia Community
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
