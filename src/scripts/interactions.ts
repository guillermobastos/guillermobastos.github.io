const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 900px)');

// Visible by default: a failed script or disabled JavaScript never hides content.
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      } else {
        entry.target.classList.add('reveal-pending');
      }
    }
  }, { threshold: 0.06 });
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element => {
    // The observer reports geometry after layout. Avoid synchronous DOM reads
    // during boot: visible content stays visible, off-screen content is enhanced.
    observer.observe(element);
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      document.querySelectorAll('.reveal-pending').forEach(el => el.classList.remove('reveal-pending'));
      observer.disconnect();
    }
  });
}

// Import enhancement code only on devices that can use the 3D interaction.
if (finePointer.matches && !reducedMotion.matches) {
  const start = () => import('./spatial').then(({ initSpatial }) => initSpatial());
  if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 1500 });
  else setTimeout(start, 300);
}

// Keep the current section understandable visually and to assistive technology.
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.site-header nav a')];
  const activeSections = new Set<string>();
  const sections = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) activeSections.add(entry.target.id);
      else activeSections.delete(entry.target.id);
    }
    const active = links.find(link => activeSections.has(link.hash.slice(1)));
    links.forEach(link => {
      if (link === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -40% 0px' });
  links.forEach(link => {
    const section = document.getElementById(link.hash.slice(1));
    if (section) sections.observe(section);
  });
}
