/**
 * PORTFOLIO CLIENT APPLICATION SCRIPT
 * Author: Ihsan Defriyadi
 * Feature: Theme toggle, scroll-spy, filters, interactive modal, contact handler, stats counter
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initStatsCounter();
  initProjectFilters();
  initProjectModal();
  initClipboard();
  initContactForm();
});

/* ===================================================================
   1. Theme Toggle (Dark / Light) with LocalStorage Persistence
   =================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const storedTheme = localStorage.getItem('ihsan_portfolio_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme, themeIcon);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('ihsan_portfolio_theme', nextTheme);
      updateThemeIcon(nextTheme, themeIcon);
      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  }
}

function updateThemeIcon(theme, iconElem) {
  if (!iconElem) return;
  if (theme === 'light') {
    // Moon icon for light mode (to switch back to dark)
    iconElem.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
  } else {
    // Sun icon for dark mode (to switch to light)
    iconElem.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
  }
}

/* ===================================================================
   2. Sticky Navigation, Scroll-Spy & Mobile Drawer
   =================================================================== */
function initNavigation() {
  const header = document.querySelector('.header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll listener for sticky header & scroll spy
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header background change
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy for active link
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) activeLink.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ===================================================================
   3. Animated Stat Counters
   =================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseFloat(stat.getAttribute('data-target'));
          const suffix = stat.getAttribute('data-suffix') || '';
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const duration = 1500;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              clearInterval(timer);
              stat.textContent = (isDecimal ? target.toFixed(1) : Math.round(target)) + suffix;
            } else {
              stat.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) observer.observe(statsBar);
}

/* ===================================================================
   4. Project Category Filter
   =================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ===================================================================
   5. Project Interactive Modal Showcase
   =================================================================== */
const projectDetailsData = {
  ivo: {
    title: 'IVO Reporting System & Enterprise Dashboard',
    category: 'Full-Stack & Laravel',
    image: 'assets/images/project-ivo.png',
    overview: 'A high-performance enterprise data management and automated reporting system. Engineered to classify vast data streams, handle heavy analytics queries with low latency, and produce interactive KPI charts for executive stakeholders.',
    features: [
      'Automated background data classification and anomaly detection',
      'Role-based access control (RBAC) with granular admin permissions',
      'Interactive financial and metric visualization with export to Excel & PDF',
      'Optimized database queries with indexing, cutting query duration significantly'
    ],
    tech: ['Laravel', 'PHP 8', 'MySQL', 'Chart.js', 'REST API', 'Redis'],
    demoUrl: 'https://dash.infinityfree.com',
    repoUrl: 'https://github.com/IhsanDetr'
  },
  nlp: {
    title: 'Lexi-AI: NLP Topic Modeling & Sentiment Analytics',
    category: 'Data Science & NLP',
    image: 'assets/images/project-nlp.png',
    overview: 'An advanced machine learning pipeline developed for processing, clustering, and classifying natural language feedback (integrated with Ripple10 and customer intelligence). Utilizes LDA topic modeling and sentiment classification.',
    features: [
      'Automated text pre-processing: tokenization, lemmatization, and stop-word filtering',
      'Interactive topic network clustering graph visualizing semantic relationships',
      'Sentiment distribution breakdown with multi-class probability scoring',
      'REST API endpoint for real-time inference on newly ingested reviews'
    ],
    tech: ['Python', 'Topic Modeling', 'Scikit-Learn', 'NLTK / SpaCy', 'Flask API', 'Pandas'],
    demoUrl: '#',
    repoUrl: 'https://github.com/IhsanDetr'
  },
  gesture: {
    title: 'Cyber Clash: Motion Gesture Interactive Web Game',
    category: 'Interactive & Games',
    image: 'assets/images/project-gesture.png',
    overview: 'A zero-install, browser-based motion-tracking arcade game. Uses client-side computer vision and web cameras to track hand landmarks in real time, enabling natural gesture inputs to control shields, pulses, and dashes.',
    features: [
      'Low-latency 60FPS hand tracking directly inside the web browser',
      'Real-time collision physics and particle animations via HTML5 Canvas',
      'Dynamic combo score engine and audio-reactive visual effects',
      'Fully responsive UI adapting seamlessly to desktop monitors and laptops'
    ],
    tech: ['JavaScript (ES6+)', 'Computer Vision', 'MediaPipe', 'HTML5 Canvas', 'Web Audio API'],
    demoUrl: 'https://gesture-game.freedev.app',
    repoUrl: 'https://github.com/IhsanDetr'
  },
  powerbi: {
    title: 'Enterprise Power BI Business Intelligence Suite',
    category: 'Data Analytics & BI',
    image: 'assets/images/project-ivo.jpg',
    overview: 'An integrated Business Intelligence ecosystem designed for corporate management. Consolidates disparate sales, marketing, and operational data into clear, actionable executive dashboards.',
    features: [
      'Automated ETL pipelines extracting data from SQL databases and spreadsheets',
      'Advanced DAX measures calculating Year-over-Year (YoY) growth and KPI projections',
      'Interactive drill-through reports allowing micro-analysis down to individual transactions',
      'Scheduled data refreshes ensuring real-time decision making'
    ],
    tech: ['Power BI', 'DAX', 'Power Query (M)', 'SQL', 'Data Modeling', 'Excel Analytics'],
    demoUrl: '#',
    repoUrl: 'https://github.com/IhsanDetr'
  }
};

function initProjectModal() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const detailBtns = document.querySelectorAll('.details-btn');

  if (!modalBackdrop) return;

  detailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectDetailsData[projectId];
      if (data) {
        populateModal(data);
        openModal(modalBackdrop);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => closeModal(modalBackdrop));
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal(modalBackdrop);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal(modalBackdrop);
    }
  });
}

function populateModal(data) {
  document.getElementById('modal-img').src = data.image;
  document.getElementById('modal-img').alt = data.title;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-overview').textContent = data.overview;
  
  const featuresList = document.getElementById('modal-features');
  featuresList.innerHTML = data.features.map(feat => `
    <li class="modal-feature-item">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${feat}</span>
    </li>
  `).join('');

  const techContainer = document.getElementById('modal-tech');
  techContainer.innerHTML = data.tech.map(t => `<span class="tag">${t}</span>`).join('');

  const demoBtn = document.getElementById('modal-demo-btn');
  if (data.demoUrl && data.demoUrl !== '#') {
    demoBtn.href = data.demoUrl;
    demoBtn.style.display = 'inline-flex';
  } else {
    demoBtn.style.display = 'none';
  }

  const repoBtn = document.getElementById('modal-repo-btn');
  if (data.repoUrl) {
    repoBtn.href = data.repoUrl;
  }
}

function openModal(modal) {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

/* ===================================================================
   6. Copy to Clipboard
   =================================================================== */
function initClipboard() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const copyVal = btn.getAttribute('data-copy');
      if (copyVal) {
        navigator.clipboard.writeText(copyVal).then(() => {
          showToast(`Copied to clipboard: ${copyVal}`, 'success');
        }).catch(() => {
          showToast(`Failed to copy to clipboard`, 'error');
        });
      }
    });
  });
}

/* ===================================================================
   7. Contact Form Handler
   =================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      Sending...
    `;
    submitBtn.disabled = true;

    // Simulate sending / preparing mailto
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      contactForm.reset();
      showToast(`Thank you, ${name}! Your message has been prepared.`, 'success');

      // Open mail client draft with prefilled content
      const mailtoUrl = `mailto:ihsandefriyadi25@gmail.com?subject=${encodeURIComponent(subject || 'Inquiry from Portfolio')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;
    }, 900);
  });
}

/* ===================================================================
   8. Global Toast Notification Helper
   =================================================================== */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  const iconSvg = type === 'success' 
    ? `<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger enter animation
  setTimeout(() => toast.classList.add('show'), 20);

  // Auto remove after 3.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
