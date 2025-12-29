"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";

const offers = [
  {
    category: "Cashback",
    title: "5% Cashback on Utilities",
    description:
      "Pay your electricity or water bill via Amar Taka and get 5% instant cashback.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDl_5V2-H9ALgZdU958gGj8NK33W_GviIfbep5Uhp-pt3QuPf8FahL-K-a3viCULN2tVLDjElc3LTLXDNt7R0SfC6lAg1slq89uPMWpCMjT2QnXKx6QpEE-_r5Q8VI7g0pwNB5edvxUa4QpmLKyjfIi0nmB1EUZ7m7GLGaGT3wZWP_ecIqQDnL_TwKVkPTe0S7t01gw2LjfIKLbeRKIxwNSGIhfhFV7TORXbOeV21pVItZkhvE1R0wPbyFvKfNYcBBuqqjCrfgICRUP",
  },
  {
    category: "Food & Dining",
    title: "20% Off at Star Cafe",
    description:
      "Enjoy your favorite brew with a massive discount when you scan and pay.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCOy8kmyjYdXL10ls-wgPQdd_6bEGOlooLycY0qXE9W4QML_a5ckjfSWJrPy15bipW3SMk_KxUtKHd4ETn9HVaW_RD7jcQ6CzCcgbJRi7hA9--y0J5OxTNbvulicbWakjng1OwznridKxmuTlGbSUaiZSfMibpTLZULYCtW7XtsJQE8Uzjp9f7RqT6PNdsJTFRjGF0JK_GNUU2iqL-E2LkPS8aFeiJ2jvXEvUcEgX3GwPQ5wvieK31hjAiGWXyf92nUAlV9bVoNNshX",
  },
  {
    category: "Referral",
    title: "Invite Friends, Earn $10",
    description:
      "Refer a friend to Amar Taka and you both get $10 after their first transfer.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC0eRDHkeF5HF981TW5ukEoEKo1qWzdVYivaS7vW2EN88ygrkanyRn1oBv0Cag9x2b2Ng1C2EJn0pAyUf_UhyY2ai0ucBrOfsV5g_npZDhvl15qBjYI6Q1noXl0AZlbO03st_B9kiXukB8dUB1ZmLZGtX191etqkzqM1XBbL11yXiQB6IpD85AVLlbsfv5euUntlb_LwKh5LgXiQXIRDuQ3Wspyrqpfyod0J9tHRlSMBLAod3jkjsaAF7l_UCciHXkAZGkb5XO7I4vN",
  },
];

export function OffersSection() {
  return (
    <section className="py-20 border-y bg-gradient-to-r from-muted to-muted/50 relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

      <div className="relative z-10 ">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h2 className="text-3xl font-bold">Exclusive Offers</h2>

          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <ArrowLeft className="size-4" />
            </Button>
            <Button size="icon">
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <Card
              key={offer.title}
              className="overflow-hidden group hover:shadow-xl pt-0 transition-all"
            >
              <div className="relative h-40 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${offer.image})` }}
                />
              </div>

              <CardContent className="p-6 flex flex-col gap-3">
                <Badge variant="secondary" className="w-fit">
                  {offer.category}
                </Badge>

                <h3 className="text-xl font-bold">{offer.title}</h3>

                <p className="text-sm text-muted-foreground">
                  {offer.description}
                </p>

                <Button variant="link" className="px-0 w-fit font-bold">
                  Claim Offer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
