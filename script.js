(function () {
  "use strict";

  var root = document.documentElement;
  var STORAGE_KEY = "portfolio-lang";
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------------------------------------
     Language switching
  ------------------------------------------------- */
  var i18nNodes = document.querySelectorAll("[data-pt][data-en]");
  var langButtons = document.querySelectorAll(".lang-btn");

  function applyLang(lang) {
    i18nNodes.forEach(function (node) {
      node.textContent = node.getAttribute("data-" + lang);
    });
    langButtons.forEach(function (btn) {
      var active = btn.getAttribute("data-set-lang") === lang;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang === "pt" ? "pt-BR" : "en");
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.getAttribute("data-set-lang"));
    });
  });

  var savedLang = null;
  try { savedLang = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  if (savedLang === "pt" || savedLang === "en") {
    applyLang(savedLang);
  }

  /* -------------------------------------------------
     Boot prompt — types "whoami" once, then reveals name
  ------------------------------------------------- */
  var typedEl = document.getElementById("promptTyped");
  var command = "whoami";

  function typeCommand() {
    if (prefersReducedMotion || !typedEl) {
      if (typedEl) { typedEl.textContent = command; }
      return;
    }
    var i = 0;
    (function step() {
      typedEl.textContent = command.slice(0, i);
      i++;
      if (i <= command.length) {
        setTimeout(step, 90);
      }
    })();
  }
  typeCommand();

  /* -------------------------------------------------
     Career transition bar — fills once on load
  ------------------------------------------------- */
  var fill = document.getElementById("transitionFill");
  if (fill) {
    if (prefersReducedMotion) {
      fill.classList.add("is-filled");
    } else {
      window.requestAnimationFrame(function () {
        setTimeout(function () {
          fill.classList.add("is-filled");
        }, 400);
      });
    }
  }

  /* -------------------------------------------------
     Experience Scroll Controls
  ------------------------------------------------- */
  var expContainer = document.getElementById("expContainer");
  var scrollUpBtn = document.getElementById("scrollUpBtn");
  var scrollDownBtn = document.getElementById("scrollDownBtn");

  if (expContainer && scrollUpBtn && scrollDownBtn) {
    scrollUpBtn.addEventListener("click", function () {
      expContainer.scrollBy({ top: -150, behavior: "smooth" });
    });

    scrollDownBtn.addEventListener("click", function () {
      expContainer.scrollBy({ top: 150, behavior: "smooth" });
    });
  }
})();