import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Amar Taka?",
    answer: "A platform for finance and blogs.",
  },
  { question: "How can I start?", answer: "Sign up and explore our tools." },
  { question: "Is it free?", answer: "Yes, we have free and premium plans." },
];

export default function FaqSection() {
  return (
    <section className="py-12 bg-secondary/5">
      <div className="container px-4 max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">FAQ</h2>
        <Accordion type="single" collapsible className="space-y-4 ">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className="border border-border rounded-xl"
            >
              <AccordionTrigger className="px-6 py-4 text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
