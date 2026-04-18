(function () {
  'use strict';

  /* ── 1. Scroll Reveal + Stagger ── */
  const revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');
      revealIO.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

  var revealTargets = document.querySelectorAll(
    '.team-card, .bureau-card, .price-card, .addr-card, .comp-card,' +
    '.obj-item, .heritage-card, .disc-col, .stat,' +
    '.insta-block, .cta-banner, .card,' +
    '.table-wrap, .comp-grid, .schedule-note, .legend, .price-note'
  );

  var staggerMap = new WeakMap();

  revealTargets.forEach(function (el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) return;

    var parent = el.parentElement;
    var n = staggerMap.has(parent) ? staggerMap.get(parent) : 0;
    staggerMap.set(parent, n + 1);
    el.style.transitionDelay = (n * 0.075) + 's';

    el.classList.add('reveal');
    revealIO.observe(el);
  });

  /* ── 2. Section titles & eyebrows ── */
  var titleIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');
      titleIO.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.section .eyebrow, .section h2.title, .section .body-text').forEach(function (el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) return;
    el.classList.add('reveal');
    titleIO.observe(el);
  });

  /* ── 3. Stats Counter ── */
  var counterIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      counterIO.unobserve(entry.target);
      countUp(entry.target);
    });
  }, { threshold: 0.7 });

  function countUp(el) {
    var node = Array.prototype.find.call(el.childNodes, function (n) {
      return n.nodeType === 3 && /\d/.test(n.textContent);
    });
    if (!node) return;
    var end = parseInt(node.textContent, 10);
    if (!end || end === 0) return;

    var dur = 1300;
    var t0 = performance.now();

    (function tick(now) {
      var p = Math.min((now - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      node.textContent = Math.round(eased * end);
      if (p < 1) requestAnimationFrame(tick);
      else node.textContent = end;
    }(t0));
  }

  document.querySelectorAll('.stat-num').forEach(function (el) {
    counterIO.observe(el);
  });

  /* ── 4. Hero Mouse Parallax ── */
  var hero = document.querySelector('.hero');
  if (hero) {
    var rings = hero.querySelectorAll('.hero-ring');
    var ticking = false;

    hero.addEventListener('mousemove', function (e) {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var r = hero.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width * 0.5) / r.width;
        var y = (e.clientY - r.top - r.height * 0.5) / r.height;
        rings.forEach(function (ring, i) {
          var f = (i + 1) * 10;
          ring.style.transform =
            'translate(calc(-50% + ' + (x * f) + 'px), calc(-50% + ' + (y * f) + 'px))';
        });
        ticking = false;
      });
    });

    hero.addEventListener('mouseleave', function () {
      rings.forEach(function (ring) {
        ring.style.transition = 'transform .8s ease';
        ring.style.transform = 'translate(-50%, -50%)';
        setTimeout(function () { ring.style.transition = ''; }, 820);
      });
    });
  }

  /* ── 5. Page transition fade-in ── */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .35s ease';
  window.addEventListener('load', function () {
    document.body.style.opacity = '1';
  });

  /* ── 6. Nav link hover underline slide ── */
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('mouseenter', function () {
      this.style.transition = 'color .2s, border-color .2s';
    });
  });

}());
