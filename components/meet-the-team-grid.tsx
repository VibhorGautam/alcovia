"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"

const teamMembers = [
  {
    name: "Arjun Sharma",
    role: "Founder & CEO",
    description: "Harvard MBA graduate passionate about transforming Indian education",
    image: "/placeholder.svg?height=500&width=400",
  },
  {
    name: "Priya Patel",
    role: "Head of Mentorship",
    description: "Former McKinsey consultant dedicated to youth development",
    image: "/placeholder.svg?height=500&width=400",
  },
  {
    name: "Rahul Verma",
    role: "Academic Director",
    description: "UCL alumnus with 10+ years in educational consulting",
    image: "/placeholder.svg?height=500&width=400",
  },
  {
    name: "Ananya Reddy",
    role: "Community Lead",
    description: "Building connections between students and industry leaders",
    image: "/placeholder.svg?height=500&width=400",
  },
  {
    name: "Vikram Singh",
    role: "Career Counsellor",
    description: "Helping students discover their true calling",
    image: "/placeholder.svg?height=500&width=400",
  },
  {
    name: "Meera Iyer",
    role: "Program Manager",
    description: "Orchestrating transformative learning experiences",
    image: "/placeholder.svg?height=500&width=400",
  },
  {
    name: "Aditya Kumar",
    role: "Tech Lead",
    description: "Building the digital infrastructure for tomorrow's leaders",
    image: "/placeholder.svg?height=500&width=400",
  },
  {
    name: "Kavya Nair",
    role: "Content Director",
    description: "Crafting stories that inspire and educate",
    image: "/placeholder.svg?height=500&width=400",
  },
]

function TeamCard({
  member,
  index,
  isInView,
}: {
  member: (typeof teamMembers)[0]
  index: number
  isInView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.article
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 group-hover:shadow-2xl"
        whileHover={{ y: -8 }}
      >
        <div className="relative h-[320px] overflow-hidden md:h-[380px]">
          <Image
            src={member.image || "/placeholder.svg"}
            alt={`${member.name} - ${member.role}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: "inset 0 0 0 3px #CCFF00",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-neon"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <div className="p-6">
          <h3 className="text-xl font-bold text-dark">{member.name}</h3>
          <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-neon">{member.role}</p>
          <p className="mt-3 text-sm leading-relaxed text-dark/70">{member.description}</p>
        </div>
      </motion.div>
    </motion.article>
  )
}

export default function MeetTheTeamGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="bg-cream px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-black uppercase tracking-tight text-dark md:text-7xl lg:text-8xl">MEET THE</h1>
          <h1 className="text-5xl font-black uppercase tracking-tight text-neon md:text-7xl lg:text-8xl">TEAM</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-dark/70 md:text-xl">
            The passionate mentors and leaders dedicated to helping you soar
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} isInView={isInView} />
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="mb-6 text-lg text-dark/70">Want to be part of our mission?</p>
          <motion.button
            className="rounded-full bg-dark px-8 py-4 font-semibold uppercase tracking-wide text-white transition-colors hover:bg-dark/90"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Join Our Team
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
