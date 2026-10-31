# AURELIA | Fine Jewellery & Certified Diamonds E-Commerce Platform

A professional, modern, luxury jewellery e-commerce application inspired by the design and layout of CaratLane, built with original branding, typography, color palettes, and assets.

---

## 🌟 Brand Identity: AURELIA FINE JEWELLERY

- **Brand Essence**: A luxury fine jewellery atelier specializing in certified natural & lab-grown diamonds, 14 KT / 18 KT / 22 KT yellow & rose gold, and pure Platinum 950.
- **Design Language**: Soft ivory-cream background (`#FAF8F5`), imperial crimson burgundy (`#9B1139`), warm champagne gold accents (`#C99757` & `#E2C799`), and deep midnight footer (`#0D1117`).
- **Typography**: Editorial serif headings (`Cormorant Garamond` & `Playfair Display`) paired with clean sans-serif UI typography (`Plus Jakarta Sans`).

---

## 💎 Features Implemented

### 1. Header & Navigation (Inspired by Reference Screenshots)
- **Announcement Strip**: Promotional ribbon with live pincode selector, certification badges, and promo code banner (`LUXE20`).
- **Brand Monogram & Typography**: Bespoke geometric diamond rosette logo with gold foil detailing.
- **Live Search with Autocomplete**: Search across collections, categories, metals, and price tags with instant thumbnail previews.
- **Action Icons**:
  - Gold Vault 10+1 scheme link
  - Store locator shortcut
  - Wishlist counter with animated heart badge
  - Shopping bag drawer with real-time count & subtotal preview
  - User profile dropdown with 1-click Quick Demo sign-in
- **CaratLane Mega-Menu Dropdowns (Matching Screenshot 3)**:
  - Full-width mega-menus for all 11 categories: *Rings, Earrings, Bangles, Bracelets, Solitaires, Mangalsutras, Necklaces, Pendants, Silver Jewellery, Gifting, Collections*.
  - **Shop Styles** column (Solitaires, Bands, Dailywear, Engagement, Couple Bands, Cocktail, etc.)
  - **Curated By** column (Latest, Bestsellers, Under ₹20k, Express Delivery, etc.)
  - **Two Visual Promotional Cards** with high-resolution imagery and clickable promotional tags (`MESSAGE BANDS`, `ETERNITY RINGS`, `DIAMOND HOOPS`, `ROYAL HERITAGE`).
- **Pincode Delivery Pill**: Instant modal to check delivery speeds across 19,000+ Indian postal codes.

### 2. Homepage (Requirement 2)
- **Cinematic Hero Carousel**: Full-screen luxury bridal and solitaire showcase with automatic transition and call-to-actions.
- **Value Proposition Bar**: 100% Certified Diamonds (BIS Hallmark, IGI & GIA), 15-Day Free Returns, Free Insured Shipping, Lifetime Exchange.
- **Shop by Category**: Circular & arched luxury tiles showcasing each jewellery category.
- **Tabbed Atelier Showcase**: Seamlessly toggle between *Best Sellers*, *New Arrivals*, and *Solitaires*.
- **Promotional Feature Banners**: "Diamond Rings Under ₹25,000" and "Royal Radiance Bridal Atelier".
- **The Connoisseur's 4Cs Guide**: Interactive educational guide covering Cut, Clarity, Color, and Carat weight.
- **Patron Testimonials**: Verified buyer reviews with 5-star ratings.

### 3. Product Listing Page (PLP - Matching Screenshot 2)
- **Top Header**: Breadcrumbs (`Home > Jewellery > Rings`) and design counter (`Rings (18 Designs)`).
- **Sorting**: Latest, Popularity, Price Low to High, Price High to Low, Highest Discount.
- **Left Filter Sidebar**:
  - Active filter chips with individual removal & "Clear All"
  - Price ranges (Under ₹10k, ₹10k-₹20k, ₹20k-₹30k, ₹30k-₹50k, ₹50k+)
  - Product type / subcategory filters (Studs, Drops, Hoops, Solitaires, Bands, Chokers)
  - Metal & Karat filters (14KT Yellow Gold, 18KT Yellow/Rose/White Gold, Platinum 950, 925 Silver)
  - Gender selector (Women, Men, Unisex, Kids)
  - Diamond clarity selector (FG-SI, GH-VS, VVS-EF, Uncut Polki)
  - Store Pickup toggle switch
- **Luxury Product Card Layout**:
  - Trending / Bestseller badge pill
  - Wishlist toggle heart with persistent state
  - Image hover with smooth zoom & alternate angle
  - Pricing with Indian Rupee symbol (₹), original MRP strikethrough, savings badge
  - Specs line: `14 KT • FG-SI`
  - Promotional line: `Flat 20% off on MRP`
  - "Check Delivery" link and "Add to Bag" button

### 4. Product Details Page (PDP - Requirement 4)
- Multiple high-resolution product photography angles with thumbnail gallery.
- Interactive Karat & Metal selector (`14 KT`, `18 KT Yellow Gold`, `18 KT Rose Gold`, `18 KT White Gold`, `Platinum 950`).
- Diamond clarity selector (`FG-SI`, `GH-VS`, `VVS-EF`).
- Ring / Bangle size selector with modal **Size Guide & Measurement Chart**.
- Real-time Pincode delivery validator with estimated arrival date.
- "Add to Bag" and direct "Buy Now" checkout buttons.
- Collapsible Accordions:
  - **Product Specifications**: Gross weight, gold net weight, diamond carat weight, stone count, BIS Hallmark certification.
  - **Transparent Price Breakup**: Gold value, diamond value, making charges, and 3% GST.

### 5. Shopping Features (Requirement 5)
- **Slide-out Cart Drawer** & dedicated full **Cart Page**.
- Quantity increment / decrement and item removal.
- **Coupon System**: Support for `LUXE20` (20% off), `GOLD10` (10% off), and `FIRSTBUY` (₹2,000 off).
- **User Authentication**: JWT-based login, registration, and 1-click test evaluator login.
- **3-Step Checkout Flow**:
  1. Insured Shipping Address
  2. Delivery Method (Free Insured Transit)
  3. Payment Method (UPI / QR, Credit/Debit Card, Net Banking, COD)
- **Order Success Page**: Confetti celebration, unique Order ID generation (`AUR-2026-XXXX`), printable receipt, and order tracking timeline.
- **Wishlist Page**: Dedicated wishlist with "Move to Bag" functionality.
- **Account Page**: Customer profile, saved delivery addresses, and multi-stage order tracking (*Order Placed -> Crafting in Studio -> IGI Certification -> Armored Transit*).

### 6. Dark Luxury Footer (Matching Screenshot 1)
- Dark midnight background (`#0D1117`).
- Company registration info & CIN/GSTIN details.
- Mobile App download card with QR code badge.
- Columns: *Know Your Jewellery*, *Aurelia Advantage*, *Customer Service*, *About Us*, *Contact Us*.
- Bottom contact strip with Call, WhatsApp, Email, social links, and copyright.

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS v4, Lucide Icons, React Router DOM v7, Axios, Canvas Confetti.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt.js.
- **Database**: MongoDB running locally on port `27017` with seeded products across all 11 categories.

---

## 🚀 Running the Project

### Start Backend API:
```bash
cd server
npm start
# Runs on http://localhost:5000
```

### Start Frontend Client:
```bash
cd client
npm run dev
# Runs on http://localhost:5173
```

