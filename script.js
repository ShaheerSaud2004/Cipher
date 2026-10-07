// Cipher Consulting: mobile menu, footer year, active nav link. The page works without this file.

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('mobile-menu');
const setMenu = (open) => {
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? 'Close' : 'Menu';
  menu.hidden = !open;
};
menuBtn.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });

const links = [...document.querySelectorAll('.nav a[href^="#"]')];
const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if (sections.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => io.observe(s));
}
