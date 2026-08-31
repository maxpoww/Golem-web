/* Golem — golem-os.com
   Motion with intent, idle at rest: every demo runs only while
   visible, and everything respects prefers-reduced-motion. */

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Scroll reveal ─────────────────────────────────────────── */
  var revealed = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        revealed.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  document.querySelectorAll(".rv, .refuse").forEach(function (el) {
    revealed.observe(el);
  });

  /* ── Live clock in the hero topbar ─────────────────────────── */
  var clock = document.getElementById("g-clock");
  if (clock) {
    var tick = function () {
      var d = new Date();
      clock.textContent =
        String(d.getHours()).padStart(2, "0") + ":" +
        String(d.getMinutes()).padStart(2, "0");
    };
    tick();
    setInterval(tick, 15000);
  }

  /* ── Hero tilt (subtle, pointer only) ──────────────────────── */
  var desktop = document.getElementById("hero-desktop");
  if (desktop && !reduced && window.matchMedia("(pointer: fine)").matches) {
    var scene = desktop.parentElement;
    scene.addEventListener("pointermove", function (ev) {
      var r = scene.getBoundingClientRect();
      var x = (ev.clientX - r.left) / r.width - 0.5;
      var y = (ev.clientY - r.top) / r.height - 0.5;
      desktop.style.transform =
        "rotateX(" + (6 - y * 5) + "deg) rotateY(" + x * 5 + "deg)";
    });
    scene.addEventListener("pointerleave", function () {
      desktop.style.transform = "rotateX(6deg)";
    });
  }

  /* ── Demo runner: a looping timeline that only plays on screen ─ */
  function loopWhileVisible(el, steps, pauseBetween) {
    if (!el) return;
    var running = false, timer = null, idx = 0;

    function next() {
      if (!running) return;
      var step = steps[idx];
      step.fn();
      idx = (idx + 1) % steps.length;
      timer = setTimeout(next, idx === 0 ? (pauseBetween || 1200) : step.ms);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !running) {
          running = true; idx = 0; next();
        } else if (!e.isIntersecting && running) {
          running = false; clearTimeout(timer);
          steps[steps.length - 1].fn(); // settle to rest state
          idx = 0;
        }
      });
    }, { threshold: 0.35 });
    io.observe(el);
  }

  /* Hero OPTIONS box: appears, breathes, retreats */
  var obox = document.getElementById("hero-obox");
  var heroPill = document.getElementById("hero-pill");
  loopWhileVisible(obox, [
    { ms: 1800, fn: function () { obox.classList.remove("show"); if (heroPill) heroPill.classList.remove("on"); } },
    { ms: 5200, fn: function () { obox.classList.add("show"); } },
    { ms: 2600, fn: function () { obox.classList.remove("show"); if (heroPill) heroPill.classList.add("on"); } },
    { ms: 10,   fn: function () { if (heroPill) heroPill.classList.remove("on"); } }
  ], 1400);

  /* Demo 1 — share card */
  var dUrl = document.getElementById("d-url");
  var dShare = document.getElementById("d-share");
  loopWhileVisible(dUrl, [
    { ms: 1400, fn: function () { dUrl.classList.remove("copied"); dShare.classList.remove("show"); } },
    { ms: 700,  fn: function () { dUrl.classList.add("copied"); } },
    { ms: 3800, fn: function () { dShare.classList.add("show"); } },
    { ms: 10,   fn: function () { dUrl.classList.remove("copied"); dShare.classList.remove("show"); } }
  ], 1200);

  /* Demo 2 — battery ladder */
  var dBatt = document.getElementById("d-batt");
  if (dBatt) {
    var juice = dBatt.querySelector(".juice");
    var pct = document.getElementById("d-pct");
    var bell = document.getElementById("d-bell");
    var notif = document.getElementById("d-notif");
    var susp = document.getElementById("d-suspend");
    var setBatt = function (p, cls) {
      pct.textContent = p + "%";
      juice.style.width = Math.max(p, 4) + "%";
      dBatt.className = "d-batt" + (cls ? " " + cls : "");
    };
    loopWhileVisible(dBatt, [
      { ms: 1600, fn: function () {
        setBatt(34, ""); bell.className = "g-bell";
        notif.classList.remove("show"); susp.classList.remove("show");
      } },
      { ms: 1300, fn: function () { setBatt(10, "low"); bell.className = "g-bell red"; notif.classList.add("show"); } },
      { ms: 2200, fn: function () { notif.classList.remove("show"); } },
      { ms: 2000, fn: function () { setBatt(7, "crit"); bell.className = "g-bell red beat"; } },
      { ms: 1600, fn: function () { setBatt(5, "crit"); susp.classList.add("show"); } },
      { ms: 1800, fn: function () {
        setBatt(34, ""); bell.className = "g-bell";
        notif.classList.remove("show"); susp.classList.remove("show");
      } }
    ], 1000);
  }

  /* Demo 3 — dictionary */
  var dWord = document.getElementById("d-word");
  var dDef = document.getElementById("d-def");
  loopWhileVisible(dWord, [
    { ms: 1500, fn: function () { dWord.classList.remove("sel"); dDef.classList.remove("show"); } },
    { ms: 800,  fn: function () { dWord.classList.add("sel"); } },
    { ms: 4200, fn: function () { dDef.classList.add("show"); } },
    { ms: 10,   fn: function () { dWord.classList.remove("sel"); dDef.classList.remove("show"); } }
  ], 1200);

  /* Demo 4 — window pills */
  var dPills = document.getElementById("d-pills");
  if (dPills) {
    var pills = dPills.querySelectorAll(".g-pill");
    var wins = document.querySelectorAll("#d-winstage .d-win");
    var focus = function (i) {
      pills.forEach(function (p, j) { p.classList.toggle("on", i === j); });
      wins.forEach(function (w, j) { w.classList.toggle("front", i === j); });
    };
    loopWhileVisible(dPills, [
      { ms: 2200, fn: function () { focus(0); } },
      { ms: 2200, fn: function () { focus(1); } },
      { ms: 2200, fn: function () { focus(2); } },
      { ms: 10,   fn: function () { focus(0); } }
    ], 400);
  }

  /* ── Rollback: interactive ─────────────────────────────────── */
  var rbScreen = document.getElementById("rb-screen");
  if (rbScreen) {
    var rbErr = document.getElementById("rb-err");
    var rbBad = document.getElementById("rb-gen-bad");
    var rbNow = document.getElementById("rb-gen-now");
    var btnBreak = document.getElementById("rb-break");
    var btnBack = document.getElementById("rb-back");
    var toast = document.getElementById("rb-toast");

    btnBreak.addEventListener("click", function () {
      rbScreen.classList.add("broken");
      rbErr.classList.add("show");
      rbBad.style.display = "";
      rbBad.classList.add("bad");
      rbNow.classList.remove("now");
      btnBreak.disabled = true;
      btnBack.disabled = false;
      btnBack.classList.add("pulse");
      toast.className = "rb-toast err";
      toast.textContent = "Generation 41 — the compositor is gone. On any other OS: reinstall weekend.";
    });

    btnBack.addEventListener("click", function () {
      rbScreen.classList.remove("broken");
      rbScreen.classList.add("healing");
      rbErr.classList.remove("show");
      rbBad.classList.remove("bad");
      rbBad.classList.add("dead");
      rbNow.classList.add("now");
      btnBack.disabled = true;
      btnBack.classList.remove("pulse");
      toast.className = "rb-toast ok";
      toast.textContent = "Generation 40 restored. It never happened.";
      setTimeout(function () {
        rbScreen.classList.remove("healing");
        btnBreak.disabled = false;
        btnBreak.textContent = "Break it again";
        rbBad.classList.remove("dead");
        rbBad.style.display = "none";
      }, 1500);
    });
  }

  /* ── Phone fusion: chips flying phone → laptop ─────────────── */
  var fStage = document.getElementById("fusion-stage");
  if (fStage && !reduced) {
    var chips = [
      { text: "Maria — “seen my slides?”", from: "Notification · phone" },
      { text: "📋 https://…/design-doc", from: "Clipboard · phone" },
      { text: "IMG_2481.jpg → ~/Pictures", from: "Photo · phone" }
    ];
    var ci = 0, fRunning = false, fTimer = null;
    var spawn = function () {
      if (!fRunning) return;
      var phone = fStage.querySelector(".f-phone");
      var laptop = fStage.querySelector(".f-laptop");
      var chip = document.createElement("div");
      chip.className = "f-chip";
      chip.innerHTML = "<span class='from'>" + chips[ci].from + "</span>" + chips[ci].text;
      ci = (ci + 1) % chips.length;
      var pr = phone.getBoundingClientRect();
      var lr = laptop.getBoundingClientRect();
      var sr = fStage.getBoundingClientRect();
      chip.style.left = (pr.left - sr.left + 8) + "px";
      chip.style.top = (pr.top - sr.top + 34) + "px";
      chip.style.setProperty("--fly-x", (lr.left - pr.left + lr.width * 0.18) + "px");
      chip.style.setProperty("--fly-y", (lr.top - pr.top - 10) + "px");
      fStage.appendChild(chip);
      requestAnimationFrame(function () { chip.classList.add("fly"); });
      setTimeout(function () { chip.remove(); }, 2800);
      fTimer = setTimeout(spawn, 3400);
    };
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !fRunning) { fRunning = true; spawn(); }
        else if (!e.isIntersecting) { fRunning = false; clearTimeout(fTimer); }
      });
    }, { threshold: 0.35 }).observe(fStage);
  }

  /* ── Copy buttons (download page) ──────────────────────────── */
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var code = btn.parentElement.querySelector("code");
      navigator.clipboard.writeText(code.innerText).then(function () {
        var t = btn.textContent;
        btn.textContent = "copied";
        setTimeout(function () { btn.textContent = t; }, 1400);
      });
    });
  });

  /* ── Footer year ───────────────────────────────────────────── */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
