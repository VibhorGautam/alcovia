"use client"

import type React from "react"

import { useEffect } from "react"
import gsap from "gsap"

export function useMicroInteractions() {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isTouchDevice = window.matchMedia("(hover: none)").matches

    if (prefersReducedMotion || isTouchDevice) return

    // Letter spread animation for links and inline labels
    const linkElements = document.querySelectorAll<HTMLElement>('a:not([data-no-micro]), [data-cursor="hover-link"]')

    linkElements.forEach((el) => {
      el.style.transition =
        "letter-spacing 180ms cubic-bezier(.22,1,.36,1), transform 180ms cubic-bezier(.22,1,.36,1), opacity 180ms"

      el.addEventListener("mouseenter", () => {
        el.style.letterSpacing = "0.06em"
        el.style.transform = "translateY(-1px)"
        el.style.opacity = "1"
      })

      el.addEventListener("mouseleave", () => {
        el.style.letterSpacing = "0.02em"
        el.style.transform = "translateY(0)"
        el.style.opacity = "0.86"
      })
    })

    // Toggle labels underline slide animation
    const toggleLabels = document.querySelectorAll<HTMLElement>("[data-toggle-label]")

    toggleLabels.forEach((el) => {
      // Create underline pseudo element
      const underline = document.createElement("span")
      underline.className = "toggle-underline"
      underline.style.cssText = `
        position: absolute;
        bottom: -2px;
        left: 50%;
        width: 0;
        height: 2px;
        background: #CEFF2B;
        transition: width 220ms cubic-bezier(.22,1,.36,1), left 220ms cubic-bezier(.22,1,.36,1);
      `
      el.style.position = "relative"
      el.appendChild(underline)

      el.addEventListener("mouseenter", () => {
        underline.style.width = "100%"
        underline.style.left = "0"
        el.style.fontWeight = "500"
      })

      el.addEventListener("mouseleave", () => {
        underline.style.width = "0"
        underline.style.left = "50%"
        el.style.fontWeight = "400"
      })
    })

    // Prestige labels neon pulse (Harvard, IIT, Cambridge, UCL)
    const prestigeLabels = document.querySelectorAll<HTMLElement>("[data-prestige-label]")

    prestigeLabels.forEach((el) => {
      el.style.transition = "box-shadow 200ms, transform 200ms"

      el.addEventListener("mouseenter", () => {
        el.style.boxShadow = "0 8px 20px rgba(206,255,43,0.12)"
        el.style.transform = "scale(1.02)"
      })

      el.addEventListener("mouseleave", () => {
        el.style.boxShadow = "none"
        el.style.transform = "scale(1)"
      })
    })

    // Button fill animation
    const buttons = document.querySelectorAll<HTMLElement>("button:not([data-no-micro])")

    buttons.forEach((btn) => {
      // Create fill overlay
      const fillOverlay = document.createElement("span")
      fillOverlay.style.cssText = `
        position: absolute;
        inset: 0;
        background: #CEFF2B;
        transform: translateX(-100%);
        transition: transform 300ms cubic-bezier(.22,1,.36,1);
        z-index: -1;
        border-radius: inherit;
      `
      btn.style.position = "relative"
      btn.style.overflow = "hidden"
      btn.style.zIndex = "1"
      btn.insertBefore(fillOverlay, btn.firstChild)

      btn.addEventListener("mouseenter", () => {
        fillOverlay.style.transform = "translateX(0)"
        btn.style.color = "#0B0B0B"
        btn.style.boxShadow = "0 6px 20px rgba(206,255,43,0.3)"
      })

      btn.addEventListener("mouseleave", () => {
        fillOverlay.style.transform = "translateX(-100%)"
        btn.style.color = ""
        btn.style.boxShadow = ""
      })

      // Active state bounce
      btn.addEventListener("mousedown", () => {
        gsap.to(btn, { scale: 0.98, duration: 0.1 })
      })

      btn.addEventListener("mouseup", () => {
        gsap.to(btn, { scale: 1, duration: 0.2, ease: "elastic.out(1, 0.5)" })
      })
    })

    // Cards lift + rotate micro-interaction
    const cards = document.querySelectorAll<HTMLElement>("[data-card], .group")

    cards.forEach((card) => {
      card.style.transition = "transform 300ms cubic-bezier(.22,1,.36,1)"
      card.style.willChange = "transform, opacity"

      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px) scale(1.02) rotateZ(-0.6deg)"
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1) rotateZ(0)"
      })
    })

    // Cleanup
    return () => {
      linkElements.forEach((el) => {
        el.removeAttribute("style")
      })
    }
  }, [])
}

export default function MicroInteractions({ children }: { children: React.ReactNode }) {
  useMicroInteractions()
  return <>{children}</>
}
