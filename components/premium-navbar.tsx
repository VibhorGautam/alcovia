"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

type NavMode = "light" | "dark"

// Navigation structure with dropdown support
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
  {
    label: "PROGRAMS",
    href: "/programs",
    hasDropdown: true,
    dropdownItems: []  // Empty for user to fill
  },
  {
    label: "ABOUT",
    href: "/about",
    hasDropdown: true,
    dropdownItems: []  // Empty for user to fill
  },
  {
    label: "TEAM",
    href: "/team",
    hasDropdown: false
  },
  {
    label: "CONTACT",
    href: "/contact",
    hasDropdown: false
  },
]

export default function PremiumNavbar() {
  const [navMode, setNavMode] = useState<NavMode>("dark")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null)

  const navRef = useRef<HTMLElement>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Color-adaptive behavior with enhanced section detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 20)

      if (!navRef.current) return

      const navRect = navRef.current.getBoundingClientRect()
      const navCenter = navRect.top + navRect.height / 2

      // Check all dark sections
      const darkSections = document.querySelectorAll('[data-theme="graded"], [data-theme="dark"]')
      let isOverDark = false

      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (navCenter >= rect.top && navCenter <= rect.bottom) {
          isOverDark = true
        }
      })

      // Check manifesto section specifically
      const manifesto = document.querySelector('.bg-\\[\\#3d4a2a\\]') as HTMLElement
      if (manifesto) {
        const manifestoRect = manifesto.getBoundingClientRect()
        if (navCenter >= manifestoRect.top && navCenter <= manifestoRect.bottom) {
          isOverDark = true
        }
      }

      // Check footer
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

  // Handle dropdown hover with delay
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

  // Navbar height based on scroll state
  const navHeight = scrolled ? "h-[65px]" : "h-[75px]"

  return (
    <>
      {/* Gradient glow behind navbar */}
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-40 h-32"
        style={{
          background: navMode === "light"
            ? "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)"
            : "linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 100%)",
          opacity: scrolled ? 0.8 : 0.5,
          transition: "opacity 0.3s ease-out"
        }}
      />

      <motion.nav
        ref={navRef}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${navHeight}`}
        style={{
          background: navMode === "light"
            ? scrolled
              ? "rgba(10, 10, 10, 0.55)"
              : "rgba(10, 10, 10, 0.35)"
            : scrolled
              ? "rgba(247, 247, 243, 0.55)"
              : "rgba(247, 247, 243, 0.35)",
          backdropFilter: scrolled ? "blur(16px)" : "blur(12px)",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(12px)",
          borderBottom: navMode === "light"
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: scrolled
            ? "0 4px 14px rgba(0, 0, 0, 0.2)"
            : "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          {/* Left - Logo */}
          <Link href="/" className="z-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/images/alcovia-logo.png"
                alt="ALCOVIA"
                width={100}
                height={100}
                className={`h-[150px] transition-all duration-300 ${scrolled ? "w-[220px]" : "w-[220px]"}`}
                style={{
                  filter: navMode === "light"
                    ? "brightness(1.2) invert(0)"
                    : "brightness(1) invert(0)"
                }}
                priority
              />
            </motion.div>
          </Link>

          {/* Center - Nav Links (Desktop) */}
          <nav className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.hasDropdown && handleDropdownEnter(link.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <NavLink
                  href={link.href}
                  mode={navMode}
                  hasDropdown={link.hasDropdown}
                  isDropdownOpen={activeDropdown === link.label}
                >
                  {link.label}
                </NavLink>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.hasDropdown && activeDropdown === link.label && (
                    <DropdownMenu
                      items={link.dropdownItems || []}
                      onMouseEnter={() => handleDropdownEnter(link.label)}
                      onMouseLeave={handleDropdownLeave}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right - Secondary Links & CTA */}
          <div className="flex items-center gap-4">
            {/* Sign In link - Desktop only */}
            <Link
              href="/signin"
              className={`hidden text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:opacity-100 md:block ${navMode === "light"
                  ? "text-white/70 hover:text-white"
                  : "text-[#0B0B0B]/70 hover:text-[#0B0B0B]"
                }`}
              style={{ letterSpacing: "0.75px" }}
            >
              Sign In
            </Link>

            {/* CTA Button - Apply Now */}
            <motion.button
              className={`hidden rounded-full px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 md:block ${navMode === "light"
                  ? "bg-white text-[#0B0B0B] hover:bg-[#CEFF2B]"
                  : "bg-[#0B0B0B] text-white hover:bg-[#CEFF2B] hover:text-[#0B0B0B]"
                }`}
              style={{
                letterSpacing: "0.1em",
                boxShadow: navMode === "light"
                  ? "0 4px 20px rgba(255, 255, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)"
                  : "0 4px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)"
              }}
              whileHover={{
                scale: 1.03,
                y: -2,
                boxShadow: "0 6px 30px rgba(206, 255, 43, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)"
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              APPLY NOW
            </motion.button>

            {/* Mobile Hamburger */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`relative flex h-10 w-10 items-center justify-center rounded-lg lg:hidden ${navMode === "light"
                  ? "hover:bg-white/10"
                  : "hover:bg-black/10"
                }`}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative h-5 w-6">
                <motion.span
                  className="absolute left-0 h-0.5 w-6 rounded-full"
                  style={{
                    backgroundColor: navMode === "light" ? "#CEFF2B" : "#0B0B0B",
                    top: "0px",
                  }}
                  animate={{
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? 9 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="absolute left-0 top-[9px] h-0.5 w-6 rounded-full"
                  style={{
                    backgroundColor: navMode === "light" ? "#CEFF2B" : "#0B0B0B",
                  }}
                  animate={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    scaleX: mobileMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute left-0 h-0.5 w-6 rounded-full"
                  style={{
                    backgroundColor: navMode === "light" ? "#CEFF2B" : "#0B0B0B",
                    top: "18px",
                  }}
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? -9 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 lg:hidden"
              style={{
                background: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(4px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              className="fixed right-0 top-0 z-50 h-full w-[85%] max-w-[400px] lg:hidden"
              style={{
                background: "rgba(11, 11, 11, 0.95)",
                backdropFilter: "blur(20px)",
                boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.5)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex h-full flex-col p-8">
                {/* Close Button */}
                <motion.button
                  onClick={() => setMobileMenuOpen(false)}
                  className="group mb-12 flex h-12 w-12 items-center justify-center self-end rounded-full border border-[#CEFF2B]/30 transition-all hover:border-[#CEFF2B] hover:bg-[#CEFF2B]/10"
                  aria-label="Close menu"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#CEFF2B"
                    strokeWidth="2"
                    className="transition-transform"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 + 0.1 }}
                    >
                      {link.hasDropdown ? (
                        <div>
                          <button
                            onClick={() => setMobileAccordion(
                              mobileAccordion === link.label ? null : link.label
                            )}
                            className="flex w-full items-center justify-between py-4 text-left text-xl font-bold uppercase tracking-wider text-[#F7F7F3] transition-colors hover:text-[#CEFF2B]"
                            style={{ letterSpacing: "0.1em", minHeight: "56px" }}
                          >
                            {link.label}
                            <motion.svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              animate={{ rotate: mobileAccordion === link.label ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <path d="M6 9l6 6 6-6" />
                            </motion.svg>
                          </button>

                          {/* Accordion Content */}
                          <AnimatePresence>
                            {mobileAccordion === link.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="border-l-2 border-[#CEFF2B]/30 py-2 pl-4">
                                  {link.dropdownItems && link.dropdownItems.length > 0 ? (
                                    link.dropdownItems.map((section, sIdx) => (
                                      <div key={sIdx} className="mb-4">
                                        {section.section && (
                                          <span className="mb-2 block text-xs uppercase tracking-wider text-[#F7F7F3]/40">
                                            {section.section}
                                          </span>
                                        )}
                                        {section.items.map((item, iIdx) => (
                                          <Link
                                            key={iIdx}
                                            href={item.href}
                                            className="block py-2 text-sm text-[#F7F7F3]/70 transition-colors hover:text-[#CEFF2B]"
                                            onClick={() => setMobileMenuOpen(false)}
                                          >
                                            {item.label}
                                          </Link>
                                        ))}
                                      </div>
                                    ))
                                  ) : (
                                    <span className="block py-2 text-sm italic text-[#F7F7F3]/40">
                                      Coming soon...
                                    </span>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          className="block py-4 text-xl font-bold uppercase tracking-wider text-[#F7F7F3] transition-colors hover:text-[#CEFF2B]"
                          onClick={() => setMobileMenuOpen(false)}
                          style={{ letterSpacing: "0.1em", minHeight: "56px" }}
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Sign In */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8"
                >
                  <Link
                    href="/signin"
                    className="block py-3 text-sm uppercase tracking-wider text-[#F7F7F3]/60 transition-colors hover:text-[#CEFF2B]"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ letterSpacing: "0.1em" }}
                  >
                    Sign In
                  </Link>
                </motion.div>

                {/* Mobile CTA Button */}
                <motion.button
                  className="mt-auto w-full rounded-full border-2 border-[#CEFF2B] bg-[#CEFF2B] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0B0B0B] transition-all"
                  style={{
                    letterSpacing: "0.1em",
                    boxShadow: "0 0 30px rgba(206, 255, 43, 0.3)"
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(206, 255, 43, 0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
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

// NavLink component with magnetic effect, hover animations, and dropdown indicator
function NavLink({
  href,
  children,
  mode,
  hasDropdown,
  isDropdownOpen,
}: {
  href: string
  children: React.ReactNode
  mode: NavMode
  hasDropdown?: boolean
  isDropdownOpen?: boolean
}) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!linkRef.current) return

    const rect = linkRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    )

    // Magnetic effect within 60px
    if (distance < 60) {
      x.set((e.clientX - centerX) * 0.12)
      y.set((e.clientY - centerY) * 0.12)
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
    <motion.div
      style={{ x: springX, y: springY }}
      animate={{ scale: isPressed ? 0.97 : 1 }}
      transition={{ duration: 0.1 }}
    >
      <Link
        ref={linkRef}
        href={href}
        className="group relative flex items-center gap-1 px-4 py-2 text-sm font-medium uppercase transition-all duration-300"
        style={{ letterSpacing: "0.75px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        <motion.span
          className={`relative transition-all duration-300 ${mode === "light"
              ? "text-white/70 group-hover:text-white"
              : "text-[#0B0B0B]/70 group-hover:text-[#0B0B0B]"
            }`}
          animate={{ y: isHovered ? -2 : 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.span>

        {/* Dropdown Arrow */}
        {hasDropdown && (
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`transition-colors duration-300 ${mode === "light"
                ? "text-white/50 group-hover:text-white"
                : "text-[#0B0B0B]/50 group-hover:text-[#0B0B0B]"
              }`}
            animate={{
              rotate: isDropdownOpen ? 180 : 0,
              y: isHovered ? -2 : 0
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        )}

        {/* Underline that grows from center */}
        <motion.span
          className="absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 bg-[#CEFF2B]"
          initial={{ width: 0 }}
          animate={{ width: isHovered || isDropdownOpen ? "80%" : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            boxShadow: isHovered || isDropdownOpen ? "0 0 12px rgba(206, 255, 43, 0.6)" : "none",
          }}
        />

        {/* Glow effect behind text */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="pointer-events-none absolute inset-0 -z-10 rounded-lg"
              style={{
                background: "radial-gradient(circle, rgba(206, 255, 43, 0.15) 0%, transparent 70%)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  )
}

// Dropdown Menu Component
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
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(206, 255, 43, 0.05)",
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
                    <DropdownItem key={iIdx} item={item} />
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

// Individual Dropdown Item
function DropdownItem({
  item,
}: {
  item: {
    label: string
    href: string
    icon?: string
    description?: string
  }
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={item.href}
      className="group relative block rounded-xl px-4 py-3 transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient sweep */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: "linear-gradient(90deg, rgba(206, 255, 43, 0.1) 0%, rgba(206, 255, 43, 0.05) 50%, transparent 100%)",
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10 flex items-center gap-3">
        {item.icon && (
          <span className="text-lg">{item.icon}</span>
        )}
        <div>
          <span className="block text-sm font-medium text-white/90 transition-colors group-hover:text-[#CEFF2B]">
            {item.label}
          </span>
          {item.description && (
            <span className="mt-0.5 block text-xs text-white/40">
              {item.description}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
