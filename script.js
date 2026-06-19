const cursorGlow = document.getElementById('cursorGlow');
const heroPanel = document.getElementById('heroPanel');
const cards = document.querySelectorAll('.link-card');
const music = document.getElementById('bgMusic');

function playMusic() {
  if (!music) return;
  music.volume = 0.38;
  music.muted = false;
  const p = music.play();
  if (p && typeof p.catch === 'function') p.catch(() => {});
}

playMusic();
['pointerdown', 'pointermove', 'touchstart', 'keydown', 'click'].forEach((eventName) => {
  window.addEventListener(eventName, playMusic, { passive: true, once: true });
});

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) playMusic();
});

window.addEventListener('pointermove', (event) => {
  const x = event.clientX;
  const y = event.clientY;
  cursorGlow.style.setProperty('--x', `${x}px`);
  cursorGlow.style.setProperty('--y', `${y}px`);

  if (window.innerWidth < 900) return;
  const rect = heroPanel.getBoundingClientRect();
  const rotateY = ((x - (rect.left + rect.width / 2)) / rect.width) * 4;
  const rotateX = -((y - (rect.top + rect.height / 2)) / rect.height) * 4;
  heroPanel.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

window.addEventListener('pointerleave', () => {
  heroPanel.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg)';
});
heroPanel.addEventListener('mouseleave', () => {
  heroPanel.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg)';
});

cards.forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    if (window.innerWidth < 900) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / rect.width) * 6;
    const rotateX = -((y - rect.height / 2) / rect.height) * 6;
    card.style.transform = `translateY(-8px) scale(1.016) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});
