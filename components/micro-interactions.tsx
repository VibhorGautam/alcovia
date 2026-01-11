"use client"

import type React from "react"

import { useEffect } from "react"
import gsap from "gsap"

export function useMicroInteractions() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isTouchDevice = window.matchMedia("(hover: none)").matches

    if (prefersReducedMotion || isTouchDevice) return

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

    const toggleLabels = document.querySelectorAll<HTMLElement>("[data-toggle-label]")

    toggleLabels.forEach((el) => {
      const underline = document.createElement("span")
      underline.className = "toggle-underline"
      underline.style.cssText = `
        position: absolute;
        bottom: -2px;
        left: 50%;
        width: 0;
        height: 2px;
        background: #EABF36;
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

    const buttons = document.querySelectorAll<HTMLElement>("button:not([data-no-micro])")

    buttons.forEach((btn) => {
      const fillOverlay = document.createElement("span")
      fillOverlay.style.cssText = `
        position: absolute;
        inset: 0;
        background: #EABF36;
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

      btn.addEventListener("mousedown", () => {
        gsap.to(btn, { scale: 0.98, duration: 0.1 })
      })

      btn.addEventListener("mouseup", () => {
        gsap.to(btn, { scale: 1, duration: 0.2, ease: "elastic.out(1, 0.5)" })
      })
    })

    const cards = document.querySelectorAll<HTMLElement>("[data-card], .group")

    cards.forEach((card) => {
      card.style.transition = "transform 300ms cubic-bezier(.22,1,.36,1)"

      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px) scale(1.02) rotateZ(-0.6deg)"
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1) rotateZ(0)"
      })
    })

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
