"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import TextReveal from "./text-reveal"

const socials = [
  
  {
    platform: "LinkedIn",
    handle: "Alcovia",
    followers: "1,190",
    image: "/images/linkedin.jpg",
    url: "https://www.linkedin.com/company/alcovia-life/",
  },
  {
    platform: "Instagram",
    handle: "@alcovia.in",
    followers: "639",
    image: "/images/insta.jpg",
    url: "https://instagram.com/alcovia.in",
  },
  {
    platform: "YouTube",
    handle: "Alcovia",
    followers: "100",
    image: "/images/youtube.jpg",
    url: "https://youtube.com/@alcovia",
  }
]

// Card positions - subtle fan layout
const cardPositions = [
  { x: -160, y: 25, rotate: -12, scale: 0.95 },  // Left card
  { x: 0, y: 0, rotate: 0, scale: 1 },            // Center card
  { x: 160, y: 25, rotate: 12, scale: 0.95 },     // Right card
]

// Desktop positions (wider spread)
const cardPositionsDesktop = [
  { x: -240, y: 35, rotate: -10, scale: 0.95 },
  { x: 0, y: 0, rotate: 0, scale: 1 },
  { x: 240, y: 35, rotate: 10, scale: 0.95 },
]

export default function SocialFan() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768)
    checkDesktop()
    window.addEventListener("resize", checkDesktop)
    return () => window.removeEventListener("resize", checkDesktop)
  }, [])

  // Get card transform based on hover state - SUBTLE movements only
  const getCardTransform = (index: number) => {
    const positions = isDesktop ? cardPositionsDesktop : cardPositions
    const base = positions[index]

    // No hover - return base position
    if (hoveredIndex === null) {
      return {
        x: base.x,
        y: base.y,
        rotate: base.rotate,
        scale: base.scale,
        zIndex: index === 1 ? 3 : index === 0 ? 1 : 2, // Center card on top by default
      }
    }

    // This card is hovered - rise up slightly
    if (hoveredIndex === index) {
      return {
        x: base.x,
        y: base.y - 30, // Rise up just 30px
        rotate: base.rotate * 0.5, // Straighten slightly
        scale: 1.02, // Tiny scale boost
        zIndex: 10,
      }
    }

    // Another card is hovered - subtle spread away
    const diff = index - hoveredIndex
    const spreadAmount = isDesktop ? 25 : 18 // Subtle spread

    return {
      x: base.x + (diff * spreadAmount),
      y: base.y + 5, // Slight dip
      rotate: base.rotate + (diff * 2), // Tiny rotation
      scale: base.scale * 0.98,
      zIndex: index === 1 ? 2 : 1,
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative bg-[#F5F5EF] px-6 py-24 md:px-12 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-[#EABF36]/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-[#EABF36]/3 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <TextReveal delay={0} highlightColor="#EABF36">
            <h2 className="text-5xl font-black uppercase tracking-tight text-[#0B0B0B] md:text-6xl lg:text-8xl">
              FOLLOW ALCOVIA
            </h2>
          </TextReveal>
          <TextReveal delay={0.15} highlightColor="#EABF36">
            <h2 className="text-5xl font-black uppercase tracking-tight text-[#0B0B0B]/50 md:text-6xl lg:text-8xl">
              ON SOCIAL MEDIA
            </h2>
          </TextReveal>
        </motion.div>

        {/* Social Text Links with Hover Animation */}


        {/* Card Container */}
        <div className="relative flex h-[450px] items-center justify-center md:h-[650px] lg:h-[750px]">
          {socials.map((social, index) => {
            const transform = getCardTransform(index)

            return (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute cursor-pointer"
                initial={{
                  opacity: 0,
                  y: 100,
                  rotate: -15,
                  scale: 0.8
                }}
                animate={isInView ? {
                  opacity: 1,
                  x: transform.x,
                  y: transform.y,
                  rotate: transform.rotate,
                  scale: transform.scale,
                } : {}}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                  mass: 0.8,
                  delay: isInView ? index * 0.1 : 0,
                }}
                style={{ zIndex: transform.zIndex }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onTouchStart={() => setHoveredIndex(index)}
                onTouchEnd={() => setHoveredIndex(null)}
              >
                <div className="relative h-[320px] w-[200px] overflow-hidden rounded-2xl shadow-2xl md:h-[500px] md:w-[320px] lg:h-[560px] lg:w-[360px]">
                  <Image
                    src={social.image}
                    alt={social.platform}
                    fill
                    className="object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/90 via-[#0B0B0B]/30 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <span className="mb-2 inline-block rounded-full bg-[#EABF36] px-3 py-1.5 text-xs font-bold uppercase text-[#0B0B0B]">
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

        {/* CTA Text */}
        <motion.div
          className="mt-16 mb-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold uppercase tracking-widest text-[#0B0B0B] md:text-3xl lg:text-4xl">
            Follow Us Everywhere
          </h3>
        </motion.div>

        {/* Social Text Links */}
        <motion.div
          className="mb-16 flex flex-wrap items-center justify-center gap-6 md:gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden"
            >
              <span className="relative block text-sm font-bold uppercase tracking-widest text-[#0B0B0B] md:text-base">
                {/* Base text */}
                <span className="flex">
                  {social.platform.split("").map((letter, i) => (
                    <span
                      key={i}
                      className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-full"
                      style={{ transitionDelay: `${i * 20}ms` }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                {/* Hover text (hidden below, revealed on hover) */}
                <span className="absolute inset-0 flex text-[#EABF36]">
                  {social.platform.split("").map((letter, i) => (
                    <span
                      key={i}
                      className="inline-block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
                      style={{ transitionDelay: `${i * 20}ms` }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
