"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Image from "next/image"

const atSchool = {
  title: "AT",
  subtitle: "SCHOOL",
  handwritten: "at",
  description: "How Alcovia helps students ace school.",
  images: ["/images/atSchool.png", "images/outsideSchool.png"],
}

const outsideSchool = {
  title: "OUTSIDE",
  subtitle: "SCHOOL",
  handwritten: "beyond",
  description: "How Alcovia fulfills its mission of building differentiation for each Alcovian.",
  images: ["/images/atschool.png", "/images/outsideSchool.png"],
}

export default function ToggleCompare() {
  const [activeTab, setActiveTab] = useState<"school" | "outside">("school")
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const currentData = activeTab === "school" ? atSchool : outsideSchool

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-cream px-6 py-24 md:px-12">
      {/* Background contour pattern */}
      <div className="absolute inset-0 opacity-[0.06]">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[...Array(30)].map((_, i) => (
            <path
              key={i}
              d={`M${-10 + i * 8},0 Q${-5 + i * 8},50 ${-10 + i * 8},100`}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.2"
              className="text-dark"
            />
          ))}
        </svg>
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Main content grid */}
        <div className="relative grid min-h-[80vh] grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          {/* Left image */}
          <div className="relative flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-${activeTab}`}
                className="relative h-[400px] w-[280px] overflow-hidden rounded-2xl md:h-[550px] md:w-[350px]"
                initial={{ opacity: 0, x: -150 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                exit={{ opacity: 0, x: -150 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 150, damping: 25 }}
              >
                <Image
                  src={currentData.images[0] || "/images/atSchool.png"}
                  alt={`${currentData.title} experience`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center content */}
          <div className="relative flex flex-col items-center justify-center gap-8 py-8">
            {/* Toggle sections */}
            <div className="flex flex-col gap-6 md:flex-row md:gap-16">
              {/* AT SCHOOL option */}
              <motion.button
                onClick={() => setActiveTab("school")}
                className="group relative text-center"
                whileHover={{ scale: 1.02 }}
              >
                {/* Handwritten overlay */}
                <AnimatePresence>
                  {activeTab === "school" && (
                    <motion.svg
                      className="absolute -left-4 -top-8 h-20 w-24 md:-left-6 md:-top-10 md:h-28 md:w-32"
                      viewBox="0 0 100 80"
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ opacity: 1, pathLength: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.path
                        d="M15,50 Q25,20 40,25 Q55,30 50,50 Q45,70 60,55 Q75,40 85,50"
                        fill="none"
                        stroke="#CCFF00"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>
                <span
                  className={`block text-4xl font-black uppercase tracking-tight transition-colors md:text-5xl lg:text-6xl ${activeTab === "school" ? "text-dark" : "text-dark/30"
                    }`}
                >
                  AT
                </span>
                <span
                  className={`block text-4xl font-black uppercase tracking-tight transition-colors md:text-5xl lg:text-6xl ${activeTab === "school" ? "text-dark" : "text-dark/30"
                    }`}
                >
                  SCHOOL
                </span>
              </motion.button>

              {/* OUTSIDE SCHOOL option */}
              <motion.button
                onClick={() => setActiveTab("outside")}
                className="group relative text-center"
                whileHover={{ scale: 1.02 }}
              >
                {/* Handwritten overlay */}
                <AnimatePresence>
                  {activeTab === "outside" && (
                    <motion.svg
                      className="absolute -left-4 -top-8 h-20 w-28 md:-left-6 md:-top-10 md:h-28 md:w-36"
                      viewBox="0 0 120 80"
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ opacity: 1, pathLength: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.path
                        d="M10,55 Q20,25 35,30 Q50,35 55,55 Q60,35 75,30 Q90,25 95,50 Q100,70 110,45"
                        fill="none"
                        stroke="#CCFF00"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>
                <span
                  className={`block text-4xl font-black uppercase tracking-tight transition-colors md:text-5xl lg:text-6xl ${activeTab === "outside" ? "text-dark" : "text-dark/30"
                    }`}
                >
                  OUTSIDE
                </span>
                <span
                  className={`block text-4xl font-black uppercase tracking-tight transition-colors md:text-5xl lg:text-6xl ${activeTab === "outside" ? "text-dark" : "text-dark/30"
                    }`}
                >
                  SCHOOL
                </span>
              </motion.button>
            </div>

            {/* Description with clip reveal */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeTab}
                className="max-w-sm text-center text-base text-dark/70 md:text-lg"
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                exit={{ clipPath: "inset(0 0% 0 100%)", opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {currentData.description}
              </motion.p>
            </AnimatePresence>

            {/* Action buttons */}
            <div className="flex gap-4">
              <motion.button
                className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${activeTab === "school" ? "bg-neon text-dark" : "bg-dark/10 text-dark/50"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("school")}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${activeTab === "outside" ? "bg-neon text-dark" : "bg-dark/10 text-dark/50"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("outside")}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Right image */}
          <div className="relative flex justify-center lg:justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={`right-${activeTab}`}
                className="relative h-[400px] w-[280px] overflow-hidden rounded-2xl md:h-[550px] md:w-[350px]"
                initial={{ opacity: 0, x: 150 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                exit={{ opacity: 0, x: 150 }}
                transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 150, damping: 25 }}
              >
                <Image
                  src={currentData.images[1] || "/placeholder.svg"}
                  alt={`${currentData.title} experience`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
