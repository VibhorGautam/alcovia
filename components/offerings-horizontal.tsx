"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import TextReveal from "./text-reveal"

const offerings = [
  {
    title: "Career Discovery",
    description: "Workshops to explore your passion",
    image: "/images/carrerDiscovery.png",
    size: "wide",
  },
  {
    title: "Podcast Shoots",
    description: "With industry leaders",
    image: "/images/podcast.jpeg",
    size: "medium",
  },
  {
    title: "1:1 Mentorship",
    description: "Personalized guidance",
    image: "/images/oneonone.jpeg",
    size: "wide",
  },
  {
    title: "Academic Excellence",
    description: "Performance improvement",
    image: "/images/academic.jpeg",
    size: "wide",
  },
  {
    title: "Forge Bonds",
    description: "Connect with driven peers",
    image: "/placeholder.svg?height=300&width=300",
    size: "medium",
  },
  {
    title: "Harvard/UCL Mentorship",
    description: "Weekly guidance sessions",
    image: "/placeholder.svg?height=300&width=400",
    size: "tall-wide",
  },
  {
    title: "Counsellor Meetings",
    description: "Monthly check-ins",
    image: "/placeholder.svg?height=300&width=300",
    size: "medium",
  },
  {
    title: "Build Resilience",
    description: "Mental strength training",
    image: "/placeholder.svg?height=400&width=300",
    size: "tall",
  },
  {
    title: "Build Empathy",
    description: "Emotional intelligence",
    image: "/placeholder.svg?height=300&width=300",
    size: "medium",
  },
]

export default function OfferingsHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"])

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#0C0C0C]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div className="flex gap-6 pl-8 md:gap-8 md:pl-16" style={{ x }}>
          {/* Section title with text reveal */}
          <div ref={titleRef} className="flex h-[70vh] w-[300px] flex-shrink-0 flex-col justify-center md:w-[400px]">
            <TextReveal delay={0.2}>
              <h2 className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl lg:text-7xl">Our</h2>
            </TextReveal>
            <TextReveal delay={0.4}>
              <span className="text-4xl font-black uppercase tracking-tight text-[#CEFF2B] md:text-6xl lg:text-7xl">
                Offerings
              </span>
            </TextReveal>
            <motion.p
              className="mt-4 text-white/60"
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Everything you need to take flight
            </motion.p>
          </div>

          {/* Grid of offerings with lift-on-hover */}
          <div className="grid h-[70vh] auto-cols-[280px] grid-flow-col grid-rows-3 gap-4 md:auto-cols-[320px] md:gap-6">
            {offerings.map((offering, index) => (
              <motion.div
                key={offering.title}
                data-card
                className={`group relative overflow-hidden rounded-2xl ${offering.size === "large"
                    ? "row-span-2"
                    : offering.size === "tall"
                      ? "row-span-2"
                      : offering.size === "wide"
                        ? "col-span-1"
                        : ""
                  }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                }}
              >
                <Image
                  src={offering.image || "/placeholder.svg"}
                  alt={offering.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ filter: "contrast(1.05) saturate(0.9)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/90 via-[#0C0C0C]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 md:p-6">
                  <h3 className="text-lg font-bold text-white md:text-xl">{offering.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{offering.description}</p>
                </div>
                <motion.div
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#CEFF2B] text-[#0B0B0B] opacity-0 transition-opacity group-hover:opacity-100"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
