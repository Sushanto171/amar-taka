import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { BarChart2, FileText, Wallet } from "lucide-react";

const services = [
  {
    icon: <Wallet />,
    title: "Digital Wallet",
    description: "Manage your money easily with our secure digital wallet.",
  },
  {
    icon: <BarChart2 />,
    title: "Financial Analytics",
    description:
      "Track your expenses, income, and growth with detailed reports.",
  },
  {
    icon: <FileText />,
    title: "Expert Blogs",
    description:
      "Get insights and tips from financial experts to improve your wealth.",
  },
];

export default function Services() {
  return (
    <section id="services" className="pt-16 bg-secondary/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Our Services</h2>
        <p className="text-muted-foreground mb-12">
          We provide top-notch services to make your transactions shine!
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <Card key={idx} className="hover:shadow-lg">
              <CardHeader className="flex items-center gap-4">
                <div className="text-primary">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>{service.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
