# To My Forever Love — Monthsary Website

A responsive dark-romantic website built with plain HTML, CSS, and JavaScript.

## Run it
1. Extract the ZIP folder.
2. Open `index.html` in a browser. For best results, use VS Code with the Live Server extension.
3. No build step or package installation is required. Google Fonts requires internet; fallback fonts are included.

## Personalize before sharing
### 1. Set your relationship start date
Open `script.js` and change:
```js
const RELATIONSHIP_START = "2025-01-01T00:00:00";
```
Use your real start date and local time, for example `"2024-11-14T00:00:00"`. The live counter counts elapsed days, hours, minutes, and seconds.

### 2. Add your photos
Put your photos in the `images` folder and name them:
- `photo1.jpg`
- `photo2.jpg`
- `photo3.jpg`

If you use `.png` or `.webp`, update the matching `data-photo` value in `index.html`.

### 3. Personalize the love letter
You can click **Personalize this letter** on the page to preview a custom letter. That edit is temporary until you copy your chosen text into `index.html` and save the file.

### 4. Add music (optional)
Use a song you own or have permission to use. Place it at `music/love-song.mp3`, create the `music` folder, then uncomment this line in `script.js`:
```js
// audio.src = "music/love-song.mp3";
```
Remove the `//` so it reads `audio.src = "music/love-song.mp3";`.

## Publish it
You can upload the files to a static hosting service such as GitHub Pages, Netlify, or Cloudflare Pages. Upload `index.html`, `style.css`, `script.js`, and the `images` folder. Keep personal photos private if you don't want them publicly accessible.
