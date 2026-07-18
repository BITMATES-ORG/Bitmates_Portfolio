import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "AdelereKehinde — Fullstack Developer",
    template: "%s — AdelereKehinde",
  },
  description:
    "Full-stack, mobile, and backend engineer crafting fast, polished products end to end — from database to pixel.",
  openGraph: {
    title: "AdelereKehinde — Fullstack Developer",
    description:
      "Full-stack, mobile, and backend engineer crafting fast, polished products end to end — from database to pixel.",
    type: "website",
    locale: "en_US",
    siteName: "AdelereKehinde",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdelereKehinde — Fullstack Developer",
    description:
      "Full-stack, mobile, and backend engineer crafting fast, polished products end to end — from database to pixel.",
  },
  icons: {
    icon: "/images/portfolio.png",
    apple: "/images/portfolio.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
