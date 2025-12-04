"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import TextReveal from "./text-reveal"

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
          viewBox="0 0 800 300"
          preserveAspectRatio="xMidYMid meet"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.path
            d="M50,150 Q80,80 120,100 Q160,120 150,160 Q140,200 100,200 Q60,200 50,150 
               M180,180 Q200,100 240,120 Q280,140 260,180 Q240,220 200,200
               M300,100 L300,220 M300,100 Q340,100 360,140 Q380,180 340,200 Q300,220 300,180
               M400,100 L400,220 M400,100 Q440,100 460,140 Q480,180 440,200 Q400,220 400,180
               M520,150 Q560,80 600,120 Q640,160 600,200 Q560,240 520,200 Q480,160 520,150
               M660,180 Q680,100 720,120 Q760,140 740,180 Q720,220 680,200"
            fill="none"
            stroke="#CEFF2B"
            strokeWidth="45"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
          />
        </motion.svg>
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Title with text reveal */}
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

          <motion.p
            className="max-w-md self-end text-base text-[#0B0B0B]/70 md:text-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Alcovia is proud to collaborate with a range of partners, who share our passion for empowering students
            across India.
          </motion.p>
        </div>

        {/* Partner logos */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="group flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <span className="text-xl font-bold tracking-wider text-[#0B0B0B] transition-colors group-hover:text-[#CEFF2B] md:text-2xl">
                {partner.logo}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
