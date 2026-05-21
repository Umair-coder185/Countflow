"use client";
import ToolsGrid from "@/components/ToolsGrid";
import { WhyChooseUs } from "@/components/choseus";
import dynamic from "next/dynamic";
import SEOWritingTips from "@/components/SEOWritingTips";
import SEOContentBenefits from "@/components/SEOContentBenefits";
import SEOTextFeatures from "@/components/SEOTextFeatures";
import SEOHomeFAQ from "@/components/SEOHomeFAQ";

const Testimonials = dynamic(() => import("@/components/Testimonials").then(mod => mod.default), { ssr: false, loading: () => <div>Loading testimonials…</div> });
const HomeSeo = dynamic(() => import("@/components/HomeSeo").then(mod => mod.default), { ssr: false, loading: () => <div>Loading SEO tips…</div> });

export default function Home() {
  return (
    <main>
      
      <ToolsGrid />
      <WhyChooseUs />
      <Testimonials />
      <HomeSeo />
      <SEOWritingTips />
      <SEOContentBenefits />
    </main>
  );
}