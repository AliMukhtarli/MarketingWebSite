import { useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import MarketingFooter from "./MarketingFooter";
import { apiFetch } from "./apiClient";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [tracking, setTracking] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!orderId.trim() || !email.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    setTracking(null);
    setLoading(true);
    try {
      const q = new URLSearchParams({
        orderNumber: orderId.trim(),
        email: email.trim(),
      });
      const data = await apiFetch(`/api/orders/track?${q.toString()}`);
      setTracking(data.tracking);
    } catch (e) {
      setError(e.message || "Could not find that order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="to-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .to-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'DM Sans', sans-serif;
          background: #f8f8fb;
          color: #1a1f3c;
        }

        :root {
          --to-accent: #f5a623;
          --to-navy: #1a1f3c;
          --to-muted: #6b7280;
          --to-border: #e5e7eb;
          --to-white: #ffffff;
        }

        .to-breadcrumb {
          padding: 16px clamp(16px, 3vw, 40px);
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--to-muted);
          flex-wrap: wrap;
        }
        .to-breadcrumb a {
          color: var(--to-muted);
          text-decoration: none;
        }
        .to-breadcrumb a:hover { color: var(--to-accent); }
        .to-breadcrumb .current { color: var(--to-accent); font-weight: 500; }

        .to-main { flex: 1; padding: 0 clamp(16px, 3vw, 40px) 56px; }

        .to-title {
          font-family: 'Sora', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--to-navy);
          margin-bottom: 10px;
        }
        .to-desc {
          font-size: 14px;
          color: var(--to-muted);
          line-height: 1.65;
          max-width: 580px;
          margin-bottom: 32px;
        }

        .to-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          max-width: 600px;
          margin-bottom: 12px;
        }
        .to-field label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--to-navy);
          margin-bottom: 7px;
        }
        .to-input {
          width: 100%;
          border: 1.5px solid var(--to-border);
          border-radius: 6px;
          padding: 11px 14px;
          font-size: 14px;
          font-family: inherit;
          color: var(--to-navy);
          outline: none;
          background: white;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .to-input:focus {
          border-color: var(--to-accent);
          box-shadow: 0 0 0 3px rgba(245, 166, 35, 0.18);
        }
        .to-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--to-muted);
          margin-bottom: 24px;
        }
        .to-hint-icon { font-size: 14px; }
        .to-error { font-size: 13px; color: #e53e3e; margin-bottom: 14px; font-weight: 500; }

        .to-track-btn {
          background: var(--to-accent);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 14px 32px;
          font-size: 15px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(245, 166, 35, 0.35);
        }
        .to-track-btn:hover {
          background: #e0920f;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(245, 166, 35, 0.45);
        }
        .to-track-btn:active { transform: translateY(0); }
        .to-track-btn:disabled {
          background: #d1d5db;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        .to-spinner {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 3px solid rgba(255, 255, 255, 0.4);
          border-top-color: white;
          border-radius: 50%;
          animation: toSpin 0.7s linear infinite;
        }
        @keyframes toSpin {
          to { transform: rotate(360deg); }
        }

        .to-result {
          margin-top: 36px;
          max-width: 640px;
          animation: toFadeIn 0.35s ease;
        }
        @keyframes toFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .to-result-card {
          background: white;
          border-radius: 14px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.09);
          padding: 28px 28px 24px;
          margin-bottom: 20px;
        }
        .to-result-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .to-result-id {
          font-family: 'Sora', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--to-navy);
        }
        .to-result-id span { color: var(--to-muted); font-size: 13px; font-weight: 400; }
        .to-status-badge {
          background: #fef9ec;
          color: var(--to-accent);
          border: 1.5px solid var(--to-accent);
          border-radius: 20px;
          padding: 5px 16px;
          font-size: 13px;
          font-weight: 700;
        }
        .to-result-meta {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .to-meta-item { font-size: 13px; color: var(--to-muted); }
        .to-meta-item strong {
          color: var(--to-navy);
          font-weight: 600;
          display: block;
          margin-bottom: 2px;
        }

        .to-steps {
          display: flex;
          align-items: flex-start;
          gap: 0;
          position: relative;
        }
        .to-step {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .to-step-line {
          position: absolute;
          top: 14px;
          left: 50%;
          right: -50%;
          height: 3px;
          background: var(--to-border);
          z-index: 0;
        }
        .to-step:last-child .to-step-line { display: none; }
        .to-step-line.done { background: var(--to-accent); }
        .to-step-circle {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid var(--to-border);
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          color: var(--to-muted);
          position: relative;
          z-index: 1;
          transition: all 0.3s;
        }
        .to-step-circle.done {
          border-color: var(--to-accent);
          background: var(--to-accent);
          color: white;
        }
        .to-step-circle.current {
          border-color: var(--to-accent);
          background: var(--to-accent);
          color: white;
          box-shadow: 0 0 0 4px rgba(245, 166, 35, 0.25);
        }
        .to-step-label {
          font-size: 11px;
          font-weight: 600;
          text-align: center;
          color: var(--to-muted);
          margin-top: 8px;
          line-height: 1.3;
        }
        .to-step-label.done { color: var(--to-accent); }
        .to-step-label.current { color: var(--to-accent); font-weight: 700; }
        .to-step-date {
          font-size: 10px;
          color: #9ca3af;
          text-align: center;
          margin-top: 3px;
        }

        @media (max-width: 768px) {
          .to-form-row { grid-template-columns: 1fr; }
          .to-steps {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .to-step {
            flex-direction: row;
            align-items: center;
            gap: 14px;
            width: 100%;
          }
          .to-step-line { display: none; }
        }
      `}</style>

      <SiteHeader />

      <div className="to-breadcrumb">
        <span aria-hidden>🏠</span>
        <Link to="/">Home</Link>
        <span>›</span>
        <span>Pages</span>
        <span>›</span>
        <span className="current">Track Order</span>
      </div>

      <main className="to-main">
        <h1 className="to-title">Track Order</h1>
        <p className="to-desc">
          To track your order please enter your order ID in the input field below and press the &quot;Track Order&quot;
          button. This was given to you on your receipt and in the confirmation email you should have received.
        </p>

        <div className="to-form-row">
          <div className="to-field">
            <label htmlFor="to-order-id">Order ID</label>
            <input
              id="to-order-id"
              className="to-input"
              placeholder="ID..."
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="to-field">
            <label htmlFor="to-email">Billing Email</label>
            <input
              id="to-email"
              className="to-input"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="to-hint">
          <span className="to-hint-icon" aria-hidden>
            ℹ️
          </span>
          Order ID that we sent to you in your email address.
        </div>

        {error && <p className="to-error">⚠ {error}</p>}

        <button type="button" className="to-track-btn" onClick={handleTrack} disabled={loading}>
          {loading ? (
            <>
              <span className="to-spinner" aria-hidden />
              Tracking...
            </>
          ) : (
            <>TRACK ORDER →</>
          )}
        </button>

        {tracking && (
          <div className="to-result">
            <div className="to-result-card">
              <div className="to-result-header">
                <div className="to-result-id">
                  Order <span>#{tracking.id}</span>
                </div>
                <div className="to-status-badge">🚚 {tracking.status}</div>
              </div>

              <div className="to-result-meta">
                <div className="to-meta-item">
                  <strong>Order Date</strong>
                  {tracking.date}
                </div>
                <div className="to-meta-item">
                  <strong>Email</strong>
                  {tracking.email}
                </div>
                <div className="to-meta-item">
                  <strong>Estimated Delivery</strong>
                  {tracking.eta}
                </div>
              </div>

              <div className="to-steps">
                {tracking.steps.map((step, i) => {
                  const isLast = tracking.steps.slice(i + 1).every((s) => !s.done);
                  const isCurrent = step.done && isLast;
                  const nextDone = tracking.steps[i + 1]?.done;
                  return (
                    <div className="to-step" key={step.label}>
                      <div className={`to-step-line ${nextDone ? "done" : ""}`} />
                      <div
                        className={`to-step-circle ${isCurrent ? "current" : step.done ? "done" : ""}`}
                      >
                        {step.done ? "✓" : i + 1}
                      </div>
                      <div
                        className={`to-step-label ${isCurrent ? "current" : step.done ? "done" : ""}`}
                      >
                        {step.label}
                      </div>
                      <div className="to-step-date">{step.date}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      <MarketingFooter />
    </div>
  );
}
