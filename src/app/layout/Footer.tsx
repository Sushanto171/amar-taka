import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Dribbble, Facebook, Github, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router";

const footerLinks = {
  Services: [
    "Send Money",
    "Receive Money",
    "Mobile Recharge",
    "Bill Payment",
    "Transaction History",
  ],
  Company: ["About Us", "Team", "Careers"],
  "Helpful Links": ["Contact", "FAQs", "Live Chat Support"],
  Legal: [
    "Privacy Policy",
    "Terms & Conditions",
    "Refund Policy",
    "Compliance & Security",
  ],
  Downloads: ["Android App", "iOS App", "User Guide", "API Docs"],
};

export default function Footer() {
  return (
    <footer className="container mx-auto py-16">
      <div className="px-4">
        <div className="lg:flex lg:items-start lg:gap-8">
          <div className="text-teal-600">
            <Logo />
          </div>

          {/* Newsletter Subscription + About */}
          <div className="mt-8 lg:col-span-2 lg:flex lg:flex-col lg:items-start lg:gap-6">
            <form className="w-full">
              <Label htmlFor="UserEmail" className="sr-only">
                Email
              </Label>
              <div className="p-2 rounded-md flex items-center gap-4">
                <Input
                  type="email"
                  id="UserEmail"
                  placeholder="john@example.com"
                />
                <Button>Subscribe</Button>
              </div>
            </form>

            {/* About Us Section */}
            <div className="mt-6 max-w-md text-sm text-muted-foreground">
              <h3 className="text-lg font-semibold mb-2">About Us</h3>
              <p>
                Amar Taka is your trusted digital financial partner. We provide
                seamless money transfers, mobile recharge, bill payments, and
                more. Our mission is to make your transactions safe, fast, and
                simple.
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-5 lg:gap-y-16">
            {Object.entries(footerLinks).map(([section, links], idx) => (
              <div key={idx} className="col-span-2 sm:col-span-1">
                <p className="font-medium">{section}</p>
                <ul className="mt-6 space-y-4 text-sm">
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link to="#" className="transition hover:opacity-75">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Social Links */}
            <ul className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end mt-6 lg:mt-0">
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-75"
                >
                  <Facebook size={24} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-75"
                >
                  <Instagram size={24} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-75"
                >
                  <Twitter size={24} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-75"
                >
                  <Github size={24} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-75"
                >
                  <Dribbble size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-muted pt-8 flex flex-col sm:flex-row sm:justify-between gap-4">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Amar Taka. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4 text-xs">
            <li>
              <Link to="#" className="hover:opacity-75">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:opacity-75">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:opacity-75">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
