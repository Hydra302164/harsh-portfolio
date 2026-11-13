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
  "Harsh Alambain is an interaction designer and B.Des Interaction & Communication Design student at Anant National University, Ahmedabad. Portfolio of physical computing, creative coding, web design and visual identity work.";

// Accepts either the bare code or the full <meta ... content="CODE" /> tag pasted from Search Console.
const rawVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim() ?? "";
const googleVerification = rawVerification.match(/content=["']([^"']+)["']/)?.[1] ?? rawVerification;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Harsh Alambain | Interaction Designer & Web Designer",
    template: "%s | Harsh Alambain",
  },
  description,
  applicationName: "Harsh Alambain",
  authors: [{ name: "Harsh Alambain", url: site.url }],
  creator: "Harsh Alambain",
  keywords: [
    "Harsh Alambain",
    "Alambain",
    "Harsh Alambain portfolio",
    "Harsh Alambain designer",
    "interaction designer",
    "Anant National University",
    "web designer Ahmedabad",
    "web designer Jaipur",
    "creative technology",
  ],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  verification: googleVerification ? { google: googleVerification } : undefined,
  openGraph: {
    title: "Harsh Alambain | Interaction Designer",
    description,
    url: site.url,
    siteName: "Harsh Alambain",
    locale: "en_IN",
    type: "profile",
    firstName: "Harsh",
    lastName: "Alambain",
  },
  twitter: { card: "summary_large_image", title: "Harsh Alambain | Interaction Designer", description },
};

/** Tells search engines this site is the official home of the person "Harsh Alambain". */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: "Harsh Alambain",
      alternateName: ["Alambain", "Harsh A"],
      givenName: "Harsh",
      familyName: "Alambain",
      url: site.url,
      image: `${site.url}/opengraph-image`,
      email: `mailto:${site.email}`,
      jobTitle: "Interaction Designer",
      description,
      address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "Gujarat", addressCountry: "IN" },
      homeLocation: { "@type": "Place", name: "Jaipur, Rajasthan, India" },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Anant National University" },
        { "@type": "HighSchool", name: "Bhartiya Vidya Bhavan Vidyashram, Jaipur" },
      ],
      knowsAbout: [
        "Interaction design",
        "Physical computing",
        "Creative coding",
        "Web design",
        "Visual identity",
        "TouchDesigner",
        "Projection mapping",
      ],
      sameAs: [site.linkedin, site.instagram],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: "Harsh Alambain",
      alternateName: "Harsh Alambain Portfolio",
      inLanguage: "en-IN",
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: site.url,
      name: "Harsh Alambain | Interaction Designer",
      mainEntity: { "@id": `${site.url}/#person` },
      isPartOf: { "@id": `${site.url}/#website` },
    },
  ],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
