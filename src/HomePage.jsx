import MarketingFooter from "./MarketingFooter";
import MarketingHome from "./MarketingHome";
import MarketingSection2 from "./MarketingSection2";
import MarketingSection3 from "./MarketingSection3";
import SiteHeader from "./SiteHeader";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <MarketingHome hideHeader />
      <MarketingSection2 />
      <MarketingSection3 />
      <MarketingFooter />
    </>
  );
}
