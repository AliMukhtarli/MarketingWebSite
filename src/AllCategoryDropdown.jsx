import { useEffect, useMemo, useRef, useState } from "react";

const categoryData = [
  {
    name: "Computer & Laptop",
    hasArrow: true,
    active: true,
    brands: ["All", "Apple", "Dell", "HP", "Samsung", "Acer", "Asus", "Lenovo", "Huawei", "Infinix", "Tecno"],
    featured: {
      title: "FEATURED PHONES",
      items: [
        { name: "Samsung Electronics Samsung Galaxy S21 5G", price: "$160", oldPrice: null },
        { name: "Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone", price: "$1,500", oldPrice: null },
        { name: "Sony DSCHX8 High Zoom Point & Shoot Camera", price: "$2,300", oldPrice: "$3,200" },
      ],
    },
    promo: {
      discount: "21%",
      title: "Discount",
      desc: "Escape the noise. It's time to hear the magic with Xiaomi Earbuds.",
      startingPrice: "$99 USD",
    },
  },
  { name: "Computer Accessories" },
  { name: "SmartPhone" },
  { name: "Headphone" },
  { name: "Mobile Accessories" },
  { name: "Gaming Console" },
  { name: "Camera & Photo" },
  { name: "TV & Homes Appliances" },
  { name: "Watchs & Accessories" },
  { name: "GPS & Navigation" },
  { name: "Warable Technology" },
];

export default function AllCategoryDropdown() {
  const [open, setOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const [activeBrand, setActiveBrand] = useState("Apple");
  const ref = useRef(null);
  const btnRef = useRef(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 780 });

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!open) return;

    const update = () => {
      const el = btnRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      const desiredWidth = 780;
      const horizontalPadding = 16;
      const maxWidth = Math.max(280, window.innerWidth - horizontalPadding * 2);
      const width = Math.min(desiredWidth, maxWidth);

      const left = Math.min(
        Math.max(horizontalPadding, rect.left),
        Math.max(horizontalPadding, window.innerWidth - horizontalPadding - width)
      );
      const top = rect.bottom;

      setMenuPos({ top, left, width });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  const cat = categoryData[activeCat];
  const menuStyle = useMemo(
    () => ({ top: `${menuPos.top}px`, left: `${menuPos.left}px`, width: `${menuPos.width}px` }),
    [menuPos.left, menuPos.top, menuPos.width]
  );

  return (
    <div className="acd-root" ref={ref}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .acd-root {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          display: inline-block;
        }

        /* ── ALL CATEGORY BUTTON ── */
        .acd-btn {
          background: #f5a623;
          color: white;
          border: none;
          border-radius: 6px 6px 0 0;
          padding: 11px 16px;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
          user-select: none;
          white-space: nowrap;
        }
        .acd-btn:hover { background: #e0920f; }
        .acd-btn.open { background: #e0920f; border-radius: 6px 6px 0 0; }
        .acd-btn-icon { font-size: 16px; transition: transform 0.25s ease; }
        .acd-btn.open .acd-btn-icon { transform: rotate(180deg); }

        /* ── MEGA MENU ── */
        .acd-menu {
          position: fixed;
          z-index: 5000;
          display: flex;
          background: white;
          border-radius: 0 8px 8px 8px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.15);
          overflow: hidden;
          transform-origin: top left;
          animation: acdOpen 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes acdOpen {
          from { opacity: 0; transform: scaleY(0.92) translateY(-8px); }
          to   { opacity: 1; transform: scaleY(1) translateY(0); }
        }

        /* ── LEFT: CATEGORY LIST ── */
        .acd-cat-list {
          width: 200px;
          flex-shrink: 0;
          border-right: 1px solid #f0f0f5;
          padding: 8px 0;
          background: #fafafa;
        }
        .acd-cat-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          border-left: 3px solid transparent;
        }
        .acd-cat-item:hover {
          background: #fff3df;
          color: #f5a623;
          border-left-color: #f5a623;
        }
        .acd-cat-item.active {
          background: white;
          color: #f5a623;
          font-weight: 600;
          border-left-color: #f5a623;
        }
        .acd-cat-arrow { font-size: 11px; color: #9ca3af; }
        .acd-cat-item.active .acd-cat-arrow,
        .acd-cat-item:hover .acd-cat-arrow { color: #f5a623; }
        .acd-shop-now {
          margin: 12px 16px 8px;
          background: #f5a623;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 11px 0;
          font-size: 13px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          width: calc(100% - 32px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: background 0.2s;
        }
        .acd-shop-now:hover { background: #e0920f; }

        /* ── MIDDLE: BRANDS ── */
        .acd-brands {
          width: 130px;
          flex-shrink: 0;
          border-right: 1px solid #f0f0f5;
          padding: 12px 0;
          background: white;
        }
        .acd-brand-item {
          padding: 9px 18px;
          font-size: 13px;
          color: #374151;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .acd-brand-item:hover { background: #fff3df; color: #f5a623; }
        .acd-brand-item.active {
          color: #f5a623;
          font-weight: 600;
          background: #fff3df;
        }

        /* ── RIGHT: FEATURED + PROMO ── */
        .acd-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 16px;
          gap: 12px;
          background: white;
          min-width: 0;
        }
        .acd-featured-title {
          font-family: 'Sora', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #1a1f3c;
          margin-bottom: 4px;
        }
        .acd-product-row {
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid #f3f4f6;
          cursor: pointer;
          transition: background 0.15s;
          border-radius: 6px;
          padding: 8px 6px;
        }
        .acd-product-row:last-child { border-bottom: none; }
        .acd-product-row:hover { background: #fff3df; }
        .acd-product-img {
          width: 52px; height: 52px;
          background: #f5a623;
          border-radius: 6px;
          flex-shrink: 0;
        }
        .acd-product-name {
          font-size: 12px;
          font-weight: 500;
          color: #1a1f3c;
          line-height: 1.4;
          margin-bottom: 3px;
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        .acd-product-row:hover .acd-product-name { color: #f5a623; }
        .acd-price-row { display: flex; align-items: center; gap: 6px; }
        .acd-price { font-size: 13px; font-weight: 700; color: #f5a623; }
        .acd-old-price { font-size: 11px; color: #9ca3af; text-decoration: line-through; }

        /* Promo card */
        .acd-promo {
          background: #fff9e6;
          border-radius: 10px;
          padding: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
        }
        .acd-promo-img {
          width: 64px; height: 64px;
          background: #f5a623;
          border-radius: 8px;
          flex-shrink: 0;
        }
        .acd-promo-discount {
          font-family: 'Sora', sans-serif;
          font-size: 18px; font-weight: 700;
          color: #1a1f3c; margin-bottom: 2px;
        }
        .acd-promo-discount span { color: #f5a623; }
        .acd-promo-desc { font-size: 11px; color: #6b7280; line-height: 1.4; margin-bottom: 6px; }
        .acd-promo-price-row { display: flex; align-items: center; gap: 8px; }
        .acd-promo-label { font-size: 11px; color: #6b7280; }
        .acd-promo-price {
          background: #1a1f3c; color: white;
          border-radius: 4px; padding: 3px 10px;
          font-size: 12px; font-weight: 700;
        }

        @media (max-width: 640px) {
          .acd-cat-list { width: 170px; }
          .acd-brands { display: none; }
        }
      `}</style>

      <button
        ref={btnRef}
        className={`acd-btn ${open ? "open" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span>☰</span>
        All Category
        <span className="acd-btn-icon">▾</span>
      </button>

      {open && (
        <div className="acd-menu" style={menuStyle}>
          <div className="acd-cat-list">
            {categoryData.map((c, i) => (
              <div
                key={c.name}
                className={`acd-cat-item ${activeCat === i ? "active" : ""}`}
                onMouseEnter={() => setActiveCat(i)}
              >
                {c.name}
                {c.hasArrow && <span className="acd-cat-arrow">›</span>}
              </div>
            ))}
            <button className="acd-shop-now">SHOP NOW →</button>
          </div>

          {cat.brands && (
            <div className="acd-brands">
              {cat.brands.map((b) => (
                <div
                  key={b}
                  className={`acd-brand-item ${activeBrand === b ? "active" : ""}`}
                  onClick={() => setActiveBrand(b)}
                >
                  {b}
                </div>
              ))}
            </div>
          )}

          {cat.featured && (
            <div className="acd-right">
              <p className="acd-featured-title">{cat.featured.title}</p>
              {cat.featured.items.map((item, i) => (
                <div className="acd-product-row" key={i}>
                  <div className="acd-product-img" />
                  <div style={{ minWidth: 0 }}>
                    <p className="acd-product-name">{item.name}</p>
                    <div className="acd-price-row">
                      {item.oldPrice && <span className="acd-old-price">{item.oldPrice}</span>}
                      <span className="acd-price">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}

              {cat.promo && (
                <div className="acd-promo">
                  <div className="acd-promo-img" />
                  <div>
                    <p className="acd-promo-discount">
                      <span>{cat.promo.discount}</span> {cat.promo.title}
                    </p>
                    <p className="acd-promo-desc">{cat.promo.desc}</p>
                    <div className="acd-promo-price-row">
                      <span className="acd-promo-label">Starting price:</span>
                      <span className="acd-promo-price">{cat.promo.startingPrice}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

