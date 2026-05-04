import { Link, useLocation } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import MarketingFooter from "./MarketingFooter";

export default function OrderSuccessPage() {
  const { state } = useLocation();
  const orderNumber = state?.orderNumber;
  return (
    <div className="os-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .os-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          color: #1a1f3c;
        }

        .os-breadcrumb {
          padding: 16px clamp(16px, 3vw, 40px);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #6b7280;
          flex-wrap: wrap;
        }
        .os-breadcrumb a {
          color: #6b7280;
          text-decoration: none;
        }
        .os-breadcrumb a:hover { color: #f5a623; }
        .os-breadcrumb .os-crumb-checkout {
          color: #3b82f6;
          font-weight: 500;
        }

        .os-center-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px clamp(16px, 4vw, 40px) 56px;
          text-align: center;
        }

        .os-check-wrap {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: linear-gradient(145deg, #22c55e, #16a34a);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 28px;
          box-shadow: 0 12px 40px rgba(22, 163, 74, 0.35);
        }
        .os-check {
          font-size: 48px;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }

        .os-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(22px, 4vw, 28px);
          font-weight: 700;
          color: #111827;
          margin-bottom: 14px;
          max-width: 520px;
        }

        .os-desc {
          font-size: 15px;
          line-height: 1.65;
          color: #6b7280;
          max-width: 520px;
          margin: 0 auto 36px;
        }

        .os-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
          align-items: center;
        }

        .os-btn-dash {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 22px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          font-family: inherit;
          border-radius: 8px;
          border: 2px solid #f5a623;
          background: #fff;
          color: #f5a623;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .os-btn-dash:hover {
          background: #fff8ed;
          color: #e0920f;
          border-color: #e0920f;
        }

        .os-hex-stack {
          display: inline-flex;
          flex-direction: column;
          gap: 2px;
          font-size: 10px;
          line-height: 1;
        }

        .os-btn-view {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 22px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          font-family: inherit;
          border-radius: 8px;
          border: none;
          background: #f5a623;
          color: #fff;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          box-shadow: 0 4px 14px rgba(245, 166, 35, 0.4);
        }
        .os-btn-view:hover {
          background: #e0920f;
          transform: translateY(-1px);
        }
      `}</style>

      <SiteHeader />

      <div className="os-breadcrumb">
        <span aria-hidden>🏠</span>
        <Link to="/">Home</Link>
        <span aria-hidden>›</span>
        <Link to="/cart">Shopping Card</Link>
        <span aria-hidden>›</span>
        <span className="os-crumb-checkout">Checkout</span>
      </div>

      <main className="os-center-wrap">
        <div className="os-check-wrap" aria-hidden>
          <span className="os-check">✓</span>
        </div>

        <h1 className="os-title">Your order was successfully placed</h1>

        {orderNumber && (
          <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1f3c", marginBottom: 12 }}>
            Order number: <span style={{ color: "#f5a623" }}>{orderNumber}</span>
          </p>
        )}

        <p className="os-desc">
          Pellentesque sed lectus nec tortor tristique accumsan quis dictum risus. Donec volutpat mollis nulla non
          facilisis.
        </p>

        <div className="os-actions">
          <Link to="/" className="os-btn-dash">
            <span className="os-hex-stack" aria-hidden>
              <span style={{ color: "#f5a623" }}>⬡</span>
              <span style={{ color: "#f5a623", opacity: 0.85 }}>⬡</span>
              <span style={{ color: "#f5a623", opacity: 0.65 }}>⬡</span>
            </span>
            GO TO DASHBOARD
          </Link>
          <Link to="/track-order" className="os-btn-view">
            VIEW ORDER →
          </Link>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
