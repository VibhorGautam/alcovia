"use client"

import { motion } from "framer-motion"

const DURATION = 0.25
const STAGGER = 0.015

interface FlipLinkProps {
    children: string
    href?: string
    className?: string
    baseColor?: string
    hoverColor?: string
    onClick?: () => void
}

export default function FlipLink({
    children,
    href = "#",
    className = "",
    baseColor = "inherit",
    hoverColor = "#CEFF2B",
    onClick
}: FlipLinkProps) {
    return (
        <motion.a
            href={href}
            onClick={onClick}
            initial="initial"
            whileHover="hovered"
            className={`relative block overflow-hidden whitespace-nowrap ${className}`}
            style={{
                lineHeight: 1,
                height: "1em",
            }}
        >
            {/* First layer - base text */}
            <div className="relative">
                {children.split("").map((letter, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            initial: { y: 0 },
                            hovered: { y: "-100%" },
                        }}
                        transition={{
                            duration: DURATION,
                            ease: "easeInOut",
                            delay: STAGGER * i,
                        }}
                        className="inline-block"
                        style={{ color: baseColor, verticalAlign: "top" }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}
            </div>

            {/* Second layer - hover text (positioned absolute, initially below) */}
            <div className="absolute inset-0">
                {children.split("").map((letter, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            initial: { y: "100%" },
                            hovered: { y: 0 },
                        }}
                        transition={{
                            duration: DURATION,
                            ease: "easeInOut",
                            delay: STAGGER * i,
                        }}
                        className="inline-block"
                        style={{ color: hoverColor, verticalAlign: "top" }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}
            </div>
        </motion.a>
    )
}
