"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import gsap from "gsap"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const leftWingRef = useRef<HTMLDivElement>(null)
  const rightWingRef = useRef<HTMLDivElement>(null)
  const emblemRef = useRef<HTMLDivElement>(null)

  const [isRevealed, setIsRevealed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const portraitCenterRef = useRef({ x: 0, y: 0 })

  // Scroll-based shrink effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.78])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -120])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60])

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    const timer = setTimeout(() => setIsRevealed(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const updateCenter = () => {
      if (portraitRef.current) {
        const rect = portraitRef.current.getBoundingClientRect()
        portraitCenterRef.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        }
      }
    }

    updateCenter()
    window.addEventListener("resize", updateCenter)
    return () => window.removeEventListener("resize", updateCenter)
  }, [])

  // Wing animation on hover
  const handlePortraitMouseEnter = useCallback(() => {
    setIsHovering(true)
    if (prefersReducedMotion) return

    // Wings emerge from behind
    if (leftWingRef.current) {
      gsap.to(leftWingRef.current, {
        x: -80,
        y: -20,
        rotation: -15,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      })
    }

    if (rightWingRef.current) {
      gsap.to(rightWingRef.current, {
        x: 80,
        y: -20,
        rotation: 15,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      })
    }
  }, [prefersReducedMotion])

  const handlePortraitMouseLeave = useCallback(() => {
    setIsHovering(false)
    if (prefersReducedMotion) return

    // Wings retract behind
    if (leftWingRef.current) {
      gsap.to(leftWingRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
      })
    }

    if (rightWingRef.current) {
      gsap.to(rightWingRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
      })
    }
  }, [prefersReducedMotion])

  // Cursor-following wing movement when hovering
  const handlePortraitMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion || !portraitRef.current) return

      const rect = portraitRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      // Portrait 3D tilt
      gsap.to(portraitRef.current, {
        rotateY: x * 6,
        rotateX: -y * 6,
        ease: "power2.out",
        duration: 0.3,
      })

      // Wings follow cursor subtly
      if (leftWingRef.current && isHovering) {
        gsap.to(leftWingRef.current, {
          x: -80 + x * 15,
          y: -20 + y * 10,
          rotation: -15 + x * 5,
          duration: 0.4,
          ease: "power2.out",
        })
      }

      if (rightWingRef.current && isHovering) {
        gsap.to(rightWingRef.current, {
          x: 80 + x * 15,
          y: -20 + y * 10,
          rotation: 15 + x * 5,
          duration: 0.4,
          ease: "power2.out",
        })
      }
    },
    [prefersReducedMotion, isHovering],
  )

  const handlePortraitMouseLeaveReset = useCallback(() => {
    if (!portraitRef.current) return
    gsap.to(portraitRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: "power2.out",
      duration: 0.5,
    })
    handlePortraitMouseLeave()
  }, [handlePortraitMouseLeave])

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      className="hero-viewport relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F7F3]"
      style={{ scale, opacity, y }}
    >
      {/* Background topo/flow lines */}
      <motion.div className="absolute inset-0 opacity-[0.03]" style={{ y: bgY }}>
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[...Array(25)].map((_, i) => (
            <motion.path
              key={i}
              d={`M0,${20 + i * 2.5} Q25,${15 + i * 2.5 + Math.sin(i * 0.5) * 3} 50,${20 + i * 2.5} T100,${20 + i * 2.5}`}
              fill="none"
              stroke="#121212"
              strokeWidth="0.08"
              initial={{ pathLength: 0 }}
              animate={isRevealed ? { pathLength: 1 } : {}}
              transition={{ delay: i * 0.03, duration: 1.5 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Hero grid layout */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-[1fr_auto_1fr]">
        {/* Hero left - headline */}
        <div className="hero-left flex flex-col items-center lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="reveal-line relative mb-2 overflow-hidden">
              <motion.div
                className="reveal-mask absolute inset-0 z-10 bg-[#CEFF2B]"
                initial={{ x: "0%" }}
                animate={isRevealed ? { x: "105%" } : {}}
                transition={{ delay: 0.9, duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              />
              <h1 className="reveal-text text-5xl font-black uppercase tracking-tighter text-[#0C0C0C] md:text-7xl lg:text-8xl">
                ALCOVIA
              </h1>
            </div>
            <div className="reveal-line relative overflow-hidden">
              <motion.div
                className="reveal-mask absolute inset-0 z-10 bg-[#CEFF2B]"
                initial={{ x: "0%" }}
                animate={isRevealed ? { x: "105%" } : {}}
                transition={{ delay: 1.05, duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              />
              <p className="reveal-text max-w-sm text-sm text-[#0C0C0C]/70 md:text-base">
                Empowering Indian teens to become tomorrow&apos;s leaders
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hero center - portrait with wings */}
        <div className="hero-center relative flex items-center justify-center">
          {/* Left Wing - Angel wing image */}
          <div
            ref={leftWingRef}
            className="pointer-events-none absolute z-10"
            style={{
              opacity: 0,
              transform: "scale(0.8)",
              left: "50%",
              top: "50%",
              marginLeft: "-280px",
              marginTop: "-200px",
            }}
          >
            <Image
              src="/images/element-download-1764790639.png"
              alt="Angel wing left"
              width={350}
              height={350}
              className="object-contain drop-shadow-2xl"
              style={{
                filter: "drop-shadow(0 10px 40px rgba(206,255,43,0.3))",
                transform: "scaleX(-1)", // Flip for left wing
              }}
            />
          </div>

          {/* Right Wing - Angel wing image */}
          <div
            ref={rightWingRef}
            className="pointer-events-none absolute z-10"
            style={{
              opacity: 0,
              transform: "scale(0.8)",
              right: "50%",
              top: "50%",
              marginRight: "-280px",
              marginTop: "-200px",
            }}
          >
            <Image
              src="/images/element-download-1764790639.png"
              alt="Angel wing right"
              width={350}
              height={350}
              className="object-contain drop-shadow-2xl"
              style={{
                filter: "drop-shadow(0 10px 40px rgba(206,255,43,0.3))",
              }}
            />
          </div>

          {/* Portrait card */}
          <motion.div
            ref={portraitRef}
            className="relative z-20 h-[420px] w-[300px] overflow-hidden rounded-3xl bg-transparent md:h-[550px] md:w-[380px] lg:h-[620px] lg:w-[440px]"
            style={{
              perspective: 1000,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={isRevealed ? { clipPath: "circle(100% at 50% 50%)" } : {}}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
            onMouseEnter={handlePortraitMouseEnter}
            onMouseMove={handlePortraitMouseMove}
            onMouseLeave={handlePortraitMouseLeaveReset}
          >
            {/* New student image */}
            <Image
              src="/images/image-from-rawpixel-id-13286427-png.png"
              alt="Young Indian student ready to take flight with Alcovia"
              fill
              className="object-contain object-center"
              style={{ filter: "contrast(1.05) saturate(0.95) brightness(0.98)" }}
              priority
            />

            {/* Hover glow effect */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              animate={{
                boxShadow: isHovering
                  ? "0 0 60px 20px rgba(206,255,43,0.3), inset 0 0 40px rgba(206,255,43,0.1)"
                  : "0 0 0px 0px rgba(206,255,43,0)",
              }}
              transition={{ duration: 0.4 }}
            />

            {/* Emblem overlay at bottom */}
            <motion.div
              ref={emblemRef}
              className="absolute bottom-4 left-1/2 -translate-x-1/2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#CEFF2B]/90 shadow-lg backdrop-blur-sm">
                <svg className="h-6 w-6 text-[#0C0C0C]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L9 9H2l6 5-2.5 8L12 17l6.5 5L16 14l6-5h-7L12 2z" />
                </svg>
              </div>
            </motion.div>
          </motion.div>

          {/* "Hover to reveal wings" hint */}
          <motion.p
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs uppercase tracking-widest text-[#0C0C0C]/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 0 : 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            Hover to reveal wings
          </motion.p>
        </div>

        {/* Hero right - CTA and decorative */}
        <div className="hero-right flex flex-col items-center gap-6 lg:items-end">
          <motion.button
            className="group relative overflow-hidden rounded-full border-2 border-[#0C0C0C] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] transition-all hover:border-[#CEFF2B]"
            initial={{ opacity: 0, y: 20 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 transition-colors group-hover:text-[#0C0C0C]">Start Your Journey</span>
            <motion.div
              className="absolute inset-0 -z-0 bg-[#CEFF2B]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.button>

          {/* Scroll indicator */}
          <motion.div
            className="mt-8 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#0C0C0C]/50">Scroll</span>
            <motion.div
              className="h-14 w-0.5 rounded-full bg-[#0C0C0C]/20"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
