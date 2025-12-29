import PageWrapper from "@/components/PageWrapper";
import ScrollToTop from "@/utils/ScrollToTop";
import { BlogsSection } from "../components/home/BlogSection";
import { FeaturesSection } from "../components/home/FeaturesSection";
import Hero from "../components/home/Hero";
import { HighlightsSection } from "../components/home/HighlightsSection";
import { OffersSection } from "../components/home/OffersSection";
import { ServicesSectionTabs } from "../components/home/ServiceSection";
import StatsSection from "../components/home/StatsSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";

export default function Homepage() {
  return (
    <>
      <PageWrapper>
        <ScrollToTop />
        <Hero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsSection />
          <FeaturesSection />
          <ServicesSectionTabs />
          <HighlightsSection />
          <OffersSection />
          <BlogsSection />
          <TestimonialsSection />
        </div>
      </PageWrapper>
    </>
  );
}
