"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import TextReveal from "./text-reveal"
import FlipLink from "@/components/flip-link"

const partners = [
  { name: "Harvard University", logo: "HARVARD" },
  { name: "UCL", logo: "UCL" },
  { name: "IIT Delhi", logo: "IIT" },
  { name: "Stanford", logo: "STANFORD" },
  { name: "MIT", logo: "MIT" },
  { name: "Oxford", logo: "OXFORD" },
  { name: "Cambridge", logo: "CAMBRIDGE" },
]

export default function PartnersSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#F5F5EF] px-6 py-24 md:px-12 md:py-32">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.svg
          className="h-[400px] w-full md:h-[500px] lg:h-[600px]"
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
            y="55%"
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

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 grid gap-8 md:grid-cols-2 md:gap-16">
          <div>
            <TextReveal delay={0}>
              <h2 className="text-4xl font-black uppercase tracking-tight text-[#0B0B0B] md:text-5xl lg:text-6xl">
                PARTNERS
              </h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <h3 className="text-4xl font-black uppercase tracking-tight text-[#0B0B0B]/60 md:text-5xl lg:text-6xl">
                &CAMPAIGNS
              </h3>
            </TextReveal>
          </div>

          <TextReveal delay={0.4} highlightColor="#EABF36">
            <p className="max-w-md self-end text-base text-[#0B0B0B]/70 md:text-lg">
              Alcovia is proud to collaborate with a range of partners, who share our passion for empowering students
              across India.
            </p>
          </TextReveal>
        </div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="group flex flex-col items-center cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <FlipLink
                href="#"
                className="text-xl font-bold tracking-wider md:text-2xl"
                baseColor="#0B0B0B"
                hoverColor="#EABF36"
              >
                {partner.logo}
              </FlipLink>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
