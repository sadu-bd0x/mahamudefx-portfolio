import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate, safeImageSrc, type BlogPost, type Project } from "@/lib/content";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const image = safeImageSrc(project.coverImage);
  return (
    <Link className="project-card" href={`/projects/${project.slug}`} data-reveal data-reveal-delay={String(index * 70)}>
      <div className={`project-card-image ${image ? "" : "project-card-image--empty"}`}>
        {image ? <Image src={image} alt={project.title} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 42vw" /> : <div className="project-card-placeholder" aria-hidden="true"><span>G/M</span><i /><i /></div>}
        <span className="project-card-corner"><ArrowUpRight size={20} strokeWidth={1.6} aria-hidden="true" /></span>
      </div>
      <div className="project-card-meta"><span>{String(index + 1).padStart(2, "0")} / {project.category || "Project"}</span><span>VIEW PROJECT</span></div>
      <h3>{project.title}</h3>
      {project.description && <p>{project.description}</p>}
    </Link>
  );
}

export function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const image = safeImageSrc(post.coverImage);
  const date = formatDate(post.date);
  return (
    <Link className="blog-card" href={`/blog/${post.slug}`} data-reveal data-reveal-delay={String(index * 75)}>
      <div className={`blog-card-image ${image ? "" : "blog-card-image--empty"}`}>
        {image ? <Image src={image} alt={post.title} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 30vw" /> : <span aria-hidden="true">0{index + 1}</span>}
      </div>
      <div className="blog-card-meta"><span>{post.category || "Journal"}{date ? ` · ${date}` : ""}</span><ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" /></div>
      <h3>{post.title}</h3>
      {post.excerpt && <p>{post.excerpt}</p>}
    </Link>
  );
}
