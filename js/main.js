/* ═══════════════════════════════════
   KALPA STUDIO — Core JS
═══════════════════════════════════ */

// ── CURSOR ──
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
if (cursor && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animCursor() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    ring.style.left   = rx + 'px'; ring.style.top   = ry + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();
}

// ── NAV SCROLL ──
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── HAMBURGER ──
const ham = document.querySelector('.nav-hamburger');
const mobileNav = document.querySelector('.mobile-nav');
if (ham && mobileNav) {
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── SCROLL REVEAL ──
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── MORPHING TEXT ──
function startMorphText(el, words, speed = 2200) {
  const gen = (el._morphGen = (el._morphGen || 0) + 1);
  let i = 0, charI = 0, deleting = false, current = '';
  const tick = () => {
    if (el._morphGen !== gen) return; // cancelled by new call
    const target = words[i];
    if (!deleting) {
      current = target.slice(0, ++charI);
      if (charI === target.length) { deleting = true; return setTimeout(tick, speed); }
    } else {
      current = target.slice(0, --charI);
      if (charI === 0) { deleting = false; i = (i + 1) % words.length; }
    }
    el.textContent = current;
    setTimeout(tick, deleting ? 40 : 80);
  };
  tick();
}
function initMorphElements(lang) {
  const l = lang || (window.getCurrentLang ? window.getCurrentLang() : 'es');
  document.querySelectorAll('[data-morph-en]').forEach(el => {
    const raw = l === 'en' ? el.dataset.morphEn : (el.dataset.morphEs || el.dataset.morphEn || '');
    const words = raw.split(',').map(s => s.trim()).filter(Boolean);
    if (words.length) startMorphText(el, words);
  });
}
initMorphElements();
document.addEventListener('langchange', e => initMorphElements(e.detail.lang));

// ── CART HELPERS ──
function getCart() {
  try { return JSON.parse(localStorage.getItem('ks_cart') || '[]'); }
  catch { return []; }
}
function saveCart(cart) { localStorage.setItem('ks_cart', JSON.stringify(cart)); }
function cartTotal() { return getCart().reduce((s, i) => s + i.price * i.qty, 0); }
function cartCount() { return getCart().reduce((s, i) => s + i.qty, 0); }
function updateCartBadge() {
  document.querySelectorAll('.cart-count').forEach(el => {
    const c = cartCount();
    el.textContent = c;
    el.style.display = c > 0 ? 'inline-flex' : 'none';
  });
}
function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  saveCart(cart);
  updateCartBadge();
  showToast('Added to cart ✓');
}
window.addToCart = addToCart;
updateCartBadge();

// ── TOAST ──
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._tid);
  t._tid = setTimeout(() => t.classList.remove('show'), 2500);
}
window.showToast = showToast;

// ── COUNTDOWN ──
function startCountdown(targetDate) {
  const units = { days: null, hours: null, minutes: null, seconds: null };
  ['days','hours','minutes','seconds'].forEach(k => {
    units[k] = document.querySelector(`[data-countdown="${k}"]`);
  });
  if (!units.days) return;
  const tick = () => {
    const diff = new Date(targetDate) - Date.now();
    if (diff <= 0) { Object.values(units).forEach(el => el && (el.textContent = '00')); return; }
    const s = Math.floor(diff / 1000);
    if (units.days)    units.days.textContent    = String(Math.floor(s / 86400)).padStart(2,'0');
    if (units.hours)   units.hours.textContent   = String(Math.floor((s % 86400) / 3600)).padStart(2,'0');
    if (units.minutes) units.minutes.textContent = String(Math.floor((s % 3600) / 60)).padStart(2,'0');
    if (units.seconds) units.seconds.textContent = String(s % 60).padStart(2,'0');
  };
  tick(); setInterval(tick, 1000);
}
const ctEl = document.querySelector('[data-countdown-target]');
if (ctEl) startCountdown(ctEl.dataset.countdownTarget);

// ── PRODUCTS STORE (localStorage) ──
function getProducts() {
  const stored = localStorage.getItem('ks_products');
  if (stored) try { return JSON.parse(stored); } catch {}
  // Default seed products
  const defaults = [
    { id: 'p1', name: 'Brand Identity Package', cat: 'Branding', price: 299, oldPrice: 399, desc: 'Complete brand system: logo, colors, typography, guidelines.', badge: 'Popular', status: 'active', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80' },
    { id: 'p2', name: 'Web Design — Landing Page', cat: 'Web Design', price: 199, oldPrice: null, desc: 'Custom landing page design with mobile-first approach.', badge: '', status: 'active', img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80' },
    { id: 'p3', name: 'UI/UX Audit', cat: 'Consulting', price: 149, oldPrice: null, desc: 'Full interface audit with actionable recommendations.', badge: 'New', status: 'active', img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80' },
    { id: 'p4', name: 'Full Website Design', cat: 'Web Design', price: 799, oldPrice: 999, desc: 'Multi-page website design: up to 8 pages, responsive.', badge: 'Best Value', status: 'active', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
    { id: 'p5', name: 'Social Media Kit', cat: 'Branding', price: 99, oldPrice: null, desc: 'Templates for Instagram, LinkedIn & Twitter/X.', badge: '', status: 'active', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80' },
    { id: 'p6', name: 'Monthly Retainer — Design', cat: 'Consulting', price: 499, oldPrice: null, desc: '20h/month dedicated design support and iterations.', badge: '', status: 'draft', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80' },
  ];
  localStorage.setItem('ks_products', JSON.stringify(defaults));
  return defaults;
}
function saveProducts(products) { localStorage.setItem('ks_products', JSON.stringify(products)); }
window.getProducts = getProducts;
window.saveProducts = saveProducts;

// ── ACTIVE NAV LINK ──
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});
