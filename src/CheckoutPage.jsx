import { useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import MarketingFooter from "./MarketingFooter";

const orderLines = [
  { id: 1, name: "Canon EOS 1500D DSLR Camera Body+ 18-55 mm", qty: 1, unit: 70, img: "📷" },
  { id: 2, name: "Wired Over-Ear Gaming Headphones with USB", qty: 3, unit: 250, img: "🎧" },
];

const SUBTOTAL = orderLines.reduce((s, l) => s + l.qty * l.unit, 0);
const DISCOUNT = 24;
const SHIPPING = 0;
const TAX = 61.99;
const TOTAL = SUBTOTAL - DISCOUNT + TAX + SHIPPING;

const PAYMENT_METHODS = [
  { id: "cod", label: "Cash on Delivery" },
  { id: "venmo", label: "Venmo" },
  { id: "paypal", label: "Paypal" },
  { id: "amazon", label: "Amazon Pay" },
  { id: "card", label: "Debit/Credit Card" },
];

export default function CheckoutPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shipDifferent, setShipDifferent] = useState(false);
  const [payment, setPayment] = useState("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="co-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .co-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: 'DM Sans', sans-serif;
          background: #f8f8fb;
          color: #1a1f3c;
        }

        .co-breadcrumb {
          padding: 16px clamp(16px, 3vw, 40px);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #6b7280;
          flex-wrap: wrap;
        }
        .co-breadcrumb a { color: #6b7280; text-decoration: none; }
        .co-breadcrumb a:hover { color: #f5a623; }
        .co-breadcrumb .current { color: #1a1f3c; font-weight: 500; }

        .co-layout {
          flex: 1;
          padding: 0 clamp(16px, 3vw, 40px) 48px;
          display: grid;
          grid-template-columns: 1fr min(380px, 100%);
          gap: 28px;
          align-items: start;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .co-main-col { display: flex; flex-direction: column; gap: 24px; min-width: 0; }

        .co-panel {
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 22px 24px 26px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .co-section-title {
          font-family: 'Sora', sans-serif;
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 18px;
          color: #1a1f3c;
        }

        .co-row2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .co-row4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        @media (max-width: 900px) {
          .co-row4 { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 520px) {
          .co-row2 { grid-template-columns: 1fr; }
          .co-row4 { grid-template-columns: 1fr; }
        }

        .co-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 6px;
        }
        .co-input, .co-select, .co-textarea {
          width: 100%;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          padding: 11px 14px;
          font-size: 14px;
          font-family: inherit;
          color: #1a1f3c;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
          background: #fff;
        }
        .co-input:focus, .co-select:focus, .co-textarea:focus {
          border-color: #f5a623;
          box-shadow: 0 0 0 3px rgba(245,166,35,0.12);
        }
        .co-field { margin-bottom: 16px; }
        .co-checkbox-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 8px;
          font-size: 14px;
          color: #374151;
          cursor: pointer;
        }
        .co-checkbox-row input { width: 18px; height: 18px; accent-color: #f5a623; cursor: pointer; }

        .co-pay-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 18px;
        }
        .co-pay-opt {
          flex: 1;
          min-width: 120px;
          padding: 12px 10px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          background: #fafafa;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          text-align: center;
          color: #374151;
          transition: border-color 0.2s, background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .co-pay-opt:hover { border-color: #f5a623; }
        .co-pay-opt.selected {
          border-color: #f5a623;
          background: #fff8ed;
          color: #1a1f3c;
        }
        .co-pay-opt input {
          accent-color: #f5a623;
          width: 16px;
          height: 16px;
        }

        .co-textarea { min-height: 100px; resize: vertical; }

        .co-sidebar .co-panel { position: sticky; top: 100px; }

        .co-sum-title {
          font-family: 'Sora', sans-serif;
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f3f4f6;
        }
        .co-sum-item {
          display: flex;
          gap: 12px;
          margin-bottom: 14px;
          align-items: flex-start;
        }
        .co-sum-thumb {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .co-sum-info { flex: 1; min-width: 0; }
        .co-sum-name {
          font-size: 12px;
          font-weight: 500;
          line-height: 1.4;
          color: #1a1f3c;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .co-sum-price { font-size: 12px; color: #6b7280; margin-top: 4px; }

        .co-sum-rows { margin: 18px 0; padding-top: 12px; border-top: 1px solid #f3f4f6; }
        .co-sum-row {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 10px;
        }
        .co-sum-row strong { color: #1a1f3c; font-weight: 600; }
        .co-sum-total {
          display: flex;
          justify-content: space-between;
          font-family: 'Sora', sans-serif;
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 18px;
        }
        .co-place-order {
          width: 100%;
          background: #f5a623;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 15px;
          font-size: 15px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.15s;
          box-shadow: 0 4px 14px rgba(245,166,35,0.35);
        }
        .co-place-order:hover { background: #e0920f; transform: translateY(-1px); }

        @media (max-width: 960px) {
          .co-layout { grid-template-columns: 1fr; }
          .co-sidebar .co-panel { position: static; }
        }
      `}</style>

      <SiteHeader />

      <div className="co-breadcrumb">
        <span aria-hidden>🏠</span>
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/cart">Shopping Card</Link>
        <span>›</span>
        <span className="current">Checkout</span>
      </div>

      <div className="co-layout">
        <div className="co-main-col">
          <section className="co-panel">
            <h2 className="co-section-title">Billing Information</h2>

            <div className="co-row2">
              <div className="co-field">
                <label className="co-label" htmlFor="co-fn">First name</label>
                <input id="co-fn" className="co-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" />
              </div>
              <div className="co-field">
                <label className="co-label" htmlFor="co-ln">Last name</label>
                <input id="co-ln" className="co-input" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" />
              </div>
            </div>

            <div className="co-field">
              <label className="co-label" htmlFor="co-co">Company Name (Optional)</label>
              <input id="co-co" className="co-input" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>

            <div className="co-field">
              <label className="co-label" htmlFor="co-addr">Address</label>
              <input id="co-addr" className="co-input" value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" />
            </div>

            <div className="co-row4">
              <div className="co-field">
                <label className="co-label" htmlFor="co-country">Country</label>
                <select id="co-country" className="co-select" value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="">Select</option>
                  <option value="us">United States</option>
                  <option value="az">Azerbaijan</option>
                  <option value="uk">United Kingdom</option>
                </select>
              </div>
              <div className="co-field">
                <label className="co-label" htmlFor="co-region">Region/State</label>
                <select id="co-region" className="co-select" value={region} onChange={(e) => setRegion(e.target.value)}>
                  <option value="">Select</option>
                  <option value="ca">California</option>
                  <option value="ny">New York</option>
                </select>
              </div>
              <div className="co-field">
                <label className="co-label" htmlFor="co-city">City</label>
                <select id="co-city" className="co-select" value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">Select</option>
                  <option value="la">Los Angeles</option>
                  <option value="sf">San Francisco</option>
                </select>
              </div>
              <div className="co-field">
                <label className="co-label" htmlFor="co-zip">Zip Code</label>
                <input id="co-zip" className="co-input" value={zip} onChange={(e) => setZip(e.target.value)} autoComplete="postal-code" />
              </div>
            </div>

            <div className="co-row2">
              <div className="co-field">
                <label className="co-label" htmlFor="co-email">Email</label>
                <input id="co-email" type="email" className="co-input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </div>
              <div className="co-field">
                <label className="co-label" htmlFor="co-phone">Phone Number</label>
                <input id="co-phone" type="tel" className="co-input" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
              </div>
            </div>

            <label className="co-checkbox-row">
              <input type="checkbox" checked={shipDifferent} onChange={(e) => setShipDifferent(e.target.checked)} />
              Ship into different address
            </label>
          </section>

          <section className="co-panel">
            <h2 className="co-section-title">Payment Option</h2>
            <div className="co-pay-grid">
              {PAYMENT_METHODS.map((m) => (
                <label key={m.id} className={`co-pay-opt ${payment === m.id ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === m.id}
                    onChange={() => setPayment(m.id)}
                  />
                  {m.label}
                </label>
              ))}
            </div>

            {payment === "card" && (
              <>
                <div className="co-field">
                  <label className="co-label" htmlFor="co-card-name">Name on Card</label>
                  <input id="co-card-name" className="co-input" value={cardName} onChange={(e) => setCardName(e.target.value)} autoComplete="cc-name" />
                </div>
                <div className="co-field">
                  <label className="co-label" htmlFor="co-card-num">Card Number</label>
                  <input id="co-card-num" className="co-input" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} autoComplete="cc-number" inputMode="numeric" />
                </div>
                <div className="co-row2">
                  <div className="co-field">
                    <label className="co-label" htmlFor="co-exp">Expiry Date</label>
                    <input id="co-exp" className="co-input" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} autoComplete="cc-exp" />
                  </div>
                  <div className="co-field">
                    <label className="co-label" htmlFor="co-cvc">CVC</label>
                    <input id="co-cvc" className="co-input" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} autoComplete="cc-csc" inputMode="numeric" />
                  </div>
                </div>
              </>
            )}
          </section>

          <section className="co-panel">
            <h2 className="co-section-title">Additional Information</h2>
            <div className="co-field">
              <label className="co-label" htmlFor="co-notes">Order Notes (Optional)</label>
              <textarea
                id="co-notes"
                className="co-textarea"
                placeholder="Notes about your order, e.g. special notes for delivery."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </section>
        </div>

        <aside className="co-sidebar">
          <div className="co-panel">
            <h2 className="co-sum-title">Order Summary</h2>

            {orderLines.map((line) => (
              <div className="co-sum-item" key={line.id}>
                <div className="co-sum-thumb">{line.img}</div>
                <div className="co-sum-info">
                  <p className="co-sum-name">{line.name}</p>
                  <p className="co-sum-price">
                    {line.qty} × ${line.unit.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

            <div className="co-sum-rows">
              <div className="co-sum-row">
                <span>Sub-total</span>
                <strong>${SUBTOTAL.toLocaleString()}</strong>
              </div>
              <div className="co-sum-row">
                <span>Shipping</span>
                <strong>Free</strong>
              </div>
              <div className="co-sum-row">
                <span>Discount</span>
                <strong>${DISCOUNT.toLocaleString()}</strong>
              </div>
              <div className="co-sum-row">
                <span>Tax</span>
                <strong>${TAX.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
              </div>
            </div>

            <div className="co-sum-total">
              <span>Total</span>
              <span>${TOTAL.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD</span>
            </div>

            <button type="button" className="co-place-order">
              PLACE ORDER →
            </button>
          </div>
        </aside>
      </div>

      <MarketingFooter />
    </div>
  );
}
