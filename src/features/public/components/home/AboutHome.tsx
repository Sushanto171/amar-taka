import bg from "@/assets/images/home_bg.jpg";
import { Link } from "react-router";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="container mx-auto px-4 text-center bg-accent/80  p-8 md:p-12">
        <h2 className="text-4xl font-bold mb-6">About Amar Taka</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Amar Taka is dedicated to simplifying finance, providing blogs, tools,
          and resources that empower users. Our mission is to make managing
          money easy and intuitive for everyone.
        </p>
        <Link
          to="/about"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          Read More
        </Link>
      </div>
    </section>
  );
}
