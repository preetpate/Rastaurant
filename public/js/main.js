/* Prime Restaurant — site interactions */
(function () {
  "use strict";

  /* ---------- Data ---------- */
  const MENU = {
    starters: [
      { name: "Charred Corn Chaat", price: "$12", desc: "Sweetcorn, tamarind, mint yoghurt, sev.", tag: "veg" },
      { name: "Tandoori Prawns", price: "$18", desc: "Ajwain-cured tiger prawns, burnt lime butter.", tag: "spicy" },
      { name: "Beetroot Galouti", price: "$14", desc: "Silken beet kebab, smoked chilli, warm paratha.", tag: "veg" },
      { name: "Kashmiri Lamb Chops", price: "$21", desc: "Twelve-hour marinade, black cardamom, saffron jus." },
      { name: "Curry Leaf Calamari", price: "$16", desc: "Semolina crust, kokum aioli, pickled shallot." },
      { name: "Paneer Tikka", price: "$13", desc: "House paneer, ember-roasted peppers, mustard oil.", tag: "veg" }
    ],
    mains: [
      { name: "Butter Chicken", price: "$26", desc: "Clay-oven chicken, fenugreek tomato cream, naan." },
      { name: "Goan Fish Curry", price: "$29", desc: "Line-caught snapper, coconut, tamarind, red chilli.", tag: "spicy" },
      { name: "Dal Saffron", price: "$19", desc: "Black lentils simmered overnight, cultured butter.", tag: "veg" },
      { name: "Lamb Rogan Josh", price: "$32", desc: "Slow-braised shoulder, Kashmiri chilli, saffron rice." },
      { name: "Kerala Duck Moilee", price: "$31", desc: "Confit duck leg, coconut milk, green chilli, curry leaf." },
      { name: "Wild Mushroom Biryani", price: "$24", desc: "Aged basmati, morels, mint raita, pastry seal.", tag: "veg" }
    ],
    desserts: [
      { name: "Saffron Kulfi", price: "$11", desc: "Slow-reduced milk, pistachio praline, rose." },
      { name: "Gulab Jamun Sundae", price: "$12", desc: "Warm dumplings, cardamom ice cream, burnt honey." },
      { name: "Mango Shrikhand", price: "$10", desc: "Hung curd, Alphonso mango, black salt tuile.", tag: "veg" },
      { name: "Dark Chocolate Kaju", price: "$13", desc: "70% ganache, cashew fudge, cocoa nib crumble." }
    ],
    drinks: [
      { name: "Tamarind Margarita", price: "$16", desc: "Blanco tequila, tamarind, chilli salt." },
      { name: "Curry Leaf Gimlet", price: "$15", desc: "Gin, curry leaf cordial, lime." },
      { name: "Masala Chai Old Fashioned", price: "$17", desc: "Chai-washed bourbon, jaggery, orange." },
      { name: "Salt Lassi", price: "$7", desc: "Cultured yoghurt, roasted cumin, mint.", tag: "veg" },
      { name: "Kokum Soda", price: "$8", desc: "Kokum, ginger, soda — zero proof.", tag: "veg" },
      { name: "Sommelier's Pour", price: "$14", desc: "Rotating low-intervention glass. Ask tonight's list." }
    ]
  };

  const REVIEWS = [
    { quote: "The best Indian food I have eaten outside of Delhi. The lamb chops alone are worth the trip.", author: "Amara Patel · Food & Fire Magazine" },
    { quote: "Warm, unhurried service and a wine list that actually surprises you. We have been back four times this year.", author: "Daniel Ross · Regular since 2019" },
    { quote: "A masterclass in restraint. Every dish tastes like it has been cooked a thousand times, and still with love.", author: "The Springfield Review · ★★★★★" },
    { quote: "They handled our nut allergy flawlessly and still made the tasting menu feel generous. Rare and appreciated.", author: "Meera & Josh · Anniversary dinner" }
  ];

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ---------- Menu rendering ---------- */
  function itemMarkup(item) {
    const badge = item.tag === "veg"
      ? '<span class="badge veg">Veg</span>'
      : item.tag === "spicy" ? '<span class="badge">Spicy</span>' : "";
    return (
      '<article class="menu-item">' +
        "<h3>" + item.name + badge + "</h3>" +
        '<span class="price">' + item.price + "</span>" +
        '<p class="desc">' + item.desc + "</p>" +
        '<button class="add-btn" data-name="' + item.name + '" data-price="' +
          item.price.replace("$", "") + '">Add</button>' +
      "</article>"
    );
  }

  window.PRIME_MENU = MENU;

  Object.keys(MENU).forEach(function (key) {
    const panel = $('[data-panel="' + key + '"]');
    if (panel) panel.innerHTML = MENU[key].map(itemMarkup).join("");
  });

  $$(".tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      const key = tab.dataset.tab;
      $$(".tab").forEach(function (t) {
        const on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", String(on));
      });
      $$(".menu-grid").forEach(function (p) {
        p.hidden = p.dataset.panel !== key;
      });
    });
  });

  /* ---------- Reviews slider ---------- */
  const track = $("#reviewTrack");
  const dotsWrap = $("#reviewDots");
  let current = 0;

  if (track && dotsWrap) {
    track.innerHTML = REVIEWS.map(function (r) {
      return (
        '<blockquote class="review-card">' +
          '<div class="review-stars">★★★★★</div>' +
          '<p class="review-quote">“' + r.quote + '”</p>' +
          '<footer class="review-author">' + r.author + "</footer>" +
        "</blockquote>"
      );
    }).join("");

    dotsWrap.innerHTML = REVIEWS.map(function (_, i) {
      return '<button class="dot' + (i === 0 ? " is-active" : "") +
        '" data-index="' + i + '" aria-label="Go to review ' + (i + 1) + '"></button>';
    }).join("");

    const go = function (index) {
      current = (index + REVIEWS.length) % REVIEWS.length;
      track.style.transform = "translateX(-" + current * 100 + "%)";
      $$(".dot", dotsWrap).forEach(function (d, i) {
        d.classList.toggle("is-active", i === current);
      });
    };

    $("#reviewNext").addEventListener("click", function () { go(current + 1); });
    $("#reviewPrev").addEventListener("click", function () { go(current - 1); });
    dotsWrap.addEventListener("click", function (e) {
      const dot = e.target.closest(".dot");
      if (dot) go(Number(dot.dataset.index));
    });

    let timer = setInterval(function () { go(current + 1); }, 7000);
    const slider = $(".review-slider");
    slider.addEventListener("mouseenter", function () { clearInterval(timer); });
    slider.addEventListener("mouseleave", function () {
      timer = setInterval(function () { go(current + 1); }, 7000);
    });
  }

  /* ---------- Header, nav, scroll spy ---------- */
  const header = $("#siteHeader");
  const nav = $("#nav");
  const navToggle = $("#navToggle");
  const toTop = $("#toTop");
  const sections = $$("main section[id]");
  const navLinks = $$(".nav-list a");

  navToggle.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });

  $$("a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const onScroll = function () {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 40);
    toTop.hidden = y < 600;

    let activeId = "";
    sections.forEach(function (s) {
      if (y >= s.offsetTop - 140) activeId = s.id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + activeId);
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Reveal on scroll + stat counters ---------- */
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);

      const num = entry.target.querySelector(".stat-num");
      if (num) countUp(num);
    });
  }, { threshold: 0.15 });
  $$(".reveal").forEach(function (el) { revealObserver.observe(el); });

  function countUp(el) {
    const target = Number(el.dataset.count || 0);
    const duration = 1200;
    const start = performance.now();
    const step = function (now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Reservation form ---------- */
  const form = $("#reserveForm");
  const success = $("#formSuccess");
  const dateInput = $("#date");

  const today = new Date();
  dateInput.min = today.toISOString().split("T")[0];

  const setError = function (input, message) {
    const field = input.closest(".field");
    field.classList.toggle("invalid", Boolean(message));
    const slot = field.querySelector('[data-error-for="' + input.id + '"]');
    if (slot) slot.textContent = message || "";
  };

  const validate = function () {
    let ok = true;
    const name = $("#name");
    const email = $("#email");
    const time = $("#time");
    const guests = $("#guests");

    if (name.value.trim().length < 2) { setError(name, "Please enter your name."); ok = false; }
    else setError(name, "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
      setError(email, "Please enter a valid email address."); ok = false;
    } else setError(email, "");

    if (!dateInput.value) { setError(dateInput, "Pick a date."); ok = false; }
    else if (dateInput.value < dateInput.min) { setError(dateInput, "Date must be in the future."); ok = false; }
    else setError(dateInput, "");

    if (!time.value) { setError(time, "Pick a time."); ok = false; } else setError(time, "");
    if (!guests.value) { setError(guests, "How many guests?"); ok = false; } else setError(guests, "");

    return ok;
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) {
      const firstInvalid = form.querySelector(".field.invalid input, .field.invalid select");
      if (firstInvalid) firstInvalid.focus();
      success.hidden = true;
      return;
    }
    const name = $("#name").value.trim().split(" ")[0];
    const guests = $("#guests").value;
    success.textContent = "Thank you, " + name + "! We've received your request for " + guests +
      " on " + dateInput.value + " at " + $("#time").value + ". We'll confirm by email shortly.";
    success.hidden = false;
    form.reset();
    $$(".field").forEach(function (f) { f.classList.remove("invalid"); });
    $$(".error").forEach(function (s) { s.textContent = ""; });
  });

  form.addEventListener("input", function (e) {
    if (e.target.closest(".field.invalid")) validate();
  });

  /* ---------- Newsletter ---------- */
  const news = $("#newsForm");
  news.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = $("#newsEmail");
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
    const out = $("#newsSuccess");
    out.textContent = ok ? "You're on the list — see you at the next supper club." : "Please enter a valid email address.";
    out.style.background = ok ? "rgba(76,125,60,.12)" : "rgba(180,69,31,.12)";
    out.style.color = ok ? "#7fbf6a" : "#e08a6b";
    out.hidden = false;
    if (ok) news.reset();
  });

  /* ---------- Footer year ---------- */
  $("#year").textContent = String(new Date().getFullYear());
})();
