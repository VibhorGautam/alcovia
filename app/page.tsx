"use client"

import { motion, AnimatePresence } from "framer-motion"
import { HeroAnimationProvider } from "@/context/hero-animation-context"
import CustomCursor from "@/components/custom-cursor"
import ScrollProgress from "@/components/scroll-progress"
import Hero from "@/components/hero"
import Manifesto from "@/components/manifesto"
import OfferingsHorizontal from "@/components/offerings-horizontal"
import ToggleCompare from "@/components/toggle-compare"
import StudentSnapshots from "@/components/student-snapshots"
import SocialFan from "@/components/social-fan"
import PartnersSection from "@/components/partners-section"
import Footer from "@/components/footer"
import MicroInteractions from "@/components/micro-interactions"

export default function Home() {
  return (
    <HeroAnimationProvider>
      <CustomCursor />

      <AnimatePresence>
        <MicroInteractions>
          <ScrollProgress />

          {/* Fixed Background Pattern */}
          <div className="fixed inset-0 z-[-1] bg-[#08261e]">
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

          <main data-theme="graded">
            <Hero />
            <Manifesto />
            <OfferingsHorizontal />
            <ToggleCompare />
            <StudentSnapshots />
            <SocialFan />
            <PartnersSection />
            <Footer />
          </main>

        </MicroInteractions>
      </AnimatePresence>
    </HeroAnimationProvider>
  )
}
