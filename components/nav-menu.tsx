"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import FlipLink from "@/components/flip-link"
import CustomCursor from "@/components/custom-cursor"
import TextReveal from "@/components/text-reveal"

interface NavMenuProps {
    isOpen: boolean
    onClose: () => void
}

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

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4,
            when: "beforeChildren",
            staggerChildren: 0.08,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3,
            when: "afterChildren",
            staggerChildren: 0.04,
            staggerDirection: -1,
        },
    },
}

const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as const },
    },
    exit: {
        y: 20,
        opacity: 0,
        transition: { duration: 0.25, ease: [0.33, 1, 0.68, 1] as const },
    },
}

const imageGridVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const, delay: 0.15 },
    },
    exit: {
        opacity: 0,
        x: -30,
        transition: { duration: 0.3 },
    },
}

export default function NavMenu({ isOpen, onClose }: NavMenuProps) {
    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
            document.body.style.height = "100vh"
        } else {
            document.body.style.overflow = ""
            document.body.style.height = ""
        }
        return () => {
            document.body.style.overflow = ""
            document.body.style.height = ""
        }
    }, [isOpen])

    return (

        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex h-screen w-full bg-[#0b0d0c] text-[#F7F7F3]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    data-show-cursor
                >
                    {/* Close Button */}
                    <motion.button
                        onClick={onClose}
                        className="absolute right-6 top-6 z-[110] flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7F7F3] text-[#0b0d0c] transition-all hover:scale-110 active:scale-95"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        whileHover={{ rotate: 90 }}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </motion.button>

                    {/* Left Column - Image Grid (Hidden on Mobile) */}
                    <motion.div
                        className="hidden h-full w-[40%] p-8 lg:block"
                        variants={imageGridVariants}
                    >
                        <div className="flex h-full w-full gap-4">
                            {/* Left tall image */}
                            <div className="relative h-full w-1/2 overflow-hidden rounded-2xl bg-white/5">
                                <Image
                                    src="/images/carrerDiscovery.png"
                                    alt="Career Discovery"
                                    fill
                                    className="object-cover opacity-80 grayscale transition-all duration-700 hover:scale-105 hover:opacity-100 hover:grayscale-0"
                                />
                            </div>

                            {/* Right column with 2 stacked images */}
                            <div className="flex h-full w-1/2 flex-col gap-4">
                                <div className="relative h-1/2 w-full overflow-hidden rounded-2xl bg-white/5">
                                    <Image
                                        src="/images/oneonone.jpeg"
                                        alt="One on One Mentoring"
                                        fill
                                        className="object-cover opacity-80 grayscale transition-all duration-700 hover:scale-105 hover:opacity-100 hover:grayscale-0"
                                    />
                                </div>
                                <div className="relative h-1/2 w-full overflow-hidden rounded-2xl bg-white/5">
                                    <Image
                                        src="/images/academic.jpeg"
                                        alt="Academic Excellence"
                                        fill
                                        className="object-cover opacity-80 grayscale transition-all duration-700 hover:scale-105 hover:opacity-100 hover:grayscale-0"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Navigation */}
                    <div className="flex h-full w-full flex-col justify-center px-8 lg:w-[60%] lg:items-center lg:px-24">
                        <nav className="flex flex-col items-center space-y-3">
                            {menuItems.map((item) => (
                                <motion.div
                                    key={item.label}
                                    variants={itemVariants}
                                    className="overflow-hidden"
                                >
                                    <FlipLink
                                        href={item.href}
                                        onClick={onClose}
                                        className="font-[family-name:var(--font-playfair)] text-4xl font-normal uppercase leading-none tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                                        baseColor="#F7F7F3"
                                        hoverColor="#EABF36"
                                    >
                                        {item.label}
                                    </FlipLink>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Footer / Utility Links */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-16 flex w-full flex-col gap-8 border-t border-white/10 pt-8 lg:flex-row lg:justify-center lg:gap-16"
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

                                <div className="flex gap-6 justify-center">
                                    {socialLinks.map((social) => (
                                        <FlipLink
                                            key={social.label}
                                            href={social.href}
                                            className="text-xs font-bold uppercase tracking-widest"
                                            baseColor="#F7F7F3"
                                            hoverColor="#EABF36"
                                        >
                                            {social.label}
                                        </FlipLink>
                                    ))}
                                </div>
                            </div>

                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

    )
}
