# Avani Birthday

Avani Birthday is a minimal Next.js site that showcases a private romantic birthday page with music, a gallery fed from Google Drive, an unlockable letter, animated confetti and floating hearts.

## Features
- Clickable gift box that reveals the page and starts music and animation
- Banner image and gallery images fetched live from a Google Drive folder
- Masonry gallery with optional Auto mode and random image highlighting
- Floating hearts and confetti animation for a festive look
- Password-locked love letter modal (client-side demo password)

## Prerequisites
- Node.js 18+ and npm/bun/pnpm
- A Google Drive folder with images, plus an API key for public Drive listing

## Environment
Create a `.env.local` in the project root with the following values:

```bash
NEXT_PUBLIC_GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
NEXT_PUBLIC_DRIVE_FOLDER_ID=YOUR_DRIVE_FOLDER_ID
```

Notes:
- The current implementation reads Drive files using the public Google Drive API.
- Make sure your Drive folder contains images and that the API key is permitted to list these files.

## Install & Run
Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Build and start for production:

```bash
npm run build
npm run start
```

Formatting & linting are handled by Biome:

```bash
npm run format
npm run lint
```

## Project Structure
- `app/` – Next.js App Router pages, layout and components
- `app/components/` – React components used in the birthday page
- `app/lib/drive.ts` – Drive fetcher that lists files and maps them to the UI
- `app/types/drive.ts` – Drive file types
- `public/` – Static assets like music and icons

## Style Guide
- **Design tokens (CSS variables)**: defined in `src/app/styles/globals.css`:
	- `--background-gradient`: page gradient used as background
	- `--foreground`: main text color
	- `--primary-pink`, `--secondary-pink`: color accents used across UI
	- `--font-cursive`: default cursive font stack
- **Animations**:
	- `gradientRotate`: root background rotation animation
	- `glowPulse`: used on elements like the gift box and envelope to draw attention
	- `floatPulse`, `breatheGlow`: used on gallery images for subtle motion and multicolor glow
	- `shimmerGradient`: used for the Love Flow button to create a soft shimmer
- **Best practices**:
	- Avoid `!important` and rely on cascade or selector specificity (this project removed `!important` where possible).
	- Use design tokens for color and font changes to ensure consistent styling.
	- Keep animation durations small and non-jarring for accessibility.

## Development Notes
- The password used to reveal the letter in the UI is kept client-side for this demo (see `Letter.tsx`). For any real app, replace this with server-verified authentication.
- Images are fetched via Google Drive listing and mapped to a thumbnail and large image URL. If your Drive folder is private, you'll need an authenticated approach instead of a client-side API key.

## Audio
- Background music is played via `BackgroundMusic` and loops by default. It attempts to autoplay when the gift is opened; if your browser blocks autoplay, a user-gesture may be needed to start playback. There is no audio analysis or beat detection in the current implementation.
- Floating hearts are decorative and spawn randomly; they do not react to music. If you need a future audio-reactive implementation, consider adding a shared `AudioContext` and an `AnalyserNode`, which must be created carefully (one `MediaElementAudioSourceNode` per HTMLMediaElement) to avoid DOM errors.

## License & Credits
This project was created for a personal demo. Feel free to reuse or adapt it. It uses `framer-motion`, `canvas-confetti` and `react-masonry-css`.

If you'd like any help configuring the Drive folder or integrating a secure backend, open an issue or reach out.
