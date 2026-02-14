"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "@/app/contexts/IntlContext"
import WebGLFluidEnhanced from "webgl-fluid-enhanced"
import { useTheme } from "../contexts/ThemeContext"
import dynamic from "next/dynamic"

// Dynamically import the 3D model component (client-side only)
const Model3D = dynamic(() => import("./Model3D"), { ssr: false })

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
      dyeResolution: 1024,
      densityDissipation: 0.98,
      velocityDissipation: 0.99,
      pressure: 0.8,
      pressureIterations: 10,
      curl: 3,
      splatRadius: 0.25,
      splatForce: 6000,
      shading: true,
      colorful: true,
      colorUpdateSpeed: 8,
      colorPalette: theme === "light" ? lightModePalette : darkModePalette,
      hover: true,
      backgroundColor: theme === "light" ? "#ffffff" : "#000000",
      transparent: false,
      brightness: theme === "light" ? 0.6 : 0.3,
      bloom: true,
      bloomIterations: 8,
      bloomResolution: 256,
      bloomIntensity: theme === "light" ? 0.6 : 0.8,
      bloomThreshold: 0.6,
      bloomSoftKnee: 0.7,
      sunrays: true,
      sunraysResolution: 196,
      sunraysWeight: 1.0,
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
    <section className="relative h-screen w-screen overflow-hidden bg-white dark:bg-black">
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

        {/* 3D Model - Center */}
        <div className="pointer-events-auto z-20">
          <Model3D />
        </div>

        {/* Bottom Content - Description and Buttons */}
        <div className="mt-8 flex flex-col items-center text-center">
          {/* Description */}
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            {t("description")}
          </p>

          {/* CTA Buttons */}
          <div className="pointer-events-auto flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group relative overflow-hidden rounded-full bg-black px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-lg dark:bg-white dark:text-black">
              <span className="relative z-10">{t("viewWork")}</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>

            <button className="rounded-full border-2 border-zinc-300 bg-transparent px-8 py-4 text-base font-semibold text-black transition-all hover:scale-105 hover:border-black hover:bg-black hover:text-white dark:border-zinc-700 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black">
              {t("contact")}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-30 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-zinc-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}
