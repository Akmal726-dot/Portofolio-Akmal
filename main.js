const API = 'http://localhost:3000/api';

// ─── LOADER ─────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 1800);
});

// ─── CUSTOM CURSOR ───────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

const animateRing = () => {
  ringX += (mouseX - ringX) * 0.1;
  ringY += (mouseY - ringY) * 0.1;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
};
animateRing();

document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '18px';
    cursor.style.height = '18px';
    cursorRing.style.width = '50px';
    cursorRing.style.height = '50px';
    cursorRing.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursorRing.style.width = '36px';
    cursorRing.style.height = '36px';
    cursorRing.style.opacity = '0.5';
  });
});

// ─── NAVBAR SCROLL ───────────────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── SMOOTH SCROLL ───────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ─── SCROLL REVEAL ───────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left').forEach(el => {
  revealObserver.observe(el);
});

// ─── SKILL BAR ANIMATION ─────────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

// ─── COUNTER ANIMATION ───────────────────────────────
const animateCounter = (el, target) => {
  let count = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    count += step;
    if (count >= target) { count = target; clearInterval(timer); }
    el.textContent = Math.floor(count) + (el.dataset.suffix || '');
  }, 20);
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

// ─── LOAD PROFILE ────────────────────────────────────
const loadProfile = async () => {
  try {
    const res = await fetch(`${API}/profile`);
    const { data } = await res.json();
    if (!data) return;

    const heroNameEl = document.getElementById('hero-name');
    const heroTitleEl = document.getElementById('hero-title');
    const heroBioEl = document.getElementById('hero-bio');
    const heroAvatarEl = document.getElementById('hero-avatar');

    if (heroNameEl && heroNameEl.textContent.trim() === 'Nama Kamu') {
      heroNameEl.innerHTML = data.name?.split(' ').map((w, i) =>
        i === data.name.split(' ').length - 1 ? `<em>${w}</em>` : w
      ).join(' ') || 'Nama <em>Kamu</em>';
    }

    if (heroTitleEl && heroTitleEl.textContent.trim() === 'Full Stack Developer') {
      heroTitleEl.textContent = data.title || 'Full Stack Developer';
    }

    if (heroBioEl && heroBioEl.textContent.trim() === 'Membangun pengalaman digital yang elegan dan fungsional dengan teknologi modern.') {
      heroBioEl.textContent = data.bio || 'Membangun pengalaman digital yang elegan dan fungsional dengan teknologi modern.';
    }

    if (heroAvatarEl && heroAvatarEl.src.includes('api.dicebear.com')) {
      heroAvatarEl.src = data.avatar_url || heroAvatarEl.src;
    }

    const aboutNameEl = document.getElementById('about-name');
    const aboutEmailEl = document.getElementById('about-email');
    const aboutPhoneEl = document.getElementById('about-phone');
    const aboutLocationEl = document.getElementById('about-location');
    const aboutGithubEl = document.getElementById('about-github');
    const aboutLinkedinEl = document.getElementById('about-linkedin');

    if (aboutNameEl && aboutNameEl.textContent.trim() === '—') {
      aboutNameEl.textContent = data.name || '—';
    }
    if (aboutEmailEl && aboutEmailEl.textContent.trim() === '—') {
      aboutEmailEl.textContent = data.email || '—';
      aboutEmailEl.href = data.email ? 'mailto:' + data.email : '#';
    }
    if (aboutPhoneEl && aboutPhoneEl.textContent.trim() === '—') {
      aboutPhoneEl.textContent = data.phone || '—';
    }
    if (aboutLocationEl && aboutLocationEl.textContent.trim() === '—') {
      aboutLocationEl.textContent = data.location || '—';
    }
    if (aboutGithubEl && aboutGithubEl.textContent.trim() === '—') {
      aboutGithubEl.textContent = data.github || '—';
      aboutGithubEl.href = data.github || '#';
    }
    if (aboutLinkedinEl && aboutLinkedinEl.textContent.trim() === '—') {
      aboutLinkedinEl.textContent = 'LinkedIn';
      aboutLinkedinEl.href = data.linkedin || '#';
    }
  } catch (e) {
    console.warn('Gagal load profile:', e);
  }
};

// ─── LOAD SKILLS ─────────────────────────────────────
const loadSkills = async () => {
  const container = document.getElementById('skills-grid');
  if (!container) return;
  try {
    const res = await fetch(`${API}/skills`);
    const { data } = await res.json();
    container.innerHTML = '';
    data.forEach((skill, i) => {
      const card = document.createElement('div');
      card.className = 'skill-card reveal';
      card.style.animationDelay = (i * 0.05) + 's';
      card.innerHTML = `
        <div class="skill-header">
          <div class="skill-name">
            <span class="skill-icon">${skill.icon || '⚙️'}</span>
            ${skill.name}
          </div>
          <span class="skill-pct">${skill.level}%</span>
        </div>
        <div class="skill-bar">
          <div class="skill-fill" data-width="${skill.level}"></div>
        </div>
        <div class="skill-category">${skill.category || ''}</div>
      `;
      container.appendChild(card);
      revealObserver.observe(card);
    });
    skillObserver.observe(container);
  } catch (e) {
    console.warn('Gagal load skills:', e);
  }
};

// ─── LOAD PROJECTS ───────────────────────────────────
const emojiMap = ['💻','🚀','🌐','📱','🎯','⚡','🔥','🎨'];
const loadProjects = async () => {
  const container = document.getElementById('projects-grid');
  if (!container) return;
  try {
    const res = await fetch(`${API}/projects`);
    const { data } = await res.json();
    container.innerHTML = '';
    data.forEach((project, i) => {
      const card = document.createElement('div');
      card.className = 'project-card reveal';
      const techs = Array.isArray(project.tech_stack)
        ? project.tech_stack.map(t => `<span class="tech-tag">${t}</span>`).join('')
        : '';
      card.innerHTML = `
        <div class="project-image">
          ${project.featured ? '<span class="featured-badge">★ Featured</span>' : ''}
          ${emojiMap[i % emojiMap.length]}
        </div>
        <div class="project-body">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description || ''}</p>
          <div class="project-tech">${techs}</div>
          <div class="project-links">
            ${project.github_url ? `<a href="${project.github_url}" target="_blank" class="project-link">GitHub →</a>` : ''}
            ${project.live_url ? `<a href="${project.live_url}" target="_blank" class="project-link">Live Demo →</a>` : ''}
          </div>
        </div>
      `;
      container.appendChild(card);
      revealObserver.observe(card);
    });
  } catch (e) {
    console.warn('Gagal load projects:', e);
  }
};

// ─── LOAD EXPERIENCE ─────────────────────────────────
const loadExperience = async () => {
  const container = document.getElementById('timeline');
  if (!container) return;
  try {
    const res = await fetch(`${API}/experiences`);
    const { data } = await res.json();
    container.innerHTML = '';
    data.forEach((exp, i) => {
      const item = document.createElement('div');
      item.className = 'timeline-item reveal-left';
      item.style.transitionDelay = (i * 0.1) + 's';
      item.innerHTML = `
        <div class="timeline-period">${exp.period || ''}</div>
        <div class="timeline-role">
          ${exp.role}
          ${exp.current ? '<span class="current-badge">Sekarang</span>' : ''}
        </div>
        <div class="timeline-company">${exp.company}</div>
        <p class="timeline-desc">${exp.description || ''}</p>
      `;
      container.appendChild(item);
      revealObserver.observe(item);
    });
  } catch (e) {
    console.warn('Gagal load experience:', e);
  }
};

// ─── CONTACT FORM ────────────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-send');
    const status = document.getElementById('form-status');
    btn.disabled = true;
    btn.textContent = 'Mengirim...';
    const body = {
      name: document.getElementById('c-name').value,
      email: document.getElementById('c-email').value,
      message: document.getElementById('c-message').value,
    };
    try {
      const res = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        status.textContent = '✓ Pesan berhasil dikirim! Terima kasih.';
        status.className = 'form-status success';
        contactForm.reset();
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      status.textContent = '✗ Gagal mengirim pesan. Coba lagi.';
      status.className = 'form-status error';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Kirim Pesan →';
      setTimeout(() => status.className = 'form-status', 4000);
    }
  });
}

// ─── ABOUT COUNTER ───────────────────────────────────
const aboutSection = document.getElementById('about');
if (aboutSection) counterObserver.observe(aboutSection);

// ─── INIT ─────────────────────────────────────────────
(async () => {
  await Promise.all([loadProfile(), loadSkills(), loadProjects(), loadExperience()]);
})();
