import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Code2, GraduationCap,
  Layers2, MonitorSmartphone, MousePointer2, PanelsTopLeft, PenLine,
  ShoppingBag, Sparkles, UserRound,
} from "lucide-react";
import { BlogCard, ProjectCard } from "@/components/content-cards";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getJourneyNavLinks, getPortfolioContent, getPosts, getProjects, safeEmail, safeHttpUrl, safeImageSrc,
  type BlogPost, type GalleryImage, type JourneyEntry, type Project, type SectionId,
  type Service, type Site, type Skill,
} from "@/lib/content";
import type { ReactNode } from "react";

function Eyebrow({ number, children }: { number: string; children: ReactNode }) {
  return <div className="section-eyebrow"><span>{number}</span><span className="eyebrow-line" /><span>{children}</span></div>;
}

function Hero({ site, contactVisible }: { site: Site; contactVisible: boolean }) {
  const art = safeImageSrc(site.heroImage);
  const exactHeadline = site.headline === "An Engineer’s Mind. A Developer’s Creativity.";
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container-wide hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker"><span className="kicker-square" aria-hidden="true" />{site.eyebrow}</p>
          <h1 id="hero-heading" className="hero-title">
            {exactHeadline ? <><span>An Engineer’s </span><span>Mind. A Developer’s </span><em>Creativity.</em></> : site.headline}
          </h1>
          <p className="hero-description">{site.subtitle}</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/projects">Explore My Work <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></Link>
            {contactVisible && <Link className="button-text" href="/#contact">Get in Touch <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" /></Link>}
          </div>
        </div>
        <div className="hero-art" data-parallax="0.05" aria-label="Editorial study of precision engineering">
          {art ? <Image src={art} alt="Sculptural precision-machined turbine rotor on a stone surface" fill priority sizes="(max-width: 900px) 100vw, 42vw" /> : <div className="hero-art-fallback" aria-hidden="true"><span /><span /><span /><span /></div>}
          <div className="art-topline"><span>FORM / FUNCTION</span><span>FIG. 01</span></div>
          <div className="art-side-label" aria-hidden="true">AN EXERCISE IN PRECISION — 001</div>
          <div className="art-bottomline"><span className="art-cross" aria-hidden="true">✳</span><span>One mind.<br />Two ways of making.</span><span className="art-bottom-arrow" aria-hidden="true">↗</span></div>
        </div>
      </div>
      <div className="container-wide hero-bottom">
        <div><span className="hero-bottom-index">01 — FOUNDATION</span><span>Mechanical engineering</span></div>
        <div><span className="hero-bottom-index">02 — EXPRESSION</span><span>Design & development</span></div>
        <a href="#about" className="hero-scroll"><span>SCROLL TO EXPLORE</span><ArrowDown size={17} strokeWidth={1.6} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

function TechnicalDiagram() {
  return (
    <div className="technical-diagram" data-parallax="0.07" aria-label="Abstract technical drawing representing engineering and creativity" role="img">
      <span className="diagram-orbit diagram-orbit-one" aria-hidden="true" />
      <span className="diagram-orbit diagram-orbit-two" aria-hidden="true" />
      <div className="diagram-top"><span>STUDY / 001</span><span>G—M</span></div>
      <svg viewBox="0 0 400 400" fill="none" aria-hidden="true" focusable="false">
        <circle cx="200" cy="200" r="146" stroke="currentColor" strokeOpacity=".30" strokeWidth="1" />
        <circle cx="200" cy="200" r="112" stroke="currentColor" strokeOpacity=".45" strokeWidth="1" />
        <circle cx="200" cy="200" r="73" stroke="currentColor" strokeOpacity=".7" strokeWidth="1" />
        <circle cx="200" cy="200" r="12" stroke="currentColor" strokeWidth="1.2" />
        <path d="M200 20v360M20 200h360M63 63l274 274M337 63 63 337" stroke="currentColor" strokeOpacity=".18" strokeWidth="1" />
        <path d="M121 121c46-46 112-45 158 0M279 279c-46 46-112 45-158 0" stroke="currentColor" strokeWidth="2" />
        <path d="M200 54v-15M200 361v-15M54 200H39M361 200h-15" stroke="currentColor" strokeWidth="2" />
        <circle cx="200" cy="54" r="3" fill="currentColor" /><circle cx="346" cy="200" r="3" fill="currentColor" />
        <path d="M285 90h60v20M55 290v20h60" stroke="currentColor" strokeOpacity=".55" strokeWidth="1" />
        <text x="286" y="84" fill="currentColor" fontSize="8" letterSpacing="2">IDEA</text>
        <text x="55" y="330" fill="currentColor" fontSize="8" letterSpacing="2">METHOD</text>
      </svg>
      <div className="diagram-bottom"><span>ENGINEERING × CREATIVITY</span><span>360°</span></div>
    </div>
  );
}

function AboutSection({ site }: { site: Site }) {
  const image = safeImageSrc(site.profileImage) || safeImageSrc(site.aboutImage);
  return (
    <section id="about" className="about-section section-space" aria-labelledby="about-heading">
      <div className="container-wide">
        <Eyebrow number="01 / THE PERSON">ABOUT ME</Eyebrow>
        <div className="about-heading-row" data-reveal>
          <h2 id="about-heading" className="section-title about-title">{site.aboutHeading}</h2>
          <p className="about-lead">{site.aboutLead}</p>
        </div>
        <div className="about-body-grid">
          <div className="about-visual" data-reveal>
            {image ? <div className="about-photo"><Image src={image} alt={site.profileImage ? `Portrait of ${site.name}` : `Image selected by ${site.name}`} fill sizes="(max-width: 800px) 100vw, 42vw" /></div> : <TechnicalDiagram />}
            <span className="about-visual-note">THE THINKING BEHIND THE WORK <ArrowDownRight size={17} strokeWidth={1.5} aria-hidden="true" /></span>
          </div>
          <div className="about-text" data-reveal>
            <span className="small-label">A NOTE FROM GOLAM</span>
            {site.aboutParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <div className="about-quote"><span className="quote-mark" aria-hidden="true">“</span><p>{site.aboutQuote}</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection({ site, skills }: { site: Site; skills: Skill[] }) {
  const groups = skills.reduce<Record<string, string[]>>((acc, skill) => {
    const category = skill.category || "Other";
    (acc[category] ||= []).push(skill.name);
    return acc;
  }, {});
  return (
    <section id="skills" className="skills-section section-space" aria-labelledby="skills-heading">
      <div className="container-wide">
        <Eyebrow number="02 / THE TOOLKIT">SKILLS & CAPABILITIES</Eyebrow>
        <div className="skills-intro" data-reveal>
          <h2 id="skills-heading" className="section-title">{site.skillsHeading}</h2>
          <p>No arbitrary percentages. Just the disciplines and tools I keep returning to, connecting and exploring.</p>
        </div>
        {Object.keys(groups).length > 0 ? <div className="skill-groups">
          {Object.entries(groups).map(([category, items], index) => <div className="skill-group" key={category} data-reveal>
            <div className="skill-group-top"><span>0{index + 1}</span><span>{category}</span><span className="skill-group-spark" aria-hidden="true">✳</span></div>
            <div className="skill-tags">{items.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </div>)}
        </div> : <p className="inline-empty">Skills will be added here soon.</p>}
        <div className="skills-footnote"><span>ENGINEERING THINKING</span><span className="skills-footnote-line" /><span>CREATIVE EXECUTION</span></div>
      </div>
    </section>
  );
}

function ProjectsSection({ site, projects }: { site: Site; projects: Project[] }) {
  return (
    <section id="projects" className="projects-section section-space" aria-labelledby="projects-heading">
      <div className="container-wide">
        <Eyebrow number="03 / THE WORK">PROJECTS & PORTFOLIO</Eyebrow>
        <div className="section-heading-split" data-reveal><h2 id="projects-heading" className="section-title">{site.projectsHeading}</h2><Link className="section-inline-link" href="/projects">View all projects <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" /></Link></div>
        {projects.length ? <div className="project-grid">{projects.slice(0, 4).map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div> :
          <div className="projects-empty" data-reveal>
            <div className="projects-empty-copy"><span className="small-label">THE PORTFOLIO / IN PROGRESS</span><h3>Good work takes<br /><em>thoughtful telling.</em></h3><p>A collection of real projects and the thinking behind them will live here as they’re ready to share.</p><Link className="empty-link" href="/projects">Explore the project space <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
            <div className="project-areas"><span className="small-label">AREAS OF WORK</span>{site.projectCategories.map((category, index) => <div key={`${category}-${index}`}><span>0{index + 1}</span><strong>{category}</strong><ArrowUpRight size={16} strokeWidth={1.4} aria-hidden="true" /></div>)}</div>
          </div>}
      </div>
    </section>
  );
}

function JourneyColumn({ id, number, title, entries, emptyText, icon }: { id: string; number: string; title: string; entries: JourneyEntry[]; emptyText: string; icon: ReactNode }) {
  return <div id={id} className="journey-column" data-reveal>
    <div className="journey-column-head"><span>{number} / {title.toUpperCase()}</span>{icon}</div>
    {entries.length ? entries.map((entry, index) => <article className="journey-entry" key={`${entry.title}-${index}`}>
      <h3>{entry.title}</h3>
      {(entry.institution || entry.organization || entry.period) && <p className="journey-meta">{[entry.institution || entry.organization, entry.period].filter(Boolean).join(" · ")}</p>}
      {entry.description && <p className="journey-description">{entry.description}</p>}
    </article>) : <div className="journey-empty"><span className="journey-empty-dash" /><p>{emptyText}</p></div>}
  </div>;
}

function JourneySection({ site, sections, education, experience, achievements }: { site: Site; sections: { showEducation: boolean; showExperience: boolean; showAchievements: boolean }; education: JourneyEntry[]; experience: JourneyEntry[]; achievements: JourneyEntry[] }) {
  return (
    <section id="journey" className="journey-section section-space" aria-labelledby="journey-heading">
      <div className="container-wide">
        <Eyebrow number="04 / THE JOURNEY">EXPERIENCE & EDUCATION</Eyebrow>
        <div className="journey-heading" data-reveal><h2 id="journey-heading" className="section-title">{site.journeyHeading}</h2><p>Every path starts somewhere. Here is the foundation, with more of the story to come.</p></div>
        <div className="journey-grid">
          {sections.showEducation && <JourneyColumn id="education" number="01" title="Education" entries={education} emptyText="Education details will be added here." icon={<GraduationCap size={24} strokeWidth={1.3} aria-hidden="true" />} />}
          {sections.showExperience && <JourneyColumn id="experience" number="02" title="Experience" entries={experience} emptyText="Experience details will appear here when they’re ready to share." icon={<Layers2 size={24} strokeWidth={1.3} aria-hidden="true" />} />}
          {sections.showAchievements && <JourneyColumn id="achievements" number="03" title="Achievements" entries={achievements} emptyText="Milestones and achievements will be shared here in time." icon={<Sparkles size={24} strokeWidth={1.3} aria-hidden="true" />} />}
        </div>
      </div>
    </section>
  );
}

const serviceIcons = { layout: PanelsTopLeft, code: Code2, devices: MonitorSmartphone, pointer: MousePointer2, shop: ShoppingBag, portfolio: UserRound, education: GraduationCap, pen: PenLine };

function ServicesSection({ site, services }: { site: Site; services: Service[] }) {
  return <section id="services" className="services-section section-space" aria-labelledby="services-heading"><div className="container-wide">
    <Eyebrow number="05 / WHAT I DO">SERVICES</Eyebrow>
    <div className="services-heading" data-reveal><h2 id="services-heading" className="section-title">{site.servicesHeading}</h2><p>Different ways to bring thoughtful design and practical functionality together.</p></div>
    {services.length ? <div className="services-grid">{services.map((service, index) => {
      const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] || PanelsTopLeft;
      return <article className="service-card" key={`${service.title}-${index}`} data-reveal><div className="service-card-top"><Icon size={28} strokeWidth={1.25} aria-hidden="true" /><span>{String(index + 1).padStart(2, "0")}</span></div><div><h3>{service.title}</h3><p>{service.description}</p></div><span className="service-card-rule" /></article>;
    })}</div> : <p className="inline-empty">Services will be added here soon.</p>}
  </div></section>;
}

function BlogSection({ site, posts }: { site: Site; posts: BlogPost[] }) {
  return <section id="blog" className="blog-section section-space" aria-labelledby="blog-heading"><div className="container-wide">
    <Eyebrow number="06 / THE JOURNAL">IDEAS & NOTES</Eyebrow>
    <div className="section-heading-split" data-reveal><h2 id="blog-heading" className="section-title">{site.blogHeading}</h2><Link className="section-inline-link" href="/blog">Visit the journal <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" /></Link></div>
    {posts.length ? <div className="blog-grid">{posts.slice(0, 3).map((post, index) => <BlogCard key={post.slug} post={post} index={index} />)}</div> : <div className="blog-empty" data-reveal><div className="blog-empty-ornament" aria-hidden="true">“</div><div><span className="small-label">STORIES STILL TO BE WRITTEN</span><h3>A journal in<br /><em>the making.</em></h3><p>Thoughts on engineering, design, development, and the interesting space between them will appear here.</p></div><Link href="/blog" className="blog-empty-arrow" aria-label="Explore the journal"><ArrowUpRight size={30} strokeWidth={1.25} aria-hidden="true" /></Link></div>}
  </div></section>;
}

function GallerySection({ site, gallery }: { site: Site; gallery: GalleryImage[] }) {
  return <section id="gallery" className="gallery-section section-space" aria-labelledby="gallery-heading"><div className="container-wide">
    <Eyebrow number="07 / THE VISUALS">GALLERY</Eyebrow>
    <div className="gallery-heading" data-reveal><h2 id="gallery-heading" className="section-title">{site.galleryHeading}</h2><p>A place for the details, observations, and images worth keeping.</p></div>
    {gallery.length ? <div className="gallery-grid">{gallery.map((item, index) => {
      const image = safeImageSrc(item.image);
      return image ? <figure key={`${item.image}-${index}`} className="gallery-item" data-reveal data-reveal-delay={String(index * 65)}><div className="gallery-item-image"><Image src={image} alt={item.alt || item.caption || "Gallery image"} fill sizes="(max-width: 700px) 100vw, 33vw" /></div>{item.caption && <figcaption>{item.caption}</figcaption>}</figure> : null;
    })}</div> : <div className="gallery-empty" data-reveal><div className="gallery-empty-art" aria-hidden="true"><span /><span /><span /></div><div><span className="small-label">A SPACE TO COLLECT</span><p>Images and moments will find their home here soon.</p></div><span className="gallery-empty-index">G / 001—∞</span></div>}
  </div></section>;
}

function ContactSection({ site }: { site: Site }) {
  const email = safeEmail(site.email);
  const socialLinks = site.socialLinks.filter((item) => item.label && safeHttpUrl(item.url));
  const phoneLink = site.phone?.replace(/[^\d+]/g, "");
  return <section id="contact" className="contact-section" aria-labelledby="contact-heading"><div className="container-wide">
    <Eyebrow number="08 / THE NEXT STEP">GET IN TOUCH</Eyebrow>
    <div className="contact-grid"><div data-reveal><h2 id="contact-heading">{site.contactHeading}</h2><p>{site.contactDescription}</p></div><div className="contact-orbit" aria-hidden="true"><span /><span /><span /></div></div>
    <div className="contact-action" data-reveal>{email ? <a className="contact-email" href={`mailto:${email}`}>{email}<ArrowUpRight size={35} strokeWidth={1.2} aria-hidden="true" /></a> : <div className="contact-unavailable"><span className="contact-small-square" aria-hidden="true" /><p>Contact details are being added.<br />Please check back soon.</p></div>}</div>
    {(site.phone || site.location || socialLinks.length > 0) && <div className="contact-details">
      {site.phone && phoneLink && <div><span>PHONE</span><a href={`tel:${phoneLink}`}>{site.phone}</a></div>}
      {site.location && <div><span>LOCATION</span><p>{site.location}</p></div>}
      {socialLinks.length > 0 && <div><span>ELSEWHERE</span><div className="contact-socials">{socialLinks.map((item) => <a key={item.url} href={safeHttpUrl(item.url)} target="_blank" rel="noopener noreferrer">{item.label} <ArrowUpRight size={15} aria-hidden="true" /></a>)}</div></div>}
    </div>}
  </div></section>;
}

export default async function HomePage() {
  const [{ site, sections, skills, services, education, experience, achievements, gallery }, projects, posts] = await Promise.all([getPortfolioContent(), getProjects(), getPosts()]);
  const sectionContent: Record<SectionId, ReactNode> = {
    about: <AboutSection site={site} />,
    skills: <SkillsSection site={site} skills={skills} />,
    projects: <ProjectsSection site={site} projects={projects} />,
    journey: <JourneySection site={site} sections={sections} education={education} experience={experience} achievements={achievements} />,
    services: <ServicesSection site={site} services={services} />,
    blog: <BlogSection site={site} posts={posts} />,
    gallery: <GallerySection site={site} gallery={gallery} />,
    contact: <ContactSection site={site} />,
  };
  const journeyLinks = getJourneyNavLinks(sections);
  return <div id="top" className="site-shell">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader name={site.name} sections={sections.sections} journeyLinks={journeyLinks} />
    <main id="main-content">
      <Hero site={site} contactVisible={sections.sections.some((section) => section.id === "contact" && section.visible)} />
      {sections.sections.filter((section) => section.visible).map((section) => <div key={section.id} className="section-wrapper">{sectionContent[section.id]}</div>)}
    </main>
    <SiteFooter site={site} sections={sections.sections} journeyLinks={journeyLinks} />
    <RevealObserver />
  </div>;
}
