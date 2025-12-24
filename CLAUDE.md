# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Build for production (validates all frontmatter)
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Architecture Overview

This is a **Git-driven, statically-generated photography portfolio** built with Next.js App Router. Content is managed via MDX files in `/content/projects/`, and images are hosted on GitHub via `raw.githubusercontent.com` URLs.

### Core Principles (from .cursor/rules/cwphoto.mdc)

- **No database**: Content loads from MDX files at build time
- **Static generation**: All pages pre-rendered for fast load times
- **Git-driven updates**: Push to deploy workflow
- **Minimal scope**: Keep V0.1 scope tight - avoid adding CMS, databases, or lightbox unless explicitly requested
- **Shopify integration**: Ecommerce via Shopify Storefront API for print sales (added after V0.1)

### Content Architecture

**MDX-based project system**:
- Projects are stored as `.mdx` files in `content/projects/`
- Each project has frontmatter (validated by Zod) and MDX body content
- Frontmatter is parsed by `gray-matter` and validated via `lib/schema.ts`
- Invalid frontmatter causes **build failures** with clear error messages showing file name and field

**Project loading flow**:
1. `lib/projects.ts` reads MDX files from `content/projects/`
2. `gray-matter` extracts frontmatter and content
3. `ProjectSchema` (Zod) validates frontmatter - throws on invalid data
4. Projects sorted by: `order` (ascending, undefined last) → `dateStart` (descending)
5. `getProjectBySlug()` returns single project, `getAllProjects()` returns all
6. `getProjectContent()` returns raw MDX content string

**MDX rendering flow**:
1. `app/projects/[slug]/page.tsx` fetches project and content
2. MDX content passed to `components/mdx-wrapper.tsx` (client component)
3. `next-mdx-remote` serializes MDX and renders with custom components
4. Custom components imported from `components/mdx/` (ImageBlock, TextBlock, Divider, TwoUp)
5. `MDXProvider` context provides `printProduct` data to components

### Image Hosting

- Images hosted on GitHub (same repo or separate assets repo)
- URLs follow pattern: `https://raw.githubusercontent.com/[user]/[repo]/main/[path]`
- File naming convention: `YYYY-MM-projectSlug-roll-frame-description.jpg`
- `next.config.ts` configured to allow images from `raw.githubusercontent.com`
- **Never rename image files after publishing** - URLs must remain stable

### Shopify Integration

The site integrates Shopify for print sales:
- `lib/shopify.ts`: Shopify Storefront API client + GraphQL queries
- `lib/cart.ts`: Cart state management functions
- `contexts/cart-context.tsx`: Global cart state with localStorage persistence
- `contexts/mdx-context.tsx`: Provides `printProduct` data to MDX components
- `components/mdx/image-block.tsx`: Includes "Buy Print" button when `printProduct` configured
- Projects can include `printProduct.buyButtonCode` in frontmatter for Shopify Buy Button embed

**Environment variables** (required for Shopify features):
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` - e.g., `your-store.myshopify.com`
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` - Storefront API token
- `NEXT_PUBLIC_SITE_URL` - Your site URL for metadata

### Routes

```
/                    → app/page.tsx (home/project grid)
/projects            → app/projects/page.tsx (list view)
/projects/[slug]     → app/projects/[slug]/page.tsx (project detail)
/about               → app/about/page.tsx (bio and contact)
/cart                → app/cart/page.tsx (shopping cart)
```

### Schema & Validation (lib/schema.ts)

**ProjectSchema** (Zod):
- `slug`: string (required, must match filename)
- `title`: string (required)
- `oneLine`: string (required, short description)
- `dateStart`: ISO date string (required)
- `dateEnd`: ISO date string (optional)
- `location`: string (optional)
- `coverImageUrl`: URL string (required)
- `order`: number (optional, for custom sort order)
- `printProduct`: optional object with `buyButtonCode` string

### MDX Block Components

Available in project `.mdx` files:

```mdx
<ImageBlock
  url="https://..."
  alt="Description"
  caption="Optional caption"
  layout="full|bleed|inset|twoUp"
/>

<TextBlock style="paragraph|note">
  Content here
</TextBlock>

<Divider style="blank|rule" />

<TwoUp>
  <ImageBlock ... layout="twoUp" />
  <ImageBlock ... layout="twoUp" />
</TwoUp>
```

## Development Workflow

### Adding a New Project

1. Create `content/projects/[slug].mdx` with required frontmatter
2. Upload images to GitHub following naming convention
3. Reference images via `raw.githubusercontent.com` URLs
4. Run `npm run build` to validate frontmatter
5. Commit and push (auto-deploys on Vercel)

### Making Changes

When user requests changes:
1. Restate target page/feature in one sentence
2. List files you will edit
3. Implement smallest change that meets request
4. Keep V0.1 scope intact unless user expands scope

### What to Avoid

- Adding a CMS in V0.1
- Adding a database
- Adding a lightbox unless explicitly requested for V0.2
- Over-engineering beyond the request
- Breaking the Git-driven workflow

## TypeScript Configuration

- Strict mode enabled (`"strict": true`)
- No `any` types allowed
- Path alias: `@/*` maps to repo root
- Target: ES2017

## Styling

- Tailwind CSS for all styling
- shadcn/ui components for UI elements
- Global styles in `app/globals.css`
- Minimal UI, strong whitespace, high contrast
- Mobile-first responsive design

## Build Process

```bash
npm run build
```

Build will:
- Validate all project frontmatter via Zod schemas
- Fail with descriptive errors if frontmatter invalid
- Generate static pages for all routes
- Create sitemap.xml and robots.txt
- Optimize images via next/image

## Code Quality Standards

- No `any` types
- Keep components small and composable
- Put schemas in `lib/schema.ts`
- Prefer server components (limit client components to interactive UI)
- Semantic HTML for accessibility
- Alt text required for all images
- Keyboard navigation support

## Deployment

Designed for Vercel deployment:
1. Push to GitHub main branch
2. Vercel auto-detects Next.js and builds
3. Set environment variables in Vercel dashboard
4. Configure custom domain DNS (A record to `76.76.21.21`, CNAME for www)
5. Automatic deployments on subsequent pushes
