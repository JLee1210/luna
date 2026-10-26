# I choose you ♡

A Pokémon date invitation built with plain HTML, CSS, and JavaScript. No install, paid hosting, or backend required.

The story starts with Jaden’s letter, continues to four notes about Luna, and asks for forgiveness. Yes opens the date invitation; No opens a quiet message respecting her space. Screens fade between steps, with reduced-motion support. Reloading starts the story again.

## Preview

Run `python3 -m http.server 4173` from this folder, then open http://localhost:4173.

## Add your photos

Put your photos or videos in `assets/`, then edit the three `src` values at the top of `script.js`, for example `assets/us-1.jpg`. Customize captions in `index.html`. “Our memories” is expanded by default. Images are cropped to fit their frames.

For a video, use an entry such as `{ src: 'assets/us-2.mp4', type: 'video', alt: 'Our adventure together' }`. Videos have playback controls and do not autoplay. Optionally add `poster: 'assets/video-cover.jpg'` for a thumbnail.

## Host on GitHub Pages

1. Create a public GitHub repository and upload `index.html`, `style.css`, `script.js`, and the `assets` folder.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, branch **master**, folder **/ (root)**, then **Save**.
4. GitHub will show the published URL when the deployment completes.

All asset paths are relative so the page works inside a repository subpath. `.nojekyll` bypasses Jekyll processing. Pixel sprites and the Press Start 2P font are served locally with the site.

The Yes button opens a celebration. The No button moves away on pointer approach, taps, or keyboard activation. Responses are not sent or stored; the celebration asks her to send you a screenshot.

Pokémon character artwork is sourced from the PokeAPI sprites repository. Pokémon and character artwork belong to their respective owners. This is an unofficial personal fan project.
