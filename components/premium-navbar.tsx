"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"

type NavMode = "light" | "dark"

const navLinks = [
  { label: "PROGRAMS", href: "/programs" },
  { label: "ABOUT", href: "/about" },
  { label: "TEAM", href: "/team" },
  { label: "CONTACT", href: "/contact" },
]

export default function PremiumNavbar() {
  const [navMode, setNavMode] = useState<NavMode>("dark") // dark text on light bg by default
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navRef = useRef<HTMLElement>(null)

  // Color-adaptive behavior using scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 20)

      // Section detection logic
      const hero = document.getElementById("hero")
      const manifesto = document.querySelector('[data-theme="graded"]') as HTMLElement

      if (!navRef.current) return

      const navRect = navRef.current.getBoundingClientRect()
      const navCenter = navRect.top + navRect.height / 2

      // Check if navbar overlaps with manifesto (dark section)
      if (manifesto) {
        const manifestoRect = manifesto.getBoundingClientRect()
        if (
          navCenter >= manifestoRect.top &&
          navCenter <= manifestoRect.bottom
        ) {
          setNavMode("light") // white text on dark bg
          return
        }
      }

      // Check footer
      const footer = document.querySelector("footer")
      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        if (navCenter >= footerRect.top) {
          setNavMode("light")
          return
        }
      }

      // Default to dark text (light sections)
      setNavMode("dark")
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Apply Now button pulse animation
  const pulseAnimation = {
    scale: [1, 1.02, 1],
    boxShadow: [
      "0 0 0px rgba(206,255,43,0)",
      "0 0 20px rgba(206,255,43,0.6)",
      "0 0 0px rgba(206,255,43,0)",
    ],
  }

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${scrolled ? "backdrop-blur-2xl" : "backdrop-blur-xl"
          }`}
        style={{
          backgroundColor: scrolled
            ? navMode === "dark"
              ? "rgba(247,247,243,0.85)"
              : "rgba(11,11,11,0.85)"
            : navMode === "dark"
              ? "rgba(247,247,243,0.7)"
              : "rgba(11,11,11,0.7)",
          borderBottomColor: navMode === "dark"
            ? "rgba(11,11,11,0.1)"
            : "rgba(247,247,243,0.1)",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Left - Logo */}
          <Link href="/" className="z-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/images/alcovia-logo.png"
                alt="ALCOVIA"
                width={300}
                height={150}
                className="h-auto w-[20px] md:w-[110px]"
                priority
              />
            </motion.div>
          </Link>

          {/* Center - Nav Links (Desktop) */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href} mode={navMode}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right - Apply Now Button */}
          <div className="flex items-center gap-4">
            <motion.button
              className={`hidden rounded-full border-2 px-6 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 md:block ${navMode === "dark"
                ? "border-[#CEFF2B] bg-[#CEFF2B] text-[#0B0B0B] hover:bg-[#CEFF2B]/90"
                : "border-[#CEFF2B] bg-transparent text-[#CEFF2B] hover:bg-[#CEFF2B] hover:text-[#0B0B0B]"
                }`}
              style={{ letterSpacing: "0.1em" }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              animate={pulseAnimation}
              transition={{
                scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                boxShadow: { repeat: Infinity, duration: 3, ease: "easeInOut" },
              }}
            >
              APPLY NOW
            </motion.button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`relative h-10 w-10 lg:hidden ${navMode === "dark" ? "text-[#0B0B0B]" : "text-[#F7F7F3]"
                }`}
              aria-label="Toggle menu"
            >
              <motion.div
                className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2"
                style={{
                  backgroundColor: navMode === "dark" ? "#0B0B0B" : "#CEFF2B",
                }}
                animate={{
                  rotate: mobileMenuOpen ? 45 : 0,
                  y: mobileMenuOpen ? 0 : -6,
                }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2"
                style={{
                  backgroundColor: navMode === "dark" ? "#0B0B0B" : "#CEFF2B",
                }}
                animate={{
                  opacity: mobileMenuOpen ? 0 : 1,
                }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2"
                style={{
                  backgroundColor: navMode === "dark" ? "#0B0B0B" : "#CEFF2B",
                }}
                animate={{
                  rotate: mobileMenuOpen ? -45 : 0,
                  y: mobileMenuOpen ? 0 : 6,
                }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              className="fixed right-0 top-0 z-50 h-full w-[80%] bg-[#0B0B0B] shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex h-full flex-col p-8">
                {/* Close Button */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="mb-12 self-end text-[#F7F7F3]"
                  aria-label="Close menu"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className="block py-3 text-2xl font-bold uppercase tracking-wider text-[#F7F7F3] transition-colors hover:text-[#CEFF2B]"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ letterSpacing: "0.1em", minHeight: "48px" }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Apply Now Button */}
                <motion.button
                  className="mt-auto rounded-full border-2 border-[#CEFF2B] bg-[#CEFF2B] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[#0B0B0B] transition-all"
                  style={{ letterSpacing: "0.1em" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  APPLY NOW
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// NavLink component with magnetic effect and neon underline
function NavLink({
  href,
  children,
  mode,
}: {
  href: string
  children: React.ReactNode
  mode: NavMode
}) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!linkRef.current) return

    const rect = linkRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    )

    // Magnetic effect within 80px
    if (distance < 80) {
      x.set((e.clientX - centerX) * 0.15)
      y.set((e.clientY - centerY) * 0.15)
    } else {
      x.set(0)
      y.set(0)
    }
  }, [x, y])

  useEffect(() => {
    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    } else {
      x.set(0)
      y.set(0)
    }
  }, [isHovered, handleMouseMove, x, y])

  return (
    <motion.div style={{ x: springX, y: springY }}>
      <Link
        ref={linkRef}
        href={href}
        className="group relative block py-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
        style={{ letterSpacing: "0.12em" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.span
          className={`relative transition-all duration-300 ${mode === "dark" ? "text-[#0B0B0B]/70" : "text-[#F7F7F3]/70"
            } ${isHovered ? (mode === "dark" ? "text-[#0B0B0B]" : "text-[#F7F7F3]") : ""}`}
          animate={{ y: isHovered ? -2 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}

          {/* Neon underline */}
          <motion.span
            className="absolute -bottom-1 left-0 h-0.5 bg-[#CEFF2B]"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "100%" : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              boxShadow: isHovered ? "0 0 10px rgba(206,255,43,0.6)" : "none",
            }}
          />
        </motion.span>

        {/* Glow effect */}
        {isHovered && (
          <motion.div
            className="pointer-events-none absolute -inset-2 rounded-lg opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(206,255,43,0.3) 0%, transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
          />
        )}
      </Link>
    </motion.div>
  )
}
