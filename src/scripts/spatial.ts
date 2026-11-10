export function initSpatial() {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 900px)');
  const canAnimate = () => !motion.matches && desktop.matches && !document.hidden;
  const cards = document.querySelectorAll<HTMLElement>('[data-tilt]');
  cards.forEach(card => {
    let frame = 0;
    card.addEventListener('pointermove', event => {
      if (!canAnimate()) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = card.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width - .5;
        const y = (event.clientY - box.top) / box.height - .5;
        card.style.setProperty('--tilt-x', `${-y * 4}deg`);
        card.style.setProperty('--tilt-y', `${x * 4}deg`);
      });
    }, { passive: true });
    const reset = () => {
      cancelAnimationFrame(frame);
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    };
    card.addEventListener('pointerleave', reset);
    card.addEventListener('focusin', reset);
    motion.addEventListener('change', reset);
    desktop.addEventListener('change', reset);
  });

  const scene = document.querySelector<HTMLElement>('[data-parallax]');
  if (!scene) return;
  let visible = true;
  let frame = 0;
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(scene);
  const update = () => {
    frame = 0;
    if (!visible || !canAnimate()) return;
    scene.style.setProperty('--scroll-offset', `${Math.min(window.scrollY, 850) * .045}px`);
  };
  window.addEventListener('scroll', () => {
    if (!frame && visible && canAnimate()) frame = requestAnimationFrame(update);
  }, { passive: true });
  const resetScene = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    scene.style.removeProperty('--scroll-offset');
  };
  motion.addEventListener('change', resetScene);
  desktop.addEventListener('change', resetScene);
}
