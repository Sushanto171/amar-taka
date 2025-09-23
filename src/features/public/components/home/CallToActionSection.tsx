import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function CTA() {
  return (
    <section className="py-24 bg-primary/10 text-white text-center">
      <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
      <p className="mb-8 text-lg">
        Join Amar Taka and boost your financial skills!
      </p>
      <Button>
        <Link to="/register">Register Now</Link>
      </Button>
    </section>
  );
}
