import Blog from "../components/home/Blog";
import { FeaturesCarousel } from "../components/home/FeaturesCarousel";
import Hero from "../components/home/Hero";

export default function Homepage() {
  return (
    <>
      <Hero />
      <div className="container mx-auto">
        <FeaturesCarousel />

        <Blog />
      </div>
    </>
  );
}
