"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router";

export default function Hero() {
  return (
    <div className="relative w-full overflow-hidden ">
      {/* Background Gradient Blob */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6 text-center lg:text-left z-10">
            {/* Badge */}
            <Badge className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold w-fit mx-auto lg:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              V 2.0 Now Live
            </Badge>

            {/* Heading */}
            <h1 className="text-5xl font-sans md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
              Your Money, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                Your Rules
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 dark:text-gray-300 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              The digital wallet that empowers your financial freedom. Experience seamless
              transactions, zero fees, and 24/7 security.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">

              <Link to="/login">
                <Button className="flex rounded-full text-background! items-center gap-2 h-12 px-8! bg-primary text-background-dark shadow-lg shadow-primary/20 hover:bg-primary-hover">
                  <ArrowRight className="w-5 h-5" />
                  Get App
                </Button>
              </Link>
              <Link to="#howItWork"
                onClick={() => {
                  const element = document.getElementById("howItWork");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Button variant="outline" className="flex rounded-full items-center gap-2 h-12 px-6 text-base font-bold">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image / Mockup */}
          <div className="relative flex justify-center lg:justify-end z-10">
            <div
              className="relative w-full max-w-[500px] aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCLsCwLXY3lueT4Wl0kI7gry_66BrO_WiZgCDpmIwaq4Ajj1kW9UsV68Ccf18mlmw9huP3a0iFowi44CYy4LivYDzkfWTjZYMJLjzAsahLIbps0yloyLSUfaXJVeyxLQWbVnbcJ-dkEsLFZ8SGXu121omAP7wIl-dyCwHi_176ym-M6ya058ezq4xLoQUIysN9vUqANFSKhQmXWVFrwx8unuHmBpGvUMBbJbuHvT49a5DgpwjDKtVZZp__Is-sXvIejJGI1cqBnn6Jj')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>

              {/* Floating Card */}
              <Card className="absolute bottom-8 left-8 right-8 p-6 transform translate-y-4 hover:translate-y-0 transition-transform duration-500 glass-panel border border-white/10 shadow-lg">
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-300 uppercase tracking-wider">
                        Total Balance
                      </span>
                      <span className="text-2xl font-bold text-white">$24,500.00</span>
                    </div>
                    <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary h-full w-[70%]"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
