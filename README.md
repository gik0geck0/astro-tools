# 🌌 Astrophotography Tools

A collection of calculators and tools for astrophotography enthusiasts, built with Astro and Preact.

## Features

- **NPF Calculator**: Calculate optimal exposure times to avoid star trails using the Night Photography Factor rule
- **Pixel Scale & FoV Calculator**: Calculate pixel scale and field of view for your telescope and camera setup

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd astro-tools
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:4321`

### Building for Production

To build the static site for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to be deployed to any static hosting service.

## Project Structure

```
src/
├── components/          # Preact components
│   ├── NPFCalculator.tsx
│   └── PixelScaleCalculator.tsx
├── pages/              # Astro pages
│   ├── index.astro     # Home page
│   ├── npf-calculator.astro
│   └── pixel-scale-calculator.astro
└── layouts/            # Astro layouts (if needed)
```

## Tools

### NPF Calculator

The NPF (Night Photography Factor) rule is more accurate than the traditional 500 rule for calculating maximum exposure times to avoid star trails. It takes into account:

- Focal length
- Aperture (f-number)
- Pixel size
- Declination (for celestial objects)

### Pixel Scale & FoV Calculator

Calculate important imaging parameters:

- **Pixel Scale**: Arcseconds per pixel
- **Field of View**: Angular size of your sensor
- **Sampling Quality**: Whether your setup is properly sampled

## Contributing

This project is designed to be beginner-friendly. To add new tools:

1. Create a new Preact component in `src/components/`
2. Create a corresponding Astro page in `src/pages/`
3. Add the tool to the home page

## Deployment

This is a static site that can be deployed to:

- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Simply run `npm run build` and upload the `dist/` folder contents.

## License

MIT License - feel free to use and modify as needed.