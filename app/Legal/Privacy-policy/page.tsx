"use client"

import { motion } from "framer-motion"
import PremiumNavbar from "@/components/premium-navbar"
import Footer from "@/components/footer"

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-[#0B0B0B] text-[#F7F7F3]">
            <PremiumNavbar />

            <div className="pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 text-[#EABF36]">
                        Privacy Policy
                    </h1>

                    <div className="space-y-8 text-lg text-[#F7F7F3]/80 font-light leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                            <p>
                                Welcome to Alcovia. We are committed to protecting your personal information and your right to privacy.
                                If you have any questions or concerns about our policy, or our practices with regards to your personal information,
                                please contact us.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                            <p>
                                We collect personal information that you voluntarily provide to us when registering at the express interest in
                                obtaining information about us or our products and services, when participating in activities on the Website
                                or otherwise contacting us.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                            <p>
                                We use personal information collected via our Website for a variety of business purposes described below.
                                We process your personal information for these purposes in reliance on our legitimate business interests,
                                in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Sharing Your Information</h2>
                            <p>
                                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights,
                                or to fulfill business obligations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
                            <p>
                                If you have questions or comments about this policy, you may email us at info@alcovia.life.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    )
}
