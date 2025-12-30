"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Instagram, Linkedin, Twitter, Users, Wallet } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");
  // const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    // setLoading(true);
    const toastId = toast.loading("Processing subscription...");

    // Simulate API request
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // mock delay
      toast.success(`Subscribed with: ${email}`, { id: toastId });
      setEmail("");
    } catch {
      toast.error("Subscription failed", { id: toastId });
    } finally {
      // setLoading(false);
    }
  };

  const socialIcons = [
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Users, label: "Facebook", href: "#" },
  ];

  return (
    <footer className="bg-[#28392e] mt-12 text-white border-t border-white/5 relative overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>

      <div className="container mx-auto px-6 py-16 ">
        {/* Newsletter Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 mb-20 pb-16 border-b border-white/10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">
              Stay updated with our latest financial tips
            </h2>
            <p className="text-[#a0a0a0] text-lg">
              Join 50,000+ users getting smarter with their money.
            </p>
          </div>
          <div className="w-full lg:max-w-md">
            <form className="flex flex-col sm:flex-row gap-3 w-full" onSubmit={handleSubscribe}>
              <label className="sr-only" htmlFor="email-newsletter">Email address</label>
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Wallet className="text-[#9db9a6] w-5 h-5" />
                </div>
                <Input
                  id="email-newsletter"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-11 pr-5 py-4 rounded-xl bg-[#28392e] border border-primary text-white placeholder-[#9db9a6] focus:ring-2 focus:ring-primary focus:bg-[#1a2920] transition-colors h-14"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-[#111813] font-bold h-14 px-8 rounded-xl whitespace-nowrap transition-all shadow-[0_0_15px_rgba(19,236,91,0.2)] hover:shadow-[0_0_25px_rgba(19,236,91,0.4)] flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link className="flex items-center gap-2 group w-fit" to="/">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-[#111813]">
                <Wallet className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">Amar Taka</span>
            </Link>
            <p className="text-[#a0a0a0] leading-relaxed max-w-sm">
              Simplifying your digital finances with secure, fast, and reliable wallet solutions tailored for the modern economy.
            </p>
            <div className="flex gap-3 mt-2">
              {socialIcons.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  aria-label={label}
                  href={href}
                  className="w-10 h-10 rounded-lg bg-surface-dark border border-white/5 flex items-center justify-center text-[#9db9a6] hover:bg-primary hover:text-[#111813] hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Navigation Columns */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/90">Product</h3>
            <ul className="flex flex-col gap-4">
              {[{ label: "Features", href: "/features" }, { label: "Rewards", href: "/#rewards" },].map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-[#a0a0a0] hover:text-primary hover:pl-1 transition-all text-base">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/90">Company</h3>
            <ul className="flex flex-col gap-4">
              {[{ label: "About Us", href: "/about" }, { label: "Service", href: "/service" }, { label: "Contact", href: "/contact" }].map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-[#a0a0a0] hover:text-primary hover:pl-1 transition-all text-base">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/90">Resources</h3>
            <ul className="flex flex-col gap-4">
              {["Support Center", "Blog & News", "API Documentation", "Status"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#a0a0a0] hover:text-primary hover:pl-1 transition-all text-base">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className=" text-center md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8 text-[#a0a0a0] text-sm">
          <p>© {new Date().getFullYear()} Amar Taka. All rights reserved.</p>
          {/* <div className="flex flex-wrap justify-center gap-8">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
              <a key={item} href="#" className="hover:text-primary transition-colors">{item}</a>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
}
