"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Color constants
const COLORS = {
    green: '#234944',
    beige: '#E5D1BE',
    mustard: '#EABF36',
    blue: '#002C45',
    burgundy: '#912F3C',
};

const quarters = [
    {
        id: "Q1",
        title: "5% INCREMENT",
        body: "Our proprietary structures enable daily rigour in terms of academic improvement, combined with inputs from academic advisors, academic is the ground work that we begin with first. 102 meetings with academic advisors across the year help alcovians ace acads",
        stat: "5%",
        bgColor: COLORS.blue,
        textColor: COLORS.beige,
        accentColor: COLORS.mustard,
    },
    {
        id: "Q2",
        title: "WORKSHOPS MAGIC",
        body: "Workshops are doing their magic! All alcovians within the first 6 months are now moving with incrementally better confidence, showcase leadership skills, and are better at people management. Thoughts are more coherent, well structured & are now not only participating in school competitions, but are winning them too. ",
        stat: "VOICE",
        bgColor: COLORS.green,
        textColor: COLORS.beige,
        accentColor: COLORS.mustard,
    },
    {
        id: "Q3",
        title: "SYSTEM NOTICE",
        body: "Teachers, counsellors & staff see the alcovians change the way they move. More competition wins, big stake competitions are coming the school's way. While scores are getting better, so are the class level inputs for any discussions being done in classes. Teachers will ask parents in PTMs on what has changed.",
        stat: "EYES",
        bgColor: COLORS.burgundy,
        textColor: '#FFFFFF',
        accentColor: COLORS.mustard,
    },
    {
        id: "Q4",
        title: "TOP OF CLASS",
        body: " Top at class, great at extracurriculars are the bare minimum inputs from all alcovians by the end of 9 months of the program. Exam stresses are a thing of the past,alcovians move with a better sense of purpose, anxiety about the future subsides.",
        stat: "WIN",
        bgColor: COLORS.mustard,
        textColor: COLORS.blue,
        accentColor: COLORS.blue,
    },
];

export default function HorizontalScroll() {
    const container = useRef<HTMLDivElement>(null);
    const panelsContainer = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!container.current) return;

        const panels = gsap.utils.toArray(".panel");
        const totalPanels = panels.length;

        gsap.to(panels, {
            xPercent: -100 * (totalPanels - 1),
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                pin: true,
                scrub: 1,
                end: () => "+=" + container.current!.offsetWidth * (totalPanels - 1),
            },
        });

    }, { scope: container });

    return (
        <>
            {/* Mobile Layout (Vertical Stack) */}
            <div className="block lg:hidden">
                {quarters.map((q) => (
                    <div key={q.id} className="flex min-h-[80vh] flex-col justify-center px-8 py-20" style={{ backgroundColor: q.bgColor }}>
                        <div className="relative z-10">
                            <h3 className="mb-4 text-xl font-bold tracking-widest" style={{ color: q.accentColor }}>
                                {q.id}
                            </h3>
                            <h2 className="mb-6 font-display text-5xl font-bold uppercase leading-[0.9]" style={{ color: q.textColor }}>
                                {q.title}
                            </h2>
                            <p className="max-w-md font-body text-lg leading-relaxed" style={{ color: q.textColor }}>
                                {q.body}
                            </p>
                        </div>
                        <span className="mt-8 block font-display text-8xl font-bold opacity-10" style={{ color: q.textColor }}>
                            {q.stat}
                        </span>
                    </div>
                ))}
            </div>

            {/* Desktop Layout (Horizontal Scroll) */}
            <div ref={container} className="relative hidden h-screen overflow-hidden lg:block">
                <div
                    ref={panelsContainer}
                    className="flex h-full w-[400%]"
                >
                    {quarters.map((q, i) => (
                        <div
                            key={i}
                            className="panel relative flex h-screen w-screen flex-col justify-center px-12 md:px-32"
                            style={{ backgroundColor: q.bgColor }}
                        >
                            {/* Giant Background Stat */}
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[20vw] font-bold opacity-10" style={{ color: q.textColor }}>
                                {q.stat}
                            </span>

                            {/* Content Card */}
                            <div className="relative z-10 max-w-4xl">
                                <h3 className="mb-4 text-xl font-bold tracking-widest md:text-3xl" style={{ color: q.accentColor }}>
                                    {q.id}
                                </h3>
                                <h2 className="mb-8 font-display text-5xl font-bold uppercase leading-[0.9] md:text-8xl" style={{ color: q.textColor }}>
                                    {q.title}
                                </h2>
                                <p className="max-w-2xl font-body text-lg leading-relaxed md:text-2xl" style={{ color: q.textColor }}>
                                    {q.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

