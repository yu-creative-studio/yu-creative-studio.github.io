/* =========================================================
   SHIZUKU tea & tapioca — animation.js
   GSAP + ScrollTrigger による控えめな演出。
   HTMLの data 属性で指定する：
     data-intro            読み込み時に順番に表示（ヒーロー）
     data-rv               スクロールで下からふわっと表示
     data-rv="clip"        写真を下から開くように表示
     data-rv="list"        子要素を順番に表示
     data-parallax         背景写真をゆっくり動かす
   ========================================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.documentElement;
    var gsap = window.gsap, ST = window.ScrollTrigger;
    if (!gsap || !ST || root.classList.contains('reduced')) return;
    gsap.registerPlugin(ST);

    var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
    var sp = window.matchMedia('(max-width:767px)').matches;
    var once = function (el) { return { trigger: el, start: 'top 88%', once: true }; };

    /* ---------- ヒーロー（読み込み時） ---------- */
    var media = document.querySelector('.hero__media, .phero__media');
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.header', { autoAlpha: 0 }, { autoAlpha: 1, duration: .8 }, 0);
    if (media) {
      tl.fromTo(media, { clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power3.inOut' }, .1)
        .fromTo(media.querySelector('img'), { scale: 1.08 }, { scale: 1, duration: 2.4, ease: 'power2.out' }, .1);
    }
    tl.fromTo('[data-intro]', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .9, stagger: .12 }, .7);

    /* ---------- スクロール ---------- */
    $$('[data-rv]').forEach(function (el) {
      // スマホで閉じたパネルの中にあるものは動かさない（開いたときにすぐ見えるように）
      if (sp && el.closest('.acc__body, .slider__track')) return;
      var type = el.getAttribute('data-rv');
      if (type === 'clip') {
        gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power3.inOut', scrollTrigger: once(el) });
      } else if (type === 'list') {
        gsap.fromTo(el.children, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .8, ease: 'power3.out', stagger: .09, scrollTrigger: once(el) });
      } else {
        gsap.fromTo(el, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: once(el) });
      }
    });

    /* ---------- パラレックス（スマホでは使わない） ---------- */
    if (!sp) {
      $$('[data-parallax]').forEach(function (el) {
        var img = el.querySelector('img') || el;
        gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    }

    window.addEventListener('load', function () { ST.refresh(); });
    root.classList.add('anim-ok');
  });
})();
