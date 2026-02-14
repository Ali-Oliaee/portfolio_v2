"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

const locales = ["en", "fa"]
const defaultLocale = "en"

function getPreferredLocale(): string {
  // Check if we're in the browser
  if (typeof window === "undefined") return defaultLocale

  // Check localStorage for saved preference
  const savedLocale = localStorage.getItem("preferredLocale")
  if (savedLocale && locales.includes(savedLocale)) {
    return savedLocale
  }

  // Check browser language
  const browserLang = navigator.language.split("-")[0]
  if (locales.includes(browserLang)) {
    return browserLang
  }

  return defaultLocale
}

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const locale = getPreferredLocale()
    router.replace(`/${locale}`)
  }, [router])

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div>Redirecting...</div>
    </div>
  )
}
