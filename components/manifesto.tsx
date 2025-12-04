"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import gsap from "gsap"

interface TextLine {
  words: Array<{ text: string; isAccent: boolean }>
}

const manifestoLines: TextLine[] = [
  {
    words: [
      { text: "UNPRECEDENTED", isAccent: true },
      { text: " LEARNINGS,", isAccent: false },
    ],
  },
  {
    words: [
      { text: "FAILING ", isAccent: false },
      { text: "REGULARLY", isAccent: true },
      { text: ",", isAccent: false },
    ],
  },
  {
    words: [{ text: "BUILDING WITH FRIENDS,", isAccent: false }],
  },
  {
    words: [
      { text: "WHILE BEING ON A ", isAccent: false },
      { text: "JOURNEY", isAccent: true },
    ],
  },
  {
    words: [{ text: "OF SELF DISCOVERY.", isAccent: false }],
  },
  {
    words: [
      { text: "GET ON A ", isAccent: false },
      { text: "LEGACY", isAccent: true },
    ],
  },
  {
    words: [{ text: "BUILDING JOURNEY TODAY,", isAccent: false }],
  },
  {
    words: [
      { text: "TO BUILD THE ", isAccent: false },
      { text: "FUTURE", isAccent: true },
    ],
  },
  {
    words: [{ text: "OF TOMORROW.", isAccent: false }],
  },
]

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<(HTMLDivElement | null)[]>([])
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)

      // Check for reduced motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      if (prefersReducedMotion) {
        // Simple fade for reduced motion
        linesRef.current.forEach((line) => {
          if (line) {
            const text = line.querySelector(".reveal-text")
            const mask = line.querySelector(".reveal-mask")
            if (text) gsap.set(text, { opacity: 1, y: 0 })
            if (mask) gsap.set(mask, { xPercent: 105 })
          }
        })
        return
      }

      // GSAP timeline for mask reveal
      linesRef.current.forEach((line, i) => {
        if (!line) return

        const mask = line.querySelector(".reveal-mask")
        const text = line.querySelector(".reveal-text")

        if (!mask || !text) return

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        tl.set(text, { opacity: 0, y: 20 })
        tl.to(
          mask,
          {
            xPercent: 105,
            duration: 1.1,
          },
          i * 0.15,
        )
        tl.to(
          text,
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
          },
          i * 0.15 + 0.06,
        )
      })
    }
  }, [isInView, hasAnimated])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#3d4a2a] px-6 py-24 md:px-12 lg:px-20"
      data-theme="graded"
    >
      {/* Background contour pattern */}
      <div className="absolute inset-0 opacity-[0.06]">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[...Array(20)].map((_, i) => (
            <path
              key={i}
              d={`M0,${20 + i * 3} Q25,${15 + i * 3 + Math.sin(i) * 3} 50,${20 + i * 3} T100,${20 + i * 3}`}
              fill="none"
              stroke="#F7F7F3"
              strokeWidth="0.1"
            />
          ))}
        </svg>
      </div>

      {/* Badge at top */}
      <motion.div
        className="relative z-10 mb-12 flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center">
          <svg className="h-16 w-16 text-[#F7F7F3]/60" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1" />
            <path d="M32 12 L34 20 L32 18 L30 20 Z" fill="currentColor" />
            <path d="M20 26 C24 28, 28 26, 32 28 C36 26, 40 28, 44 26" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="32" cy="36" r="8" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span className="mt-2 text-xs uppercase tracking-[0.3em] text-[#F7F7F3]/50">MENTORSHIP SINCE 2024</span>
        </div>
      </motion.div>

      {/* Main text with GSAP mask reveal */}
      <div className="relative z-10 mx-auto max-w-6xl">
        {manifestoLines.map((line, lineIndex) => (
          <div
            key={lineIndex}
            ref={(el) => {
              linesRef.current[lineIndex] = el
            }}
            className="reveal-line relative mb-1 overflow-hidden md:mb-2"
          >
            {/* Neon mask that slides right */}
            <div className="reveal-mask absolute inset-0 z-20 bg-[#CEFF2B]" style={{ transform: "translateX(0%)" }} />

            {/* Text content */}
            <div
              className="reveal-text flex flex-wrap text-3xl font-bold italic leading-[0.95] tracking-tight md:text-5xl lg:text-6xl xl:text-7xl"
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              {line.words.map((word, wordIndex) => (
                <span key={wordIndex} className={word.isAccent ? "text-[#CEFF2B]" : "text-[#F7F7F3]"}>
                  {word.text}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom neon accent blocks */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex"
        initial={{ opacity: 0 }}
        animate={hasAnimated ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="h-20 bg-[#CEFF2B] md:h-28 lg:h-36"
          initial={{ width: 0 }}
          animate={hasAnimated ? { width: "42%" } : {}}
          transition={{ delay: 2.1, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <motion.div
          className="ml-auto h-14 self-end bg-[#CEFF2B] md:h-20 lg:h-24"
          initial={{ width: 0 }}
          animate={hasAnimated ? { width: "28%" } : {}}
          transition={{ delay: 2.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </motion.div>
    </section>
  )
}
