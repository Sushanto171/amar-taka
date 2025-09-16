// src/components/Hero.tsx
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className=" bg-gradient-to-r from-primary to-secondary  py-20 px-4 text-center">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Amar-Taka — Your Trusted MFS Partner
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Fast, secure, and easy money transactions
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="default">Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </section>
  );
}
