/* MitsuCap — content reference site. Vanilla JS, no dependencies. */
(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky header shadow ---------- */
  var header = $(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile drawer ---------- */
  var drawer = $(".drawer");
  var toggle = $(".nav-toggle");
  if (drawer && toggle) {
    var lastFocus = null;
    var openDrawer = function () {
      lastFocus = document.activeElement;
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      var close = $(".drawer__close", drawer);
      if (close) close.focus();
    };
    var closeDrawer = function () {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    };
    toggle.addEventListener("click", openDrawer);
    $$("[data-drawer-close]", drawer).forEach(function (el) { el.addEventListener("click", closeDrawer); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && drawer.classList.contains("is-open")) closeDrawer(); });
    $$(".drawer__group > button", drawer).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var group = btn.parentElement;
        var open = group.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
  }

  /* ---------- Desktop dropdown: close on Escape ---------- */
  $$(".nav__item").forEach(function (item) {
    item.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { var link = $(".nav__link", item); if (link) link.focus(); item.blur(); document.activeElement.blur(); }
    });
  });

  /* ---------- Generic slider (hero + sidebar promo) ---------- */
  function slider(root, slideSel, dotSel, interval) {
    var slides = $$(slideSel, root);
    var dots = $$(dotSel, root);
    var counter = $("[data-slide-count]", root);
    if (slides.length < 2) return;
    var i = 0, timer = null;
    var go = function (n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("is-active", k === i); s.setAttribute("aria-hidden", k === i ? "false" : "true"); });
      dots.forEach(function (d, k) { d.classList.toggle("is-active", k === i); d.setAttribute("aria-current", k === i ? "true" : "false"); });
      if (counter) counter.textContent = String(i + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
    };
    var start = function () { if (!reduceMotion) { stop(); timer = setInterval(function () { go(i + 1); }, interval); } };
    var stop = function () { if (timer) clearInterval(timer); timer = null; };
    dots.forEach(function (d, k) { d.addEventListener("click", function () { go(k); start(); }); });
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    go(0);
    start();
  }
  $$("[data-slider='hero']").forEach(function (el) { slider(el, ".hero__slide", ".hero__dot", 7000); });
  $$("[data-slider='promo']").forEach(function (el) { slider(el, ".promo__slide", ".promo__dots button", 5500); });

  /* ---------- Reveal on scroll ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Demo forms (no backend) ---------- */
  $$("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var status = $(".form-status", form);
      if (status) {
        status.textContent = "Thank you! This is a preview of your website content, so this form does not send anything yet. On the new website, messages will go straight to the MitsuCap team.";
        status.classList.add("is-visible");
        status.focus && status.focus();
      }
    });
  });

  /* ---------- Get a Quote: country → state field logic (mirrors the original form) ---------- */
  var country = $("#q-country");
  if (country) {
    var stateSelect = $("[data-state-select]");
    var stateText = $("[data-state-text]");
    var syncState = function () {
      var isUS = country.value === "United States";
      // Disabled controls are skipped by validation, so the hidden required select can't block submit.
      if (stateSelect) { stateSelect.hidden = !isUS; $("select", stateSelect).disabled = !isUS; }
      if (stateText) { stateText.hidden = isUS; $("input", stateText).disabled = isUS; }
    };
    country.addEventListener("change", syncState);
    syncState();
  }

  /* ---------- Forms page: two-step download flow ---------- */
  var dl = $("[data-download-flow]");
  if (dl) {
    var steps = $$(".form-step", dl);
    var markers = $$(".steps li", dl);
    var show = function (n) {
      steps.forEach(function (s, k) { s.hidden = k !== n; });
      markers.forEach(function (m, k) { m.classList.toggle("is-active", k <= n); });
      var first = steps[n] && steps[n].querySelector("input, select, button, a");
      if (first) first.focus();
    };
    $$("[data-step-next]", dl).forEach(function (b) {
      b.addEventListener("click", function () {
        var cur = steps.findIndex(function (s) { return !s.hidden; });
        var fields = $$("input, select, textarea", steps[cur]);
        for (var k = 0; k < fields.length; k++) { if (!fields[k].checkValidity()) { fields[k].reportValidity(); return; } }
        if (cur === 1) {
          var choice = $("#f-form", dl).value;
          $$("[data-form-result]", dl).forEach(function (r) { r.hidden = r.getAttribute("data-form-result") !== choice; });
        }
        show(cur + 1);
      });
    });
    $$("[data-step-prev]", dl).forEach(function (b) {
      b.addEventListener("click", function () {
        var cur = steps.findIndex(function (s) { return !s.hidden; });
        show(Math.max(0, cur - 1));
      });
    });
    show(0);
  }

  /* ---------- Content notes toggle (remembered per browser) ---------- */
  var notesBtn = $(".notes-toggle");
  if (notesBtn) {
    var KEY = "mitsucap-hide-notes";
    var apply = function (hidden) {
      document.body.classList.toggle("hide-notes", hidden);
      notesBtn.setAttribute("aria-pressed", hidden ? "false" : "true");
      $(".notes-toggle__label", notesBtn).textContent = hidden ? "Show content notes" : "Hide content notes";
    };
    var stored = false;
    try { stored = localStorage.getItem(KEY) === "1"; } catch (err) { /* storage unavailable */ }
    apply(stored);
    notesBtn.addEventListener("click", function () {
      var hidden = !document.body.classList.contains("hide-notes");
      apply(hidden);
      try { localStorage.setItem(KEY, hidden ? "1" : "0"); } catch (err) { /* ignore */ }
    });
    if (!$(".dev-note")) notesBtn.hidden = true;
  }

  /* ---------- Rates widget: scale fixed-width iframe to its column ---------- */
  $$(".rates-widget").forEach(function (box) {
    var frame = $("iframe", box);
    var fit = function () {
      var s = Math.min(1, box.clientWidth / 630);
      frame.style.transform = "scale(" + s + ")";
      box.style.height = Math.ceil(320 * s) + "px";
    };
    fit();
    window.addEventListener("resize", fit);
  });

$1
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
