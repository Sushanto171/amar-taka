
import { ShieldCheck } from "lucide-react";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex-1 flex flex-col lg:flex-row h-screen ">
      {/* Left Hero Panel */}
      <div
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center items-end p-12 overflow-hidden group"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(16, 34, 22, 0) 0%, rgba(16, 34, 22, 0.9) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCoaZ2K88GoljnStJAYjqrnuYsRE1hpXpAP3_IoOLAYYoB4xHDgGM52I8fJt8EtXSekRlzWG7yoSmMpgqF9a5k_wpEOHZoumeWUfvsHJfK5-viT0JkvkubDqzCsNdSmQ0qpG7k9jcq1KReHE3LE6hD4o_sEvGOu-as6daEhIdrR9yP-ck7aZrGTW484F1gU28Vu8UpYb1HQWM7prjWkGPORr7dUri5R99ljMq4yOwVpD7phGmtnQj5Kt5JIQobcn6kcpM_YOdjR1jl6")',
        }}
      >
        <div className="relative z-10 max-w-lg">
          <div
            className="rounded-full w-fit gap-2 px-2 py-3 bg-primary/15 text-primary border border-primary/30 backdrop-blur-sm"
          >
            <ShieldCheck className="h-5 w-5 " fill="bg-primary" />
          </div>

          <h1 className="text-white text-5xl font-black leading-tight tracking-[-0.033em] mb-4">
            Securely access your digital wallet.
          </h1>
          <p className="text-[#9db9a6] text-lg font-medium leading-relaxed max-w-md">
            Manage your finances with bank-grade security and ease. Experience the
            future of transactions with Amar Taka.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80 pointer-events-none"></div>
      </div>

      {/* Right Login Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white dark:bg-[#111813] px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-[480px] flex flex-col gap-8">
          {/* Header */}
          <div className=" md:hidden flex flex-col gap-2">
            <h2 className="text-[#111418] dark:text-white text-3xl font-bold leading-tight">
              Welcome Back
            </h2>
            <p className="text-[#637588] dark:text-[#9db9a6] text-base font-normal">
              Please enter your details to sign in.
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
