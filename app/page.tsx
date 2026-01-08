"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSession } from "@/context/session-context"
import { HeroAnimationProvider } from "@/context/hero-animation-context"
import CustomCursor from "@/components/custom-cursor"
import Loader from "@/components/loader"
import ScrollProgress from "@/components/scroll-progress"
import PremiumNavbar from "@/components/premium-navbar"
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
  const { hasShownLoader, setLoaderShown } = useSession()
  const [isLoaded, setIsLoaded] = useState(hasShownLoader)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (hasShownLoader) {
      setIsLoaded(true)
    }
  }, [hasShownLoader])

  const handleLoadingComplete = () => {
    setIsLoaded(true)
    setLoaderShown()
  }

  if (!isMounted) {
    return null
  }

  return (
    <HeroAnimationProvider>
      {isLoaded && <CustomCursor />}
      {!hasShownLoader && <Loader onLoadingComplete={handleLoadingComplete} />}

      <AnimatePresence>
        {isLoaded && (
          <MicroInteractions>
            <div className="overflow-hidden">
              <ScrollProgress />
              <PremiumNavbar />

              {/* Fixed Background Pattern */}
              <div className="fixed inset-0 z-[-1] bg-[#3d4a2a]">
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

              <motion.main
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
                data-theme="graded"
              >
                <Hero />
                <Manifesto />
                <OfferingsHorizontal />
                <ToggleCompare />
                <StudentSnapshots />
                <SocialFan />
                <PartnersSection />
                <Footer />
              </motion.main>
            </div>
          </MicroInteractions>
        )}
      </AnimatePresence>
    </HeroAnimationProvider>
  )
}
