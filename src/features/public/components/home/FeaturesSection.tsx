import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dummy Data for features and transactions
const features = [
  {
    title: "Instant Transfers",
    description: "Send money instantly with zero hassle.",
  },
  {
    title: "Secure Payments",
    description: "Bank-level security for all transactions.",
  },
  {
    title: "Bill Payments",
    description: "Pay your utilities and bills easily.",
  },
];

export default function FeaturesSection() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:scale-105 transition-transform duration-300"
            >
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>{feature.description}</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
