/* ===== Lara Sena Beauty — Landing Page ===== */
(function () {
  var WA = 'https://wa.me/message/2YANXPW7OCUTJ1';

  var services = [
    { id: 'lash', name: 'Lash Lifting', images: ['assets/cat/lash.jpg'],
      cardText: 'Acorde com os cílios curvados, sem curvex e sem rímel. Praticidade para a rotina e expressão para o olhar.',
      fullText: 'Seus cílios mais curvados, realçados e definidos de forma natural. Durabilidade média de até 8 semanas.' },
    { id: 'brow', name: 'Brow Lamination', images: ['assets/cat/brow-1.jpg', 'assets/cat/brow-2.jpg', 'assets/cat/brow-3.jpg'],
      cardText: 'Fios alinhados, volume natural e aquele efeito de sobrancelha feita ao acordar. Durabilidade e naturalidade no mesmo procedimento.',
      fullText: 'Laminação de sobrancelhas. Ideal para disfarçar falhas, para quem tem fios direcionados para baixo ou enrolados, ou para quem deseja a sensação de sobrancelhas mais volumosas. Durabilidade média de 8 semanas.' },
    { id: 'limpeza', name: 'Limpeza de Pele', images: ['assets/cat/limpeza-1.jpg', 'assets/cat/limpeza-2.jpg'],
      cardText: 'Pele limpa, saudável e iluminada, com protocolo cuidadoso do início ao pós procedimento.',
      fullText: 'Promove a higienização profunda da pele, auxiliando na remoção de impurezas e na renovação celular para uma aparência mais saudável e viçosa. Recomendada a cada 30 a 60 dias.' },
    { id: 'make', name: 'Maquiagem', images: ['assets/cat/make-1.jpg', 'assets/cat/make-2.jpg', 'assets/cat/make-3.jpg', 'assets/cat/make-4.jpg'],
      cardText: 'Para os dias que pedem algo especial: uma make que realça você, sem esconder quem você é.',
      fullText: 'Maquiagem para festas e eventos ou Maquiagem Express (consultar informações).' },
    { id: 'hidra', name: 'Hidragloss', images: ['assets/cat/hidra-antes.jpg', 'assets/cat/hidra-depois.jpg'],
      cardText: 'Hidratação profunda para lábios macios, corados e com efeito gloss natural.',
      fullText: 'O Hidragloss é um tratamento que hidrata profundamente e regenera os lábios, deixando-os mais macios e com aspecto saudável.' },
    { id: 'color', name: 'Coloração de Sobrancelhas', images: ['assets/cat/color-antes.jpg', 'assets/cat/color-depois.jpg'],
      cardText: 'Cor sob medida para valorizar seus fios e iluminar o rosto, com resultado suave e natural.',
      fullText: 'Ideal para cobrir fios brancos ou claros, realçar sobrancelhas com pouco volume aparente e proporcionar mais definição e destaque ao olhar. Durabilidade média de até 30 dias nos fios.' },
    { id: 'design', name: 'Design de Sobrancelhas', images: ['assets/cat/design-antes.png', 'assets/cat/design.jpg'],
      cardText: 'Um design estratégico que respeita a harmonia do seu rosto. Nada de padrões prontos: suas sobrancelhas, na melhor versão delas.',
      fullText: 'Design de sobrancelhas feito de forma estratégica, com fio/linha e/ou pinça, respeitando sempre a naturalidade e a harmonia do seu rosto. Durabilidade média de 30 dias.' },
    { id: 'epilacao', name: 'Epilação Egípcia', images: ['assets/cat/epilacao-antes.jpg', 'assets/cat/epilacao-depois.jpg'],
      cardText: 'Técnica milenar com linha: precisão, delicadeza com a pele e acabamento impecável.',
      fullText: 'Remoção dos pelos desde a raiz através de uma linha própria para a técnica, proporcionando maior durabilidade e segurança para a saúde da sua pele. Durabilidade média de 15 a 30 dias.' },
    { id: 'microbrow', name: 'Micropigmentação de Sobrancelhas', images: ['assets/cat/microbrow-1.jpg'],
      cardText: 'Fios desenhados, falhas preenchidas e simetria com efeito natural que dura até 1 ano.',
      fullText: 'Técnica que realça o formato natural das sobrancelhas, preenche falhas e harmoniza o olhar. Sobrancelhas simétricas e com efeito natural. Durabilidade média de 1 ano.' },
    { id: 'microlip', name: 'Micropigmentação Labial', images: ['assets/cat/microlip-1.jpg', 'assets/cat/microlip-2.jpg', 'assets/cat/microlip-3.jpg'],
      cardText: 'Cor natural realçada, contorno definido e lábios corados o tempo todo.',
      fullText: 'Procedimento que realça a cor natural dos lábios, define o contorno e traz aspecto de lábios mais corados e uniformes. Durabilidade de até 2 anos.' }
  ];

  var carIdx = {};   // current image index per card
  var byId = {};
  services.forEach(function (s) { carIdx[s.id] = 0; byId[s.id] = s; });

  /* ---------- Build catalog ---------- */
  function buildCatalog() {
    var grid = document.getElementById('catalog-grid');
    if (!grid) return;
    services.forEach(function (s) {
      var multi = s.images.length > 1;
      var card = document.createElement('div');
      card.className = 'cat-card reveal';

      var media = document.createElement('div');
      media.className = 'cat-media';
      var img = document.createElement('img');
      img.src = s.images[0]; img.alt = s.name;
      media.appendChild(img);

      if (multi) {
        var prev = document.createElement('button');
        prev.className = 'car-arrow'; prev.style.left = '12px'; prev.innerHTML = '&#8249;';
        prev.setAttribute('aria-label', 'Anterior');
        var next = document.createElement('button');
        next.className = 'car-arrow'; next.style.right = '12px'; next.innerHTML = '&#8250;';
        next.setAttribute('aria-label', 'Próxima');
        var dots = document.createElement('div');
        dots.className = 'cat-dots';
        s.images.forEach(function (_, i) {
          var d = document.createElement('button');
          d.className = 'car-dot' + (i === 0 ? ' on' : '');
          d.setAttribute('aria-label', 'ver imagem');
          d.addEventListener('click', function () { setCard(s.id, i); });
          dots.appendChild(d);
        });
        prev.addEventListener('click', function () { cycleCard(s.id, -1); });
        next.addEventListener('click', function () { cycleCard(s.id, 1); });
        media.appendChild(prev); media.appendChild(next); media.appendChild(dots);
      }

      var body = document.createElement('div');
      body.className = 'cat-body';
      var h3 = document.createElement('h3'); h3.className = 'cat-name'; h3.textContent = s.name;
      var p = document.createElement('p'); p.className = 'cat-text'; p.textContent = s.cardText;
      var more = document.createElement('button');
      more.className = 'cat-more linkbtn'; more.textContent = 'Saiba mais';
      more.addEventListener('click', function () { openModal(s.id); });
      body.appendChild(h3); body.appendChild(p); body.appendChild(more);

      card.appendChild(media); card.appendChild(body);
      card._img = img; card._dots = media.querySelectorAll('.car-dot');
      grid.appendChild(card);
      s._card = card;
    });
  }
  function renderCard(id) {
    var s = byId[id], idx = carIdx[id];
    s._card._img.src = s.images[idx];
    if (s._card._dots) s._card._dots.forEach(function (d, i) { d.classList.toggle('on', i === idx); });
  }
  function cycleCard(id, dir) {
    var n = byId[id].images.length;
    carIdx[id] = ((carIdx[id] + dir) % n + n) % n;
    renderCard(id);
  }
  function setCard(id, i) { carIdx[id] = i; renderCard(id); }

  /* ---------- Modal ---------- */
  var modalIdx = 0, modalId = null;
  function openModal(id) {
    modalId = id; modalIdx = 0;
    var s = byId[id];
    document.getElementById('modal-name').textContent = s.name;
    document.getElementById('modal-text').textContent = s.fullText;
    renderModal();
    document.getElementById('modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow = '';
    modalId = null;
  }
  function renderModal() {
    var s = byId[modalId]; if (!s) return;
    var media = document.getElementById('modal-media');
    var arrows = media.querySelectorAll('.car-arrow');
    document.getElementById('modal-img').src = s.images[modalIdx];
    arrows.forEach(function (a) { a.style.display = s.images.length > 1 ? 'flex' : 'none'; });
  }
  function modalCycle(dir) {
    var n = byId[modalId].images.length;
    modalIdx = ((modalIdx + dir) % n + n) % n;
    renderModal();
  }

  /* ---------- Slideshows ---------- */
  function slideshow(selector, interval, onChange) {
    var slides = document.querySelectorAll(selector);
    if (!slides.length) return;
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-active');
      if (onChange) onChange(i);
    }, interval);
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    buildCatalog();

    // preload slideshow images
    var pre = ['assets/bg/01.jpg','assets/bg/02.jpg','assets/bg/03.jpg','assets/bg/04.jpg',
      'assets/clinica/1.png','assets/clinica/2.jpg','assets/clinica/3.jpg','assets/clinica/4.jpg','assets/clinica/5.jpg'];
    pre.forEach(function (src) { var im = new Image(); im.src = src; });

    slideshow('#hero-bg .hero-slide', 5000);

    var phrases = [
      'Um espaço pensado para o seu conforto.',
      'Cada detalhe existe para você se sentir acolhida.',
      'Você chega de um jeito. E sai enxergando a sua beleza de outro.'
    ];
    var cap = document.getElementById('clinic-caption');
    slideshow('#clinic-bg .clinic-slide', 3000, function (i) {
      if (cap) cap.textContent = phrases[i % phrases.length];
    });

    // header scroll + logo swap + parallax
    var header = document.getElementById('header');
    var logo = document.getElementById('header-logo');
    var heroBg = document.getElementById('hero-bg');
    window.addEventListener('scroll', function () {
      var sc = window.scrollY > 60;
      header.classList.toggle('scrolled', sc);
      logo.src = sc ? 'assets/logo-dourado.png' : 'assets/logo-dark.png';
      if (heroBg) heroBg.style.transform = 'translateY(' + (window.scrollY * 0.18) + 'px)';
    }, { passive: true });

    // reveal on scroll
    document.body.classList.add('reveals-ready');
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

    // modal wiring
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('modal').addEventListener('click', function (e) {
      if (e.target === this) closeModal();
    });
    document.querySelector('#modal-media .car-arrow.prev').addEventListener('click', function () { modalCycle(-1); });
    document.querySelector('#modal-media .car-arrow.next').addEventListener('click', function () { modalCycle(1); });
  });
})();
