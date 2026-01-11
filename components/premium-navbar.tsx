"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import NavMenu from "@/components/nav-menu"

type NavMode = "light" | "dark"

interface NavItem {
  label: string
  href: string
  hasDropdown?: boolean
  dropdownItems?: Array<{
    section?: string
    items: Array<{
      label: string
      href: string
      icon?: string
      description?: string
    }>
  }>
}

const navLinks: NavItem[] = [
  { label: "TEAM", href: "/meet-the-team", hasDropdown: false },
]

export default function PremiumNavbar() {
  const [navMode, setNavMode] = useState<NavMode>("dark")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navRef = useRef<HTMLElement>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 20)

      if (!navRef.current) return

      const navRect = navRef.current.getBoundingClientRect()
      const navCenter = navRect.top + navRect.height / 2

      const darkSections = document.querySelectorAll('[data-theme="graded"], [data-theme="dark"]')
      let isOverDark = false

      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (navCenter >= rect.top && navCenter <= rect.bottom) {
          isOverDark = true
        }
      })

      const manifesto = document.querySelector('.bg-\\[\\#3d4a2a\\]') as HTMLElement
      if (manifesto) {
        const manifestoRect = manifesto.getBoundingClientRect()
        if (navCenter >= manifestoRect.top && navCenter <= manifestoRect.bottom) {
          isOverDark = true
        }
      }

      const footer = document.querySelector("footer")
      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        if (navCenter >= footerRect.top) {
          isOverDark = true
        }
      }

      setNavMode(isOverDark ? "light" : "dark")
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDropdownEnter = useCallback((label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(label)
  }, [])

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }, [])

  const navHeight = "h-[65px]"

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-40 h-32"
        style={{
          background: navMode === "light"
            ? "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)"
            : "linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 100%)",
          opacity: 0.8,
          transition: "opacity 0.3s ease-out"
        }}
      />

      <motion.nav
        ref={navRef}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${navHeight}`}
        style={{
          background: "transparent",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          borderBottom: "none",
          boxShadow: "none",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          layout
          className={`mx-auto flex h-full items-center justify-between px-6 transition-all duration-500 ease-in-out ${scrolled ? "max-w-full" : "max-w-7xl"}`}
        >
          <motion.div
            layout
            className="z-10 flex items-center order-1"
          >
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={"/images/alcovia-logo-symbol.png"}
                  alt="ALCOVIA"
                  width={scrolled ? 220 : 150}
                  height={scrolled ? 220 : 150}
                  className={`transition-all duration-300 h-[220px] w-[120px] -mt-6 object-contain object-bottom pt-6`}
                  style={{
                    filter: navMode === "light" ? "brightness(1.2) invert(0)" : "brightness(1) invert(0)"
                  }}
                  priority
                />
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            layout
            className={`flex items-center gap-3 order-3 pt-6`}
          >
            {/* Apply for Cohort 2026 Button - Appears on scroll */}
            <AnimatePresence>
              {scrolled && (
                <motion.a
                  href="/contact"
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="hidden md:flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: '#EABF36',
                    color: '#002C45',
                    boxShadow: '0 4px 15px rgba(234, 191, 54, 0.3)',
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 6px 20px rgba(234, 191, 54, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Apply for Cohort 2026</span>
                </motion.a>
              )}
            </AnimatePresence>

            {/* Menu Button - Opens overlay */}
            <motion.button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-black bg-white text-black transition-all duration-300 hover:bg-gray-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col gap-1.5">
                <span className="h-0.5 w-5 rounded-full bg-black" />
                <span className="h-0.5 w-5 rounded-full bg-black" />
              </div>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.nav>

      <NavMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}

function NavLink({
  href,
  children,
  mode,
}: {
  href: string
  children: React.ReactNode
  mode: NavMode
}) {
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-1 px-4 py-2 text-sm font-medium uppercase duration-300"
      style={{ letterSpacing: "0.75px" }}
    >
      <span
        className={`relative z-10 transition-colors duration-300 ${mode === "light" ? "text-white/70 group-hover:text-white" : "text-[#0B0B0B]/70 group-hover:text-[#0B0B0B]"
          }`}
      >
        {children}
      </span>
      <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-[#EABF36] transition-all duration-300 group-hover:w-4/5" />
    </Link>
  )
}

function DropdownMenu({
  items,
  onMouseEnter,
  onMouseLeave,
}: {
  items: Array<{
    section?: string
    items: Array<{
      label: string
      href: string
      icon?: string
      description?: string
    }>
  }>
  onMouseEnter: () => void
  onMouseLeave: () => void
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-full z-50 min-w-[280px] -translate-x-1/2 pt-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="overflow-hidden rounded-2xl p-1"
        style={{
          background: "rgba(20, 20, 20, 0.55)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(234, 191, 54, 0.05)",
        }}
      >
        <div className="p-4">
          {items.length > 0 ? (
            items.map((section, sIdx) => (
              <div key={sIdx} className="mb-4 last:mb-0">
                {section.section && (
                  <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    {section.section}
                  </span>
                )}
                <div className="space-y-1">
                  {section.items.map((item, iIdx) => (
                    <Link
                      key={iIdx}
                      href={item.href}
                      className="group block rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-white/5"
                    >
                      <span className="text-white/90 transition-colors group-hover:text-[#EABF36]">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 text-center">
              <span className="text-sm italic text-white/40">Content coming soon...</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}