# MAHAMUD — Personal Portfolio

A minimal, responsive, Git-based personal portfolio with Sveltia CMS.

## Stack
- Static HTML, CSS and JavaScript
- Sveltia CMS for content editing
- GitHub repository as content storage
- Cloudflare Pages for free-tier hosting
- GitHub access-token sign-in for the CMS (no OAuth Worker required for the owner-only setup)

## Before upload
1. Replace `OWNER` in `admin/config.yml` with your GitHub username.
2. Upload the contents of this folder to the root of your repository's `main` branch.
3. Keep the repository public if you want Cloudflare Pages' simplest free deployment and public raw content access.
4. In GitHub, open Settings → Pages only if you choose GitHub Pages; otherwise deploy through Cloudflare Pages.

## CMS login
Open `/admin/`, choose **Sign in with Token**, follow the GitHub token link shown by Sveltia CMS, create a token with repository access for this repository, and paste it into the login prompt. Do not put the token in any project file, ZIP, or GitHub commit. Sveltia CMS stores the authentication in the browser session/local storage; sign out on shared devices.

Official guide: https://sveltiacms.app/en/docs/backends/github

## Deploy on Cloudflare Pages
1. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Select `mahamudefx-portfolio`.
3. Framework preset: None. Build command: leave blank. Build output directory: `.` (the repository root).
4. Deploy. Cloudflare will provide a `pages.dev` URL.
5. Test the site and `/admin/` before connecting the custom domain.
6. Add `mahamudefx.xyz` as a custom domain in the Pages project. Follow the Cloudflare DNS instructions. Do not change nameservers until you have reviewed existing DNS records, especially MX records if you use email on the domain.

## Important content notes
- Edit profile, about, skills, projects, experience, education, achievements, services, gallery, blog and section visibility from the CMS.
- The Section Builder supports additional text/image sections and visibility/order controls. New interactive component types or entirely new page templates still require development.
- Upload media through the CMS. Keep image sizes optimized; this starter stores media in the GitHub repository.
- GitHub has file size and repository limits. For a large photo library, use an external object storage service only if needed.

## Current status
This is a starter project. Replace placeholder profile content and photo before publishing. Verify CMS login and content updates after deployment.
