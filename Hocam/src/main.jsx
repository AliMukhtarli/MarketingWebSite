import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import  MarketingHome from "./MarketingHome"
import MarketingSection2 from "./MarketingSection2";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
  <MarketingHome />
  <MarketingSection2 />
  </div>
);