"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Footer from "@/components/footer"
import Image from "next/image"

const programs = [
    {
        id: "career-discovery",
        title: "Career Discovery Workshops",
        description: "Interactive sessions with industry leaders to explore potential career paths.",
        image: "/images/carrerDiscovery.png",
    },
    {
        id: "mentorship",
        title: "1:1 Mentorship",
        description: "Personalized guidance from professionals in your field of interest.",
        image: "/images/oneonone.jpeg",
    },
    {
        id: "academic",
        title: "Academic Excellence",
        description: "Strategies and support to maximize your academic potential.",
        image: "/images/academic.jpeg",
    },
    {
        id: "leadership",
        title: "Leadership Development",
        description: "Cultivate the skills needed to lead and inspire others.",
        image: "/images/forgebonds.jpg",
    },
]

export default function ProgramsPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    return (
        <div className="relative min-h-screen bg-[#3d4a2a] text-[#F7F7F3]">

            {/* Fixed Background Pattern */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.06]">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {[...Array(20)].map((_, i) => (
                            <path
                                key={i}
                                d={`M0,${20 + i * 3} Q25,${15 + i * 3 + Math.sin(i) * 3} 50,${20 + i * 3} T100,${20 + i * 3}`}
                                fill="none"
                                stroke="#F7F7F3"
                                strokeWidth="0.1"
                            />
                        ))}
                    </svg>
                </div>
            </div>

            <main className="relative z-10 pt-32 pb-20 px-6 md:px-12 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center"
                >
                    <h1 className="font-[family-name:var(--font-playfair)] text-5xl font-bold md:text-7xl">
                        Our <span className="text-[#EABF36]">Programs</span>
                    </h1>
                    <p className="mt-6 text-lg text-[#F7F7F3]/70 max-w-2xl mx-auto">
                        Designed to empower the next generation of leaders through immersive experiences and expert guidance.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {programs.map((program, index) => (
                        <motion.div
                            key={program.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-[#EABF36]/50 transition-colors"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={program.image}
                                    alt={program.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] to-transparent opacity-80" />
                            </div>
                            <div className="p-8 relative z-10 -mt-12">
                                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#F7F7F3] mb-3 group-hover:text-[#EABF36] transition-colors">
                                    {program.title}
                                </h3>
                                <p className="text-[#F7F7F3]/70 leading-relaxed">
                                    {program.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    )
}
