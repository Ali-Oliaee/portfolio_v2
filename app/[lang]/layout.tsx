import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "../contexts/ThemeContext"
import { IntlProvider } from "../contexts/IntlContext"
import { notFound } from "next/navigation"
import { locales, localeDirections, type Locale } from "./config"
import { getDictionary, hasLocale } from "./dictionaries"
import Header from "../components/Header"
import { getMetadataByLocale, siteConfig } from "../config/seo"
import "../globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  
  if (!hasLocale(lang)) {
    return getMetadataByLocale("en")
  }
  
  return getMetadataByLocale(lang as Locale)
}

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params

  // Validate that the incoming lang parameter is valid
  if (!hasLocale(lang)) {
    notFound()
  }

  const messages = await getDictionary(lang)
  const direction = localeDirections[lang]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/avatar.png`,
    jobTitle: lang === "en" ? "Full Stack Developer" : "توسعه‌دهنده فول‌استک",
    description: siteConfig.description[lang],
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
    ],
    knowsAbout: [
      "Web Development",
      "Full Stack Development",
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Node.js",
    ],
  };

  return (
    <html lang={lang} dir={direction} suppressHydrationWarning>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <IntlProvider messages={messages}>
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
        </IntlProvider>
      </body>
    </html>
  )
}
