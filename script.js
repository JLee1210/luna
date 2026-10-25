// Add photos or videos to assets/, then set src. For videos, also set type: 'video'.
const photos = [
  { src: 'assets/us-night.jpg', alt: 'Us together under the city lights' },
  { src: 'assets/us-adventure.jpg', alt: 'Our adventure by the coast' },
  { src: 'assets/our-memory.mp4', type: 'video', alt: 'A little memory of us', poster: 'assets/us-night.jpg' },
];

photos.forEach((photo, index) => {
  if (!photo.src) return;
  const media = document.createElement(photo.type === 'video' ? 'video' : 'img');
  media.src = photo.src;
  if (photo.type === 'video') {
    media.controls = true;
    media.playsInline = true;
    media.preload = 'metadata';
    media.setAttribute('aria-label', photo.alt);
    if (photo.poster) media.poster = photo.poster;
  } else {
    media.alt = photo.alt;
    media.loading = 'lazy';
  }
  document.querySelector(`[data-photo="${index + 1}"]`).replaceChildren(media);
});

const noButton = document.getElementById('no-button');
const hint = document.getElementById('button-hint');
let escapes = 0;
let lastEscape = 0;
const hints = ['NO used teleport!', 'nice try, squirtle :)', 'NO fled the battle!', 'maybe try the green one? ♥'];

function escapeNo(event) {
  if (event) event.preventDefault();
  if (performance.now() - lastEscape < 150) return;
  lastEscape = performance.now();
  const rect = noButton.getBoundingClientRect();
  const padding = 20;
  const maxX = Math.max(padding, window.innerWidth - rect.width - padding);
  const maxY = Math.max(padding, window.innerHeight - rect.height - padding);
  const pointerX = event?.clientX ?? rect.left;
  const pointerY = event?.clientY ?? rect.top;
  let x, y;
  // Choose the furthest of several positions so the button never moves under the cursor.
  let bestDistance = -1;
  for (let attempt = 0; attempt < 16; attempt++) {
    const candidateX = padding + Math.random() * (maxX - padding);
    const candidateY = padding + Math.random() * (maxY - padding);
    const distance = Math.hypot(candidateX + rect.width / 2 - pointerX, candidateY + rect.height / 2 - pointerY);
    if (distance > bestDistance) { x = candidateX; y = candidateY; bestDistance = distance; }
  }
  noButton.classList.add('escaping');
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
  hint.textContent = hints[Math.min(escapes++, hints.length - 1)];
}

document.addEventListener('pointermove', event => {
  if (dialog.open || event.pointerType === 'touch') return;
  const rect = noButton.getBoundingClientRect();
  if (event.clientX > rect.left - 35 && event.clientX < rect.right + 35 && event.clientY > rect.top - 35 && event.clientY < rect.bottom + 35) escapeNo(event);
});
noButton.addEventListener('pointerdown', escapeNo);
noButton.addEventListener('click', escapeNo);
noButton.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') escapeNo(event);
});
function resetNo() {
  noButton.classList.remove('escaping');
  noButton.style.left = '';
  noButton.style.top = '';
}
window.addEventListener('resize', resetNo);

const dialog = document.getElementById('yes-dialog');
document.getElementById('yes-button').addEventListener('click', () => {
  resetNo();
  dialog.showModal();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const container = document.getElementById('confetti');
  for (let index = 0; index < 65; index++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = ['#a477e2', '#68e76a', '#ff668c', '#ffda69'][index % 4];
    piece.style.animationDelay = `${Math.random() * .7}s`;
    piece.style.setProperty('--drift', `${(Math.random() - .5) * 250}px`);
    container.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
});
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
document.getElementById('back-button').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }
});
