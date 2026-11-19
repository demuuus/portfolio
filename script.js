// ── THEME ──
(function () {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateToggleIcon();
}

function updateToggleIcon() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.textContent = isDark ? '☀️' : '🌙';
  btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
}

// ── NAV ACTIVE ──
document.addEventListener('DOMContentLoaded', () => {
  updateToggleIcon();

  // Project detail pages highlight "Projects"; "/" resolves to index.html.
  const page = document.querySelector('.project-detail')
    ? 'projects.html'
    : (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-btn').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.split('/').pop() === page) link.classList.add('active');
  });
});

// ── CONTACT FORM ──
function submitForm() {
  const msg = document.getElementById('ok-msg');
  if (msg) {
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 5000);
  }
}

// Show success message if redirected back after form submit
if (window.location.search.includes('sent=true')) {
  const msg = document.getElementById('ok-msg');
  if (msg) msg.style.display = 'block';
}

function toggleMenu() {
  const links = document.getElementById('nav-links');
  const hamburger = document.getElementById('hamburger');
  links.classList.toggle('open');
  hamburger.classList.toggle('open');
}

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-links .nav-btn').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-links').classList.remove('open');
    document.getElementById('hamburger').classList.remove('open');
  });
});

// ── SCROLL REVEAL ──
// Content is fully visible without JS; motion is only enabled when allowed.
(function () {
  const sections = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!sections.length || reduceMotion || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('motion');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  sections.forEach(section => observer.observe(section));
})();
