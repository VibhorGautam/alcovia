"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import TextReveal from "@/components/text-reveal"

const pillars = [
    {
        title: "Champions",
        subtitle: "Exemplars of Excellence",
        description: "Students who consistently excel, going beyond expectations and setting new benchmarks in academics and extracurriculars.",
        icon: "🏆",
        color: "#0B0B0B",
        bgColor: "bg-[#CCFF00]/10",
        borderColor: "border-[#CCFF00]/30",
    },
    {
        title: "Ambitious",
        subtitle: "Dream Big, Achieve Bigger",
        description: "Those who dream big, continuously push boundaries, and are determined to achieve their goals no matter the challenges.",
        icon: "🚀",
        color: "#0B0B0B",
        bgColor: "bg-[#0B0B0B]/5",
        borderColor: "border-[#0B0B0B]/10",
    },
    {
        title: "Rising Stars",
        subtitle: "Untapped Potential",
        description: "Students with untapped talent and unique strengths, ready to be nurtured and guided to unlock their full capabilities and shape their future.",
        icon: "⭐",
        color: "#0B0B0B",
        bgColor: "bg-[#CCFF00]/10",
        borderColor: "border-[#CCFF00]/30",
    },
]

const logoMeanings = [
    {
        title: "Excellence",
        description: "We understand perfection is a myth, but together, as a team, we strive to come as close to it as possible. The star in our logo represents our north star metric and guiding force.",
        icon: "⭐",
        accent: "#CCFF00",
    },
    {
        title: "The Community",
        description: "The biggest strength of our endeavour is the community itself. While some say it's a dog eat dog world, those at the top are collaborating, growing together, and inspiring each other.",
        icon: "🤝",
        accent: "#FF6B6B",
    },
    {
        title: "A Team",
        description: "The 'A' stands not only for Alcovia, but also for the high standard we hold ourselves to. To build and nurture a community of the top 1%, we must consistently operate at that same level.",
        icon: "🅰️",
        accent: "#0B0B0B",
    },
]

function PillarCard({
    pillar,
    index,
    isInView,
}: {
    pillar: (typeof pillars)[0]
    index: number
    isInView: boolean
}) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className={`relative overflow-hidden rounded-3xl ${pillar.bgColor} border ${pillar.borderColor} p-8 h-full transition-all duration-500 hover:shadow-xl`}
                whileHover={{ y: -8 }}
            >
                <div className="relative z-10">
                    <motion.div
                        className="mb-6 text-5xl"
                        animate={{ scale: isHovered ? 1.15 : 1, rotate: isHovered ? [0, -5, 5, 0] : 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {pillar.icon}
                    </motion.div>

                    <h3 className="text-3xl font-bold text-[#0B0B0B] mb-2">
                        {pillar.title}
                    </h3>

                    <p className="text-sm font-semibold uppercase tracking-wider text-[#0B0B0B]/50 mb-4">
                        {pillar.subtitle}
                    </p>

                    <p className="text-[#0B0B0B]/70 leading-relaxed">
                        {pillar.description}
                    </p>

                    <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-[#CCFF00] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: isHovered ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function AboutContent() {
    const containerRef = useRef<HTMLDivElement>(null)
    const heroRef = useRef<HTMLDivElement>(null)
    const aboutRef = useRef<HTMLDivElement>(null)
    const visionRef = useRef<HTMLDivElement>(null)
    const pillarsRef = useRef<HTMLDivElement>(null)
    const logoRef = useRef<HTMLDivElement>(null)

    const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
    const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" })
    const visionInView = useInView(visionRef, { once: true, margin: "-100px" })
    const pillarsInView = useInView(pillarsRef, { once: true, margin: "-100px" })
    const logoInView = useInView(logoRef, { once: true, margin: "-100px" })

    return (
        <div ref={containerRef} className="bg-[#F5F5EF] text-[#0B0B0B] overflow-hidden">
            <section ref={heroRef} className="relative min-h-[80vh] flex items-center justify-center px-6 py-24 md:px-12">
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute left-[5%] top-[15%] h-[600px] w-[600px] rounded-full opacity-40 blur-[150px]"
                        style={{ background: "radial-gradient(circle, #CCFF00 0%, transparent 70%)" }}
                        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute right-[5%] bottom-[15%] h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
                        style={{ background: "radial-gradient(circle, #0B0B0B 0%, transparent 70%)" }}
                        animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    />

                    <svg className="absolute inset-0 h-full w-full opacity-[0.04]" preserveAspectRatio="none">
                        {[...Array(20)].map((_, i) => (
                            <motion.path
                                key={i}
                                d={`M0,${10 + i * 5} Q25,${8 + i * 5 + Math.sin(i) * 3} 50,${10 + i * 5} T100,${10 + i * 5}`}
                                fill="none"
                                stroke="#0B0B0B"
                                strokeWidth="0.3"
                                initial={{ pathLength: 0 }}
                                animate={heroInView ? { pathLength: 1 } : {}}
                                transition={{ delay: i * 0.05, duration: 2 }}
                            />
                        ))}
                    </svg>

                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full border border-[#0B0B0B]/10"
                            style={{
                                width: 100 + i * 40,
                                height: 100 + i * 40,
                                left: `${15 + i * 12}%`,
                                top: `${20 + (i % 3) * 20}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 20 + i * 5,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            className="inline-block mb-6 px-4 py-2 rounded-full bg-[#CCFF00]/20 text-sm font-semibold uppercase tracking-[0.2em] text-[#0B0B0B]"
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Welcome to Alcovia
                        </motion.span>
                    </motion.div>

                    <motion.h1
                        className="text-5xl font-black uppercase tracking-tight md:text-7xl lg:text-9xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="text-[#0B0B0B]">ABOUT</span>
                        <br />
                        <span className="relative">
                            <span className="text-[#CCFF00]" style={{ WebkitTextStroke: "2px #0B0B0B" }}>US</span>
                        </span>
                    </motion.h1>

                    <TextReveal delay={0.4} highlightColor="#CCFF00">
                        <motion.p
                            className="mt-8 max-w-2xl mx-auto text-lg text-[#0B0B0B]/60 md:text-xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            The launchpad for the top 1% who dream bigger and push harder
                        </motion.p>
                    </TextReveal>

                    <motion.div
                        className="mt-12"
                        initial={{ opacity: 0 }}
                        animate={heroInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.8 }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 text-sm text-[#0B0B0B]/40"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span>Scroll to explore</span>
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section ref={aboutRef} className="relative px-6 py-32 md:px-12 bg-white">
                <div className="mx-auto max-w-5xl">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 40 }}
                        animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block mb-4 px-4 py-2 rounded-full bg-[#0B0B0B] text-xs font-semibold uppercase tracking-[0.2em] text-white">
                            Who We Are
                        </span>

                        <TextReveal delay={0} highlightColor="#CCFF00">
                            <h2 className="mt-6 text-4xl font-bold text-[#0B0B0B] md:text-5xl lg:text-6xl">
                                The Launchpad for the <span className="text-[#CCFF00]" style={{ WebkitTextStroke: "1px #0B0B0B" }}>Top 1%</span>
                            </h2>
                        </TextReveal>

                        <motion.p
                            className="mt-8 text-xl text-[#0B0B0B]/70 leading-relaxed max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={aboutInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.3 }}
                        >
                            We are the launchpad for those who dream bigger, push harder, and never stop reaching for more.
                            At Alcovia, we're committed to helping teens unlock their full potential through mentorship,
                            peer learning, and personalized career guidance.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <section ref={visionRef} className="relative px-6 py-24 md:px-12 bg-[#F5F5EF]">
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-8 md:grid-cols-2">
                        <motion.div
                            className="relative overflow-hidden rounded-3xl bg-white border border-[#0B0B0B]/10 p-10 shadow-lg"
                            initial={{ opacity: 0, x: -50 }}
                            animate={visionInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
                        >
                            <motion.div
                                className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#CCFF00]/30 blur-3xl"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 5, repeat: Infinity }}
                            />

                            <div className="relative z-10">
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CCFF00]">
                                    <span className="text-3xl">👁️</span>
                                </div>

                                <h3 className="text-3xl font-bold text-[#0B0B0B] mb-4">Our Vision</h3>
                                <p className="text-xl text-[#0B0B0B]/70 leading-relaxed">
                                    To cultivate empathetic, global leaders who drive transformative change.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="relative overflow-hidden rounded-3xl bg-[#0B0B0B] p-10"
                            initial={{ opacity: 0, x: 50 }}
                            animate={visionInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)" }}
                        >
                            <motion.div
                                className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#CCFF00]/20 blur-3xl"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                            />

                            <div className="relative z-10">
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#CCFF00]">
                                    <span className="text-3xl">🎯</span>
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
                                <p className="text-xl text-white/80 leading-relaxed">
                                    We want to build a community of top 1% performing students who are Champions,
                                    Ambitious, and Rising Stars — creating an environment where exceptional students
                                    thrive together, inspire each other to grow, innovate, and lead.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section ref={pillarsRef} className="relative px-6 py-32 md:px-12 bg-white">
                <div className="mx-auto max-w-6xl">
                    <motion.div
                        className="mb-16 text-center"
                        initial={{ opacity: 0, y: 40 }}
                        animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block mb-4 px-4 py-2 rounded-full bg-[#CCFF00] text-xs font-semibold uppercase tracking-[0.2em] text-[#0B0B0B]">
                            Our Community
                        </span>
                        <h2 className="mt-4 text-4xl font-bold text-[#0B0B0B] md:text-5xl">
                            The Three Pillars
                        </h2>
                        <p className="mt-4 text-lg text-[#0B0B0B]/60 max-w-2xl mx-auto">
                            By building this community, we create an environment where exceptional students thrive together,
                            and inspire each other to grow, innovate, and lead.
                        </p>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {pillars.map((pillar, index) => (
                            <PillarCard key={pillar.title} pillar={pillar} index={index} isInView={pillarsInView} />
                        ))}
                    </div>
                </div>
            </section>

            <section ref={logoRef} className="relative px-6 py-32 md:px-12 bg-[#0B0B0B]">
                <div className="mx-auto max-w-6xl">
                    <motion.div
                        className="mb-16 text-center"
                        initial={{ opacity: 0, y: 40 }}
                        animate={logoInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block mb-4 px-4 py-2 rounded-full bg-[#CCFF00] text-xs font-semibold uppercase tracking-[0.2em] text-[#0B0B0B]">
                            Our Identity
                        </span>
                        <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
                            What Does Our Logo Represent?
                        </h2>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {logoMeanings.map((item, index) => (
                            <motion.div
                                key={item.title}
                                className="relative group"
                                initial={{ opacity: 0, y: 40 }}
                                animate={logoInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                            >
                                <motion.div
                                    className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 h-full transition-all duration-500 hover:bg-white/10"
                                    whileHover={{ y: -8 }}
                                >
                                    <motion.div
                                        className="mb-6 text-5xl"
                                        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                                    >
                                        {item.icon}
                                    </motion.div>

                                    <h3 className="text-2xl font-bold mb-4 text-[#CCFF00]">
                                        {item.title}
                                    </h3>

                                    <p className="text-white/70 leading-relaxed">
                                        {item.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative px-6 py-24 md:px-12 bg-[#F5F5EF]">
                <div className="mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold text-[#0B0B0B] md:text-4xl mb-6">
                            Ready to Join the Top 1%?
                        </h2>
                        <p className="text-lg text-[#0B0B0B]/60 mb-8">
                            Start your journey with Alcovia today and unlock your full potential.
                        </p>
                        <motion.button
                            className="group relative overflow-hidden rounded-full bg-[#0B0B0B] px-10 py-5 font-semibold uppercase tracking-wide text-white transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-[#CCFF00]"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                            <span className="relative z-10 transition-colors group-hover:text-[#0B0B0B]">
                                Get Started
                            </span>
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
