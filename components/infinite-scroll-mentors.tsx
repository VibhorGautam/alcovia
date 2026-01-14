"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import MentorCard from "./mentor-card"

// Constants for mentor data
const MENTORS = [
    {
        name: "Madhav Seth",
        title: "CEO, Ai+ Smartphone",
        college: "Harvard Business School",
        imageSrc: "/assets/mentors/madhavseth.jpg",
    },
    {
        name: "Chef Gauri Varma",
        title: "Founder, Confect & G's Patisserie",
        college: "Oxford University",
        imageSrc: "/assets/mentors/CHEFGAURI.webp",
    },
    {
        name: "Jivraj Singh Sachar",
        title: "Venture Partner, Tribe Capital",
        college: "St. Xavier's College",
        imageSrc: "/assets/mentors/JIVRAJ.webp",
    },
    {
        name: "Nishant Chahar",
        title: "Founder, AlgoPrep",
        college: "NSUT",
        imageSrc: "/assets/mentors/NISHANT.jpg",
    },
    {
        name: "Puneet Chawla",
        title: "Founder, Designwings",
        college: "Amity University",
        imageSrc: "/assets/mentors/puneetchawla.jpg",
    },
    {
        name: "Nikunj Dang",
        title: "Founder & CEO, Yagnum",
        college: "Yagnum",
        imageSrc: "/assets/mentors/nikunjdang.webp",
    },
    {
        name: "Vipul Gupta",
        title: "Google",
        college: "IIM Ahmedabad",
        imageSrc: "/assets/mentors/vipul.jpeg",
    },
    {
        name: "Devansh Jain",
        title: "Executive Director, INOXGFL Group",
        college: "Carnegie Mellon University",
        imageSrc: "/assets/mentors/Devansh-Jain-2.png",
    },
    {
        name: "Nisshant Larioia",
        title: "Partner, The PACT",
        college: "GNLU",
        imageSrc: "/assets/mentors/nisshantlaroia.jpeg",
    },
    {
        name: "Aanchal Kapoor",
        title: "Independent Legal Practitioner",
        college: "NUS Faculty of Law",
        imageSrc: "/assets/mentors/aanchal.webp",
    },
    {
        name: "Ali Rehan",
        title: "President of India Medalist",
        college: "IIT Bombay",
        imageSrc: "/assets/mentors/alirehan.jpeg",
    },
    {
        name: "Suhas Repally",
        title: "Product Manager",
        college: "Coke & Pepsi",
        imageSrc: "/assets/mentors/suhas.jpeg",
    },
    {
        name: "Preeti Sundan",
        title: "Chairperson, UPSC",
        college: "LSE",
        imageSrc: "/assets/mentors/preetisudan.jpeg",
    },
    {
        name: "Rohit Gandhi",
        title: "WION (World is One News)",
        college: "Carleton University",
        imageSrc: "/assets/mentors/rohit-gandhi-1.jpg.jpg",
    },
]

export default function InfiniteScrollMentors() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [isPaused, setIsPaused] = useState(false)
    const autoScrollSpeed = 0.8 // pixels per frame
    const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const animationFrameRef = useRef<number | null>(null)
    const isAutoScrollingRef = useRef(false)

    // Duplicate mentors for seamless loop
    const extendedMentors = [...MENTORS, ...MENTORS, ...MENTORS]

    // Auto-scroll animation
    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container) return

        // Initialize scroll position to middle section
        const oneThird = container.scrollWidth / 3
        container.scrollLeft = oneThird

        const animate = () => {
            if (!isPaused && container) {
                isAutoScrollingRef.current = true

                let newPosition = container.scrollLeft + autoScrollSpeed

                // Reset to beginning for infinite loop
                if (newPosition >= oneThird * 2) {
                    container.scrollLeft = oneThird
                } else {
                    container.scrollLeft = newPosition
                }

                isAutoScrollingRef.current = false
            }
            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animationFrameRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [isPaused])

    // Pause auto-scroll and resume after delay
    const pauseAndResume = useCallback(() => {
        setIsPaused(true)

        // Clear existing timeout
        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current)
        }

        // Resume auto-scroll after 3 seconds of inactivity
        resumeTimeoutRef.current = setTimeout(() => {
            setIsPaused(false)
        }, 3000)
    }, [])

    // Handle touch/mouse interactions
    const handleMouseEnter = () => {
        setIsPaused(true)
    }

    const handleMouseLeave = () => {
        // Clear existing timeout
        if (resumeTimeoutRef.current) {
            clearTimeout(resumeTimeoutRef.current)
        }

        // Resume after short delay
        resumeTimeoutRef.current = setTimeout(() => {
            setIsPaused(false)
        }, 1000)
    }

    const handleTouchStart = () => {
        setIsPaused(true)
    }

    const handleTouchEnd = () => {
        pauseAndResume()
    }

    const handleWheel = (e: React.WheelEvent) => {
        // Allow horizontal scroll with wheel
        if (scrollContainerRef.current && e.deltaX !== 0) {
            pauseAndResume()
        }
    }

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (resumeTimeoutRef.current) {
                clearTimeout(resumeTimeoutRef.current)
            }
        }
    }, [])

    return (
        <div className="w-full py-10">
            <div
                ref={scrollContainerRef}
                className="flex gap-8 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing px-6"
                style={{
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onWheel={handleWheel}
            >
                {extendedMentors.map((mentor, index) => (
                    <MentorCard
                        key={`${mentor.name}-${index}`}
                        name={mentor.name}
                        title={mentor.title}
                        college={mentor.college}
                        imageSrc={mentor.imageSrc}
                    />
                ))}
            </div>

            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    )
}
