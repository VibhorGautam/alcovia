"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function InteractiveBackground() {
    const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

    // Mouse position tracking for subtle parallax
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Smooth out the mouse movement so it feels "heavy" and premium
    const mouseX = useSpring(x, { stiffness: 50, damping: 20 })
    const mouseY = useSpring(y, { stiffness: 50, damping: 20 })

    // Map mouse movement to a small offset (Parallax Effect)
    // Moving mouse moves background slightly in opposite direction
    const xMove = useTransform(mouseX, [0, dimensions.width], [-20, 20])
    const yMove = useTransform(mouseY, [0, dimensions.height], [-20, 20])

    useEffect(() => {
        // Set initial dimensions
        setDimensions({ width: window.innerWidth, height: window.innerHeight })

        const handleMouseMove = (e: MouseEvent) => {
            x.set(e.clientX)
            y.set(e.clientY)
        }

        const handleResize = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight })
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("resize", handleResize)
        }
    }, [x, y])

    return (
        <div className="absolute inset-0 -z-10 overflow-hidden bg-[#FAFAFA]">

            {/* 1. TOPOGRAPHY CONTOUR LAYER */}
            {/* Premium low-opacity pattern that mimics contour lines */}
            <motion.div
                className="absolute inset-[-100px] opacity-[0.08]"
                style={{
                    x: xMove,
                    y: yMove,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    backgroundSize: "600px 600px",
                }}
            />

            {/* 2. NOISE GRAIN OVERLAY */}
            {/* Adds "paper" texture feel seen in high-end design */}
            <div
                className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* 3. VIGNETTE */}
            {/* Softens edges to focus attention on center content */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)] pointer-events-none" />

        </div>
    )
}
