import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AllCategoryDropdown from "./AllCategoryDropdown";
import CartDropdown from "./CartDropdown";
import LoginDropdown from "./LoginDropdown";
import SocialFollowLinks from "./SocialFollowLinks";

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
  const headerRef = useRef(null);
  const [spacerH, setSpacerH] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const el = headerRef.current;
      if (!el) return;
      const h = Math.ceil(el.getBoundingClientRect().height);
      setSpacerH(h);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <>
      <div aria-hidden style={{ height: spacerH }} />

      <div className="site-header" ref={headerRef}>
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

        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10000;
          width: 100%;
        }

        :root { --page-pad: clamp(16px, 3vw, 40px); }

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
        .top-bar-right { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; justify-content: flex-end; }

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
          min-width: 0;
          max-width: 100%;
          display: flex;
          border: 1.5px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
        }
        .logo img {
          height: 36px;
          width: auto;
          max-width: 48px;
          object-fit: contain;
          flex-shrink: 0;
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

        .nav-bar {
          background: var(--white);
          padding: 10px var(--page-pad) 8px;
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
          scrollbar-width: none;
        }
        .nav-scroll::-webkit-scrollbar { display: none; }
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
        .nav-phone { font-size: 13px; font-weight: 600; color: var(--text); display: flex; align-items: center; gap: 8px; white-space: nowrap; flex-shrink: 0; }
        .nav-phone-icon { width: 20px; height: 20px; object-fit: contain; flex-shrink: 0; }

        @media (max-width: 768px) {
          .search-bar { order: 3; flex: 1 1 100%; }
          .nav-bar { display: none; }
        }
        @media (max-width: 480px) {
          .top-bar { font-size: 11px; }
        }
        `}</style>

        <div className="top-bar">
          <span>Yuxuların qənimi saytına xoş gəlmisiniz!!!</span>
          <div className="top-bar-right">
            <SocialFollowLinks />
          </div>
        </div>

        <header className="header">
          <Link className="logo" to="/">
            <img src="/images/nav/basket.jpg" alt="" />
            Gəlmə Gətirsinlər
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
          <div className="nav-phone">
            <img className="nav-phone-icon" src="/images/nav/PhoneCall.svg" alt="" />
            +994-070-596-99-66
          </div>
        </nav>
      </div>
    </>
  );
}

