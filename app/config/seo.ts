export const siteConfig = {
  name: "Ali Oliaee",
  url: "https://alioliaee.com", // Update with your actual domain
  description: {
    en: "Full-stack developer and software engineer specializing in web development, React, Next.js, and modern web technologies. Portfolio showcasing projects, skills, and experience.",
    fa: "توسعه‌دهنده فول‌استک و مهندس نرم‌افزار متخصص در توسعه وب، React، Next.js و تکنولوژی‌های مدرن وب. نمونه‌کارها، مهارت‌ها و تجربیات.",
  },
  keywords: [
    "Ali Oliaee",
    "Full Stack Developer",
    "Software Engineer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Frontend Developer",
    "Backend Developer",
    "Portfolio",
    "JavaScript",
    "TypeScript",
    "Node.js",
  ],
  author: {
    name: "Ali Oliaee",
    email: "alioliaee31@gmail.com",
    url: "https://alioliaee.ir",
  },
  creator: "Ali Oliaee",
  publisher: "Ali Oliaee",
  social: {
    twitter: "@pgallaf",
    github: "https://github.com/Ali-Oliaee",
    linkedin: "https://linkedin.com/in/alioliaee",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "fa_IR",
    siteName: "Ali Oliaee - Portfolio",
    images: [
      {
        url: "/avatar.png",
        width: 800,
        height: 800,
        alt: "Ali Oliaee",
      },
    ],
  },
}

export const getMetadataByLocale = (locale: "en" | "fa") => {
  const isEnglish = locale === "en"

  return {
    title: {
      default: `${siteConfig.name} | ${isEnglish ? "Full Stack Developer" : "توسعه‌دهنده فول‌استک"}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description[locale],
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fa: "/fa",
        "x-default": "/en",
      },
    },
    openGraph: {
      title: `${siteConfig.name} | ${isEnglish ? "Full Stack Developer" : "توسعه‌دهنده فول‌استک"}`,
      description: siteConfig.description[locale],
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.openGraph.siteName,
      images: siteConfig.openGraph.images,
      locale: isEnglish ? "en_US" : "fa_IR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} | ${isEnglish ? "Full Stack Developer" : "توسعه‌دهنده فول‌استک"}`,
      description: siteConfig.description[locale],
      creator: siteConfig.social.twitter,
      images: ["/avatar.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/avatar.png",
    },
    manifest: "/manifest.json",
  }
}
