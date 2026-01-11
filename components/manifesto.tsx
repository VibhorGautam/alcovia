"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import gsap from "gsap"

interface TextWord {
  text: string
  isAccent: boolean
}

// DATA STRUCTURE: Grouped into lines for the "Stacked Bar" look
const manifestoLines: TextWord[][] = [
  [
    { text: "ALCOVIA", isAccent: false },
    { text: "UNITES", isAccent: false },
    { text: "THE", isAccent: false },
    { text: "TOP 1%", isAccent: true },
  ],
  [
    { text: "OF", isAccent: false },
    { text: "TEENAGERS", isAccent: false },
    { text: "AGED", isAccent: false },
    { text: "11-16.", isAccent: true },
  ],
  [
    { text: "WITH", isAccent: false },
    { text: "A", isAccent: false },
    { text: "STRICT", isAccent: false },
    { text: "3%", isAccent: true },
  ],
  [
    { text: "SELECTION", isAccent: false },
    { text: "RATE,", isAccent: false },
    { text: "ENTRY", isAccent: false },
    { text: "IS", isAccent: false },
  ],
  [
    { text: "EARNED,", isAccent: true },
    { text: "NOT", isAccent: false },
    { text: "GIVEN.", isAccent: false },
  ],
  [
    { text: "FOR", isAccent: false },
    { text: "THE", isAccent: false },
    { text: "FEW", isAccent: false },
    { text: "WHO", isAccent: false },
  ],
  [
    { text: "ENTER,", isAccent: false },
    { text: "PREPARE", isAccent: false },
    { text: "FOR", isAccent: false },
  ],
  [
    { text: "A", isAccent: false },
    { text: "YEAR", isAccent: false },
    { text: "OF", isAccent: false },
    { text: "RADICAL", isAccent: true },
  ],
  [
    { text: "GROWTH.", isAccent: false },
    { text: "FAILING", isAccent: true },
    { text: "OFTEN,", isAccent: false },
  ],
  [
    { text: "BUILDING", isAccent: false },
    { text: "TOGETHER,", isAccent: false },
    { text: "AND", isAccent: false },
  ],
  [
    { text: "DISCOVERING", isAccent: false },
    { text: "WHO", isAccent: false },
    { text: "YOU", isAccent: false },
    { text: "ARE.", isAccent: true },
  ],
  [
    { text: "AT", isAccent: false },
    { text: "ALCOVIA,", isAccent: false },
    { text: "WE", isAccent: false },
    { text: "START", isAccent: false },
  ],
  [
    { text: "OUR", isAccent: false },
    { text: "LEGACY", isAccent: true },
    { text: "JOURNEY", isAccent: false },
    { text: "TODAY,", isAccent: false },
  ],
  [
    { text: "TO", isAccent: false },
    { text: "SHAPE", isAccent: false },
    { text: "THE", isAccent: false },
    { text: "FUTURE", isAccent: true },
  ],
  [
    { text: "OF", isAccent: false },
    { text: "TOMORROW.", isAccent: false },
  ],
]

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<(HTMLDivElement | null)[]>([])
  const isInView = useInView(containerRef, { once: true, margin: "-20%" })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      if (prefersReducedMotion) {
        linesRef.current.forEach((line) => {
          if (line) {
            const text = line.querySelector(".reveal-text")
            if (text) gsap.set(text, { opacity: 1 })
          }
        })
        return
      }

      // THE REAL "LANDO" LOGIC: SCALE 0 -> 1 -> 0
      linesRef.current.forEach((line, i) => {
        if (!line) return

        const mask = line.querySelector(".reveal-mask")
        const text = line.querySelector(".reveal-text")

        if (!mask || !text) return

        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut" }
        })

        // 1. INITIAL STATE:
        // Mask is collapsed at the left (ScaleX: 0)
        // Text is completely invisible
        gsap.set(mask, { scaleX: 0, transformOrigin: "left" })
        gsap.set(text, { opacity: 0 })

        // 2. ANIMATION SEQUENCE
        tl.to(mask, {
          scaleX: 1, // Grow to cover the text (Left -> Right)
          duration: 0.4,
        }, i * 0.1) // Stagger

        // At this exact moment, the bar covers the space.
        // We switch the pivot point to the RIGHT side.
        tl.set(mask, { transformOrigin: "right" }, ">")

        // We turn the text ON instantly (it's hidden behind the bar)
        tl.set(text, { opacity: 1 }, ">")

        // We shrink the bar (ScaleX 1 -> 0)
        // Since origin is now "right", it shrinks away to the right, revealing text.
        tl.to(mask, {
          scaleX: 0,
          duration: 0.4,
        }, ">")
      })
    }
  }, [isInView, hasAnimated])

  const className = "w-16 h-16"
  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] overflow-hidden bg-transparent px-4 pb-20 pt-4 md:min-h-screen md:px-12 md:py-24 lg:px-20"
      data-theme="graded"
    >
      {/* Icon Header */}
      <motion.div
        className="relative z-10 mb-12 flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center">
          <Image
            src="/images/alcovia-logo-navbar.png"
            alt="Alcovia Logo"
            width={64}
            height={64}
            className="w-16 h-16 object-contain"
          />
          <span className="mt-2 text-xs uppercase tracking-[0.3em] text-[#F7F7F3]/50">
            MENTORSHIP SINCE 2024
          </span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-6xl flex flex-col items-center text-center">
        {manifestoLines.map((line, i) => (
          <div
            key={i}
            ref={(el) => { linesRef.current[i] = el }}
            // w-fit is CRITICAL for the mask to match text width
            className="reveal-line relative overflow-hidden w-fit my-[-0.1em]"
          >
            {/* THE CURTAIN: 
                Changed to 'inset-0' and removed transform.
                GSAP handles the scale.
             */}
            <div
              className="reveal-mask absolute inset-0 z-20 bg-[#D4AF37]"
            />

            {/* THE TEXT: 
                Added 'opacity-0' class here to prevent the "Wipe Out" effect. 
                It starts invisible, then GSAP reveals it. 
            */}
            <p
              className="reveal-text opacity-0 font-[family-name:var(--font-milan)] text-[22px] font-normal leading-[1.15] tracking-tight sm:text-[28px] md:text-[34px] lg:text-[58px] xl:text-[70px] whitespace-nowrap px-1"
            >
              {line.map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  className={`${word.isAccent
                    ? "text-[#EABF36] tracking-wide font-semibold"
                    : "text-[#F7F7F3]"
                    } mx-[0.15em]`}
                >
                  {word.text}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}