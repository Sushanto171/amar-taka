import { Badge } from "@/components/ui/badge";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { RegisterForm } from "../components/RegisterForm";

export default function Register() {
  return (
    <main className="flex-grow flex h-screen overflow-hidden">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 h-full">

        {/* LEFT — Marketing / Visual */}
        <div className="hidden lg:flex relative flex-col justify-end p-16 bg-[#1a2c20] overflow-hidden">

          {/* Gradient / Glow */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#102216] via-[#1a2c20] to-primary/20" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-lg">
            <Badge className="mb-8 w-fit gap-2 px-5 py-2.5 bg-primary/15 text-primary border border-primary/30">
              <ShieldCheck className="h-4 w-4" />
              Bank-Grade Security
            </Badge>

            <h1 className="text-5xl font-black tracking-tight text-white leading-[1.1] mb-6">
              Banking-grade security for your digital assets.
            </h1>

            <p className="text-lg text-[#9db9a6] mb-10">
              Join millions who trust Amar Taka for fast, secure, and reliable
              digital transactions.
            </p>

            <div className="flex gap-6 text-sm font-medium text-[#9db9a6]">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-primary" />
                End-to-end Encrypted
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-primary" />
                ISO 27001 Certified
              </div>
            </div>
          </div>

          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&auto=format&fit=crop')",
            }}
          />
        </div>

        {/* RIGHT — Register Form */}
        <div
          className="
        flex items-center justify-center
        bg-background-dark
        px-6 sm:px-12 lg:px-24
        h-full
        overflow-y-auto lg:overflow-hidden
      "
        >
          <div className="w-full max-w-md flex flex-col gap-4">


            {/* Heading */}
            <div className=" md:hidden text-center space-y-2">
              <h2 className="text-3xl mt-2 font-black text-white">
                Create your account
              </h2>
              <p className="text-[#9db9a6]">
                Join the most secure digital wallet today.
              </p>
            </div>

            {/* FORM */}
            <RegisterForm className=" scale-90" />
          </div>
        </div>
      </div>
    </main>

  );
}
