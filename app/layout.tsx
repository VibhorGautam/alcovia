import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import SmoothScrollProvider from "@/components/smooth-scroll-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ALCOVIA | Empowering Indian Teens to Fly Higher",
  description:
    "Join Alcovia's journey to become a future leader shaping the world of tomorrow. Premium mentorship, career discovery, and community for Indian teens.",
  keywords: ["Indian teens", "mentorship", "education", "career discovery", "leadership", "student development"],
  authors: [{ name: "Alcovia" }],
  openGraph: {
    title: "ALCOVIA | Ready to Fly?",
    description: "Empowering Indian teens to become tomorrow's leaders",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALCOVIA | Ready to Fly?",
    description: "Empowering Indian teens to become tomorrow's leaders",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="cursor-none font-sans antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  )
}
