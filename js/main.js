/* YU DESIGN — main.js v2 (vanilla, no dependencies) */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.add("js");
  var config = window.SITE_CONFIG || {};
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };

  /* ---------- LINE & works links (js/config.js) ---------- */
  var lineUrl = (config.lineUrl || "").trim();
  var lineReady = /^https:\/\//.test(lineUrl) && lineUrl.indexOf("YOUR_LINE_URL") === -1;
  $$(".js-line").forEach(function (el) {
    if (lineReady) {
      el.setAttribute("href", lineUrl); el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); el.removeAttribute("role");
    } else {
      el.removeAttribute("href"); el.classList.add("is-pending"); el.setAttribute("aria-disabled", "true"); el.setAttribute("title", "LINE公式アカウントは現在準備中です");
    }
  });
  if (!lineReady) $$(".line-status").forEach(function (p) { p.hidden = false; });

  var works = config.works || {};
  var workUrl = function (key) { var u = works[key]; return u && /^https:\/\//.test(u) ? u : null; };

  /* ---------- Split text ---------- */
  $$("[data-chars]").forEach(function (el) {
    var t = el.textContent; el.textContent = "";
    t.split("").forEach(function (c, i) { var s = document.createElement("span"); s.className = "ch"; s.style.setProperty("--i", i + (el.classList.contains("hero__line--2") ? 2 : 0)); s.textContent = c; el.appendChild(s); });
  });
  $$("[data-split]").forEach(function (el) {
    var parts = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = parts.map(function (p, i) { return '<span class="sl" style="--l:' + i + '"><span>' + p.trim() + "</span></span>"; }).join("");
  });

  $$("[data-wmchars]").forEach(function (el) {
    var t = el.textContent; el.textContent = "";
    t.split("").forEach(function (c, i) { var s = document.createElement("span"); s.className = "wch"; s.style.setProperty("--i", i); s.textContent = c; el.appendChild(s); });
  });
  // per-item indices for staggered inner animations
  $$(".opt").forEach(function (o) { $$(".opt__row", o).forEach(function (r, i) { r.style.setProperty("--r", i); }); });
  $$(".plan").forEach(function (p) { $$(".plan__list li", p).forEach(function (li, i) { li.style.setProperty("--li", i); }); });
  $$(".contact__cta .pill").forEach(function (b, i) { b.style.setProperty("--b", i); });
  // spotlight follows the pointer on cards
  if (window.matchMedia("(hover: hover)").matches) $$(".plan, .opt, .opt-card, .qa").forEach(function (el) {
    el.addEventListener("pointermove", function (e) { var r = el.getBoundingClientRect(); el.style.setProperty("--sx", (e.clientX - r.left) + "px"); el.style.setProperty("--sy", (e.clientY - r.top) + "px"); });
  });

  /* ---------- Reveal on scroll ---------- */
  $$(".svc-list, .strength__list, .opts, .plans, .faq__list").forEach(function (list) {
    $$(":scope > [data-reveal]", list).forEach(function (el, i) { el.style.setProperty("--d", (i % 6) * 0.1 + "s"); });
  });
  var revealEls = $$("[data-reveal], [data-split]");
  var onReveal = function (el) { el.classList.add("is-in"); if (el.classList.contains("plan")) countUp(el); };
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { onReveal(en.target); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.06 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(onReveal); doc.classList.add("no-split");
  }

  function countUp(plan) {
    if (reduce) return;
    $$(".plan__prices .num", plan).forEach(function (n) {
      var target = parseInt(n.textContent.replace(/[^0-9]/g, ""), 10); if (!target) return;
      var t0 = null, dur = 1500;
      var step = function (ts) { if (!t0) t0 = ts; var p = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - p, 4);
        n.textContent = (Math.round(target * e / 100) * 100).toLocaleString("ja-JP"); if (p < 1) requestAnimationFrame(step); else n.textContent = target.toLocaleString("ja-JP"); };
      requestAnimationFrame(step);
    });
  }

  /* ---------- Loader / intro ---------- */
  var loader = $(".loader"), loadNum = $(".js-load-num");
  var seen = false;
  try { seen = sessionStorage.getItem("yu-intro2") === "1"; sessionStorage.setItem("yu-intro2", "1"); } catch (e) {}
  var introDone = false;
  function finishIntro() {
    if (introDone) return; introDone = true;
    doc.classList.add("is-loaded");
    document.dispatchEvent(new Event("intro:done"));
    setTimeout(function () { doc.classList.add("is-gone"); }, 1600);
  }
  if (!loader || reduce || seen) {
    if (loader) loader.classList.add("is-skip");
    requestAnimationFrame(function () { requestAnimationFrame(finishIntro); });
  } else {
    var ready = false, shown = 0, t0 = performance.now(), MIN = 1700;
    document.addEventListener("hero:ready", function () { ready = true; });
    document.addEventListener("hero:fallback", function () { ready = true; });
    setTimeout(function () { ready = true; }, 3500);
    var lastT = t0;
    (function tick(now) {
      var elapsed = now - t0, dt = Math.min(.1, (now - lastT) / 1000); lastT = now;
      var target = ready ? 100 : Math.min(88, elapsed / 22);
      if (elapsed < MIN) target = Math.min(target, elapsed / MIN * 100);
      shown = lerp(shown, target, 1 - Math.exp(-dt * 9)); if (target - shown < .4) shown = target;
      if (loadNum) loadNum.textContent = ("00" + Math.round(shown)).slice(-3);
      if (shown >= 100 && elapsed >= MIN) { setTimeout(finishIntro, 180); return; }
      requestAnimationFrame(tick);
    })(t0);
  }

  /* ---------- Header / menu ---------- */
  var header = $(".header"), hero = $(".hero"), menu = $("#menu"), menuBtn = $(".menu-btn");
  function setMenu(open) {
    menu.classList.toggle("is-open", open); doc.classList.toggle("menu-open", open);
    menu.setAttribute("aria-hidden", open ? "false" : "true");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    if ("inert" in menu) menu.inert = !open;
    if (open) { var f = $("a", menu); if (f) setTimeout(function () { f.focus({ preventScroll: true }); }, 500); }
  }
  if (menu && menuBtn) {
    if ("inert" in menu) menu.inert = true;
    menuBtn.addEventListener("click", function () { setMenu(!menu.classList.contains("is-open")); });
    $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("is-open")) { setMenu(false); menuBtn.focus(); } });
  }
  header.addEventListener("focusin", function () { header.classList.remove("is-hidden"); });

  /* ---------- In-page links ---------- */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href"); if (id.length < 2) return;
      var target = id === "#top" ? document.body : $(id); if (!target) return;
      e.preventDefault();
      var top = id === "#top" ? 0 : target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", id === "#top" ? location.pathname : id);
    });
  });

  /* ---------- Hero UI (index, caption, slide control) ---------- */
  var heroIdx = $$(".hero__index li"), heroCap = $(".js-hero-cap"), capWrap = $(".hero__caption");
  var CAPS = ["Light & Air", "Quiet Moment"];
  document.addEventListener("hero:slide", function (e) {
    var i = e.detail.index;
    if (e.detail.phase === "start") {
      heroIdx.forEach(function (li, k) { li.classList.toggle("is-active", k === i); });
      if (capWrap) { capWrap.classList.add("is-swap"); setTimeout(function () { heroCap.textContent = CAPS[i] || ""; capWrap.classList.remove("is-swap"); }, 450); }
    }
  });
  document.addEventListener("hero:tick", function (e) { var a = $(".hero__index li.is-active"); if (a) a.style.setProperty("--hp", e.detail.p.toFixed(3)); });
  heroIdx.forEach(function (li, k) { li.style.cursor = "pointer"; li.addEventListener("click", function () { hero.dispatchEvent(new CustomEvent("hero:goto", { detail: k })); }); });
  document.addEventListener("hero:fallback", function () { doc.classList.add("gl-fallback"); });

  /* ---------- Coverflow ---------- */
  var cfRoot = $(".coverflow"), cards = $$(".cf"), info = $(".js-works-info");
  var cfCur = $(".js-works-cur"), cfTotal = $(".js-works-total");
  var N = cards.length, pos = 0, target = 0, active = -1, drag = null;
  if (cfTotal) cfTotal.textContent = ("0" + N).slice(-2);
  cards.forEach(function (li) {
    var a = $(".js-work", li), url = workUrl(li.getAttribute("data-work"));
    if (url) { a.setAttribute("href", url); a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener"); }
    a.addEventListener("click", function (e) {
      var i = cards.indexOf(li);
      if (drag && drag.moved) { e.preventDefault(); return; }
      if (i !== active) { e.preventDefault(); goWork(i); }
      else if (!url) e.preventDefault();
    });
    a.addEventListener("dragstart", function (e) { e.preventDefault(); });
  });
  function wrapOff(i, p) { var o = i - p; o = ((o % N) + N * 1.5) % N - N / 2; return o; }
  function goWork(i) { target = Math.round(pos) + wrapOff(((i % N) + N) % N, Math.round(pos) % N); }
  function shift(d) { target = Math.round(target) + d; }
  function renderInfo(i) {
    var li = cards[i], m = $(".cf__meta", li), url = workUrl(li.getAttribute("data-work"));
    var html = '<div><h3 class="wi__title">' + $(".cf__title", m).textContent + '</h3><p class="wi__cat">' + $(".cf__cat", m).textContent + '<span class="wi__tag">' + (li.getAttribute("data-type") || "1ページ構成") + '</span></p></div>' +
      (url ? '<a class="pill pill--outline wi__link" href="' + url + '" target="_blank" rel="noopener" data-magnetic>VIEW SITE<span class="pill__arrow" aria-hidden="true"></span></a>' : '<span class="wi__link"></span>') +
      '<p class="wi__desc">' + $(".cf__desc", m).textContent + "</p>";
    info.classList.add("is-swap");
    setTimeout(function () { info.innerHTML = html; bindMagnetic($$("[data-magnetic]", info)); bindHover($$("a", info)); requestAnimationFrame(function () { info.classList.remove("is-swap"); }); }, active < 0 ? 0 : 260);
  }
  function layoutCards() {
    var w = cards[0] ? cards[0].offsetWidth : 600, mobile = window.innerWidth < 768;
    cards.forEach(function (li, i) {
      var o = wrapOff(i, pos), ao = Math.abs(o);
      var x = o * w * (mobile ? .82 : .64), z = -ao * (mobile ? 180 : 300), ry = clamp(-o * 32, -55, 55), s = 1 - Math.min(ao, 2) * .06;
      li.style.transform = "translate(-50%,-50%) translate3d(" + x.toFixed(1) + "px,0," + z.toFixed(1) + "px) rotateY(" + ry.toFixed(2) + "deg) scale(" + s.toFixed(3) + ")";
      li.style.zIndex = String(100 - Math.round(ao * 10));
      li.style.opacity = String(clamp(1.6 - ao * .55, 0, 1));
      li.style.setProperty("--dim", Math.min(ao * .32, .55).toFixed(3));
      li.style.pointerEvents = ao > 1.6 ? "none" : "";
    });
    var idx = ((Math.round(pos) % N) + N) % N;
    if (idx !== active) {
      renderInfo(idx); active = idx; if (cfCur) cfCur.textContent = ("0" + (idx + 1)).slice(-2);
      cards.forEach(function (li, i) { var a = $(".js-work", li); a.tabIndex = i === idx ? 0 : -1; a.setAttribute("aria-current", i === idx ? "true" : "false"); });
    }
  }
  if (cfRoot && N) {
    var prev = $(".js-works-prev"), next = $(".js-works-next");
    prev && prev.addEventListener("click", function () { shift(-1); });
    next && next.addEventListener("click", function () { shift(1); });
    cfRoot.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") { shift(-1); e.preventDefault(); } if (e.key === "ArrowRight") { shift(1); e.preventDefault(); } });
    cfRoot.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      drag = { x: e.clientX, y: e.clientY, start: target, moved: false, vx: 0, lx: e.clientX, lt: performance.now(), id: e.pointerId, locked: null };
    });
    window.addEventListener("pointermove", function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (drag.locked === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) drag.locked = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (drag.locked !== "x") return;
      drag.moved = true;
      var w = cards[0].offsetWidth * (window.innerWidth < 768 ? .82 : .64);
      target = drag.start - dx / w; pos = lerp(pos, target, .5);
      var now = performance.now(); drag.vx = (e.clientX - drag.lx) / Math.max(1, now - drag.lt); drag.lx = e.clientX; drag.lt = now;
      cfRoot.classList.add("is-drag");
    });
    var endDrag = function (e) {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      if (drag.moved) { var w = cards[0].offsetWidth * .64; target = Math.round(target - drag.vx * 160 / w); }
      var d = drag; setTimeout(function () { if (drag === d) drag = null; }, 0);
      cfRoot.classList.remove("is-drag");
    };
    window.addEventListener("pointerup", endDrag); window.addEventListener("pointercancel", endDrag);
    cfRoot.tabIndex = 0; cfRoot.setAttribute("aria-label", "制作実績（左右キーで切り替え）");
    layoutCards();
  }

  /* ---------- FAQ: animated height ---------- */
  $$(".qa").forEach(function (d) {
    var sum = $("summary", d), body = $(".qa__a", d);
    sum.addEventListener("click", function (e) {
      if (reduce || !body.animate) return;
      e.preventDefault();
      if (d.open) {
        var h = body.offsetHeight;
        d.classList.add("is-closing");
        body.animate([{ height: h + "px", opacity: 1 }, { height: "0px", opacity: 0 }], { duration: 450, easing: "cubic-bezier(.76,0,.24,1)" }).onfinish = function () { d.open = false; d.classList.remove("is-closing"); };
      } else {
        d.open = true; var h2 = body.offsetHeight;
        body.animate([{ height: "0px", opacity: 0 }, { height: h2 + "px", opacity: 1 }], { duration: 550, easing: "cubic-bezier(.16,1,.3,1)" });
      }
    });
  });

  /* ---------- Cursor, magnetic, tilt ---------- */
  var cursor = $(".cursor"), dot = $(".cursor__dot"), ring = $(".cursor__ring"), label = $(".cursor__label");
  var mx = -100, my = -100, rx = -100, ry = -100;
  var useFx = finePointer && !reduce;
  function bindHover(list) {
    if (!useFx) return;
    list.forEach(function (el) {
      if (el._hov) return; el._hov = 1;
      el.addEventListener("mouseenter", function () { cursor.classList.add("is-hover"); });
      el.addEventListener("mouseleave", function () { cursor.classList.remove("is-hover"); });
    });
  }
  function bindMagnetic(list) {
    if (!useFx) return;
    list.forEach(function (el) {
      if (el._mag) return; el._mag = 1;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect(), x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + (x * .28).toFixed(1) + "px," + (y * .35).toFixed(1) + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transition = "transform .7s cubic-bezier(.16,1,.3,1)"; el.style.transform = ""; setTimeout(function () { el.style.transition = ""; }, 700); });
    });
  }
  if (useFx && cursor) {
    doc.classList.add("has-cursor");
    window.addEventListener("pointermove", function (e) { mx = e.clientX; my = e.clientY; }, { passive: true });
    document.addEventListener("mouseleave", function () { mx = my = -100; });
    bindHover($$("a, button, summary, [data-hover]"));
    bindMagnetic($$("[data-magnetic]"));
    var setLabel = function (el, txt) {
      el.addEventListener("mouseenter", function () { label.textContent = txt; cursor.classList.add("is-label"); });
      el.addEventListener("mouseleave", function () { cursor.classList.remove("is-label"); });
    };
    if (cfRoot) setLabel(cfRoot, "DRAG");
    $$(".svc").forEach(function (el) { setLabel(el, "VIEW"); });
    $$("[data-tilt]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--ry", ((px - .5) * 10).toFixed(2) + "deg"); el.style.setProperty("--rx", ((.5 - py) * 8).toFixed(2) + "deg");
        el.style.setProperty("--mx", (px * 100).toFixed(1) + "%"); el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
      });
      el.addEventListener("mouseleave", function () { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); });
    });
  }

  /* ---------- Scroll-driven engine ---------- */
  var progress = $(".progress"), sticky = $(".sticky-cta"), contact = $("#contact");
  var wms = $$("[data-wm]"), pimgs = $$("[data-parallax-img]");
  var mqSpeed = 0, mqs = $$(".marquee__track").map(function (el) { return { el: el, x: 0, dir: el.getAttribute("data-dir") === "1" ? -1 : 1, parts: el.parentElement.classList.contains("marquee--cta") ? 3 : 2 }; });
  var footer = $(".footer"), mainEl = $("#main");
  var flowList = $(".flow__list"), steps = $$(".step"), flowRunner = null;
  if (flowList) { flowRunner = document.createElement("span"); flowRunner.className = "flow__runner"; flowRunner.setAttribute("aria-hidden", "true"); flowList.appendChild(flowRunner); }
  // footer curtain reveal (only when the footer fits on screen)
  var setCurtain = function () { if (!footer) return; doc.classList.toggle("has-curtain", !reduce && window.innerWidth >= 768 && footer.offsetHeight < window.innerHeight * .9); };
  setCurtain(); window.addEventListener("resize", setCurtain);
  var heroInner = $(".hero__inner"), heroScroll = $(".hero__scroll");
  var lastY = window.scrollY, vel = 0, sy = window.scrollY;

  function loop() {
    requestAnimationFrame(loop);
    var y = window.scrollY, vh = window.innerHeight;
    vel = lerp(vel, y - lastY, .2);
    // header
    var heroH = hero ? hero.offsetHeight : vh;
    header.classList.toggle("is-solid", y > heroH - 90);
    if (Math.abs(y - sy) > 8) {
      header.classList.toggle("is-hidden", y > sy && y > heroH && !doc.classList.contains("menu-open"));
      sy = y;
    }
    // progress
    if (progress) progress.style.setProperty("--p", (y / Math.max(1, document.documentElement.scrollHeight - vh)).toFixed(4));
    // sticky CTA
    if (sticky) {
      var show = y > heroH * .8 && (!contact || contact.getBoundingClientRect().top > vh * .7);
      sticky.classList.toggle("is-show", show); sticky.setAttribute("aria-hidden", show ? "false" : "true");
      var sa = $("a", sticky); if (sa) sa.tabIndex = show ? 0 : -1;
    }
    if (!reduce) {
      // hero content drifts and fades
      if (heroInner && y < heroH * 1.2) {
        var k = y / heroH;
        heroInner.style.transform = "translate3d(0," + (y * .32).toFixed(1) + "px,0)";
        heroInner.style.opacity = String(clamp(1 - k * 1.3, 0, 1));
        if (heroScroll) heroScroll.style.transform = "translateY(" + (y * .2).toFixed(1) + "px)";
      }
      // watermark words slide sideways
      wms.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return;
        var p = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = "translate3d(" + (p * 18).toFixed(2) + "vw,0,0)";
      });
      // image parallax
      pimgs.forEach(function (img) {
        var r = img.parentElement.getBoundingClientRect(); if (r.bottom < -100 || r.top > vh + 100) return;
        var p = (r.top + r.height / 2 - vh / 2) / vh;
        img.style.transform = "translate3d(0," + (p * -60).toFixed(1) + "px,0)";
      });
      // marquees react to scroll velocity
      mqSpeed = lerp(mqSpeed, 1 + Math.min(Math.abs(vel) * .35, 12), .1);
      mqs.forEach(function (m) {
        var r = m.el.parentElement.getBoundingClientRect(); if (r.bottom < -50 || r.top > vh + 50) return;
        var parts = m.parts || 2;
        m.x -= mqSpeed * .6 * m.dir * (vel < -0.5 ? -1 : 1);
        var unit = m.el.scrollWidth / parts; if (unit) { if (m.x <= -unit) m.x += unit; if (m.x > 0) m.x -= unit; }
        m.el.style.transform = "translate3d(" + m.x.toFixed(1) + "px,0,0) skewX(" + clamp(-vel * .25 * m.dir, -12, 12).toFixed(2) + "deg)";
      });
      // ---- latter-half scrubs ----
      if (contact) {
        var cr = contact.getBoundingClientRect();
        if (cr.top < vh * 1.2 && cr.bottom > -100) {
          var cp = clamp(1 - cr.top / vh, 0, 1);
          contact.style.setProperty("--cp", (1 - Math.pow(1 - cp, 3)).toFixed(4));
          if (cp > .45) contact.classList.add("is-lit");
        }
      }
      if (footer && mainEl) {
        var mb = mainEl.getBoundingClientRect().bottom;
        if (mb < vh + 10) footer.style.setProperty("--fp", clamp((vh - mb) / Math.max(1, footer.offsetHeight), 0, 1).toFixed(4));
      }
      if (flowRunner && flowList) flowRunner.classList.toggle("is-run", Math.abs(vel) > .6);
    }
    // flow line progress
    if (flowList) {
      var fr = flowList.getBoundingClientRect();
      var fp = clamp((vh * .78 - fr.top) / (fr.height + vh * .35), 0, 1);
      if (reduce) fp = 1;
      flowList.style.setProperty("--p", fp.toFixed(4));
      steps.forEach(function (s, i) { s.classList.toggle("is-on", fp >= (i + .35) / steps.length || reduce); });
    }
    // coverflow
    if (cfRoot && N) {
      if (!drag || !drag.moved) pos = lerp(pos, target, .09);
      if (Math.abs(pos - target) > .0005 || (drag && drag.moved)) layoutCards();
    }
    // cursor
    if (useFx && cursor) {
      rx = lerp(rx, mx, .18); ry = lerp(ry, my, .18);
      dot.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
      ring.style.transform = "translate3d(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px,0)";
    }
    lastY = y;
  }
  requestAnimationFrame(loop);
  window.addEventListener("resize", function () { if (cfRoot && N) layoutCards(); });
})();
