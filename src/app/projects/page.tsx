import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectCard } from "@/components/content-cards";
import { PageFrame } from "@/components/page-frame";
import { getPortfolioContent, getProjects } from "@/lib/content";

export const metadata: Metadata = { title: "Projects", description: "A collection of web design and development work by Golam Mahmud, as it is shared." };

export default async function ProjectsPage() {
  const [{ site, sections }, projects] = await Promise.all([getPortfolioContent(), getProjects()]);
  return <PageFrame site={site} sections={sections}>
    <section className="listing-hero"><div className="container-wide listing-hero-inner">
      <Link className="back-breadcrumb" href="/#projects"><ArrowLeft size={15} aria-hidden="true" /> BACK TO HOME</Link>
      <div className="listing-hero-grid"><div><p className="listing-kicker">PORTFOLIO / SELECTED WORK</p><h1>Work, with<br /><em>intention.</em></h1></div><div className="listing-hero-aside"><span className="listing-count">{String(projects.length).padStart(2, "0")} / PROJECTS</span><p>A home for real projects, the ideas behind them, and the details that make them useful.</p></div></div>
    </div></section>
    <section className="listing-content"><div className="container-wide">
      {projects.length ? <><div className="listing-section-top"><span>THE COLLECTION</span><span>{String(projects.length).padStart(2, "0")} ENTRIES</span></div><div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div></> : <div className="listing-empty" data-reveal><div className="listing-empty-number">00<span>—</span></div><div className="listing-empty-text"><span className="small-label">AN HONEST STARTING POINT</span><h2>The work will<br /><em>speak for itself.</em></h2><p>Project case studies haven’t been published yet. When they are, you’ll find the work and the story behind it right here.</p><Link href="/#about">Get to know me <ArrowUpRight size={17} aria-hidden="true" /></Link></div></div>}
      {site.projectCategories.length > 0 && <div className="listing-categories"><span className="small-label">AREAS OF WORK</span><div>{site.projectCategories.map((category, index) => <span key={`${category}-${index}`}>{String(index + 1).padStart(2, "0")} <strong>{category}</strong></span>)}</div></div>}
    </div></section>
  </PageFrame>;
}
