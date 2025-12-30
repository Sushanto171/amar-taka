"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ShieldCheck } from "lucide-react";
import { Link } from "react-router";

export function HighlightsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image / Visual */}
          <div className="lg:w-1/2 order-2 lg:order-1 w-full overflow-hidden">
            <Card className="relative overflow-hidden p-0 lg:h-[500px] shadow-xl">
              <div
                className="absolute inset-0 bg-cover bg-right"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2qo4O68xd1Qqu-2OAHZFRJcyG-DDNpViDXMSRllSexU78xqkKgzItmDLH-nvi5JTsPCcuBZrfJJKHMOPBXhaA3AYg9TvGZ_WxPupKbpCdUSbkA4wbUH2U_Gw4Ti4a9WSt-oFsPIq63UX_x1CTiSzSmYc_XrqYRHXQBMvShSeUUEdVduPRRoxjSTtcQgNIXTzy70gIe6t-CHivlBoIDOW1sgGgYn6aVW3bSYNSeDw4FWngQXDEhHUERmhiY9rK0ii3ZaxUC9_vfiLJ')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />

              <CardContent className="absolute bottom-6 left-6 right-6 p-0">
                <div className="flex items-center gap-2 text-foreground">
                  <ShieldCheck className="size-5 text-primary" />
                  <span className="font-medium">
                    Secure Payment Gateway
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:w-1/2 order-1 lg:order-2 flex flex-col gap-6">
            <Badge
              variant="secondary"
              className="w-fit text-xs font-bold uppercase tracking-wide"
            >
              Global Reach
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Send money internationally <br /> in seconds.
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Break down borders with Amar Taka. Send funds to over 100 countries
              instantly with competitive exchange rates—no hidden fees, just
              speed and transparency.
            </p>

            <ul className="flex flex-col gap-4">
              {[
                "Real-time exchange rates",
                "Instant delivery to bank accounts",
                "Multi-currency wallet support",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="size-5 text-primary" />
                  <span className="font-medium text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link to="/login">
                <Button size="lg" className="font-bold text-background!">
                  Start Sending
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
