"use client";

import { ArrowRight } from "lucide-react";

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface FeaturesProps {
  heading?: string;
  description?: string;
  linkUrl?: string;
  linkText?: string;
  features?: Feature[];
}

export default function Features({
  heading = "Our Powerful Features",
  description = "Amar Taka brings you fast, secure, and reliable Mobile Financial Services. Whether it’s sending money, paying bills, or recharging your phone, we’ve got you covered.",
  linkUrl = "#",
  linkText = "Get Started",
  features = [
    {
      id: "feature-1",
      title: "Send Money Instantly",
      description:
        "Transfer money securely to anyone in Bangladesh within seconds. No waiting, no hassle.",
      image:
        "https://img.freepik.com/free-vector/money-transfer-concept-illustration_114360-3027.jpg",
    },
    {
      id: "feature-2",
      title: "Cash Out Anywhere",
      description:
        "Withdraw cash from thousands of agents across the country anytime you need.",
      image:
        "https://img.freepik.com/free-vector/atm-machine-concept-illustration_114360-19249.jpg",
    },
    {
      id: "feature-3",
      title: "Bill Pay & Recharge",
      description:
        "Pay utility bills or recharge your mobile balance directly from your Amar Taka wallet.",
      image:
        "https://img.freepik.com/free-vector/bill-payment-concept-illustration_114360-2135.jpg",
    },
    {
      id: "feature-4",
      title: "Secure Digital Wallet",
      description:
        "Your money is safe with advanced encryption and real-time fraud monitoring.",
      image:
        "https://img.freepik.com/free-vector/digital-wallet-concept-illustration_114360-4194.jpg",
    },
  ],
}: FeaturesProps) {
  return (
    <section className="pt-24">
      <div className="container mx-auto px-4 flex flex-col gap-16">
        {/* Section Header */}
        <div className="lg:max-w-xl">
          <h2 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6 text-primary">
            {heading}
          </h2>
          <p className="text-muted-foreground mb-8 lg:text-lg">{description}</p>
          <a
            href={linkUrl}
            className="group flex items-center text-sm font-medium md:text-base lg:text-lg text-primary hover:underline"
          >
            {linkText}
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {/* First Highlighted Feature */}
          {features[0] && (
            <div className="border-border flex flex-col overflow-clip rounded-xl border md:col-span-2 md:grid md:grid-cols-2 md:gap-6 lg:gap-8 hover:shadow-lg transition">
              <div className="md:min-h-[24rem] lg:min-h-[28rem] xl:min-h-[32rem]">
                <img
                  src={features[0].image}
                  alt={features[0].title}
                  className="aspect-16/9 h-full w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col justify-center px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                  {features[0].title}
                </h3>
                <p className="text-muted-foreground lg:text-lg">
                  {features[0].description}
                </p>
              </div>
            </div>
          )}

          {/* Other Features */}
          {features.slice(1).map((feature) => (
            <div
              key={feature.id}
              className="border-border flex flex-col overflow-clip rounded-xl border hover:shadow-lg transition"
            >
              <div>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="aspect-16/9 h-full w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
                <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-2xl lg:mb-6">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground lg:text-lg">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
