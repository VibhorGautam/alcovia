import type { Metadata } from "next"
import CustomCursor from "@/components/custom-cursor"
import MeetTheTeamGrid from "@/components/meet-the-team-grid"
import Footer from "@/components/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Meet The Team | ALCOVIA",
  description:
    "Meet the passionate mentors and leaders at Alcovia dedicated to helping Indian teens achieve their dreams.",
  openGraph: {
    title: "Meet The Team | ALCOVIA",
    description: "Meet our passionate mentors and leaders",
  },
}

export default function MeetTheTeamPage() {
  return (
    <>
      <CustomCursor />
      <main>
        <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-cream/90 px-6 py-5 backdrop-blur-md md:px-12">
          <Link
            href="/"
            className="text-2xl font-black uppercase tracking-tight text-dark transition-colors hover:text-neon"
          >
            ALCOVIA
          </Link>
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-dark/70 transition-colors hover:text-dark"
          >
            <svg
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back Home
          </Link>
        </nav>

        <div className="pt-24">
          <MeetTheTeamGrid />
        </div>

        <Footer />
      </main>
    </>
  )
}
