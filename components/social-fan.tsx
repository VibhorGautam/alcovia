"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const socials = [
  {
    platform: "Instagram",
    handle: "@alcovia.in",
    followers: "639",
    image: "/images/insta.jpg",
    url: "https://instagram.com/alcovia.in",
  },
  {
    platform: "LinkedIn",
    handle: "Alcovia",
    followers: "1,190",
    image: "/images/linkedin.jpg",
    url: "https://www.linkedin.com/company/alcovia-life/",
  },
  {
    platform: "YouTube",
    handle: "Alcovia",
    followers: "100",
    image: "/images/youtube.jpg",
    url: "https://youtube.com/@alcovia",
  }
]

export default function SocialFan() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  /* ---------------- DESKTOP LOGIC (UNCHANGED) ---------------- */

  const getRotation = (index: number) => {
    const center = (socials.length - 1) / 2
    return (index - center) * 25
  }

  const getScale = (index: number) => {
    const center = Math.floor(socials.length / 2)
    const distance = Math.abs(index - center)
    if (distance === 0) return 1.1
    if (distance === 1) return 0.95
    return 0.85
  }

  const getZIndex = (index: number) => {
    const center = Math.floor(socials.length / 2)
    return socials.length - Math.abs(index - center)
  }

  const getXOffset = (index: number) => {
    const center = (socials.length - 1) / 2
    return (index - center) * 160
  }

  const getYOffset = (index: number) => {
    const center = Math.floor(socials.length / 2)
    const distance = Math.abs(index - center)
    return Math.pow(distance, 1.8) * 45
  }

  const getCardDeckEffect = (current: number, hovered: number | null) => {
    if (hovered === null) return { x: 0, y: 0, rotate: 0, scale: 1 }

    if (hovered === current) {
      return { x: 0, y: -50, rotate: 0, scale: 1.08 }
    }

    const d = current - hovered
    return {
      x: d * 80,
      y: Math.abs(d) * 25,
      rotate: d * 8,
      scale: 0.92,
    }
  }

  /* ---------------- MOBILE FAN LOGIC ---------------- */

  const getMobileFan = (index: number) => {
    const center = (socials.length - 1) / 2
    const offset = index - center

    return {
      x: offset * 110, // Increased spread from 90 to 110
      y: Math.abs(offset) * 18,
      rotate: offset * 15, // Increased rotation for more dramatic fan
      scale: offset === 0 ? 1 : 0.9,
      zIndex: 10 - Math.abs(offset),
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative bg-[#F5F5EF] px-6 py-24 md:px-12"
    >
      {/* BACKGROUND — untouched */}
      <div className="absolute inset-0 overflow-hidden">
        {/* all your background motion divs exactly as-is */}
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-black uppercase tracking-tight text-[#0B0B0B] md:text-6xl lg:text-8xl">
            FOLLOW ALCOVIA
          </h2>
          <h2 className="text-5xl font-black uppercase tracking-tight text-[#0B0B0B]/50 md:text-6xl lg:text-8xl">
            ON SOCIAL MEDIA
          </h2>
        </motion.div>

        {/* CARD CONTAINER */}
        <div className="relative flex h-[420px] items-center justify-center md:h-[750px] lg:h-[850px]">
          {socials.map((social, index) => {
            const deckEffect = getCardDeckEffect(index, hoveredIndex)
            const mobile = getMobileFan(index)

            return (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute cursor-pointer"
                initial={{
                  opacity: 0,
                  y: 150,
                  scale: 0.85,
                  rotate: -20,
                }}
                animate={
                  isInView
                    ? isMobile
                      ? {
                          opacity: 1,
                          x: mobile.x,
                          y: mobile.y,
                          rotate: mobile.rotate,
                          scale: mobile.scale,
                        }
                      : {
                          opacity: 1,
                          x: getXOffset(index) + deckEffect.x,
                          y: getYOffset(index) + deckEffect.y,
                          rotate: getRotation(index) + deckEffect.rotate,
                          scale: getScale(index) * deckEffect.scale,
                        }
                    : {}
                }
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 16,
                  delay: index * 0.08,
                }}
                style={{
                  zIndex: isMobile
                    ? mobile.zIndex
                    : hoveredIndex === index
                    ? 100
                    : getZIndex(index),
                }}
                onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              >
                <div className="relative h-[280px] w-[180px] overflow-hidden rounded-3xl shadow-2xl md:h-[450px] md:w-[280px] lg:h-[520px] lg:w-[320px]">
                  <Image
                    src={social.image}
                    alt={social.platform}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-[#0B0B0B]/30 to-transparent" />
                  <div className="absolute bottom-0 p-4 md:p-6">
                    <span className="mb-2 inline-block rounded-full bg-[#CEFF2B] px-3 py-1.5 text-xs font-bold uppercase text-[#0B0B0B]">
                      {social.platform}
                    </span>
                    <h3 className="text-lg font-bold text-white md:text-xl">
                      {social.handle}
                    </h3>
                    <p className="text-sm text-white/70 md:text-base">
                      {social.followers} followers
                    </p>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <button className="rounded-full bg-[#0B0B0B] px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white">
            Follow Us Everywhere
          </button>
        </div>
      </div>
    </section>
  )
}
