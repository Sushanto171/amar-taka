import Blog from "../components/home/Blog";
import FeaturesSection from "../components/home/FeaturesSection";
import Hero from "../components/home/Hero";

export default function Homepage() {
  return (
    <>
      <Hero />
      <div className="container mx-auto">
        <FeaturesSection />
        <Blog />
      </div>
    </>
  );
}
