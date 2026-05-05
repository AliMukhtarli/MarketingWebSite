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

