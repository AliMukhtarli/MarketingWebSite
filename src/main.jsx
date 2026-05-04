import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import HomePage from "./HomePage";
import TrackOrderPage from "./TrackOrderPage";
import WishlistPage from "./WishlistPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/track-order" element={<TrackOrderPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);