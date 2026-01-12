"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function StudentSnapshots() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="relative z-10 w-full bg-[#08261e]">
      {/* Full-width Video Container */}
      <motion.div
        className="relative w-full aspect-video"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Video Placeholder - Replace src with actual video */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/video-poster.jpg"
        >
          {/* Add your video source here */}
          <source src="/videos/download.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Optional Overlay for text/branding */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </section>
  )
}
