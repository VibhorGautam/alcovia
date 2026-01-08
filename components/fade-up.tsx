"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FadeUpProps {
    children: ReactNode
    className?: string
    delay?: number
    duration?: number
}

export default function FadeUp({
    children,
    className,
    delay = 0,
    duration = 0.7,
}: FadeUpProps) {
    const shouldReduceMotion = useReducedMotion()

    const initial = shouldReduceMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: 40 }
    const animate = { opacity: 1, y: 0 }

    return (
        <motion.div
            initial={initial}
            whileInView={animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.25, 0.25, 0, 1],
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    )
}
