import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "./apiClient";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshCart = useCallback(async () => {
    setError(null);
    try {
      const data = await apiFetch("/api/cart");
      setItems(data.items || []);
      setSubtotal(data.subtotal ?? 0);
    } catch (e) {
      setError(e.message);
      setItems([]);
      setSubtotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    refreshCart();
  }, [user?.id, refreshCart]);

  const addToCart = useCallback(
    async (productId, qty = 1) => {
      await apiFetch("/api/cart/items", { method: "POST", body: { productId, qty } });
      await refreshCart();
    },
    [refreshCart]
  );

  const setLineQty = useCallback(
    async (productId, qty) => {
      await apiFetch(`/api/cart/items/${productId}`, { method: "PATCH", body: { qty } });
      await refreshCart();
    },
    [refreshCart]
  );

  const removeFromCart = useCallback(
    async (productId) => {
      await apiFetch(`/api/cart/items/${productId}`, { method: "DELETE" });
      await refreshCart();
    },
    [refreshCart]
  );

  const lineCount = items.length;

  const value = useMemo(
    () => ({
      items,
      subtotal,
      loading,
      error,
      lineCount,
      refreshCart,
      addToCart,
      setLineQty,
      removeFromCart,
    }),
    [items, subtotal, loading, error, lineCount, refreshCart, addToCart, setLineQty, removeFromCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
