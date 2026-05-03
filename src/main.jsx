import ReactDOM from "react-dom/client";
import React from "react";
import MarketingHome from "./MarketingHome";
import MarketingSection2 from "./MarketingSection2";
import MarketingSection3 from "./MarketingSection3";
import MarketingFooter from "./MarketingFooter";
import SiteHeader from "./SiteHeader";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
    <SiteHeader />
    <MarketingHome hideHeader />
    <MarketingSection2 />
    <MarketingSection3 />
    <MarketingFooter />
  </div>
);