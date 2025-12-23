# Image Assets Hosting Guide

## Overview

Images for this photography archive site are hosted on GitHub and referenced via `raw.githubusercontent.com` URLs. This approach provides:

- Stable, version-controlled image URLs
- No additional hosting costs
- Git-driven workflow for image management
- CDN benefits through GitHub's infrastructure

## Repository Structure

### Option 1: Dedicated Assets Repository (Recommended)

Create a separate GitHub repository dedicated to image assets:

```
chriswylde-photography-assets/
├── projects/
│   ├── project-slug-1/
│   │   ├── 2024-01-project-slug-1-001-cover.jpg
│   │   ├── 2024-01-project-slug-1-002-image1.jpg
│   │   └── 2024-01-project-slug-1-003-image2.jpg
│   └── project-slug-2/
│       └── ...
└── README.md
```

### Option 2: Same Repository (Alternative)

Store images in the same repository under `/assets`:

```
chriswylde.photography/
├── assets/
│   └── projects/
│       └── [same structure as above]
├── content/
├── app/
└── ...
```

## File Naming Convention

**Format:** `YYYY-MM-projectSlug-roll-frame-description.jpg`

**Components:**
- `YYYY-MM` - Year and month (e.g., `2024-01`)
- `projectSlug` - Project slug matching the MDX file name
- `roll-frame` - Sequential numbering (e.g., `001`, `002`)
- `description` - Brief description (optional, lowercase, hyphens)
- Extension - `.jpg`, `.png`, or `.webp`

**Examples:**
- `2024-01-urban-streets-001-cover.jpg`
- `2024-01-urban-streets-002-building-facade.jpg`
- `2024-01-urban-streets-003-night-scene.jpg`

## URL Format

### For Dedicated Assets Repository

```
https://raw.githubusercontent.com/[username]/chriswylde-photography-assets/main/projects/[project-slug]/[filename]
```

**Example:**
```
https://raw.githubusercontent.com/chriswylde/chriswylde-photography-assets/main/projects/urban-streets/2024-01-urban-streets-001-cover.jpg
```

### For Same Repository

```
https://raw.githubusercontent.com/[username]/chriswylde.photography/main/assets/projects/[project-slug]/[filename]
```

**Example:**
```
https://raw.githubusercontent.com/chriswylde/chriswylde.photography/main/assets/projects/urban-streets/2024-01-urban-streets-001-cover.jpg
```

## Image Requirements

### Cover Images
- **Aspect Ratio:** 4:3 recommended
- **Dimensions:** Minimum 1200x800px
- **Format:** JPG (high quality) or WebP
- **File Size:** Optimize for web (< 500KB recommended)

### Content Images
- **Aspect Ratio:** 4:3 or 3:2 (maintain consistency within project)
- **Dimensions:** Minimum 1200px on longest side
- **Format:** JPG (high quality) or WebP
- **File Size:** Optimize for web (< 500KB recommended)

## Workflow

1. **Prepare Images**
   - Optimize images for web (compress, resize if needed)
   - Name files according to convention
   - Organize by project folder

2. **Upload to GitHub**
   - Commit images to appropriate repository
   - Push to main/master branch
   - **Important:** Never rename files after publishing (URLs must remain stable)

3. **Reference in MDX**
   - Use full `raw.githubusercontent.com` URL in frontmatter (`coverImageUrl`)
   - Use full `raw.githubusercontent.com` URL in MDX blocks (`ImageBlock`)

## Best Practices

- ✅ Always use the `main` or `master` branch for stable URLs
- ✅ Keep file names descriptive but concise
- ✅ Maintain consistent aspect ratios within a project
- ✅ Optimize images before committing
- ✅ Use WebP format when possible for better compression
- ✅ Never rename files after publishing
- ✅ Use version control to track image changes
- ❌ Don't use placeholder services in production
- ❌ Don't commit unoptimized large files
- ❌ Don't rename files after URLs are published

## Next.js Configuration

The `next.config.ts` file is configured to allow images from:
- `raw.githubusercontent.com` (for production images)
- `via.placeholder.com` (for development/testing only)

## Migration Notes

When migrating from placeholder images to GitHub-hosted images:

1. Upload images to GitHub repository
2. Update `coverImageUrl` in project frontmatter
3. Update `url` in `ImageBlock` components in MDX files
4. Test that images load correctly
5. Commit changes

