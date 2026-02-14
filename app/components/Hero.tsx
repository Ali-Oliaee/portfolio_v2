"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "@/app/contexts/IntlContext"
import WebGLFluidEnhanced from "webgl-fluid-enhanced"
import { useTheme } from "../contexts/ThemeContext"

export default function Hero() {
  const t = useTranslations("hero")
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const fluidRef = useRef<WebGLFluidEnhanced | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Define color palettes for light and dark modes
    const lightModePalette = [
      "#3b82f6",
      "#8b5cf6",
      "#ec4899",
      "#06b6d4",
      "#f59e0b",
    ]
    const darkModePalette = [
      "#60a5fa",
      "#a78bfa",
      "#f472b6",
      "#22d3ee",
      "#fbbf24",
    ]

    // Initialize the fluid simulation
    fluidRef.current = new WebGLFluidEnhanced(containerRef.current)

    // Configure the simulation based on theme
    fluidRef.current.setConfig({
      simResolution: 128,
      dyeResolution: 768,

      densityDissipation: 0.985,
      velocityDissipation: 0.992,
      pressure: 0.9,
      pressureIterations: 14,

      curl: 1.35, // کمی بیشتر برای بازی رنگ و حرکت
      splatRadius: 0.12,
      splatForce: 2600, // یه ذره بیشتر، ولی هنوز امن از blowout

      shading: true,

      colorful: true, // ✅ تنوع رنگی برمی‌گرده
      colorUpdateSpeed: 5, // آرام‌تر از 8، شیک‌تر از حالت neon

      colorPalette: theme === "light" ? lightModePalette : darkModePalette,

      hover: true,

      transparent: true,
      backgroundColor: theme === "light" ? "#ffffff" : "#000000",
      brightness: theme === "light" ? 0.35 : 0.25,

      bloom: true,
      bloomIterations: 6,
      bloomResolution: 256,
      bloomIntensity: theme === "light" ? 0.28 : 0.38,
      bloomThreshold: 0.78, // ✅ کلید ضد-هاله
      bloomSoftKnee: 0.25,

      sunrays: true,
      sunraysResolution: 196,
      sunraysWeight: 0.22, // کم ولی موجود
    })

    // Start the simulation
    fluidRef.current.start()

    // Generate initial splats
    fluidRef.current.multipleSplats(5)

    // Cleanup on unmount
    return () => {
      if (fluidRef.current) {
        fluidRef.current.stop()
      }
    }
  }, [])

  // Update config when theme changes
  useEffect(() => {
    if (!fluidRef.current) return

    const lightModePalette = [
      "#3b82f6",
      "#8b5cf6",
      "#ec4899",
      "#06b6d4",
      "#f59e0b",
    ]
    const darkModePalette = [
      "#60a5fa",
      "#a78bfa",
      "#f472b6",
      "#22d3ee",
      "#fbbf24",
    ]

    fluidRef.current.setConfig({
      colorPalette: theme === "light" ? lightModePalette : darkModePalette,
      backgroundColor: theme === "light" ? "#ffffff" : "#000000",
      brightness: theme === "light" ? 0.6 : 0.3,
      bloomIntensity: theme === "light" ? 0.6 : 0.8,
    })
  }, [theme])

  return (
    <section
      className="relative h-screen w-screen overflow-hidden bg-white dark:bg-black"
      style={{
        background: theme === "light" ? "#f5f5f5" : "#001",
        position: "relative",
      }}
    >
      {/* WebGL Fluid Container - Behind everything */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 h-full w-full"
        style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
      />

      {/* Content Layout - Text above and below 3D model */}
      <div className="pointer-events-none absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center px-6 sm:px-8 lg:px-12">
        {/* Top Content - Greeting and Name */}
        <div className="mb-8 flex flex-col items-center text-center">
          {/* Greeting */}
          <p className="mb-3 text-lg font-medium text-zinc-600 dark:text-zinc-400">
            {t("greeting")}
          </p>

          {/* Main heading */}
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl md:text-7xl">
            <span className="inline-block animate-fade-in-up">Ali</span>
          </h1>

          {/* Role/Title */}
          <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300 sm:text-3xl md:text-4xl">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              {t("role")}
            </span>
          </h2>
        </div>

        <div className="pointer-events-auto z-20"></div>

        {/* Bottom Content - Description and Buttons */}
        <div className="mt-8 flex flex-col items-center text-center">
          {/* Description */}
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            {t("description")}
          </p>

          {/* Social Links */}
          <div className="pointer-events-auto flex items-center justify-center gap-3 sm:gap-4">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-blue-500/50 hover:bg-blue-50/80 hover:shadow-lg hover:shadow-blue-500/20 dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:hover:border-blue-400/50 dark:hover:bg-blue-950/50 dark:hover:shadow-blue-400/20"
            >
              <svg className="h-5 w-5 text-zinc-600 transition-colors group-hover:text-blue-600 dark:text-zinc-400 dark:group-hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-zinc-700/50 hover:bg-zinc-100/80 hover:shadow-lg hover:shadow-zinc-500/20 dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:hover:border-zinc-500/50 dark:hover:bg-zinc-800/50 dark:hover:shadow-zinc-400/20"
            >
              <svg className="h-5 w-5 text-zinc-600 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-sky-500/50 hover:bg-sky-50/80 hover:shadow-lg hover:shadow-sky-500/20 dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:hover:border-sky-400/50 dark:hover:bg-sky-950/50 dark:hover:shadow-sky-400/20"
            >
              <svg className="h-5 w-5 text-zinc-600 transition-colors group-hover:text-sky-600 dark:text-zinc-400 dark:group-hover:text-sky-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>

            {/* Discord */}
            <a
              href="https://discord.com/users/youruserid"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-indigo-500/50 hover:bg-indigo-50/80 hover:shadow-lg hover:shadow-indigo-500/20 dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:hover:border-indigo-400/50 dark:hover:bg-indigo-950/50 dark:hover:shadow-indigo-400/20"
            >
              <svg className="h-5 w-5 text-zinc-600 transition-colors group-hover:text-indigo-600 dark:text-zinc-400 dark:group-hover:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>

            {/* Phone */}
            <a
              href="tel:+1234567890"
              aria-label="Phone"
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-emerald-500/50 hover:bg-emerald-50/80 hover:shadow-lg hover:shadow-emerald-500/20 dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:hover:border-emerald-400/50 dark:hover:bg-emerald-950/50 dark:hover:shadow-emerald-400/20"
            >
              <svg className="h-5 w-5 text-zinc-600 transition-colors group-hover:text-emerald-600 dark:text-zinc-400 dark:group-hover:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:your.email@example.com"
              aria-label="Email"
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-rose-500/50 hover:bg-rose-50/80 hover:shadow-lg hover:shadow-rose-500/20 dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:hover:border-rose-400/50 dark:hover:bg-rose-950/50 dark:hover:shadow-rose-400/20"
            >
              <svg className="h-5 w-5 text-zinc-600 transition-colors group-hover:text-rose-600 dark:text-zinc-400 dark:group-hover:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="pointer-events-auto absolute bottom-8 left-1/2 z-30 -translate-x-1/2 animate-bounce cursor-pointer transition-transform hover:scale-110"
        aria-label="Scroll to about section"
      >
        <svg
          className="h-6 w-6 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </a>
    </section>
  )
}
