import Link from "next/link";
import { Fragment } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { safeEmail, safeHttpUrl, type Site, type SiteSection } from "@/lib/content";

type Props = { site: Site; sections: SiteSection[]; journeyLinks?: { id: string; label: string }[] };

export function SiteFooter({ site, sections, journeyLinks = [] }: Props) {
  const visible = sections.filter((section) => section.visible);
  const socials = site.socialLinks.filter((item) => safeHttpUrl(item.url) && item.label);
  const email = safeEmail(site.email);

  return (
    <footer className="site-footer">
      <div className="container-wide footer-main">
        <div className="footer-identity">
          <Link className="footer-brand" href="/#top" aria-label={`${site.name}, back to home`}>G<span className="footer-brand-mark">/</span>M<span className="footer-brand-period">.</span></Link>
          <p>Built with an engineer’s attention<br />and a creator’s curiosity.</p>
          <span lang="bn" className="footer-bengali">{site.nameBengali}</span>
        </div>
        <div className="footer-column">
          <p className="footer-label">EXPLORE</p>
          {visible.map((section) => <Fragment key={section.id}>
            <Link href={`/#${section.id}`}>{section.label}</Link>
            {section.id === "journey" && journeyLinks.map((item) => <Link className="footer-sub-link" key={item.id} href={`/#${item.id}`}>{item.label}</Link>)}
          </Fragment>)}
          <Link href="/projects">Project archive</Link>
          <Link href="/blog">All articles</Link>
        </div>
        <div className="footer-column">
          <p className="footer-label">CONNECT</p>
          {socials.map((item) => <a key={item.url} href={safeHttpUrl(item.url)} target="_blank" rel="noopener noreferrer">{item.label} <ArrowUpRight size={14} aria-hidden="true" /></a>)}
          {email && <a href={`mailto:${email}`}>{email} <ArrowUpRight size={14} aria-hidden="true" /></a>}
          {!email && socials.length === 0 && <span className="footer-muted">Contact details coming soon.</span>}
        </div>
        <a className="back-top" href="#top" aria-label="Back to top"><ArrowUp size={19} strokeWidth={1.7} aria-hidden="true" /></a>
      </div>
      <div className="container-wide footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span>FORM. FUNCTION. FEEL.</span>
      </div>
    </footer>
  );
}
