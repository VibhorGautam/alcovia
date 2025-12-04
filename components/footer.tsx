"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Link from "next/link"

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  })

  // Micro parallax for ALCOVIA text
  const textY = useTransform(scrollYProgress, [0, 1], [30, 0])

  return (
    <footer
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#000000] px-6 py-24 md:px-12"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Slow-moving contour lines */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]" preserveAspectRatio="none">
          {[...Array(15)].map((_, i) => (
            <motion.path
              key={i}
              d={`M0,${20 + i * 6} Q25,${15 + i * 6 + Math.sin(i) * 5} 50,${20 + i * 6} T100,${20 + i * 6}`}
              fill="none"
              stroke="#CEFF2B"
              strokeWidth="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 3 }}
            />
          ))}
        </svg>

        {/* Floating radial blobs */}
        <motion.div
          className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-[#CEFF2B]/5 blur-[100px]"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-[#CEFF2B]/3 blur-[80px]"
          animate={{
            x: [0, -25, 0],
            y: [0, 25, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center">
        {/* Giant ALCOVIA text with mask-wipe reveal */}
        <motion.div className="relative flex flex-1 items-center justify-center py-8" style={{ y: textY }}>
          <div className="relative overflow-hidden">
            {/* Mask that wipes away */}
            <motion.div
              className="absolute inset-0 z-20 bg-[#000000]"
              initial={{ x: "0%" }}
              animate={isInView ? { x: "105%" } : {}}
              transition={{ delay: 0.3, duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* ALCOVIA text */}
            <motion.h2
              className="select-none text-center text-[20vw] font-black uppercase leading-none tracking-tighter md:text-[15vw]"
              style={{
                WebkitTextStroke: "4px #CEFF2B",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 40px rgba(206,255,43,0.3))",
              }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.9 } : {}}
              transition={{ delay: 0.5, duration: 1.2 }}
            >
              <motion.span
                animate={{
                  filter: [
                    "drop-shadow(0 0 40px rgba(206,255,43,0.3))",
                    "drop-shadow(0 0 60px rgba(206,255,43,0.5))",
                    "drop-shadow(0 0 40px rgba(206,255,43,0.3))",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ALCOVIA
              </motion.span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <p className="text-center text-sm text-white/50 md:text-left">
            © {new Date().getFullYear()} Alcovia. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-6">
            {["About", "Programs", "Team", "Contact"].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                className="group relative text-sm uppercase tracking-wider text-white/50 transition-colors hover:text-[#CEFF2B]"
                style={{ letterSpacing: "0.1em" }}
              >
                {link}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#CEFF2B] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>
    </footer>
  )
}
