"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export default function ContactPage() {
  const contacts = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      description: "We reply within 24 hours.",
      value: "example@company.com",
      link: "mailto:example@company.com",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Office",
      description: "Visit us at our office",
      value: "1 Eagle St, Brisbane, QLD, 4000",
      link: "#",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      description: "Mon-Fri, 9am-5pm (AEST)",
      value: "+123 456 7890",
      link: "tel:+1234567890",
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-primary" />,
      title: "Live Chat",
      description: "Instant help from our team",
      value: "Start Chat",
      link: "#",
    },
  ];

  return (
    <section className="bg-background pt-24 container mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-primary mb-4">Contact Us</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
          We'd love to hear from you! Reach out through the options below or
          send us a direct message.
        </p>
      </div>

      {/* Contact Grid with Animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {contacts.map((contact, index) => (
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
                  {contact.icon}
                </motion.div>
                <CardTitle className="text-lg font-semibold">
                  {contact.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <p className="text-muted-foreground text-sm md:text-base">
                  {contact.description}
                </p>
                <a
                  href={contact.link}
                  className="font-semibold hover:underline block"
                >
                  {contact.value}
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      <motion.div
        className="max-w-2xl mx-auto bg-muted rounded-lg p-8"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 150, damping: 12 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Send us a Message
        </h2>
        <form className="space-y-4">
          <Input placeholder="Your Name" required />
          <Input type="email" placeholder="Your Email" required />
          <Textarea placeholder="Your Message" rows={5} required />
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </motion.div>
    </section>
  );
}
