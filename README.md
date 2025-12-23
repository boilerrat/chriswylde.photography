# Chris Wylde Photography

A minimal, Git-driven photography archive site built with Next.js. Publish photography projects as series with large images, captions, and optional text blocks.

## Features

- 📸 **Project-based organization** - Organize photos into projects or series
- 🎨 **Flexible layouts** - Full, bleed, inset, and two-up image layouts
- 📱 **Responsive design** - Mobile-first, works beautifully on all devices
- 🖼️ **GitHub-hosted images** - Store images in GitHub, reference via raw.githubusercontent.com
- ⚡ **Static generation** - Fast, pre-rendered pages at build time
- 🔍 **SEO optimized** - Open Graph tags, sitemap, and robots.txt
- ♿ **Accessible** - Keyboard navigation, focus states, semantic HTML
- 🎯 **Type-safe** - Full TypeScript with Zod validation

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with shadcn/ui components
- **Content:** MDX files with frontmatter
- **Validation:** Zod schemas
- **Deployment:** Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 20+ (LTS recommended)
- npm, yarn, or pnpm
- Git
- GitHub account (for image hosting)

### Installation

1. **Fork or clone this repository**

   ```bash
   git clone https://github.com/your-username/chriswylde.photography.git
   cd chriswylde.photography
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
chriswylde.photography/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── projects/          # Projects pages
│   │   └── [slug]/        # Dynamic project pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   ├── mdx/               # MDX block components
│   ├── footer.tsx
│   ├── nav.tsx
│   ├── project-card.tsx
│   └── project-grid.tsx
├── content/               # MDX project files
│   └── projects/          # Project MDX files
├── lib/                   # Utilities and schemas
│   ├── projects.ts        # Project loader functions
│   ├── schema.ts          # Zod validation schemas
│   └── utils.ts           # Utility functions
├── docs/                  # Documentation
│   ├── assets.md          # Image hosting guide
│   └── TASK.md            # Development tasks
└── public/                # Static assets (if any)
```

## Adding a New Project

### Step 1: Prepare Your Images

1. **Organize images** following the naming convention:
   ```
   YYYY-MM-projectSlug-roll-frame-description.jpg
   ```
   Example: `2024-01-urban-streets-001-cover.jpg`

2. **Upload to GitHub:**
   - Option A: Dedicated assets repository
     - Create `chriswylde-photography-assets` repo
     - Structure: `projects/[project-slug]/[images]`
   - Option B: Same repository
     - Create `assets/projects/[project-slug]/` folder
     - Commit images there

3. **Get image URLs:**
   ```
   https://raw.githubusercontent.com/[username]/[repo]/main/projects/[slug]/[filename]
   ```

### Step 2: Create Project MDX File

Create a new file in `content/projects/[project-slug].mdx`:

```mdx
---
slug: urban-streets
title: Urban Streets
oneLine: A series exploring urban landscapes and street photography
dateStart: 2024-01-15T00:00:00.000Z
dateEnd: 2024-02-20T00:00:00.000Z
location: San Francisco, CA
coverImageUrl: https://raw.githubusercontent.com/username/repo/main/projects/urban-streets/2024-01-urban-streets-001-cover.jpg
order: 1
---

<TextBlock style="paragraph">
This project explores the urban landscape through a series of street photographs.
</TextBlock>

<ImageBlock
  url="https://raw.githubusercontent.com/username/repo/main/projects/urban-streets/2024-01-urban-streets-002-building.jpg"
  alt="Urban building facade"
  caption="A modern building facade"
  layout="full"
/>

<TextBlock style="note">
Shot on 35mm film during golden hour.
</TextBlock>

<ImageBlock
  url="https://raw.githubusercontent.com/username/repo/main/projects/urban-streets/2024-01-urban-streets-003-street.jpg"
  alt="Street scene"
  layout="inset"
/>

<TwoUp>
  <ImageBlock
    url="https://raw.githubusercontent.com/username/repo/main/projects/urban-streets/2024-01-urban-streets-004-left.jpg"
    alt="Left image"
    layout="twoUp"
  />
  <ImageBlock
    url="https://raw.githubusercontent.com/username/repo/main/projects/urban-streets/2024-01-urban-streets-005-right.jpg"
    alt="Right image"
    layout="twoUp"
  />
</TwoUp>
```

### Step 3: Frontmatter Fields

**Required fields:**
- `slug` - URL-friendly identifier (must match filename)
- `title` - Project title
- `oneLine` - Short description
- `dateStart` - ISO date string (e.g., `2024-01-15T00:00:00.000Z`)
- `coverImageUrl` - Full URL to cover image

**Optional fields:**
- `dateEnd` - ISO date string for date ranges
- `location` - Location string
- `order` - Number for custom sorting (lower numbers appear first)

### Step 4: Available MDX Blocks

**ImageBlock:**
```mdx
<ImageBlock
  url="https://..."
  alt="Description"
  caption="Optional caption"
  layout="full|bleed|inset|twoUp"
/>
```

**TextBlock:**
```mdx
<TextBlock style="paragraph|note">
Your text content here.
</TextBlock>
```

**Divider:**
```mdx
<Divider style="blank|rule" />
```

**TwoUp (wrapper for side-by-side images):**
```mdx
<TwoUp>
  <ImageBlock ... layout="twoUp" />
  <ImageBlock ... layout="twoUp" />
</TwoUp>
```

## Image Hosting Setup

See [docs/assets.md](./docs/assets.md) for detailed image hosting instructions, including:

- Repository structure options
- File naming conventions
- URL formats
- Image optimization guidelines
- Workflow best practices

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Building

```bash
npm run build
```

The build will:
- Validate all project frontmatter using Zod schemas
- Generate static pages for all projects
- Create sitemap.xml
- Generate robots.txt

**Build errors:** If frontmatter is invalid, the build will fail with clear error messages showing the file and field name.

### Type Safety

All project data is validated with Zod schemas. Invalid frontmatter will cause build failures with descriptive error messages:

```
Invalid frontmatter in project-name.mdx: slug: Required, coverImageUrl: Invalid URL
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Set Environment Variables**
   - `NEXT_PUBLIC_SITE_URL` - Your site URL (e.g., `https://chriswylde.photography`)

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Future pushes to main will trigger automatic deployments

### Other Platforms

This is a standard Next.js app and can be deployed to:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Any platform supporting Next.js

## Customization

### Styling

The site uses Tailwind CSS with shadcn/ui components. Customize:

- **Colors:** Edit `tailwind.config.ts` and `app/globals.css`
- **Components:** Modify components in `components/`
- **Layout:** Update `app/layout.tsx` and page files

### Site Metadata

Update site-wide metadata in:
- `app/layout.tsx` - Root metadata
- Individual page files - Page-specific metadata

### Navigation

Edit navigation links in `components/nav.tsx`.

## Maintenance

### Adding Projects

1. Create new MDX file in `content/projects/`
2. Add images to GitHub (following naming convention)
3. Update frontmatter with image URLs
4. Commit and push
5. Site rebuilds automatically (if using Vercel)

### Updating Projects

1. Edit the MDX file
2. Commit changes
3. Site rebuilds automatically

### Removing Projects

1. Delete the MDX file
2. Commit deletion
3. Site rebuilds automatically

**Note:** Never rename image files after publishing - URLs must remain stable.

### Troubleshooting

**Build fails with schema errors:**
- Check error message for file and field name
- Ensure all required fields are present
- Verify date formats are ISO strings
- Check that URLs are valid

**Images not loading:**
- Verify image URLs are correct
- Check that `raw.githubusercontent.com` is in `next.config.ts` remotePatterns
- Ensure images are in the correct GitHub branch (usually `main`)

**MDX not rendering:**
- Check that block components are properly closed
- Verify component names match exactly (case-sensitive)
- Ensure props are correctly formatted

## Contributing

This is a personal photography archive template. Feel free to:

1. Fork the repository
2. Customize for your own use
3. Share improvements via pull requests

## License

This project is open source and available for personal use. Modify as needed for your photography archive.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Image Hosting Guide](./docs/assets.md)

## Support

For issues or questions:
1. Check the [docs](./docs/) folder
2. Review [docs/assets.md](./docs/assets.md) for image hosting
3. Check build error messages for validation issues

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.

