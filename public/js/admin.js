/* Prime Restaurant — admin orders dashboard */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  let orders = [];
  let filter = "all";
  let query = "";
  let timer = null;

  const money = (n) => "$" + Number(n).toFixed(2);

  function timeAgo(iso) {
    const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (seconds < 60) return seconds + "s ago";
    if (seconds < 3600) return Math.floor(seconds / 60) + "m ago";
    if (seconds < 86400) return Math.floor(seconds / 3600) + "h ago";
    return new Date(iso).toLocaleDateString();
  }

  async function fetchOrders() {
    try {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("status " + res.status);
      orders = await res.json();
      $("#connError").hidden = true;
      render();
    } catch (err) {
      $("#connError").hidden = false;
    }
  }

  function visible() {
    const q = query.toLowerCase();
    return orders
      .filter((o) => filter === "all" || o.status === filter)
      .filter((o) => {
        if (!q) return true;
        const haystack = [o.customer, o.table, o.phone, o.notes]
          .concat(o.items.map((i) => i.name))
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function renderStats() {
    const today = new Date().toDateString();
    const count = (status) => orders.filter((o) => o.status === status).length;
    const revenue = orders
      .filter((o) => o.status !== "cancelled" && new Date(o.createdAt).toDateString() === today)
      .reduce((sum, o) => sum + o.total, 0);

    $("#statNew").textContent = count("new");
    $("#statPreparing").textContent = count("preparing");
    $("#statServed").textContent = count("served");
    $("#statRevenue").textContent = money(revenue);
  }

  function orderCard(o) {
    const items = o.items
      .map((i) => '<li><span><span class="qty">' + i.qty + "&times;</span> " + i.name + "</span><span>" + money(i.price * i.qty) + "</span></li>")
      .join("");

    const actions = [];
    if (o.status === "new") actions.push('<button class="btn" data-status="preparing" data-id="' + o.id + '">Start preparing</button>');
    if (o.status === "preparing") actions.push('<button class="btn" data-status="served" data-id="' + o.id + '">Mark served</button>');
    if (o.status !== "cancelled" && o.status !== "served") {
      actions.push('<button class="btn danger" data-status="cancelled" data-id="' + o.id + '">Cancel</button>');
    }
    if (o.status === "served" || o.status === "cancelled") {
      actions.push('<button class="btn" data-status="new" data-id="' + o.id + '">Reopen</button>');
    }

    return (
      '<article class="order status-' + o.status + '">' +
        '<div class="order-top">' +
          "<div>" +
            '<div class="order-no">#' + o.number + "</div>" +
            '<div class="order-meta">' + o.table + " &middot; " + timeAgo(o.createdAt) + "</div>" +
          "</div>" +
          '<span class="pill ' + o.status + '">' + o.status + "</span>" +
        "</div>" +
        '<div class="order-customer">' + o.customer +
          (o.phone ? ' <span>&middot; ' + o.phone + "</span>" : "") + "</div>" +
        '<ul class="order-items">' + items + "</ul>" +
        (o.notes ? '<p class="order-notes">Note: ' + o.notes + "</p>" : "") +
        '<div class="order-total"><span>Total</span><strong>' + money(o.total) + "</strong></div>" +
        '<div class="order-actions">' + actions.join("") + "</div>" +
      "</article>"
    );
  }

  function render() {
    renderStats();
    const list = visible();
    $("#orders").innerHTML = list.map(orderCard).join("");
    $("#empty").hidden = list.length > 0;
  }

  async function setStatus(id, status) {
    await fetch("/api/orders/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: status })
    });
    fetchOrders();
  }

  /* ---------- Events ---------- */
  $("#orders").addEventListener("click", function (e) {
    const btn = e.target.closest("[data-status]");
    if (btn) setStatus(btn.dataset.id, btn.dataset.status);
  });

  $$(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      $$(".chip").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      filter = chip.dataset.filter;
      render();
    });
  });

  $("#search").addEventListener("input", function (e) {
    query = e.target.value.trim();
    render();
  });

  $("#clearBtn").addEventListener("click", async function () {
    if (!confirm("Delete all orders? This cannot be undone.")) return;
    await fetch("/api/orders", { method: "DELETE" });
    fetchOrders();
  });

  $("#qrBtn").addEventListener("click", async function () {
    const res = await fetch("/api/site-url");
    const info = await res.json();
    $("#qrImage").src = "/qr.png?url=" + encodeURIComponent(info.lan);
    $("#qrUrl").textContent = info.lan;
    $("#qrModal").hidden = false;
  });
  $("#qrClose").addEventListener("click", function () { $("#qrModal").hidden = true; });
  $("#qrModal").addEventListener("click", function (e) {
    if (e.target === $("#qrModal")) $("#qrModal").hidden = true;
  });

  function startPolling() {
    clearInterval(timer);
    if ($("#autoRefresh").checked) timer = setInterval(fetchOrders, 4000);
  }
  $("#autoRefresh").addEventListener("change", startPolling);

  fetchOrders();
  startPolling();
})();
