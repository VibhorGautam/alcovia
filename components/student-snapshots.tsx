"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import TextReveal from "./text-reveal"

const snapshots = [
  {
    image: "/placeholder.svg?height=400&width=300",
    caption: "Celebrating first internship",
    rotate: -3,
  },
  {
    image: "/placeholder.svg?height=300&width=400",
    caption: "Annual Alcovia Summit",
    rotate: 2,
  },
  {
    image: "/placeholder.svg?height=350&width=350",
    caption: "TEDx presentation",
    rotate: -2,
  },
  {
    image: "/placeholder.svg?height=400&width=300",
    caption: "Dream university admission",
    rotate: 4,
  },
  {
    image: "/placeholder.svg?height=300&width=350",
    caption: "National Hackathon winners",
    rotate: -1,
  },
  {
    image: "/placeholder.svg?height=350&width=400",
    caption: "Mentorship moments",
    rotate: 3,
  },
]

export default function StudentSnapshots() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const yOffset0 = useTransform(scrollYProgress, [0, 1], [30, -30])
  const yOffset1 = useTransform(scrollYProgress, [0, 1], [-30, 30])
  const yOffset2 = useTransform(scrollYProgress, [0, 1], [30, -30])
  const yOffset3 = useTransform(scrollYProgress, [0, 1], [-30, 30])
  const yOffset4 = useTransform(scrollYProgress, [0, 1], [30, -30])
  const yOffset5 = useTransform(scrollYProgress, [0, 1], [-30, 30])

  const yOffsets = [yOffset0, yOffset1, yOffset2, yOffset3, yOffset4, yOffset5]

  return (
    <section ref={containerRef} className="relative bg-[#F5F5EF] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <TextReveal delay={0}>
            <h2 className="text-4xl font-black uppercase tracking-tight text-[#0B0B0B] md:text-5xl lg:text-6xl">
              Student <span className="text-[#CEFF2B]">Snapshots</span>
            </h2>
          </TextReveal>
        </div>

        {/* Irregular mosaic grid with parallax */}
        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[250px] md:grid-cols-4 lg:auto-rows-[280px]">
          {snapshots.map((snapshot, index) => (
            <motion.div
              key={index}
              data-card
              className={`group relative overflow-hidden rounded-2xl ${
                index === 0 || index === 3 ? "col-span-1 row-span-2" : index === 1 ? "col-span-2 row-span-1" : ""
              }`}
              initial={{
                opacity: 0,
                y: 50,
                rotate: snapshot.rotate,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      rotate: snapshot.rotate,
                    }
                  : {}
              }
              transition={{
                delay: index * 0.15,
                duration: 0.7,
                type: "spring",
                stiffness: 200,
                damping: 25,
              }}
              whileHover={{
                scale: 1.03,
                rotate: 0,
                zIndex: 10,
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              }}
              style={{ rotate: snapshot.rotate }}
            >
              <motion.div className="relative h-full w-full" style={{ y: yOffsets[index] }}>
                <Image
                  src={snapshot.image || "/placeholder.svg"}
                  alt={snapshot.caption}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:saturate-[1.2]"
                  style={{ filter: "contrast(1.05) saturate(0.9)" }}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <motion.p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 md:text-base">
                {snapshot.caption}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
