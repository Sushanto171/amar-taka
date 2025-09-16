"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Code, Cog, PenTool, Shrub } from "lucide-react";

const services = [
  {
    icon: <Cog className="h-6 w-6 text-primary" />,
    title: "Product Strategy",
    description: "Strategic planning to meet user needs and business goals.",
    items: ["Market Research", "User Personas", "Competitive Analysis"],
  },
  {
    icon: <PenTool className="h-6 w-6 text-primary" />,
    title: "Design",
    description: "Beautiful, user-centered designs for all platforms.",
    items: ["UI/UX Design", "Prototyping", "Interaction Design"],
  },
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    title: "Web Development",
    description: "Modern web applications with best practices.",
    items: ["Frontend Dev", "Backend Dev", "API Integration"],
  },
  {
    icon: <Shrub className="h-6 w-6 text-primary" />,
    title: "Marketing",
    description: "Data-driven strategies to launch and scale efficiently.",
    items: ["SEO Strategy", "Analytics & Data", "A/B Testing"],
  },
];

export default function Service() {
  return (
    <section className="py-32 container mx-auto px-4">
      <div className="">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
            We make your business shine with a touch of fun and creativity! 🚀
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <Card className="border border-border rounded-xl flex flex-col gap-4 hover:shadow-lg">
                <CardHeader className="flex items-center gap-4">
                  <motion.div
                    className="bg-primary/10 p-3 rounded-full"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 1 }}
                  >
                    {service.icon}
                  </motion.div>
                  <CardTitle className="text-lg font-semibold">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                  <p className="text-muted-foreground text-sm md:text-base">
                    {service.description}
                  </p>

                  {/* Render only the items for this service */}
                  <ul className="space-y-1">
                    {service.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm md:text-base"
                      >
                        <span className="h-2 w-2 rounded-full bg-primary mt-1" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
