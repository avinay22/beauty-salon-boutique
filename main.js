/* ══════════════════════════════════════════════════════
   THE BEAUTY SALON & BOUTIQUE — main.js
   ══════════════════════════════════════════════════════ */

/* ── Navbar scroll behaviour ── */
const navbar = document.getElementById('navbar');
const floatBook = document.getElementById('floatBook');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 40);
  floatBook.classList.toggle('show', y > 500);
}, { passive: true });

/* ── Mobile nav toggle ── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
let navOpen = false;

navToggle.addEventListener('click', () => {
  navOpen = !navOpen;
  navLinks.classList.toggle('open', navOpen);
  navToggle.setAttribute('aria-expanded', navOpen);
  // Animate hamburger → X
  const spans = navToggle.querySelectorAll('span');
  if (navOpen) {
    spans[0].style.cssText = 'transform:translateY(6.5px) rotate(45deg)';
    spans[1].style.cssText = 'opacity:0; transform:scaleX(0)';
    spans[2].style.cssText = 'transform:translateY(-6.5px) rotate(-45deg)';
  } else {
    spans.forEach(s => s.style.cssText = '');
  }
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navOpen = false;
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => s.style.cssText = '');
  });
});

// Close nav on outside click
document.addEventListener('click', (e) => {
  if (navOpen && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
    navOpen = false;
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => s.style.cssText = '');
  }
});

/* ── Scroll Reveal ── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

revealEls.forEach(el => observer.observe(el));

/* ── Hero reveal on load ── */
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 180);
  });
});

/* ── Booking form submit ── */
function handleSubmit(e) {
  e.preventDefault();
  const btn     = document.getElementById('bookBtn');
  const success = document.getElementById('formSuccess');

  btn.disabled = true;
  btn.innerHTML = '<span>Sending…</span>';

  setTimeout(() => {
    btn.style.display = 'none';
    success.classList.add('show');

    // Build WhatsApp message from form data
    const name    = document.getElementById('name').value.trim();
    const phone   = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const date    = document.getElementById('date').value;
    const time    = document.getElementById('time').value;

    const msg = encodeURIComponent(
      `Hello! I'd like to book an appointment.\n\n` +
      `Name: ${name}\nPhone: ${phone}\nService: ${service}\nDate: ${date}\nTime: ${time}`
    );

    // Auto-open WhatsApp after 1.2s
    setTimeout(() => {
      window.open(`https://wa.me/918399020832?text=${msg}`, '_blank');
    }, 1200);
  }, 1000);
}

/* ── Smooth anchor scroll (offset for fixed nav) ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const id = this.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h')) || 76;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── Set minimum date to today for booking form ── */
(function setMinDate() {
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
})();

/* ── Parallax for hero image (subtle) ── */
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (!hero) return;
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    hero.style.backgroundPositionY = `calc(20% + ${scrolled * 0.25}px)`;
  }
}, { passive: true });
