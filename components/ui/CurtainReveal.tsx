"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

interface CurtainRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    curtainColor?: string; // Default: Alcovia Neon Green
    className?: string;
    delay?: number;
}

export default function CurtainReveal({
    children,
    width = "fit-content",
    curtainColor = "#CEFF2B",
    className = "",
    delay = 0
}: CurtainRevealProps) {

    const ref = useRef(null);
    // Trigger animation when element is 20% visible in viewport
    const isInView = useInView(ref, { once: true, margin: "-20%" });
    const mainControls = useAnimation();
    const slideControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
            slideControls.start("visible");
        }
    }, [isInView, mainControls, slideControls]);

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden ${className}`}
            style={{ width }}
        >

            {/* 1. THE CONTENT (Text/Image) */}
            {/* Opacity turns to 1 slightly before the curtain moves, so it's ready to be revealed */}
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 0 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.1, // Instant fade-in behind the curtain
                            delay: delay + 0.1
                        }
                    },
                }}
                initial="hidden"
                animate={mainControls}
            >
                {children}
            </motion.div>

            {/* 2. THE CURTAIN (The Overlay Block) */}
            <motion.div
                variants={{
                    hidden: { left: 0 }, // Starts covering the content completely
                    visible: { left: "100%" }, // Slides off to the right
                }}
                initial="hidden"
                animate={slideControls}
                transition={{
                    duration: 0.5,
                    ease: "easeIn",
                    delay: delay
                }}
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: curtainColor,
                    zIndex: 20, // Must sit ON TOP of the content
                }}
            />

        </div>
    );
}
