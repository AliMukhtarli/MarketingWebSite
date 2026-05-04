import { useState } from "react";

const accessories = [
  { id: 1, name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...", price: 360, rating: 4, reviews: 594, badge: "BEST DEALS", badgeType: "best", image: "/images/homepage/HDMI.jpg" },
  { id: 2, name: "Portable Washing Machine, 11lbs capacity Model 18NMF...", price: 80, rating: 4, reviews: 7980, image: "/images/homepage/AirConditioner.jpg" },
  { id: 3, name: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...", price: 70, rating: 5, reviews: 500, badge: "HOT", badgeType: "hot", image: "/images/homepage/FlipBuds.jpg" },
  { id: 4, name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor", price: 250, rating: 4, reviews: 450, image: "/images/homepage/Monitor2.jpg" },
  { id: 5, name: "Samsung Electronics Samsung Galaxy S21 5G", price: 2300, rating: 3, reviews: 742, image: "/images/homepage/SmartPhone.jpg" },
  { id: 6, name: "4K UHD LED Smart TV with Chromecast Built-in", price: 220, rating: 3, reviews: 558, badge: "SALE", badgeType: "sale", image: "/images/homepage/TV.jpg" },
  { id: 7, name: "Wired Over-Ear Gaming Headphones with USB", price: 1500, rating: 3, reviews: 536, image: "/images/homepage/Headphone.jpg" },
  { id: 8, name: "Polaroid 57-Inch Photo/Video Tripod with Deluxe Tripod Ca...", price: 1200, oldPrice: 1600, rating: 4, reviews: 423, discount: "25% OFF", image: "/images/homepage/Camera.jpg" },
];

const flashSale = [
  { name: "Bose Sport Earbuds -Wireless Earphones -Bluetooth In Ear...", price: 1500, image: "/images/homepage/FlipBuds.jpg" },
  { name: "Simple Mobile 4G LTE Prepaid Smartphone", price: 1500, image: "/images/homepage/SmartPhone.jpg" },
  { name: "4K UHD LED Smart TV with Chromecast Built-in", price: 1500, image: "/images/homepage/TV.jpg" },
];
const bestSellers = [
  { name: "Samsung Electronics Samsung Galaxy S21 5G", price: 1500, image: "/images/homepage/SmartPhone.jpg" },
  { name: "Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone", price: 1500, image: "/images/homepage/Phone1.jpg" },
  { name: "Sony DSCHX8 High Zoom Point & Shoot Camera", price: 1500, image: "/images/homepage/Camera.jpg" },
];
const topRated = [
  { name: "Portable Washing Machine, 11lbs capacity Model 18NMF...", price: 1500, image: "/images/homepage/AirConditioner.jpg" },
  { name: "Sony DSCHX8 High Zoom Point & Shoot Camera", price: 1500, image: "/images/homepage/Camera.jpg" },
  { name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor", price: 1500, image: "/images/homepage/Monitor2.jpg" },
];
const newArrival = [
  { name: "TOZO T6 True Wireless Earbuds Bluetooth Headpha...", price: 1500, image: "/images/homepage/FlipBuds.jpg" },
  { name: "JBL FLIP 4 -Waterproof Portable Bluetooth Speaker...", price: 1500, image: "/images/homepage/HomePod.jpg" },
  { name: "Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smar...", price: 1500, image: "/images/homepage/Camera.jpg" },
];

function StarRating({ rating }) {
  return (
    <div className="s3-stars">
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ color: s <= rating ? "#f5a623" : "#ddd" }}>★</span>
      ))}
    </div>
  );
}

function AccessoryCard({ product }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="s3-acc-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {product.badge && (
        <span className={`s3-badge s3-badge-${product.badgeType}`}>{product.badge}</span>
      )}
      {product.discount && (
        <span className="s3-badge s3-badge-discount">{product.discount}</span>
      )}
      <div className="s3-acc-img-wrap">
        <img className="s3-acc-img" src={product.image} alt="" />
      </div>
      {hovered && (
        <div className="s3-hover-actions">
          <button className="s3-hover-btn">♡</button>
          <button className="s3-hover-btn">🛒</button>
          <button className="s3-hover-btn">👁</button>
        </div>
      )}
      <div className="s3-card-body">
        <div className="s3-rating-row">
          <StarRating rating={product.rating} />
          <span className="s3-review-count">({product.reviews})</span>
        </div>
        <p className="s3-product-name">{product.name}</p>
        <div className="s3-price-row">
          {product.oldPrice && <span className="s3-old-price">${product.oldPrice.toLocaleString()}</span>}
          <span className="s3-price">${product.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function MiniProductRow({ item }) {
  return (
    <div className="s3-mini-row">
      <div className="s3-mini-img-wrap">
        <img className="s3-mini-img" src={item.image} alt="" />
      </div>
      <div className="s3-mini-info">
        <p className="s3-mini-name">{item.name}</p>
        <span className="s3-mini-price">${item.price.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default function MarketingSection3() {
  return (
    <div className="s3-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .s3-wrapper {
          font-family: 'DM Sans', sans-serif;
          background: #f8f8fb;
          color: #1a1f3c;
          overflow-x: hidden;
        }
        :root { --page-pad: clamp(16px, 3vw, 40px); }

        /* ── COMPUTER ACCESSORIES ── */
        .s3-acc-section {
          padding: 40px var(--page-pad) 0;
          display: grid;
          grid-template-columns: 1fr 220px;
          gap: 20px;
          align-items: start;
        }
        .s3-acc-left {}
        .s3-acc-title {
          font-family: 'Sora', sans-serif;
          font-size: 22px; font-weight: 700;
          text-align: center; margin-bottom: 20px;
        }
        .s3-acc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .s3-acc-card {
          background: white;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 1px 6px rgba(0,0,0,0.06);
          transition: box-shadow 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .s3-acc-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }
        .s3-acc-img-wrap {
          width: 100%;
          height: 150px;
          background: #eef0f4;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }
        .s3-acc-img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          object-position: center;
          display: block;
        }
        .s3-badge {
          position: absolute; top: 10px; left: 10px;
          border-radius: 4px; font-size: 10px; font-weight: 700;
          padding: 3px 8px; z-index: 2;
        }
        .s3-badge-hot { background: #e53e3e; color: white; }
        .s3-badge-best { background: #f5a623; color: white; }
        .s3-badge-sale { background: #38a169; color: white; }
        .s3-badge-discount { background: #f5a623; color: white; left: auto; right: 10px; }
        .s3-hover-actions {
          position: absolute; top: 50%; right: 10px;
          transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 5px;
          z-index: 10;
          animation: s3fade 0.15s ease;
        }
        @keyframes s3fade {
          from { opacity: 0; transform: translateY(-40%) scale(0.9); }
          to   { opacity: 1; transform: translateY(-50%) scale(1); }
        }
        .s3-hover-btn {
          width: 30px; height: 30px; border-radius: 50%;
          border: none; background: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          cursor: pointer; font-size: 12px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .s3-hover-btn:hover { background: #f5a623; color: white; }
        .s3-card-body { padding: 10px 12px 14px; }
        .s3-rating-row { display: flex; align-items: center; gap: 4px; margin-bottom: 4px; }
        .s3-stars { display: flex; font-size: 12px; }
        .s3-review-count { font-size: 10px; color: #6b7280; }
        .s3-product-name { font-size: 12px; font-weight: 500; line-height: 1.4; color: #1a1f3c; margin-bottom: 6px; overflow-wrap: anywhere; word-break: break-word; }
        .s3-price-row { display: flex; align-items: center; gap: 6px; }
        .s3-old-price { font-size: 11px; color: #9ca3af; text-decoration: line-through; }
        .s3-price { font-size: 14px; font-weight: 700; color: #f5a623; }

        /* ── RIGHT SIDEBAR CARDS ── */
        .s3-acc-right {
          display: flex; flex-direction: column; gap: 12px;
        }
        .s3-side-card-light {
          background: #fff9e6;
          border-radius: 12px;
          padding: 20px 16px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .s3-side-img {
          width: 80px; height: 80px;
          background: #B401A5;
          border-radius: 8px;
          margin: 0 auto 12px;
        }
        .s3-side-card-light > img {
          max-width: min(140px, 100%);
          height: auto;
          max-height: 100px;
          object-fit: contain;
          display: block;
          margin: 0 auto 12px;
        }
        .s3-side-card-light h3 {
          font-family: 'Sora', sans-serif;
          font-size: 15px; font-weight: 700; margin-bottom: 6px;
        }
        .s3-side-card-light p {
          font-size: 11px; color: #6b7280; line-height: 1.5; margin-bottom: 10px;
        }
        .s3-only-row {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 12px;
        }
        .s3-only-label { font-size: 11px; color: #6b7280; }
        .s3-only-price { font-size: 14px; font-weight: 700; color: #f5a623; }
        .s3-shop-btn {
          background: #f5a623; color: white;
          border: none; border-radius: 6px;
          padding: 9px 16px; font-size: 12px; font-weight: 600;
          cursor: pointer; font-family: inherit;
          width: 100%; display: flex; align-items: center;
          justify-content: center; gap: 6px;
          transition: background 0.2s;
        }
        .s3-shop-btn:hover { background: #e0920f; }

        .s3-side-card-dark {
          background: #1a1f3c;
          border-radius: 12px;
          padding: 20px 16px;
          text-align: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.15);
        }
        .s3-summer-tag {
          font-size: 10px; color: #9ca3af;
          letter-spacing: 2px; text-transform: uppercase;
          margin-bottom: 6px;
        }
        .s3-discount-pct {
          font-family: 'Sora', sans-serif;
          font-size: 24px; font-weight: 700;
          color: white; margin-bottom: 6px;
        }
        .s3-discount-sub {
          font-size: 12px; color: #9ca3af; margin-bottom: 14px;
        }
        .s3-discount-sub span { color: #f5a623; font-weight: 600; }
        .s3-shop-btn-cyan {
          background: #4DD9F5; color: white;
          border: none; border-radius: 6px;
          padding: 9px 16px; font-size: 12px; font-weight: 600;
          cursor: pointer; font-family: inherit;
          width: 100%; display: flex; align-items: center;
          justify-content: center; gap: 6px;
          transition: background 0.2s;
        }
        .s3-shop-btn-cyan:hover { background: #1fc8e8; }

        /* ── MACBOOK BANNER ── */
        .s3-macbook-banner {
          margin: 28px var(--page-pad);
          background: #fde8d4;
          border-radius: 16px;
          padding: 48px 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
          position: relative;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          gap: 20px;
        }
        .s3-mac-text {}
        .s3-save-tag {
          display: inline-block;
          background: #f5a623; color: white;
          font-size: 11px; font-weight: 700;
          padding: 4px 12px; border-radius: 20px;
          margin-bottom: 14px;
        }
        .s3-mac-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(28px, 4vw, 42px); font-weight: 700;
          color: #1a1f3c; margin-bottom: 10px; line-height: 1.1;
        }
        .s3-mac-desc {
          font-size: 16px; color: #4b5563;
          margin-bottom: 28px; line-height: 1.5;
        }
        .s3-mac-right {
          display: flex; align-items: center; gap: 24px; flex-shrink: 0;
          flex-wrap: wrap;
        }
        .s3-mac-bubble {
          width: 90px; height: 90px; border-radius: 50%;
          background: #f5a623; opacity: 0.85;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Sora', sans-serif;
          font-size: 18px; font-weight: 700; color: white;
          box-shadow: 0 4px 16px rgba(245,166,35,0.4);
          flex-shrink: 0;
        }
        .s3-mac-photo {
          width: min(280px, 100%);
          max-height: 200px;
          height: auto;
          object-fit: contain;
          border-radius: 12px;
          flex-shrink: 0;
          display: block;
        }

        /* ── FLASH SALE / BEST SELLERS / etc ── */
        .s3-lists-section {
          padding: 0 var(--page-pad) 48px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .s3-list-col {}
        .s3-list-title {
          font-family: 'Sora', sans-serif;
          font-size: 13px; font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e5e7eb;
        }
        .s3-mini-row {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid #f3f4f6;
          cursor: pointer;
          transition: background 0.15s;
        }
        .s3-mini-row:last-child { border-bottom: none; }
        .s3-mini-row:hover .s3-mini-name { color: #f5a623; }
        .s3-mini-img-wrap {
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          border-radius: 8px;
          background: #eef0f4;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }
        .s3-mini-img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }
        .s3-mini-info {}
        .s3-mini-name {
          font-size: 12px; font-weight: 500;
          line-height: 1.4; color: #1a1f3c;
          margin-bottom: 4px;
          transition: color 0.15s;
        }
        .s3-mini-name { overflow-wrap: anywhere; word-break: break-word; }
        .s3-mini-price {
          font-size: 13px; font-weight: 700; color: #f5a623;
        }

        @media (max-width: 1100px) {
          .s3-acc-section { grid-template-columns: 1fr; }
          .s3-acc-grid { grid-template-columns: repeat(2, 1fr); }
          .s3-acc-right { flex-direction: row; }
          .s3-lists-section { grid-template-columns: repeat(2, 1fr); }
          .s3-macbook-banner { padding: 36px 28px; }
        }
        @media (max-width: 768px) {
          .s3-macbook-banner { margin: 16px; flex-direction: column; gap: 24px; padding: 28px 18px; align-items: flex-start; }
          .s3-mac-right { width: 100%; justify-content: space-between; }
          .s3-mac-photo { max-height: 190px; }
          .s3-lists-section { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .s3-acc-grid { grid-template-columns: 1fr; }
          .s3-acc-right { flex-direction: column; }
          .s3-mac-right { flex-direction: column; align-items: flex-start; }
          .s3-mac-bubble { width: 76px; height: 76px; font-size: 16px; }
        }
      `}</style>

      {/* ── COMPUTER ACCESSORIES ── */}
      <section className="s3-acc-section">
        <div className="s3-acc-left">
          <h2 className="s3-acc-title">Computer Accessories</h2>
          <div className="s3-acc-grid">
            {accessories.map(p => <AccessoryCard key={p.id} product={p} />)}
          </div>
        </div>

        <div className="s3-acc-right">
          {/* Light promo card */}
          <div className="s3-side-card-light">
            <img src="/images/homepage/True.png" alt="" />
            <h3>Xiaomi True Wireless Earbuds</h3>
            <p>Escape the noise. It's time to hear the magic with Xiaomi Earbuds.</p>
            <div className="s3-only-row">
              <span className="s3-only-label">Only for:</span>
              <span className="s3-only-price">$299 USD</span>
            </div>
            <button className="s3-shop-btn">SHOP NOW →</button>
          </div>

          {/* Dark promo card */}
          <div className="s3-side-card-dark">
            <p className="s3-summer-tag">SUMMER SALES</p>
            <p className="s3-discount-pct">37% DISCOUNT</p>
            <p className="s3-discount-sub">only for <span>SmartPhone</span> product.</p>
            <button className="s3-shop-btn-cyan">SHOP NOW →</button>
          </div>
        </div>
      </section>

      {/* ── MACBOOK PRO BANNER ── */}
      <div className="s3-macbook-banner">
        <div className="s3-mac-text">
          <span className="s3-save-tag">SAVE UP TO $200.00</span>
          <h2 className="s3-mac-title">Macbook Pro</h2>
          <p className="s3-mac-desc">Apple M1 Max Chip. 32GB Unified Memory. 1TB SSD Storage</p>
          <button className="s3-shop-btn" style={{ width: "auto", display: "inline-flex" }}>
            SHOP NOW →
          </button>
        </div>
        <div className="s3-mac-right">
          <div className="s3-mac-bubble">$1999</div>
          <img className="s3-mac-photo" src="/images/homepage/Mac.png" alt="" />
        </div>
      </div>

      {/* ── FLASH SALE / BEST SELLERS / TOP RATED / NEW ARRIVAL ── */}
      <section className="s3-lists-section">
        {[
          { title: "FLASH SALE TODAY", items: flashSale },
          { title: "BEST SELLERS", items: bestSellers },
          { title: "TOP RATED", items: topRated },
          { title: "NEW ARRIVAL", items: newArrival },
        ].map(col => (
          <div className="s3-list-col" key={col.title}>
            <h3 className="s3-list-title">{col.title}</h3>
            {col.items.map((item, i) => (
              <MiniProductRow key={i} item={item} />
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}