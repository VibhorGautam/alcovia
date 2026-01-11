"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/text-reveal";

export default function Philosophy() {
    return (
        <section className="flex flex-col lg:flex-row">
            {/* Left Side (Text) */}
            <div className="flex min-h-[50vh] flex-col justify-center p-8 lg:min-h-screen lg:w-1/2 lg:p-20" style={{ backgroundColor: '#234944' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <TextReveal delay={0} highlightColor="#EABF36">
                        <p className="mb-12 font-display text-2xl leading-tight lg:text-4xl" style={{ color: '#E5D1BE' }}>
                            Alcovia program is hyperpersonalised- ensuring different outcomes for each alcovian. We work in the area that shows maximum impact. Either an area of big improvement or honing a skill that is already at a mastery level.
                        </p>
                    </TextReveal>

                    <TextReveal delay={0.2} highlightColor="#EABF36">
                        <p className="font-display text-4xl font-bold leading-none lg:text-6xl" style={{ color: '#EABF36' }}>
                            Nobody is perfect, and we love that.
                        </p>
                    </TextReveal>
                </motion.div>
            </div>

            {/* Right Side (Visual) */}
            <div className="relative min-h-[50vh] lg:min-h-screen lg:w-1/2" style={{ backgroundColor: '#002C45' }}>
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    {/* Abstract Fingerprint/Growth Pattern */}
                    <svg className="h-full w-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {[...Array(20)].map((_, i) => (
                            <motion.path
                                key={i}
                                d={`M50,50 m-${i * 2},0 a${i * 2},${i * 2} 0 1,0 ${i * 4},0 a${i * 2},${i * 2} 0 1,0 -${i * 4},0`}
                                fill="none"
                                stroke="#E5D1BE"
                                strokeWidth="0.5"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 2, delay: i * 0.1, ease: "easeInOut" }}
                            />
                        ))}
                    </svg>
                </div>
            </div>
        </section>
    );
}

