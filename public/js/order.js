/* Prime Restaurant — cart & online ordering */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const STORAGE_KEY = "prime_cart";

  // Detect if user came via QR scan (source=qr param or referrer is empty on mobile)
  const urlParams = new URLSearchParams(window.location.search);
  const ORDER_SOURCE = urlParams.get("source") === "qr" ? "QR Scan" : "Direct";

  let cart = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function total() {
    return cart.reduce((sum, line) => sum + line.price * line.qty, 0);
  }

  function money(n) {
    return "$" + n.toFixed(2);
  }

  function add(name, price) {
    const line = cart.find((l) => l.name === name);
    if (line) line.qty += 1;
    else cart.push({ name: name, price: price, qty: 1 });
    save();
    render();
    toast(name + " added to your order");
  }

  function setQty(name, delta) {
    const line = cart.find((l) => l.name === name);
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) cart = cart.filter((l) => l.name !== name);
    save();
    render();
  }

  function render() {
    const count = cart.reduce((sum, l) => sum + l.qty, 0);
    $("#cartCount").textContent = String(count);
    $("#cartFab").classList.toggle("has-items", count > 0);
    $("#cartTotal").textContent = money(total());

    const body = $("#cartBody");
    if (!cart.length) {
      body.innerHTML = '<p class="cart-empty">Your order is empty. Add something delicious from the menu.</p>';
      $("#placeOrderBtn").disabled = true;
      return;
    }
    $("#placeOrderBtn").disabled = false;
    body.innerHTML = cart.map(function (l) {
      return (
        '<div class="cart-line">' +
          '<div class="cart-line-info">' +
            '<span class="cart-line-name">' + l.name + "</span>" +
            '<span class="cart-line-price">' + money(l.price * l.qty) + "</span>" +
          "</div>" +
          '<div class="qty">' +
            '<button class="qty-btn" data-dec="' + l.name + '" aria-label="Remove one ' + l.name + '">&minus;</button>' +
            "<span>" + l.qty + "</span>" +
            '<button class="qty-btn" data-inc="' + l.name + '" aria-label="Add one ' + l.name + '">+</button>' +
          "</div>" +
        "</div>"
      );
    }).join("");
  }

  let toastTimer;
  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.hidden = false;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove("show");
      setTimeout(function () { el.hidden = true; }, 300);
    }, 2200);
  }

  function openCart(open) {
    $("#cartPanel").hidden = !open;
    $("#cartBackdrop").hidden = !open;
    document.body.classList.toggle("no-scroll", open);
  }

  /* ---------- Events ---------- */
  document.addEventListener("click", function (e) {
    const addBtn = e.target.closest(".add-btn");
    if (addBtn) {
      add(addBtn.dataset.name, Number(addBtn.dataset.price));
      return;
    }
    const dec = e.target.closest("[data-dec]");
    if (dec) { setQty(dec.dataset.dec, -1); return; }
    const inc = e.target.closest("[data-inc]");
    if (inc) { setQty(inc.dataset.inc, 1); }
  });

  $("#cartFab").addEventListener("click", function () { openCart(true); });
  $("#cartClose").addEventListener("click", function () { openCart(false); });
  $("#cartBackdrop").addEventListener("click", function () { openCart(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") openCart(false);
  });

  $("#orderForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const err = $("#cartError");
    const name = $("#orderName").value.trim();
    const phone = $("#orderPhone").value.trim();

    if (!cart.length) return;
    if (name.length < 2) { showError("Please enter your name."); return; }
    if (phone.replace(/\D/g, "").length < 7) { showError("Please enter a valid phone number."); return; }
    err.hidden = true;

    const payload = {
      customer: name,
      phone: phone,
      table: $("#orderTable").value,
      notes: $("#orderNotes").value.trim(),
      source: ORDER_SOURCE,
      items: cart,
      total: Number(total().toFixed(2))
    };

    const btn = $("#placeOrderBtn");
    btn.disabled = true;
    btn.textContent = "Sending…";

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Request failed with status " + res.status);
      const order = await res.json();
      cart = [];
      save();
      render();
      $("#orderForm").reset();
      openCart(false);
      // Show beautiful order confirmation
      showOrderConfirmation(order, name);
    } catch (fetchError) {
      showError("Could not reach the kitchen. Start the server (npm start) and try again.");
    } finally {
      btn.disabled = false;
      btn.textContent = "Place Order";
    }
  });

  function showError(message) {
    const err = $("#cartError");
    err.textContent = message;
    err.hidden = false;
  }

  function showOrderConfirmation(order, name) {
    const existing = $("#orderConfirmModal");
    if (existing) existing.remove();

    const itemsHtml = order.items.map(i =>
      `<div class="confirm-item"><span>${i.qty}× ${i.name}</span><span>$${(i.price * i.qty).toFixed(2)}</span></div>`
    ).join("");

    const modal = document.createElement("div");
    modal.id = "orderConfirmModal";
    modal.className = "order-confirm-modal";
    modal.innerHTML = `
      <div class="order-confirm-card">
        <div class="confirm-icon">✓</div>
        <h2>Order Placed!</h2>
        <p class="confirm-sub">Thank you, <strong>${name}</strong></p>
        <div class="confirm-number">#${order.number}</div>
        <div class="confirm-items">${itemsHtml}</div>
        <div class="confirm-total">
          <span>Total</span><strong>$${order.total.toFixed(2)}</strong>
        </div>
        <p class="confirm-table">🍽️ ${order.table}</p>
        <p class="confirm-msg">Your order is on its way to the kitchen.<br/>We'll have it ready soon.</p>
        <button class="btn btn-primary btn-block confirm-close">Done</button>
      </div>
    `;
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
