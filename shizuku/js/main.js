/* =========================================================
   SHIZUKU tea & tapioca — main.js
   ヘッダー・スマホメニュー・ページ内リンク・開閉パネル・スライダー
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var isSP = function () { return window.matchMedia('(max-width:767px)').matches; };
  var reduced = root.classList.contains('reduced');

  /* GSAPが読み込めなかった場合は、隠していた要素をすべて表示する */
  setTimeout(function () { if (!root.classList.contains('anim-ok')) root.classList.remove('js-anim'); }, 3500);

  /* 高さをなめらかに開閉 */
  function slide(el, open, done) {
    if (reduced || !el.animate) { el.hidden = !open; if (done) done(); return; }
    if (open) el.hidden = false;
    var h = el.scrollHeight;
    var a = el.animate(open ? [{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }] : [{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
      { duration: open ? 320 : 260, easing: 'cubic-bezier(.33,1,.68,1)' });
    a.onfinish = function () { if (!open) el.hidden = true; if (done) done(); };
  }

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- ヘッダー ---------- */
    var header = $('.header');
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- スマホメニュー ---------- */
    var burger = $('.burger'), drawer = $('#drawer');
    function menu(open) {
      document.body.classList.toggle('menu-open', open);
      root.classList.toggle('is-locked', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      drawer.setAttribute('aria-hidden', String(!open));
    }
    burger.addEventListener('click', function () { menu(!document.body.classList.contains('menu-open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) menu(false); });
    window.addEventListener('resize', function () { if (!isSP() && window.innerWidth > 1024) menu(false); });

    /* ---------- ページ内リンク（ヘッダーの高さ分ずらす） ---------- */
    function scrollToId(id, instant) {
      var el = document.getElementById(id);
      if (!el) return;
      var top = el.getBoundingClientRect().top + window.scrollY - header.offsetHeight + 1;
      window.scrollTo({ top: top, behavior: instant || reduced ? 'auto' : 'smooth' });
    }
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href*="#"]');
      if (!a) return;
      var url = new URL(a.getAttribute('href'), location.href);
      if (url.pathname.replace(/index\.html$/, '') !== location.pathname.replace(/index\.html$/, '') || !url.hash) return;
      var id = decodeURIComponent(url.hash.slice(1));
      if (!document.getElementById(id)) return;
      e.preventDefault();
      if (document.body.classList.contains('menu-open')) menu(false);
      openAccFor(id);
      scrollToId(id);
      history.replaceState(null, '', url.hash);
    });
    if (location.hash) {
      window.addEventListener('load', function () {
        var id = decodeURIComponent(location.hash.slice(1));
        openAccFor(id);
        scrollToId(id, true);
      });
    }

    /* ---------- スマホの開閉パネル ---------- */
    $$('[data-acc]').forEach(function (acc) {
      var btn = $('.acc__btn', acc), body = $('.acc__body', acc);
      if (!btn || !body) return;
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', String(open));
        acc.classList.toggle('is-open', open);
        if (open) { body.classList.add('is-shown'); slide(body, true); }
        else slide(body, false, function () { body.classList.remove('is-shown'); body.hidden = false; });
      });
    });
    /* リンク先が閉じたパネルの中なら開く */
    function openAccFor(id) {
      if (!isSP()) return;
      var el = document.getElementById(id);
      var acc = el && (el.closest('[data-acc]') || (el.matches('[data-acc]') ? el : null));
      if (!acc) return;
      var btn = $('.acc__btn', acc), body = $('.acc__body', acc);
      if (btn && btn.getAttribute('aria-expanded') !== 'true') {
        btn.setAttribute('aria-expanded', 'true'); acc.classList.add('is-open'); body.classList.add('is-shown');
      }
    }

    /* ---------- 季節のカレンダー（スマホのみ開閉） ---------- */
    $$('.cal__head').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!isSP()) return;
        var list = document.getElementById(btn.getAttribute('aria-controls'));
        var open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', String(open));
        btn.parentNode.classList.toggle('is-open', open);
        if (open) { list.classList.add('is-shown'); slide(list, true); }
        else slide(list, false, function () { list.classList.remove('is-shown'); list.hidden = false; });
      });
    });

    /* ---------- よくある質問 ---------- */
    $$('.faq__q').forEach(function (q) {
      q.addEventListener('click', function () {
        var a = document.getElementById(q.getAttribute('aria-controls'));
        var open = q.getAttribute('aria-expanded') !== 'true';
        q.setAttribute('aria-expanded', String(open));
        slide(a, open);
      });
    });

    /* ---------- 横スライダー（MENUの秋のおすすめ・INFOのギャラリー／スマホ） ---------- */
    $$('[data-slider]').forEach(function (wrap) {
      var track = $('.slider__track', wrap);
      var items = function () { return $$(':scope > *', track); };
      var dots = $$('.dots__dot', wrap);
      var index = function () {
        var w = items()[0] ? items()[0].getBoundingClientRect().width : 1;
        return Math.round(track.scrollLeft / (w + parseFloat(getComputedStyle(track).columnGap || 0)));
      };
      var go = function (i) {
        var it = items()[Math.max(0, Math.min(items().length - 1, i))];
        if (it) track.scrollTo({ left: it.offsetLeft - track.offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
      };
      track.addEventListener('scroll', function () {
        var i = index();
        dots.forEach(function (d, k) { d.classList.toggle('is-active', k === Math.min(i, dots.length - 1)); });
      }, { passive: true });
      $$('[data-slide]', wrap).forEach(function (b) {
        b.addEventListener('click', function () { go(index() + parseInt(b.getAttribute('data-slide'), 10)); });
      });
    });

    /* ---------- 混雑グラフ：画面に入ったら棒を伸ばす ---------- */
    var chart = $('.busy');
    if (chart) {
      if ('IntersectionObserver' in window && !reduced) {
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (en) { if (en.isIntersecting) { chart.classList.add('is-in'); io.disconnect(); } });
        }, { threshold: .3 });
        io.observe(chart);
      } else chart.classList.add('is-in');
    }

    /* ---------- MENU ページ内ナビの現在地 ---------- */
    var sub = $$('.subnav a');
    if (sub.length && 'IntersectionObserver' in window) {
      var so = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) sub.forEach(function (a) { a.classList.toggle('is-active', a.hash === '#' + en.target.id); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sub.forEach(function (a) { var t = document.getElementById(a.hash.slice(1)); if (t) so.observe(t); });
    }
  });
})();
