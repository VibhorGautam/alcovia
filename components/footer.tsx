"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import FlipLink from "@/components/flip-link"

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  })

  const footerLinks = [
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Meet The Team", href: "/meet-the-team" },
    { name: "Contact", href: "/contact" }
  ]


  const textY = useTransform(scrollYProgress, [0, 1], [30, 0])

  return (
    <footer
      ref={containerRef}
      className="relative overflow-hidden bg-[#000000] px-4 pb-0 pt-16 sm:px-6 md:px-12"
    >
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]" preserveAspectRatio="none">
          {[...Array(15)].map((_, i) => (
            <motion.path
              key={i}
              d={`M0,${20 + i * 6} Q25,${15 + i * 6 + Math.sin(i) * 5} 50,${20 + i * 6} T100,${20 + i * 6}`}
              fill="none"
              stroke="#CEFF2B"
              strokeWidth="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 3 }}
            />
          ))}
        </svg>

        <motion.div
          className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-[#CEFF2B]/5 blur-[100px]"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-[#CEFF2B]/3 blur-[80px]"
          animate={{
            x: [0, -25, 0],
            y: [0, 25, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col">
        <div className="grid grid-cols-1 gap-8 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#CEFF2B]">
              Contact Us
            </h3>
            <div className="space-y-3 text-sm text-white/60">
              <a
                href="https://www.google.com/maps/place/WeWork+Two+Horizon+Centre+-+Coworking+%26+Office+Space+in+Golf+Course+Road,+Gurugram/@28.4511202,77.0965147,17z/data=!3m2!4b1!5s0x390d18e94e3f0557:0x15caf654c98d779a!4m6!3m5!1s0x390d196a9219452f:0x2b7db4e11e0c29d1!8m2!3d28.4511202!4d77.0965147!16s%2Fg%2F11ffw7b31g?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D"
                className="block transition-colors hover:text-[#CEFF2B]"
              >
                WeWork, Two Horizon Centre,<br />
                DLF Phase 5, Gurugram
              </a>
              <a
                href="tel:+919070606050"
                className="block transition-colors hover:text-[#CEFF2B]"
              >
                +91 9070606050
              </a>
              <a
                href="mailto:info@alcovia.life"
                className="block transition-colors hover:text-[#CEFF2B]"
              >
                info@alcovia.life
              </a>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#CEFF2B]">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2">
              {footerLinks.map((link) => (
                <FlipLink
                  key={link.name}
                  href={link.href}
                  className="w-fit text-sm"
                  baseColor="rgba(255,255,255,0.6)"
                  hoverColor="#CEFF2B"
                >
                  {link.name}
                </FlipLink>
              ))}
            </nav>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#CEFF2B]">
              Legal
            </h3>
            <nav className="flex flex-col space-y-2">
              {[
                { name: "Terms & Conditions", href: "/Legal/terms-and-conditions" },
                { name: "Privacy Policy", href: "/Legal/Privacy-policy" }
              ].map((link) => (
                <FlipLink
                  key={link.name}
                  href={link.href}
                  className="w-fit text-sm"
                  baseColor="rgba(255,255,255,0.6)"
                  hoverColor="#CEFF2B"
                >
                  {link.name}
                </FlipLink>
              ))}
            </nav>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#CEFF2B]">
              Follow Us
            </h3>
            <div className="flex gap-3">
              {[
                { name: "Instagram", icon: "M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" },
                { name: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                { name: "Twitter", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all hover:border-[#CEFF2B] hover:bg-[#CEFF2B]/10"
                  aria-label={social.name}
                >
                  <svg
                    className="h-4 w-4 text-white/60 transition-colors group-hover:text-[#CEFF2B]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex flex-col items-center justify-between gap-4 py-6 text-center md:flex-row md:text-left"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xs text-white/40 sm:text-sm">
            Alcovia © 2026. Ahead of the Curve.
          </p>
          <p className="text-xs text-white/40">
            All rights reserved.
          </p>
        </motion.div>

        <motion.div
          className="relative -mx-4 mt-8 overflow-hidden sm:-mx-6 md:-mx-12"
          style={{ y: textY }}
        >
          <div className="relative overflow-hidden px-2">
            <motion.div
              className="absolute inset-0 z-20 bg-[#000000]"
              initial={{ x: "0%" }}
              animate={isInView ? { x: "105%" } : {}}
              transition={{ delay: 0.3, duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            />

            <motion.h2
              className="select-none text-center font-black uppercase leading-[0.85] tracking-tighter"
              style={{
                WebkitTextStroke: "clamp(1px, 0.15vw, 4px) #CEFF2B",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 40px rgba(206,255,43,0.3))",
                fontSize: "clamp(3rem, 18vw, 20vw)",
              }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.9 } : {}}
              transition={{ delay: 0.5, duration: 1.2 }}
            >
              <motion.span
                animate={{
                  filter: [
                    "drop-shadow(0 0 40px rgba(206,255,43,0.3))",
                    "drop-shadow(0 0 60px rgba(206,255,43,0.5))",
                    "drop-shadow(0 0 40px rgba(206,255,43,0.3))",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ALCOVIA
              </motion.span>
            </motion.h2>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}