"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqProps {
  badge?: string;
  heading?: string;
  description?: string;
  faqs?: FaqItem[];
}

const defaultFaqs: FaqItem[] = [
  {
    question: "What is Amar Taka and how does it work?",
    answer:
      "Amar Taka is a Mobile Financial Service (MFS) platform that allows you to send money, pay bills, recharge mobile phones, and manage your digital wallet securely from your mobile device.",
  },
  {
    question: "How can I send money using Amar Taka?",
    answer:
      "To send money, simply log in to your Amar Taka account, enter the recipient's mobile number, the amount, and confirm the transaction. The money will be transferred instantly.",
  },
  {
    question: "Where can I cash out my money?",
    answer:
      "You can cash out at thousands of Amar Taka agents across Bangladesh. Use the app to locate the nearest agent and withdraw money quickly and securely.",
  },
  {
    question: "Is my money safe with Amar Taka?",
    answer:
      "Yes! Amar Taka uses advanced encryption, two-factor authentication, and real-time fraud monitoring to keep your funds completely safe.",
  },
  {
    question: "Can I pay my bills using Amar Taka?",
    answer:
      "Absolutely. You can pay utility bills, recharge your mobile, and even purchase online products directly from your Amar Taka wallet anytime, anywhere.",
  },
];

export default function Faq({
  badge = "FAQ",
  heading = "Frequently Asked Questions",
  description = "Everything you need to know about using Amar Taka Mobile Financial Services.",
  faqs = defaultFaqs,
}: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <Badge className="text-xs font-medium bg-primary/10 text-primary">
            {badge}
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold text-primary">
            {heading}
          </h1>
          <p className="mt-6 font-medium text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-border rounded-xl bg-muted p-6 cursor-pointer"
              onClick={() => toggle(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">{faq.question}</h3>
                <span className="text-primary font-bold">
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <p className="mt-4 text-muted-foreground">{faq.answer}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
