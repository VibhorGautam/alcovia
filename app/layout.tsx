import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import SmoothScrollProvider from "@/components/smooth-scroll-provider"
import { SessionProvider } from "@/context/session-context"
import "./globals.css"

import localFont from "next/font/local"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})



const milan = localFont({
  src: "../public/fonts/GCMilanHeadlineDemo-ExLtSubhe.ttf",
  variable: "--font-milan",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Alcovia Reimagined",
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
      <body className={`${playfair.variable} ${milan.variable} cursor-none font-sans antialiased`}>
        <SessionProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  )
}
