"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Currency, Headset, Lock } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Currency className="w-6 h-6" />,
      title: "Zero Fees",
      desc: "Transfer money to friends and family without paying a cent in transaction fees. Keep more of what you earn.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: <Headset className="w-6 h-6" />,
      title: "24/7 Support",
      desc: "Our dedicated support team is available round the clock to assist you with any issues or questions.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Bank-Grade Security",
      desc: "Your data and money are protected by state-of-the-art encryption standards and biometric security.",
      color: "bg-primary/10 text-primary",
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience the 
            <span className="text-primary"> {" "}
               Future of Finance
              </span>
          </h2>
          <p className="text-slate-600 dark:text-gray-300 text-md leading-relaxed">
            We built Amar Taka to be the fastest, safest, and most reliable digital wallet for your daily needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="rounded-2xl dark:bg-surface-dark border dark:border-border-dark hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1"
            >
              <CardContent className="flex flex-col gap-3  items-start">
                <div className={`size-14 rounded-xl flex items-center justify-center mb-6 ${feature.color} group-hover:bg-primary group-hover:text-black transition-colors`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-left ">{feature.title}</h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
