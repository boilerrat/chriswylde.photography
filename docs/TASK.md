# Day 1: Scaffold and Routes ✅

Initialize Next.js App Router project with TypeScript and Tailwind CSS.

Create routes: home (/), projects list (/projects), project detail (/projects/[slug]), and about (/about).

Add minimal layout with navigation and footer components.

Set up repository structure with docs folder.

## Completed
- ✅ Next.js App Router with TypeScript and Tailwind CSS configured
- ✅ All routes created: /, /projects, /projects/[slug], /about
- ✅ Nav component with keyboard navigation and focus states
- ✅ Footer component
- ✅ Root layout with Nav and Footer
- ✅ shadcn/ui utilities configured (lib/utils.ts)
- ✅ Tailwind config with CSS variables for theming
- ✅ Global styles with shadcn base styles

# Day 2: Content Engine ✅

Add Zod schema for Project frontmatter validation.

Add MDX loader from /content/projects directory.

Implement sorting: order (ascending) then dateStart (descending).

Add 404 handling for missing project slugs.

## Completed
- ✅ Zod schema created in lib/schema.ts with all required/optional fields
- ✅ MDX loader functions in lib/projects.ts (getAllProjects, getProjectBySlug)
- ✅ Project sorting implemented: order first, then dateStart desc
- ✅ 404 not-found.tsx page for missing projects
- ✅ Error handling with clear filename and field name in error messages
- ✅ Sample project created for testing

# Day 3: UI for Archive ✅

Create ProjectCard and ProjectGrid components for displaying projects.

Update home page to render project grid.

Update /projects page to render list view.

Update project detail page to render metadata and cover image.

## Completed
- ✅ ProjectCard component with cover image, title, oneLine, and location
- ✅ ProjectGrid component with responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)
- ✅ Home page renders ProjectGrid
- ✅ /projects page renders list view with project details
- ✅ Project detail page shows cover image, title, oneLine, dates, and location
- ✅ next/image configured for remote images (placeholder.com and raw.githubusercontent.com)
- ✅ Responsive layouts with Tailwind breakpoints
- ✅ Accessibility: keyboard navigation and focus states

# Day 4: Blocks and Zine Layouts ✅

Add MDX components: ImageBlock, TextBlock, Divider.

Add layout variations: full, bleed, inset, twoUp.

Set up MDX rendering in project detail pages.

## Completed
- ✅ ImageBlock component with layout variations (full, bleed, inset, twoUp)
- ✅ TextBlock component with style variations (note, paragraph)
- ✅ Divider component with style variations (blank, rule)
- ✅ TwoUp wrapper component for side-by-side images
- ✅ MDX components configuration and export
- ✅ Project detail page renders MDX content using next-mdx-remote
- ✅ Sample project updated with mixed blocks demonstrating all layouts
- ✅ Captions properly attach to images using figcaption
- ✅ Responsive image sizing for all layout types

# Day 5: GitHub Images and Vercel Deploy ✅

Create assets repo path plan and naming rules.

Update next.config for raw.githubusercontent.com remote images.

Add per-page metadata, OG tags, sitemap, robots.

## Completed
- ✅ Assets documentation created in /docs/assets.md with naming conventions and workflow
- ✅ next.config.ts already configured for raw.githubusercontent.com (was done in Day 3)
- ✅ Per-page metadata added to all pages (home, projects, project detail, about)
- ✅ Open Graph tags configured for all pages with project-specific OG images
- ✅ Dynamic sitemap.ts generated from projects
- ✅ robots.ts configured with sitemap reference
- ✅ Project detail pages use generateMetadata for dynamic SEO

## Next Steps for Deployment

1. **Set up GitHub repository**
   - Create repository for the site
   - Push code to GitHub

2. **Set up image hosting**
   - Create assets repository OR use same repo with /assets folder
   - Upload images following naming convention in /docs/assets.md
   - Update project MDX files with real GitHub image URLs

3. **Deploy to Vercel**
   - Connect GitHub repository to Vercel
   - Set environment variable: `NEXT_PUBLIC_SITE_URL` (e.g., `https://chriswylde.photography`)
   - Deploy and verify build passes

4. **Add real project**
   - Create a real project MDX file with actual images
   - Test that images load correctly
   - Verify OG preview works when sharing

## Notes

- The sample project uses placeholder images - replace with real GitHub URLs before production
- Sitemap and robots.txt are dynamically generated
- OG images use project coverImageUrl for rich previews

