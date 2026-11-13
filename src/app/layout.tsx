import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/Reveal";
import { site } from "@/data/projects";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], weight: ["500", "600", "700"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500"] });

const description =
  "Harsh Alambain is an interaction designer and B.Des student at Anant National University, working across physical computing, creative technology, web design and visual identity.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Harsh Alambain — Interaction Designer",
    template: "%s — Harsh Alambain",
  },
  description,
  openGraph: {
    title: "Harsh Alambain — Interaction Designer",
    description,
    url: site.url,
    siteName: "Harsh Alambain",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Harsh Alambain — Interaction Designer", description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${interTight.variable} ${mono.variable} antialiased`}
    >
      <head>
        {/* Runs before paint: marks JS as available and applies the saved or system theme, so there's no flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;d.classList.add('js');var t=null;try{t=localStorage.getItem('theme')}catch(e){}if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark')})()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:text-paper focus:px-3 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-grow">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
