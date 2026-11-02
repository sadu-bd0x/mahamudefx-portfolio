"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { SiteSection } from "@/lib/content";

type JourneyLink = { id: string; label: string };
type Props = { name: string; sections: SiteSection[]; journeyLinks?: JourneyLink[] };

export function SiteHeader({ name, sections, journeyLinks = [] }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const visible = sections.filter((section) => section.visible);
  const links = visible.filter((section) => section.id !== "contact");
  const mobileLinks = visible.flatMap((section) => section.id === "journey" ? [section, ...journeyLinks.map((link) => ({ ...link, sub: true }))] : [section]);
  const showContact = visible.some((section) => section.id === "contact");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="header-inner container-wide">
        <Link className="brand" href="/#top" aria-label={`${name}, back to home`} onClick={() => setOpen(false)}>
          <span className="brand-symbol" aria-hidden="true">G<span className="brand-symbol-slash">/</span>M<span className="brand-dot">.</span></span>
          <span className="brand-name">GOLAM<br />MAHMUD</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((section) => <Link key={section.id} href={`/#${section.id}`}>{section.label}</Link>)}
        </nav>
        <div className="header-actions">
          {showContact && <Link className="header-contact" href="/#contact">Let’s talk <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" /></Link>}
          <button
            ref={menuButton}
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X size={23} strokeWidth={1.6} aria-hidden="true" /> : <Menu size={23} strokeWidth={1.6} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-navigation" className={`mobile-navigation ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation" inert={!open}>
          <span className="mobile-nav-label">FIND YOUR WAY</span>
          {mobileLinks.map((section, index) => (
            <Link
              key={section.id}
              className={"sub" in section ? "mobile-nav-sub" : undefined}
              style={{ transitionDelay: `${Math.min(index * 34, 240)}ms` }}
              ref={index === 0 ? firstLink : undefined}
              href={`/#${section.id}`}
              onClick={() => setOpen(false)}
            >
              <span className="mobile-nav-number">{"sub" in section ? "—" : String(index + 1).padStart(2, "0")}</span>
              <span>{section.label}</span>
              <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          ))}
          <div className="mobile-nav-bottom">ENGINEERING × CREATIVITY</div>
        </nav>
      </div>
    </header>
  );
}
