# Prime Restaurant — website + QR ordering + admin dashboard

Three parts:

| File | Kya karta hai |
| --- | --- |
| `public/index.html` | Customer website — menu, cart, online order |
| `public/admin.html` | Admin dashboard — saare orders live dikhte hain |
| `server.js` | Chhota Node server — orders save karta hai aur QR code banata hai |

Orders `data/orders.json` me save hote hain.

## Chalane ka tarika

Ek hi baar:

```bash
npm install
```

Har baar:

```bash
npm start
```

Phir:

- Website (is computer pe): http://localhost:3000
- Admin dashboard: http://localhost:3000/admin.html
- QR code: http://localhost:3000/qr.png

Terminal me phone wala address bhi print hota hai, jaise `http://192.168.1.5:3000` — phone aur computer ek hi wifi pe hone chahiye.

## QR code

Admin dashboard me **Show QR** dabao. Jo QR dikhta hai use print karke har table pe rakh do.
Customer scan karega → website khulegi → dish pe **Add** → cart me naam, phone, table number bharega → **Place Order**.
Order turant admin dashboard pe aa jayega (har 4 second me auto refresh hota hai).

Admin har order ko `New → Preparing → Served` kar sakta hai, cancel kar sakta hai, search kar sakta hai, aur upar aaj ki total revenue dikhti hai.

## Menu badalna

`public/js/main.js` me sabse upar `MENU` object hai — waha dish ka naam, price aur description badal do. Prices `$` me hain; rupees chahiye to `$` ki jagah `₹` likh do (`public/js/order.js` ke `money()` function me bhi).

## Internet pe live karna (optional)

Ye Node app kisi bhi host pe chal jayega (Render, Railway, VPS). Deploy karne ke baad `PUBLIC_URL` environment variable set kar dena, taki QR uss public URL ka bane:

```bash
PUBLIC_URL=https://your-domain.com npm start
```

## Notes

- Photos aur fonts internet se aate hain, to pehli baar khulte waqt net chahiye.
- Ye demo storage JSON file hai — bade traffic ke liye database (Postgres/SQLite) use karna behtar hai.
- Admin page pe abhi koi password nahi hai; public server pe daalne se pehle login lagana zaroori hai.
