"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import TextReveal from "./text-reveal"

const sections = [
  {
    id: "at-school",
    topText: "AT",
    bottomText: "SCHOOL",
    description:
      "Empowering academic excellence through innovative learning methodologies.",
    image: "/images/atschool.png",
  },
  {
    id: "outside-school",
    topText: "OUTSIDE",
    bottomText: "SCHOOL",
    description:
      "Building differentiation through real-world experiences and leadership development.",
    image: "/images/outsideschool.png",
  },
]

export default function ToggleCompare() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const leftImageX = useTransform(scrollYProgress, [0, 0.3, 0.5], [-200, -50, 0])
  const leftTextX = useTransform(scrollYProgress, [0, 0.3, 0.5], [-100, -25, 0])
  const leftOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0.5, 1])

  const rightImageX = useTransform(scrollYProgress, [0, 0.3, 0.5], [200, 50, 0])
  const rightTextX = useTransform(scrollYProgress, [0, 0.3, 0.5], [100, 25, 0])
  const rightOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0.5, 1])

  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden py-20 md:py-32"
    >
      {/* LEFT IMAGE */}
      <motion.div
        className="absolute bottom-0 left-0 top-0 hidden w-[28%] lg:block"
        style={{ x: leftImageX, opacity: leftOpacity }}
      >
        <div className="relative h-full w-full">
          <Image
            src={sections[0].image}
            alt="At School"
            fill
            className="object-cover object-right"
          />

        </div>
      </motion.div>

      {/* RIGHT IMAGE */}
      <motion.div
        className="absolute bottom-0 right-0 top-0 hidden w-[28%] lg:block"
        style={{ x: rightImageX, opacity: rightOpacity }}
      >
        <div className="relative h-full w-full">
          <Image
            src={sections[1].image}
            alt="Outside School"
            fill
            className="object-cover object-left"
          />

        </div>
      </motion.div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        {/* HEADER */}
        <motion.div
          className="mb-12 text-center md:mb-24"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <TextReveal delay={0} highlightColor="#EABF36">
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#F7F7F3] md:text-6xl lg:text-7xl">
              Our <span className="text-[#EABF36]">Impact</span>
            </h2>
          </TextReveal>
        </motion.div>

        {/* 🔥 MOBILE: SIDE BY SIDE | DESKTOP: ROW */}
        <div className="grid grid-cols-2 gap-4 md:flex md:items-start md:justify-center md:gap-12 lg:gap-16">
          {/* AT SCHOOL */}
          <motion.div
            className="cursor-pointer text-right"
            style={{ x: leftTextX, opacity: leftOpacity }}
          >
            <div className="relative mb-4">
              <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#F7F7F3] md:text-6xl lg:text-7xl">
                {sections[0].topText}
              </span>
              <div className="-mt-1">
                <span className="text-4xl font-black uppercase tracking-tight text-[#F7F7F3] md:text-6xl lg:text-7xl">
                  {sections[0].bottomText}
                </span>
              </div>
            </div>

            <p className="ml-auto max-w-[160px] text-xs leading-relaxed text-[#F7F7F3]/60 md:max-w-[200px] md:text-sm">
              {sections[0].description}
            </p>

            <Link href="/at-school">
              <button
                className="ml-auto mt-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EABF36] text-[#0C0C0C] hover:scale-110 transition-transform"
              >
                →
              </button>
            </Link>
          </motion.div>

          {/* OUTSIDE SCHOOL */}
          <motion.div
            className="cursor-pointer text-left"
            style={{ x: rightTextX, opacity: rightOpacity }}
          >
            <div className="relative mb-4">
              <span className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#F7F7F3] md:text-6xl lg:text-7xl">
                {sections[1].topText}
              </span>
              <div className="-mt-1">
                <span className="text-4xl font-black uppercase tracking-tight text-[#F7F7F3] md:text-6xl lg:text-7xl">
                  {sections[1].bottomText}
                </span>
              </div>
            </div>

            <p className="mr-auto max-w-[160px] text-xs leading-relaxed text-[#F7F7F3]/60 md:max-w-[200px] md:text-sm">
              {sections[1].description}
            </p>

            <Link href="/outside-school">
              <button
                className="mr-auto mt-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EABF36] text-[#0C0C0C] hover:scale-110 transition-transform"
              >
                ←
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* MOBILE IMAGES */}
      <div className="mt-16 flex gap-4 px-6 lg:hidden">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className="relative aspect-[3/4] flex-1 overflow-hidden rounded-2xl"
            initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Image src={section.image} alt="" fill className="object-cover" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
