// Sticky nav shadow on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 8);
}, { passive: true });

// Count-up animation for proof stats
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const isFloat = !Number.isInteger(target);
  const duration = 1400;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target * eased;
    el.textContent = (isFloat ? val.toFixed(1) : Math.round(val).toLocaleString()) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      animateCount(e.target);
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat__num').forEach((el) => statObserver.observe(el));

// Demo form handler
function handleSubmit(e) {
  e.preventDefault();
  const hint = document.getElementById('formHint');
  const name = e.target.name.value.split(' ')[0] || 'there';
  hint.textContent = `Thanks, ${name}! This is a demo form — wire it to GHL/email before launch.`;
  hint.style.color = 'var(--forest)';
  e.target.reset();
}
