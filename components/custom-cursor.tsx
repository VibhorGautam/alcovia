"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"

type CursorState = "default" | "hover-link" | "hover-button" | "drag"

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>("default")
  const [isVisible, setIsVisible] = useState(false)
  const [isHoveringNeon, setIsHoveringNeon] = useState(false)

  const innerRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const positionRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const lastPosRef = useRef({ x: 0, y: 0, t: Date.now() })

  // Check for reduced motion and touch devices
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
    setShouldRender(!prefersReducedMotion && !isTouchDevice)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e
      const now = Date.now()
      const dt = Math.max(1, now - lastPosRef.current.t)

      // Calculate velocity
      velocityRef.current = {
        x: (clientX - lastPosRef.current.x) / dt,
        y: (clientY - lastPosRef.current.y) / dt,
      }

      lastPosRef.current = { x: clientX, y: clientY, t: now }
      positionRef.current = { x: clientX, y: clientY }

      // Inner cursor - immediate follow
      if (innerRef.current) {
        gsap.to(innerRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.1,
          ease: "power3.out",
          overwrite: true,
        })
      }

      // Outer cursor - trailing with 120-160ms delay
      if (outerRef.current) {
        gsap.to(outerRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.15,
          ease: "power3.out",
          overwrite: true,
        })
      }

      // Glow trail - even more delayed
      if (glowRef.current && isHoveringNeon) {
        gsap.to(glowRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.25,
          ease: "power2.out",
          overwrite: true,
        })
      }

      setIsVisible(true)
    },
    [isHoveringNeon],
  )

  const handleElementHover = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement

    // Check for neon elements
    const isNeon =
      target.classList.contains("bg-neon") ||
      target.classList.contains("text-neon") ||
      target.closest("[data-neon]") !== null

    setIsHoveringNeon(isNeon)

    // Determine cursor state
    const cursorAttr = target.getAttribute("data-cursor")
    if (cursorAttr) {
      setCursorState(cursorAttr as CursorState)
      return
    }

    if (target.tagName === "A" || target.closest("a")) {
      setCursorState("hover-link")
    } else if (target.tagName === "BUTTON" || target.closest("button")) {
      setCursorState("hover-button")
    } else if (target.closest("[data-draggable]")) {
      setCursorState("drag")
    } else {
      setCursorState("default")
    }
  }, [])

  useEffect(() => {
    if (!shouldRender) return

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseover", handleElementHover)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseover", handleElementHover)
    }
  }, [shouldRender, handleMouseMove, handleElementHover])

  if (!shouldRender) return null

  // Cursor sizes and styles based on state
  const getOuterSize = () => {
    switch (cursorState) {
      case "hover-link":
        return 48
      case "hover-button":
        return 64
      case "drag":
        return 56
      default:
        return 36
    }
  }

  const getOuterStyle = () => {
    switch (cursorState) {
      case "hover-link":
        return {
          borderWidth: 2,
          borderColor: "#CEFF2B",
          backgroundColor: "transparent",
        }
      case "hover-button":
        return {
          borderWidth: 0,
          borderColor: "transparent",
          backgroundColor: "rgba(206,255,43,0.9)",
        }
      case "drag":
        return {
          borderWidth: 2,
          borderColor: "rgba(11,11,11,0.5)",
          backgroundColor: "transparent",
        }
      default:
        return {
          borderWidth: 1.5,
          borderColor: "rgba(11,11,11,0.3)",
          backgroundColor: "transparent",
        }
    }
  }

  const outerStyle = getOuterStyle()

  return (
    <>
      {/* Glow trail for neon elements */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9996] h-24 w-24 rounded-full"
        style={{
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(206,255,43,0.25) 0%, transparent 70%)",
          filter: "blur(10px)",
          opacity: isVisible && isHoveringNeon ? 0.8 : 0,
          transition: "opacity 200ms",
        }}
      />

      {/* Inner dot - 8-14px based on state */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full mix-blend-difference"
        style={{
          transform: "translate(-50%, -50%)",
          width: cursorState === "hover-button" ? 10 : 8,
          height: cursorState === "hover-button" ? 10 : 8,
          backgroundColor: cursorState === "hover-button" ? "#0B0B0B" : "#fff",
          opacity: isVisible ? 1 : 0,
          transition: "width 200ms, height 200ms, background-color 200ms, opacity 200ms",
        }}
      />

      {/* Outer halo - 36-64px based on state with accent glow */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full"
        style={{
          transform: "translate(-50%, -50%)",
          width: getOuterSize(),
          height: getOuterSize(),
          borderWidth: outerStyle.borderWidth,
          borderStyle: "solid",
          borderColor: outerStyle.borderColor,
          backgroundColor: outerStyle.backgroundColor,
          opacity: isVisible ? 1 : 0,
          transition: "width 200ms, height 200ms, border-color 200ms, background-color 200ms, opacity 200ms",
          boxShadow: cursorState === "hover-button" ? "0 6px 20px rgba(206,255,43,0.3)" : "none",
        }}
      >
        {/* Cursor content based on state */}
        {cursorState === "hover-link" && (
          <div className="h-1 w-4 rounded-full bg-[#CEFF2B]" style={{ transform: "translateY(8px)" }} />
        )}
        {cursorState === "drag" && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-dark/60">
            <path
              d="M8 12H16M8 12L10 10M8 12L10 14M16 12L14 10M16 12L14 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
    </>
  )
}
