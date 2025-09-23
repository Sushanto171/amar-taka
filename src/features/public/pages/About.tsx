import Logo from "@/assets/icons/Logo";
import aboutMain from "@/assets/images/about_main.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ImageProps {
  src: string;
  alt: string;
}

interface BreakoutProps extends ImageProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
}

interface AboutProps {
  title?: string;
  description?: string;
  mainImage?: ImageProps;
  secondaryImage?: ImageProps;
  breakout?: BreakoutProps;
  companiesTitle?: string;
  companies?: ImageProps[];
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{ label: string; value: string }>;
}

const defaultCompanies: ImageProps[] = [
  {
    src: "https://vectorseek.com/wp-content/uploads/2023/08/Bkash-Pink-Icon-Logo-Vector.svg-.png",
    alt: "bKash",
  },
  {
    src: "https://vectorseek.com/wp-content/uploads/2022/02/vectorseek.com-Nagad-Logo-Vector.png",
    alt: "Nagad",
  },
  {
    src: "https://vectorseek.com/wp-content/uploads/2024/01/dutch-bangla-rocket-Logo-Vector.svg-.png",
    alt: "Rocket",
  },
  {
    src: "https://images.seeklogo.com/logo-png/40/1/upay-logo-png_seeklogo-404483.png",
    alt: "Upay",
  },
];

const defaultAchievements = [
  { label: "Active Users", value: "2M+" },
  { label: "Transactions Completed", value: "50M+" },
  { label: "Customer Satisfaction", value: "98%" },
  { label: "Awards Won", value: "12+" },
];

export default function About({
  title = "About Amar Taka",
  description = "Amar Taka is a trusted Mobile Financial Service (MFS) dedicated to making payments, transfers, and daily transactions seamless, secure, and accessible for everyone across Bangladesh.",
  mainImage = {
    src: aboutMain,
    alt: "Amar Taka MFS",
  },
  secondaryImage = {
    src: "https://cartlyapp.com/wp-content/uploads/2023/05/AdobeStock_477613000-scaled-1-1080x675.webp",
    alt: "Digital Payment",
  },
  breakout = {
    src: "/images/logo-icon.svg",
    alt: "Amar Taka Logo",
    title: "Smart & Secure Transactions",
    description:
      "We ensure financial freedom by offering instant money transfers, bill payments, mobile recharges, and merchant payments with full security.",
    buttonText: "Learn More",
    buttonUrl: "#",
  },
  companiesTitle = "Trusted & Integrated With",
  companies = defaultCompanies,
  achievementsTitle = "Our Impact in Numbers",
  achievementsDescription = "Amar Taka is shaping the future of cashless Bangladesh with secure, fast, and reliable digital financial services.",
  achievements = defaultAchievements,
}: AboutProps) {
  return (
    <section className="pt-24 container mx-auto px-4 space-y-24">
      {/* Title & Description */}
      <div className="max-w-5xl mx-auto text-center space-y-5">
        <h1 className="text-4xl md:text-5xl text-primary font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>

      {/* Images + Breakout */}
      <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
        <img
          src={mainImage.src}
          alt={mainImage.alt}
          className="rounded-2xl object-cover w-full max-h-[500px] lg:col-span-2 shadow-md"
        />

        <div className="flex flex-col gap-6">
          <Card className="flex flex-col justify-between h-full rounded-2xl shadow-lg">
            <CardHeader>
              <Logo />
              <CardTitle className="text-xl">{breakout.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-muted-foreground">{breakout.description}</p>
              <Button asChild>
                <a
                  href={breakout.buttonUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {breakout.buttonText || "Click Here"}
                </a>
              </Button>
            </CardContent>
          </Card>

          <img
            src={secondaryImage.src}
            alt={secondaryImage.alt}
            className="rounded-2xl object-cover shadow-md"
          />
        </div>
      </div>

      {/* Companies */}
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-lg font-medium">{companiesTitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-12">
          {companies.map((company, idx) => (
            <img
              key={`${company.src}-${idx}`}
              src={company.src}
              alt={company.alt}
              className="h-22 w-auto grayscale hover:grayscale-0 transition"
            />
          ))}
        </div>
      </div>

      {/* Achievements */}
      <Card className="max-w-6xl mx-auto rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold">
            {achievementsTitle}
          </CardTitle>
          <p className="text-muted-foreground max-w-2xl">
            {achievementsDescription}
          </p>
        </CardHeader>
        <CardContent>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {achievements.map((item, idx) => (
              <div key={`${item.label}-${idx}`} className="space-y-2">
                <p className="text-muted-foreground">{item.label}</p>
                <p className="text-3xl text-primary md:text-4xl font-bold">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
