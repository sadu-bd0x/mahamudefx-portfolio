import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { PageFrame } from "@/components/page-frame";
import { getPortfolioContent, getProjects, safeHttpUrl, safeImageSrc } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  // Next.js static export rejects an empty params array. This unlinked path
  // renders notFound(), never a fictional project, until one is published.
  if (!projects.length && process.env.PORTFOLIO_STATIC_EXPORT === "1") return [{ slug: "__unpublished__" }];
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = (await getProjects()).find((entry) => entry.slug === slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.description || `A project by Golam Mahmud.`, openGraph: safeImageSrc(project.coverImage) ? { images: [safeImageSrc(project.coverImage)!] } : undefined };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const [projects, { site, sections }] = await Promise.all([getProjects(), getPortfolioContent()]);
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  const cover = safeImageSrc(project.coverImage);
  const liveUrl = safeHttpUrl(project.liveUrl);
  const sourceUrl = safeHttpUrl(project.sourceUrl);
  const otherProjects = projects.filter((entry) => entry.slug !== slug).slice(0, 2);
  return <PageFrame site={site} sections={sections}>
    <article>
      <header className="detail-hero"><div className="container-wide">
        <Link className="back-breadcrumb" href="/projects"><ArrowLeft size={15} aria-hidden="true" /> ALL PROJECTS</Link>
        <p className="listing-kicker">PROJECT / {project.category || "WEB"}</p>
        <h1>{project.title}</h1>
        {project.description && <p className="detail-subtitle">{project.description}</p>}
        <div className="detail-hero-bottom"><span>GOLAM MAHMUD / PORTFOLIO</span><span>{project.category || "PROJECT"}</span></div>
      </div></header>
      {cover && <div className="container-wide detail-cover"><Image src={cover} alt={project.title} fill priority sizes="(max-width: 900px) 100vw, 90vw" /></div>}
      <div className="container-wide detail-layout"><aside className="detail-aside"><span className="small-label">PROJECT DETAILS</span>{project.category && <div><span>CATEGORY</span><strong>{project.category}</strong></div>}{(project.technologies?.length || 0) > 0 && <div><span>TOOLS & TECHNOLOGIES</span><div className="detail-tech">{project.technologies!.map((tech) => <strong key={tech}>{tech}</strong>)}</div></div>}{(liveUrl || sourceUrl) && <div className="detail-links"><span>EXPLORE</span>{liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer">Visit live site <ArrowUpRight size={16} aria-hidden="true" /></a>}{sourceUrl && <a href={sourceUrl} target="_blank" rel="noopener noreferrer">View source <ArrowUpRight size={16} aria-hidden="true" /></a>}</div>}</aside>
        <div className="detail-story"><span className="small-label">THE STORY</span>{project.body ? <div className="prose-content"><ReactMarkdown>{project.body}</ReactMarkdown></div> : <p className="detail-no-story">More about this project will be added soon.</p>}</div>
      </div>
      {(project.galleryImages || []).filter((item) => safeImageSrc(item.image)).length > 0 && <div className="container-wide detail-gallery">{project.galleryImages!.filter((item) => safeImageSrc(item.image)).map((item, index) => <figure key={`${item.image}-${index}`}><div><Image src={safeImageSrc(item.image)!} alt={item.alt || item.caption || `${project.title} image ${index + 1}`} fill sizes="(max-width: 800px) 100vw, 45vw" /></div>{item.caption && <figcaption>{item.caption}</figcaption>}</figure>)}</div>}
    </article>
    <section className="detail-next"><div className="container-wide"><span className="small-label">KEEP EXPLORING</span><h2>There’s more to<br /><em>the story.</em></h2><Link href="/projects">Back to all projects <ArrowUpRight size={19} aria-hidden="true" /></Link>{otherProjects.length > 0 && <div className="detail-related">{otherProjects.map((entry) => <Link key={entry.slug} href={`/projects/${entry.slug}`}>{entry.title} <ArrowUpRight size={18} aria-hidden="true" /></Link>)}</div>}</div></section>
  </PageFrame>;
}
