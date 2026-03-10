# Kalpa Studio — Web Design Portfolio & Shop
> Dark editorial design system inspired by WPKoi Kalpa theme.  
> Pure HTML/CSS/JS — no framework, no server, no hosting cost.

---

## 📁 Project Structure

```
kalpa-studio/
├── index.html       ← Homepage (hero, process, gallery, FAQ, blog, contact)
├── shop.html        ← Services / product catalog
├── cart.html        ← Cart management
├── about.html       ← Studio story & team
├── blog.html        ← Blog articles grid
├── contact.html     ← Full contact form
├── admin.html       ← 🔒 Admin panel (password protected)
├── css/
│   └── style.css    ← Full design system
└── js/
    └── main.js      ← Shared JS: cursor, cart, animations, products
```

---

## 🎨 Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#080808` | Main background |
| `--bg2` | `#111111` | Cards, sidebar |
| `--bg3` | `#181818` | Hover states |
| `--text` | `#f0ede8` | Primary text |
| `--text2` | `#aaa9a6` | Secondary/muted text |
| `--accent` | `#d4ff00` | CTA, highlights, accent |
| `--border` | `#222220` | Dividers, card borders |
| `--red` | `#ff3c3c` | Destructive actions |

### Typography
| Role | Font | Weight |
|------|------|--------|
| Display | `Bebas Neue` | 400 (condensed) |
| Headings | `Syne` | 500–800 |
| Body | `DM Sans` | 300–500 |

### Animations
- **Custom cursor** — dual-layer (dot + ring) with lerp smoothing
- **Scroll reveal** — IntersectionObserver fade + slide up
- **Morphing text** — typewriter + delete cycle (`data-morph` attribute)
- **Infinite marquee** — CSS animation, pauses on hover
- **Spinning cross** — CSS `rotate` keyframe
- **Accordion FAQ** — CSS max-height transition
- **Gallery hover** — scale + grayscale filter transition
- **Button hover** — sliding background fill (::before pseudo-element)
- **Countdown timer** — live JS countdown
- **Nav scroll** — backdrop-blur on scroll

---

## 🔒 Admin Panel

**URL:** `/admin.html`  
**Default credentials:**
- Username: `admin`
- Password: `kalpa2026`

### Features
- Dashboard with live stats (product count, active/draft, cart items)
- Full product CRUD (Create, Read, Update, Delete)
- Image URL preview on input
- Product status: Active, Draft, Out of Stock
- Activity log
- Password change in settings
- Data persisted via `localStorage`

> ⚠️ **Security note:** This is a client-side admin — credentials are stored in `localStorage`. It's suitable for personal/portfolio use. For a production store with real transactions, pair with a backend (Supabase, Cloudflare Workers, etc.)

---

## 🛒 Cart & Products

- Products stored in `localStorage` (`ks_products`)
- Cart stored in `localStorage` (`ks_cart`)
- Cart count badge updates live across all pages
- Add to cart → toast notification
- Cart: qty controls, remove items, clear cart, order summary with 10% tax estimate

---

## 🚀 Deploy — GitHub + Cloudflare Pages (FREE)

### Step 1: Push to GitHub
```bash
# Initialize git in the project folder
git init
git add .
git commit -m "Initial commit — Kalpa Studio"

# Create a repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/kalpa-studio.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Cloudflare Pages
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Pages → Create a project → Connect to Git**
3. Select your `kalpa-studio` repository
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (or leave as `.`)
5. Click **Save and Deploy**

✅ Your site will be live at `https://kalpa-studio.pages.dev` in ~30 seconds.

### Step 3: Custom domain (optional, still free)
In Cloudflare Pages → your project → **Custom domains** → Add your domain.  
If your domain is registered with Cloudflare DNS, it connects automatically.

---

## 🌐 Alternative: GitHub Pages (also free)

1. Push to GitHub (Step 1 above)
2. Go to repo → **Settings → Pages**
3. Source: **Deploy from a branch → main → / (root)**
4. Your site: `https://YOUR_USERNAME.github.io/kalpa-studio/`

---

## ✏️ Customization Checklist

- [ ] Replace `Kalpa Studio` with your studio/brand name
- [ ] Update contact info in all pages
- [ ] Replace placeholder Unsplash images with your actual portfolio work
- [ ] Update social media links in topbar + footer
- [ ] Change admin password in `admin.html` (or via Settings panel)
- [ ] Add real blog content
- [ ] Update services/products in Admin panel
- [ ] Adjust countdown target date in `index.html`
- [ ] Add Google Analytics or Plausible snippet before `</body>`

---

## 📬 Contact form (production)

To make the contact form actually send emails, integrate one of these free services:

| Service | Free tier |
|---------|-----------|
| [Formspree](https://formspree.io) | 50 submissions/month |
| [Web3Forms](https://web3forms.com) | 250 submissions/month |
| [Netlify Forms](https://netlify.com) | 100 submissions/month |

Replace the `onclick="submitContact()"` with a real `<form action="https://formspree.io/f/YOUR_ID" method="POST">`.

---

## 📄 License

MIT — Use freely for personal and commercial projects.
