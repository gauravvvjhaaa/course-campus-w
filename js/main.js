/* ===================================================
   Course Campus — Global JavaScript (main.js)
   =================================================== */

/* ---- 1. Scroll to top on every page load ---- */
window.addEventListener('load', () => {
  window.scrollTo({ top: 0, behavior: 'instant' });
});

/* ---- 2. Active nav highlighting ---- */
(function setActiveLinks() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const norm = page === '' ? 'index.html' : page;
  document.querySelectorAll('.nav-links a, .nav-mobile-menu a, .bottom-nav-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.split('?')[0] === norm) link.classList.add('active');
  });
})();

/* ---- 3. Mobile hamburger menu ---- */
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  if (menu && menu.classList.contains('open')) {
    if (!menu.contains(e.target) && hamburger && !hamburger.contains(e.target)) {
      menu.classList.remove('open');
    }
  }
});

/* ---- 4. Back To Top button ---- */
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (backToTopBtn) {
    backToTopBtn.classList.toggle('visible', window.scrollY > 300);
  }
}, { passive: true });
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---- 5. Global Apply Now Modal (dynamically injected) ---- */
const MODAL_HTML = `
<div class="modal-overlay" id="applyModal" role="dialog" aria-modal="true" aria-labelledby="modalHeading">
  <div class="modal">
    <!-- STICKY HEADER -->
    <div class="modal-header">
      <h2 id="modalHeading">Apply <span>Now</span></h2>
      <button class="modal-close" onclick="closeApplyModal()" aria-label="Close">✕</button>
    </div>

    <!-- SCROLLABLE BODY -->
    <div class="modal-body">
      <!-- FORM VIEW -->
      <div id="modalFormView">
        <p class="modal-sub">Fill in your details — our counselor will call you within 24 hours.</p>
        <form id="applyForm" action="https://formspree.io/f/xnjyqnko" method="POST" novalidate>
          <input type="hidden" name="_subject" value="New Application - Course Campus">
          <input type="hidden" name="_replyto" id="replyto-hidden" value="">

          <div class="form-group">
            <label for="apply-name">Full Name <span class="req">*</span></label>
            <input type="text" id="apply-name" name="name" placeholder="Your full name" required autocomplete="name">
          </div>

          <div class="form-group">
            <label for="apply-phone">Phone Number <span class="req">*</span></label>
            <input type="tel" id="apply-phone" name="phone" placeholder="10-digit mobile number"
                   maxlength="10" inputmode="numeric" pattern="[0-9]{10}" required autocomplete="tel">
            <div class="field-error" id="phone-error">Please enter a valid 10-digit phone number.</div>
          </div>

          <div class="form-group">
            <label for="apply-email">Email Address</label>
            <input type="email" id="apply-email" name="email" placeholder="you@email.com" autocomplete="email">
          </div>

          <div class="form-group">
            <label for="apply-interest">Course Interested In <span class="req">*</span></label>
            <select id="apply-interest" name="course" required>
              <option value="">Select a course…</option>
              <optgroup label="Teaching Courses">
                <option value="B.Ed">B.Ed</option>
                <option value="D.El.Ed">D.El.Ed</option>
                <option value="JBT">JBT</option>
                <option value="NTT">NTT</option>
                <option value="ECC">ECC</option>
              </optgroup>
              <optgroup label="IT Courses">
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="Data Science">Data Science</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Web Development">Web Development</option>
              </optgroup>
              <optgroup label="Management Courses">
                <option value="BBA">BBA</option>
                <option value="MBA">MBA</option>
              </optgroup>
              <optgroup label="Medical Courses">
                <option value="BUMS">BUMS</option>
                <option value="MBBS">MBBS</option>
                <option value="B.Pharma">B.Pharma</option>
                <option value="D.Pharma">D.Pharma</option>
              </optgroup>
              <optgroup label="Open Schooling">
                <option value="NIOS 10th">NIOS 10th</option>
                <option value="NIOS 12th">NIOS 12th</option>
                <option value="IGNOU">IGNOU</option>
              </optgroup>
            </select>
          </div>

          <div class="form-group">
            <label for="apply-qualification">Current Qualification <span class="req">*</span></label>
            <select id="apply-qualification" name="qualification" required>
              <option value="">Select qualification…</option>
              <option value="Below 10th">Below 10th</option>
              <option value="10th Pass">10th Pass</option>
              <option value="12th Pass">12th Pass</option>
              <option value="Graduate">Graduate</option>
              <option value="Post Graduate">Post Graduate</option>
            </select>
          </div>

          <div class="form-group">
            <label for="apply-message">Message or Query</label>
            <textarea id="apply-message" name="message" rows="3" placeholder="Tell us about your situation…"></textarea>
          </div>

          <button type="submit" class="btn-submit" id="submitBtn">Submit Application</button>
        </form>
      </div>

      <!-- SUCCESS VIEW -->
      <div id="modalSuccessView" style="display:none; text-align:center; padding: 16px 0 8px;">
        <div style="font-size:3rem; margin-bottom:14px;">🎉</div>
        <h3 id="successHeading" style="font-size:1.25rem; font-weight:800; color:#fff; margin-bottom:8px;"></h3>
        <p style="color:#757B81; font-size:0.88rem; margin-bottom:6px;">Our counselor will call you within 24 hours.</p>
        <p style="color:#757B81; font-size:0.85rem; margin-bottom:24px;">
          For urgent queries call:
          <a href="tel:+918285919263" style="color:#FFD300; font-weight:700; text-decoration:none;">8285919263</a>
        </p>
        <a href="https://wa.me/918285919263" target="_blank" rel="noopener noreferrer"
           style="display:inline-flex; align-items:center; gap:8px; background:#25D366; color:#fff;
                  font-family:Inter,sans-serif; font-weight:700; font-size:0.95rem;
                  padding:13px 28px; border-radius:10px; text-decoration:none;
                  transition:background 0.2s;">
          💬 Chat on WhatsApp
        </a>
      </div>
    </div>
  </div>
</div>`;

function _ensureModal() {
  if (!document.getElementById('applyModal')) {
    document.body.insertAdjacentHTML('beforeend', MODAL_HTML);
    _bindModalForm();
  }
}

function _bindModalForm() {
  const overlay = document.getElementById('applyModal');
  const form = document.getElementById('applyForm');
  const phoneInput = document.getElementById('apply-phone');
  const emailInput = document.getElementById('apply-email');
  const phoneError = document.getElementById('phone-error');

  // Close on overlay click
  overlay && overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeApplyModal();
  });

  // Phone: only allow digits
  phoneInput && phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, '');
    if (phoneError) phoneError.style.display = 'none';
    phoneInput.classList.remove('input-error');
  });

  // Sync email → _replyto hidden
  emailInput && emailInput.addEventListener('input', () => {
    const r = document.getElementById('replyto-hidden');
    if (r) r.value = emailInput.value;
  });

  // Form submit
  form && form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const phone = phoneInput ? phoneInput.value.trim() : '';
    if (!/^\d{10}$/.test(phone)) {
      if (phoneError) phoneError.style.display = 'block';
      if (phoneInput) phoneInput.classList.add('input-error');
      phoneInput && phoneInput.focus();
      return;
    }
    if (phoneError) phoneError.style.display = 'none';
    if (phoneInput) phoneInput.classList.remove('input-error');

    const btn = document.getElementById('submitBtn');
    if (btn) { btn.textContent = 'Submitting…'; btn.disabled = true; }

    try {
      const data = new FormData(form);
      await fetch(form.action, {
        method: 'POST', body: data,
        headers: { 'Accept': 'application/json' },
      });
      const firstName = (document.getElementById('apply-name')?.value.trim().split(' ')[0]) || 'there';
      const fv = document.getElementById('modalFormView');
      const sv = document.getElementById('modalSuccessView');
      const sh = document.getElementById('successHeading');
      if (fv) fv.style.display = 'none';
      if (sv) sv.style.display = 'block';
      if (sh) sh.textContent = `Thank you, ${firstName}!`;
    } catch (err) {
      if (btn) { btn.textContent = 'Submit Application'; btn.disabled = false; }
      showToast('Something went wrong. Please call us directly: 8285919263');
    }
  });
}

function openApplyModal(courseValue) {
  _ensureModal();
  const overlay = document.getElementById('applyModal');
  const fv = document.getElementById('modalFormView');
  const sv = document.getElementById('modalSuccessView');
  const form = document.getElementById('applyForm');
  const btn = document.getElementById('submitBtn');

  if (fv) fv.style.display = '';
  if (sv) sv.style.display = 'none';
  if (form) form.reset();
  if (btn) { btn.textContent = 'Submit Application'; btn.disabled = false; }
  const phoneError = document.getElementById('phone-error');
  if (phoneError) phoneError.style.display = 'none';
  const phoneInput = document.getElementById('apply-phone');
  if (phoneInput) phoneInput.classList.remove('input-error');

  if (courseValue) {
    const sel = document.getElementById('apply-interest');
    if (sel) {
      for (const opt of sel.options) {
        if (opt.value === courseValue) { sel.value = courseValue; break; }
      }
    }
  }

  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.remove('open');
  }
}

function closeApplyModal() {
  const overlay = document.getElementById('applyModal');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeApplyModal();
    // Also close course popup if open
    const cp = document.getElementById('coursePopup');
    if (cp && cp.classList.contains('open')) {
      cp.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

/* ---- 6. Toast notification ---- */
function showToast(message) {
  let toast = document.getElementById('cc-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cc-toast';
    toast.style.cssText = `
      position:fixed; bottom:90px; left:50%; transform:translateX(-50%) translateY(20px);
      background:#262B32; color:#fff; padding:14px 24px; border-radius:10px;
      font-family:Inter,sans-serif; font-size:.9rem; font-weight:500;
      border:1px solid #FFD300; box-shadow:0 8px 32px rgba(0,0,0,.4);
      z-index:3000; opacity:0; transition:all .35s ease; white-space:nowrap;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => {
    toast.style.opacity = '1'; toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0'; toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, 3500);
}

/* ---- 7. Scroll-triggered fade-in animations ---- */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.06 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
});

/* ---- 8. Smooth page transitions ---- */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (
      href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('//') &&
      link.target !== '_blank' && !link.classList.contains('no-transition')
    ) {
      link.addEventListener('click', (e) => {
        const dest = link.getAttribute('href');
        const cur = window.location.pathname.split('/').pop() || 'index.html';
        if (dest === cur) return;
        e.preventDefault();
        document.body.style.transition = 'opacity .22s ease';
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = dest; }, 230);
      });
    }
  });
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .28s ease';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  }));
});

/* ---- 9. Image fallback system ---- */
document.querySelectorAll('.navbar-logo img, .footer-logo img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
    const text = document.createElement('div');
    text.className = 'logo-text-fallback';
    text.innerHTML = '<span>Course</span> Campus';
    this.parentElement.insertBefore(text, this);
  });
});

document.querySelectorAll('img:not(.navbar-logo img):not(.footer-logo img)').forEach(img => {
  img.addEventListener('error', function() {
    const parent = this.parentElement;
    const alt = this.alt || 'Course Campus';
    const initials = alt.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
    this.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.className = 'img-placeholder';
    placeholder.innerHTML =
      '<div class="placeholder-initials">' + initials +
      '</div><span class="placeholder-text">' + alt + '</span>';
    parent.appendChild(placeholder);
  });
  img.addEventListener('load', function() {
    this.style.opacity = '1';
  });
  if (!img.complete) {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
  }
  if (img.complete && img.naturalHeight !== 0) {
    img.style.opacity = '1';
  }
});

/* ---- 10. Animated stat counters (stats-strip) ---- */
function animateStatCounter(el) {
  const target = parseInt(el.dataset.target);
  if (isNaN(target)) return;
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStatCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.stat-number[data-target]').forEach(el =>
  counterObserver.observe(el));

/* ---- 11. Course tabs swipe support ---- */
const tabsEl = document.querySelector('.courses-tabs');
if (tabsEl) {
  let startX, scrollLeft;
  tabsEl.addEventListener('touchstart', e => {
    startX = e.touches[0].pageX - tabsEl.offsetLeft;
    scrollLeft = tabsEl.scrollLeft;
  }, { passive: true });
  tabsEl.addEventListener('touchmove', e => {
    const x = e.touches[0].pageX - tabsEl.offsetLeft;
    tabsEl.scrollLeft = scrollLeft - (x - startX);
  }, { passive: true });
}

/* ---- 12. FAQ accordion — one open at a time ---- */
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item, .faq-question');
  if (faqItems.length === 0) return;

  // Support both .faq-question pattern and .faq-item pattern
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
      const item = this.closest('.faq-item') || this.parentElement;
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Open clicked if it was closed
      if (!isOpen) item.classList.add('open');
    });
  });
});

/* ===================================================
   LIGHTBOX — campus gallery & existing gallery
   =================================================== */
(function() {
  function initLightbox() {
    document.querySelectorAll('.campus-gallery-grid img, .gallery-grid .gallery-item img').forEach(function(img) {
      if (img.dataset.lightbox) return;
      img.dataset.lightbox = '1';
      img.addEventListener('click', function() {
        var lb = document.createElement('div');
        lb.className = 'lightbox';
        lb.innerHTML =
          '<div class="lightbox-overlay">' +
          '<img src="' + this.src + '" alt="' + (this.alt || '') + '">' +
          '<button class="lightbox-close" aria-label="Close">&#x2715;</button>' +
          '</div>';
        document.body.appendChild(lb);
        lb.querySelector('.lightbox-close').addEventListener('click', function() { lb.remove(); });
        lb.addEventListener('click', function(e) { if (e.target === lb) lb.remove(); });
        document.addEventListener('keydown', function esc(e) {
          if (e.key === 'Escape') { lb.remove(); document.removeEventListener('keydown', esc); }
        });
      });
    });
  }
  // Init on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
})();
