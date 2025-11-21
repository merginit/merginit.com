# MerginIT.com

Official website for MerginIT e.U.

## Tech Stack

### Core Framework
- **SvelteKit** - Full-stack framework
- **Svelte 5** - Latest version
- **Vite 6** - Frontend tooling
- **TypeScript** - Type safety

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS
- **GSAP** - Animation library
- **Swiper** - Touch slider
- **Chart.js** - Charts

### Content & Internationalization
- **MDsveX** - Markdown in Svelte
- **Paraglide JS** - i18n (en/de)
- **Inlang** - Translation management
- **PrismJS** - Syntax highlighting

### Development Tools
- **Storybook** - Component development
- **ESLint** - Linting
- **Prettier** - Formatting
- **Vitest** - Testing
- **Puppeteer** - E2E testing

### Deployment
- **Cloudflare Pages** - `@sveltejs/adapter-cloudflare`
- **Node.js 22+** - Required

### Other
- **Microsoft Clarity** - Analytics
- **Cookiiies** - Cookie consent
- **Satori** - OG image generation
- **Mermaid** - Diagrams

## Project Structure

```
merginit.com/
├── src/
│   ├── routes/          # SvelteKit pages and API routes
│   ├── lib/
│   │   ├── components/  # Reusable UI components
│   │   ├── blog/        # Blog-related utilities
│   │   ├── paraglide/   # Generated i18n code
│   │   └── stores/      # Svelte stores
│   └── stories/         # Storybook stories
├── static/              # Static assets (images, fonts, etc.)
├── messages/            # i18n message files (en, de)
├── content/blog/        # Blog posts (currently empty)
└── project.inlang/      # Inlang configuration
```

## Getting Started

### Prerequisites
- Node.js 22 or higher
- npm, pnpm, or yarn

### Installation

```bash
# Install dependencies
npm install

# Apply patches (automatically runs via postinstall)
npm run postinstall
```

### Development

Start the development server:

```bash
npm run dev

# Open in browser automatically
npm run dev -- --open
```

The site will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build locally
npm run check            # Type-check the project
npm run check:watch      # Type-check in watch mode
npm run lint             # Lint code with ESLint and check formatting
npm run format           # Format code with Prettier
npm run storybook        # Start Storybook development server
npm run build-storybook  # Build Storybook for production
```

## Building for Production

```bash
npm run build   # Outputs to .svelte-kit/cloudflare
npm run preview # Preview build
```

## Deployment

Configured for Cloudflare Pages via `wrangler.jsonc`.

Settings:
- Output: `.svelte-kit/cloudflare`
- Compatibility: `2024-09-23`
- Node.js compat enabled

## Internationalization

Supports English and German via Paraglide JS and Inlang.
Messages in `messages/` directory.

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## License

See [LICENSE.txt](LICENSE.txt) for details.

## Company

MerginIT e.U.  
[merginit.com](https://merginit.com)
