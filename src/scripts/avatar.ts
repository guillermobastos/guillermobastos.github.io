export function initAvatar() {
  const avatar = document.querySelector<HTMLElement>('[data-avatar]');
  if (!avatar || avatar.dataset.enhanced) return;
  avatar.dataset.enhanced = 'true';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const button = avatar.querySelector<HTMLButtonElement>('.avatar-greet');
  let frame = 0;
  let timeout: ReturnType<typeof setTimeout>;
  let greeting = false;
  const reset = () => {
    cancelAnimationFrame(frame);
    avatar.style.removeProperty('--look-x');
    avatar.style.removeProperty('--look-y');
    avatar.style.removeProperty('--head-angle');
  };
  const observer = new IntersectionObserver(entries => {
    avatar.dataset.inView = String(entries[0].isIntersecting && !document.hidden);
    if (!entries[0].isIntersecting) reset();
  }, { threshold: .15 });
  observer.observe(avatar);
  avatar.addEventListener('pointermove', event => {
    if (motion.matches || !pointer.matches || avatar.dataset.inView !== 'true') return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const box = avatar.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (event.clientX - box.left) / box.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY - box.top) / box.height * 2 - 1));
      avatar.style.setProperty('--look-x', `${x * 5}px`);
      avatar.style.setProperty('--look-y', `${y * 3}px`);
      avatar.style.setProperty('--head-angle', `${x * 3}deg`);
    });
  }, { passive: true });
  avatar.addEventListener('pointerleave', reset);
  button?.addEventListener('click', () => {
    clearTimeout(timeout);
    greeting = !greeting;
    avatar.classList.toggle('is-greeting', greeting);
    button.setAttribute('aria-pressed', String(greeting));
    if (greeting) timeout = setTimeout(() => {
      greeting = false;
      avatar.classList.remove('is-greeting');
      button.setAttribute('aria-pressed', 'false');
    }, 2400);
  });
  motion.addEventListener('change', reset);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { avatar.dataset.inView = 'false'; reset(); }
    else { observer.unobserve(avatar); observer.observe(avatar); }
  });
}
