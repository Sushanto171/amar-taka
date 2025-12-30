
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function CTASection() {


  const handleViewDemo = () => {
    const element = document.getElementById("demoSection"); // replace with your demo section id
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full px-4 md:px-10 py-20">
      <div className="relative mx-auto bg-[#1E1E1E] rounded-3xl p-10 md:p-20 text-center overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[100px] -left-[100px] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px]" />
          <div className="absolute -bottom-[100px] -right-[100px] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-2xl">
            Ready to simplify your finances?
          </h2>
          <p className="text-[#9db9a6] text-lg max-w-xl">
            Join thousands of users who trust Amar Taka for their daily transactions. Download the app today.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
            <Link to="/login" >
              <Button
                className="flex items-center w-full sm:w-fit justify-center rounded-xl h-12 px-8 bg-primary text-[#111813] font-bold text-lg shadow-[0_0_20px_rgba(19,236,91,0.3)] hover:brightness-110 transition-all"
              >
                Get Started Now
              </Button>
            </Link>

            <Button
              onClick={handleViewDemo}
              variant="outline"
              className="flex items-center justify-center rounded-xl h-12 px-8 text-white! bg-[#1E1E1E] font-bold text-lg border border-[#3b5443] hover:bg-[#3b5443] transition-all"
            >
              View Demo
            </Button>
          </div>

          <p className="text-xs text-[#5c6e63] mt-4">
            No credit card required for sign up.
          </p>
        </div>
      </div>
    </section>
  );
}
