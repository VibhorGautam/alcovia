"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      <CustomCursor />
      <Loader onLoadingComplete={() => setIsLoaded(true)} />

      <AnimatePresence>
        {isLoaded && (
          <MicroInteractions>
            <ScrollProgress />
            <PremiumNavbar />
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
          </MicroInteractions>
        )}
      </AnimatePresence>
    </>
  )
}
