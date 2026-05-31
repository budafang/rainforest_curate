// 照亮雨林計畫策展提案網站 — script.js

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// --- Hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close on link click
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// --- Scroll fade-in ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.about-card, .award-badge, .timeline-content, .ex-section, .partner-card, .vl-item, .proposal-block'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// --- Village filter ---
const filterBtns = document.querySelectorAll('.filter-btn');
const villageItems = document.querySelectorAll('.vl-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const year = btn.dataset.year;
    villageItems.forEach(item => {
      if (year === 'all' || item.dataset.year === year) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// --- Stats counter animation ---
function animateCount(el, target, suffix) {
  let start = 0;
  const duration = 1200;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const current = Math.floor(progress * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsSection = document.getElementById('stats');
let statsDone = false;
const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !statsDone) {
    statsDone = true;
    // We won't re-animate the DOM stat numbers to avoid breaking sup tags
    // Just a simple pulse class
    statsSection.querySelectorAll('.stat-number').forEach(el => {
      el.style.transition = 'color 0.4s';
      el.style.color = '#fff';
      setTimeout(() => { el.style.color = ''; }, 400);
    });
  }
}, { threshold: 0.5 });
statsObserver.observe(statsSection);

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--green-mid)'
      : '';
  });
}, { passive: true });
