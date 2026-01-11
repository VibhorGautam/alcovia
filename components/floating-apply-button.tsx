"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function FloatingApplyButton() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling 200px
            setIsVisible(window.scrollY > 200)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        handleScroll() // Check initial state

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed bottom-6 inset-x-0 z-50 flex justify-center md:bottom-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.a
                        href="https://docs.google.com/forms/d/e/1FAIpQLScvrS8qOc0BaUBKqw5-GSG6oyyBvK3fs0aklTw0eszc1EvBUg/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-wide shadow-2xl transition-all duration-300 md:px-8 md:py-4 md:text-base"
                        style={{
                            backgroundColor: '#EABF36',
                            color: '#002C45',
                            boxShadow: '0 8px 30px rgba(234, 191, 54, 0.4), 0 4px 15px rgba(0, 0, 0, 0.1)',
                        }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 12px 40px rgba(234, 191, 54, 0.5), 0 6px 20px rgba(0, 0, 0, 0.15)',
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span>Apply for Cohort 2026</span>
                        <motion.span
                            className="inline-block"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            →
                        </motion.span>
                    </motion.a>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
