import { useState } from "react";

const categories = [
  { id: 1, label: "Computer & Laptop", image: "/images/homepage/Monitor2.jpg" },
  { id: 2, label: "SmartPhone", image: "/images/homepage/SmartPhone.jpg" },
  { id: 3, label: "Headphones", image: "/images/homepage/Headphone.jpg" },
  { id: 4, label: "Accessories", image: "/images/homepage/Monitor.jpg" },
  { id: 5, label: "Camera & Photo", image: "/images/homepage/Camera.jpg" },
  { id: 6, label: "TV & Homes", image: "/images/homepage/TV.jpg" },
];

const tabs = ["All Product", "Smart Phone", "Laptop", "Headphone", "TV"];

const featuredProducts = [
  {
    id: 1,
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headpho...",
    price: 70,
    rating: 4,
    reviews: 738,
    badge: "HOT",
    badgeType: "hot",
    image: "/images/homepage/Phone1.jpg",
  },
  {
    id: 2,
    name: "Samsung Electronics Samsung Galaxy S21 5G",
    price: 2300,
    rating: 4,
    reviews: 536,
    image: "/images/homepage/Phone0.jpg",
  },
  {
    id: 3,
    name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...",
    price: 360,
    rating: 4,
    reviews: 423,
    badge: "BEST DEALS",
    badgeType: "best",
    image: "/images/homepage/AirConditioner.jpg",
  },
  {
    id: 4,
    name: "Portable Washing Machine, 11lbs capacity Model 18NMF...",
    price: 80,
    rating: 3,
    reviews: 810,
    image: "/images/homepage/Headphones2.jpg",
  },
  {
    id: 5,
    name: "Wired Over-Ear Gaming Headphones with USB",
    price: 1500,
    rating: 5,
    reviews: 647,
    image: "/images/homepage/Drone2.jpg",
  },
  {
    id: 6,
    name: "Polaroid 57-Inch Photo/Video Tripod with Deluxe Tripod Ca...",
    price: 1200,
    oldPrice: 1600,
    rating: 4,
    reviews: 877,
    discount: "25% OFF",
    image: "/images/homepage/TV.jpg",
  },
  {
    id: 7,
    name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
    price: 250,
    rating: 5,
    reviews: 426,
    image: "/images/homepage/Monitor3.jpg",
  },
  {
    id: 8,
    name: "4K UHD LED Smart TV with Chromecast Built-in",
    price: 220,
    rating: 5,
    reviews: 583,
    badge: "SALE",
    badgeType: "sale",
    image: "/images/homepage/TV.jpg",
  },
];

function StarRating({ rating }) {
  return (
    <div className="s2-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= rating ? "#f5a623" : "#ddd" }}>★</span>
      ))}
    </div>
  );
}

function FeaturedProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="s2-product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {product.badge && (
        <span className={`s2-badge s2-badge-${product.badgeType}`}>{product.badge}</span>
      )}
      {product.discount && (
        <span className="s2-badge s2-badge-discount">{product.discount}</span>
      )}
      <img className="s2-product-img" src={product.image} alt="" />
      {hovered && (
        <div className="s2-hover-actions">
          <button className="s2-hover-btn" title="Like">♡</button>
          <button className="s2-hover-btn" title="Add to Cart">🛒</button>
          <button className="s2-hover-btn" title="Quick View">👁</button>
        </div>
      )}
      <div className="s2-card-body">
        <div className="s2-rating-row">
          <StarRating rating={product.rating} />
          <span className="s2-review-count">({product.reviews})</span>
        </div>
        <p className="s2-product-name">{product.name}</p>
        <div className="s2-price-row">
          {product.oldPrice && <span className="s2-old-price">${product.oldPrice.toLocaleString()}</span>}
          <span className="s2-price">${product.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default function Marketing2() {
  const [activeTab, setActiveTab] = useState("All Product");

  return (
    <div className="s2-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .s2-wrapper {
          font-family: 'DM Sans', sans-serif;
          background: #f8f8fb;
          color: #1a1f3c;
          overflow-x: hidden;
        }
        :root { --page-pad: clamp(16px, 3vw, 40px); }

        /* ── SHOP WITH CATEGORIES ── */
        .s2-categories-section {
          padding: 48px var(--page-pad) 32px;
          text-align: center;
        }
        .s2-section-title {
          font-family: 'Sora', sans-serif;
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 28px;
        }
        .s2-cat-slider-wrap {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .s2-arrow-btn {
          width: 38px; height: 38px;
          background: #f5a623;
          border: none; border-radius: 50%;
          color: white; font-size: 18px;
          cursor: pointer; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, transform 0.15s;
          box-shadow: 0 2px 8px rgba(245,166,35,0.4);
        }
        .s2-arrow-btn:hover { background: #e0920f; transform: scale(1.08); }
        .s2-cat-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }
        .s2-cat-item {
          display: flex; flex-direction: column;
          align-items: center; gap: 10px;
          cursor: pointer;
        }
        .s2-cat-img {
          width: 100%; aspect-ratio: 1;
          object-fit: cover;
          display: block;
          background: #B401A5;
          border-radius: 10px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .s2-cat-item:hover .s2-cat-img {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(180,1,165,0.25);
        }
        .s2-cat-label {
          font-size: 13px; font-weight: 500; color: #f5a623;
          transition: color 0.2s;
        }
        .s2-cat-item:hover .s2-cat-label { color: #f5a623; }

        /* ── FEATURED PRODUCTS ── */
        .s2-featured-section {
          padding: 16px var(--page-pad) 40px;
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 20px;
          align-items: start;
        }

        /* Sidebar discount card */
        .s2-discount-card {
          background: #fff9e6;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
        }
        .s2-discount-top {
          padding: 24px 20px;
          text-align: center;
        }
        .s2-discount-tag {
          font-size: 10px; font-weight: 700;
          color: #f5a623; letter-spacing: 2px;
          text-transform: uppercase; margin-bottom: 8px;
        }
        .s2-discount-pct {
          font-family: 'Sora', sans-serif;
          font-size: 28px; font-weight: 700;
          color: #1a1f3c; margin-bottom: 4px;
        }
        .s2-discount-sub {
          font-size: 12px; color: #6b7280; margin-bottom: 16px;
        }
        .s2-offer-row {
          display: flex; align-items: center;
          justify-content: center; gap: 8px;
          font-size: 12px; color: #6b7280; margin-bottom: 18px;
        }
        .s2-offer-badge {
          background: #1a1f3c; color: white;
          font-size: 11px; font-weight: 700;
          padding: 4px 10px; border-radius: 4px;
          white-space: nowrap;
        }
        .s2-shop-btn {
          background: #f5a623; color: white;
          border: none; border-radius: 6px;
          padding: 11px 24px; font-size: 13px; font-weight: 600;
          cursor: pointer; font-family: inherit;
          display: inline-flex; align-items: center; gap: 8px;
          transition: background 0.2s, transform 0.15s;
          width: 100%;
          justify-content: center;
        }
        .s2-shop-btn:hover { background: #e0920f; transform: translateY(-1px); }
        .s2-discount-img {
          width: 100%; height: 180px;
          background: #B401A5;
        }

        /* Featured products right side */
        .s2-featured-right {}
        .s2-featured-header {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          gap: 12px;
        }
        .s2-featured-title {
          font-family: 'Sora', sans-serif;
          font-size: 20px; font-weight: 700;
        }
        .s2-tabs-row {
          display: flex; align-items: center; gap: 0;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .s2-tab {
          padding: 6px 14px; font-size: 13px;
          border: none; background: none;
          cursor: pointer; font-family: inherit;
          color: #6b7280; font-weight: 500;
          border-bottom: 2px solid transparent;
          transition: color 0.15s, border-color 0.15s;
        }
        .s2-tab.active {
          color: #1a1f3c;
          border-bottom: 2px solid #1a1f3c;
        }
        .s2-tab:hover:not(.active) { color: #f5a623; }
        .s2-browse-all {
          background: none; border: none; cursor: pointer;
          color: #f5a623; font-size: 13px; font-weight: 600;
          font-family: inherit; display: flex; align-items: center; gap: 4px;
          white-space: nowrap; margin-left: 8px;
        }
        .s2-browse-all:hover { color: #e0920f; }

        .s2-products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        /* Product Card */
        .s2-product-card {
          background: white;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 1px 6px rgba(0,0,0,0.06);
          transition: box-shadow 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .s2-product-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }
        .s2-product-img {
          width: 100%;
          height: 130px;
          object-fit: cover;
          display: block;
          background: #B401A5;
        }
        .s2-badge {
          position: absolute; top: 10px; left: 10px;
          border-radius: 4px; font-size: 10px; font-weight: 700;
          padding: 3px 8px; z-index: 2;
        }
        .s2-badge-hot { background: #e53e3e; color: white; }
        .s2-badge-best { background: #f5a623; color: white; }
        .s2-badge-sale { background: #38a169; color: white; }
        .s2-badge-discount { background: #f5a623; color: white; left: auto; right: 10px; }
        .s2-hover-actions {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 6px;
          z-index: 10;
          animation: s2fadeIn 0.15s ease;
        }
        @keyframes s2fadeIn {
          from { opacity: 0; transform: translateY(-40%) scale(0.9); }
          to   { opacity: 1; transform: translateY(-50%) scale(1); }
        }
        .s2-hover-btn {
          width: 32px; height: 32px; border-radius: 50%;
          border: none; background: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          cursor: pointer; font-size: 13px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, transform 0.15s;
        }
        .s2-hover-btn:hover { background: #f5a623; color: white; transform: scale(1.1); }
        .s2-card-body { padding: 10px 12px 14px; }
        .s2-rating-row {
          display: flex; align-items: center; gap: 4px; margin-bottom: 4px;
        }
        .s2-stars { display: flex; font-size: 12px; }
        .s2-review-count { font-size: 10px; color: #6b7280; }
        .s2-product-name { font-size: 12px; font-weight: 500; line-height: 1.4; color: #1a1f3c; margin-bottom: 6px; }
        .s2-product-name { overflow-wrap: anywhere; word-break: break-word; }
        .s2-price-row { display: flex; align-items: center; gap: 6px; }
        .s2-old-price { font-size: 11px; color: #9ca3af; text-decoration: line-through; }
        .s2-price { font-size: 14px; font-weight: 700; color: #f5a623; }

        /* ── INTRO BANNERS ── */
        .s2-intro-banners {
          padding: 0 var(--page-pad) 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .s2-intro-light {
          background: white;
          border-radius: 12px;
          padding: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          overflow: hidden;
        }
        .s2-intro-tag-light {
          display: inline-block;
          background: #4DD9F5; color: white;
          font-size: 10px; font-weight: 700;
          padding: 3px 10px; border-radius: 4px;
          margin-bottom: 12px; letter-spacing: 1px;
        }
        .s2-intro-light h3 {
          font-family: 'Sora', sans-serif;
          font-size: 22px; font-weight: 700;
          line-height: 1.25; margin-bottom: 8px;
        }
        .s2-intro-light p {
          font-size: 12px; color: #6b7280;
          line-height: 1.6; margin-bottom: 20px;
          max-width: 200px;
        }
        .s2-intro-dark {
          background: #1a1f3c;
          border-radius: 12px;
          padding: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 12px rgba(0,0,0,0.12);
          overflow: hidden;
          position: relative;
        }
        .s2-intro-tag-dark {
          display: inline-block;
          background: #f5a623; color: white;
          font-size: 10px; font-weight: 700;
          padding: 3px 10px; border-radius: 4px;
          margin-bottom: 12px; letter-spacing: 1px;
        }
        .s2-intro-dark h3 {
          font-family: 'Sora', sans-serif;
          font-size: 22px; font-weight: 700;
          color: white; line-height: 1.25; margin-bottom: 6px;
        }
        .s2-intro-dark p {
          font-size: 11px; color: #9ca3af;
          line-height: 1.6; margin-bottom: 20px;
          max-width: 200px;
        }
        .s2-intro-img-dark {
          width: 210px; height: 140px;
          border-radius: 10px; flex-shrink: 0;
          position: relative;
        }
        .s2-price-bubble {
          position: absolute; top: -14px; right: -14px;
          background: #4DD9F5; color: white;
          width: 60px; height: 60px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Sora', sans-serif;
          font-size: 14px; font-weight: 700;
        }

        @media (max-width: 1100px) {
          .s2-cat-grid { grid-template-columns: repeat(3, 1fr); }
          .s2-products-grid { grid-template-columns: repeat(2, 1fr); }
          .s2-featured-section { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .s2-intro-banners { grid-template-columns: 1fr; }
          .s2-cat-grid { grid-template-columns: repeat(3, 1fr); }
          .s2-featured-header { flex-direction: column; align-items: flex-start; }
          .s2-tabs-row { justify-content: flex-start; }
          .s2-tab { padding: 6px 10px; }
        }
        @media (max-width: 480px) {
          .s2-arrow-btn { display: none; }
          .s2-cat-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .s2-products-grid { grid-template-columns: 1fr; }
          .s2-intro-light, .s2-intro-dark { flex-direction: column; align-items: flex-start; gap: 16px; }
          .s2-intro-img-light, .s2-intro-img-dark { width: 100%; height: 160px; }
          .s2-intro-light p, .s2-intro-dark p { max-width: none; }
        }
      `}</style>

      {/* ── SHOP WITH CATEGORIES ── */}
      <section className="s2-categories-section">
        <h2 className="s2-section-title">Shop with Categorys</h2>
        <div className="s2-cat-slider-wrap">
          <button className="s2-arrow-btn">‹</button>
          <div className="s2-cat-grid">
            {categories.map((cat) => (
              <div className="s2-cat-item" key={cat.id}>
                <img className="s2-cat-img" src={cat.image} alt="" />
                <span className="s2-cat-label">{cat.label}</span>
              </div>
            ))}
          </div>
          <button className="s2-arrow-btn">›</button>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="s2-featured-section">
        {/* Sidebar */}
        <div className="s2-discount-card">
          <div className="s2-discount-top">
            <p className="s2-discount-tag">COMPUTER & ACCESSORIES</p>
            <p className="s2-discount-pct">32% Discount</p>
            <p className="s2-discount-sub">For all electronics products</p>
            <div className="s2-offer-row">
              Offers ends in: <span className="s2-offer-badge">ENDS OF CHRISTMAS</span>
            </div>
            <button className="s2-shop-btn">SHOP NOW →</button>
          </div>
          <img src="/images/homepage/Accesuars.jpg" alt="" />
        </div>

        {/* Right: tabs + grid */}
        <div className="s2-featured-right">
          <div className="s2-featured-header">
            <h2 className="s2-featured-title">Featured Products</h2>
            <div className="s2-tabs-row">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`s2-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
              <button className="s2-browse-all">Browse All Product →</button>
            </div>
          </div>
          <div className="s2-products-grid">
            {featuredProducts.map((p) => (
              <FeaturedProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO BANNERS ── */}
      <section className="s2-intro-banners">
        {/* Light banner */}
        <div className="s2-intro-light">
          <div>
            <span className="s2-intro-tag-light">INTRODUCING</span>
            <h3>New Apple<br />Homepod Mini</h3>
            <p>Jam-packed with innovation, HomePod mini delivers unexpectedly.</p>
            <button className="s2-shop-btn" style={{ width: "auto" }}>SHOP NOW →</button>
          </div>
          <img src="public/images/homepage/HomePod.jpg" alt="" />
        </div>

        {/* Dark banner */}
        <div className="s2-intro-dark">
          <div>
            <span className="s2-intro-tag-dark">INTRODUCING NEW</span>
            <h3>Xiaomi Mi 11 Ultra<br />12GB+256GB</h3>
            <p>*Data provided by internal laboratories. Industry measurment.</p>
            <button className="s2-shop-btn" style={{ width: "auto" }}>SHOP NOW →</button>
          </div>
          <div className="s2-intro-img-dark">
            <img src="public/images/homepage/Pixel6.png" alt="" />
            <div className="s2-price-bubble">$590</div>
          </div>
        </div>
      </section>
    </div>
  );
}