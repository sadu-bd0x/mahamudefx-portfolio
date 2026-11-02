import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.join(process.cwd(), "src", "content");

export type SectionId = "about" | "skills" | "projects" | "journey" | "services" | "blog" | "gallery" | "contact";
export type SiteSection = { id: SectionId; label: string; visible: boolean };
export type SocialLink = { label: string; url: string };
export type Site = {
  name: string;
  nameBengali: string;
  eyebrow: string;
  headline: string;
  subtitle: string;
  heroImage: string;
  profileImage: string;
  aboutImage: string;
  aboutLead: string;
  aboutParagraphs: string[];
  aboutQuote: string;
  aboutHeading: string;
  skillsHeading: string;
  projectsHeading: string;
  journeyHeading: string;
  servicesHeading: string;
  blogHeading: string;
  galleryHeading: string;
  projectCategories: string[];
  contactHeading: string;
  contactDescription: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
};
export type Sections = {
  sections: SiteSection[];
  showExperience: boolean;
  showEducation: boolean;
  showAchievements: boolean;
};
export type Skill = { name: string; category: string; published: boolean };
export type Service = { title: string; description: string; icon: string; published: boolean };
export type JourneyEntry = {
  title: string;
  institution?: string;
  organization?: string;
  period?: string;
  description?: string;
  published: boolean;
};
export type GalleryImage = { image: string; alt: string; caption?: string; published: boolean };
export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  coverImage?: string;
  galleryImages?: { image: string; alt?: string; caption?: string }[];
  technologies?: string[];
  liveUrl?: string;
  sourceUrl?: string;
  body?: string;
  order?: number;
  published: boolean;
};
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category?: string;
  date?: string;
  coverImage?: string;
  body?: string;
  published: boolean;
};

const fallbackSite: Site = {
  name: "Golam Mahmud",
  nameBengali: "গোলাম মাহমুদ",
  eyebrow: "Mechanical engineer by training · Creative developer by curiosity",
  headline: "An Engineer’s Mind. A Developer’s Creativity.",
  subtitle: "I’m Golam Mahmud, a Diploma Mechanical Engineer with a passion for web design and development.",
  heroImage: "/images/precision-study.svg",
  profileImage: "",
  aboutImage: "",
  aboutLead: "Engineering is how I think. Creativity is how I explore what’s possible.",
  aboutParagraphs: [],
  aboutQuote: "Thoughtful by design. Practical by nature.",
  aboutHeading: "About me.",
  skillsHeading: "A practice shaped by both sides.",
  projectsHeading: "Selected work.",
  journeyHeading: "Always building on the foundation.",
  servicesHeading: "Ideas, shaped into experiences.",
  blogHeading: "Notes from the process.",
  galleryHeading: "Collected moments.",
  projectCategories: [],
  contactHeading: "Let’s make something thoughtful.",
  contactDescription: "Contact details will be added here soon.",
  email: "",
  phone: "",
  location: "",
  socialLinks: [],
};
const fallbackSections: Sections = {
  sections: [
    "about", "skills", "projects", "journey", "services", "blog", "gallery", "contact",
  ].map((id) => ({ id: id as SectionId, label: id[0].toUpperCase() + id.slice(1), visible: true })),
  showExperience: true,
  showEducation: true,
  showAchievements: true,
};

async function readJson<T>(filename: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(path.join(root, filename), "utf8")) as T;
  } catch (error) {
    console.error(`Unable to read portfolio content: ${filename}`, error);
    return fallback;
  }
}

export async function getPortfolioContent() {
  const [rawSite, rawSections, rawSkills, rawServices, rawEducation, rawExperience, rawAchievements, rawGallery] = await Promise.all([
    readJson<Site>("site.json", fallbackSite),
    readJson<Sections>("sections.json", fallbackSections),
    readJson<Skill[]>("skills.json", []),
    readJson<Service[]>("services.json", []),
    readJson<JourneyEntry[]>("education.json", []),
    readJson<JourneyEntry[]>("experience.json", []),
    readJson<JourneyEntry[]>("achievements.json", []),
    readJson<GalleryImage[]>("gallery.json", []),
  ]);

  const site: Site = {
    ...fallbackSite,
    ...rawSite,
    aboutParagraphs: Array.isArray(rawSite.aboutParagraphs) ? rawSite.aboutParagraphs : [],
    projectCategories: Array.isArray(rawSite.projectCategories) ? rawSite.projectCategories : [],
    socialLinks: Array.isArray(rawSite.socialLinks) ? rawSite.socialLinks : [],
  };
  const sections: Sections = {
    ...fallbackSections,
    ...rawSections,
    sections: Array.isArray(rawSections.sections) ? rawSections.sections : fallbackSections.sections,
  };
  return {
    site,
    sections,
    skills: Array.isArray(rawSkills) ? rawSkills.filter((item) => item.published && item.name) : [],
    services: Array.isArray(rawServices) ? rawServices.filter((item) => item.published && item.title) : [],
    education: Array.isArray(rawEducation) ? rawEducation.filter((item) => item.published && item.title) : [],
    experience: Array.isArray(rawExperience) ? rawExperience.filter((item) => item.published && item.title) : [],
    achievements: Array.isArray(rawAchievements) ? rawAchievements.filter((item) => item.published && item.title) : [],
    gallery: Array.isArray(rawGallery) ? rawGallery.filter((item) => item.published && item.image) : [],
  };
}

async function readEntries<T extends { published: boolean; title: string }>(folder: string): Promise<(T & { slug: string })[]> {
  try {
    const files = (await readdir(path.join(root, folder))).filter((file) => /^[a-z0-9][a-z0-9-]*\.json$/.test(file));
    const entries = await Promise.all(files.map(async (file) => {
      try {
        const entry = JSON.parse(await readFile(path.join(root, folder, file), "utf8")) as T;
        return { ...entry, slug: file.slice(0, -5) };
      } catch (error) {
        console.error(`Unable to read ${folder}/${file}`, error);
        return null;
      }
    }));
    return entries.filter((entry) => entry !== null && entry.published && Boolean(entry.title)) as (T & { slug: string })[];
  } catch (error) {
    console.error(`Unable to list portfolio content: ${folder}`, error);
    return [];
  }
}

export async function getProjects(): Promise<Project[]> {
  const projects = await readEntries<Omit<Project, "slug">>("projects");
  return projects.sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title));
}

export async function getPosts(): Promise<BlogPost[]> {
  const posts = await readEntries<Omit<BlogPost, "slug">>("blog");
  return posts.sort((a, b) => (b.date || "").localeCompare(a.date || "") || a.title.localeCompare(b.title));
}

export function getJourneyNavLinks(settings: Sections) {
  if (!settings.sections.some((section) => section.id === "journey" && section.visible)) return [];
  return [
    { id: "experience", label: "Experience", visible: settings.showExperience },
    { id: "education", label: "Education", visible: settings.showEducation },
    { id: "achievements", label: "Achievements", visible: settings.showAchievements },
  ].filter((item) => item.visible);
}

export function safeHttpUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function safeImageSrc(value?: string): string | undefined {
  if (!value || !/^\/(uploads|images)\/[a-zA-Z0-9_./-]+$/.test(value) || value.includes("..")) return undefined;
  return value;
}

export function safeEmail(value?: string): string | undefined {
  return value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : undefined;
}

export function formatDate(value?: string): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(date);
}
