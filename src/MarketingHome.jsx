import { useState, useEffect } from "react";

const products = [
  {
    id: 1,
    name: "Xbox Series S - 512GB SSD Console with Wireless Controller - EU Version...",
    price: 442.12,
    oldPrice: 865.99,
    rating: 4,
    reviews: 52677,
    badge: "HOT",
    discount: "32% OFF",
    large: true,
  },
  {
    id: 2,
    name: "Base Sport Earbuds -Wireless Earphones -Bluetooth In Ear...",
    price: 2300,
    badge: "SOLD OUT",
  },
  {
    id: 3,
    name: "Simple Mobile 4G LTE Prepaid Smartphone",
    price: 220,
  },
  {
    id: 4,
    name: "4K UHD LED Smart TV with Chromecast Built-in",
    price: 1.5,
    oldPrice: 868,
    discount: "10% OFF",
  },
  {
    id: 5,
    name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
    price: 1280,
    oldPrice: null,
  },
  {
    id: 6,
    name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
    price: 299,
  },
  {
    id: 7,
    name: "Portable Washing Machine, 11lbs capacity Model 18NMFIAM",
    price: 70,
    oldPrice: 865.99,
  },
  {
    id: 8,
    name: "2-Barrel Carburetor Carb 2100 Engine Increase Horsepower",
    price: 160,
    badge: "HOT",
    oldPrice: null,
  },
  {
    id: 9,
    name: "JBL FLIP 4 -Waterproof Portable Bluetooth Speaker -Black",
    price: 250,
    oldPrice: 360,
    discount: "19% OFF",
  },
];

function CountdownTimer() {
  // total seconds remaining (example: 5d 16h 21m 57s)
  const [remaining, setRemaining] = useState(5 * 86400 + 16 * 3600 + 21 * 60 + 57);
  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");

  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  return (
    <span className="countdown">
      {pad(days)}d : 
      {pad(hours)}h : {pad(minutes)}m : {pad(seconds)}s
    </span>
  );
}

function StarRating({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= rating ? "#f5a623" : "#ccc" }}>★</span>
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  if (product.large) {
    return (
      <div className="product-card large-card">
        {product.badge && <span className="badge hot">{product.badge}</span>}
        {product.discount && <span className="badge discount">{product.discount}</span>}
        <div className="product-img-placeholder large-img" />
        <StarRating rating={product.rating} />
        <span className="review-count">({product.reviews?.toLocaleString()})</span>
        <p className="product-name">{product.name}</p>
        <div className="price-row">
          {product.oldPrice && <span className="old-price">${product.oldPrice}</span>}
          <span className="price">${product.price}</span>
        </div>
        <p className="product-desc">Games built using the Xbox Series X|S development kit showcase unparalleled load times, visuals.</p>
        <div className="card-actions-row">
          <button className="icon-btn">♡</button>
          <button className="add-to-card-btn">🛒 ADD TO CARD</button>
          <button className="icon-btn">👁</button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="product-card small-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {product.badge && (
        <span className={`badge ${product.badge === "SOLD OUT" ? "sold-out" : "hot"}`}>
          {product.badge}
        </span>
      )}
      {product.discount && <span className="badge discount">{product.discount}</span>}
      <div className="product-img-placeholder" />
      {hovered && (
        <div className="hover-actions">
          <button className="hover-btn" title="Like">♡</button>
          <button className="hover-btn" title="Add to Cart">🛒</button>
          <button className="hover-btn" title="Quick View">👁</button>
        </div>
      )}
      <p className="product-name small">{product.name}</p>
      <div className="price-row">
        {product.oldPrice && <span className="old-price">${product.oldPrice}</span>}
        <span className="price">${product.price}</span>
      </div>
    </div>
  );
}

export default function MarketingHome({ hideHeader = false }) {
  return (
    <div className="umico-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        img, svg, video, canvas { max-width: 100%; height: auto; }

        :root {
          --primary: #B401A5;
          --primary-dark: #8a0180;
          --accent: #f5a623;
          --navy: #1a1f3c;
          --text: #1a1f3c;
          --muted: #6b7280;
          --border: #e5e7eb;
          --bg: #f8f8fb;
          --white: #ffffff;
          --red: #e53e3e;
          --green: #38a169;
        }

        html, body { width: 100%; }
        body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }

        .umico-app { min-height: 100vh; }
        .countdown { white-space: nowrap; }

        /* Small responsive helpers */
        :root { --page-pad: clamp(16px, 3vw, 40px); }

        /* TOP BAR */
        .top-bar {
          background: var(--navy);
          color: #ccc;
          font-size: 12px;
          padding: 6px var(--page-pad);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .top-bar-right { display: flex; gap: 16px; align-items: center; }
        .social-dots { display: flex; gap: 4px; }
        .social-dot {
          width: 14px; height: 14px; border-radius: 3px;
          background: var(--primary); cursor: pointer;
        }
        .social-dot:nth-child(2) { background: #4267B2; }
        .social-dot:nth-child(3) { background: #1DA1F2; }
        .social-dot:nth-child(4) { background: #FF0000; }
        .social-dot:nth-child(5) { background: #E1306C; }
        .lang-currency { display: flex; gap: 8px; font-size: 12px; color: #ccc; }
        .lang-currency span { cursor: pointer; }
        .lang-currency span:hover { color: var(--accent); }

        /* HEADER */
        .header {
          background: var(--white);
          padding: 12px var(--page-pad);
          display: flex;
          align-items: center;
          gap: 24px;
          border-bottom: 1px solid var(--border);
          position: sticky; top: 0; z-index: 100;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          flex-wrap: wrap;
        }
        .logo {
          display: flex; align-items: center; gap: 8px;
          font-family: 'Sora', sans-serif; font-size: 24px; font-weight: 700; color: var(--text);
          text-decoration: none; white-space: nowrap;
        }
        .logo-box { width: 18px; height: 18px; background: var(--primary); border-radius: 3px; }
        .search-bar {
          flex: 1;
          display: flex;
          border: 1.5px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          min-width: min(520px, 100%);
        }
        .search-bar input {
          flex: 1; border: none; outline: none;
          padding: 10px 16px; font-size: 14px; font-family: inherit;
          background: transparent;
          min-width: 0;
        }
          .search-bar button {
          border: none; cursor: pointer;
          padding: 0 18px; color: white; font-size: 18px;
        }
        
        .header-icons { display: flex; gap: 16px; align-items: center; }
        .icon-circle {
          position: relative; cursor: pointer;
          width: 40px; height: 40px; display: flex; align-items: center;
          justify-content: center; border-radius: 50%;
          font-size: 20px; color: var(--text);
          transition: background 0.2s;
        }
        .icon-circle:hover { background: #f0f0f0; }
        .cart-badge {
          position: absolute; top: 0; right: 0;
          background: var(--primary); color: white;
          border-radius: 50%; width: 16px; height: 16px;
          font-size: 10px; display: flex; align-items: center; justify-content: center;
        }

        /* NAV BAR */
        .nav-bar {
          background: var(--white);
          padding: 10px var(--page-pad) 8px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid var(--border);
          overflow-x: auto;
        }
        .nav-left { display: flex; gap: 0; align-items: center; }
        .nav-item {
          display: flex; align-items: center; gap: 6px;
          padding: 12px 16px; font-size: 13px; font-weight: 500;
          cursor: pointer; color: var(--text);
          border-right: 1px solid var(--border);
          transition: color 0.2s;
          white-space: nowrap;
          flex: 0 0 auto;
        }
        .nav-item:hover { color: var(--accent); }
        .nav-item .nav-dot { width: 12px; height: 12px; background: var(--primary); border-radius: 2px; flex-shrink: 0; }
        .nav-item.all-cat { background: var(--white); color: var(--text); border-radius: 0; }
        .nav-item.all-cat .nav-dot { background: var(--white); }
        .nav-item.all-cat:hover { background: var(--accent); color: white; }
        .nav-phone { font-size: 13px; font-weight: 600; color: var(--text); display: flex; align-items: center; gap: 6px; }
        .nav-phone .nav-dot { width: 12px; height: 12px; background: var(--primary); border-radius: 2px; }

        /* HERO SECTION */
        .hero-section {
          padding: 24px var(--page-pad);
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 16px;
        }

        /* HERO BANNER */
        .hero-banner {
          background: var(--white);
          border-radius: 12px;
          overflow: hidden;
          padding: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          min-height: 260px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          gap: 16px;
        }
        .hero-text { max-width: 300px; min-width: 0; }
        .hero-tag { font-size: 11px; font-weight: 600; color: var(--accent); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
        .hero-tag::before { content: ''; display: inline-block; width: 24px; height: 2px; background: var(--accent); }
        .hero-title { font-family: 'Sora', sans-serif; font-size: clamp(28px, 4vw, 40px); font-weight: 700; line-height: 1.15; margin-bottom: 14px; color: var(--text); }
        .hero-desc { font-size: 13px; color: var(--muted); margin-bottom: 24px; line-height: 1.6; }
        .shop-now-btn {
          background: var(--accent); color: white;
          border: none; border-radius: 6px;
          padding: 12px 24px; font-size: 14px; font-weight: 600;
          cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
          font-family: inherit; transition: background 0.2s, transform 0.15s;
        }
        .shop-now-btn:hover { background: #e0920f; transform: translateY(-1px); }
        .hero-img-placeholder {
          width: 240px; height: 220px;
          background: var(--primary);
          border-radius: 12px;
          flex-shrink: 0;
          position: relative;
        }
        .price-bubble {
          position: absolute;
          top: 12px;
          right: 12px;
          left: auto;
          transform: none;
          background: #4DD9F5; color: white;
          border-radius: 50%; width: 70px; height: 70px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 700; font-family: 'Sora', sans-serif;
        }
        

        /* SIDE BANNERS */
        .side-banners { display: flex; flex-direction: column; gap: 12px; }
        .side-banner-top {
          background: var(--navy);
          border-radius: 10px; padding: 20px;
          color: white; position: relative; overflow: hidden;
          flex: 1;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }
        .side-banner-top .off-badge {
          position: absolute; top: 12px; right: 12px;
          background: var(--accent); color: white;
          border-radius: 4px; padding: 3px 8px;
          font-size: 11px; font-weight: 700;
        }
        .summer-tag { font-size: 10px; color: var(--accent); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; }
        .side-banner-top h3 { font-family: 'Sora', sans-serif; font-size: 17px; font-weight: 700; margin-bottom: 12px; }
        .side-banner-top .shop-now-btn { padding: 8px 16px; font-size: 12px; }
        .side-img { position: absolute; right: 0; bottom: 0; width: 80px; height: 80px; background: var(--primary); border-radius: 8px 0 10px 0; }

        .side-banner-bottom {
          background: var(--white);
          border-radius: 10px; padding: 16px;
          display: flex; align-items: center; gap: 14px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .side-bottom-img { width: 80px; height: 80px; background: var(--primary); border-radius: 8px; flex-shrink: 0; }
        .side-bottom-info h4 { font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
        .side-bottom-info .usd-price { color: var(--accent); font-size: 14px; font-weight: 700; margin-bottom: 8px; }
        .side-bottom-info .shop-now-btn { padding: 7px 14px; font-size: 12px; }

        /* FEATURES BAR */
        .features-bar {
          margin: 0 var(--page-pad) 24px;
          background: var(--white);
          border-radius: 10px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .feature-item {
          display: flex; align-items: center; gap: 14px;
          padding: 20px 24px;
          border-right: 1px solid var(--border);
        }
        .feature-item:last-child { border-right: none; }
        .feature-icon { width: 36px; height: 36px; background: var(--primary); border-radius: 6px; flex-shrink: 0; }
        .feature-item h4 { font-size: 13px; font-weight: 700; margin-bottom: 2px; }
        .feature-item p { font-size: 11px; color: var(--muted); }

        /* BEST DEALS */
        .best-deals { padding: 0 var(--page-pad) 40px; }
        .section-header {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 20px;
        }
        .section-title { font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 700; }
        .deals-timer { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--muted); }
        .countdown {
          background: var(--navy); color: white;
          padding: 4px 12px; border-radius: 4px;
          font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 600;
          letter-spacing: 1px;
        }

        /* PRODUCTS GRID */
        .products-grid {
          display: grid;
          grid-template-columns: 280px repeat(4, 1fr);
          grid-template-rows: auto auto;
          gap: 12px;
        }
        .product-card {
          background: var(--white);
          border-radius: 10px;
          padding: 16px;
          position: relative;
          box-shadow: 0 1px 6px rgba(0,0,0,0.06);
          transition: box-shadow 0.2s, transform 0.2s;
          overflow: hidden;
        }
        .product-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.12); transform: translateY(-2px); }
        .large-card { grid-row: 1 / 3; display: flex; flex-direction: column; gap: 8px; }

        .product-img-placeholder {
          width: 100%; height: 120px;
          background: var(--primary);
          border-radius: 8px;
          margin-bottom: 8px;
        }
        .large-img { height: 220px; }

        /* BADGES */
        .badge {
          position: absolute; top: 12px; left: 12px;
          border-radius: 4px; font-size: 10px; font-weight: 700;
          padding: 3px 8px; z-index: 2;
        }
        .hot { background: var(--red); color: white; }
        .sold-out { background: #555; color: white; }
        .discount { background: var(--accent); color: white; left: auto; right: 12px; top: 12px; }

        /* HOVER ACTIONS */
        .hover-actions {
          position: absolute; top: 50%; right: 12px;
          transform: translateY(-50%);
          display: flex; flex-direction: column; gap: 6px;
          z-index: 10;
          animation: fadeIn 0.15s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-40%) scale(0.9); } to { opacity: 1; transform: translateY(-50%) scale(1); } }
        .hover-btn {
          width: 36px; height: 36px; border-radius: 50%;
          border: none; background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.15);
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; font-size: 15px;
          transition: background 0.15s, transform 0.15s;
        }
        .hover-btn:hover { background: var(--accent); color: white; transform: scale(1.1); }

        .product-name { font-size: 13px; font-weight: 500; line-height: 1.4; color: var(--text); overflow-wrap: anywhere; word-break: break-word; }
        .product-name.small { font-size: 12px; }
        .price-row { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
        .old-price { font-size: 12px; color: var(--muted); text-decoration: line-through; }
        .price { font-size: 15px; font-weight: 700; color: var(--accent); }

        .stars { display: flex; font-size: 14px; }
        .review-count { font-size: 11px; color: var(--muted); }

        .product-desc { font-size: 11px; color: var(--muted); line-height: 1.5; }

        .card-actions-row {
          display: flex; align-items: center; gap: 8px; margin-top: 8px;
        }
        .icon-btn {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid var(--border); background: white;
          cursor: pointer; font-size: 16px;
          transition: border-color 0.15s, background 0.15s;
        }
        .icon-btn:hover { border-color: var(--accent); background: #fff3df; }
        .add-to-card-btn {
          flex: 1; background: var(--accent); color: white;
          border: none; border-radius: 6px;
          padding: 9px 12px; font-size: 12px; font-weight: 600;
          cursor: pointer; font-family: inherit;
          transition: background 0.2s;
        }
        .add-to-card-btn:hover { background: #e0920f; }

        @media (max-width: 1100px) {
          .products-grid { grid-template-columns: repeat(3, 1fr); }
          .large-card { grid-row: auto; }
          .hero-section { grid-template-columns: 1fr; }
          .side-banners { flex-direction: row; }
          .hero-banner { padding: 28px; }
        }
        @media (max-width: 768px) {
          .header { gap: 12px; }
          .search-bar { order: 3; flex: 1 1 100%; }
          .top-bar-right { flex-wrap: wrap; justify-content: flex-end; }
          .features-bar { grid-template-columns: repeat(2, 1fr); margin-bottom: 16px; }
          .products-grid { grid-template-columns: repeat(2, 1fr); }
          .nav-bar { display: none; }
          .hero-banner { padding: 22px; }
          .hero-text { max-width: none; }
          .hero-img-placeholder { width: 220px; height: 200px; }
          .side-banners { flex-direction: column; }
        }
        @media (max-width: 480px) {
          .top-bar { font-size: 11px; }
          .social-dots { display: none; }
          .header-icons { margin-left: auto; }
          .hero-banner { flex-direction: column; align-items: flex-start; padding: 18px; }
          .hero-img-placeholder { width: 100%; height: 180px; }
          .features-bar { grid-template-columns: 1fr; }
          .products-grid { grid-template-columns: 1fr; }
          .large-card { grid-row: auto; }
        }
      `}</style>

      {!hideHeader && (
        <>
          {/* TOP BAR */}
          <div className="top-bar">
            <span>Welcome to Clicon online eCommerce store.</span>
            <div className="top-bar-right">
              <span>Follow us:</span>
              <div className="social-dots">
                <div className="social-dot" />
                <div className="social-dot" />
                <div className="social-dot" />
                <div className="social-dot" />
                <div className="social-dot" />
              </div>
              <div className="lang-currency">
                <span>Eng ▾</span>
                <span>USD ▾</span>
              </div>
            </div>
          </div>

          {/* HEADER */}
          <header className="header">
            <a className="logo" href="#">
              <div className="logo-box" />
              Gəlmə Apar
            </a>
            <div className="search-bar">
              <input type="text" placeholder="Search for anything..." />
              <button>🔍</button>
            </div>
            <div className="header-icons">
              <div className="icon-circle">
                🛒
                <span className="cart-badge">0</span>
              </div>
              <div className="icon-circle">♡</div>
              <div className="icon-circle">👤</div>
            </div>
          </header>

          {/* NAV BAR */}
          <nav className="nav-bar">
            <div className="nav-left">
              <div className="nav-item all-cat">
                <span className="nav-dot" />
                All Category ▾
              </div>
              {["Track Order", "Compare", "Customer Support", "Need Help"].map((item) => (
                <div className="nav-item" key={item}>
                  <span className="nav-dot" />
                  {item}
                </div>
              ))}
            </div>
            <div className="nav-phone">
              <span className="nav-dot" />
              +1-202-555-0104
            </div>
          </nav>
        </>
      )}

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-banner">
          <div className="hero-text">
            <p className="hero-tag">THE BEST PLACE TO PLAY</p>
            <h1 className="hero-title">Xbox Consoles</h1>
            <p className="hero-desc">
              Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.
            </p>
            <button className="shop-now-btn">SHOP NOW →</button>
          </div>
          <div className="hero-img-placeholder">
            <img src="public/images/Xbox299.jpg" alt="Xbox Console" />
            <div className="price-bubble">$299</div>
          </div>
        </div>

        <div className="side-banners">
          <div className="side-banner-top">
            <span className="off-badge">29% OFF</span>
            <p className="summer-tag">SUMMER SALES</p>
            <h3>New Google<br />Pixel 6 Pro</h3>
            <button className="shop-now-btn">SHOP NOW →</button>
            <div className="side-img" />
          </div>
          <div className="side-banner-bottom">
            <div className="side-bottom-img" />
            <div className="side-bottom-info">
              <h4>Xiaomi FlipBuds Pro</h4>
              <p className="usd-price">$299 USD</p>
              <button className="shop-now-btn">SHOP NOW →</button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES BAR */}
      <div className="features-bar">
        {[
          { title: "FASTED DELIVERY", desc: "Delivery in 24/H" },
          { title: "24 HOURS RETURN", desc: "100% money-back guarantee" },
          { title: "SECURE PAYMENT", desc: "Your money is safe" },
          { title: "SUPPORT 24/7", desc: "Live contact/massage" },
        ].map((f) => (
          <div className="feature-item" key={f.title}>
            <div className="feature-icon" />
            <div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* BEST DEALS */}
      <section className="best-deals">
        <div className="section-header">
          <h2 className="section-title">Best Deals</h2>
          <div className="deals-timer">
            Deals ends in <CountdownTimer />
          </div>
        </div>
        <div className="products-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}