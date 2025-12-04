"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"

interface LoaderProps {
  onLoadingComplete: () => void
}

export default function Loader({ onLoadingComplete }: LoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [hasClicked, setHasClicked] = useState(false)
  const [currentText, setCurrentText] = useState("READY TO FLY?")
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorInnerRef = useRef<HTMLDivElement>(null)
  const cursorHaloRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const godRaysRef = useRef<HTMLDivElement>(null)
  const wingWatermarkRef = useRef<SVGSVGElement>(null)
  const flightPathRef = useRef<HTMLDivElement>(null)

  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const isHoveringText = useRef(false)
  const autoTriggerTimer = useRef<NodeJS.Timeout | null>(null)

  const textVariants = ["READY TO FLY?", "READY TO GROW?", "READY TO LEAD?", "READY TO BUILD?", "READY TO TAKE OFF?"]

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  // Custom cursor tracking with GSAP
  useEffect(() => {
    if (prefersReducedMotion || !cursorRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      // Create speed sparks on fast movement
      if (particlesRef.current && Math.random() > 0.92) {
        const spark = document.createElement("div")
        spark.className = "absolute w-1 h-1 rounded-full bg-[#CEFF2B] pointer-events-none"
        spark.style.left = `${e.clientX}px`
        spark.style.top = `${e.clientY}px`
        particlesRef.current.appendChild(spark)

        gsap.to(spark, {
          x: (Math.random() - 0.5) * 30,
          y: (Math.random() - 0.5) * 30,
          opacity: 0,
          scale: 0,
          duration: 0.25,
          ease: "power2.out",
          onComplete: () => spark.remove(),
        })
      }
    }

    // Cursor animation loop with lerp
    const animate = () => {
      if (!cursorRef.current || !cursorInnerRef.current || !cursorHaloRef.current) return

      const lerp = 0.12
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lerp
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lerp

      cursorRef.current.style.transform = `translate(${cursorPos.current.x - 7}px, ${cursorPos.current.y - 7}px)`
      cursorInnerRef.current.style.transform = `translate(${mousePos.current.x - 2.5}px, ${mousePos.current.y - 2.5}px)`
      cursorHaloRef.current.style.transform = `translate(${cursorPos.current.x - 22}px, ${cursorPos.current.y - 22}px)`

      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [prefersReducedMotion])

  // God rays slow rotation
  useEffect(() => {
    if (prefersReducedMotion || !godRaysRef.current) return

    gsap.to(godRaysRef.current, {
      rotation: 360,
      duration: 3600, // Very slow rotation
      repeat: -1,
      ease: "none",
    })

    // Breathing scale
    gsap.to(godRaysRef.current, {
      scale: 1.02,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }, [prefersReducedMotion])

  // Wing watermark slow movement
  useEffect(() => {
    if (prefersReducedMotion || !wingWatermarkRef.current) return

    gsap.to(wingWatermarkRef.current, {
      x: 30,
      y: 20,
      duration: 50,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }, [prefersReducedMotion])

  // Auto-trigger after 6 seconds
  useEffect(() => {
    autoTriggerTimer.current = setTimeout(() => {
      if (!hasClicked) {
        handleClick()
      }
    }, 6000)

    return () => {
      if (autoTriggerTimer.current) clearTimeout(autoTriggerTimer.current)
    }
  }, [hasClicked])

  // Text hover handlers
  const handleTextMouseEnter = useCallback(() => {
    isHoveringText.current = true

    if (prefersReducedMotion) return

    // Cursor morphs into plane
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        width: 40,
        height: 40,
        borderRadius: 0,
        rotation: -15,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    if (cursorHaloRef.current) {
      gsap.to(cursorHaloRef.current, {
        width: 80,
        height: 80,
        opacity: 0.4,
        duration: 0.3,
      })
    }

    // Random text variant
    const randomIndex = Math.floor(Math.random() * textVariants.length)
    setCurrentText(textVariants[randomIndex])
  }, [prefersReducedMotion])

  const handleTextMouseLeave = useCallback(() => {
    isHoveringText.current = false
    setCurrentText("READY TO FLY?")

    if (prefersReducedMotion) return

    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        width: 14,
        height: 14,
        borderRadius: "50%",
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    if (cursorHaloRef.current) {
      gsap.to(cursorHaloRef.current, {
        width: 44,
        height: 44,
        opacity: 0.2,
        duration: 0.3,
      })
    }
  }, [prefersReducedMotion])

  const handleClick = useCallback(() => {
    if (hasClicked) return
    setHasClicked(true)

    if (autoTriggerTimer.current) clearTimeout(autoTriggerTimer.current)

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false)
        setTimeout(onLoadingComplete, 50)
      },
    })

    if (prefersReducedMotion) {
      // Simple fade transition for reduced motion
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      })
      return
    }

    // Step 1 - Anticipation
    tl.to(textRef.current, {
      y: 3,
      scaleY: 0.98,
      duration: 0.15,
      ease: "power2.in",
    })

    // Step 2 - Camera shake
    tl.to(
      containerRef.current,
      {
        x: "random(-2, 2)",
        y: "random(-2, 2)",
        duration: 0.05,
        repeat: 4,
        ease: "none",
      },
      "-=0.1",
    )

    // Step 3 - Neon shockwave
    tl.fromTo(
      ".shockwave",
      { scale: 0, opacity: 1 },
      { scale: 4, opacity: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2",
    )

    // Step 4 - Plane takeoff
    if (cursorRef.current) {
      tl.to(
        cursorRef.current,
        {
          x: window.innerWidth + 100,
          y: -100,
          rotation: -30,
          scale: 0.5,
          duration: 0.8,
          ease: "power3.in",
        },
        "-=0.4",
      )
    }

    // Step 5 - Flight path dots
    if (flightPathRef.current) {
      tl.to(
        ".flight-dot",
        {
          opacity: 1,
          stagger: 0.1,
          duration: 0.1,
        },
        "-=0.6",
      )

      tl.to(
        ".flight-dot",
        {
          opacity: 0,
          stagger: 0.1,
          duration: 0.2,
        },
        "-=0.3",
      )
    }

    // Progress bar animation
    tl.to(
      { value: 0 },
      {
        value: 100,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].value))
        },
      },
      "-=0.8",
    )

    // Step 6 - Page transition (slide left)
    tl.to(
      containerRef.current,
      {
        xPercent: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut",
      },
      "-=0.2",
    )
  }, [hasClicked, onLoadingComplete, prefersReducedMotion])

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : ""
    document.body.style.cursor = isLoading && !prefersReducedMotion ? "none" : ""
    return () => {
      document.body.style.overflow = ""
      document.body.style.cursor = ""
    }
  }, [isLoading, prefersReducedMotion])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[100] flex cursor-none flex-col items-center justify-center overflow-hidden bg-[#F7F7F3]"
          onClick={handleClick}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Layer 2 - Topographic grids */}
          <div className="pointer-events-none absolute inset-0">
            {/* Grid A */}
            <svg
              className="absolute inset-0 h-full w-full opacity-[0.03]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {[...Array(20)].map((_, i) => (
                <path
                  key={`a-${i}`}
                  d={`M0,${10 + i * 4} Q25,${8 + i * 4 + Math.sin(i) * 2} 50,${10 + i * 4} T100,${10 + i * 4}`}
                  fill="none"
                  stroke="#0C0C0C"
                  strokeWidth="0.1"
                />
              ))}
            </svg>

            {/* Grid B - with blur */}
            <svg
              className="absolute inset-0 h-full w-full opacity-[0.05] blur-[2px]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {[...Array(15)].map((_, i) => (
                <path
                  key={`b-${i}`}
                  d={`M0,${15 + i * 5} Q30,${12 + i * 5 + Math.cos(i) * 3} 60,${15 + i * 5} T100,${15 + i * 5}`}
                  fill="none"
                  stroke="#0C0C0C"
                  strokeWidth="0.15"
                />
              ))}
            </svg>

            {/* Grid C - more blur, cursor parallax */}
            <motion.svg
              className="absolute inset-0 h-full w-full opacity-[0.08] blur-[4px]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              animate={{
                x: (mousePos.current.x - window.innerWidth / 2) * 0.01,
                y: (mousePos.current.y - window.innerHeight / 2) * 0.01,
              }}
            >
              {[...Array(12)].map((_, i) => (
                <path
                  key={`c-${i}`}
                  d={`M0,${20 + i * 6} Q40,${17 + i * 6 + Math.sin(i * 0.7) * 4} 70,${20 + i * 6} T100,${20 + i * 6}`}
                  fill="none"
                  stroke="#0C0C0C"
                  strokeWidth="0.2"
                />
              ))}
            </motion.svg>
          </div>

          {/* Layer 3 - God Rays */}
          {!prefersReducedMotion && (
            <div
              ref={godRaysRef}
              className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.06]"
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-[200vh] w-2 bg-gradient-to-b from-transparent via-[#CEFF2B]/30 to-transparent"
                  style={{
                    transform: `rotate(${i * 45}deg)`,
                    transformOrigin: "center center",
                  }}
                />
              ))}
            </div>
          )}

          {/* Layer 4 - Ambient particles */}
          {!prefersReducedMotion && (
            <div ref={particlesRef} className="pointer-events-none absolute inset-0">
              {[...Array(35)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-[#0C0C0C]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.1,
                  }}
                  animate={{
                    x: [0, (Math.random() - 0.5) * 50, 0],
                    y: [0, (Math.random() - 0.5) * 50, 0],
                    opacity: [0.05, 0.1, 0.05],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          )}

          {/* Layer 5 - Giant wing watermark */}
          {!prefersReducedMotion && (
            <svg
              ref={wingWatermarkRef}
              className="pointer-events-none absolute h-[80vh] w-[80vh] opacity-[0.03]"
              viewBox="0 0 200 200"
              fill="none"
            >
              <path d="M100,100 Q60,30 10,10 Q5,60 10,100 Q20,90 60,95 Q80,98 100,100 Z" fill="#0C0C0C" />
              <path d="M100,100 Q60,170 10,190 Q5,140 10,100 Q20,110 60,105 Q80,102 100,100 Z" fill="#0C0C0C" />
              <path d="M100,100 Q140,30 190,10 Q195,60 190,100 Q180,90 140,95 Q120,98 100,100 Z" fill="#0C0C0C" />
              <path d="M100,100 Q140,170 190,190 Q195,140 190,100 Q180,110 140,105 Q120,102 100,100 Z" fill="#0C0C0C" />
            </svg>
          )}

          {/* Shockwave element */}
          <div className="shockwave pointer-events-none absolute h-40 w-40 rounded-full border-4 border-[#CEFF2B] opacity-0" />

          {/* Flight path dots */}
          {!prefersReducedMotion && (
            <div ref={flightPathRef} className="pointer-events-none absolute inset-0">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flight-dot absolute h-2 w-2 rounded-full bg-[#CEFF2B] opacity-0"
                  style={{
                    left: `${50 + i * 10}%`,
                    top: `${50 - i * 5}%`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Hero text */}
            <motion.h1
              ref={textRef}
              className="relative select-none text-center text-5xl font-black uppercase tracking-tight text-[#0C0C0C] transition-colors duration-200 hover:text-[#CEFF2B] sm:text-7xl md:text-8xl lg:text-[10rem]"
              initial={{ opacity: 0, y: 20, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              onMouseEnter={handleTextMouseEnter}
              onMouseLeave={handleTextMouseLeave}
              style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
              }}
              whileHover={{
                rotateX: -5,
                transition: { duration: 0.3 },
              }}
            >
              {currentText}

              {/* Shimmer effect on hover */}
              <motion.span
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </motion.h1>

            {!hasClicked && (
              <motion.p
                className="text-sm uppercase tracking-widest text-[#0C0C0C]/50"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              >
                Click anywhere to begin
              </motion.p>
            )}

            {hasClicked && (
              <motion.div
                className="flex w-full max-w-lg flex-col items-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="font-mono text-3xl font-bold text-[#0C0C0C]">{progress}%</span>
                <div className="h-1 w-full overflow-hidden rounded-full bg-[#0C0C0C]/10">
                  <motion.div className="h-full rounded-full bg-[#CEFF2B]" style={{ width: `${progress}%` }} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Custom cursor elements */}
          {!prefersReducedMotion && (
            <>
              {/* Outer ring */}
              <div
                ref={cursorRef}
                className="pointer-events-none fixed left-0 top-0 z-[200] flex h-[14px] w-[14px] items-center justify-center rounded-full border-2 border-[#0C0C0C]"
                style={{ willChange: "transform" }}
              >
                {/* Plane icon when hovering text */}
                <svg
                  className={`h-4 w-4 text-[#CEFF2B] transition-opacity ${isHoveringText.current ? "opacity-100" : "opacity-0"}`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>

              {/* Inner dot */}
              <div
                ref={cursorInnerRef}
                className="pointer-events-none fixed left-0 top-0 z-[201] h-[5px] w-[5px] rounded-full bg-[#0C0C0C]"
                style={{ willChange: "transform" }}
              />

              {/* Neon halo */}
              <div
                ref={cursorHaloRef}
                className="pointer-events-none fixed left-0 top-0 z-[199] h-[44px] w-[44px] rounded-full bg-[#CEFF2B]/20 blur-md"
                style={{ willChange: "transform" }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
