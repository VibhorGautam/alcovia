"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import TextReveal from "./text-reveal"
import InfiniteScrollMentors from "@/components/infinite-scroll-mentors"

export default function PartnersSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-[#F5F5EF] py-24 md:py-32">
      <div className="absolute inset-0 flex items-start justify-center overflow-hidden pointer-events-none">
        <motion.svg
          className="absolute top-0 w-full h-[500px]"
          viewBox="0 0 900 300"
          preserveAspectRatio="xMidYMid meet"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <defs>
            <linearGradient id="premiumFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EABF36" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#EABF36" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#EABF36" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="premiumStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EABF36" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#EABF36" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EABF36" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          <motion.text
            x="50%"
            y="38%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="url(#premiumFill)"
            stroke="url(#premiumStroke)"
            strokeWidth="1.5"
            fontSize="200"
            fontWeight="900"
            letterSpacing="0.02em"
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              textShadow: "0 0 30px rgba(206,255,43,0.3)"
            }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            ALCOVIA
          </motion.text>
        </motion.svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 grid gap-8 md:grid-cols-2 md:gap-16">
          <div>
            <TextReveal delay={0}>
              <h2 className="text-4xl font-black uppercase tracking-tight text-[#0B0B0B] md:text-5xl lg:text-6xl">
                PROUD TO CALL
              </h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <h3 className="text-4xl font-black uppercase tracking-tight text-[#0B0B0B]/60 md:text-5xl lg:text-6xl">
                OUR MENTORS
              </h3>
            </TextReveal>
          </div>

          <TextReveal delay={0.4} highlightColor="#EABF36">
            <p className="max-w-md self-end text-base text-[#0B0B0B]/70 md:text-lg">
              Alcovia is proud to collaborate with a range of mentors, who share our passion for empowering students
              across India.
            </p>
          </TextReveal>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <InfiniteScrollMentors />
      </div>
    </section>
  )
}
