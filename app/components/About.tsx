"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "@/app/contexts/IntlContext"

export default function About() {
  const t = useTranslations("about")
  const sectionRef = useRef<HTMLElement>(null)
  const [typingProgress, setTypingProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate how much of the section is visible
      // Start typing when section enters viewport, complete when fully scrolled through
      const sectionTop = rect.top
      const sectionHeight = rect.height

      // Calculate progress: 0 when section starts entering, 1 when fully scrolled through
      let progress = 0
      if (sectionTop < windowHeight) {
        // Section is visible
        const scrolledIntoView = windowHeight - sectionTop
        const totalScrollDistance = windowHeight + sectionHeight
        progress = Math.min(Math.max(scrolledIntoView / totalScrollDistance, 0), 1)
      }

      setTypingProgress(progress)
    }

    // Initial check
    handleScroll()

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Get full text and calculate how many characters to show
  const fullText = t("fullText")
  const visibleLength = Math.floor(fullText.length * typingProgress)
  const visibleText = fullText.slice(0, visibleLength)

  // Badges data
  const badges = [
    { icon: "💼", label: t("badges.experience"), value: t("badges.experienceValue") },
    { icon: "🚀", label: t("badges.projects"), value: t("badges.projectsValue") },
    { icon: "🏆", label: t("badges.awards"), value: t("badges.awardsValue") },
    { icon: "☕", label: t("badges.coffee"), value: t("badges.coffeeValue") },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-white dark:bg-black"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl md:text-6xl">
            {t("title")}
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
        </div>

        {/* Two-row Layout */}
        <div className="flex flex-col gap-8 lg:gap-10">
          {/* Row 1: Text Section (takes most height) */}
          <div className="relative flex-1 lg:min-h-[60vh]">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-12 lg:p-16">
              <div className="relative">
                {/* Typing Effect Text */}
                <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-xl md:text-2xl">
                  {visibleText}
                  {typingProgress < 1 && (
                    <span className="inline-block h-[1em] w-[2px] animate-pulse bg-blue-600 dark:bg-blue-400" />
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Row 2: Info Section with Badges */}
          <div className="space-y-6">
            {/* Small Description */}
            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
              <h3 className="mb-2 text-lg font-semibold text-black dark:text-white sm:text-xl">
                {t("infoTitle")}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                {t("infoDescription")}
              </p>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:scale-105 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="relative">
                    <div className="mb-3 text-4xl">{badge.icon}</div>
                    <div className="mb-1 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                      {badge.value}
                    </div>
                    <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                      {badge.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
