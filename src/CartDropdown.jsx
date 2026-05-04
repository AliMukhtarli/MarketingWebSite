import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const initialItems = [
  {
    id: 1,
    name: "Canon EOS 1500D DSLR Camera Body+ 18-55 mm",
    qty: 1,
    price: 1500,
    img: "📷",
  },
  {
    id: 2,
    name: "Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone",
    qty: 2,
    price: 269,
    img: "🎧",
  },
];

export default function CartDropdown() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(initialItems);
  const ref = useRef(null);
  const btnRef = useRef(null);
  const [panelPos, setPanelPos] = useState({ top: 0, left: 0, width: 340 });

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
      const pad = 16;
      const desiredWidth = 340;
      const width = Math.min(desiredWidth, Math.max(300, window.innerWidth - pad * 2));
      let left = rect.right - width;
      left = Math.max(pad, Math.min(left, window.innerWidth - pad - width));
      const top = rect.bottom + 12;
      setPanelPos({ top, left, width });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  const panelStyle = useMemo(
    () => ({
      top: `${panelPos.top}px`,
      left: `${panelPos.left}px`,
      width: `${panelPos.width}px`,
    }),
    [panelPos.left, panelPos.top, panelPos.width]
  );

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalCount = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="cd-root" ref={ref}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .cd-root {
          position: relative;
          display: inline-flex;
          align-items: center;
          font-family: 'DM Sans', sans-serif;
        }

        .cd-icon-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: none;
          background: transparent;
          font-size: 20px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #1a1f3c;
          transition: background 0.2s;
          position: relative;
        }
        .cd-icon-btn:hover { background: #f3f4f6; }
        .cd-icon-btn.active { background: #fff3df; }

        .cd-badge {
          position: absolute;
          top: 0; right: 0;
          background: #f5a623;
          color: white;
          border-radius: 50%;
          width: 17px; height: 17px;
          font-size: 10px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid white;
          font-family: 'DM Sans', sans-serif;
          transition: transform 0.2s;
        }
        .cd-icon-btn:hover .cd-badge { transform: scale(1.15); }

        .cd-panel {
          position: fixed;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08);
          padding: 24px 20px 20px;
          z-index: 6000;
          animation: cdSlide 0.22s cubic-bezier(0.16,1,0.3,1);
          transform-origin: top right;
          box-sizing: border-box;
        }
        @keyframes cdSlide {
          from { opacity: 0; transform: scale(0.94) translateY(-8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .cd-panel::before {
          content: '';
          position: absolute;
          top: -7px; right: 14px;
          width: 14px; height: 14px;
          background: white;
          transform: rotate(45deg);
          border-radius: 2px;
          box-shadow: -2px -2px 5px rgba(0,0,0,0.04);
        }

        .cd-header {
          font-family: 'Sora', sans-serif;
          font-size: 16px; font-weight: 700;
          color: #1a1f3c;
          margin-bottom: 18px;
        }
        .cd-header span {
          color: #6b7280;
          font-weight: 500;
          font-size: 14px;
        }

        .cd-items {
          display: flex; flex-direction: column;
          gap: 0;
          max-height: 280px;
          overflow-y: auto;
        }
        .cd-items::-webkit-scrollbar { width: 4px; }
        .cd-items::-webkit-scrollbar-track { background: #f9f9f9; }
        .cd-items::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }

        .cd-item {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid #f3f4f6;
          position: relative;
          animation: cdItemIn 0.2s ease;
        }
        @keyframes cdItemIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .cd-item:last-child { border-bottom: none; }

        .cd-item-img {
          width: 54px; height: 54px;
          background: #f3f4f6;
          border-radius: 10px;
          display: flex; align-items: center;
          justify-content: center;
          font-size: 26px;
          flex-shrink: 0;
          border: 1px solid #e5e7eb;
        }

        .cd-item-info { flex: 1; min-width: 0; }
        .cd-item-name {
          font-size: 13px; font-weight: 500;
          color: #1a1f3c; line-height: 1.4;
          margin-bottom: 5px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .cd-item-qty-price {
          display: flex; align-items: center; gap: 4px;
          font-size: 13px; color: #6b7280;
        }
        .cd-item-qty { font-weight: 500; }
        .cd-item-price {
          color: #f5a623;
          font-weight: 700;
          font-size: 13px;
        }

        .cd-remove-btn {
          background: none; border: none;
          cursor: pointer;
          color: #9ca3af;
          font-size: 16px;
          padding: 4px;
          border-radius: 4px;
          flex-shrink: 0;
          line-height: 1;
          transition: color 0.15s, background 0.15s;
          display: flex; align-items: center; justify-content: center;
        }
        .cd-remove-btn:hover { color: #e53e3e; background: #fef2f2; }

        .cd-empty {
          text-align: center;
          padding: 32px 0;
          color: #9ca3af;
          font-size: 13px;
        }
        .cd-empty-icon { font-size: 40px; margin-bottom: 10px; }

        .cd-subtotal {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 16px 0 0;
          font-size: 14px;
          color: #6b7280;
          border-top: 1px solid #f3f4f6;
          margin-top: 4px;
        }
        .cd-subtotal-label { font-weight: 500; }
        .cd-subtotal-amount {
          font-family: 'Sora', sans-serif;
          font-size: 15px; font-weight: 700;
          color: #1a1f3c;
        }

        .cd-checkout-btn {
          width: 100%;
          background: #f5a623;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 13px;
          font-size: 14px; font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          display: flex; align-items: center;
          justify-content: center; gap: 8px;
          margin-top: 14px;
          letter-spacing: 0.5px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(245,166,35,0.35);
          text-decoration: none;
          box-sizing: border-box;
        }
        .cd-checkout-btn:hover {
          background: #e0920f;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(245,166,35,0.45);
        }
        .cd-checkout-btn:active { transform: translateY(0); }

        .cd-viewcart-btn {
          width: 100%;
          background: white;
          color: #f5a623;
          border: 1.5px solid #f5a623;
          border-radius: 8px;
          padding: 12px;
          font-size: 14px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          margin-top: 10px;
          letter-spacing: 0.5px;
          transition: background 0.2s;
          text-decoration: none;
          text-align: center;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cd-viewcart-btn:hover { background: #fff8ed; }
      `}</style>

      <button
        ref={btnRef}
        type="button"
        className={`cd-icon-btn ${open ? "active" : ""}`}
        onClick={() => setOpen((o) => !o)}
        title="Shopping Cart"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        🛒
        <span className="cd-badge">{totalCount}</span>
      </button>

      {open && (
        <div className="cd-panel" style={panelStyle} role="dialog" aria-label="Shopping cart">
          <p className="cd-header">
            Shopping Cart <span>({String(totalCount).padStart(2, "0")})</span>
          </p>

          <div className="cd-items">
            {items.length === 0 ? (
              <div className="cd-empty">
                <div className="cd-empty-icon">🛒</div>
                <p>Səbətiniz boşdur</p>
              </div>
            ) : (
              items.map((item) => (
                <div className="cd-item" key={item.id}>
                  <div className="cd-item-img">{item.img}</div>
                  <div className="cd-item-info">
                    <p className="cd-item-name">{item.name}</p>
                    <div className="cd-item-qty-price">
                      <span className="cd-item-qty">{item.qty} x</span>
                      <span className="cd-item-price">${item.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cd-remove-btn"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <>
              <div className="cd-subtotal">
                <span className="cd-subtotal-label">Sub-Total:</span>
                <span className="cd-subtotal-amount">${subtotal.toLocaleString()}.00 USD</span>
              </div>
              <Link to="/checkout" className="cd-checkout-btn" onClick={() => setOpen(false)}>
                CHECKOUT NOW →
              </Link>
              <Link to="/cart" className="cd-viewcart-btn" onClick={() => setOpen(false)}>
                VIEW CART
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
