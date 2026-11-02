import type { ReactNode } from "react";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getJourneyNavLinks, type Sections, type Site } from "@/lib/content";

export function PageFrame({ site, sections, children }: { site: Site; sections: Sections; children: ReactNode }) {
  const journeyLinks = getJourneyNavLinks(sections);
  return <div id="top" className="site-shell">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader name={site.name} sections={sections.sections} journeyLinks={journeyLinks} />
    <main id="main-content">{children}</main>
    <SiteFooter site={site} sections={sections.sections} journeyLinks={journeyLinks} />
    <RevealObserver />
  </div>;
}
