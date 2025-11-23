// Dropdown control & SPA simple
document.addEventListener('DOMContentLoaded', function () {
  const dropdownBtn = document.getElementById('dropdownBtn');
  const dropdownList = document.getElementById('dropdownList');
  const pageLinks = Array.from(document.querySelectorAll('[data-page]'));
  const pageButtons = document.querySelectorAll('[data-page-target]'); // buttons that target pages
  const pages = document.querySelectorAll('.page');
  const yearEl = document.getElementById('year');

  // set current year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // toggle dropdown
  dropdownBtn.addEventListener('click', (e) => {
    const isOpen = dropdownList.style.display === 'block';
    dropdownList.style.display = isOpen ? 'none' : 'block';
    dropdownBtn.setAttribute('aria-expanded', String(!isOpen));
    dropdownList.setAttribute('aria-hidden', String(isOpen));
  });

  // close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdownBtn.contains(e.target) && !dropdownList.contains(e.target)) {
      dropdownList.style.display = 'none';
      dropdownBtn.setAttribute('aria-expanded', 'false');
      dropdownList.setAttribute('aria-hidden', 'true');
    }
  });

  // page link clicks (in dropdown)
  document.querySelectorAll('.dropdown a').forEach(a => {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const page = a.getAttribute('data-page');
      showPage(page);
      dropdownList.style.display = 'none';
    });
  });

  // generic buttons that open pages
  pageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-page-target');
      showPage(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // showPage function
  window.showPage = function (pageId) {
    pages.forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add('active');
      // update focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus();
    }
  };

  // Optional: handle form submit (layout-only)
  const form = document.getElementById('formAgendamento');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // apenas feedback visual — não envia para servidor
      alert('Agendamento confirmado (exemplo). Obrigado! 👊');
      form.reset();
      showPage('home');
    });
  }
});
