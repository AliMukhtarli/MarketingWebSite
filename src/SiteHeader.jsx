import { useState } from "react";
import { Link } from "react-router-dom";
import AllCategoryDropdown from "./AllCategoryDropdown";
import CartDropdown from "./CartDropdown";
import LoginDropdown from "./LoginDropdown";

/**
 * Icons: put files in `public/images/nav/` (`/images/...` = site root).
 */
const NAV_LINKS = [
  { label: "Track Order", to: "/track-order", icon: "/images/nav/TrackOrder.svg" },
  { label: "Compare", icon: "/images/nav/Compare.svg" },
  { label: "Customer Support", icon: "/images/nav/CustomerSupport.svg" },
  { label: "Need Help", icon: "/images/nav/NeedHelp.svg" },
];

function NavIcon({ src }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <span className="nav-dot" />;
  return (
    <img
      className="nav-icon"
      src={src}
      alt=""
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export default function SiteHeader() {
  return (
    <div className="site-header">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

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
        }

        .site-header { position: sticky; top: 0; z-index: 1000; }

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
        .top-bar-right { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; justify-content: flex-end; }
        .social-dots { display: flex; gap: 4px; }
        .social-dot { width: 14px; height: 14px; border-radius: 3px; background: var(--primary); cursor: pointer; }
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
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          flex-wrap: wrap;
        }
        .logo {
          display: flex; align-items: center; gap: 8px;
          font-family: 'Sora', sans-serif; font-size: 24px; font-weight: 700; color: var(--text);
          text-decoration: none;
          white-space: nowrap;
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
        .search-bar button { border: none; cursor: pointer; padding: 0 18px; color: white; font-size: 18px; }
        .header-icons { display: flex; gap: 16px; align-items: center; }
        .icon-circle {
          position: relative; cursor: pointer;
          width: 40px; height: 40px; display: flex; align-items: center;
          justify-content: center; border-radius: 50%;
          font-size: 20px; color: var(--text);
          transition: background 0.2s;
        }
        .icon-circle:hover { background: #f0f0f0; }

        /* NAV BAR */
        .nav-bar {
          background: var(--white);
          padding: 0 var(--page-pad);
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid var(--border);
          overflow: visible;
        }
        .nav-left {
          display: flex;
          gap: 0;
          align-items: center;
          flex: 1;
          min-width: 0;
          overflow: visible;
        }
        .nav-scroll {
          display: flex;
          align-items: center;
          min-width: 0;
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
        }
        .nav-scroll::-webkit-scrollbar { display: none; } /* Chrome/Safari */
        .nav-item {
          display: flex; align-items: center; gap: 6px;
          padding: 12px 16px; font-size: 13px; font-weight: 500;
          cursor: pointer; color: var(--text);
          border-right: 1px solid var(--border);
          transition: color 0.2s;
          white-space: nowrap;
          flex: 0 0 auto;
          text-decoration: none;
        }
        .nav-item:hover { color: var(--accent); }
        .nav-item .nav-dot { width: 12px; height: 12px; background: var(--accent); border-radius: 2px; flex-shrink: 0; }
        .nav-item .nav-icon {
          width: 18px;
          height: 18px;
          object-fit: contain;
          flex-shrink: 0;
          display: block;
        }
        /* all category styling is inside AllCategoryDropdown */
        .nav-phone { font-size: 13px; font-weight: 600; color: var(--text); display: flex; align-items: center; gap: 6px; white-space: nowrap; }
        .nav-phone .nav-dot { width: 12px; height: 12px; background: var(--accent); border-radius: 2px; }

        @media (max-width: 768px) {
          .search-bar { order: 3; flex: 1 1 100%; }
          .nav-bar { display: none; }
        }
        @media (max-width: 480px) {
          .social-dots { display: none; }
        }
      `}</style>

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

      <header className="header">
        <Link className="logo" to="/">
          <img src="images/nav/basket.jpg" width={40} alt="" />
          Gəlmə Apar
        </Link>
        <div className="search-bar">
          <input type="text" placeholder="Search for anything..." />
          <button>🔍</button>
        </div>
        <div className="header-icons">
          <CartDropdown />
          <Link className="icon-circle" to="/wishlist" title="Wishlist">
            ♡
          </Link>
          <LoginDropdown />
        </div>
      </header>

      <nav className="nav-bar">
        <div className="nav-left">
          <AllCategoryDropdown />
          <div className="nav-scroll">
            {NAV_LINKS.map((item) => {
              const graphic = <NavIcon src={item.icon} />;
              const inner = (
                <>
                  {graphic}
                  {item.label}
                </>
              );
              return item.to ? (
                <Link className="nav-item" key={item.label} to={item.to}>
                  {inner}
                </Link>
              ) : (
                <div className="nav-item" key={item.label}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
        
          <img src="images/nav/PhoneCall.svg" alt="" />
          <span className="nav-dot" />
          +1-202-555-0104
        
      </nav>
    </div>
  );
}

