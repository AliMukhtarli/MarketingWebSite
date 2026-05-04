import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import MarketingFooter from "./MarketingFooter";
import { useCart } from "./CartContext";

export default function CartPage() {
  const { items: lines, loading, refreshCart, setLineQty, removeFromCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(24);

  const linesSubtotal = useMemo(
    () => lines.reduce((sum, row) => sum + row.price * row.qty, 0),
    [lines]
  );

  const shipping = 0;
  const appliedDiscount = Math.min(linesSubtotal, discount);
  const taxable = Math.max(0, linesSubtotal - appliedDiscount);
  const tax = Math.round(taxable * 0.0779 * 100) / 100;
  const orderTotal = taxable + tax + shipping;

  const updateQty = async (productId, delta) => {
    const row = lines.find((r) => r.productId === productId);
    if (!row) return;
    const next = Math.max(1, row.qty + delta);
    try {
      await setLineQty(productId, next);
    } catch {
      /* cart refresh handles errors */
    }
  };

  const removeLine = async (productId) => {
    try {
      await removeFromCart(productId);
    } catch {
      /* ignore */
    }
  };

  const pad2 = (n) => String(n).padStart(2, "0");

  return (
    <div className="sc-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .sc-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'DM Sans', sans-serif;
          background: #f8f8fb;
          color: #1a1f3c;
        }

        .sc-breadcrumb {
          padding: 16px clamp(16px, 3vw, 40px);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #6b7280;
          flex-wrap: wrap;
        }
        .sc-breadcrumb a { color: #6b7280; text-decoration: none; }
        .sc-breadcrumb a:hover { color: #f5a623; }
        .sc-breadcrumb .current { color: #1a1f3c; font-weight: 500; }

        .sc-layout {
          flex: 1;
          padding: 0 clamp(16px, 3vw, 40px) 48px;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
          align-items: start;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .sc-panel {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .sc-panel-title {
          font-family: 'Sora', sans-serif;
          font-size: 18px;
          font-weight: 700;
          padding: 18px 22px;
          border-bottom: 1px solid #e5e7eb;
        }

        .sc-table-wrap { overflow-x: auto; }
        .sc-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 560px;
        }
        .sc-table th {
          text-align: left;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #6b7280;
          padding: 14px 18px;
          background: #fafafa;
          border-bottom: 1px solid #e5e7eb;
        }
        .sc-table th:nth-child(3),
        .sc-table th:nth-child(4) { text-align: center; }
        .sc-table th:last-child { text-align: right; }

        .sc-table td {
          padding: 18px;
          vertical-align: middle;
          border-bottom: 1px solid #f3f4f6;
          font-size: 14px;
        }
        .sc-table tr:last-child td { border-bottom: none; }

        .sc-product {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .sc-remove {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid #e5e7eb;
          background: #fff;
          cursor: pointer;
          color: #9ca3af;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }
        .sc-remove:hover {
          border-color: #e53e3e;
          color: #e53e3e;
          background: #fef2f2;
        }
        .sc-thumb {
          width: 56px;
          height: 56px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          flex-shrink: 0;
          overflow: hidden;
        }
        .sc-thumb img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .sc-name {
          font-size: 13px;
          font-weight: 500;
          line-height: 1.45;
          max-width: 280px;
          overflow-wrap: anywhere;
        }

        .sc-price-cell { white-space: nowrap; }
        .sc-old-price {
          font-size: 13px;
          color: #9ca3af;
          text-decoration: line-through;
          margin-right: 8px;
        }
        .sc-price { font-weight: 600; color: #1a1f3c; }

        .sc-qty {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          overflow: hidden;
        }
        .sc-qty button {
          width: 32px;
          height: 34px;
          border: none;
          background: #fafafa;
          cursor: pointer;
          font-size: 16px;
          color: #374151;
          transition: background 0.15s;
        }
        .sc-qty button:hover { background: #f3f4f6; }
        .sc-qty span {
          min-width: 36px;
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          padding: 0 6px;
        }

        .sc-line-sub { text-align: right; font-weight: 600; }

        .sc-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          padding: 18px 22px;
          border-top: 1px solid #e5e7eb;
          background: #fafafa;
        }
        .sc-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 18px;
          font-size: 13px;
          font-weight: 700;
          font-family: inherit;
          border-radius: 6px;
          border: 1.5px solid #2563eb;
          background: #fff;
          color: #2563eb;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .sc-btn-outline:hover { background: #eff6ff; }

        .sc-sidebar { display: flex; flex-direction: column; gap: 20px; }

        .sc-totals-rows {
          padding: 8px 0 16px;
          border-bottom: 1px solid #f3f4f6;
          margin-bottom: 12px;
        }
        .sc-total-row {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 10px;
        }
        .sc-total-row strong { color: #1a1f3c; font-weight: 600; }
        .sc-grand {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        .sc-checkout {
          width: 100%;
          background: #f5a623;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 14px;
          font-size: 14px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.15s;
          box-shadow: 0 4px 14px rgba(245,166,35,0.35);
          text-decoration: none;
          box-sizing: border-box;
        }
        .sc-checkout:hover { background: #e0920f; transform: translateY(-1px); }

        .sc-coupon-input {
          width: 100%;
          border: 1.5px solid #e5e7eb;
          border-radius: 6px;
          padding: 11px 14px;
          font-size: 14px;
          font-family: inherit;
          margin-bottom: 12px;
          box-sizing: border-box;
        }
        .sc-coupon-input:focus {
          outline: none;
          border-color: #f5a623;
          box-shadow: 0 0 0 3px rgba(245,166,35,0.15);
        }
        .sc-apply {
          width: 100%;
          background: #2563eb;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 12px;
          font-size: 13px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.15s;
        }
        .sc-apply:hover { background: #1d4ed8; }

        .sc-empty {
          padding: 48px 22px;
          text-align: center;
          color: #6b7280;
        }

        @media (max-width: 960px) {
          .sc-layout { grid-template-columns: 1fr; }
        }
      `}</style>

      <SiteHeader />

      <div className="sc-breadcrumb">
        <span aria-hidden>🏠</span>
        <Link to="/">Home</Link>
        <span aria-hidden>›</span>
        <span className="current">Shopping Card</span>
      </div>

      <div className="sc-layout">
        <div className="sc-panel">
          <div className="sc-panel-title">Shopping Card</div>

          {loading ? (
            <div className="sc-empty">
              <p>Loading cart…</p>
            </div>
          ) : lines.length === 0 ? (
            <div className="sc-empty">
              <p>Your cart is empty.</p>
              <Link to="/" className="sc-btn-outline" style={{ marginTop: 16, display: "inline-flex" }}>
                ← RETURN TO SHOP
              </Link>
            </div>
          ) : (
            <>
              <div className="sc-table-wrap">
                <table className="sc-table">
                  <thead>
                    <tr>
                      <th>Products</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Sub-total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lines.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <div className="sc-product">
                            <button
                              type="button"
                              className="sc-remove"
                              onClick={() => removeLine(row.productId)}
                              aria-label="Remove item"
                            >
                              ✕
                            </button>
                            <div className="sc-thumb">
                              {row.image ? <img src={row.image} alt="" /> : row.emoji}
                            </div>
                            <span className="sc-name">{row.name}</span>
                          </div>
                        </td>
                        <td className="sc-price-cell">
                          {row.oldPrice != null && (
                            <span className="sc-old-price">${row.oldPrice}</span>
                          )}
                          <span className="sc-price">${row.price.toLocaleString()}</span>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <div className="sc-qty" style={{ margin: "0 auto" }}>
                            <button type="button" onClick={() => updateQty(row.productId, -1)} aria-label="Decrease">
                              −
                            </button>
                            <span>{pad2(row.qty)}</span>
                            <button type="button" onClick={() => updateQty(row.productId, 1)} aria-label="Increase">
                              +
                            </button>
                          </div>
                        </td>
                        <td className="sc-line-sub">${(row.price * row.qty).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="sc-actions">
                <Link to="/" className="sc-btn-outline">
                  ← RETURN TO SHOP
                </Link>
                <button type="button" className="sc-btn-outline" onClick={() => refreshCart()}>
                  UPDATE CART
                </button>
              </div>
            </>
          )}
        </div>

        <aside className="sc-sidebar">
          <div className="sc-panel">
            <div className="sc-panel-title">Card Totals</div>
            <div style={{ padding: "16px 22px 22px" }}>
              <div className="sc-totals-rows">
                <div className="sc-total-row">
                  <span>Sub-total</span>
                  <strong>${linesSubtotal.toLocaleString()}</strong>
                </div>
                <div className="sc-total-row">
                  <span>Shipping</span>
                  <strong>Free</strong>
                </div>
                <div className="sc-total-row">
                  <span>Discount</span>
                  <strong>${appliedDiscount.toLocaleString()}</strong>
                </div>
                <div className="sc-total-row">
                  <span>Tax</span>
                  <strong>${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                </div>
              </div>
              <div className="sc-grand">
                <span>Total</span>
                <span>
                  ${orderTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                </span>
              </div>
              <Link to="/checkout" state={{ discount: appliedDiscount }} className="sc-checkout">
                PROCEED TO CHECKOUT →
              </Link>
            </div>
          </div>

          <div className="sc-panel">
            <div className="sc-panel-title">Coupon Code</div>
            <div style={{ padding: "16px 22px 22px" }}>
              <input
                className="sc-coupon-input"
                type="text"
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button
                type="button"
                className="sc-apply"
                onClick={() => {
                  if (coupon.trim()) setDiscount(24);
                }}
              >
                APPLY COUPON
              </button>
            </div>
          </div>
        </aside>
      </div>

      <MarketingFooter />
    </div>
  );
}
