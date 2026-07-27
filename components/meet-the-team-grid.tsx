"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// --- DESIGN SYSTEM ---
const COLORS = {
    background: '#234944',
    backgroundAlt: '#002C45',
    cream: '#E5D1BE',
    amber: '#EABF36',
    crimson: '#912F3C',
};

// --- DATA ---
const team = [
    { id: "01", name: "Sahil Puri", role: "Founder", img: "/images/team/sahil.png" },
    { id: "02", name: "Neera Handa", role: "Lead Advisor", img: "/images/team/neera.png" },
    { id: "03", name: "Sanam", role: "Academic Advisor", img: "/images/team/sanam.png" },
    { id: "04", name: "Farah", role: "Strategy Head", img: "/images/team/farah.png" },
    { id: "05", name: "Vibhor", role: "AI Product Manager", img: "/images/team/vibhor.png" },
    { id: "06", name: "Hita", role: "Systems Designer", img: "/images/team/hita.png" },
    { id: "07", name: "Gaurav Mehta", role: "Full Stack Engineer", img: "/placeholder-user.jpg" },
    { id: "08", name: "Vansh", role: "Brand Experience Manager", img: "/images/team/vansh.png" },
    { id: "09", name: "Madhav", role: "GTM", img: "/images/team/madhav.png" },
];

const companyLogos = [
    "Flipkart", "Panasonic", "Noise", "Nothing", "Masters Union",
    "Bain", "McKinsey", "British School", "Vasant Valley School"
];

const alumniLogos = [
    "Harvard", "Cambridge", "IIM Indore", "SRCC", "NSUT", "SSCBS"
];

export default function MeetTheTeamGrid() {
    const [activeMember, setActiveMember] = useState<typeof team[0] | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Check for mobile/tablet
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Track mouse position globally
    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isMobile]);

    // GSAP smooth animation for image following cursor
    useGSAP(() => {
        if (!imageRef.current || isMobile || !activeMember) return;

        gsap.to(imageRef.current, {
            x: mousePos.x - 150,
            y: mousePos.y - 200,
            duration: 0.3,
            ease: "power2.out",
        });
    }, { dependencies: [mousePos, activeMember, isMobile] });

    const handleMemberHover = (member: typeof team[0]) => {
        setActiveMember(member);
    };

    const handleMemberLeave = () => {
        setActiveMember(null);
    };

    return (
        <div ref={containerRef} className="relative min-h-screen overflow-hidden" style={{ backgroundColor: COLORS.background }}>

            {/* --- CURSOR-FOLLOWING IMAGE PORTAL (Desktop Only) --- */}
            {activeMember && !isMobile && (
                <div
                    ref={imageRef}
                    className="pointer-events-none fixed z-50"
                    style={{
                        width: '300px',
                        height: '400px',
                        left: 0,
                        top: 0,
                        transform: `translate(${mousePos.x - 150}px, ${mousePos.y - 200}px)`,
                    }}
                >
                    <motion.div
                        key={activeMember.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10"
                    >
                        <Image
                            src={activeMember.img}
                            alt={activeMember.name}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-sm uppercase tracking-widest" style={{ color: COLORS.amber }}>{activeMember.role}</p>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* --- SECTION 1: HERO HEADER --- */}
            <section className="px-6 pt-32 pb-20 md:px-12 lg:px-20 lg:pt-40 lg:pb-32">
                <div className="max-w-7xl mx-auto">
                    <motion.p
                        className="text-xs uppercase tracking-[0.3em] mb-6"
                        style={{ color: COLORS.amber }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        The Team
                    </motion.p>

                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] max-w-4xl"
                        style={{ color: COLORS.cream }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        The First-Principle Thinkers Behind the{' '}
                        <span style={{ color: COLORS.amber }}>Top 1%</span>
                    </motion.h1>

                    <motion.p
                        className="mt-8 text-lg md:text-xl max-w-2xl leading-relaxed"
                        style={{ color: `${COLORS.cream}99` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        First Principle Thinkers, Industry Shakers, Lean & Mean. A team that is obsessed with problem statements.
                    </motion.p>
                </div>
            </section>

            {/* --- SECTION 2: DYNAMIC NAME LIST (Desktop) --- */}
            <section className="hidden lg:block px-6 md:px-12 lg:px-20 pb-32">
                <div className="max-w-7xl mx-auto">
                    <p className="text-xs uppercase tracking-[0.2em] mb-8" style={{ color: `${COLORS.cream}66` }}>
                        Hover to Explore
                    </p>

                    <div className="space-y-0">
                        {team.map((member) => (
                            <div
                                key={member.id}
                                onMouseEnter={() => handleMemberHover(member)}
                                onMouseLeave={handleMemberLeave}
                                className="group cursor-pointer py-6 border-b transition-all duration-300"
                                style={{ borderColor: `${COLORS.cream}20` }}
                            >
                                <div className="flex items-baseline justify-between">
                                    <div className="flex items-baseline gap-6">
                                        <span
                                            className="text-sm font-mono transition-colors duration-300"
                                            style={{ color: activeMember?.id === member.id ? COLORS.amber : `${COLORS.cream}40` }}
                                        >
                                            {member.id}
                                        </span>
                                        <h3
                                            className="text-4xl md:text-5xl lg:text-6xl font-bold transition-all duration-300"
                                            style={{
                                                color: activeMember?.id === member.id ? COLORS.amber : COLORS.cream,
                                                transform: activeMember?.id === member.id ? 'translateX(20px)' : 'translateX(0)',
                                            }}
                                        >
                                            {member.name}
                                        </h3>
                                    </div>
                                    <span
                                        className="text-base italic font-serif transition-opacity duration-300"
                                        style={{
                                            color: `${COLORS.cream}99`,
                                            opacity: activeMember?.id === member.id ? 1 : 0.6,
                                        }}
                                    >
                                        {member.role}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 2: MOBILE/TABLET ACCORDION --- */}
            <section className="lg:hidden px-6 md:px-12 pb-20">
                <div className="max-w-2xl mx-auto">
                    <p className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: `${COLORS.cream}66` }}>
                        Tap to Explore
                    </p>

                    <div className="space-y-3">
                        {team.map((member) => (
                            <motion.div
                                key={member.id}
                                className="overflow-hidden rounded-xl border transition-all duration-300"
                                style={{
                                    borderColor: expandedMobile === member.id ? COLORS.amber : `${COLORS.cream}20`,
                                    backgroundColor: expandedMobile === member.id ? `${COLORS.backgroundAlt}` : 'transparent',
                                }}
                                onClick={() => setExpandedMobile(expandedMobile === member.id ? null : member.id)}
                            >
                                <div className="flex items-center justify-between p-5 cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-mono" style={{ color: COLORS.amber }}>{member.id}</span>
                                        <h3 className="text-xl font-bold" style={{ color: COLORS.cream }}>{member.name}</h3>
                                    </div>
                                    <motion.span
                                        animate={{ rotate: expandedMobile === member.id ? 45 : 0 }}
                                        className="text-2xl"
                                        style={{ color: COLORS.amber }}
                                    >
                                        +
                                    </motion.span>
                                </div>

                                <AnimatePresence>
                                    {expandedMobile === member.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-5 pb-5"
                                        >
                                            <div className="flex gap-4">
                                                <div className="relative w-24 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={member.img}
                                                        alt={member.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm uppercase tracking-widest mb-2" style={{ color: COLORS.amber }}>
                                                        {member.role}
                                                    </p>

                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: PEDIGREE BLOCK --- */}
            <section className="px-6 md:px-12 lg:px-20 py-20" style={{ backgroundColor: COLORS.backgroundAlt }}>
                <div className="max-w-4xl mx-auto text-center">
                    <motion.p
                        className="text-xs uppercase tracking-[0.3em] mb-4"
                        style={{ color: COLORS.amber }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Themselves Alumni of
                    </motion.p>

                    <motion.h2
                        className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight"
                        style={{ color: COLORS.cream }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Harvard • Cambridge • IIM Indore • SRCC • NSUT • SSCBS
                    </motion.h2>
                </div>
            </section>

            {/* --- SECTION 4: INFINITE LOGO MARQUEE --- */}
            <section className="py-16 overflow-hidden" style={{ backgroundColor: COLORS.background }}>
                <div className="mb-8 text-center">
                    <p className="text-xs uppercase tracking-[0.3em]" style={{ color: `${COLORS.cream}66` }}>
                        Experienced Folks Who Have Worked In
                    </p>
                </div>

                <div className="relative flex overflow-hidden">
                    <motion.div
                        className="flex gap-16 whitespace-nowrap"
                        animate={{ x: [0, -1920] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 30,
                                ease: "linear",
                            },
                        }}
                    >
                        {[...companyLogos, ...companyLogos].map((logo, i) => (
                            <div
                                key={`${logo}-${i}`}
                                className="flex-shrink-0 px-8 py-4 text-2xl md:text-3xl font-bold uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity duration-300 cursor-default"
                                style={{ color: COLORS.cream }}
                            >
                                {logo}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* --- SECTION 5: CTA --- */}
            <section className="px-6 md:px-12 lg:px-20 py-24 text-center" style={{ backgroundColor: COLORS.backgroundAlt }}>
                <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8"
                    style={{ color: COLORS.cream }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    Ready to Join the Top 1%?
                </motion.h2>

                <motion.a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScvrS8qOc0BaUBKqw5-GSG6oyyBvK3fs0aklTw0eszc1EvBUg/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-10 py-4 text-lg font-bold uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105"
                    style={{
                        backgroundColor: COLORS.crimson,
                        color: COLORS.cream,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ boxShadow: `0 10px 40px ${COLORS.crimson}66` }}
                >
                    Apply for Cohort 2026
                </motion.a>
            </section>
        </div>
    );
}
