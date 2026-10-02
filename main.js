/* ══════════════════════════════════════════════════════
   MST BEAUTY SALON — main.js
   Unisex Salon · North Lakhimpur, Assam
   ══════════════════════════════════════════════════════ */

/* ── 1. Navbar Scroll Behaviour ── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
}, { passive: true });

/* ── 2. Mobile Navigation Toggle ── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
let navOpen = false;

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navOpen = !navOpen;
    navLinks.classList.toggle('open', navOpen);
    navToggle.setAttribute('aria-expanded', navOpen);

    // Transform hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => s.style.transform = '');
      spans.forEach(s => s.style.opacity = '1');
    }
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navOpen = false;
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      const spans = navToggle.querySelectorAll('span');
      spans.forEach(s => s.style.transform = '');
      spans.forEach(s => s.style.opacity = '1');
    });
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (navOpen && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      navOpen = false;
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      const spans = navToggle.querySelectorAll('span');
      spans.forEach(s => s.style.transform = '');
      spans.forEach(s => s.style.opacity = '1');
    }
  });
}

/* ── 3. Scroll Reveal Observer ── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => observer.observe(el));

// Hero items immediate reveal sequence
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 150);
  });
});

/* ── 4. Services Category Filtering ── */
const serviceTabs = document.querySelectorAll('#serviceTabs .tab-btn');
const serviceCards = document.querySelectorAll('.service-card');

serviceTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Update active tab button
    serviceTabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    const filter = tab.getAttribute('data-filter');

    // Filter service cards
    serviceCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 30);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 200);
      }
    });
  });
});

/* ── 5. Gallery Category Filtering ── */
const galleryTabs = document.querySelectorAll('#galleryTabs .gallery-tab');
const galleryCards = document.querySelectorAll('.gallery-card');

galleryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    galleryTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.getAttribute('data-filter');

    galleryCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 30);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.96)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 200);
      }
    });
  });
});

/* ── 6. WhatsApp Booking Form Logic ── */
const serviceCatalog = {
  Women: [
    'Beauty Parlour Services',
    'Eyebrow Threading & Shaping',
    'Eyelashes & Extensions',
    'Skin Care, Facials & Acne Care',
    'Acrylic Nails & Mani-Pedi',
    'Makeup & Bridal Services',
    'Tanning, Waxing & Body Care'
  ],
  Men: [
    "Men's Haircut & Fade",
    "Men's Hairstyling",
    'Shampoo & Conditioning',
    'Beard Grooming & Styling',
    'Hair Threading & Brow Detailing'
  ],
  'Premium / Combo': [
    'Hair Extensions',
    'Balayage & Highlights',
    'Luxury Spa Services',
    'Therapeutic Massage',
    'Microblading & Brow Art',
    'Custom Groom / Bridal Combo'
  ]
};

function updateServiceOptions() {
  const selectedRadio = document.querySelector('input[name="genderCategory"]:checked');
  const serviceSelect = document.getElementById('selectedService');
  if (!selectedRadio || !serviceSelect) return;

  const category = selectedRadio.value;
  const services = serviceCatalog[category] || [];

  serviceSelect.innerHTML = '';
  services.forEach(svc => {
    const opt = document.createElement('option');
    opt.value = svc;
    opt.textContent = svc;
    serviceSelect.appendChild(opt);
  });
}

// Initialize options
updateServiceOptions();

// Set minimum date to today
(function setMinBookingDate() {
  const dateInput = document.getElementById('bookingDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
  }
})();

// WhatsApp Form Submit
function handleWaSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById('clientName');
  const serviceInput = document.getElementById('selectedService');
  const dateInput = document.getElementById('bookingDate');
  const timeInput = document.getElementById('bookingTime');
  const notesInput = document.getElementById('specialNotes');

  const name     = nameInput ? nameInput.value.trim() : 'Guest';
  const service  = serviceInput ? serviceInput.value : 'Hair & Grooming';
  const date     = dateInput ? dateInput.value : 'Soonest';
  const time     = timeInput ? timeInput.value : 'Anytime';
  const notes    = notesInput && notesInput.value.trim() ? `\nNotes: ${notesInput.value.trim()}` : '';

  const waMessage = encodeURIComponent(
    `Hi MST Beauty Salon! I want to book an appointment.\n\n` +
    `👤 Name: ${name}\n` +
    `✂ Service: ${service}\n` +
    `📅 Preferred Date: ${date}\n` +
    `⏰ Preferred Slot: ${time}${notes}\n\n` +
    `Please confirm the available slot. Thank you!`
  );

  const waUrl = `https://wa.me/918399020832?text=${waMessage}`;
  window.open(waUrl, '_blank');
}

/* ── 7. Smooth Anchor Scroll with Fixed Navbar Offset ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const id = this.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();

    const navH = 76;
    const topPos = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({
      top: topPos,
      behavior: 'smooth'
    });
  });
});
