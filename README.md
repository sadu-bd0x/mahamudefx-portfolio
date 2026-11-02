# Golam Mahmud — Portfolio

A responsive, content-first portfolio for Golam Mahmud. Built with Next.js App Router, local fonts, and a GitHub-backed Sveltia CMS editor. The public pages are statically generated from repository content and can be deployed to Cloudflare Pages without a runtime database or paid service.

The site intentionally contains **no invented project, job, award, blog post, photo, email, phone number, location, or social profile**. The hero artwork is an included, locally stored engineering still life (SVG), not a portrait. A real portrait can be uploaded later.

## Run and review

```sh
npm install
npm run dev
```

Visit the home page, `/projects`, `/blog`, and `/admin/index.html`. Until a real repository and OAuth worker are configured, `/admin` shows a setup screen rather than a broken or insecure login.

For a production Node deployment, `npm run build` creates the normal Next.js build. `/api/health` returns a static health response. The original starter database files are kept, but the portfolio does not need PostgreSQL because content is versioned in Git.

## One-time CMS setup

**This sandbox has no `.git` metadata, GitHub remote, production branch, or OAuth worker. These values cannot be truthfully filled in or tested here.**

1. Put this project in **Golam's actual GitHub repository**. Confirm the exact `owner/repository` and the branch used for production. Give the editor's GitHub account write access. With Sveltia's simple workflow, the account must be able to push to that branch.
2. Deploy the official [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth) to Cloudflare Workers (free tier). Create a GitHub OAuth App whose callback URL is `https://YOUR-WORKER.workers.dev/callback`. Configure `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, and `ALLOWED_DOMAINS` **as Worker secrets/settings**, following the authenticator's README. Include the actual Pages preview hostname in `ALLOWED_DOMAINS` if editing on that hostname. Never place the client secret in this site, Git, public JSON, or browser code.
3. Set these **build environment variables** on the site deployment:

   | Variable | Value |
   | --- | --- |
   | `CMS_GITHUB_REPO` | The actual `owner/repository` |
   | `CMS_GITHUB_BRANCH` | The actual production branch (required; never assumed) |
   | `CMS_AUTH_BASE_URL` | The authenticator's HTTPS base URL, without `/callback` |
   | `NEXT_PUBLIC_SITE_URL` | Optional deployed site URL for canonical/OG URLs; leave unset until known |

4. Rebuild and deploy. Open `/admin` or `/admin/index.html`, sign in with GitHub, and confirm the editor lists the collections below. `/admin/config.json` is public **by design** and contains only the repository name, branch, OAuth worker URL, and collection definitions—no credentials. It is generated at build time; changing these environment variables requires a rebuild.
5. Test one real edit: change site copy, save, confirm the CMS commits to the configured branch, and confirm GitHub triggers a new site build. Test an unpublished project before publishing a real project, then check its detail URL after the Pages build. Upload an actual image and confirm the committed file exists under `public/uploads/` and displays from `/uploads/...`. These live OAuth, GitHub write, upload, and deployment checks **cannot be completed in this sandbox without the owner's repository and Worker**.

Sveltia CMS itself is pinned to version `0.256.1` with an integrity hash in `public/admin/index.html`. Review the version and recompute its SRI hash before upgrading it. GitHub OAuth is the only remote sign-in method enabled; no access token is committed or exposed.

### Content model

| CMS collection | Repository path | What it manages |
| --- | --- | --- |
| Site content | `src/content/site.json` | Identity, hero, About writing, section headings, project areas, contact details/socials, hero/portrait/About images |
| Section order & visibility | `src/content/sections.json` | Drag-reordered home sections, visible toggles, Journey subsections |
| Skills | `src/content/skills.json` | Skills, editable categories, publication and drag-reordering |
| Services | `src/content/services.json` | Services, descriptions, icons, publication and drag-reordering |
| Education | `src/content/education.json` | Qualifications and optional institution/dates |
| Experience | `src/content/experience.json` | Optional experience entries |
| Achievements | `src/content/achievements.json` | Optional awards/milestones |
| Gallery | `src/content/gallery.json` | Images, accessible descriptions, captions, publication, order |
| Projects | `src/content/projects/*.json` | Individual projects, category, cover/gallery images, technology, live/source URLs, story, `order`, publication |
| Journal | `src/content/blog/*.json` | Individual posts, date, cover, Markdown body, publication |
| Uploads | `public/uploads/` | Git-backed uploaded images; public URL `/uploads/...` |

New projects and posts default to **unpublished**. Projects sort by the editable numeric `order` field; single-file collections can be reordered in the CMS. Only published entries appear on the site and receive static detail pages. Unpublished JSON remains in the Git repository, so don't put private information in drafts if the repository is public.

The hero engineering image can be changed in Site content. The About section shows a technical drawing until `profileImage` (or `aboutImage`) is uploaded; **no stock/generated face is used**. The Contact section shows an honest empty state until an email or other contact information is entered. It does not present a form with nowhere to deliver messages.

## Cloudflare Pages + GitHub deployment

Use **Cloudflare Pages → Connect to Git** with the actual GitHub repository and production branch. Choose a static Next.js export:

- Build command: `PORTFOLIO_STATIC_EXPORT=1 npm run build`
- Output directory: `out`
- Root directory: repository root
- Set the CMS variables above in **Build variables** for production (and preview if needed).
- Leave the custom domain disconnected until Golam is ready. A default `*.pages.dev` hostname is enough.

The optional static mode in `next.config.ts` disables server image optimization and pre-renders the site, the CMS configuration, and the health endpoint. `public/_redirects` maps `/admin` to the static editor. GitHub commits made by Sveltia trigger a new Pages build when Git integration is enabled. New or unpublished entries therefore appear/disappear **after** the deployment completes, not instantaneously.

For a full-stack Next.js runtime instead of Pages static export, follow Cloudflare's current [Next.js on Workers guidance](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/) and test that adapter separately. Do not use the old `next-on-pages` adapter as if it were a supported Next.js 16 Pages SSR path. This project does not require that runtime for its current features.

## Validation status

The project files have been reviewed and the missing hero artwork reference has been replaced with a bundled SVG asset. Reduced-motion fallbacks are included. A full production build, browser/device test, real GitHub OAuth sign-in, CMS commit, image upload, and live Cloudflare Pages redeployment still need to be run after installing dependencies and configuring the owner's GitHub repository and OAuth Worker. Do not treat the CMS setup screen as proof that remote editing is active.
