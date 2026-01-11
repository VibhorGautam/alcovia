"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import FlipLink from "@/components/flip-link"
import PremiumNavbar from "@/components/premium-navbar"

const menuItems = [
    { label: "HOME", href: "/" },
    { label: "AT SCHOOL", href: "/at-school" },
    { label: "OUTSIDE SCHOOL", href: "/outside-school" },
    { label: "TEAM", href: "/meet-the-team" },
]

const socialLinks = [
    { label: "INSTAGRAM", href: "https://www.instagram.com/alcovia.life/" },
    { label: "YOUTUBE", href: "https://www.youtube.com/@alcovia.life" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/company/alcovia-life/" },
]

const images = [
    { src: "/images/carrerDiscovery.png", alt: "Career Discovery" },
    { src: "/images/oneonone.jpeg", alt: "One on One Mentoring" },
    { src: "/images/academic.jpeg", alt: "Academic Excellence" },
]

export default function MenuPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

    // Track mouse position for parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width
            const y = (e.clientY - rect.top) / rect.height
            setMousePosition({ x, y })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    // Calculate parallax offset for images
    const getParallaxOffset = (index: number) => {
        const intensity = 30 + (index * 15) // Different intensity per image
        const yOffset = (mousePosition.y - 0.5) * intensity
        return yOffset
    }

    return (
        <>
            

            <main
                ref={containerRef}
                className="min-h-screen bg-[#0b0d0c] text-[#F7F7F3]"
                data-theme="dark"
                data-show-cursor
            >
                <div className="flex min-h-screen flex-col lg:flex-row">

                    {/* Left Column - Image Grid with Parallax (Hidden on Mobile) */}
                    <motion.div
                        className="hidden h-screen w-[45%] p-8 lg:block"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
                    >
                        <div className="flex h-full w-full gap-6">
                            {/* Left tall image */}
                            <motion.div
                                className="relative h-full w-1/2 overflow-hidden rounded-2xl bg-white/5"
                                style={{ y: getParallaxOffset(0) }}
                                transition={{ type: "spring", stiffness: 100, damping: 30 }}
                            >
                                <Image
                                    src={images[0].src}
                                    alt={images[0].alt}
                                    fill
                                    className="object-cover opacity-80 grayscale transition-all duration-700 hover:scale-105 hover:opacity-100 hover:grayscale-0"
                                />
                            </motion.div>

                            {/* Right column with 2 stacked images */}
                            <div className="flex h-full w-1/2 flex-col gap-6">
                                <motion.div
                                    className="relative h-1/2 w-full overflow-hidden rounded-2xl bg-white/5"
                                    style={{ y: getParallaxOffset(1) }}
                                    transition={{ type: "spring", stiffness: 100, damping: 30 }}
                                >
                                    <Image
                                        src={images[1].src}
                                        alt={images[1].alt}
                                        fill
                                        className="object-cover opacity-80 grayscale transition-all duration-700 hover:scale-105 hover:opacity-100 hover:grayscale-0"
                                    />
                                </motion.div>
                                <motion.div
                                    className="relative h-1/2 w-full overflow-hidden rounded-2xl bg-white/5"
                                    style={{ y: getParallaxOffset(2) }}
                                    transition={{ type: "spring", stiffness: 100, damping: 30 }}
                                >
                                    <Image
                                        src={images[2].src}
                                        alt={images[2].alt}
                                        fill
                                        className="object-cover opacity-80 grayscale transition-all duration-700 hover:scale-105 hover:opacity-100 hover:grayscale-0"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Navigation */}
                    <div className="flex min-h-screen w-full flex-col justify-center px-8 pt-24 lg:w-[55%] lg:items-center lg:px-24 lg:pt-0">
                        <motion.nav
                            className="flex flex-col items-center space-y-3"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    className="overflow-hidden"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.3 + (index * 0.1),
                                        ease: [0.33, 1, 0.68, 1]
                                    }}
                                >
                                    <FlipLink
                                        href={item.href}
                                        className="font-[family-name:var(--font-playfair)] text-4xl font-normal uppercase leading-none tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                                        baseColor="#F7F7F3"
                                        hoverColor="#EABF36"
                                    >
                                        {item.label}
                                    </FlipLink>
                                </motion.div>
                            ))}
                        </motion.nav>

                        {/* Footer / Utility Links */}
                        <motion.div
                            className="mt-20 flex w-full flex-col gap-10 border-t border-white/10 pt-10 lg:flex-row lg:justify-center lg:gap-20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >

                            <div className="flex flex-col gap-10 text-center">
                                <div className="flex flex-col gap-2 text-center">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#F7F7F3]/50">
                                    Business Enquiries
                                </span>
                                <a
                                    href="mailto:info@alcovia.life"
                                    className="text-sm font-medium text-[#F7F7F3] transition-colors hover:text-[#EABF36]"
                                >
                                    info@alcovia.life
                                </a>
                            </div>

                            <div className="flex gap-8 justify-center">
                                {socialLinks.map((social, index) => (
                                    <motion.div
                                        key={social.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.8 + (index * 0.1) }}
                                    >
                                        <FlipLink
                                            href={social.href}
                                            className="text-xs font-bold uppercase tracking-widest"
                                            baseColor="#F7F7F3"
                                            hoverColor="#EABF36"
                                        >
                                            {social.label}
                                        </FlipLink>
                                    </motion.div>
                                ))}
                            </div>
                            </div>
                            
                        </motion.div>
                    </div>
                </div>
            </main>
        </>
    )
}
