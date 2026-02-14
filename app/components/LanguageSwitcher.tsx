"use client"

import { useParams, usePathname, useRouter } from "next/navigation"
import { locales, localeNames, type Locale } from "@/app/[lang]/config"
import { useState, useRef, useEffect } from "react"

export default function LanguageSwitcher() {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = (params.lang as Locale) || "en"

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLangChange = (newLang: Locale) => {
    // Replace the current lang in the pathname
    const segments = pathname.split("/")
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLang
    } else {
      segments.splice(1, 0, newLang)
    }

    router.push(segments.join("/"))
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/20 px-4 backdrop-blur-sm transition-all hover:bg-white/30 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20 cursor-pointer"
        aria-label="Change language"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5 text-zinc-800 dark:text-zinc-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
          />
        </svg>
        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
          {localeNames[currentLang]}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 end-0 rounded-lg border border-white/20 bg-white/80 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/80 overflow-hidden">
          {locales.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLangChange(lang)}
              className={`block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer ${
                currentLang === lang
                  ? "bg-zinc-50 text-zinc-900 font-medium dark:bg-zinc-800 dark:text-zinc-50"
                  : "text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {localeNames[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
