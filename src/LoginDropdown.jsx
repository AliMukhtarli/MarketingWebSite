import { useEffect, useMemo, useRef, useState } from "react";

export default function LoginDropdown() {
  const [open, setOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ref = useRef(null);
  const btnRef = useRef(null);
  const [panelPos, setPanelPos] = useState({ top: 0, left: 0, width: 320 });

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
      const desiredWidth = 320;
      const width = Math.min(desiredWidth, Math.max(280, window.innerWidth - pad * 2));
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

  return (
    <div className="ld-root" ref={ref}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .ld-root {
          position: relative;
          display: inline-flex;
          align-items: center;
          font-family: 'DM Sans', sans-serif;
        }

        .ld-icon-btn {
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
        .ld-icon-btn:hover { background: #f3f4f6; }
        .ld-icon-btn.active { background: #fff3df; color: #f5a623; }

        .ld-active-dot {
          position: absolute;
          top: 4px; right: 4px;
          width: 8px; height: 8px;
          background: #f5a623;
          border-radius: 50%;
          border: 2px solid white;
        }

        .ld-panel {
          position: fixed;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08);
          padding: 32px 28px 24px;
          z-index: 6000;
          animation: ldSlide 0.22s cubic-bezier(0.16,1,0.3,1);
          transform-origin: top right;
          box-sizing: border-box;
        }
        @keyframes ldSlide {
          from { opacity: 0; transform: scale(0.94) translateY(-8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .ld-panel::before {
          content: '';
          position: absolute;
          top: -7px;
          right: 14px;
          width: 14px; height: 14px;
          background: white;
          transform: rotate(45deg);
          border-radius: 2px;
          box-shadow: -2px -2px 5px rgba(0,0,0,0.04);
        }

        .ld-title {
          font-family: 'Sora', sans-serif;
          font-size: 18px; font-weight: 700;
          color: #1a1f3c;
          text-align: center;
          margin-bottom: 24px;
        }

        .ld-field { margin-bottom: 16px; }
        .ld-label {
          font-size: 13px; font-weight: 500;
          color: #374151; margin-bottom: 6px;
          display: block;
        }
        .ld-input-wrap { position: relative; }
        .ld-input {
          width: 100%;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          padding: 11px 14px;
          font-size: 14px;
          font-family: inherit;
          color: #1a1f3c;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          background: #fafafa;
          box-sizing: border-box;
        }
        .ld-input:focus {
          border-color: #f5a623;
          box-shadow: 0 0 0 3px rgba(245,166,35,0.18);
          background: white;
        }
        .ld-input.has-icon { padding-right: 42px; }

        .ld-eye-btn {
          position: absolute;
          right: 12px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          cursor: pointer; color: #9ca3af;
          font-size: 18px; padding: 0;
          display: flex; align-items: center;
          transition: color 0.15s;
        }
        .ld-eye-btn:hover { color: #f5a623; }

        .ld-pass-label-row {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .ld-forget {
          font-size: 12px; font-weight: 600;
          color: #f5a623; cursor: pointer;
          text-decoration: none;
          transition: color 0.15s;
        }
        .ld-forget:hover { color: #e0920f; }

        .ld-login-btn {
          width: 100%;
          background: #f5a623;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 13px;
          font-size: 15px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          display: flex; align-items: center;
          justify-content: center; gap: 8px;
          margin-top: 20px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 14px rgba(245,166,35,0.35);
        }
        .ld-login-btn:hover {
          background: #e0920f;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(245,166,35,0.45);
        }
        .ld-login-btn:active { transform: translateY(0); }

        .ld-divider {
          text-align: center;
          font-size: 12px;
          color: #9ca3af;
          margin: 16px 0 12px;
        }

        .ld-create-btn {
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
          display: flex; align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s;
          letter-spacing: 0.5px;
        }
        .ld-create-btn:hover { background: #fff8ed; }
      `}</style>

      <button
        ref={btnRef}
        type="button"
        className={`ld-icon-btn ${open ? "active" : ""}`}
        onClick={() => setOpen((o) => !o)}
        title="Sign in"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        👤
        {open && <span className="ld-active-dot" aria-hidden />}
      </button>

      {open && (
        <div className="ld-panel" style={panelStyle} role="dialog" aria-label="Sign in">
          <h2 className="ld-title">Sign in to your account</h2>

          <div className="ld-field">
            <label className="ld-label" htmlFor="ld-email">Email Address</label>
            <div className="ld-input-wrap">
              <input
                id="ld-email"
                className="ld-input"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="ld-field">
            <div className="ld-pass-label-row">
              <label className="ld-label" htmlFor="ld-password" style={{ margin: 0 }}>
                Password
              </label>
              <a className="ld-forget" href="#" onClick={(e) => e.preventDefault()}>
                Forget Password
              </a>
            </div>
            <div className="ld-input-wrap">
              <input
                id="ld-password"
                className="ld-input has-icon"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="ld-eye-btn"
                onClick={() => setShowPass((s) => !s)}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <button type="button" className="ld-login-btn">
            LOGIN →
          </button>

          <div className="ld-divider">Don&apos;t have account</div>

          <button type="button" className="ld-create-btn">
            CREATE ACCOUNT
          </button>
        </div>
      )}
    </div>
  );
}
