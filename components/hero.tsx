"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import gsap from "gsap"
import { useHeroAnimation } from "@/context/hero-animation-context"

import {
  checkReducedMotion,
  isMobile,
  initPageLoadTimeline,
  initSpotlightBreathing,
  createWingRevealTimeline,
  createWingHoverAnimation,
  createWingFoldAnimation,
  createCTAMagneticPull,
  createCTANeonSweep,
  createCTAClickRipple,
  createAmbientParticles,
  createPlaneTakeoff,
  createFloatingDoodles,
  COLORS,
} from "@/lib/hero-animations"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const leftWingRef = useRef<HTMLDivElement>(null)
  const rightWingRef = useRef<HTMLDivElement>(null)
  const wingsContainerRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const parallaxLayer1Ref = useRef<HTMLDivElement>(null)
  const parallaxLayer2Ref = useRef<HTMLDivElement>(null)
  const parallaxLayer3Ref = useRef<HTMLDivElement>(null)
  const doodlesContainerRef = useRef<HTMLDivElement>(null)

  const { setHeroAnimationComplete } = useHeroAnimation()
  const [isRevealed, setIsRevealed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const wingRevealTlRef = useRef<gsap.core.Timeline | null>(null)
  const wingFoldTlRef = useRef<gsap.core.Tween | null>(null)
  const leftWingAnimRef = useRef<ReturnType<typeof createWingHoverAnimation> | null>(null)
  const rightWingAnimRef = useRef<ReturnType<typeof createWingHoverAnimation> | null>(null)
  const particlesRef = useRef<ReturnType<typeof createAmbientParticles> | null>(null)
  const doodlesRef = useRef<ReturnType<typeof createFloatingDoodles> | null>(null)
  const ctaSweepRef = useRef<ReturnType<typeof createCTANeonSweep> | null>(null)
  const ctaMagneticCleanupRef = useRef<(() => void) | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.78])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -120])

  const parallax1Y = useTransform(scrollYProgress, [0, 1], [0, 30])
  const parallax2Y = useTransform(scrollYProgress, [0, 1], [0, 60])
  const parallax3Y = useTransform(scrollYProgress, [0, 1], [0, 90])

  useEffect(() => {
    const reducedMotion = checkReducedMotion()
    setPrefersReducedMotion(reducedMotion)

    const timer = setTimeout(() => {
      setIsRevealed(true)

      const parallaxLayers = [
        parallaxLayer1Ref.current,
        parallaxLayer2Ref.current,
        parallaxLayer3Ref.current,
      ].filter(Boolean) as HTMLElement[]

      initPageLoadTimeline({
        parallaxLayers,
        spotlight: spotlightRef.current || undefined,
        student: portraitRef.current || undefined,
        cta: ctaRef.current || undefined,
        headline: headlineRef.current || undefined,
        tagline: taglineRef.current || undefined,
      })

      if (spotlightRef.current) {
        initSpotlightBreathing(spotlightRef.current)
      }

      if (leftWingRef.current && rightWingRef.current) {
        wingRevealTlRef.current = createWingRevealTimeline({
          leftWing: leftWingRef.current,
          rightWing: rightWingRef.current,
          wingsContainer: wingsContainerRef.current || undefined,
        })

        leftWingAnimRef.current = createWingHoverAnimation(leftWingRef.current, true)
        rightWingAnimRef.current = createWingHoverAnimation(rightWingRef.current, false)

        wingFoldTlRef.current = createWingFoldAnimation(
          leftWingRef.current,
          rightWingRef.current
        )
      }

      if (ctaRef.current) {
        ctaSweepRef.current = createCTANeonSweep(ctaRef.current)
        ctaMagneticCleanupRef.current = createCTAMagneticPull({
          button: ctaRef.current,
          magnetRadius: 80,
        })
      }

      if (containerRef.current) {
        particlesRef.current = createAmbientParticles({
          container: containerRef.current,
          maxParticles: isMobile() ? 12 : 25,
        })
      }

      if (doodlesContainerRef.current) {
        doodlesRef.current = createFloatingDoodles({
          container: doodlesContainerRef.current,
          quotes: ["Dream big ✨", "Take flight 🚀", "Believe in yourself 💫", "Future leader 🌟"],
        })
      }

      // Mark hero animation complete after girl image animation finishes
      // clipPath animation: 0.4s delay + 1.2s duration = 1.6s
      const animationCompleteTimer = setTimeout(() => {
        setHeroAnimationComplete(true)
      }, 1700) // 1.7s to be safe

      return () => {
        clearTimeout(animationCompleteTimer)
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      particlesRef.current?.destroy()
      doodlesRef.current?.destroy()
      if (ctaMagneticCleanupRef.current) ctaMagneticCleanupRef.current()
    }
  }, [])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      if (value > 0.3 && wingFoldTlRef.current && !isHovering) {
        wingFoldTlRef.current.play()
      } else if (value <= 0.3 && wingFoldTlRef.current) {
        wingFoldTlRef.current.reverse()
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress, isHovering])

  const handlePortraitMouseEnter = useCallback(() => {
    setIsHovering(true)
    if (prefersReducedMotion) return

    wingRevealTlRef.current?.play()
  }, [prefersReducedMotion])

  const handlePortraitMouseLeave = useCallback(() => {
    setIsHovering(false)
    if (prefersReducedMotion) return

    wingRevealTlRef.current?.reverse()
  }, [prefersReducedMotion])

  const handlePortraitMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion || !portraitRef.current) return

      const rect = portraitRef.current.getBoundingClientRect()
      const normalizedX = (e.clientX - rect.left) / rect.width - 0.5
      const normalizedY = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(portraitRef.current, {
        rotateY: normalizedX * 8,
        rotateX: -normalizedY * 8,
        ease: "power2.out",
        duration: 0.3,
      })

      if (isHovering) {
        leftWingAnimRef.current?.follow(normalizedX, normalizedY)
        rightWingAnimRef.current?.follow(normalizedX, normalizedY)
      }
    },
    [prefersReducedMotion, isHovering]
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

  const handleCTAClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ctaRef.current || !containerRef.current) return

      createCTAClickRipple(ctaRef.current, e.nativeEvent)

      const rect = ctaRef.current.getBoundingClientRect()
      createPlaneTakeoff(
        containerRef.current,
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      )
    },
    []
  )

  const handleCTAMouseEnter = useCallback(() => {
    ctaSweepRef.current?.play()
  }, [])

  const handleMobileTap = useCallback(() => {
    if (!isMobile()) return
    setIsHovering((prev) => !prev)

    if (!isHovering) {
      wingRevealTlRef.current?.play()
    } else {
      wingRevealTlRef.current?.reverse()
    }
  }, [isHovering])

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      className="hero-viewport relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F7F3]"
      style={{ scale, opacity, y }}
      role="region"
      aria-label="Hero section - Take flight with Alcovia"
    >
      <motion.div
        ref={parallaxLayer1Ref}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{ y: parallax1Y }}
      >
        <svg className="h-full w-full opacity-[0.02]" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[...Array(20)].map((_, i) => (
            <path
              key={`l1-${i}`}
              d={`M0,${15 + i * 4} Q25,${10 + i * 4 + Math.sin(i * 0.3) * 5} 50,${15 + i * 4} T100,${15 + i * 4}`}
              fill="none"
              stroke="#121212"
              strokeWidth="0.06"
            />
          ))}
        </svg>
      </motion.div>

      <motion.div
        ref={parallaxLayer2Ref}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{ y: parallax2Y, filter: "blur(0.5px)" }}
      >
        <svg className="h-full w-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[...Array(15)].map((_, i) => (
            <path
              key={`l2-${i}`}
              d={`M0,${25 + i * 5} Q30,${20 + i * 5 + Math.cos(i * 0.4) * 4} 60,${25 + i * 5} T100,${25 + i * 5}`}
              fill="none"
              stroke="#121212"
              strokeWidth="0.08"
            />
          ))}
        </svg>
      </motion.div>

      <motion.div
        ref={parallaxLayer3Ref}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{ y: parallax3Y, filter: "blur(1px)" }}
      >
        <svg className="h-full w-full opacity-[0.04]" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[...Array(10)].map((_, i) => (
            <path
              key={`l3-${i}`}
              d={`M0,${35 + i * 6} Q40,${30 + i * 6 + Math.sin(i * 0.5) * 6} 70,${35 + i * 6} T100,${35 + i * 6}`}
              fill="none"
              stroke="#121212"
              strokeWidth="0.1"
            />
          ))}
        </svg>
      </motion.div>

      <div
        ref={spotlightRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{
          background: "radial-gradient(circle, rgba(206,255,43,0.08) 0%, transparent 60%)",
        }}
      />

      <div
        ref={doodlesContainerRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-1">
        <motion.div
          className="absolute left-6 top-24 z-30 hidden md:block lg:left-12 lg:top-32"
          initial={{ opacity: 0, x: -50, rotate: -45 }}
          animate={isRevealed ? { opacity: 1, x: 0, rotate: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[#CEFF2B] drop-shadow-lg"
            animate={{
              y: [0, -8, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <path
              d="M3 3l18 9-18 9 3-9-3-9z"
              fill="currentColor"
              opacity="0.2"
            />
            <path
              d="M3 3l18 9-18 9 3-9-3-9z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <motion.line
              x1="3"
              y1="12"
              x2="21"
              y2="12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            />
          </motion.svg>
        </motion.div>

        <div
          className="hero-center relative flex items-center justify-center pt-20 md:pt-8"
          onClick={handleMobileTap}
        >
          <div
            ref={wingsContainerRef}
            className="pointer-events-none absolute inset-0 z-10 hidden md:block"
            role="img"
            aria-label="Wings symbolising growth and potential"
          >
            <div
              ref={leftWingRef}
              className="absolute"
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
                alt=""
                width={350}
                height={350}
                className="object-contain"
                style={{
                  filter: "drop-shadow(0 10px 40px rgba(206,255,43,0.3))",
                  transform: "scaleX(-1)",
                }}
              />
            </div>

            <div
              ref={rightWingRef}
              className="absolute"
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
                alt=""
                width={350}
                height={350}
                className="object-contain"
                style={{
                  filter: "drop-shadow(0 10px 40px rgba(206,255,43,0.3))",
                }}
              />
            </div>
          </div>

          <motion.div
            ref={portraitRef}
            className="relative z-20 h-[420px] w-[300px] cursor-pointer overflow-hidden rounded-3xl bg-transparent md:h-[550px] md:w-[380px] lg:h-[620px] lg:w-[440px]"
            style={{
              perspective: 1000,
              transformStyle: "preserve-3d",
            }}
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={isRevealed ? { clipPath: "circle(100% at 50% 50%)" } : {}}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
            onMouseEnter={handlePortraitMouseEnter}
            onMouseMove={handlePortraitMouseMove}
            onMouseLeave={handlePortraitMouseLeaveReset}
          >
            <Image
              src="/images/hero-girl.png"
              alt="Young Indian student ready to take flight with Alcovia - representing ambition and growth"
              fill
              className="object-contain object-center"
              style={{ filter: "contrast(1.05) saturate(0.95) brightness(0.98)" }}
              priority
            />

            <motion.div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              animate={{
                boxShadow: isHovering
                  ? "0 0 80px 30px rgba(206,255,43,0.25), inset 0 0 60px rgba(206,255,43,0.08)"
                  : "0 0 0px 0px rgba(206,255,43,0)",
              }}
              transition={{ duration: 0.4 }}
            />

            <motion.div
              className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-transparent"
              animate={{
                borderColor: isHovering ? "rgba(206,255,43,0.15)" : "rgba(206,255,43,0)",
                boxShadow: isHovering
                  ? "inset 0 0 20px rgba(206,255,43,0.1)"
                  : "none",
              }}
              transition={{ duration: 0.3 }}
            />


          </motion.div>

          <motion.p
            className="absolute -bottom-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-xs uppercase tracking-widest text-[#0C0C0C]/40 md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 0 : 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            Hover to reveal wings
          </motion.p>

          <motion.p
            className="absolute -bottom-8 left-1/2 block -translate-x-1/2 whitespace-nowrap text-xs uppercase tracking-widest text-[#0C0C0C]/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 0 : 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            Tap to reveal wings
          </motion.p>
        </div>

        <motion.div
          className="relative z-30 mt-6 flex flex-col items-center text-center md:hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="text-4xl font-black uppercase tracking-tighter text-[#0C0C0C]">
            ALCOVIA
          </h2>
          <p className="mt-2 max-w-xs text-sm text-[#0C0C0C]/70">
            Empowering Indian teens to become tomorrow&apos;s leaders
          </p>
          <motion.button
            className="group relative mt-6 overflow-hidden rounded-full border-2 border-[#0C0C0C] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] transition-all hover:border-[#CEFF2B]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCTAClick}
            aria-label="Start your journey at Alcovia"
          >
            <span className="relative z-10 transition-colors group-hover:text-[#0C0C0C]">
              Start Your Journey
            </span>
            <motion.div
              className="absolute inset-0 -z-0 bg-[#CEFF2B]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-6 z-30 hidden md:block lg:bottom-12 lg:left-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="reveal-line relative mb-2 overflow-hidden">
            <motion.div
              className="reveal-mask absolute inset-0 z-10 bg-[#CEFF2B]"
              initial={{ x: "0%" }}
              animate={isRevealed ? { x: "105%" } : {}}
              transition={{ delay: 1.3, duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            />
            <h2
              ref={headlineRef}
              className="reveal-text text-6xl font-black uppercase tracking-tighter text-[#0C0C0C] md:text-6xl lg:text-[7rem] lg:leading-[0.9]"
            >
              ALCOVIA
            </h2>
          </div>
          <div className="reveal-line relative overflow-hidden">
            <motion.div
              className="reveal-mask absolute inset-0 z-10 bg-[#CEFF2B]"
              initial={{ x: "0%" }}
              animate={isRevealed ? { x: "105%" } : {}}
              transition={{ delay: 1.45, duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            />
            <p
              ref={taglineRef}
              className="reveal-text max-w-sm text-sm text-[#0C0C0C]/70 md:text-base"
            >
              Empowering Indian teens to become tomorrow&apos;s leaders
            </p>
          </div>
        </motion.div>

        <div className="absolute bottom-8 right-6 z-30 hidden flex-col items-center gap-6 md:flex lg:bottom-12 lg:right-12 lg:items-end">
          <motion.button
            ref={ctaRef}
            className="group relative overflow-hidden rounded-full border-2 border-[#0C0C0C] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] transition-all hover:border-[#CEFF2B] focus:outline-none focus:ring-2 focus:ring-[#CEFF2B] focus:ring-offset-2 md:px-8 md:py-4"
            style={{ opacity: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={handleCTAMouseEnter}
            onClick={handleCTAClick}
            aria-label="Start your journey at Alcovia"
          >
            <span className="relative z-10 transition-colors group-hover:text-[#0C0C0C]">
              Start Your Journey
            </span>
            <motion.div
              className="absolute inset-0 -z-0 bg-[#CEFF2B]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.button>

          <motion.button
            className="fixed bottom-0 left-0 right-0 z-50 hidden w-full bg-[#CEFF2B] py-4 text-center text-sm font-bold uppercase tracking-wider text-[#0C0C0C] shadow-lg"
            style={{ display: "none" }}
            aria-label="Start your journey at Alcovia"
          >
            Start Your Journey
          </motion.button>


        </div>
      </div>
    </motion.section>
  )
}
