// Animation presets for consistent Framer Motion animations across the app

export const springTransition = {
  type: "spring" as const,
  stiffness: 280,
  damping: 26,
  mass: 0.8,
}

export const smoothTransition = {
  type: "tween" as const,
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1],
}

export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: springTransition,
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: springTransition,
}

export const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: springTransition,
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: springTransition,
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const clipPathReveal = {
  initial: { clipPath: "inset(0 100% 0 0)" },
  animate: { clipPath: "inset(0 0% 0 0)" },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
}
