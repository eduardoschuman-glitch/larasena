/* ===== Mentoria First Brows — Lara Sena Beauty ===== */
document.addEventListener('DOMContentLoaded', function () {
  var root = document;

  document.body.classList.add('reveals-ready');
  var io = new IntersectionObserver(function (ents) {
    ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  root.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  function slideshow(sel, interval, onChange) {
    var slides = root.querySelectorAll(sel);
    if (!slides.length) return;
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-active');
      if (onChange) onChange(i);
    }, interval);
  }

  var heroPhrases = [
    'Aqui, cada detalhe respira alto padrão.',
    'O ambiente onde suas futuras clientes vão querer estar.',
    'Você aprende no nível em que vai atuar.'
  ];
  var heroCap = root.getElementById('fb-hero-caption');
  slideshow('#fb-hero-bg .fb-slide', 5000, function (i) {
    if (!heroCap) return;
    heroCap.style.opacity = '0';
    setTimeout(function () { heroCap.textContent = heroPhrases[i % heroPhrases.length]; heroCap.style.opacity = '1'; }, 450);
  });

  ['assets/clinica-1.jpg','assets/clinica-2.jpg','assets/clinica-3.jpg','assets/clinica-4.jpg','assets/clinica-5.jpg']
    .forEach(function (s) { var im = new Image(); im.src = s; });

  var header = root.getElementById('fb-header');
  var logo = root.getElementById('fb-logo');
  var cta = root.getElementById('fb-headercta');
  var heroBg = root.getElementById('fb-hero-bg');
  function onScroll() {
    var sc = window.scrollY > 60;
    if (header) header.classList.toggle('scrolled', sc);
    if (logo) logo.src = sc ? 'assets/logo-transparente.png' : 'assets/logo-dourado.png';
    if (cta) { cta.style.borderColor = sc ? '#7A6552' : '#F6EEE4'; cta.style.color = sc ? '#7A6552' : '#F6EEE4'; }
    root.querySelectorAll('.fb-nav .fb-navlink').forEach(function (n) { n.style.color = sc ? '#7A6552' : '#F6EEE4'; });
    if (heroBg) heroBg.style.transform = 'translateY(' + (window.scrollY * 0.16) + 'px)';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  root.querySelectorAll('#fb-faq .fb-faq-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      root.querySelectorAll('#fb-faq .faq-item').forEach(function (it) { it.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  var mv = root.getElementById('fb-mobile-video');
  if (mv && window.matchMedia('(max-width:820px)').matches) {
    mv.src = 'https://eduardoschuman-glitch.github.io/larinhasena/videos/fundo-mobile.mp4';
    mv.play().catch(function () {});
  }
});
