document.addEventListener('DOMContentLoaded', () => {
  // ===== NAVBAR SCROLL =====
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ===== SERVICE CARD MODALS =====
  const modalOverlay = document.getElementById('serviceModal');
  const modalImage = modalOverlay.querySelector('.modal-image');
  const modalTitle = modalOverlay.querySelector('.modal-title');
  const modalPrice = modalOverlay.querySelector('.modal-price');
  const modalList = modalOverlay.querySelector('.modal-list');
  const modalNote = modalOverlay.querySelector('.modal-note');

  const serviceData = {
    exterior: {
      title: 'Exterior Detail',
      price: 'Starting at $99',
      image: 'images/IMG_6138.jpg',
      items: [
        'Foam/hand wash (safe contact wash)',
        'Cleaning of wheels, tires, and rims',
        'Wiping down of door jambs',
        'Spot-free rinse',
        'Hand drying with microfiber towels',
        'Application of tire shine',
        'Cleaning of exterior glass',
        'Application of spray wax'
      ]
    },
    interior: {
      title: 'Interior Detail',
      price: 'Starting at $110',
      image: 'images/IMG_7498.jpg',
      items: [
        'Comprehensive interior vacuuming (seats, carpets, trunk, mats)',
        'Thorough cleaning of dashboard, console, doors, and panels',
        'Interior glass cleaned for streak-free finish',
        'Cleaning of cup holders and compartments',
        'Light stain spot treatment',
        'Treatment and dressing of plastic surfaces',
        'Removal of all trash'
      ]
    },
    full: {
      title: 'Full Detail',
      price: 'Starting at $190',
      image: 'images/IMG_7307.jpg',
      items: [
        'Foam/hand wash (safe contact wash)',
        'Cleaning of wheels, tires, and rims',
        'Wiping down of door jambs',
        'Spot-free rinse',
        'Hand drying with microfiber towels',
        'Application of tire shine',
        'Cleaning of exterior glass',
        'Application of spray wax',
        'Comprehensive interior vacuuming (seats, carpets, trunk, mats)',
        'Dashboard, console, doors, and panels cleaned',
        'Interior glass polished for streak-free finish',
        'Cup holders and compartments cleaned',
        'Light stain spot treatment',
        'Plastics treated and dressed',
        'Removal of all trash'
      ]
    },
    paint: {
      title: 'Paint Enhancement',
      price: 'Starting at $450',
      image: 'images/IMG_7221.jpg',
      items: [
        'Foam pre-wash',
        'Hand washing',
        'Cleaning of wheels and tires',
        'Iron decontamination',
        'Clay bar treatment',
        'Paint correction (1-step or 2-step)',
        'Panel preparation wipe',
        'Application of sealant'
      ]
    },
    ceramic: {
      title: 'Ceramic Coating',
      price: 'Starting at $750',
      image: 'images/ceramic.jpg',
      items: [
        'Foam pre-wash',
        'Hand wash',
        'Wheels and tires cleaning',
        'Iron decontamination',
        'Clay bar treatment',
        'Paint correction (1-step or 2-step)',
        'Panel preparation wipe',
        'Ceramic coating application',
        'Coating leveling and buffing',
        'Final inspection',
        'High gloss finish',
        'Hydrophobic protection'
      ]
    }
  };

  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.service;
      const data = serviceData[key];
      if (!data) return;
      modalImage.src = data.image;
      modalImage.alt = data.title;
      modalTitle.textContent = data.title;
      modalPrice.textContent = data.price;
      modalPrice.style.display = data.price ? 'block' : 'none';
      modalList.innerHTML = data.items.map(i => `<li>${i}</li>`).join('');
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // ===== SCROLL REVEAL =====
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));

  // ===== GALLERY HORIZONTAL SCROLL =====
  const track = document.querySelector('.gallery-track');
  if (track) {
    // Mouse wheel → horizontal scroll (only while hovering)
    track.addEventListener('wheel', (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      track.scrollBy({ left: e.deltaY * 2, behavior: 'auto' });
    }, { passive: false });

    // Click-and-drag to scroll
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    track.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      scrollStart = track.scrollLeft;
      track.style.scrollBehavior = 'auto';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const dx = e.pageX - startX;
      track.scrollLeft = scrollStart - dx;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      track.style.scrollBehavior = 'smooth';
    });
  }
});
