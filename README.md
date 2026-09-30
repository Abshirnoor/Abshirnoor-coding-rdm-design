# Random Design Portfolio

A personal website that **redesigns itself on every visit**. Each load picks a random colour palette, font pairing and layout. Click the menu icon or press <kbd>Space</kbd> to generate a new design.

Built from the [DevProjects](https://www.codementor.io/projects) brief: [Personal website with randomly generated design](https://www.codementor.io/projects/web/personal-website-with-randomly-generated-design-atx32ht3j3).

<p>
  <img src="images/screenshot-desktop.png" alt="Desktop screenshot: the Forest design" width="68%">
  <img src="images/screenshot-mobile.png" alt="Mobile screenshot: the Midnight design" width="24%">
</p>

## Features

- **7 palettes × 5 font pairings × 3 layouts**, plus a random photo tilt, give about 100 different combinations
- The same design never shows twice in a row
- Smooth intro and transition animations with [GSAP](https://gsap.com/)
- Keyboard support (<kbd>Space</kbd>) and an accessible `<button>` for shuffling
- Fully responsive: on phones everything stacks with no overlap
- Still works (without animation) if the animation library fails to load

## Tech

HTML · CSS (custom properties) · vanilla JavaScript · GSAP · Google Fonts

## How it works

All colours and fonts are CSS custom properties (`--bg`, `--ink`, `--accent`, `--font-display`, `--font-body`) set in [`dist/style.css`](dist/style.css). [`script.js`](script.js) picks a random palette, font pair and layout, writes them onto `:root`, and swaps a `layout-a` / `layout-b` / `layout-c` class on the page.

To add your own palette, add one line to the `palettes` array in `script.js`:

```js
{ name: 'Sunset', bg: '#FFB4A2', ink: '#2B2D42', accent: '#6D597A' },
```

## Run it locally

No build step. Clone the repo and open `index.html`, or serve the folder:

```bash
git clone https://github.com/Abshirnoor/Abshirnoor-coding-rdm-design.git
cd Abshirnoor-coding-rdm-design
python3 -m http.server 8000   # then open http://localhost:8000
```

## Author

**Abshir Noor**, web developer & designer from Somalia · [GitHub @Abshirnoor](https://github.com/Abshirnoor) · [X @abshirn00r](https://x.com/abshirn00r)

## License

[MIT](https://choosealicense.com/licenses/mit/)
