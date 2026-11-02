import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BlogCard } from "@/components/content-cards";
import { PageFrame } from "@/components/page-frame";
import { getPortfolioContent, getPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Journal", description: "Thoughts on engineering, design, development, and the space between them from Golam Mahmud." };

export default async function BlogPage() {
  const [{ site, sections }, posts] = await Promise.all([getPortfolioContent(), getPosts()]);
  return <PageFrame site={site} sections={sections}>
    <section className="listing-hero listing-hero--journal"><div className="container-wide listing-hero-inner">
      <Link className="back-breadcrumb" href="/#blog"><ArrowLeft size={15} aria-hidden="true" /> BACK TO HOME</Link>
      <div className="listing-hero-grid"><div><p className="listing-kicker">JOURNAL / IDEAS & NOTES</p><h1>Room to<br /><em>think aloud.</em></h1></div><div className="listing-hero-aside"><span className="listing-count">{String(posts.length).padStart(2, "0")} / NOTES</span><p>Reflections on making things, learning things, and seeing the world through two different lenses.</p></div></div>
    </div></section>
    <section className="listing-content"><div className="container-wide">
      {posts.length ? <><div className="listing-section-top"><span>ALL NOTES</span><span>{String(posts.length).padStart(2, "0")} ENTRIES</span></div><div className="blog-grid">{posts.map((post, index) => <BlogCard key={post.slug} post={post} index={index} />)}</div></> : <div className="listing-empty listing-empty--journal" data-reveal><div className="listing-empty-number">“</div><div className="listing-empty-text"><span className="small-label">A JOURNAL IN THE MAKING</span><h2>The first page<br /><em>is still blank.</em></h2><p>No articles have been published yet. Notes on engineering, design, and digital making will appear here when they’re ready.</p><Link href="/#about">Explore the portfolio <ArrowUpRight size={17} aria-hidden="true" /></Link></div></div>}
    </div></section>
  </PageFrame>;
}
