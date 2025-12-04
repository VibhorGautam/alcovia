/**
 * Hero Animations Module
 * GSAP 3 timelines for the Alcovia hero section
 * Implements cinematic "take flight" experience
 */

import gsap from "gsap"

// ============================================
// UTILITY: Reduced Motion Detection
// ============================================

export const checkReducedMotion = (): boolean => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export const isMobile = (): boolean => {
    if (typeof window === "undefined") return false
    return window.innerWidth < 768
}

// ============================================
// CSS Variables / Tokens
// ============================================

export const COLORS = {
    accent: "#CEFF2B",
    dark: "#0B0B0B",
    light: "#F7F7F3",
}

export const TIMING = {
    pageLoadDelay: 0.1,
    gridStagger: 0.6,
    spotlightDuration: 8,
    wingRevealDuration: 1.2,
    ctaBloomDuration: 0.6,
}

// ============================================
// PAGE LOAD TIMELINE
// ============================================

interface PageLoadTimelineOptions {
    parallaxLayers?: HTMLElement[]
    spotlight?: HTMLElement
    student?: HTMLElement
    leftWing?: HTMLElement
    rightWing?: HTMLElement
    cta?: HTMLElement
    headline?: HTMLElement
    tagline?: HTMLElement
}

export function initPageLoadTimeline(options: PageLoadTimelineOptions) {
    const reducedMotion = checkReducedMotion()

    const tl = gsap.timeline({
        defaults: {
            ease: "power3.out",
            duration: reducedMotion ? 0.3 : 0.8,
        },
    })

    // If reduced motion, just do simple fades
    if (reducedMotion) {
        if (options.parallaxLayers) {
            tl.to(options.parallaxLayers, { opacity: 1, duration: 0.5 })
        }
        if (options.student) {
            tl.to(options.student, { opacity: 1, scale: 1 }, "<")
        }
        if (options.cta) {
            tl.to(options.cta, { opacity: 1 }, "<")
        }
        return tl
    }

    // 1. Parallax grids fade-in with stagger
    if (options.parallaxLayers && options.parallaxLayers.length > 0) {
        tl.fromTo(
            options.parallaxLayers,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: TIMING.gridStagger,
            }
        )
    }

    // 2. Radial spotlight breathe (starts and loops)
    if (options.spotlight) {
        tl.fromTo(
            options.spotlight,
            { opacity: 0, scale: 0.9 },
            { opacity: 0.6, scale: 1, duration: 1 },
            "-=0.3"
        )
    }

    // 3. Student element subtle pop
    if (options.student) {
        tl.fromTo(
            options.student,
            { opacity: 0, scale: 0.95, y: 20 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.9,
                ease: "power2.out",
            },
            "-=0.5"
        )
    }

    // 4. Headline reveal with shimmer
    if (options.headline) {
        tl.fromTo(
            options.headline,
            { clipPath: "inset(0 100% 0 0)" },
            {
                clipPath: "inset(0 0% 0 0)",
                duration: 1.1,
                ease: "power4.out",
            },
            "-=0.4"
        )
    }

    // 5. Tagline reveal
    if (options.tagline) {
        tl.fromTo(
            options.tagline,
            { clipPath: "inset(0 100% 0 0)" },
            {
                clipPath: "inset(0 0% 0 0)",
                duration: 1.1,
                ease: "power4.out",
            },
            "-=0.8"
        )
    }

    // 6. CTA neon bloom
    if (options.cta) {
        tl.fromTo(
            options.cta,
            { opacity: 0, scale: 0.9, boxShadow: "0 0 0px rgba(206,255,43,0)" },
            {
                opacity: 1,
                scale: 1,
                boxShadow: "0 0 30px rgba(206,255,43,0.4)",
                duration: TIMING.ctaBloomDuration,
                ease: "elastic.out(1, 0.5)",
            },
            "-=0.5"
        )

        // Fade the glow after bloom
        tl.to(
            options.cta,
            {
                boxShadow: "0 0 0px rgba(206,255,43,0)",
                duration: 0.8,
            },
            "+=0.3"
        )
    }

    return tl
}

// ============================================
// SPOTLIGHT BREATHING ANIMATION
// ============================================

export function initSpotlightBreathing(spotlight: HTMLElement) {
    if (checkReducedMotion()) return null

    return gsap.to(spotlight, {
        scale: 1.02,
        opacity: 0.7,
        duration: TIMING.spotlightDuration / 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
    })
}

// ============================================
// WING ANIMATIONS (Enhanced)
// ============================================

interface WingAnimationOptions {
    leftWing: HTMLElement
    rightWing: HTMLElement
    wingsContainer?: HTMLElement
}

export function createWingRevealTimeline(options: WingAnimationOptions) {
    const reducedMotion = checkReducedMotion()

    const tl = gsap.timeline({ paused: true })

    if (reducedMotion) {
        tl.to([options.leftWing, options.rightWing], {
            opacity: 1,
            duration: 0.3,
        })
        return tl
    }

    // Left wing reveal with mask
    tl.fromTo(
        options.leftWing,
        {
            opacity: 0,
            scale: 0.8,
            x: 40,
            y: 20,
            rotation: 10,
            clipPath: "inset(0 100% 0 0)",
        },
        {
            opacity: 1,
            scale: 1,
            x: -80,
            y: -20,
            rotation: -15,
            clipPath: "inset(0 0% 0 0)",
            duration: TIMING.wingRevealDuration,
            ease: "power3.out",
        }
    )

    // Right wing reveal with mask (overlapping)
    tl.fromTo(
        options.rightWing,
        {
            opacity: 0,
            scale: 0.8,
            x: -40,
            y: 20,
            rotation: -10,
            clipPath: "inset(0 0 0 100%)",
        },
        {
            opacity: 1,
            scale: 1,
            x: 80,
            y: -20,
            rotation: 15,
            clipPath: "inset(0 0 0 0%)",
            duration: TIMING.wingRevealDuration,
            ease: "power3.out",
        },
        "<0.1"
    )

    // Add neon bloom
    if (options.wingsContainer) {
        tl.fromTo(
            options.wingsContainer,
            { filter: "drop-shadow(0 0 0px rgba(206,255,43,0))" },
            {
                filter: "drop-shadow(0 10px 40px rgba(206,255,43,0.3))",
                duration: 0.6,
            },
            "-=0.4"
        )
    }

    return tl
}

export function createWingHoverAnimation(
    wing: HTMLElement,
    isLeft: boolean,
    intensity: number = 1
) {
    if (checkReducedMotion()) return null

    const baseX = isLeft ? -80 : 80
    const baseRotation = isLeft ? -15 : 15

    return {
        enter: () => {
            gsap.to(wing, {
                scale: 1.04 + 0.02 * intensity,
                rotation: baseRotation + (isLeft ? -2 : 2) * intensity,
                x: baseX + (isLeft ? -10 : 10) * intensity,
                filter: `drop-shadow(0 10px 50px rgba(206,255,43,${0.15 + 0.05 * intensity}))`,
                duration: 0.4,
                ease: "power2.out",
            })
        },
        leave: () => {
            gsap.to(wing, {
                scale: 1,
                rotation: baseRotation,
                x: baseX,
                filter: "drop-shadow(0 10px 40px rgba(206,255,43,0.3))",
                duration: 0.6,
                ease: "power2.out",
            })
        },
        follow: (normalizedX: number, normalizedY: number) => {
            gsap.to(wing, {
                x: baseX + normalizedX * 15,
                y: -20 + normalizedY * 10,
                rotation: baseRotation + normalizedX * 5,
                duration: 0.4,
                ease: "power2.out",
            })
        },
    }
}

export function createWingFoldAnimation(
    leftWing: HTMLElement,
    rightWing: HTMLElement
) {
    if (checkReducedMotion()) return null

    return gsap.to([leftWing, rightWing], {
        scale: 0.7,
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.in",
        paused: true,
    })
}

// ============================================
// CTA BUTTON ANIMATIONS
// ============================================

interface CTAAnimationOptions {
    button: HTMLElement
    magnetRadius?: number
}

export function createCTAMagneticPull(options: CTAAnimationOptions) {
    const { button, magnetRadius = 80 } = options

    if (checkReducedMotion() || isMobile()) return null

    let bounds: DOMRect

    const updateBounds = () => {
        bounds = button.getBoundingClientRect()
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!bounds) updateBounds()

        const centerX = bounds.left + bounds.width / 2
        const centerY = bounds.top + bounds.height / 2
        const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        )

        if (distance < magnetRadius) {
            const pull = 1 - distance / magnetRadius
            const moveX = (e.clientX - centerX) * pull * 0.3
            const moveY = (e.clientY - centerY) * pull * 0.3

            gsap.to(button, {
                x: moveX,
                y: moveY,
                duration: 0.3,
                ease: "power2.out",
            })
        } else {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)",
            })
        }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", updateBounds)

    return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("resize", updateBounds)
    }
}

export function createCTANeonSweep(button: HTMLElement) {
    if (checkReducedMotion()) return null

    const sweep = document.createElement("div")
    sweep.className =
        "absolute inset-0 pointer-events-none overflow-hidden rounded-full"
    sweep.innerHTML = `
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-[#CEFF2B]/30 to-transparent"
         style="transform: translateX(-100%); width: 200%;"></div>
  `
    button.style.position = "relative"
    button.appendChild(sweep)

    const sweepEl = sweep.querySelector("div") as HTMLElement

    return {
        play: () => {
            gsap.fromTo(
                sweepEl,
                { x: "-100%" },
                { x: "100%", duration: 0.6, ease: "power2.out" }
            )
        },
        element: sweep,
    }
}

export function createCTAClickRipple(button: HTMLElement, e: MouseEvent) {
    if (checkReducedMotion()) return

    const rect = button.getBoundingClientRect()
    const ripple = document.createElement("div")
    ripple.className = "absolute rounded-full pointer-events-none"
    ripple.style.cssText = `
    left: ${e.clientX - rect.left}px;
    top: ${e.clientY - rect.top}px;
    width: 0;
    height: 0;
    background: rgba(206, 255, 43, 0.4);
    transform: translate(-50%, -50%);
  `

    button.style.position = "relative"
    button.style.overflow = "hidden"
    button.appendChild(ripple)

    gsap.to(ripple, {
        width: 200,
        height: 200,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
    })
}

// ============================================
// PAPER-PLANE TRAIL
// ============================================

interface PaperPlaneTrailOptions {
    container: HTMLElement
    fadeDelay?: number
}

export function createPaperPlaneTrail(options: PaperPlaneTrailOptions) {
    if (checkReducedMotion() || isMobile()) return null

    const { container, fadeDelay = 600 } = options
    const points: { x: number; y: number; time: number }[] = []
    let pathEl: SVGPathElement | null = null
    let svg: SVGSVGElement | null = null

    // Create SVG container
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9990;
  `

    pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path")
    pathEl.setAttribute("fill", "none")
    pathEl.setAttribute("stroke", COLORS.accent)
    pathEl.setAttribute("stroke-width", "2")
    pathEl.setAttribute("stroke-linecap", "round")
    pathEl.setAttribute("stroke-dasharray", "8 4")
    pathEl.style.opacity = "0.6"

    svg.appendChild(pathEl)
    container.appendChild(svg)

    let animationId: number | null = null
    let isActive = false

    const updatePath = () => {
        if (!pathEl || points.length < 2) return

        const now = Date.now()
        // Remove old points
        while (points.length > 0 && now - points[0].time > fadeDelay) {
            points.shift()
        }

        if (points.length < 2) {
            pathEl.setAttribute("d", "")
            return
        }

        // Create smooth curve through points
        let d = `M ${points[0].x} ${points[0].y}`
        for (let i = 1; i < points.length; i++) {
            const p0 = points[i - 1]
            const p1 = points[i]
            const midX = (p0.x + p1.x) / 2
            const midY = (p0.y + p1.y) / 2
            d += ` Q ${p0.x} ${p0.y} ${midX} ${midY}`
        }
        d += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`

        pathEl.setAttribute("d", d)

        // Animate dash offset
        const length = pathEl.getTotalLength()
        pathEl.style.strokeDashoffset = `${length}`
        gsap.to(pathEl, {
            strokeDashoffset: 0,
            duration: 0.3,
            ease: "none",
        })
    }

    const animate = () => {
        if (!isActive) return
        updatePath()
        animationId = requestAnimationFrame(animate)
    }

    return {
        start: () => {
            isActive = true
            animate()
        },
        stop: () => {
            isActive = false
            if (animationId) cancelAnimationFrame(animationId)
            points.length = 0
            if (pathEl) pathEl.setAttribute("d", "")
        },
        addPoint: (x: number, y: number) => {
            points.push({ x, y, time: Date.now() })
            // Keep max 50 points
            if (points.length > 50) points.shift()
        },
        destroy: () => {
            isActive = false
            if (animationId) cancelAnimationFrame(animationId)
            if (svg && svg.parentNode) svg.parentNode.removeChild(svg)
        },
    }
}

// ============================================
// PARTICLE SYSTEM (Ambient + Sparks)
// ============================================

interface ParticleOptions {
    container: HTMLElement
    maxParticles?: number
    color?: string
}

export function createAmbientParticles(options: ParticleOptions) {
    if (checkReducedMotion()) return null

    const { container, maxParticles = isMobile() ? 15 : 30, color = COLORS.accent } = options
    const particles: HTMLElement[] = []

    const createParticle = () => {
        const particle = document.createElement("div")
        particle.className = "absolute rounded-full pointer-events-none"
        particle.style.cssText = `
      width: ${2 + Math.random() * 4}px;
      height: ${2 + Math.random() * 4}px;
      background: ${color};
      opacity: 0;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
    `
        container.appendChild(particle)
        particles.push(particle)

        // Animate particle
        gsap.to(particle, {
            opacity: 0.3 + Math.random() * 0.4,
            duration: 1 + Math.random() * 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        })

        // Float animation
        gsap.to(particle, {
            x: -20 + Math.random() * 40,
            y: -30 + Math.random() * 60,
            duration: 8 + Math.random() * 12,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        })
    }

    // Create initial particles
    for (let i = 0; i < maxParticles; i++) {
        setTimeout(() => createParticle(), i * 100)
    }

    return {
        destroy: () => {
            particles.forEach((p) => {
                gsap.killTweensOf(p)
                p.remove()
            })
            particles.length = 0
        },
    }
}

export function createSparkBurst(x: number, y: number, container: HTMLElement, count = 6) {
    if (checkReducedMotion()) return

    for (let i = 0; i < count; i++) {
        const spark = document.createElement("div")
        spark.className = "absolute rounded-full pointer-events-none"
        spark.style.cssText = `
      width: 4px;
      height: 4px;
      background: ${COLORS.accent};
      left: ${x}px;
      top: ${y}px;
      transform: translate(-50%, -50%);
    `
        container.appendChild(spark)

        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5
        const distance = 20 + Math.random() * 30

        gsap.to(spark, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0,
            duration: 0.4 + Math.random() * 0.3,
            ease: "power2.out",
            onComplete: () => spark.remove(),
        })
    }
}

// ============================================
// PLANE TAKEOFF ANIMATION (CTA Click Flourish)
// ============================================

export function createPlaneTakeoff(container: HTMLElement, startX: number, startY: number) {
    if (checkReducedMotion()) return null

    const plane = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    plane.setAttribute("viewBox", "0 0 24 24")
    plane.setAttribute("width", "32")
    plane.setAttribute("height", "32")
    plane.innerHTML = `
    <path d="M3 3l18 9-18 9 3-9-3-9z" fill="${COLORS.accent}" stroke="${COLORS.dark}" stroke-width="0.5"/>
  `
    plane.style.cssText = `
    position: fixed;
    left: ${startX}px;
    top: ${startY}px;
    transform: translate(-50%, -50%) rotate(-30deg);
    z-index: 9999;
    pointer-events: none;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
  `

    container.appendChild(plane)

    // Arc path animation
    const tl = gsap.timeline({
        onComplete: () => plane.remove(),
    })

    tl.to(plane, {
        x: window.innerWidth * 0.4,
        y: -window.innerHeight * 0.5,
        rotation: -60,
        scale: 0.5,
        opacity: 0,
        duration: 1.2,
        ease: "power2.in",
    })

    return tl
}

// ============================================
// DOODLES & MICRO-QUOTES
// ============================================

interface DoodleOptions {
    container: HTMLElement
    quotes?: string[]
}

export function createFloatingDoodles(options: DoodleOptions) {
    if (checkReducedMotion()) return null

    const { container, quotes = ["Dream big", "Take flight", "Believe"] } = options

    const doodles: HTMLElement[] = []

    // Create small star doodles
    const starPositions = [
        { left: "10%", top: "20%" },
        { left: "85%", top: "15%" },
        { left: "75%", top: "70%" },
    ]

    starPositions.forEach((pos, i) => {
        const star = document.createElement("div")
        star.className = "absolute pointer-events-none text-[#CEFF2B]/20"
        star.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9 9H2l6 5-2.5 8L12 17l6.5 5L16 14l6-5h-7L12 2z"/></svg>`
        star.style.left = pos.left
        star.style.top = pos.top
        container.appendChild(star)
        doodles.push(star)

        // Float animation
        gsap.to(star, {
            x: -10 + Math.random() * 20,
            y: -15 + Math.random() * 30,
            rotation: 360,
            duration: 15 + i * 5,
            ease: "none",
            repeat: -1,
        })

        gsap.to(star, {
            opacity: 0.3,
            duration: 3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.5,
        })
    })

    // Create floating quote
    let quoteIndex = 0
    const quoteEl = document.createElement("div")
    quoteEl.className =
        "absolute left-1/2 top-[15%] -translate-x-1/2 pointer-events-none px-4 py-2 rounded-full bg-[#0B0B0B]/5 backdrop-blur-sm text-xs uppercase tracking-widest text-[#0B0B0B]/30"
    quoteEl.textContent = quotes[0]
    container.appendChild(quoteEl)
    doodles.push(quoteEl)

    // Rotate quotes
    const rotateQuote = () => {
        gsap.to(quoteEl, {
            opacity: 0,
            y: -10,
            duration: 0.5,
            onComplete: () => {
                quoteIndex = (quoteIndex + 1) % quotes.length
                quoteEl.textContent = quotes[quoteIndex]
                gsap.fromTo(
                    quoteEl,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.5 }
                )
            },
        })
    }

    const quoteInterval = setInterval(rotateQuote, 8000)

    return {
        destroy: () => {
            clearInterval(quoteInterval)
            doodles.forEach((d) => {
                gsap.killTweensOf(d)
                d.remove()
            })
        },
    }
}
