document.addEventListener('DOMContentLoaded', () => {

  // Preloader
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => preloader.classList.add('hide'));
  setTimeout(() => preloader.classList.add('hide'), 1200);

  // Header scroll state
  const header = document.getElementById('siteHeader');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 60;
    header.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('show', window.scrollY > 500);
  });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  // Animated stat counters
  const statNums = document.querySelectorAll('.stat-num');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('pt-BR');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('pt-BR');
    };
    requestAnimationFrame(step);
  };
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statNums.forEach(el => statsObserver.observe(el));

  // Gallery filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const artCards = document.querySelectorAll('.art-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      artCards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden-card', !match);
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxArtist = document.getElementById('lightboxArtist');
  const lightboxTech = document.getElementById('lightboxTech');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.art-card-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      lightboxImg.src = btn.dataset.img;
      lightboxImg.alt = btn.dataset.title;
      lightboxTitle.textContent = btn.dataset.title;
      lightboxArtist.textContent = `${btn.dataset.artist} · ${btn.dataset.year}`;
      lightboxTech.textContent = btn.dataset.tech;
      lightboxDesc.textContent = btn.dataset.desc;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  // Broken image fallback
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.background = 'linear-gradient(135deg, #d9cfa9, #8b7142)';
      img.alt = img.alt || 'Imagem indisponível';
    }, { once: true });
  });

  // Contact form (demo submit, no backend)
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.textContent = 'Mensagem enviada com sucesso. Obrigado pelo contato!';
    form.reset();
    setTimeout(() => formStatus.textContent = '', 5000);
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

});
