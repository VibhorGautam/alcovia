"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PremiumNavbar from "@/components/premium-navbar"
import Footer from "@/components/footer"

export default function ContactPage() {
    const [formState, setFormState] = useState({
        parentName: "",
        studentName: "",
        email: "",
        phone: "",
        grade: "",
        interests: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log("Form submitted:", formState)
        alert("Thank you for your interest! We will be in touch shortly.")
    }

    return (
        <div className="relative min-h-screen bg-[#3d4a2a] text-[#F7F7F3]">
            <PremiumNavbar />

            {/* Fixed Background Pattern */}
            <div className="fixed inset-0 z-0 pointer-events-none">
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

            <main className="relative z-10 pt-32 pb-20 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center min-h-[80vh]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-2xl"
                >
                    <div className="text-center mb-12">
                        <h1 className="font-[family-name:var(--font-playfair)] text-5xl font-bold md:text-6xl mb-4">
                            Join the <span className="text-[#EABF36]">Community</span>
                        </h1>
                        <p className="text-[#F7F7F3]/70">
                            Express your interest. Let's build the future together.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="parentName" className="text-xs uppercase tracking-widest text-[#EABF36]">Parent Name</label>
                                <input
                                    type="text"
                                    id="parentName"
                                    name="parentName"
                                    value={formState.parentName}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-[#F7F7F3] focus:outline-none focus:border-[#EABF36] transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="studentName" className="text-xs uppercase tracking-widest text-[#EABF36]">Student Name</label>
                                <input
                                    type="text"
                                    id="studentName"
                                    name="studentName"
                                    value={formState.studentName}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-[#F7F7F3] focus:outline-none focus:border-[#EABF36] transition-colors"
                                    placeholder="Jane Doe"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs uppercase tracking-widest text-[#EABF36]">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-[#F7F7F3] focus:outline-none focus:border-[#EABF36] transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-xs uppercase tracking-widest text-[#EABF36]">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formState.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-[#F7F7F3] focus:outline-none focus:border-[#EABF36] transition-colors"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="grade" className="text-xs uppercase tracking-widest text-[#EABF36]">Current Grade</label>
                            <select
                                id="grade"
                                name="grade"
                                value={formState.grade}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-[#F7F7F3] focus:outline-none focus:border-[#EABF36] transition-colors appearance-none"
                            >
                                <option value="" disabled className="bg-[#3d4a2a]">Select Grade</option>
                                <option value="8" className="bg-[#3d4a2a]">Grade 8</option>
                                <option value="9" className="bg-[#3d4a2a]">Grade 9</option>
                                <option value="10" className="bg-[#3d4a2a]">Grade 10</option>
                                <option value="11" className="bg-[#3d4a2a]">Grade 11</option>
                                <option value="12" className="bg-[#3d4a2a]">Grade 12</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="interests" className="text-xs uppercase tracking-widest text-[#EABF36]">Interests & Goals</label>
                            <textarea
                                id="interests"
                                name="interests"
                                value={formState.interests}
                                onChange={handleChange}
                                rows={4}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-[#F7F7F3] focus:outline-none focus:border-[#EABF36] transition-colors resize-none"
                                placeholder="Tell us about the student's interests and what you hope to achieve..."
                            />
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-[#EABF36] text-[#0B0B0B] font-bold uppercase tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(206,255,43,0.3)] hover:shadow-[0_0_30px_rgba(206,255,43,0.5)] transition-all"
                        >
                            Submit Interest
                        </motion.button>
                    </form>
                </motion.div>
            </main>

            <Footer />
        </div>
    )
}
