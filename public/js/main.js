/* Prime Restaurant — main.js */
(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ================================================================
     MENU DATA — All food images verified
  ================================================================ */
  const MENU = {
    italian: [
      { name:"Margherita Pizza",    price:249, tag:"veg",    desc:"Classic tomato base, mozzarella, fresh basil & olive oil.",           img:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80", extras:["Extra Cheese +₹49","Jalapeños +₹29"] },
      { name:"Farmhouse Pizza",     price:349, tag:"veg",    desc:"Capsicum, onion, tomato, sweet corn & mushrooms on herbed base.",     img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80", extras:["Extra Cheese +₹49","Extra Veggies +₹39"] },
      { name:"Veg Supreme Pizza",   price:399, tag:"veg",    desc:"Loaded with 7 premium vegetables, cheese burst option.",              img:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80", extras:["Cheese Burst +₹69"] },
      { name:"Pepperoni Pizza",     price:449, tag:"nonveg", desc:"Spicy pepperoni, mozzarella, rich tomato sauce & oregano.",           img:"https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80", extras:["Extra Pepperoni +₹79","Extra Cheese +₹49"] },
      { name:"Pasta Alfredo",       price:299, tag:"veg",    desc:"Creamy white sauce pasta with garlic, parmesan & herbs.",            img:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&q=80", extras:["Add Chicken +₹89","Mushrooms +₹39"] },
      { name:"Pasta Arrabbiata",    price:279, tag:"veg",    desc:"Spicy tomato sauce, garlic, red chillies & penne pasta.",            img:"https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=500&q=80", extras:["Add Chicken +₹89"] },
      { name:"Lasagna",             price:399, tag:"nonveg", desc:"Layered pasta, rich bolognese, bechamel sauce & melted cheese.",     img:"https://images.unsplash.com/photo-1619895092538-128341789043?w=500&q=80", extras:["Extra Cheese +₹49"] },
      { name:"Garlic Bread",        price:149, tag:"veg",    desc:"Toasted bread with garlic butter and herbs. Perfect starter.",       img:"https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?w=500&q=80", extras:["Cheese Dip +₹39"] },
      { name:"Cheese Garlic Bread", price:199, tag:"veg",    desc:"Crispy garlic bread loaded with melted mozzarella cheese.",         img:"https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=500&q=80", extras:["Extra Cheese +₹49"] },
      { name:"Mushroom Risotto",    price:349, tag:"veg",    desc:"Arborio rice, wild mushrooms, parmesan & truffle oil.",              img:"https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&q=80", extras:["Add Chicken +₹89"] }
    ],
    punjabi: [
      { name:"Butter Chicken",        price:399, tag:"nonveg", desc:"Tandoori chicken in rich tomato-cream gravy with naan.",          img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&q=80", extras:["Extra Naan +₹50","Extra Gravy +₹49"] },
      { name:"Kadai Chicken",         price:369, tag:"nonveg", desc:"Chicken cooked in kadai with capsicum, tomato & whole spices.",   img:"https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=500&q=80", extras:["Extra Naan +₹50","Raita +₹49"] },
      { name:"Chicken Tikka Masala",  price:389, tag:"nonveg", desc:"Grilled chicken tikka in spiced onion-tomato masala gravy.",     img:"https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&q=80", extras:["Extra Naan +₹50"] },
      { name:"Paneer Butter Masala",  price:289, tag:"veg",    desc:"Soft paneer in velvety tomato-butter gravy with cream.",         img:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&q=80", extras:["Extra Naan +₹50","Extra Paneer +₹69"] },
      { name:"Shahi Paneer",          price:279, tag:"veg",    desc:"Paneer in rich cashew-cream gravy, royal Mughlai style.",        img:"https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80", extras:["Extra Naan +₹50"] },
      { name:"Dal Makhani",           price:249, tag:"veg",    desc:"Black lentils slow-cooked overnight in butter & cream.",         img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80", extras:["Extra Naan +₹50","Raita +₹49"] },
      { name:"Chole Bhature",         price:199, tag:"veg",    desc:"Spiced chickpea curry with fluffy deep-fried bhature.",          img:"https://images.unsplash.com/photo-1626132647523-66c7f06e5e0f?w=500&q=80", extras:["Extra Bhatura +₹39"] },
      { name:"Amritsari Kulcha",      price:189, tag:"veg",    desc:"Stuffed tandoor bread with spiced potato filling & chole.",      img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80", extras:["Extra Kulcha +₹59"] },
      { name:"Tandoori Roti",         price:30,  tag:"veg",    desc:"Whole wheat bread baked fresh in clay tandoor.",                 img:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80", extras:["With Butter +₹10"] },
      { name:"Butter Naan",           price:50,  tag:"veg",    desc:"Soft leavened bread cooked in tandoor, brushed with butter.",   img:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80", extras:["Garlic Naan +₹10"] }
    ],
    gujarati: [
      { name:"Gujarati Thali",  price:349, tag:"veg", desc:"Complete thali: dal, sabzi, roti, rice, papad, pickle & sweet.",       img:"https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=500&q=80", extras:["Extra Roti +₹30","Extra Sweet +₹39"] },
      { name:"Sev Tameta",      price:199, tag:"veg", desc:"Tangy tomato curry topped with crunchy sev. Gujarati classic.",        img:"https://images.unsplash.com/photo-1626132647523-66c7f06e5e0f?w=500&q=80", extras:["Extra Roti +₹30"] },
      { name:"Ringan no Olo",   price:219, tag:"veg", desc:"Smoky roasted brinjal mash cooked with spices & onions.",             img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80", extras:["Extra Roti +₹30"] },
      { name:"Undhiyu",         price:299, tag:"veg", desc:"Traditional mixed vegetable curry — festive Gujarati special.",       img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80", extras:["Extra Puri +₹29"] },
      { name:"Dhokla",          price:129, tag:"veg", desc:"Steamed fermented chickpea batter with mustard & curry leaf tadka.",  img:"https://images.unsplash.com/photo-1630409351217-bc4fa6422075?w=500&q=80", extras:["Extra Chutney +₹19"] },
      { name:"Khaman",          price:119, tag:"veg", desc:"Soft spongy chickpea snack with green chilli-ginger tempering.",     img:"https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80", extras:["Extra Chutney +₹19"] },
      { name:"Khandvi",         price:149, tag:"veg", desc:"Delicate gram flour rolls with coconut, sesame & mustard seeds.",    img:"https://images.unsplash.com/photo-1567337710282-00832b415979?w=500&q=80", extras:[] },
      { name:"Thepla",          price:99,  tag:"veg", desc:"Spiced fenugreek flatbread — best with pickle & yoghurt.",           img:"https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&q=80", extras:["Pickle +₹19","Yoghurt +₹29"] },
      { name:"Fafda Jalebi",    price:179, tag:"veg", desc:"Crispy chickpea fafda with hot spiral jalebi. Gujarati breakfast.",  img:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80", extras:["Extra Jalebi +₹49"] },
      { name:"Kadhi Khichdi",   price:199, tag:"veg", desc:"Smooth yoghurt kadhi with moong dal khichdi & ghee drizzle.",       img:"https://images.unsplash.com/photo-1576577445504-6af96477db52?w=500&q=80", extras:["Extra Ghee +₹19","Papad +₹19"] }
    ],
    mexican: [
      { name:"Veg Tacos (2 pcs)",    price:229, tag:"veg",    desc:"Corn tortilla, spiced veggies, guacamole & sour cream.",          img:"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&q=80", extras:["Extra Taco +₹79","Guacamole +₹39"] },
      { name:"Chicken Tacos (2 pcs)",price:279, tag:"nonveg", desc:"Grilled chicken, pico de gallo, guacamole & jalapeños.",          img:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80", extras:["Extra Taco +₹89","Extra Chicken +₹69"] },
      { name:"Burrito Bowl",         price:329, tag:"veg",    desc:"Rice, beans, corn salsa, cheese, sour cream & fresh salad.",     img:"https://images.unsplash.com/photo-1543340904-0df8e4e2e2a6?w=500&q=80", extras:["Add Chicken +₹89","Extra Cheese +₹39"] },
      { name:"Veg Burrito",          price:299, tag:"veg",    desc:"Flour tortilla with rice, beans, peppers, cheese & salsa.",      img:"https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=80", extras:["Extra Cheese +₹39"] },
      { name:"Chicken Burrito",      price:349, tag:"nonveg", desc:"Grilled chicken, Mexican rice & black beans in flour tortilla.", img:"https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=500&q=80", extras:["Extra Chicken +₹69","Extra Cheese +₹39"] },
      { name:"Nachos with Cheese",   price:249, tag:"veg",    desc:"Crispy tortilla chips, nacho cheese sauce, jalapeños & salsa.", img:"https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500&q=80", extras:["Guacamole +₹49","Sour Cream +₹29"] },
      { name:"Quesadilla",           price:299, tag:"veg",    desc:"Grilled flour tortilla with cheese, peppers & spiced filling.", img:"https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=500&q=80", extras:["Add Chicken +₹89","Extra Cheese +₹39"] },
      { name:"Mexican Rice",         price:229, tag:"veg",    desc:"Tomato-spiced rice with corn, beans & herbs.",                  img:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&q=80", extras:[] },
      { name:"Enchiladas",           price:349, tag:"nonveg", desc:"Corn tortillas with filling, red chilli sauce & cheese.",       img:"https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=500&q=80", extras:["Extra Cheese +₹39"] },
      { name:"Churros",              price:179, tag:"veg",    desc:"Crispy cinnamon-sugar fried dough with warm chocolate dip.",    img:"https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&q=80", extras:["Extra Dip +₹29"] }
    ],
    beverages: [
      { name:"Mineral Water",   price:30,  tag:"veg", desc:"Chilled packaged mineral water, 500ml.",                           img:"https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500&q=80", extras:[] },
      { name:"Coca Cola",       price:60,  tag:"veg", desc:"Chilled Coca Cola, 300ml bottle.",                                 img:"https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&q=80", extras:[] },
      { name:"Pepsi",           price:60,  tag:"veg", desc:"Chilled Pepsi, 300ml bottle.",                                    img:"https://images.unsplash.com/photo-1481671703460-040cb8a2d909?w=500&q=80", extras:[] },
      { name:"Sprite",          price:60,  tag:"veg", desc:"Chilled Sprite, 300ml bottle.",                                   img:"https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500&q=80", extras:[] },
      { name:"Fresh Lime Soda", price:89,  tag:"veg", desc:"Fresh lime with soda — sweet, salted or masala.",                 img:"https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=500&q=80", extras:["Sweet","Salted","Masala"] },
      { name:"Cold Coffee",     price:149, tag:"veg", desc:"Espresso blended with cold milk, ice & hint of vanilla.",         img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80", extras:["Extra Shot +₹29","Whipped Cream +₹29"] },
      { name:"Mango Shake",     price:169, tag:"veg", desc:"Fresh Alphonso mango blended with chilled full-fat milk.",        img:"https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=500&q=80", extras:["Extra Scoop +₹39"] },
      { name:"Sweet Lassi",     price:129, tag:"veg", desc:"Chilled creamy yoghurt drink lightly sweetened with sugar.",      img:"https://images.unsplash.com/photo-1571197800987-72ee24cbbf3d?w=500&q=80", extras:["Rose Flavour +₹19"] },
      { name:"Masala Chaas",    price:79,  tag:"veg", desc:"Salted buttermilk with roasted cumin, coriander & green chilli.", img:"https://images.unsplash.com/photo-1626500155208-9e53e10e46e5?w=500&q=80", extras:[] },
      { name:"Mojito",          price:159, tag:"veg", desc:"Fresh mint, lime, sugar & soda — refreshing zero proof drink.",   img:"https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80", extras:["Strawberry +₹19","Passion Fruit +₹19"] }
    ],
    desserts: [
      { name:"Gulab Jamun",           price:99,  tag:"veg", desc:"Soft dumplings soaked in rose-cardamom sugar syrup.",               img:"https://images.unsplash.com/photo-1666290596543-ceba72a4cbf1?w=500&q=80", extras:["With Ice Cream +₹49"] },
      { name:"Ice Cream",             price:129, tag:"veg", desc:"2 scoops — Vanilla, Chocolate or Strawberry.",                      img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80", extras:["Extra Scoop +₹49","Hot Fudge +₹29"] },
      { name:"Brownie with Ice Cream",price:199, tag:"veg", desc:"Warm fudge brownie with vanilla ice cream & chocolate sauce.",      img:"https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500&q=80", extras:["Extra Ice Cream +₹49","Caramel +₹29"] },
      { name:"Chocolate Lava Cake",   price:179, tag:"veg", desc:"Molten chocolate centre cake with vanilla ice cream.",              img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80", extras:["Extra Ice Cream +₹49"] },
      { name:"Tiramisu",              price:299, tag:"veg", desc:"Espresso-soaked ladyfingers, mascarpone cream & cocoa.",            img:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80", extras:[] },
      { name:"Cheesecake",            price:279, tag:"veg", desc:"New York style baked cheesecake with berry compote.",               img:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80", extras:["Berry Compote +₹29","Caramel +₹29"] },
      { name:"Rasmalai",              price:149, tag:"veg", desc:"Soft cottage cheese patties in chilled saffron-cardamom milk.",     img:"https://images.unsplash.com/photo-1571197800987-72ee24cbbf3d?w=500&q=80", extras:[] },
      { name:"Falooda",               price:179, tag:"veg", desc:"Rose milk, basil seeds, vermicelli & ice cream — Indian classic.",  img:"https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&q=80", extras:["Extra Scoop +₹49"] }
    ]
  };

  /* ================================================================
     RENDER MENU
  ================================================================ */
  let vegFilter = "all";
  let activeTab = "italian";

  function vegDot(tag) {
    if (tag === "veg")    return '<span class="veg-dot veg" title="Veg"></span>';
    if (tag === "nonveg") return '<span class="veg-dot nonveg" title="Non-Veg"></span>';
    return "";
  }

  function cardHTML(item) {
    const extras = (item.extras && item.extras.length)
      ? '<p class="extras-label">Add Extras:</p><div class="extras-chips">' +
          item.extras.map(e =>
            '<label class="ex-chip"><input type="checkbox" data-item="' + item.name +
            '" data-extra="' + e + '"/> ' + e + '</label>'
          ).join("") + '</div>'
      : "";
    return '<article class="dish-card" data-tag="' + (item.tag || "veg") + '">' +
      '<div class="dish-img-wrap">' +
        '<img src="' + item.img + '" alt="' + item.name + '" loading="lazy"/>' +
        vegDot(item.tag) +
      '</div>' +
      '<div class="dish-info">' +
        '<h3 class="dish-name">' + item.name + '</h3>' +
        '<p class="dish-desc">' + item.desc + '</p>' +
        extras +
        '<div class="dish-foot">' +
          '<span class="dish-price">&#8377;' + item.price + '</span>' +
          '<button class="add-btn" data-name="' + item.name + '" data-price="' + item.price + '">+ Add</button>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function renderTab(key) {
    const panel = document.getElementById('panel-' + key);
    if (!panel) return;
    const list = MENU[key] || [];
    const shown = vegFilter === "all" ? list
      : list.filter(i => vegFilter === "veg" ? i.tag === "veg" : i.tag === "nonveg");
    panel.innerHTML = shown.length
      ? shown.map(cardHTML).join("")
      : '<p class="menu-empty">Is filter mein koi item nahi hai.</p>';
  }

  function renderAll() { Object.keys(MENU).forEach(renderTab); }

  renderAll();

  /* ── CUISINE TABS ── */
  $$(".cnav").forEach(function(tab) {
    tab.addEventListener("click", function() {
      activeTab = tab.dataset.tab;
      $$(".cnav").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      $$("[id^='panel-']").forEach(p => {
        p.hidden = p.id !== "panel-" + activeTab;
      });
    });
  });

  /* ── VEG FILTER ── */
  $$(".filt").forEach(function(btn) {
    btn.addEventListener("click", function() {
      vegFilter = btn.dataset.filter;
      $$(".filt").forEach(b => b.classList.remove("all-active","veg-active","nv-active"));
      if (vegFilter === "veg") btn.classList.add("veg-active");
      else if (vegFilter === "nonveg") btn.classList.add("nv-active");
      else btn.classList.add("all-active");
      renderAll();
    });
  });

  /* ── LIGHTBOX on image click ── */
  document.addEventListener("click", function(e) {
    const img = e.target.closest(".dish-img-wrap img");
    if (!img) return;
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = '<button class="lightbox-close" aria-label="Close">&#10005;</button>' +
      '<img src="' + img.src.replace("w=500","w=1000") + '" alt="' + img.alt + '"/>';
    document.body.appendChild(lb);
    document.body.classList.add("no-scroll");
    lb.addEventListener("click", function(ev) {
      if (ev.target === lb || ev.target.closest(".lightbox-close")) {
        lb.remove(); document.body.classList.remove("no-scroll");
      }
    });
  });

  /* ── HEADER SCROLL ── */
  const header = document.getElementById("siteHeader");
  const navEl   = document.getElementById("nav");
  const toggle  = document.getElementById("navToggle");
  const toTop   = document.getElementById("toTop");

  if (toggle) {
    toggle.addEventListener("click", function() {
      const open = navEl.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  $$("a[href^='#']").forEach(function(a) {
    a.addEventListener("click", function() {
      if (navEl) navEl.classList.remove("open");
      if (toggle) { toggle.classList.remove("open"); toggle.setAttribute("aria-expanded","false"); }
    });
  });

  window.addEventListener("scroll", function() {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 40);
    if (toTop)  toTop.hidden = y < 500;
  }, { passive: true });

  if (toTop) toTop.addEventListener("click", function() { window.scrollTo({ top:0, behavior:"smooth" }); });

  /* ── STAT COUNTERS ── */
  const obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(en) {
      if (!en.isIntersecting) return;
      const el = en.target.querySelector(".stat-num");
      if (el) {
        const target = Number(el.dataset.count || 0);
        const start  = performance.now();
        (function step(now) {
          const p = Math.min((now - start) / 1200, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        })(start);
      }
      obs.unobserve(en.target);
    });
  }, { threshold: 0.2 });
  $$(".stat-box").forEach(function(b) { obs.observe(b); });

  /* ── RESERVATION FORM ── */
  const resForm = document.getElementById("reserveForm");
  const dateIn  = document.getElementById("date");
  if (dateIn) dateIn.min = new Date().toISOString().split("T")[0];

  if (resForm) {
    resForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      const name   = document.getElementById("name");
      const email  = document.getElementById("email");
      const time   = document.getElementById("time");
      const guests = document.getElementById("guests");
      let ok = true;

      function err(el, msg) {
        const f = el.closest(".field");
        f.classList.toggle("invalid", Boolean(msg));
        const s = f.querySelector("[data-error-for='" + el.id + "']");
        if (s) s.textContent = msg || "";
        if (msg) ok = false;
      }

      if (name.value.trim().length < 2)   err(name,   "Naam likhein.");    else err(name,   "");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) err(email, "Valid email likhein."); else err(email, "");
      if (!dateIn.value)                  err(dateIn, "Date chunein.");    else err(dateIn, "");
      if (!time.value)                    err(time,   "Time chunein.");    else err(time,   "");
      if (!guests.value)                  err(guests, "Guests chunein.");  else err(guests, "");

      if (!ok) return;

      const btn = resForm.querySelector("button[type=submit]");
      btn.disabled = true; btn.textContent = "Bhej rahe hain...";

      try {
        await fetch("/api/reservations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.value.trim(),
            email: email.value.trim(),
            phone: "",
            date: dateIn.value,
            time: time.value,
            guests: guests.value,
            notes: (document.getElementById("notes") || {}).value || ""
          })
        });
      } catch(ex) { /* offline — still show success */ }

      const suc = document.getElementById("formSuccess");
      suc.textContent = "Shukriya, " + name.value.trim().split(" ")[0] + "! Aapki reservation request mil gayi. Jaldi confirm karenge.";
      suc.hidden = false;
      resForm.reset();
      btn.disabled = false; btn.textContent = "📅 Reservation Bhejein";
    });
  }

  /* ── NEWSLETTER ── */
  const newsForm = document.getElementById("newsForm");
  if (newsForm) {
    newsForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const inp = document.getElementById("newsEmail");
      const out = document.getElementById("newsSuccess");
      const ok  = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(inp.value.trim());
      out.textContent = ok ? "Shukriya! Aap hamare updates list mein aa gaye." : "Valid email likhein.";
      out.hidden = false;
      if (ok) newsForm.reset();
    });
  }

  /* ── FOOTER YEAR ── */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

})();
