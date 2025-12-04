# Alcovia Reimagined - Full Stack Engineering Challenge

![Alcovia Hero](https://via.placeholder.com/1200x630/CEFF2B/0B0B0B?text=Alcovia+Reimagined)

## 🚀 The Mission

This project is a comprehensive revamp of the Alcovia digital experience, designed to embody the fluidity, boldness, and interactivity of premium web experiences like Landonorris.com, while staying true to Alcovia's mission of building future leaders.

**Role:** Full Stack Engineering Intern  
**Timeline:** 24 Hours  
**Deliverable:** High-performance, interactive web application

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** 
  - [GSAP 3](https://greensock.com/gsap/) (Complex timelines, ScrollTrigger)
  - [Framer Motion](https://www.framer.com/motion/) (UI transitions, layout animations)
- **Language:** TypeScript
- **Deployment:** Vercel

---

## ✨ Key Features

### 1. Cinematic Hero Section
- **Parallax Experience:** Multi-layer parallax background that responds to scroll.
- **"Take Flight" Interaction:** 
  - Custom cursor morphs into a **winged Alcovian** when hovering over the student.
  - Interactive wings reveal with a mask animation and follow the cursor in 3D space.
  - "Future Leader" badge with micro-interactions.
- **Performance:** Optimized using `will-change` and GPU-accelerated properties for 60fps performance.

### 2. The Manifesto
- **Bold Typography:** High-impact, justified text layout inspired by premium editorial design.
- **Scroll Reveal:** Text reveals line-by-line with a neon mask effect using GSAP ScrollTrigger.
- **Accessibility:** Respects `prefers-reduced-motion` settings.

### 3. Offerings Scroll
- **Horizontal Lifestyle Grid:** A seamless horizontal scroll section showcasing 9 key offerings.
- **Interactive Cards:** Hover effects with lift, scale, and neon accent reveals.
- **Content:** Covers everything from Career Discovery to Harvard/UCL Mentorship.

### 4. Interactive Toggle
- **"At School" vs. "Outside School":** A fluid toggle component comparing the two worlds.
- **Dynamic Content:** 
  - *At School:* "How Alcovia helps students ace school."
  - *Outside School:* "How Alcovia fulfills its mission of building differentiation for each Alcovian."
- **Handwritten Elements:** Animated SVG paths for a personal touch.

### 5. Social Fan & Footer
- **Fanned Card Layout:** Social media cards spread out like a hand of cards on scroll.
- **Interactive Hover:** Cards scale and rotate on hover for a tactile feel.
- **Links:** Direct access to LinkedIn, Instagram, and other platforms.

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/alcovia-reimagined.git
   cd alcovia-reimagined
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Design Philosophy

### Motion & Feel
Every interaction is designed to feel "heavy" and premium. We use custom easing curves, spring physics, and staggered animations to create a sense of depth and fluidity. The goal is to make the user feel like they are interacting with a living, breathing application.

### Responsiveness
The site is fully responsive, adapting seamlessly from large desktop screens to mobile devices. 
- **Mobile Optimizations:** Touch-friendly interactions, simplified parallax, and optimized layout shifts.
- **Desktop:** Enhanced cursor effects, complex hover states, and immersive scroll experiences.

### Code Quality
- **Component Architecture:** Modular, reusable components with clear separation of concerns.
- **State Management:** React hooks and Context for local state; ready for global state integration.
- **Semantic HTML:** Accessible structure with proper ARIA labels and roles.

---

## 🔗 Links

- **Live Demo:** [Vercel Deployment Link](https://alcovia-reimagined.vercel.app)
- **GitHub Repository:** [Repo Link](https://github.com/yourusername/alcovia-reimagined)
- **Walkthrough Video:** [Loom Video Link](#)

---

*Built with ❤️ for Alcovia*
