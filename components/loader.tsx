"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoaderProps {
  onLoadingComplete?: () => void
}

export default function Loader({ onLoadingComplete }: LoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [hasClicked, setHasClicked] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleClick = useCallback(() => {
    if (hasClicked) return
    setHasClicked(true)

    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(Math.round(newProgress))

      if (newProgress < 100) {
        requestAnimationFrame(animate)
      } else {
        setTimeout(() => {
          setIsLoading(false)
          if (onLoadingComplete) onLoadingComplete()
        }, 300)
      }
    }

    animate()
  }, [hasClicked, onLoadingComplete])

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : ""
    document.body.style.cursor = isLoading ? "none" : ""
    return () => {
      document.body.style.overflow = ""
      document.body.style.cursor = ""
    }
  }, [isLoading])

  // Removed auto-trigger - user must click

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[100] flex cursor-none items-center justify-center overflow-hidden bg-black"
          onClick={handleClick}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated gradient mesh background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Main gradient orbs */}
            <motion.div
              className="absolute left-[20%] top-[20%] h-[600px] w-[600px] rounded-full opacity-30 blur-[120px]"
              style={{
                background: "radial-gradient(circle, #CCFF00 0%, transparent 70%)",
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -80, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute right-[15%] bottom-[25%] h-[500px] w-[500px] rounded-full opacity-25 blur-[100px]"
              style={{
                background: "radial-gradient(circle, #00F0FF 0%, transparent 70%)",
              }}
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            <motion.div
              className="absolute left-[50%] top-[50%] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[80px]"
              style={{
                background: "radial-gradient(circle, #FF00FF 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.4, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Floating grid lines */}
            <svg className="absolute inset-0 h-full w-full opacity-10">
              {[...Array(20)].map((_, i) => (
                <motion.line
                  key={`h-${i}`}
                  x1="0"
                  y1={`${i * 5}%`}
                  x2="100%"
                  y2={`${i * 5}%`}
                  stroke="#CCFF00"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
              {[...Array(20)].map((_, i) => (
                <motion.line
                  key={`v-${i}`}
                  x1={`${i * 5}%`}
                  y1="0"
                  x2={`${i * 5}%`}
                  y2="100%"
                  stroke="#00F0FF"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.1 + 0.5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </svg>

            {/* Floating particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute h-1 w-1 rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -100],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: Math.random() * 5,
                }}
              />
            ))}

            {/* Rotating rings */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="h-[400px] w-[400px] rounded-full border border-white/5"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-6">
            {/* Hero text */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <motion.h1
                className="text-center text-6xl font-black uppercase tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
                style={{
                  textShadow: "0 0 40px rgba(204,255,0,0.3)",
                }}
                animate={{
                  textShadow: [
                    "0 0 40px rgba(204,255,0,0.3)",
                    "0 0 60px rgba(204,255,0,0.5)",
                    "0 0 40px rgba(204,255,0,0.3)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ALCOVIA
              </motion.h1>

              {/* Underline effect */}
              <motion.div
                className="mx-auto mt-4 h-1 bg-gradient-to-r from-transparent via-[#CCFF00] to-transparent"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>

            <motion.p
              className="text-center text-lg uppercase tracking-widest text-white/60 sm:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Ahead of the Curve
            </motion.p>

            {!hasClicked && (
              <motion.button
                className="group relative mt-8 overflow-hidden rounded-full border border-white/20 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-[#CCFF00] sm:px-12 sm:py-5 sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-[#CCFF00]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 transition-colors group-hover:text-black">
                  <span className="inline-block group-hover:hidden">Click to Enter</span>
                  <span className="hidden group-hover:inline-block">Ready to Fly?</span>
                </span>
              </motion.button>
            )}

            {hasClicked && (
              <motion.div
                className="flex w-full max-w-md flex-col items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  className="font-mono text-6xl font-bold text-[#CCFF00]"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(204,255,0,0.5)",
                      "0 0 40px rgba(204,255,0,0.8)",
                      "0 0 20px rgba(204,255,0,0.5)",
                    ],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                >
                  {progress}%
                </motion.span>

                <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#CCFF00] to-[#00F0FF]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Shimmer effect on progress bar */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>

                <p className="text-sm uppercase tracking-wider text-white/40">
                  Loading Experience...
                </p>
              </motion.div>
            )}
          </div>

          {/* Custom cursor */}
          <motion.div
            ref={cursorRef}
            className="pointer-events-none fixed left-0 top-0 z-[200] h-5 w-5 rounded-full border-2 border-[#CCFF00] mix-blend-difference"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Cursor glow */}
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[199] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#CCFF00]/20 blur-xl"
            animate={{
              x: mousePos.current.x,
              y: mousePos.current.y,
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 200,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}