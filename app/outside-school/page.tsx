"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "lenis/react";
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google';
import { motion } from "framer-motion";
import CustomCursor from "@/components/custom-cursor";
import Footer from "@/components/footer";
import TextReveal from "@/components/text-reveal";

// --- 1. PREMIUM TYPOGRAPHY SETUP ---
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

gsap.registerPlugin(ScrollTrigger);

// --- QUARTERLY DATA ---
const quarters = [
    {
        id: "Q1",
        label: "FOUNDATION",
        title: "Hyper-Personalised",
        color: "#D4AF37",
    },
    {
        id: "Q2",
        label: "VISIBILITY",
        title: "Loud & Known",
        color: "#E1C250",
    },
    {
        id: "Q3",
        label: "TRANSFORMATION",
        title: "The Crucible",
        color: "#ff4d4d",
    },
    {
        id: "Q4",
        label: "CULMINATION",
        title: "The Ascent",
        color: "#D4AF37",
    },
];

export default function OutsideSchoolPage() {
    const container = useRef<HTMLDivElement>(null);
    const scrollContainer = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    // --- 2. SENIOR DEV LOGIC: RESPONSIVE ANIMATION ---
    useGSAP(() => {
        const mm = gsap.matchMedia();
        const sections = gsap.utils.toArray<HTMLElement>(".horizontal-section");

        // DESKTOP LOGIC (Horizontal Scroll)
        mm.add("(min-width: 1024px)", () => {
            const totalWidth = 100 * (sections.length - 1);

            // The Horizontal Pin
            const scrollTween = gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: scrollContainer.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    end: () => "+=" + (scrollContainer.current?.offsetWidth || 0) * 3,
                    onUpdate: (self) => setProgress(Math.round(self.progress * 100))
                }
            });

            // Q2 Parallax (Only on Desktop)
            gsap.to(".parallax-float", {
                y: -150,
                x: 80,
                rotation: 15,
                scrollTrigger: {
                    trigger: "#q2",
                    containerAnimation: scrollTween,
                    start: "left center",
                    end: "right center",
                    scrub: true
                }
            });

            // Q4 Text Reveal (Only on Desktop)
            gsap.fromTo(".q4-reveal",
                { y: 100, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.1, duration: 1,
                    scrollTrigger: {
                        trigger: "#q4",
                        containerAnimation: scrollTween,
                        start: "left center",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // MOBILE LOGIC (Vertical Stack - Cleanup)
        mm.add("(max-width: 1023px)", () => {
            // Simple fade-ins for mobile
            sections.forEach((section) => {
                gsap.fromTo(section.querySelectorAll("h2, p"),
                    { y: 30, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.8, stagger: 0.1,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                        }
                    }
                );
            });
        });

    }, { scope: container });

    return (
        <ReactLenis root options={{ lerp: 0.05, duration: 1.5 }}>
            <div
                ref={container}
                className={`${sans.variable} ${serif.variable} ${mono.variable} font-sans bg-[#0B0C15] text-[#F2F2F2] min-h-screen overflow-x-hidden selection:bg-[#D4AF37] selection:text-black`}
            >
                <CustomCursor />

                {/* --- HERO --- */}
                <section className="h-[80vh] lg:h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Noise Texture Overlay */}
                    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] contrast-150 brightness-100"></div>

                    <div className="z-10 text-center">
                        <h1 className="text-[12vw] lg:text-[15vw] leading-[0.8] font-bold tracking-tighter text-white opacity-80">
                            OUTSIDE<br />SCHOOL
                        </h1>
                    </div>

                    <div className="absolute bottom-12 flex flex-col items-center gap-2 animate-pulse opacity-40">
                        <span className="text-[10px] font-mono uppercase tracking-widest">Initiate Scroll</span>
                        <div className="h-12 w-[1px] bg-white"></div>
                    </div>
                </section>

                {/* --- SCROLL CONTAINER --- */}
                <div ref={scrollContainer} className="flex flex-col lg:flex-row lg:flex-nowrap lg:h-screen lg:w-full relative">

                    {/* Q1: FOUNDATION */}
                    <section id="q1" className="horizontal-section min-w-full h-screen flex flex-col lg:flex-row items-center justify-center p-8 lg:p-24 relative border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0B0C15]">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                        {/* Quarter Label */}
                        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-20">
                            <span className="font-mono text-2xl lg:text-3xl font-bold text-[#D4AF37]">Q1</span>
                            <span className="block text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]/60 mt-1">FOUNDATION</span>
                        </div>

                        <div className="max-w-2xl z-10 relative">
                            <h2 className="text-5xl lg:text-7xl font-serif text-[#D4AF37] mb-8 italic">Hyper-Personalised</h2>
                            <div className="space-y-6 text-lg lg:text-xl font-light leading-relaxed opacity-90">
                                <p>
                                    We are hyper-personalised, and we don't just say it. We create individual roadmaps for each alcovian, built post understanding of current likes, dislikes, future aspirations, current areas of interest.
                                </p>
                                <div className="p-6 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                                    <p className="font-mono text-sm text-[#D4AF37] mb-2">&gt; SYSTEM CHECK</p>
                                    <p>These are broken down at a quarter level, with monthly milestones that are <span className="text-green-400 font-bold">binary</span> in nature- they are either <span className="text-green-400 font-bold">DONE</span>, or <span className="text-red-400 font-bold">NOT</span>.</p>
                                </div>
                                <p className="text-sm uppercase tracking-widest opacity-50 pt-4">Alcovians dont hide behind excuses, we are go-getters from day 1!</p>
                            </div>
                        </div>
                    </section>

                    {/* Q2: VISIBILITY */}
                    <section id="q2" className="horizontal-section min-w-full h-screen flex flex-col lg:flex-row items-center justify-center p-8 lg:p-24 relative bg-[#E1C250] text-[#0B0C15] overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-multiply"></div>

                        {/* Quarter Label */}
                        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-20">
                            <span className="font-mono text-2xl lg:text-3xl font-bold text-[#0B0C15]">Q2</span>
                            <span className="block text-[10px] font-mono uppercase tracking-widest text-[#0B0C15]/60 mt-1">VISIBILITY</span>
                        </div>

                        <div className="parallax-float hidden lg:flex absolute top-[20%] right-[15%] w-72 h-96 bg-[#F2F2F2] shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] border-2 border-black items-center justify-center rotate-3 z-0">
                            <span className="text-9xl grayscale opacity-20">🎙️</span>
                        </div>

                        <div className="max-w-3xl z-10 relative mix-blend-hard-light">
                            <h2 className="text-7xl lg:text-[10rem] leading-none font-black mb-6 tracking-tighter uppercase">
                                LOUD<br />& KNOWN
                            </h2>
                            <p className="text-xl lg:text-3xl font-bold leading-tight max-w-3xl border-l-4 border-black pl-6">
                                Alcovian is now becoming a bit known : fortnightly linkedin posts about workshop learnings, sharing a full blown shot podcast, reels that are potentially viral- our alcovians are learning from industry makers and shakers.
                            </p>
                            <p className="mt-6 text-lg font-medium italic opacity-80">
                                They also start off working on their social work project from this quarter.
                            </p>
                        </div>
                    </section>

                    {/* Q3: THE CRUCIBLE */}
                    <section id="q3" className="horizontal-section min-w-full h-screen flex items-center justify-center p-8 relative bg-[#4A0404] text-[#F2F2F2]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#000000_20%,transparent_80%)]"></div>

                        {/* Quarter Label */}
                        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-20">
                            <span className="font-mono text-2xl lg:text-3xl font-bold text-[#ff6b6b]">Q3</span>
                            <span className="block text-[10px] font-mono uppercase tracking-widest text-[#ff6b6b]/60 mt-1">TRANSFORMATION</span>
                        </div>

                        <div className="relative z-10 max-w-5xl w-full text-center lg:text-left">
                            <h2 className="text-6xl lg:text-9xl font-serif italic mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d4d] to-[#4A0404] lg:absolute lg:-left-24 lg:-top-32 opacity-70 select-none">
                                TRANSFORM
                            </h2>
                            <h2 className="text-5xl lg:text-8xl font-serif italic mb-12 relative z-20">
                                The Crucible
                            </h2>
                            <div className="grid lg:grid-cols-2 gap-12">
                                <p className="text-lg lg:text-2xl leading-relaxed">
                                    Alcovian now has a phonebook on mentors to reach out to, courtesy fortnightly sessions with career counsellor, has solid clarity on what they definitely dont want to do, and some lucky ones already know where their life is headed.
                                </p>
                                <div className="border-t border-red-500/50 pt-6">
                                    <p className="font-mono text-red-200 text-sm mb-4">/// THE CHALLENGE</p>
                                    <p className="text-xl lg:text-2xl font-medium">
                                        A transformative quarter for all alcovians- they build their own startups which they have to own- the goods and the bads- <span className="text-white border-b-2 border-white">alone.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Q4: THE ASCENT */}
                    <section id="q4" className="horizontal-section min-w-full h-screen flex flex-col items-center justify-center p-8 relative bg-[#0D3B2E]">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

                        {/* Quarter Label */}
                        <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-20">
                            <span className="font-mono text-2xl lg:text-3xl font-bold text-[#D4AF37]">Q4</span>
                            <span className="block text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]/60 mt-1">CULMINATION</span>
                        </div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-bold text-[#D4AF37] opacity-5 select-none pointer-events-none font-sans">
                            GROW
                        </div>

                        <div className="max-w-4xl text-center z-10">
                            <h2 className="text-5xl lg:text-8xl font-serif text-[#D4AF37] mb-8 italic">The Ascent</h2>
                            <div className="space-y-6 text-lg lg:text-2xl font-light text-[#F2F2F2]/80">

                                <p>This year brought in a lot of maturity, made each alcovian know that they are capable of 10x of their imagination.</p>


                                <p className="text-white text-2xl lg:text-4xl font-normal">
                                    They have not only made bonds that will last them a lifetime, they have stories- of success & failures. There are battlescars- but all of them making each alcovian only stronger.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* --- QUARTERLY JOURNEY GRAPH --- */}
                <section className="py-20 lg:py-32 px-8 lg:px-24 bg-[#0B0C15]">
                    <div className="max-w-6xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl lg:text-6xl font-serif text-center text-[#D4AF37] mb-16 italic"
                        >
                            Your Quarterly Journey
                        </motion.h2>

                        {/* Timeline */}
                        <div className="relative">
                            {/* Connection Line */}
                            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#E1C250] via-[#ff4d4d] to-[#D4AF37] -translate-y-1/2" />

                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
                                {quarters.map((q, index) => (
                                    <motion.div
                                        key={q.id}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="relative"
                                    >
                                        {/* Node */}
                                        <div
                                            className="w-12 h-12 rounded-full border-4 mx-auto mb-6 flex items-center justify-center font-mono font-bold text-sm bg-[#0B0C15] relative z-10"
                                            style={{ borderColor: q.color, color: q.color }}
                                        >
                                            {q.id}
                                        </div>

                                        {/* Card */}
                                        <div
                                            className="p-6 rounded-lg border text-center"
                                            style={{ borderColor: `${q.color}30`, backgroundColor: `${q.color}10` }}
                                        >
                                            <span
                                                className="text-[10px] font-mono uppercase tracking-widest block mb-2"
                                                style={{ color: q.color }}
                                            >
                                                {q.label}
                                            </span>
                                            <h3
                                                className="text-xl lg:text-2xl font-serif italic"
                                                style={{ color: q.color }}
                                            >
                                                {q.title}
                                            </h3>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- CTA SECTION --- */}
                <section className="min-h-[60vh] flex flex-col items-center justify-center px-8 text-center bg-gradient-to-b from-[#D4AF37] to-[#0D3B2E]">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12 font-serif text-4xl md:text-6xl lg:text-7xl font-bold italic leading-none text-[#0B0C15]"
                    >
                        Ready to<br />transform?
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Link
                            href="https://docs.google.com/forms/d/e/1FAIpQLScvrS8qOc0BaUBKqw5-GSG6oyyBvK3fs0aklTw0eszc1EvBUg/viewform?embedded=true"
                            className="inline-block rounded-full px-12 py-6 font-sans text-xl font-bold uppercase tracking-wider bg-[#0B0C15] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B0C15] transition-all duration-500 hover:scale-105"
                        >
                            Begin Your Journey
                        </Link>
                    </motion.div>
                </section>

                <div className="relative z-10 bg-black">
                    <Footer />
                </div>
            </div>
        </ReactLenis>
    );
}

