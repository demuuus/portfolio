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

  const path = window.location.pathname;
  const links = document.querySelectorAll('.nav-btn');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const isHome = (path.endsWith('index.html') || path === '/' || path.endsWith('/')) && href.includes('index.html');
    const isProjects = path.includes('projects.html') && href.includes('projects.html');
    const isContact = path.includes('contact.html') && href.includes('contact.html');
    const isAbout = path.includes('about.html') && href.includes('about.html');
    if (isHome || isProjects || isContact || isAbout) link.classList.add('active');
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

// ── PROJECT FILTER ──
function filter(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.proj-grid .proj-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.c === cat) ? '' : 'none';
  });
}

// Show success message if redirected back after form submit
if (window.location.search.includes('sent=true')) {
  const msg = document.getElementById('ok-msg');
  if (msg) msg.style.display = 'block';
}