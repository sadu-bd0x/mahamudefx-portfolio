import type { Metadata } from "next";
import type { ReactNode } from "react";
import site from "@/content/site.json";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl = configuredUrl && /^https?:\/\//.test(configuredUrl) ? configuredUrl.replace(/\/$/, "") : undefined;

export const metadata: Metadata = {
  title: { default: `${site.name} — Mechanical Engineering & Creative Web`, template: `%s | ${site.name}` },
  description: site.subtitle,
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
  openGraph: {
    title: `${site.name} — Mechanical Engineering & Creative Web`,
    description: site.subtitle,
    type: "website",
    locale: "en_US",
    siteName: site.name,
    ...(siteUrl ? { url: siteUrl, images: [{ url: `${siteUrl}/images/precision-study.svg`, width: 1045, height: 1568, alt: "Precision engineering study" }] } : {}),
  },
  twitter: { card: siteUrl ? "summary_large_image" : "summary", title: site.name, description: site.subtitle },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.nameBengali,
    description: "Diploma in Mechanical Engineering completed; interested in web design and development.",
    knowsAbout: ["Mechanical Engineering", "Web Design", "Web Development"],
    ...(siteUrl ? { url: siteUrl } : {}),
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
