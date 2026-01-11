"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from "@/components/text-reveal";

const team = [
  { id: "01", name: "Sahil Puri", role: "Founder", img: "/placeholder.svg?height=600&width=500" },
  { id: "02", name: "Lakshmi Mahajankatti", role: "Career Counsellor", img: "/placeholder.svg?height=600&width=500" },
  { id: "03", name: "Sanam Aryan", role: "Academic Advisor", img: "/placeholder.svg?height=600&width=500" },
  { id: "04", name: "Ansh Goyal", role: "Associate", img: "/placeholder.svg?height=600&width=500" },
  { id: "05", name: "Ruhani Taneja", role: "Associate", img: "/placeholder.svg?height=600&width=500" },
  { id: "06", name: "Zuala K", role: "Associate", img: "/placeholder.svg?height=600&width=500" },
];

export default function MeetTheTeamGrid() {
  const [activeMember, setActiveMember] = useState(team[0]);

  return (
    <div className="bg-[#0D3B2E] min-h-screen">
      {/* Section 1: Manifesto Header */}
      <section className="px-6 py-20 md:px-12 lg:px-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.p
            className="text-xs uppercase tracking-[0.3em] text-[#CEFF2B] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Who We Are
          </motion.p>

          {/* Mission Statement */}
          <motion.div
            className="max-w-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TextReveal delay={0} highlightColor="#D4AF37">
              <h1
                className="text-3xl md:text-5xl lg:text-6xl leading-[1.15] text-[#F2F2F2] mb-8"
                style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
              >
                We are redefining education in India—by bringing the industry stand next to school students.
                We believe in making alcovians learn by actually doing, learn from each other & learn from the mentors they win for life.
              </h1>
            </TextReveal>

            <TextReveal delay={0.3} highlightColor="#D4AF37">
              <p className="text-lg md:text-xl text-[#F2F2F2]/70 max-w-3xl leading-relaxed">
                We are the launchpad for the top 1% of those who dream bigger, push harder, and never stop reaching for more.
                At Alcovia, we're committed to helping teens unlock their full potential through mentorship, peer learning, and personalized career guidance.
              </p>
            </TextReveal>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Interactive Roster */}
      <section className="px-6 pb-20 md:px-12 lg:px-20 lg:pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:flex gap-16 xl:gap-24">
            {/* LEFT: The Image Stage (Sticky) */}
            <div className="w-1/2 h-[75vh] sticky top-24 rounded-3xl overflow-hidden relative bg-[#0C0C0C]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMember.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeMember.img}
                    alt={activeMember.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B2E]/80 via-transparent to-transparent" />

                  {/* Name Badge on Image */}
                  <motion.div
                    className="absolute bottom-8 left-8 right-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <span className="text-xs uppercase tracking-[0.2em] text-[#CEFF2B] mb-2 block">
                      {activeMember.id}
                    </span>
                    <h3
                      className="text-3xl xl:text-4xl text-[#F2F2F2] font-medium"
                      style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
                    >
                      {activeMember.name}
                    </h3>
                    <p className="text-sm uppercase tracking-widest text-[#F2F2F2]/60 mt-2">
                      {activeMember.role}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT: The List */}
            <div className="w-1/2 flex flex-col justify-center py-12">
              <p className="text-xs uppercase tracking-[0.2em] text-[#F2F2F2]/40 mb-8">
                The Team
              </p>
              {team.map((member) => (
                <div
                  key={member.name}
                  onMouseEnter={() => setActiveMember(member)}
                  className="group cursor-pointer py-6 border-b border-[#F2F2F2]/10 relative overflow-hidden transition-all"
                >
                  {/* The Neon Highlight Bar */}
                  <span className="absolute inset-0 bg-[#CEFF2B] scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-0 duration-300 ease-out" />

                  <div className="relative z-10 flex justify-between items-center px-4">
                    {/* Number + Name */}
                    <div className="flex items-baseline gap-4">
                      <span className="text-sm font-mono text-[#F2F2F2]/30 group-hover:text-[#0D3B2E]/60 transition-colors">
                        {member.id}
                      </span>
                      <h3
                        className="text-2xl xl:text-4xl text-[#F2F2F2] group-hover:text-[#0D3B2E] font-medium transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
                      >
                        {member.name}
                      </h3>
                    </div>
                    {/* Role */}
                    <span className="text-xs uppercase tracking-widest text-[#F2F2F2]/40 group-hover:text-[#0D3B2E]/80 transition-colors duration-300">
                      {member.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Layout (Stacked) */}
          <div className="lg:hidden space-y-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#F2F2F2]/40 mb-4">
              The Team
            </p>
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-4 bg-[#0C0C0C]">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B2E]/90 via-[#0D3B2E]/20 to-transparent" />

                  {/* Number Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-mono px-2 py-1 bg-[#CEFF2B] text-[#0D3B2E] rounded">
                      {member.id}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="px-2">
                  <h3
                    className="text-2xl text-[#F2F2F2] font-medium mb-1"
                    style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-sm uppercase tracking-widest text-[#CEFF2B]">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
