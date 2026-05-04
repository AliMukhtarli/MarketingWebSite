const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

function resolveUrl(path) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}

export async function apiFetch(path, options = {}) {
  const url = resolveUrl(path);
  const headers = { ...options.headers };
  if (options.body && typeof options.body === "object" && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(options.body);
  }
  const res = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    let msg = data?.error;
    if (!msg) {
      if (res.status === 404) {
        msg =
          "Shop API not found (404). Another app may be using port 3001 with an old server: close all terminal windows running Node, end any `node` process on port 3001, then run npm run dev again. Or run: npx kill-port 3001 (if installed) then npm run dev.";
      } else if (res.status === 502 || res.status === 503) {
        msg =
          "Cannot reach the shop API on port 3001. Run npm run server in another terminal, or use npm run dev:all.";
      } else {
        msg = res.statusText || "Request failed";
      }
    }
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}
