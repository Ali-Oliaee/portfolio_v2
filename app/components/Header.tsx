"use client"

import { useTranslations } from "../contexts/IntlContext"
import ThemeToggle from "./ThemeToggle"
import LanguageSwitcher from "./LanguageSwitcher"
import { useState, useEffect } from "react"

export default function Header() {
  const t = useTranslations("nav")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    {
      key: "about",
      icon: (size: string) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${size} transition-all duration-500`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      ),
    },
    {
      key: "skills",
      icon: (size: string) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${size} transition-all duration-500`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          />
        </svg>
      ),
    },
    {
      key: "experience",
      icon: (size: string) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${size} transition-all duration-500`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
          />
        </svg>
      ),
    },
    {
      key: "projects",
      icon: (size: string) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${size} transition-all duration-500`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
          />
        </svg>
      ),
    },
    {
      key: "testimonials",
      icon: (size: string) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${size} transition-all duration-500`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
      ),
    },
    {
      key: "contact",
      icon: (size: string) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${size} transition-all duration-500`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      ),
    },
  ]

  return (
    <header
      className={`fixed left-0 right-0 z-50 ${isScrolled ? "top-4 px-6" : "top-0"}`}
      style={{
        transition: "all 0.5s ease-in-out",
      }}
    >
      <div
        className={`mx-auto ${isScrolled ? "max-w-2xl" : "max-w-full"}`}
        style={{
          transition: "max-width 0.5s ease-in-out",
        }}
      >
        <div
          className={`backdrop-blur-xl backdrop-saturate-150 ${
            isScrolled
              ? "border rounded-full border-white/10 bg-white/5 px-6 py-2 dark:border-white/5 dark:bg-black/10"
              : "rounded-none border-b border-white/10 bg-white/5 px-6 py-4 dark:border-white/5 dark:bg-black/10"
          }`}
          style={{
            transition: "all 0.5s ease-in-out",
          }}
        >
          <div className="flex items-center justify-between">
            {/* Left: Avatar and Name */}
            <div
              className={`flex items-center ${isScrolled ? "gap-2" : "gap-3"}`}
            >
              <div
                className={`rounded-full bg-gradient-to-br from-blue-500 to-blue-600 ${
                  isScrolled ? "h-6 w-6" : "h-10 w-10"
                }`}
                style={{
                  transition: "all 0.5s ease-in-out",
                }}
              />
              <span
                className={`font-semibold text-zinc-900 dark:text-zinc-100 ${
                  isScrolled ? "text-sm" : "text-lg"
                }`}
                style={{
                  transition: "all 0.5s ease-in-out",
                }}
              >
                Ali Oliaee
              </span>
            </div>

            {/* Center: Navigation */}
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={`#${item.key}`}
                  className={`flex items-center rounded-lg font-medium text-zinc-700 hover:scale-105 hover:bg-white/40 hover:text-zinc-900 hover:backdrop-blur-sm dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-zinc-100 ${
                    isScrolled
                      ? "gap-0 px-2 py-1 text-xs"
                      : "gap-2 px-4 py-2 text-sm"
                  }`}
                  style={{
                    transition: "all 0.5s ease-in-out",
                  }}
                >
                  {item.icon(isScrolled ? "h-4 w-4" : "h-6 w-6")}
                  <span
                    className={`whitespace-nowrap ${
                      isScrolled
                        ? "max-w-0 translate-x-2 overflow-hidden opacity-0"
                        : "max-w-xs translate-x-0 opacity-100"
                    }`}
                  >
                    {t(item.key)}
                  </span>
                </a>
              ))}
            </nav>

            <div className={`flex items-center ${isScrolled ? "" : "gap-3"}`}>
              <div
                className={`${isScrolled ? "scale-75" : "scale-100"}`}
                style={{
                  transition: "all 0.5s ease-in-out",
                }}
              >
                <LanguageSwitcher />
              </div>

              <div
                className={`${isScrolled ? "scale-75" : "scale-100"}`}
                style={{
                  transition: "all 0.5s ease-in-out",
                }}
              >
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
