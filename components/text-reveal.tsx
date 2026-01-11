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
  duration = 0.8, // Faster default to match Lando snappiness
  highlightColor = "#EABF36", // Default Lando Yellow/Green
}: TextRevealProps) {
  const ref = useRef(null)
  // Trigger when 20% of element is in view
  const isInView = useInView(ref, { once: true, margin: "-20%" })

  return (
    <span ref={ref} className={`relative inline-block overflow-hidden ${className}`}>
      {/* 1. THE TEXT (Hidden initially, reveals halfway) */}
      <motion.span
        className="relative z-10 block" // 'block' or 'inline-block' needed for transform
        initial={{ opacity: 0 }}
        animate={
          isInView
            ? { opacity: [0, 0, 1, 1] } // Stay 0, then switch to 1
            : { opacity: 0 }
        }
        transition={{
          delay,
          duration,
          times: [0, 0.49, 0.5, 1], // Switch opacity exactly when bar is full width
          ease: "linear",
        }}
      >
        {children}
      </motion.span>

      {/* 2. THE CURTAIN (Scale 0->1 Left, Switch, Scale 1->0 Right) */}
      <motion.span
        className="absolute inset-0 z-20"
        style={{ backgroundColor: highlightColor }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={
          isInView
            ? {
                scaleX: [0, 1, 1, 0], // Grow, Hold, Hold, Shrink
                originX: [0, 0, 1, 1], // Left, Left, Right, Right (The Switch)
              }
            : { scaleX: 0 }
        }
        transition={{
          delay,
          duration,
          times: [0, 0.5, 0.5, 1], // Syncs perfectly with the text reveal
          ease: "easeInOut", // Smooth growth/shrink
        }}
      />
    </span>
  )
}

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
  staggerDelay = 0.1, // Tighter stagger for a "cascade" feel
}: MultiLineRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <div ref={ref} className={className}>
      {lines.map((line, index) => (
        <div key={index} className={`relative inline-block ${lineClassName}`}>
          
          {/* 1. THE TEXT */}
          <motion.span
            className="relative z-10 block px-1" // Added padding to prevent font clipping
            initial={{ opacity: 0 }}
            animate={
              isInView
                ? { opacity: [0, 0, 1, 1] }
                : { opacity: 0 }
            }
            transition={{
              delay: baseDelay + index * staggerDelay,
              duration: 0.8,
              times: [0, 0.49, 0.5, 1],
              ease: "linear",
            }}
          >
            {line.text}
          </motion.span>

          {/* 2. THE CURTAIN */}
          <motion.span
            className="absolute inset-0 z-20"
            style={{ 
              backgroundColor: line.isAccent ? "#EABF36" : "#EABF36" // Or use different colors if needed
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={
              isInView
                ? {
                    scaleX: [0, 1, 1, 0],
                    originX: [0, 0, 1, 1],
                  }
                : { scaleX: 0 }
            }
            transition={{
              delay: baseDelay + index * staggerDelay,
              duration: 0.8,
              times: [0, 0.5, 0.5, 1],
              ease: "easeInOut",
            }}
          />
        </div>
      ))}
    </div>
  )
}