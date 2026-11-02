// Sveltia CMS configuration is generated at runtime because this sandbox has no
// GitHub repository or OAuth worker URL to truthfully hardcode into a public file.
// No credential or secret is ever included in this object.
const optional = { required: false };
const published = { name: "published", label: "Published on the website", widget: "boolean", default: false };
const paragraphList = { name: "aboutParagraphs", label: "About paragraphs", widget: "list", field: { name: "paragraph", label: "Paragraph", widget: "text" }, ...optional };

export function getCmsConfig() {
  const repo = process.env.CMS_GITHUB_REPO?.trim();
  const branch = process.env.CMS_GITHUB_BRANCH?.trim();
  const authUrl = process.env.CMS_AUTH_BASE_URL?.trim();
  if (!repo || !/^[\w.-]+\/[\w.-]+$/.test(repo) || !branch || !/^[\w./-]+$/.test(branch) || branch.includes("..") || !authUrl) return null;
  let safeAuthUrl: string;
  try {
    const parsed = new URL(authUrl);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password || parsed.search || parsed.hash) return null;
    safeAuthUrl = parsed.origin + parsed.pathname.replace(/\/$/, "");
  } catch {
    return null;
  }

  return {
    backend: { name: "github", repo, branch, base_url: safeAuthUrl, auth_methods: ["oauth"] },
    media_folder: "public/uploads",
    public_folder: "/uploads",
    media_libraries: { default: { config: { max_file_size: 5242880, slugify_filename: true } } },
    collections: [
      {
        name: "site_content", label: "Site content", files: [
          {
            name: "site", label: "Identity, writing & contact", file: "src/content/site.json",
            fields: [
              { name: "name", label: "English name", widget: "string" },
              { name: "nameBengali", label: "Bengali name", widget: "string" },
              { name: "eyebrow", label: "Hero introduction", widget: "string" },
              { name: "headline", label: "Hero headline", widget: "string" },
              { name: "subtitle", label: "Hero description", widget: "text" },
              { name: "heroImage", label: "Hero engineering artwork", widget: "image", ...optional },
              { name: "profileImage", label: "Real profile photograph (optional)", widget: "image", ...optional, hint: "Leave empty until you upload your own photograph. No portrait is shown by default." },
              { name: "aboutImage", label: "Alternative About image (optional)", widget: "image", ...optional },
              { name: "aboutHeading", label: "About heading", widget: "string" },
              { name: "aboutLead", label: "About introduction", widget: "text" },
              paragraphList,
              { name: "aboutQuote", label: "About closing thought", widget: "string" },
              { name: "skillsHeading", label: "Skills heading", widget: "string" },
              { name: "projectsHeading", label: "Projects heading", widget: "string" },
              { name: "journeyHeading", label: "Journey heading", widget: "string" },
              { name: "servicesHeading", label: "Services heading", widget: "string" },
              { name: "blogHeading", label: "Journal heading", widget: "string" },
              { name: "galleryHeading", label: "Gallery heading", widget: "string" },
              { name: "projectCategories", label: "Project areas shown before case studies are published", widget: "list", field: { name: "category", label: "Area", widget: "string" }, ...optional },
              { name: "contactHeading", label: "Contact heading", widget: "string" },
              { name: "contactDescription", label: "Contact description", widget: "text" },
              { name: "email", label: "Email (shown publicly when entered)", widget: "string", ...optional },
              { name: "phone", label: "Phone (shown publicly when entered)", widget: "string", ...optional },
              { name: "location", label: "Location (shown publicly when entered)", widget: "string", ...optional },
              { name: "socialLinks", label: "Social links", widget: "list", ...optional, fields: [
                { name: "label", label: "Platform name", widget: "string" },
                { name: "url", label: "Full https:// URL", widget: "string" },
              ] },
            ],
          },
          {
            name: "sections", label: "Section order & visibility", file: "src/content/sections.json",
            fields: [
              { name: "sections", label: "Drag to reorder homepage sections", widget: "list", fields: [
                { name: "id", label: "Section", widget: "select", options: ["about", "skills", "projects", "journey", "services", "blog", "gallery", "contact"] },
                { name: "label", label: "Navigation label", widget: "string" },
                { name: "visible", label: "Visible", widget: "boolean", default: true },
              ] },
              { name: "showExperience", label: "Show Experience inside Journey", widget: "boolean", default: true },
              { name: "showEducation", label: "Show Education inside Journey", widget: "boolean", default: true },
              { name: "showAchievements", label: "Show Achievements inside Journey", widget: "boolean", default: true },
            ],
          },
        ],
      },
      {
        name: "skills", label: "Skills", label_singular: "Skill", file: "src/content/skills.json", identifier_field: "name",
        fields: [
          { name: "name", label: "Skill", widget: "string" },
          { name: "category", label: "Category (e.g. Design, Development, Specialties)", widget: "string" },
          published,
        ],
      },
      {
        name: "services", label: "Services", label_singular: "Service", file: "src/content/services.json", identifier_field: "title",
        fields: [
          { name: "title", label: "Service title", widget: "string" },
          { name: "description", label: "Description", widget: "text" },
          { name: "icon", label: "Icon", widget: "select", options: ["layout", "code", "devices", "pointer", "shop", "portfolio", "education", "pen"], default: "layout" },
          published,
        ],
      },
      {
        name: "education", label: "Education", label_singular: "Education entry", file: "src/content/education.json", identifier_field: "title",
        fields: [
          { name: "title", label: "Qualification", widget: "string" },
          { name: "institution", label: "Institution (only if confirmed)", widget: "string", ...optional },
          { name: "period", label: "Dates / period (only if confirmed)", widget: "string", ...optional },
          { name: "description", label: "Status or description", widget: "text", ...optional },
          published,
        ],
      },
      {
        name: "experience", label: "Experience", label_singular: "Experience entry", file: "src/content/experience.json", identifier_field: "title",
        fields: [
          { name: "title", label: "Role or experience title", widget: "string" },
          { name: "organization", label: "Organization (only if confirmed)", widget: "string", ...optional },
          { name: "period", label: "Dates / period (only if confirmed)", widget: "string", ...optional },
          { name: "description", label: "Description", widget: "text", ...optional },
          published,
        ],
      },
      {
        name: "achievements", label: "Achievements", label_singular: "Achievement", file: "src/content/achievements.json", identifier_field: "title",
        fields: [
          { name: "title", label: "Achievement title", widget: "string" },
          { name: "organization", label: "Issuer / organization (only if confirmed)", widget: "string", ...optional },
          { name: "period", label: "Date (only if confirmed)", widget: "string", ...optional },
          { name: "description", label: "Description", widget: "text", ...optional },
          published,
        ],
      },
      {
        name: "gallery", label: "Gallery", label_singular: "Gallery image", file: "src/content/gallery.json", identifier_field: "alt",
        fields: [
          { name: "image", label: "Image", widget: "image" },
          { name: "alt", label: "Image description for accessibility", widget: "string" },
          { name: "caption", label: "Caption", widget: "string", ...optional },
          published,
        ],
      },
      {
        name: "projects", label: "Projects", label_singular: "Project", folder: "src/content/projects", create: true, format: "json", slug: "{{slug}}", sortable_fields: ["order", "title"],
        fields: [
          { name: "title", label: "Project title", widget: "string" },
          { name: "description", label: "Short description", widget: "text" },
          { name: "category", label: "Category", widget: "string" },
          { name: "coverImage", label: "Cover image", widget: "image", ...optional },
          { name: "galleryImages", label: "Project gallery", widget: "list", ...optional, fields: [
            { name: "image", label: "Image", widget: "image" },
            { name: "alt", label: "Image description", widget: "string", ...optional },
            { name: "caption", label: "Caption", widget: "string", ...optional },
          ] },
          { name: "technologies", label: "Technologies", widget: "list", field: { name: "technology", label: "Technology", widget: "string" }, ...optional },
          { name: "liveUrl", label: "Live URL (full https:// URL)", widget: "string", ...optional },
          { name: "sourceUrl", label: "Source URL (optional)", widget: "string", ...optional },
          { name: "body", label: "Project story", widget: "markdown", ...optional },
          { name: "order", label: "Display order (lower number appears first)", widget: "number", value_type: "int", default: 100 },
          published,
        ],
      },
      {
        name: "blog", label: "Journal", label_singular: "Journal post", folder: "src/content/blog", create: true, format: "json", slug: "{{slug}}", sortable_fields: ["date", "title"],
        fields: [
          { name: "title", label: "Post title", widget: "string" },
          { name: "excerpt", label: "Short introduction", widget: "text" },
          { name: "category", label: "Category", widget: "string", ...optional },
          { name: "date", label: "Publish date", widget: "datetime", type: "date", ...optional },
          { name: "coverImage", label: "Cover image", widget: "image", ...optional },
          { name: "body", label: "Article", widget: "markdown" },
          published,
        ],
      },
    ],
  };
}
