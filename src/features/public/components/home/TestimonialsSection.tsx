import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Freelance Designer",
    message:
      "Amar Taka has completely changed how I manage my expenses. Fast, reliable, and zero fees.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD0s_sxN1jDtM9BCSV416V7eOtzHMn1AK4BxlOFqAOnolkSB_7om6_dlX-ybEyAKeIxaar91F_UNUYK7s6XTb_8e6UhfYaK096Vng1yAYC1xsYQAYppnNJFMp_T4y3Z0YiyjMUS0tl2EQ9w8yctI67C2yClqAHn61OkC4Ej6Mc12t7pHxBXe_mdXxDMkGpaS3diLPYEfB3_6AU6wlHaMDmqATNN-Cl8KhWTo4qM9JpA4IyOpxFNv22SEHd4iLyTK5AbR3SA17E2TO5k",
  },
  {
    name: "Michael Chen",
    role: "Cafe Owner",
    message:
      "The merchant QR payments are seamless. Customers love the speed and simplicity.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOkt5cbTZkUHui7oYaYOisIP78CqhbLMGffgeAXaug0_tIa7eF5CB32gX7L0abuEcncffu-PItq8KzWahhfDZwzPXTBYQWCf71emmVInTrxSozK6-iPGYLSI-8lhbvlgd7cghR7l_s4tNU8KFsv1blaL9eRRTSIB_haYzHr0TPyL8cpmIYrXHFPgnJBMt-vrwA5PNkf0UgMJ9WVEMUMNCq5yLHaVtlCqc8XWhy2r-WGr7qgcQ3yOKGzXbbn4IfGjrtOyEo4tLY-1rE",
  },
  {
    name: "Anita Roy",
    role: "Student",
    message:
      "Customer support resolved my transfer issue in minutes. Highly reliable platform.",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbvk-SgYkJGJX-s-v_dqE-aGFTye9cmj89Z2VwVIt47qLYpxgCGxgbsMFqZmg7_GeNZ11QS61adKdk6MT6yh_9lXCRSja8A7JkouaI3qa354AeIAggPtZaUa3Bm4utkJ5AkRW_56jmdJcQsPQmdx2AlFYmY24ggZluHjUt7hBopVZH9PFbyWYDYKGeRoryQ6SaDc8vD49bU5W6dyR9w8ZpzwoyE6hca5coSObCfOc7G-XuJmrZhPS7lwtBvUmIuIpirnfAJ4wx-MDs",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/40">
      <div >
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Loved By <span className="text-primary">Millions</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Trusted by users worldwide for seamless, secure, and smart financial management that empowers your everyday decisions.
          </p>
        </div>


        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name}>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground italic">
                  “{t.message}”
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <Avatar>
                    <AvatarImage src={t.avatar} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
