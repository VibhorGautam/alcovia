"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function StickyHeader() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className="fixed left-0 right-0 top-0 z-50 px-6 py-4 md:px-12"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link href="/" className="text-xl font-black uppercase tracking-tight text-[#0B0B0B] md:text-2xl">
              ALCOVIA
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              {["Programs", "About", "Team", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-sm font-medium uppercase tracking-wide text-[#0B0B0B]/70 transition-colors hover:text-[#CEFF2B]"
                >
                  {item}
                </Link>
              ))}
            </nav>

            <motion.button
              className="rounded-full bg-[#CEFF2B] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#0B0B0B]"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Apply Now
            </motion.button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
