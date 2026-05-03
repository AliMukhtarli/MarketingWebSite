import { useState } from "react";

const news = [
  {
    id: 1,
    author: "Kristin",
    date: "19Dec, 2013",
    views: 453,
    title: "Cras nisl dolor, accumsan et metus sit amet, vulputate condimentum dolor.",
    desc: "Maecenas scelerisque, arcu quis tempus egestas, ligula diam molestie lectus, tincidunt malesuada arcu metus posuere metus.",
  },
  {
    id: 2,
    author: "Robert",
    date: "28 Nov, 2015",
    views: 738,
    title: "Curabitur pulvinar aliquam lectus, non blandit erat mattis vitae.",
    desc: "Mauris scelerisque odio id rutrum volutpat. Pellentesque urna odio, vulputate at tortor vitae, hendrerit blandit lorem.",
  },
  {
    id: 3,
    author: "Arlene",
    date: "9 May, 2014",
    views: 826,
    title: "Curabitur massa orci, consectetur et blandit ac, auctor et tellus.",
    desc: "Pellentesque vestibulum lorem vel gravida aliquam. Morbi porta, odio id suscipit mattis, risus augue condimentum purus.",
  },
];

const topCategory = [
  "Computer & Laptop",
  "SmartPhone",
  "Headphones",
  "Accessories",
  "Camera & Photo",
  "TV & Homes",
];

const quickLinks = [
  "Shop Product",
  "Shopping Cart",
  "Wishlist",
  "Compare",
  "Track Order",
  "Customer Help",
  "About Us",
];

const popularTags = [
  "Game", "iPhone", "TV", "Asus Laptops",
  "Macbook", "SSD", "Graphics Card",
  "Power Bank", "Smart TV", "Speaker",
  "Tablet", "Microwave", "Samsung",
];

export default function MarketingFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) { setSubscribed(true); setTimeout(() => setSubscribed(false), 3000); setEmail(""); }
  };

  return (
    <div className="sf-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .sf-wrapper {
          font-family: 'DM Sans', sans-serif;
          color: #1a1f3c;
          overflow-x: hidden;
        }
        :root { --page-pad: clamp(16px, 3vw, 40px); }

        /* ── LATEST NEWS ── */
        .sf-news-section {
          background: #f8f8fb;
          padding: 48px var(--page-pad) 56px;
        }
        .sf-section-title {
          font-family: 'Sora', sans-serif;
          font-size: 26px; font-weight: 700;
          text-align: center; margin-bottom: 28px;
        }
        .sf-news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .sf-news-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          transition: box-shadow 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .sf-news-card:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.12);
          transform: translateY(-3px);
        }
        .sf-news-img {
          width: 100%; height: 180px;
          background: #B401A5;
        }
        .sf-news-body { padding: 20px; }
        .sf-news-meta {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 12px; flex-wrap: wrap;
        }
        .sf-meta-item {
          display: flex; align-items: center; gap: 4px;
          font-size: 12px; color: #6b7280;
        }
        .sf-meta-icon { font-size: 13px; color: #f5a623; }
        .sf-news-title {
          font-family: 'Sora', sans-serif;
          font-size: 15px; font-weight: 700;
          line-height: 1.4; margin-bottom: 10px; color: #1a1f3c;
        }
        .sf-news-desc {
          font-size: 13px; color: #6b7280;
          line-height: 1.65; margin-bottom: 18px;
        }
        .sf-news-title, .sf-news-desc { overflow-wrap: anywhere; word-break: break-word; }
        .sf-read-more {
          background: none; border: 1.5px solid #f5a623;
          color: #f5a623; border-radius: 6px;
          padding: 8px 18px; font-size: 13px; font-weight: 600;
          cursor: pointer; font-family: inherit;
          display: inline-flex; align-items: center; gap: 6px;
          transition: background 0.2s, color 0.2s;
        }
        .sf-read-more:hover { background: #f5a623; color: white; }

        /* ── NEWSLETTER ── */
        .sf-newsletter {
          background: #1a1f3c;
          padding: 60px var(--page-pad);
          text-align: center;
        }
        .sf-nl-title {
          font-family: 'Sora', sans-serif;
          font-size: 26px; font-weight: 700;
          color: white; margin-bottom: 10px;
        }
        .sf-nl-desc {
          font-size: 14px; color: #9ca3af;
          line-height: 1.65; margin-bottom: 28px;
          max-width: 480px; margin-left: auto; margin-right: auto;
        }
        .sf-nl-form {
          display: flex;
          max-width: 380px;
          margin: 0 auto;
          border-radius: 6px;
          overflow: hidden;
          border: 1.5px solid #374151;
          background: white;
        }
        .sf-nl-input {
          flex: 1; border: none; outline: none;
          padding: 13px 18px; font-size: 13px;
          font-family: inherit; background: transparent;
          color: #1a1f3c;
        }
        .sf-nl-btn {
          background: #f5a623; border: none;
          color: white; padding: 0 22px;
          font-size: 13px; font-weight: 700;
          cursor: pointer; font-family: inherit;
          display: flex; align-items: center; gap: 6px;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .sf-nl-btn:hover { background: #e0920f; }
        .sf-nl-success {
          margin-top: 12px; font-size: 13px;
          color: #4DD9F5; font-weight: 600;
          animation: sfPop 0.3s ease;
        }
        @keyframes sfPop {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── FOOTER ── */
        .sf-footer {
          background: #7c3aed;
          padding: 48px var(--page-pad) 0;
        }
        .sf-footer-grid {
          display: grid;
          grid-template-columns: 220px 180px 180px 220px 1fr;
          gap: 32px;
          padding-bottom: 40px;
        }

        /* Brand col */
        .sf-brand-logo {
          font-family: 'Sora', sans-serif;
          font-size: 22px; font-weight: 700;
          color: white; margin-bottom: 18px;
          display: flex; align-items: center; gap: 8px;
        }
        .sf-logo-box {
          width: 16px; height: 16px;
          background: white; border-radius: 3px; opacity: 0.9;
        }
        .sf-brand-phone {
          font-size: 16px; font-weight: 600;
          color: white; margin-bottom: 6px;
        }
        .sf-brand-addr {
          font-size: 13px; color: rgba(255,255,255,0.7);
          line-height: 1.6; margin-bottom: 10px;
        }
        .sf-brand-email {
          font-size: 13px; color: rgba(255,255,255,0.85);
          font-weight: 500;
        }

        /* Col titles */
        .sf-col-title {
          font-family: 'Sora', sans-serif;
          font-size: 13px; font-weight: 700;
          color: white; letter-spacing: 1px;
          text-transform: uppercase; margin-bottom: 18px;
        }
        .sf-col-links { list-style: none; padding: 0; margin: 0; }
        .sf-col-links li {
          margin-bottom: 10px;
        }
        .sf-col-links a {
          font-size: 13px; color: rgba(255,255,255,0.72);
          text-decoration: none;
          transition: color 0.15s;
          cursor: pointer;
        }
        .sf-col-links a:hover { color: white; }
        .sf-col-links .sf-active-link {
          color: #f5a623 !important;
          font-weight: 600;
          display: flex; align-items: center; gap: 6px;
        }
        .sf-active-link::before {
          content: '';
          display: inline-block;
          width: 16px; height: 2px;
          background: #f5a623;
        }
        .sf-browse-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; color: #f5a623 !important;
          font-weight: 600; margin-top: 4px;
          cursor: pointer;
        }
        .sf-browse-link:hover { color: #e0920f !important; }

        /* Download app */
        .sf-app-btn {
          display: flex; align-items: center; gap: 10px;
          background: #1a1f3c;
          border-radius: 8px; padding: 10px 14px;
          margin-bottom: 10px; cursor: pointer;
          transition: background 0.2s;
          border: 1px solid rgba(255,255,255,0.1);
          text-decoration: none;
        }
        .sf-app-btn:hover { background: #111827; }
        .sf-app-icon { font-size: 22px; }
        .sf-app-text-small { font-size: 9px; color: rgba(255,255,255,0.6); display: block; }
        .sf-app-text-big { font-size: 14px; font-weight: 700; color: white; display: block; }

        /* Popular tags */
        .sf-tags-wrap {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .sf-tag {
          background: rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.85);
          border-radius: 4px; padding: 5px 12px;
          font-size: 12px; cursor: pointer;
          transition: background 0.15s, color 0.15s;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .sf-tag:hover { background: #f5a623; color: white; border-color: #f5a623; }
        .sf-tag.sf-tag-highlight {
          background: rgba(255,255,255,0.22);
          color: white; font-weight: 600;
        }

        /* Bottom bar */
        .sf-bottom-bar {
          background: #6d28d9;
          text-align: center;
          padding: 14px var(--page-pad);
          font-size: 12px;
          color: rgba(255,255,255,0.55);
        }

        @media (max-width: 1100px) {
          .sf-footer-grid { grid-template-columns: repeat(3, 1fr); }
          .sf-news-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .sf-news-grid { grid-template-columns: 1fr; }
          .sf-footer-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
        }
        @media (max-width: 480px) {
          .sf-footer-grid { grid-template-columns: 1fr; }
          .sf-nl-form { flex-direction: column; max-width: 420px; }
          .sf-nl-btn { padding: 12px 18px; justify-content: center; }
        }
      `}</style>

      {/* ── LATEST NEWS ── */}
      <section className="sf-news-section">
        <h2 className="sf-section-title">Latest News</h2>
        <div className="sf-news-grid">
          {news.map(item => (
            <div className="sf-news-card" key={item.id}>
              <div className="sf-news-img" />
              <div className="sf-news-body">
                <div className="sf-news-meta">
                  <span className="sf-meta-item"><span className="sf-meta-icon">👤</span>{item.author}</span>
                  <span className="sf-meta-item"><span className="sf-meta-icon">📅</span>{item.date}</span>
                  <span className="sf-meta-item"><span className="sf-meta-icon">👁</span>{item.views}</span>
                </div>
                <h3 className="sf-news-title">{item.title}</h3>
                <p className="sf-news-desc">{item.desc}</p>
                <button className="sf-read-more">READ MORE →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="sf-newsletter">
        <h2 className="sf-nl-title">Subscribe to our newsletter</h2>
        <p className="sf-nl-desc">
          Praesent fringilla erat a lacinia egestas. Donec vehicula tempor libero et cursus.
          Donec non quam urna. Quisque vitae porta ipsum.
        </p>
        <div className="sf-nl-form">
          <input
            className="sf-nl-input"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubscribe()}
          />
          <button className="sf-nl-btn" onClick={handleSubscribe}>
            SUBSCRIBE →
          </button>
        </div>
        {subscribed && <p className="sf-nl-success">✓ Uğurla abunə oldunuz!</p>}
      </section>

      {/* ── FOOTER ── */}
      <footer className="sf-footer">
        <div className="sf-footer-grid">

          {/* Brand */}
          <div>
            <div className="sf-brand-logo">
              <div className="sf-logo-box" />
              Umico
            </div>
            <p className="sf-brand-phone">(629) 555-0129</p>
            <p className="sf-brand-addr">
              4517 Washington Ave.<br />Manchester, Kentucky 39495
            </p>
            <p className="sf-brand-email">info@kinbo.com</p>
          </div>

          {/* Top Category */}
          <div>
            <p className="sf-col-title">Top Category</p>
            <ul className="sf-col-links">
              {topCategory.map((cat, i) => (
                <li key={cat}>
                  {cat === "Accessories"
                    ? <a className="sf-active-link">{cat}</a>
                    : <a>{cat}</a>
                  }
                </li>
              ))}
              <li><a className="sf-browse-link">Browse All Product →</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <p className="sf-col-title">Quick Links</p>
            <ul className="sf-col-links">
              {quickLinks.map(link => (
                <li key={link}><a>{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Download App */}
          <div>
            <p className="sf-col-title">Download App</p>
            <a className="sf-app-btn">
              <span className="sf-app-icon">▶</span>
              <span>
                <span className="sf-app-text-small">Get it now</span>
                <span className="sf-app-text-big">Google Play</span>
              </span>
            </a>
            <a className="sf-app-btn">
              <span className="sf-app-icon"></span>
              <span>
                <span className="sf-app-text-small">Get it now</span>
                <span className="sf-app-text-big">App Store</span>
              </span>
            </a>
          </div>

          {/* Popular Tags */}
          <div>
            <p className="sf-col-title">Popular Tag</p>
            <div className="sf-tags-wrap">
              {popularTags.map(tag => (
                <span
                  key={tag}
                  className={`sf-tag ${["Graphics Card", "Asus Laptops"].includes(tag) ? "sf-tag-highlight" : ""}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="sf-bottom-bar">
          Kinbo -eCommerce Template © 2021. Design by Templatecookie
        </div>
      </footer>
    </div>
  );
}