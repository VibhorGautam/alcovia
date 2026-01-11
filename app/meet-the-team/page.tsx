import type { Metadata } from "next"
import CustomCursor from "@/components/custom-cursor"
import MeetTheTeamGrid from "@/components/meet-the-team-grid"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Meet The Team | ALCOVIA",
  description:
    "Meet the passionate mentors and leaders at Alcovia dedicated to helping the top 1% achieve their dreams.",
  openGraph: {
    title: "Meet The Team | ALCOVIA",
    description: "Meet our passionate mentors and leaders - The launchpad for the top 1%",
  },
}

export default function MeetTheTeamPage() {
  return (
    <>
      <CustomCursor />
      <main>
        <MeetTheTeamGrid />
        <Footer />
      </main>
    </>
  )
}
