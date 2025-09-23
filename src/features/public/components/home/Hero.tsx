import nightHero from "@/assets/images/crypto.png";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Hero() {
  const handleLearnMore = () => {
    const section = document.getElementById("services");
    section?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="relative w-full flex items-center bg-gradient-to-b from-secondary/40 to-background">
      <div className="container px-4 mx-auto grid gap-8 md:grid-cols-2 md:items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Amar-Taka — <br className="hidden sm:inline" />
            <span className="text-primary">Your Trusted MFS Partner</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Fast, secure, and easy money transactions. Experience the future of
            mobile financial services today.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-2xl px-8 shadow-lg">
              <Link to="/register">Register Now</Link>
            </Button>
            <Button
              onClick={handleLearnMore}
              size="lg"
              variant="outline"
              className="rounded-2xl px-8 shadow-lg"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Animated Image */}

        <div className="flex  justify-center items-center overflow-hidden">
          <div className="relative py-12 w-full max-w-lg flex items-center">
            <motion.img
              src={nightHero}
              alt="Amar Taka Hero"
              className="w-full h-full object-cover  rounded-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.98 }}
            />
            <motion.div
              className="absolute inset-12 rounded-full bg-gradient-to-r from-primary/45 to-accent/30 blur-3xl"
              animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
