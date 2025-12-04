"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import TextReveal from "./text-reveal"

const socials = [
  {
    platform: "Twitter",
    handle: "@alcovia",
    followers: "",
    image: "/placeholder.svg?height=500&width=340",
    url: "https://twitter.com/alcovia",
  },
  {
    platform: "Instagram",
    handle: "@alcovia.in",
    followers: "639",
    image: "/placeholder.svg?height=500&width=340",
    url: "https://instagram.com/alcovia.in",
  },
  {
    platform: "LinkedIn",
    handle: "Alcovia",
    followers: "1,190",
    image: "/placeholder.svg?height=500&width=340",
    url: "https://linkedin.com/company/alcovia",
  },
  {
    platform: "YouTube",
    handle: "Alcovia",
    followers: "10K",
    image: "/placeholder.svg?height=500&width=340",
    url: "https://youtube.com/@alcovia",
  },
  {
    platform: "Newsletter",
    handle: "Weekly Insights",
    followers: "20K",
    image: "/placeholder.svg?height=500&width=340",
    url: "#newsletter",
  },
]

export default function SocialFan() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-50px" })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getRotation = (index: number) => {
    const center = (socials.length - 1) / 2
    const offset = index - center
    // More dramatic rotation for outer cards (18° per position)
    return offset * 18
  }

  const getScale = (index: number) => {
    const center = Math.floor(socials.length / 2)
    const distance = Math.abs(index - center)
    // Center card is largest, outer cards progressively smaller
    if (distance === 0) return 1.12
    if (distance === 1) return 1.0
    return 0.9
  }

  const getZIndex = (index: number) => {
    const center = Math.floor(socials.length / 2)
    return socials.length - Math.abs(index - center)
  }

  const getXOffset = (index: number) => {
    const center = (socials.length - 1) / 2
    // Wider horizontal spread (100px per card position)
    return (index - center) * 100
  }

  // Y offset to create arc effect - outer cards sit lower
  const getYOffset = (index: number) => {
    const center = Math.floor(socials.length / 2)
    const distance = Math.abs(index - center)
    return distance * 25
  }

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#F5F5EF] px-6 py-24 md:px-12">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-48 top-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#CEFF2B]/8 to-transparent blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-48 bottom-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-[#CEFF2B]/6 to-transparent blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />

        <svg className="absolute inset-0 h-full w-full opacity-[0.04]" preserveAspectRatio="none">
          {[...Array(12)].map((_, i) => (
            <motion.path
              key={i}
              d={`M0,${35 + i * 5} Q50,${30 + i * 5 + Math.sin(i) * 8} 100,${35 + i * 5}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-[#0B0B0B]"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 2 }}
            />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Title with text reveal */}
        <div className="mb-16 text-center md:mb-24">
          <TextReveal delay={0}>
            <h2 className="text-5xl font-black uppercase tracking-tight text-[#0B0B0B] md:text-6xl lg:text-8xl">
              VIEW US
            </h2>
          </TextReveal>
          <TextReveal delay={0.2}>
            <h2 className="text-5xl font-black uppercase tracking-tight text-[#0B0B0B]/50 md:text-6xl lg:text-8xl">
              ON SOCIALS
            </h2>
          </TextReveal>
        </div>

        {/* Fan of cards - responsive to mobile */}
        <div className="relative flex h-auto flex-col items-center gap-6 md:h-[650px] lg:h-[700px] lg:flex-row lg:justify-center">
          {socials.map((social, index) => (
            <motion.div
              key={social.platform}
              data-card
              className="w-full cursor-pointer md:absolute md:w-auto"
              initial={{
                opacity: 0,
                y: 150,
                x: -200,
                rotate: -40,
                scale: 0.7,
              }}
              animate={
                isInView
                  ? {
                    opacity: 1,
                    y: isMobile ? 0 : getYOffset(index),
                    x: isMobile ? 0 : getXOffset(index),
                    rotate: isMobile ? (index % 2 === 0 ? -3 : 3) : getRotation(index),
                    scale: isMobile ? 1 : getScale(index),
                  }
                  : {}
              }
              transition={{
                delay: index * 0.08,
                duration: 1,
                type: "spring",
                stiffness: 80,
                damping: 16,
              }}
              style={{
                transformOrigin: "bottom center",
                zIndex: isMobile ? index : getZIndex(index),
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                zIndex: 50,
                y: isMobile ? 0 : -40,
                boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                transition: { duration: 0.3, type: "spring", stiffness: 200 },
              }}
            >
              <div className="relative mx-auto h-[320px] w-[280px] overflow-hidden rounded-3xl shadow-2xl md:h-[450px] md:w-[280px] lg:h-[520px] lg:w-[320px]">
                <Image
                  src={social.image || "/placeholder.svg"}
                  alt={`${social.platform} - ${social.handle}`}
                  fill
                  className="object-cover"
                  style={{ filter: "contrast(1.05) saturate(0.9)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-[#0B0B0B]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <span className="mb-2 inline-block rounded-full bg-[#CEFF2B] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#0B0B0B] md:px-4 md:text-sm">
                    {social.platform}
                  </span>
                  <h3 className="text-lg font-bold text-white md:text-xl">{social.handle}</h3>
                  <p className="text-sm text-white/70 md:text-base">{social.followers} followers</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 flex justify-center md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.button
            className="rounded-full bg-[#0B0B0B] px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#0B0B0B]/90 md:text-base"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Follow Us Everywhere
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
