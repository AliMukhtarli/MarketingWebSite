import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import MarketingFooter from "./MarketingFooter";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import { apiFetch } from "./apiClient";

export default function WishlistPage() {
  const { user, loading: authLoading } = useAuth();
  const { addToCart } = useCart();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState({});
  const [error, setError] = useState(null);

  const loadWishlist = useCallback(async () => {
    setError(null);
    try {
      const data = await apiFetch("/api/wishlist");
      setItems(data.items || []);
    } catch (e) {
      setError(e.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      setItems([]);
      return;
    }
    setLoading(true);
    loadWishlist();
  }, [authLoading, user, loadWishlist]);

  const removeItem = async (productId) => {
    try {
      await apiFetch(`/api/wishlist/${productId}`, { method: "DELETE" });
      setItems((prev) => prev.filter((i) => i.productId !== productId));
      setAdded((prev) => {
        const next = { ...prev };
        delete next[productId];
        return next;
      });
    } catch {}
  };

  const handleAddToCart = async (productId, inStock) => {
    if (!inStock) return;
    try {
      await addToCart(productId, 1);
      setAdded((prev) => ({ ...prev, [productId]: true }));
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="wl-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .wl-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'DM Sans', sans-serif;
          background: #f8f8fb;
          color: #1a1f3c;
        }

        :root {
          --wl-accent: #f5a623;
          --wl-navy: #1a1f3c;
          --wl-muted: #6b7280;
          --wl-border: #e5e7eb;
          --wl-white: #ffffff;
          --wl-green: #16a34a;
          --wl-red: #e53e3e;
        }

        .wl-breadcrumb {
          padding: 16px clamp(16px, 3vw, 40px);
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--wl-muted);
        }
        .wl-breadcrumb a {
          color: var(--wl-muted);
          text-decoration: none;
          cursor: pointer;
        }
        .wl-breadcrumb a:hover { color: var(--wl-accent); }
        .wl-breadcrumb .sep { color: var(--wl-muted); }
        .wl-breadcrumb .current { color: var(--wl-accent); font-weight: 500; }

        .wl-main {
          flex: 1;
          padding: 0 clamp(16px, 3vw, 40px) 48px;
        }
        .wl-card {
          background: var(--wl-white);
          border-radius: 12px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          overflow: hidden;
        }
        .wl-card-title {
          font-family: 'Sora', sans-serif;
          font-size: 18px;
          font-weight: 700;
          padding: 20px 24px 16px;
          border-bottom: 1px solid var(--wl-border);
        }

        .wl-table { width: 100%; border-collapse: collapse; }
        .wl-thead th {
          text-align: left;
          font-size: 11px;
          font-weight: 700;
          color: var(--wl-muted);
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 14px 24px;
          border-bottom: 1px solid var(--wl-border);
          background: #fafafa;
        }
        .wl-thead th:last-child { text-align: center; width: 48px; }

        .wl-row {
          border-bottom: 1px solid var(--wl-border);
          transition: background 0.15s;
          animation: wlRowIn 0.25s ease both;
        }
        @keyframes wlRowIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .wl-row:last-child { border-bottom: none; }
        .wl-row:hover { background: #fff8ed; }

        .wl-row td { padding: 18px 24px; vertical-align: middle; }

        .wl-product-cell {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .wl-product-img {
          width: 60px; height: 60px;
          background: #f3f4f6;
          border-radius: 10px;
          border: 1px solid var(--wl-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          flex-shrink: 0;
        }
        .wl-product-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--wl-navy);
          line-height: 1.45;
          max-width: min(300px, 45vw);
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        .wl-product-name:hover { color: var(--wl-accent); cursor: pointer; }

        .wl-price-cell { white-space: nowrap; }
        .wl-old-price {
          font-size: 12px;
          color: #9ca3af;
          text-decoration: line-through;
          margin-right: 6px;
        }
        .wl-price { font-size: 14px; font-weight: 700; color: var(--wl-navy); }

        .wl-stock-in { font-size: 13px; font-weight: 600; color: var(--wl-green); }
        .wl-stock-out { font-size: 13px; font-weight: 600; color: var(--wl-red); }

        .wl-actions-cell { display: flex; align-items: center; gap: 10px; }
        .wl-add-btn {
          background: var(--wl-accent);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .wl-add-btn:hover { background: #e0920f; transform: translateY(-1px); }
        .wl-add-btn:active { transform: translateY(0); }
        .wl-add-btn.disabled {
          background: #d1d5db;
          cursor: not-allowed;
          transform: none !important;
        }
        .wl-add-btn.success { background: var(--wl-green); }

        .wl-remove-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1.5px solid var(--wl-border);
          background: white;
          cursor: pointer;
          font-size: 14px;
          color: var(--wl-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
          flex-shrink: 0;
        }
        .wl-remove-btn:hover {
          border-color: var(--wl-red);
          color: var(--wl-red);
          background: #fef2f2;
        }

        .wl-empty {
          text-align: center;
          padding: 64px 24px;
          color: var(--wl-muted);
        }
        .wl-empty-icon { font-size: 56px; margin-bottom: 14px; }
        .wl-empty h3 {
          font-family: 'Sora', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--wl-navy);
          margin-bottom: 6px;
        }
        .wl-empty p { font-size: 13px; margin-bottom: 20px; }
        .wl-empty-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--wl-accent);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 28px;
          font-size: 14px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          text-decoration: none;
        }
        .wl-empty-btn:hover { background: #e0920f; }

        @media (max-width: 900px) {
          .wl-product-name { max-width: none; }
        }
        @media (max-width: 600px) {
          .wl-table thead { display: none; }
          .wl-row td { display: block; padding: 8px 16px; }
          .wl-actions-cell { flex-wrap: wrap; }
        }
      `}</style>

      <SiteHeader />

      <div className="wl-breadcrumb">
        <span aria-hidden>🏠</span>
        <Link to="/">Home</Link>
        <span className="sep">›</span>
        <span className="current">Wishlist</span>
      </div>

      <main className="wl-main">
        <div className="wl-card">
          <div className="wl-card-title">Wishlist</div>

          {!user && !authLoading ? (
            <div className="wl-empty">
              <div className="wl-empty-icon">🤍</div>
              <h3>Sign in to view your wishlist</h3>
              <p>Use the account menu in the header to sign in or create an account.</p>
              <Link to="/" className="wl-empty-btn">
                Continue Shopping →
              </Link>
            </div>
          ) : loading ? (
            <div className="wl-empty">
              <p>Loading…</p>
            </div>
          ) : error ? (
            <div className="wl-empty">
              <p style={{ color: "#e53e3e" }}>{error}</p>
            </div>
          ) : items.length === 0 ? (
            <div className="wl-empty">
              <div className="wl-empty-icon">🤍</div>
              <h3>Your wishlist is empty</h3>
              <p>Save items you love and find them here anytime.</p>
              <Link to="/" className="wl-empty-btn">
                Continue Shopping →
              </Link>
            </div>
          ) : (
            <table className="wl-table">
              <thead className="wl-thead">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Stock Status</th>
                  <th>Actions</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr
                    className="wl-row"
                    key={item.productId}
                    style={{ animationDelay: `${idx * 0.06}s` }}
                  >
                    <td>
                      <div className="wl-product-cell">
                        <div className="wl-product-img">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt=""
                              style={{ width: 48, height: 48, objectFit: "contain", display: "block" }}
                            />
                          ) : (
                            item.img
                          )}
                        </div>
                        <p className="wl-product-name">{item.name}</p>
                      </div>
                    </td>
                    <td className="wl-price-cell">
                      {item.oldPrice != null && (
                        <span className="wl-old-price">${item.oldPrice.toLocaleString()}</span>
                      )}
                      <span className="wl-price">${item.price.toLocaleString()}</span>
                    </td>
                    <td>
                      {item.inStock ? (
                        <span className="wl-stock-in">IN STOCK</span>
                      ) : (
                        <span className="wl-stock-out">OUT OF STOCK</span>
                      )}
                    </td>
                    <td>
                      <div className="wl-actions-cell">
                        <button
                          type="button"
                          className={`wl-add-btn ${!item.inStock ? "disabled" : ""} ${added[item.productId] ? "success" : ""}`}
                          onClick={() => item.inStock && handleAddToCart(item.productId, item.inStock)}
                          disabled={!item.inStock}
                        >
                          {added[item.productId] ? "✓ ADDED" : "ADD TO CARD"} 🛒
                        </button>
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        type="button"
                        className="wl-remove-btn"
                        onClick={() => removeItem(item.productId)}
                        title="Remove"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
