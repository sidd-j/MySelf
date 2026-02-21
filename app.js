/* =====================================================
   app.js — reads data.json, renders entire portfolio
===================================================== */

const CAT_ICONS = { game: '🎮', app: '📱', web: '🌐' };
const CAT_LABELS = { game: 'Game', app: 'App', web: 'Web' };

/* ── Placeholder image generator using canvas ── */
function makePlaceholderSVG(title, color = '#1c1c21') {
    const icon = CAT_ICONS[color] || '⬡';
    return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="450">
      <rect width="800" height="450" fill="${color}22"/>
      <rect width="800" height="450" fill="url(#g)"/>
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#0d0d0f" stop-opacity="0.9"/>
        </linearGradient>
      </defs>
      <text x="400" y="200" text-anchor="middle" font-size="72" opacity="0.25">${icon}</text>
      <text x="400" y="270" text-anchor="middle" font-family="Georgia,serif" font-size="24" fill="#ffffff" opacity="0.5">${title}</text>
    </svg>
  `)}`;
}

/* ── Escape HTML ── */
function esc(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ── Tag pills ── */
function renderTags(tags, cls = '') {
    return tags.map(t => `<span class="${cls}">${esc(t)}</span>`).join('');
}

/* =====================================================
   RENDER FUNCTIONS
===================================================== */

function renderNav(p) {
    document.getElementById('nav-gh').href = p.github;
}

function renderHero(p) {
    document.getElementById('hero-status').textContent = p.status;
    document.getElementById('hero-loc').textContent = p.location;
    document.getElementById('hero-gh-btn').href = p.github;

    // Headline with gradient on key words
    const parts = p.tagline.split(',');
    document.getElementById('hero-h1').innerHTML =
        `I build<br/><span class="grad">${esc(parts[0].replace('I build', '').trim())}</span><br/>&amp; tools.`;

    document.getElementById('hero-desc').innerHTML =
        `Full-stack developer specialising in <strong>Unity 3D games</strong>,
     <strong>Flutter apps</strong>, and <strong>Node.js backends</strong>.
     I love turning ideas into shipped products.`;
}

function renderCodeCard(p) {
    const lines = [
        [`{`, 't-b'],
        [`  <span class="t-k">"name"</span><span class="t-p">:</span>     <span class="t-s">"${esc(p.name)}"</span><span class="t-p">,</span>`, ''],
        [`  <span class="t-k">"role"</span><span class="t-p">:</span>     <span class="t-s">"Developer"</span><span class="t-p">,</span>`, ''],
        [`  <span class="t-k">"location"</span><span class="t-p">:</span> <span class="t-s">"${esc(p.location)}"</span><span class="t-p">,</span>`, ''],
        [`  <span class="t-k">"cgpa"</span><span class="t-p">:</span>     <span class="t-n">${esc(p.cgpa)}</span><span class="t-p">,</span>`, ''],
        [`  <span class="t-k">"focus"</span><span class="t-p">:</span> <span class="t-b">[</span>`, ''],
        [`    <span class="t-s">"Game Dev"</span><span class="t-p">,</span>`, ''],
        [`    <span class="t-s">"Mobile Apps"</span><span class="t-p">,</span>`, ''],
        [`    <span class="t-s">"Backend APIs"</span>`, ''],
        [`  <span class="t-b">]</span><span class="t-p">,</span>`, ''],
        [`  <span class="t-k">"status"</span><span class="t-p">:</span>   <span class="t-s">"${esc(p.status)}"</span> <span class="cursor-blink">▌</span>`, ''],
        [`}`, 't-b'],
    ];
    document.getElementById('code-card').innerHTML =
        lines.map(([html, cls]) => cls ? `<span class="${cls}">${html}</span>` : html).join('\n');
}

function renderStats(stats) {
    const el = document.getElementById('stats-strip');
    el.innerHTML = stats.map((s, i) =>
        `${i > 0 ? '<div class="stat-sep"></div>' : ''}
     <div class="stat-item reveal">
       <span class="stat-val">${esc(s.value)}</span>
       <span class="stat-lbl">${esc(s.label)}</span>
     </div>`
    ).join('');
}

function renderMarquee(stack) {
    const items = stack.flatMap(s => s.items);
    // Duplicate for seamless loop
    const all = [...items, ...items];
    document.getElementById('marquee').innerHTML =
        all.map(i => `<span>${esc(i)}</span><span>·</span>`).join('');
}

function renderAbout(p) {
    document.getElementById('about-p1').innerHTML =
        `I'm a <strong>Computer Science student (CGPA ${esc(p.cgpa)})</strong> at ${esc(p.college)},
     with hands-on experience building production apps and games.
     I work across the full stack — from pixel-perfect UIs to robust backends and multiplayer game systems.`;
    document.getElementById('about-p2').innerHTML =
        `Outside of code I tinker with 3D modelling in Blender, explore AI tools, and compete in hackathons —
     <strong>1st place at MVM Expogen 2024–25</strong> and finalist at multiple competitions.`;
    document.getElementById('about-links').innerHTML = `
    <a href="${esc(p.github)}"   target="_blank">GitHub ↗</a>
    <a href="${esc(p.linkedin)}" target="_blank">LinkedIn ↗</a>
    <a href="mailto:${esc(p.email)}">Email ↗</a>`;
}

function renderExperience(exp) {
    document.getElementById('exp-list').innerHTML = exp.map(e => `
    <div class="exp-card reveal">
      <div class="exp-card-header">
        <div>
          <span class="exp-role">${esc(e.role)}</span>
          <span class="exp-co">${esc(e.company)}</span>
          ${e.current ? '<span class="exp-current">● Current</span>' : ''}
        </div>
        <span class="exp-period">${esc(e.period)}</span>
      </div>
      <ul class="exp-points">
        ${e.points.map(pt => `<li>${esc(pt).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`).join('')}
      </ul>
      <div class="exp-tags">${renderTags(e.tags)}</div>
    </div>`
    ).join('');
}

/* ── Projects ── */
let allProjects = [];

function renderProjects(projects) {
    allProjects = projects;
    renderFeatured(projects);
    renderSmall(projects);
}

function imgEl(proj, cls = '') {
    const placeholder = makePlaceholderSVG(proj.title, proj.color || '#1c1c21');
    return `
    <img
      src="${esc(proj.image)}"
      alt="${esc(proj.title)}"
      loading="lazy"
      class="${cls}"
      onerror="this.onerror=null;this.src='${placeholder}'"
    />`;
}

function renderFeatured(projects) {
    const featured = projects.filter(p => p.featured);
    document.getElementById('featured-row').innerHTML = featured.map(p => `
    <div class="proj-feat reveal" data-id="${esc(p.id)}" data-cat="${esc(p.category)}">
      <div class="proj-feat-img">
        ${imgEl(p)}
        <div class="proj-img-placeholder">
          <span class="ph-icon">${CAT_ICONS[p.category] || '📁'}</span>
          <span class="ph-label">${esc(p.subtitle)}</span>
        </div>
      </div>
      <div class="proj-feat-body">
        <div class="proj-feat-top">
          <div class="proj-tags-row">${renderTags(p.tags)}</div>
          <span class="proj-ext-icon">↗</span>
        </div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.description)}</p>
        <div class="proj-link-row">
          ${p.github ? `<a href="${esc(p.github)}" target="_blank" class="proj-gh-link" onclick="event.stopPropagation()">GitHub →</a>` : ''}
          ${p.live ? `<a href="${esc(p.live)}"   target="_blank" class="proj-gh-link" onclick="event.stopPropagation()">Live →</a>` : ''}
        </div>
      </div>
    </div>`
    ).join('');
}

function renderSmall(projects) {
    const small = projects.filter(p => !p.featured);
    document.getElementById('small-grid').innerHTML = small.map(p => `
    <div class="proj-sm reveal" data-id="${esc(p.id)}" data-cat="${esc(p.category)}">
      <div class="proj-sm-img">
        ${imgEl(p)}
        <div class="proj-img-placeholder">
          <span class="ph-icon">${CAT_ICONS[p.category] || '📁'}</span>
        </div>
      </div>
      <div class="proj-sm-body">
        <div class="psm-top">
          <div class="psm-tags">${renderTags(p.tags)}</div>
          <span class="psm-arrow">↗</span>
        </div>
        <h4>${esc(p.title)}</h4>
        <p>${esc(p.description)}</p>
      </div>
    </div>`
    ).join('');
}

function renderFilters(projects) {
    const cats = ['all', ...new Set(projects.map(p => p.category))];
    document.getElementById('proj-filters').innerHTML = cats.map(c => `
    <button class="filter-btn ${c === 'all' ? 'active' : ''}" data-filter="${c}">
      ${c === 'all' ? 'All' : (CAT_LABELS[c] || c)}
    </button>`
    ).join('');
}

function applyFilter(cat) {
    document.querySelectorAll('[data-cat]').forEach(el => {
        const matches = cat === 'all' || el.dataset.cat === cat;
        el.classList.toggle('hidden', !matches);
    });
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === cat);
    });
}

function renderStack(stack) {
    document.getElementById('stack-grid').innerHTML = stack.map(s => `
    <div class="stack-col reveal">
      <h4><span>${s.icon}</span> ${esc(s.category)}</h4>
      <ul>${s.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
    </div>`
    ).join('');
}

function renderAchievements(ach) {
    document.getElementById('ach-row').innerHTML = ach.map(a => `
    <div class="ach-item reveal">
      <span class="ach-em">${a.emoji}</span>
      <div>
        <strong>${esc(a.title)}</strong>
        <p>${esc(a.detail)}</p>
      </div>
    </div>`
    ).join('');
}

function renderContact(p) {
    const links = [
        { icon: '✉', label: 'Email', href: `mailto:${p.email}`, val: p.email },
        { icon: '☎', label: 'Phone', href: `tel:${p.phone}`, val: p.phone },
        { icon: 'in', label: 'LinkedIn', href: p.linkedin, val: 'siddheshjadhavdeepak', target: '_blank' },
        { icon: 'gh', label: 'GitHub', href: p.github, val: 'sidd-j', target: '_blank' },
    ];
    document.getElementById('contact-links').innerHTML = links.map(l => `
    <a class="cl-item" href="${esc(l.href)}" ${l.target ? `target="${l.target}"` : ''}>
      <span class="cl-icon">${l.icon}</span>
      <span class="cl-val">${esc(l.val)}</span>
    </a>`
    ).join('');
}

function renderFooter(p) {
    document.getElementById('footer-copy').textContent = `Built by ${p.name} · © 2025`;
    document.getElementById('footer-links').innerHTML = `
    <a href="${esc(p.github)}"   target="_blank">GitHub</a>
    <a href="${esc(p.linkedin)}" target="_blank">LinkedIn</a>
    <a href="mailto:${esc(p.email)}">Email</a>`;
    document.getElementById('all-gh').href = p.github;
}

/* =====================================================
   MODAL
===================================================== */
const modalBg = document.getElementById('modal-bg');
const modalClose = document.getElementById('modal-close');

function openModal(proj) {
    const placeholder = makePlaceholderSVG(proj.title, proj.color || '#1c1c21');
    document.getElementById('modal-img').src = proj.image;
    document.getElementById('modal-img').alt = proj.title;
    document.getElementById('modal-img').onerror = function () {
        this.onerror = null; this.src = placeholder;
    };
    document.getElementById('modal-tags').innerHTML = renderTags(proj.tags, '');
    document.getElementById('modal-title').textContent = proj.title;
    document.getElementById('modal-subtitle').textContent = proj.subtitle;
    document.getElementById('modal-desc').textContent = proj.description;

    const btns = [];
    if (proj.github) btns.push(`<a href="${esc(proj.github)}" target="_blank" class="btn-primary">View on GitHub</a>`);
    if (proj.live) btns.push(`<a href="${esc(proj.live)}"   target="_blank" class="btn-ghost">Live Demo ↗</a>`);
    document.getElementById('modal-btns').innerHTML = btns.join('');

    modalBg.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalBg.classList.remove('open');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalBg.addEventListener('click', e => { if (e.target === modalBg) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* =====================================================
   NAV / UX
===================================================== */
const hdr = document.getElementById('hdr');
const burger = document.getElementById('burger');
const mobNav = document.getElementById('mob-nav');

window.addEventListener('scroll', () => hdr.classList.toggle('scrolled', window.scrollY > 30), { passive: true });

burger.addEventListener('click', () => {
    const open = mobNav.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
});
mobNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobNav.classList.remove('open'); burger.classList.remove('open'); document.body.style.overflow = '';
}));

document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return; e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - hdr.offsetHeight, behavior: 'smooth' });
}));

/* =====================================================
   SCROLL REVEAL
===================================================== */
const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        io.unobserve(entry.target);
    });
}, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });

function observeReveal() {
    document.querySelectorAll('.reveal:not(.visible)').forEach((el, i) => io.observe(el));
}

/* =====================================================
   CONTACT FORM
===================================================== */
const form = document.getElementById('contact-form');
const sbtn = document.getElementById('sbtn');
form && form.addEventListener('submit', e => {
    e.preventDefault();
    const orig = sbtn.textContent;
    sbtn.textContent = 'Sending…'; sbtn.disabled = true;
    setTimeout(() => {
        sbtn.textContent = '✓ Sent!';
        sbtn.style.background = '#16a34a'; sbtn.style.borderColor = '#16a34a';
        setTimeout(() => {
            sbtn.textContent = orig; sbtn.disabled = false;
            sbtn.style.background = ''; sbtn.style.borderColor = '';
            form.reset();
        }, 3000);
    }, 900);
});

/* =====================================================
   MAIN — FETCH & RENDER
===================================================== */
async function init() {
    let data;
    try {
        const res = await fetch('Data.json');
        if (!res.ok) throw new Error('fetch failed');
        data = await res.json();
    } catch {
        console.error('Could not load data.json');
        document.getElementById('hero-h1').textContent = 'Siddhesh Jadhav';
        return;
    }

    const { personal: p, stats, experience, projects, stack, achievements } = data;

    // Render everything
    renderNav(p);
    renderHero(p);
    renderCodeCard(p);
    renderStats(stats);
    renderMarquee(stack);
    renderAbout(p);
    renderExperience(experience);
    renderFilters(projects);
    renderProjects(projects);
    renderStack(stack);
    renderAchievements(achievements);
    renderContact(p);
    renderFooter(p);

    // Wire up filter buttons
    document.getElementById('proj-filters').addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (btn) { applyFilter(btn.dataset.filter); observeReveal(); }
    });

    // Wire up project card clicks → modal
    document.getElementById('featured-row').addEventListener('click', e => {
        const card = e.target.closest('.proj-feat');
        if (!card || e.target.closest('a')) return;
        const proj = projects.find(p => p.id === card.dataset.id);
        if (proj) openModal(proj);
    });
    document.getElementById('small-grid').addEventListener('click', e => {
        const card = e.target.closest('.proj-sm');
        if (!card) return;
        const proj = projects.find(p => p.id === card.dataset.id);
        if (proj) openModal(proj);
    });

    // Stagger project cards
    document.querySelectorAll('.proj-feat.reveal').forEach((el, i) => { el.dataset.delay = i * 80; });
    document.querySelectorAll('.proj-sm.reveal').forEach((el, i) => { el.dataset.delay = i * 60; });

    // Start revealing
    observeReveal();
}

init();