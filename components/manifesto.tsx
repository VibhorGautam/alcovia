"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import gsap from "gsap"

interface TextWord {
  text: string
  isAccent: boolean
}

const manifestoWords: TextWord[] = [
  { text: "ALCOVIA", isAccent: false },
  { text: "IS", isAccent: false },
  { text: "AN", isAccent: false },
  { text: "ELITE", isAccent: true },
  { text: "COMMUNITY", isAccent: false },
  { text: "FOR", isAccent: false },
  { text: "TOP 1%", isAccent: true },
  { text: "TEENS", isAccent: false },
  { text: "AGED", isAccent: false },
  { text: "11-16.", isAccent: true },
  { text: "WITH", isAccent: false },
  { text: "A", isAccent: false },
  { text: "3%", isAccent: true },
  { text: "SELECTION", isAccent: false },
  { text: "RATE,", isAccent: false },
  { text: "ONLY", isAccent: false },
  { text: "THE", isAccent: false },
  { text: "MOST", isAccent: false },
  { text: "DRIVEN", isAccent: true },
  { text: "MAKE", isAccent: false },
  { text: "IT.", isAccent: false },
  { text: "EXPECT", isAccent: false },
  { text: "BOLD", isAccent: true },
  { text: "LEARNING,", isAccent: false },
  { text: "REAL", isAccent: false },
  { text: "FAILURE,", isAccent: true },
  { text: "AND", isAccent: false },
  { text: "BUILDING", isAccent: false },
  { text: "WITH", isAccent: false },
  { text: "FRIENDS.", isAccent: false },
  { text: "THIS", isAccent: false },
  { text: "IS", isAccent: false },
  { text: "A", isAccent: false },
  { text: "JOURNEY", isAccent: true },
  { text: "OF", isAccent: false },
  { text: "SELF-DISCOVERY", isAccent: false },
  { text: "AND", isAccent: false },
  { text: "LEGACY.", isAccent: true },
  { text: "START", isAccent: false },
  { text: "BUILDING", isAccent: false },
  { text: "THE", isAccent: false },
  { text: "FUTURE", isAccent: true },
  { text: "NOW.", isAccent: false },
];



export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<(HTMLDivElement | null)[]>([])
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      if (prefersReducedMotion) {
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

  //   useEffect(() => {
  //   if (!isInView || hasAnimated) return;

  //   setHasAnimated(true);

  //   const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  //   if (prefersReducedMotion) {
  //     linesRef.current.forEach((line) => {
  //       if (!line) return;

  //       const text = line.querySelector(".reveal-text");
  //       const mask = line.querySelector(".reveal-mask");

  //       if (text) gsap.set(text, { opacity: 1, y: 0 });
  //       if (mask) gsap.set(mask, { xPercent: 105 });
  //     });
  //     return;
  //   }

  //   // Batch DOM queries for better performance
  //   const elements = linesRef.current
  //     .map((line) => {
  //       if (!line) return null;
  //       return {
  //         mask: line.querySelector(".reveal-mask"),
  //         text: line.querySelector(".reveal-text"),
  //       };
  //     })
  //     .filter((el) => el?.mask && el?.text);

  //   // Create animations
  //   elements.forEach(({ mask, text }, i) => {
  //     const stagger = i * 0.15;
  //     const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  //     tl.set(text, { opacity: 0, y: 20 })
  //       .to(mask, { 
  //         xPercent: 105, 
  //         duration: 1.1 
  //       }, stagger)
  //       .to(text, { 
  //         opacity: 1, 
  //         y: 0, 
  //         duration: 1.05 
  //       }, stagger + 0.06);
  //   });
  // }, [isInView, hasAnimated]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] overflow-hidden bg-transparent px-6 pb-20 pt-4 md:min-h-screen md:px-12 md:py-24 lg:px-20"
      data-theme="graded"
    >

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

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <div
          ref={(el) => {
            linesRef.current[0] = el
          }}
          className="reveal-line relative overflow-hidden"
        >
          <div className="reveal-mask absolute inset-0 z-20 bg-[#CEFF2B]" style={{ transform: "translateX(0%)" }} />

          <p
            className="reveal-text font-[family-name:var(--font-milan)] text-2xl font-normal leading-[1.15] tracking-tight sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            {manifestoWords.map((word, index) => (
              <span
                key={index}
                className={word.isAccent ? "text-[#CEFF2B]" : "text-[#F7F7F3]"}
                style={{ marginLeft: word.text.includes("Unprecedented") ? "0.3em" : undefined }}
              >
                {word.text}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>

    </section>
  )
}
