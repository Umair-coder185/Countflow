import ToolsGrid from "@/components/ToolsGrid";
import { WhyChooseUs } from "@/components/choseus";
import Testimonials from "@/components/Testimonials";
import HomeSeo from "@/components/HomeSeo";
import SEOWritingTips from "@/components/SEOWritingTips";
import SEOContentBenefits from "@/components/SEOContentBenefits";
import SEOHomeFAQ from "@/components/SEOHomeFAQ";

export const metadata = {
  alternates: { canonical: "https://countflows.com" },
};

export default function Home() {
  return (
    <>
      <ToolsGrid />
      <WhyChooseUs />
      <Testimonials />
      <HomeSeo />
      <SEOWritingTips />
      <SEOContentBenefits />
      <SEOHomeFAQ />
    </>
  );
}