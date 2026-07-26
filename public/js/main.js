/* Prime Restaurant — site interactions */
(function () {
  "use strict";

  /* ---------- Menu Data — Italian, Punjabi, Mexican + Drinks ---------- */
  const MENU = {
    italian: [
      {
        name: "Margherita Pizza",
        price: 349,
        desc: "San Marzano tomato, fresh mozzarella, basil, extra virgin olive oil.",
        tag: "veg",
        img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Chicken Penne Arrabbiata",
        price: 449,
        desc: "Grilled chicken, spicy tomato sauce, garlic, fresh chilli, parmesan.",
        img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Pesto Pasta",
        price: 399,
        desc: "Basil pesto, pine nuts, cherry tomatoes, parmesan, spaghetti.",
        tag: "veg",
        img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Chicken Lasagne",
        price: 499,
        desc: "Layered pasta, minced chicken bolognese, béchamel, mozzarella.",
        img: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Mushroom Risotto",
        price: 429,
        desc: "Arborio rice, mixed mushrooms, white wine, parmesan, truffle oil.",
        tag: "veg",
        img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Tiramisu",
        price: 249,
        desc: "Espresso-soaked ladyfingers, mascarpone cream, cocoa dusting.",
        tag: "veg",
        img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
      }
    ],
    punjabi: [
      {
        name: "Butter Chicken",
        price: 379,
        desc: "Tandoori chicken in rich tomato-butter gravy, fenugreek, cream.",
        img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Dal Makhani",
        price: 299,
        desc: "Black lentils slow-cooked overnight, butter, cream, spices.",
        tag: "veg",
        img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Amritsari Kulcha",
        price: 199,
        desc: "Stuffed tandoor bread, spiced potato filling, served with chole.",
        tag: "veg",
        img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Sarson da Saag & Makki Roti",
        price: 329,
        desc: "Mustard greens cooked in desi ghee, served with cornmeal flatbread.",
        tag: "veg",
        img: "https://images.unsplash.com/photo-1627662168223-7df99068099a?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Lamb Rogan Josh",
        price: 499,
        desc: "Slow-braised Kashmiri lamb, Kashmiri chilli, saffron basmati.",
        tag: "spicy",
        img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Paneer Tikka Masala",
        price: 349,
        desc: "Chargrilled cottage cheese in spiced tomato-onion masala, naan.",
        tag: "veg",
        img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80"
      }
    ],
    mexican: [
      {
        name: "Chicken Tacos (3 pcs)",
        price: 379,
        desc: "Grilled chicken, pico de gallo, guacamole, sour cream, corn tortilla.",
        tag: "spicy",
        img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Paneer Quesadilla",
        price: 299,
        desc: "Spiced paneer, peppers, cheese, jalapeños in crispy flour tortilla.",
        tag: "veg",
        img: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Beef Burrito Bowl",
        price: 449,
        desc: "Seasoned ground beef, rice, black beans, corn salsa, sour cream.",
        tag: "spicy",
        img: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Veggie Nachos",
        price: 329,
        desc: "Tortilla chips, jalapeños, cheese sauce, guacamole, sour cream.",
        tag: "veg",
        img: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Chicken Enchiladas",
        price: 429,
        desc: "Corn tortillas filled with chicken, smothered in red chilli sauce, cheese.",
        img: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Churros with Chocolate",
        price: 199,
        desc: "Crispy fried dough, cinnamon sugar, warm dark chocolate dipping sauce.",
        tag: "veg",
        img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=600&q=80"
      }
    ],
    drinks: [
      {
        name: "Mango Lassi",
        price: 149,
        desc: "Fresh Alphonso mango, creamy yoghurt, hint of cardamom.",
        tag: "veg",
        img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Masala Chai",
        price: 99,
        desc: "Strong tea, fresh ginger, cardamom, cinnamon, full-fat milk.",
        tag: "veg",
        img: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Virgin Mojito",
        price: 179,
        desc: "Fresh lime, mint, soda, hint of sugar — zero proof and refreshing.",
        tag: "veg",
        img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Cold Coffee",
        price: 169,
        desc: "Strong espresso, cold milk, ice, touch of vanilla.",
        tag: "veg",
        img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Watermelon Juice",
        price: 129,
        desc: "Fresh-pressed watermelon, mint, black salt — served chilled.",
        tag: "veg",
        img: "https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?auto=format&fit=crop&w=600&q=80"
      },
      {
        name: "Lemonade",
        price: 119,
        desc: "Fresh lime, sugar, soda, mint — the classic thirst quencher.",
        tag: "veg",
        img: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?auto=format&fit=crop&w=600&q=80"
      }
    ]
  };

  const REVIEWS = [
    { quote: "Butter Chicken aur Dal Makhani — life mein pehli baar itna authentic khana khaya. Dil khush ho gaya!", author: "Rahul Sharma · Google Review ★★★★★" },
    { quote: "Pizza ka taste gajab tha, aur Mango Lassi toh next level. Definitely coming back!", author: "Priya Mehta · Regular Guest" },
    { quote: "Tacos aur Nachos ka combination perfect tha. Family ke saath aana tha, sabne enjoy kiya.", author: "Vikram Singh · Family Dinner" },
    { quote: "QR se order kiya, 20 minute mein fresh hot food — service is top class!", author: "Neha Patel · Zomato Review ★★★★★" }
  ];

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ---------- Menu rendering ---------- */
  function itemMarkup(item) {
    const badge = item.tag === "veg"
      ? '<span class="badge veg">🌿 Veg</span>'
      : item.tag === "spicy" ? '<span class="badge spicy">🌶 Spicy</span>' : "";
    const imgHtml = item.img
      ? '<div class="menu-img-wrap"><img class="menu-img" src="' + item.img + '" alt="' + item.name + '" loading="lazy" /></div>'
      : "";
    return (
      '<article class="menu-item">' +
        imgHtml +
        '<div class="menu-item-body">' +
          "<h3>" + item.name + "</h3>" +
          (badge ? '<div class="menu-badges">' + badge + "</div>" : "") +
          '<p class="desc">' + item.desc + "</p>" +
          '<div class="menu-item-foot">' +
            '<span class="price">₹' + item.price + "</span>" +
            '<button class="add-btn" data-name="' + item.name + '" data-price="' + item.price + '">+ Add</button>' +
          "</div>" +
        "</div>" +
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
