/* Prime Restaurant — cart & online ordering */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const STORAGE_KEY = "prime_cart_v2";

  const urlParams = new URLSearchParams(window.location.search);
  const ORDER_SOURCE = urlParams.get("source") === "qr" ? "QR Scan" : "Direct";

  let cart = load();

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }

  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }

  function total() {
    return cart.reduce((s, l) => s + l.price * l.qty, 0);
  }

  function money(n) { return "₹" + n.toFixed(2); }

  function add(name, price) {
    // Collect selected extras for this item
    const extras = [];
    document.querySelectorAll('input[data-item="' + name + '"]:checked').forEach(cb => {
      extras.push(cb.dataset.extra);
      cb.checked = false;
    });

    const key = name + (extras.length ? "|" + extras.join(",") : "");
    const line = cart.find(l => l.key === key);
    if (line) line.qty += 1;
    else cart.push({ key, name, price, qty: 1, extras });
    save(); render();
    toast("✅ " + name + " added!");
  }

  function setQty(key, delta) {
    const line = cart.find(l => l.key === key);
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) cart = cart.filter(l => l.key !== key);
    save(); render();
  }

  function render() {
    const count = cart.reduce((s, l) => s + l.qty, 0);
    $("#cartCount").textContent = String(count);
    $("#cartFab").classList.toggle("has-items", count > 0);
    $("#cartTotal").textContent = money(total());

    const body = $("#cartBody");
    if (!cart.length) {
      body.innerHTML = '<p class="cart-empty">🛒 Cart khali hai. Menu se kuch add karein!</p>';
      $("#placeOrderBtn").disabled = true;
      return;
    }
    $("#placeOrderBtn").disabled = false;
    body.innerHTML = cart.map(l => {
      const extrasText = l.extras && l.extras.length
        ? '<span class="cart-line-extras">+ ' + l.extras.join(", ") + '</span>' : "";
      return (
        '<div class="cart-line">' +
          '<div class="cart-line-info">' +
            '<span class="cart-line-name">' + l.name + '</span>' +
            extrasText +
            '<span class="cart-line-price">' + money(l.price * l.qty) + '</span>' +
          '</div>' +
          '<div class="qty">' +
            '<button class="qty-btn" data-dec="' + l.key + '" aria-label="Remove one">−</button>' +
            '<span>' + l.qty + '</span>' +
            '<button class="qty-btn" data-inc="' + l.key + '" aria-label="Add one">+</button>' +
          '</div>' +
        '</div>'
      );
    }).join("");
  }

  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg; el.hidden = false; el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => { el.hidden = true; }, 300);
    }, 2200);
  }

  function openCart(open) {
    $("#cartPanel").hidden = !open;
    $("#cartBackdrop").hidden = !open;
    document.body.classList.toggle("no-scroll", open);
  }

  /* ===== DELIVERY / TABLE TOGGLE ===== */
  const orderType = $("#orderType");
  const tableField = $("#tableField");
  const addressField = $("#addressField");

  if (orderType) {
    orderType.addEventListener("change", function () {
      const val = orderType.value;
      tableField.style.display = val === "Dine-In" ? "" : "none";
      addressField.style.display = val === "Delivery" ? "" : "none";
    });
  }

  /* ===== EVENTS ===== */
  document.addEventListener("click", function (e) {
    const addBtn = e.target.closest(".add-btn");
    if (addBtn) { add(addBtn.dataset.name, Number(addBtn.dataset.price)); return; }
    const dec = e.target.closest("[data-dec]");
    if (dec) { setQty(dec.dataset.dec, -1); return; }
    const inc = e.target.closest("[data-inc]");
    if (inc) { setQty(inc.dataset.inc, 1); }
  });

  $("#cartFab").addEventListener("click", () => openCart(true));
  $("#cartClose").addEventListener("click", () => openCart(false));
  $("#cartBackdrop").addEventListener("click", () => openCart(false));
  document.addEventListener("keydown", e => { if (e.key === "Escape") openCart(false); });

  /* ===== PLACE ORDER ===== */
  $("#orderForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = $("#orderName").value.trim();
    const phone = $("#orderPhone").value.trim();
    const type = $("#orderType").value;
    const table = type === "Dine-In" ? $("#orderTable").value : type;
    const address = type === "Delivery" ? ($("#orderAddress") ? $("#orderAddress").value.trim() : "") : "";

    if (!cart.length) return;
    if (name.length < 2) { showError("Apna naam likhein."); return; }
    if (phone.replace(/\D/g, "").length < 10) { showError("Valid 10-digit phone number likhein."); return; }
    if (type === "Delivery" && address.length < 5) { showError("Delivery address likhein."); return; }

    $("#cartError").hidden = true;

    const payload = {
      customer: name, phone, table,
      orderType: type,
      deliveryAddress: address,
      notes: $("#orderNotes").value.trim(),
      source: ORDER_SOURCE,
      items: cart.map(l => ({ name: l.name, price: l.price, qty: l.qty, extras: l.extras || [] })),
      total: Number(total().toFixed(2))
    };

    const btn = $("#placeOrderBtn");
    btn.disabled = true; btn.textContent = "Sending…";

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("status " + res.status);
      const order = await res.json();
      cart = []; save(); render();
      $("#orderForm").reset();
      openCart(false);
      showOrderConfirmation(order, name);
    } catch {
      showError("Server se connect nahi ho pa raha. Please try again.");
    } finally {
      btn.disabled = false;
      btn.textContent = "Order Place Karein 🚀";
    }
  });

  function showError(msg) {
    const err = $("#cartError");
    err.textContent = msg; err.hidden = false;
  }

  function showOrderConfirmation(order, name) {
    const existing = $("#orderConfirmModal");
    if (existing) existing.remove();

    const itemsHtml = order.items.map(i =>
      `<div class="confirm-item"><span>${i.qty}× ${i.name}</span><span>₹${(i.price * i.qty).toFixed(2)}</span></div>`
    ).join("");

    const modal = document.createElement("div");
    modal.id = "orderConfirmModal";
    modal.className = "order-confirm-modal";
    modal.innerHTML = `
      <div class="order-confirm-card">
        <div class="confirm-icon">✓</div>
        <h2>Order Ho Gaya! 🎉</h2>
        <p class="confirm-sub">Shukriya, <strong>${name}</strong></p>
        <div class="confirm-number">#${order.number}</div>
        <div class="confirm-items">${itemsHtml}</div>
        <div class="confirm-total"><span>Total</span><strong>₹${order.total.toFixed(2)}</strong></div>
        <p class="confirm-table">📍 ${order.table}</p>
        <p class="confirm-msg">Aapka order kitchen mein bhej diya gaya hai.<br/>Jaldi ready hoga!</p>
        <button class="btn btn-primary btn-block confirm-close" style="margin-top:1rem">Done ✓</button>
      </div>`;
    document.body.appendChild(modal);
    document.body.classList.add("no-scroll");
    setTimeout(() => modal.querySelector(".order-confirm-card").classList.add("show"), 10);
    modal.querySelector(".confirm-close").addEventListener("click", () => {
      modal.remove();
      document.body.classList.remove("no-scroll");
    });
  }

  render();
})();
