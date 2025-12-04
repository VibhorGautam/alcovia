"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface TextRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  highlightColor?: string
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 1.1,
  highlightColor = "#CEFF2B",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          delay: delay + duration * 0.3,
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>

      {/* Sliding neon block */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: highlightColor }}
        initial={{ x: "0%" }}
        animate={isInView ? { x: "105%" } : {}}
        transition={{
          delay,
          duration,
          ease: [0.76, 0, 0.24, 1],
        }}
      />
    </div>
  )
}

// Multi-line text reveal with stagger
interface MultiLineRevealProps {
  lines: Array<{ text: string; isAccent?: boolean }>
  className?: string
  lineClassName?: string
  baseDelay?: number
  staggerDelay?: number
}

export function MultiLineReveal({
  lines,
  className = "",
  lineClassName = "",
  baseDelay = 0,
  staggerDelay = 0.2,
}: MultiLineRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className={className}>
      {lines.map((line, index) => (
        <div key={index} className="relative overflow-hidden">
          <motion.div
            className={lineClassName}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: baseDelay + index * staggerDelay + 0.4,
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <span className={line.isAccent ? "text-[#CEFF2B]" : ""}>{line.text}</span>
          </motion.div>

          <motion.div
            className="absolute inset-0 z-10 bg-[#CEFF2B]"
            initial={{ x: "0%" }}
            animate={isInView ? { x: "105%" } : {}}
            transition={{
              delay: baseDelay + index * staggerDelay,
              duration: 1.1,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        </div>
      ))}
    </div>
  )
}
