"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

interface Offering {
  id: string
  label: string
  title: string
  description: string
  image: string
  style: {
    top: string
    left: string
    width: string
    height: string
  }
}

const offerings: Offering[] = [
  {
    id: "career-discovery",
    label: "CAREER DISCOVERY",
    title: "Career Discovery Workshops",
    description: "Professionals share their journey in 30-minute sessions. Followed by real-life simulations where teens solve problem statements in teams. We track engagement, teamwork, crisis management, and 11 soft skills.",
    image: "/images/carrerDiscovery.png",
    style: { top: "10%", left: "6%", width: "300px", height: "250px" },
  },
  {
    id: "mentorship",
    label: "1:1 MENTORSHIP",
    title: "Monthly Mentorship Calls",
    description: "Once a month, a call with a professional that Alcovian is curious about. Build conviction on which career stream to take by talking to people living it.",
    image: "/images/oneonone.jpeg",
    style: { top: "35%", left: "70.5%", width: "200px", height: "200px" },
  },
  {
    id: "podcast",
    label: "PODCAST SHOOTS",
    title: "Podcast with Industry Experts",
    description: "Alcovians host industry veterans and public personalities, asking questions about their careers and how teens can follow similar paths.",
    image: "/images/podcast.jpeg",
    style: { top: "5%", left: "45%", width: "450px", height: "300px" },
  },
  {
    id: "academic",
    label: "ACADEMIC EXCELLENCE",
    title: "Scientifically Build Academic Score",
    description: "Day-level inputs on academic progress. AI-powered exam score predictions at subject level. We act as consultants for stronger academic performance.",
    image: "/images/academic.jpeg",
    style: { top: "55%", left: "-2%", width: "250px", height: "200px" },
  },
  {
    id: "bonds",
    label: "FORGE BONDS",
    title: "Connect with Driven Teens",
    description: "You're the sum of 5 people you hang out with. Meet similarly ambitious teens in a safe space to discuss dreams, fears, ambitions & vulnerabilities.",
    image: "/images/forgebonds.jpg",
    style: { top: "55%", left: "18%", width: "250px", height: "250px" },
  },
  {
    id: "harvard",
    label: "WEEKLY MENTORSHIP",
    title: "Harvard / UCL / Cambridge Mentors",
    description: "Our academic advisors from top universities lead each Alcovian through the year, ensuring strong motivation. Alcovians see them as extended family.",
    image: "/images/accessToindustry.jpg",
    style: { top: "32%", left: "32%", width: "300px", height: "300px" },
  },
  {
    id: "counsellor",
    label: "MONTHLY COUNSELLING",
    title: "Career Counsellor Meetings",
    description: "Counsellors ask the right questions to help introspect which career makes sense. Nurture and eliminate approach for 8th graders, deeper exploration for older students.",
    image: "/images/counselerMeeting.jpg",
    style: { top: "68%", left: "48%", width: "200px", height: "160px" },
  },
  {
    id: "resilience",
    label: "BUILD RESILIENCE",
    title: "3-Month Startup Building",
    description: "For three months, Alcovians individually build a startup to cultivate grit and resilience through real entrepreneurial challenges.",
    image: "/images/resilience.jpg",
    style: { top: "68%", left: "78%", width: "180px", height: "200px" },
  },
  {
    id: "empathy",
    label: "BUILD EMPATHY",
    title: "3-Month Social Work",
    description: "For three months, Alcovians do social work in groups to cultivate empathy and understand the world beyond their immediate circles.",
    image: "/images/peertopeer.jpg",
    style: { top: "8%", left: "63%", width: "180px", height: "200px" },
  }
]

// Mobile Card Component - Vertical Scroll Layout
function MobileOfferingCard({ offering, index }: { offering: Offering; index: number }) {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      className={`relative mb-8 ${isLeft ? "mr-auto pr-8" : "ml-auto pl-8"}`}
      style={{ width: "85%", maxWidth: "320px" }}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Label */}
      <p className="mb-2 text-[10px] uppercase tracking-[0.15em] text-[#CEFF2B]">
        {offering.label}
      </p>

      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
        <Image
          src={offering.image}
          alt={offering.title}
          fill
          className="object-cover"
        />
        {/* Overlay with description */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <div className="p-4">
            <h3 className="font-[family-name:var(--font-playfair)] text-base font-medium italic text-[#F7F7F3]">
              {offering.title}
            </h3>
            <p className="mt-1 text-[11px] leading-relaxed text-[#F7F7F3]/70 line-clamp-2">
              {offering.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Mobile Quote Component
function MobileQuote({ text, index }: { text: React.ReactNode; index: number }) {
  return (
    <motion.div
      className="my-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <p className="font-[family-name:var(--font-playfair)] text-xl italic leading-relaxed text-[#F7F7F3]">
        {text}
      </p>
      <div className="mt-3 h-px w-12 bg-[#CEFF2B]/50" />
    </motion.div>
  )
}

export default function OfferingsHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"])

  // MOBILE LAYOUT - Vertical Scroll
  if (isMobile) {
    return (
      <section className="relative bg-transparent px-4 pt-20 pb-16">
        {/* Opening Title */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#F7F7F3]/50">
            YOUR YEAR AT ALCOVIA
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-normal italic leading-tight text-[#F7F7F3]">
            Everything you need<br />
            to <span className="text-[#CEFF2B]">take flight.</span>
          </h2>
        </motion.div>

        {/* Offerings - Vertical Scroll with Scattered Layout */}
        <div className="relative">
          {offerings.slice(0, 3).map((offering, index) => (
            <MobileOfferingCard key={offering.id} offering={offering} index={index} />
          ))}

          {/* Quote 1 */}
          <MobileQuote
            text={
              <>
                It doesn't matter <span className="text-[#CEFF2B]">where</span> you start,
                it's <span className="text-[#CEFF2B]">how</span> you progress from there.
              </>
            }
            index={0}
          />

          {offerings.slice(3, 6).map((offering, index) => (
            <MobileOfferingCard key={offering.id} offering={offering} index={index + 3} />
          ))}

          {/* Quote 2 */}
          <MobileQuote
            text={
              <>
                Building <span className="text-[#CEFF2B]">future leaders</span>, one teen at a time.
                Where ambition meets opportunity.
              </>
            }
            index={1}
          />

          {offerings.slice(6).map((offering, index) => (
            <MobileOfferingCard key={offering.id} offering={offering} index={index + 6} />
          ))}
        </div>
      </section>
    )
  }

  // DESKTOP LAYOUT - Horizontal Scroll (Original)
  return (
    <section ref={containerRef} className="relative h-[400vh] bg-transparent">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          className="relative h-[90vh] min-w-[200vw]"
          style={{ x }}
        >
          {/* Opening Title */}
          <motion.div
            className="absolute left-[8%] top-[40%] z-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#F7F7F3]/50">
              YOUR YEAR AT ALCOVIA
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-normal italic leading-tight text-[#F7F7F3] md:text-5xl">
              Everything you need<br />
              to <span className="text-[#CEFF2B]">take flight.</span>
            </h2>
          </motion.div>

          {/* Scattered Image Cards */}
          {offerings.map((offering, index) => (
            <motion.div
              key={offering.id}
              className="group absolute cursor-pointer"
              style={{
                top: offering.style.top,
                left: `calc(25% + ${offering.style.left})`,
                width: offering.style.width,
                height: offering.style.height,
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{
                scale: 1.02,
                zIndex: 50,
              }}
            >
              {/* Label above image */}
              <p className="mb-2 text-[10px] uppercase tracking-[0.15em] text-[#CEFF2B]">
                {offering.label}
              </p>

              {/* Image container */}
              <div className="relative h-full w-full overflow-hidden rounded-sm">
                <Image
                  src={offering.image}
                  alt={offering.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover overlay with description */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="p-4">
                    <h3 className="font-[family-name:var(--font-playfair)] text-sm font-medium italic text-[#F7F7F3]">
                      {offering.title}
                    </h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-[#F7F7F3]/80 line-clamp-3">
                      {offering.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Quote 1 */}
          <motion.div
            className="absolute left-[48%] top-[15%] z-10 max-w-[280px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <p className="font-[family-name:var(--font-playfair)] text-xl italic leading-relaxed text-[#F7F7F3]">
              It doesn't matter <span className="text-[#CEFF2B]">where</span> you start,
              it's <span className="text-[#CEFF2B]">how</span> you progress from there.
            </p>
            <div className="mt-3 h-px w-12 bg-[#CEFF2B]/50" />
          </motion.div>

          {/* Quote 2 */}
          <motion.div
            className="absolute left-[85%] top-[75%] z-10 max-w-[300px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <p className="font-[family-name:var(--font-playfair)] text-xl italic leading-relaxed text-[#F7F7F3]">
              Building <span className="text-[#CEFF2B]">future leaders</span>, one teen at a time.
              Where ambition meets opportunity.
            </p>
            <div className="mt-3 h-px w-12 bg-[#CEFF2B]/50" />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-[10%] flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#F7F7F3]/30">
              <svg className="h-4 w-4 text-[#F7F7F3]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <span className="text-xs uppercase tracking-widest text-[#F7F7F3]/40">Scroll to explore</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}