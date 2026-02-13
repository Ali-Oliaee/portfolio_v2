import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "../contexts/ThemeContext"
import LanguageSwitcher from "../components/LanguageSwitcher"
import ThemeToggle from "../components/ThemeToggle"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { localeDirections } from "@/i18n/config"
import { notFound } from "next/navigation"
import { locales } from "@/i18n/config"
import "../globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Welcome to my portfolio",
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Validate that the incoming locale parameter is valid
  if (!locales.includes(locale as "fa" | "en")) {
    notFound()
  }

  const messages = await getMessages()
  const direction = localeDirections[locale as keyof typeof localeDirections]

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const activeTheme = theme || systemTheme;
                if (activeTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <ThemeToggle />
            <LanguageSwitcher />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
