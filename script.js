const select = (e) => document.querySelector(e);

// Each design is a random mix of one palette, one font pairing and one layout.
const palettes = [
  { name: 'Sea Glass', bg: '#C0D7D8', ink: '#242423', accent: '#E07A5F' },
  { name: 'Desert',    bg: '#F2E3C6', ink: '#3D2C1E', accent: '#C8553D' },
  { name: 'Midnight',  bg: '#1B1F3B', ink: '#F4F1DE', accent: '#F2CC8F' },
  { name: 'Ocean',     bg: '#4189DD', ink: '#FFFFFF', accent: '#FFE066' },
  { name: 'Forest',    bg: '#2D4739', ink: '#EDE6D6', accent: '#E9A23B' },
  { name: 'Blush',     bg: '#F6D5D1', ink: '#2B2118', accent: '#6A4C93' },
  { name: 'Paper',     bg: '#FAFAF7', ink: '#111111', accent: '#FF4F00' },
];

const fontPairs = [
  { display: '"Cinzel", serif',             body: '"Noto Sans", sans-serif' },
  { display: '"Playfair Display", serif',   body: '"Inter", sans-serif' },
  { display: '"Syne", sans-serif',          body: '"Space Grotesk", sans-serif' },
  { display: '"DM Serif Display", serif',   body: '"Inter", sans-serif' },
  { display: '"Space Grotesk", sans-serif', body: '"Space Grotesk", sans-serif' },
];

const layouts = ['layout-a', 'layout-b', 'layout-c'];

const pick = (list, not) => {
  const options = list.length > 1 ? list.filter((item) => item !== not) : list;
  return options[Math.floor(Math.random() * options.length)];
};

let current = {};

function generateDesign() {
  const design = {
    palette: pick(palettes, current.palette),
    fonts: pick(fontPairs, current.fonts),
    layout: pick(layouts, current.layout),
    rotation: Math.round(Math.random() * 12 - 6),
  };
  current = design;
  return design;
}

function applyDesign(design) {
  const root = document.documentElement.style;
  root.setProperty('--bg', design.palette.bg);
  root.setProperty('--ink', design.palette.ink);
  root.setProperty('--accent', design.palette.accent);
  root.setProperty('--font-display', design.fonts.display);
  root.setProperty('--font-body', design.fonts.body);
  root.setProperty('--img-rotate', `${design.rotation}deg`);

  const intro = select('.intro');
  intro.classList.remove(...layouts);
  intro.classList.add(design.layout);

  select('.design-name').textContent = `“${design.palette.name}”`;
}

// The page still works (without animation) if GSAP fails to load
const hasGsap = typeof gsap !== 'undefined';

function animateIn() {
  if (!hasGsap) return;
  gsap.timeline()
    .from('.intro__title', { yPercent: 100, opacity: 0, duration: 1.2, ease: 'power4' })
    .from('.intro__txt, .intro__meta', { y: 20, opacity: 0, duration: 0.8, ease: 'power2', stagger: 0.1 }, '-=0.8')
    .from('.intro__img', { scale: 0.9, opacity: 0, duration: 1, ease: 'power3' }, '-=1');
}

function shuffle() {
  if (!hasGsap) {
    applyDesign(generateDesign());
    return;
  }
  gsap.to('.intro__content, .intro__img', {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      applyDesign(generateDesign());
      // stop any half-finished intro animation so it can't leave elements stuck mid-way
      const animated = '.intro__content, .intro__title, .intro__txt, .intro__meta, .intro__img';
      gsap.killTweensOf(animated);
      gsap.set(animated, { clearProps: 'all' });
      animateIn();
    },
  });
}

function initHeader() {
  const navBtn = select('.nav-btn');
  navBtn.addEventListener('click', shuffle);
  if (!hasGsap) return;

  // animate the logo and the menu button into place
  gsap.timeline({ delay: 0.5 })
    .from('.logo', { y: -40, opacity: 0, duration: 2, ease: 'power4' })
    .from('.nav-btn__svg rect', {
      scale: 0, transformOrigin: 'center right', duration: 0.6, ease: 'power4', stagger: 0.1,
    }, 0.6)
    .to('.nav-rect', {
      scale: 0.8, transformOrigin: 'center left', duration: 0.4, ease: 'power2', stagger: 0.1,
    }, '-=0.6');

  navBtn.addEventListener('mouseover', () => {
    gsap.to('.nav-rect', { scaleX: 1, transformOrigin: 'top left', duration: 0.4, ease: 'power4' });
  });

  navBtn.addEventListener('mouseout', () => {
    gsap.to('.nav-rect', { scaleX: 0.8, transformOrigin: 'top left', duration: 0.6, ease: 'power4' });
  });
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && e.target === document.body) {
    e.preventDefault();
    shuffle();
  }
});

applyDesign(generateDesign());

window.addEventListener('load', () => {
  initHeader();
  animateIn();
});
