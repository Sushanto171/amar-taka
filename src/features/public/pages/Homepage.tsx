import PageWrapper from "@/components/PageWrapper";
import ScrollToTop from "@/utils/ScrollToTop";
import AboutSection from "../components/home/AboutHome";
import Blog from "../components/home/Blog";
import CTA from "../components/home/CallToActionSection";
import { FeaturesCarousel } from "../components/home/FeaturesCarousel";
import Hero from "../components/home/Hero";
import Services from "../components/home/Service";
import FaqSection from "../components/home/FaqSection";

export default function Homepage() {
  return (
    <>
      <PageWrapper>
        <ScrollToTop />
        <Hero />
        <div className="container mx-auto space-y-6">
          <FeaturesCarousel />
          <Services />
          <Blog />
          <AboutSection />
          <FaqSection />
          <CTA />
        </div>
      </PageWrapper>
    </>
  );
}
