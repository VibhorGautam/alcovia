"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Quote, Sparkles } from "lucide-react";
// Make sure this path points to the file created in the previous step
import TextReveal, { MultiLineReveal } from "./text-reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- 1. DATA ---
const OFFERINGS = [
  {
    id: "01",
    label: "CAREER DISCOVERY",
    title: "Career Discovery Workshops",
    description: "Workshops are created to enable Career discovery- we get a new professional to come and in 30 minutes, highlight their journey, how a day in their life looks like, what is the scope of the Industry etc. This is followed by a real life simulation for all Teens to then, in groups that we create, solve for real life problem statements of that profession in a time crunch, ever changing story line. So, in a fun way, they understand what that career is all about. In this duration, we also track their engagement, team work, crisis management, adaptability, public speaking and 11 such soft skills.",
    image: "/images/carrerDiscovery.png",
  },
  {
    id: "02",
    label: "PODCAST SHOOTS",
    title: "Podcast Shoots with Industry Experts",
    description: "Alcovians, for the careers they are curious about, get to meet an industry veteran/ public personality and host the professional and ask questions pertaining to their lives, and how teens like alcovian, can 1. understand the career. 2. Become them in the time to come",
    image: "/images/podcast.jpeg",
  },
  {
    id: "03",
    label: "1:1 MENTORSHIP",
    title: "1:1 Mentorship with Top Professionals",
    description: "Once a month, a call with a professional that Alcovian is curious about. Enable building conviction of which career stream to take by talking to the very people living it.",
    image: "/images/oneonone.jpeg",
  },
  {
    id: "04",
    label: "ACADEMIC EXCELLENCE",
    title: "Scientifically Build Academic Score",
    description: "With day level inputs on academic progress in terms of self study & the rigour of study, each alcovian moves with purpose. With right tech in place, we are also able to now predict upcoming exam scores at a subject level basis the day to day performance of each alcovian. We act as consultants to aid stronger academic performance. Everything is the icing, cake still is strong academic scores.",
    image: "/images/academic.jpeg",
  },
  {
    id: "05",
    label: "FORGE BONDS",
    title: "Forge Bonds with Similarly Driven Teens",
    description: "Many studies have proven that a person is the summation of the next 5 people they hang out with. At alcovia, we enable teens to meet similarly ambitioned folks. Rather than always competing, we create a safe space for all teens to discuss dreams, fears, ambitions & vulnerabilities with each other.",
    image: "/images/forgebonds.jpg",
  },
  {
    id: "06",
    label: "WEEKLY MENTORSHIP",
    title: "Get Mentored Weekly by Harvard / UCL / Cambridge Professionals",
    description: "Our academic advisors are the best in business- they lead each alcovian through the year, ensuring strong motivations throughout the year for everything life throws at our alcovians. Our alcovians see them as extended family.",
    image: "/images/accessToindustry.jpg",
  },
  {
    id: "07",
    label: "MONTHLY COUNSELLING",
    title: "Monthly Meet with Career Counsellor",
    description: "Our career counsellors ask each alcovians the right set of questions- to enable them to introspect which stream of career makes the most sense to them. While being the best is the standard, understanding which sphere to be best at is equally, if not more important. Approach is nurture and eliminate for teens till 8th, and building more depth of understanding for students above 8th.",
    image: "/images/counselerMeeting.jpg",
  },
  {
    id: "08",
    label: "BUILD RESILIENCE",
    title: "Build Resilience",
    description: "For three months, alcovians individually build a startup to cultivate grit and resilience.",
    image: "/images/resilience.jpg",
  },
  {
    id: "09",
    label: "BUILD EMPATHY",
    title: "Build Empathy",
    description: "For three months, alcovians do social work in groups to cultivate empathy.",
    image: "/images/peertopeer.jpg",
  }
];

export default function OfferingsHorizontal() {
  const container = useRef<HTMLDivElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // --- DESKTOP LOGIC (Horizontal Scroll + Parallax) ---
    mm.add("(min-width: 1024px)", () => {
      // 1. The Horizontal Scroll Movement
      const scrollTween = gsap.to(scrollContainer.current, {
        x: () => {
          const totalWidth = scrollContainer.current?.scrollWidth || 0;
          const viewportWidth = window.innerWidth;
          return -(totalWidth - viewportWidth + 100);
        },
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (scrollContainer.current?.scrollWidth || window.innerWidth * 3),
          invalidateOnRefresh: true,
        }
      });

      // 2. Parallax Effect on Images
      const images = gsap.utils.toArray<HTMLElement>(".parallax-image-inner");
      images.forEach((img) => {
        gsap.to(img, {
          xPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            containerAnimation: scrollTween, // Links to the horizontal scroll
            start: "left right",
            end: "right left",
            scrub: true,
          }
        });
      });
    });

  }, { scope: container });

  // Helper to split titles into "Lines" for the effect
  const getTitleLines = (text: string) => {
    // Basic logic: Split roughly in half or keep as one line if short
    const words = text.split(" ");
    if (words.length > 3) {
      const mid = Math.ceil(words.length / 2);
      return [
        { text: words.slice(0, mid).join(" ") },
        { text: words.slice(mid).join(" ") }
      ];
    }
    return [{ text: text }];
  };

  return (
    <section
      ref={container}
      className="relative min-h-screen text-[#0D3B2E] overflow-hidden font-sans"
    >
      {/* --- DESKTOP HORIZONTAL TRACK --- */}
      <div className="hidden lg:flex h-screen items-center pl-12 relative z-10" ref={scrollContainer}>
        <div className="flex items-center gap-[clamp(2rem,3vw,4rem)] pr-32">

          {/* 1. SECTION HEADER (Fixed MultiLineReveal) */}
          <div className="flex-shrink-0 w-[clamp(300px,30vw,500px)] self-center pr-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">
                Your Year at Alcovia
              </p>
            </div>

            {/* Using MultiLineReveal for the "Stacked" Lando Effect */}
            <MultiLineReveal
              className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] italic leading-[1.1] text-[#F7F7F3]"
              lines={[
                { text: "Everything you need" },
                { text: "to take flight.", isAccent: true }
              ]}
              staggerDelay={0.2}
            />
          </div>

          {/* 2. DYNAMIC CARDS */}
          {OFFERINGS.map((item, index) => {
            const titleLines = getTitleLines(item.title);

            return (
              <div
                key={item.id}
                className="relative group w-[clamp(320px,30vw,550px)] flex-shrink-0 self-center transition-all duration-500"
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Card Container */}
                <div className={`
                  relative p-[clamp(1rem,2vw,2rem)] bg-[#08261e]/60 backdrop-blur-md border border-white/10 
                  transition-all duration-500 hover:border-[#D4AF37]/50 hover:bg-[#08261e]/80
                  ${activeCard === index ? 'scale-105 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10' : 'scale-100 opacity-90'}
                `}>

                  {/* Top Label */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] border border-[#D4AF37] px-3 py-1 rounded-full">
                      {item.label}
                    </span>
                    <ArrowRight className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 ${activeCard === index ? '-rotate-45' : ''}`} />
                  </div>

                  {/* Image Area */}
                  <div className="relative w-full h-[clamp(150px,16vw,280px)] overflow-hidden mb-6 bg-black/50">
                    <div className="parallax-image-inner absolute inset-[-10%] w-[120%] h-[120%]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className={`object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0 ${['01', '02', '04'].includes(item.id) ? 'scale-110' : ''}`}
                      />
                    </div>
                  </div>

                  {/* TYPOGRAPHY WITH LANDO REVEALS */}
                  <div className="mb-3">
                    {/* Title using MultiLineReveal for the "Stacked Bar" look */}
                    <MultiLineReveal
                      lines={titleLines}
                      className="font-serif text-[clamp(1.25rem,2vw,1.875rem)] text-[#D4AF37] leading-tight"
                      staggerDelay={0.1}
                    />
                  </div>

                  {/* Description using TextReveal (Single Block) */}
                  <div className="border-l border-white/10 pl-4 mt-2">
                    <TextReveal delay={0.2} highlightColor="#F7F7F3">
                      <p className="text-[clamp(0.75rem,1vw,0.875rem)] font-light text-[#F7F7F3]/80 leading-relaxed">
                        {item.description}
                      </p>
                    </TextReveal>
                  </div>

                </div>
              </div>
            );
          })}

          {/* 3. CLOSING QUOTE */}
          <div className="w-[clamp(300px,40vw,600px)] flex-shrink-0 flex items-center justify-center p-12 self-center">
            <div className="text-center">
              <Quote className="w-16 h-16 text-[#D4AF37] mx-auto mb-8 opacity-50" />
              <MultiLineReveal
                className="font-serif text-[clamp(2rem,4vw,3rem)] italic leading-relaxed text-[#F7F7F3]"
                lines={[
                  { text: "\"Building" },
                  { text: "future leaders,", isAccent: true },
                  { text: "one teen at a time.\"" }
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE VERTICAL LAYOUT (Unchanged structure, updated Animations) --- */}
      <div className="lg:hidden px-6 py-20 relative z-10">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-3">Your Year at Alcovia</p>
          <MultiLineReveal
            lines={[
              { text: "Everything you" },
              { text: "need to" },
              { text: "take flight.", isAccent: true }
            ]}
            className="font-serif text-4xl italic text-[#F7F7F3] leading-tight"
          />
        </div>

        <div className="space-y-20">
          {OFFERINGS.map((item) => (
            <div key={item.id} className="mobile-card group">
              <div className="relative aspect-[4/3] w-full mb-6 overflow-hidden rounded-sm border-l-2 border-[#D4AF37]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B2E] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block text-[10px] bg-[#D4AF37] text-[#0D3B2E] px-2 py-1 font-bold uppercase tracking-widest mb-2">
                    {item.label}
                  </span>
                </div>
              </div>

              {/* Mobile Text Reveals */}
              <div className="mb-3">
                <MultiLineReveal
                  lines={getTitleLines(item.title)}
                  className="font-serif text-2xl text-[#D4AF37] leading-tight"
                />
              </div>

              <div className="pl-4 border-l border-white/20">
                <TextReveal delay={0.1} highlightColor="#FFFFFF">
                  <p className="text-sm text-[#F7F7F3]/80 leading-relaxed">
                    {item.description}
                  </p>
                </TextReveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}