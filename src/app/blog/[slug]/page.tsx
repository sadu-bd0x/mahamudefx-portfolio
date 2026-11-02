import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { PageFrame } from "@/components/page-frame";
import { formatDate, getPortfolioContent, getPosts, safeImageSrc } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  // Next.js static export rejects an empty params array. This unlinked path
  // renders notFound(), never a fictional article, until one is published.
  if (!posts.length && process.env.PORTFOLIO_STATIC_EXPORT === "1") return [{ slug: "__unpublished__" }];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPosts()).find((entry) => entry.slug === slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt || `A journal entry by Golam Mahmud.`, openGraph: safeImageSrc(post.coverImage) ? { images: [safeImageSrc(post.coverImage)!] } : undefined };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const [posts, { site, sections }] = await Promise.all([getPosts(), getPortfolioContent()]);
  const post = posts.find((entry) => entry.slug === slug);
  if (!post) notFound();
  const cover = safeImageSrc(post.coverImage);
  const date = formatDate(post.date);
  return <PageFrame site={site} sections={sections}>
    <article className="article-page"><header className="detail-hero detail-hero--article"><div className="container-wide">
      <Link className="back-breadcrumb" href="/blog"><ArrowLeft size={15} aria-hidden="true" /> ALL NOTES</Link>
      <p className="listing-kicker">JOURNAL {post.category ? `/ ${post.category.toUpperCase()}` : ""}</p>
      <h1>{post.title}</h1>
      {post.excerpt && <p className="detail-subtitle">{post.excerpt}</p>}
      <div className="detail-hero-bottom"><span>BY {site.name.toUpperCase()}</span>{date && <span>{date.toUpperCase()}</span>}</div>
    </div></header>
    {cover && <div className="container-wide detail-cover"><Image src={cover} alt={post.title} fill priority sizes="(max-width: 900px) 100vw, 90vw" /></div>}
    <div className="container-wide article-layout"><aside className="article-aside"><span className="small-label">WORDS & IDEAS</span><span>{post.category || "Journal"}</span>{date && <span>{date}</span>}</aside><div className="article-body">{post.body ? <div className="prose-content"><ReactMarkdown>{post.body}</ReactMarkdown></div> : <p className="detail-no-story">The full story will be added soon.</p>}</div></div>
    </article>
    <section className="detail-next"><div className="container-wide"><span className="small-label">KEEP READING</span><h2>More thoughts<br /><em>to come.</em></h2><Link href="/blog">Back to the journal <ArrowUpRight size={19} aria-hidden="true" /></Link></div></section>
  </PageFrame>;
}
