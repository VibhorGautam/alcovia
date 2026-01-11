"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/text-reveal";

export default function CTA() {
    return (
        <section
            className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"
            style={{ background: 'linear-gradient(to bottom, #EABF36, #234944)' }}
        >
            <TextReveal delay={0} highlightColor="#EABF36">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 font-display text-4xl font-bold uppercase leading-none md:text-6xl lg:text-7xl"
                    style={{ color: '#002C45' }}
                >
                    Ready to start<br />your season?
                </motion.h2>
            </TextReveal>

            <motion.a
                href="https://docs.google.com/forms/d/e/1FAIpQLScvrS8qOc0BaUBKqw5-GSG6oyyBvK3fs0aklTw0eszc1EvBUg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, backgroundColor: "#912F3C" }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full px-12 py-6 font-display text-xl font-bold uppercase tracking-wider transition-colors duration-300"
                style={{ backgroundColor: '#002C45', color: '#E5D1BE' }}
            >
                Start Your Journey
            </motion.a>
        </section>
    );
}

