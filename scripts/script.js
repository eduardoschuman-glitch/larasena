document.addEventListener('DOMContentLoaded', function () {

const root = document;

document.body.classList.add('reveals-ready');
const io = new IntersectionObserver((ents) => {
  ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
root.querySelectorAll('.reveal').forEach((el) => io.observe(el));

const slideshow = (sel, interval, onChange) => {
  const slides = root.querySelectorAll(sel);
  if (!slides.length) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('is-active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('is-active');
    if (onChange) onChange(i);
  }, interval);
};
const phrases = [
  'Aqui, cada detalhe respira alto padrão.',
  'O ambiente onde suas futuras clientes vão querer estar.',
  'Você aprende no nível em que vai atuar.'
];
const cap = root.getElementById('fb-clinic-caption');
slideshow('#fb-clinic-bg .fb-cslide', 3000, (i) => {
  if (!cap) return;
  cap.style.opacity = '0';
  setTimeout(() => { cap.textContent = phrases[i % phrases.length]; cap.style.opacity = '1'; }, 400);
});

['assets/clinica/1.png','assets/clinica/2.jpg','assets/clinica/3.jpg','assets/clinica/4.jpg','assets/clinica/5.jpg']
  .forEach((s) => { const im = new Image(); im.src = s; });

const header = root.getElementById('fb-header');
const logo = root.getElementById('fb-logo');
const onScroll = () => {
  const sc = window.scrollY > 60;
  if (header) header.classList.toggle('scrolled', sc);
  if (logo) logo.src = sc ? 'assets/logo-transparente.png' : 'assets/logo-dourado.png';
  root.querySelectorAll('.fb-nav .fb-navlink').forEach((n) => { n.style.color = sc ? '#7A6552' : '#F6EEE4'; });
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

root.querySelectorAll('#fb-faq .fb-faq-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    root.querySelectorAll('#fb-faq .faq-item').forEach((it) => it.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// video players (both identical: manual play, sound, gold progress bar, pause off-screen, resume, no fullscreen)
root.querySelectorAll('.fb-video').forEach((box) => {
  const video = box.querySelector('video');
  const playBtn = box.querySelector('.fb-video-play');
  const fill = box.querySelector('.fb-video-progress i');
  let started = false;

  video.addEventListener('timeupdate', () => {
    if (fill && video.duration) fill.style.width = (video.currentTime / video.duration * 100) + '%';
  });

  playBtn.addEventListener('click', () => {
    started = true;
    box.classList.add('playing');
    video.controls = false;
    video.muted = false;
    video.play().catch(() => {});
  });

  video.addEventListener('ended', () => {
    started = false;
    box.classList.remove('playing');
    try { video.currentTime = 0; } catch (e) {}
    if (fill) fill.style.width = '0%';
    video.load();
  });

  const vio = new IntersectionObserver((ents) => {
    ents.forEach((e) => {
      if (!started) return;
      if (e.intersectionRatio < 0.4) { try { video.pause(); } catch (x) {} }
      else if (e.isIntersecting) { video.play().catch(() => {}); }
    });
  }, { threshold: [0, 0.4, 0.75] });
  vio.observe(box);
});
});
