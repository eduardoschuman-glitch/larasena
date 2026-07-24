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

// video players
const isMobile = window.matchMedia('(max-width:820px)').matches;
root.querySelectorAll('.fb-video').forEach((box) => {
  const video = box.querySelector('video');
  const playBtn = box.querySelector('.fb-video-play');
  const closeBtn = box.querySelector('.fb-video-close');
  const fill = box.querySelector('.fb-video-progress i');
  const isVsl = box.classList.contains('fb-video-vsl');
  let autoOnce = false;

  video.addEventListener('timeupdate', () => {
    if (fill && video.duration) fill.style.width = (video.currentTime / video.duration * 100) + '%';
  });

  const restore = () => {
    box.classList.remove('fb-fs', 'playing');
    video.controls = false;
    try { video.pause(); } catch (e) {}
    try { video.currentTime = 0; } catch (e) {}
    if (fill) fill.style.width = '0%';
    video.load();
  };
  video.addEventListener('ended', restore);
  if (closeBtn) closeBtn.addEventListener('click', restore);

  if (isVsl) {
    // VSL: autoplay-on-scroll with sound (once), no pause until ended, custom gold bar
    video.addEventListener('pause', () => {
      if (!video.ended && box.classList.contains('playing')) video.play().catch(() => {});
    });
    const start = () => {
      box.classList.add('playing');
      if (isMobile) box.classList.add('fb-fs');
      video.controls = false;
      video.muted = false;
      return video.play();
    };
    playBtn.addEventListener('click', () => { start().catch(() => {}); });
    const vio = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting && !autoOnce) {
          autoOnce = true;
          start().catch(() => { box.classList.remove('playing', 'fb-fs'); });
        }
      });
    }, { threshold: 0.5 });
    vio.observe(box);
  } else {
    // testimonial: manual only, native controls, sound, no fullscreen
    playBtn.addEventListener('click', () => {
      box.classList.add('playing');
      video.controls = true;
      video.muted = false;
      video.play().catch(() => {});
    });
  }
});
});
