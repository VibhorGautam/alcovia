"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { checkReducedMotion, isMobile, COLORS } from "@/lib/hero-animations"

type CursorState = "default" | "hover-link" | "hover-button" | "drag" | "hover-hero"

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>("default")
  const [isVisible, setIsVisible] = useState(false)
  const [isHoveringNeon, setIsHoveringNeon] = useState(false)
  const [isOverHero, setIsOverHero] = useState(false)

  const innerRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<SVGSVGElement>(null)
  const sparkContainerRef = useRef<HTMLDivElement>(null)

  const positionRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const lastPosRef = useRef({ x: 0, y: 0, t: Date.now() })

  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    const prefersReducedMotion = checkReducedMotion()
    const isTouchDevice = isMobile() || window.matchMedia("(pointer: coarse)").matches
    setShouldRender(!prefersReducedMotion && !isTouchDevice)
  }, [])

  const spawnSpark = useCallback((x: number, y: number) => {
    if (!sparkContainerRef.current || checkReducedMotion()) return

    const spark = document.createElement("div")
    spark.className = "pointer-events-none fixed rounded-full"
    spark.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      width: 4px;
      height: 4px;
      background: ${COLORS.accent};
      transform: translate(-50%, -50%);
      z-index: 9995;
    `

    sparkContainerRef.current.appendChild(spark)

    const angle = Math.random() * Math.PI * 2
    const distance = 15 + Math.random() * 20

    gsap.to(spark, {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      opacity: 0,
      scale: 0,
      duration: 0.3 + Math.random() * 0.2,
      ease: "power2.out",
      onComplete: () => spark.remove(),
    })
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e
      const now = Date.now()
      const dt = Math.max(1, now - lastPosRef.current.t)

      const vx = (clientX - lastPosRef.current.x) / dt
      const vy = (clientY - lastPosRef.current.y) / dt
      const speed = Math.sqrt(vx * vx + vy * vy)

      velocityRef.current = { x: vx, y: vy }
      lastPosRef.current = { x: clientX, y: clientY, t: now }
      positionRef.current = { x: clientX, y: clientY }

      if (speed > 0.8 && isOverHero && Math.random() > 0.7) {
        spawnSpark(clientX, clientY)
      }

      if (innerRef.current) {
        gsap.to(innerRef.current, {
          x: clientX,
          y: clientY,
          duration: isOverHero ? 0.08 : 0.1,
          ease: "power3.out",
          overwrite: true,
        })
      }

      if (outerRef.current) {
        gsap.to(outerRef.current, {
          x: clientX,
          y: clientY,
          duration: isOverHero ? 0.12 : 0.15,
          ease: "power3.out",
          overwrite: true,
        })
      }

      if (planeRef.current && isOverHero) {
        const rotation = Math.atan2(vy, vx) * (180 / Math.PI) + 30
        gsap.to(planeRef.current, {
          x: clientX + 15,
          y: clientY - 15,
          rotation: speed > 0.3 ? rotation : -30,
          duration: 0.15,
          ease: "power2.out",
          overwrite: true,
        })
      }

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
    [isHoveringNeon, isOverHero, spawnSpark]
  )

  const handleElementHover = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement

    const isNeon =
      target.classList.contains("bg-neon") ||
      target.classList.contains("text-neon") ||
      target.closest("[data-neon]") !== null

    setIsHoveringNeon(isNeon)

    const isHeroPortrait =
      target.closest(".hero-center") !== null ||
      target.closest('[id="hero"]')?.contains(target.closest(".hero-center") || null)

    setIsOverHero(isHeroPortrait!)

    const cursorAttr = target.getAttribute("data-cursor")
    if (cursorAttr) {
      setCursorState(cursorAttr as CursorState)
      return
    }

    if (isHeroPortrait) {
      setCursorState("hover-hero")
    } else if (target.tagName === "A" || target.closest("a")) {
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

  const getOuterSize = () => {
    switch (cursorState) {
      case "hover-hero":
        return 56
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
      case "hover-hero":
        return {
          borderWidth: 2,
          borderColor: COLORS.accent,
          backgroundColor: "rgba(206,255,43,0.05)",
        }
      case "hover-link":
        return {
          borderWidth: 2,
          borderColor: COLORS.accent,
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
      <div ref={sparkContainerRef} className="pointer-events-none fixed inset-0 z-[9995]" />

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

      <svg
        ref={planeRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        style={{
          transform: "translate(-50%, -50%) rotate(-15deg)",
          opacity: isVisible && isOverHero ? 1 : 0,
          transition: "opacity 200ms",
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
        }}
      >
        <path
          d="M4 24C4 24 6 18 10 14C14 10 20 6 28 4C28 4 24 10 20 14C16 18 12 22 4 24Z"
          fill={COLORS.accent}
          stroke="#0B0B0B"
          strokeWidth="0.5"
        />
        <path d="M8 20C10 16 14 12 20 8" stroke="#0B0B0B" strokeWidth="0.3" fill="none" opacity="0.5" />
        <path d="M10 18C12 14 16 10 22 6" stroke="#0B0B0B" strokeWidth="0.3" fill="none" opacity="0.5" />
        <path d="M12 16C14 12 18 8 24 4" stroke="#0B0B0B" strokeWidth="0.3" fill="none" opacity="0.3" />
      </svg>

      <div
        ref={innerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full mix-blend-difference"
        style={{
          transform: "translate(-50%, -50%)",
          width: cursorState === "hover-button" ? 10 : cursorState === "hover-hero" ? 6 : 8,
          height: cursorState === "hover-button" ? 10 : cursorState === "hover-hero" ? 6 : 8,
          backgroundColor: cursorState === "hover-button" ? "#0B0B0B" : "#fff",
          opacity: isVisible && !isOverHero ? 1 : 0,
          transition: "width 200ms, height 200ms, background-color 200ms, opacity 200ms",
        }}
      />

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
          boxShadow:
            cursorState === "hover-button"
              ? "0 6px 20px rgba(206,255,43,0.3)"
              : cursorState === "hover-hero"
                ? "0 0 20px rgba(206,255,43,0.2)"
                : "none",
        }}
      >
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
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </>
  )
}
