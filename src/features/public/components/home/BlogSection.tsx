import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const blogs = [
  {
    category: "Savings",
    title: "How to save smarter in 2024 without sacrificing your lifestyle.",
    description:
      "Discover the 50/30/20 rule and other simple tricks to build your wealth effortlessly.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvDKuomXWOlCtRff0Bgbb2qzW-tTJOiOfTNqAcuA4e6lnmdUUkDYHrbxBh1SmLGHWv7rwNwQnJLLr9niYBDAgi1q9FfZg8gxojJyQ0Xh-ky8FTslk3ebdkFQjXVm6kHQQxMNgXSMLIjpSzyis-8ezICad08NCUX-zopEKyONP0b7G6s5tTqyBa_rmbUs95DSCta1Fycl8fxS2ObeXSrNLfso1E6JaHlntCXVioJcrtl-gX7tcUPc2ZN3_H3EDYs1qk-4X2wue3j-C2",
  },
  {
    category: "Security",
    title: "Understanding Digital Security: How we keep your money safe.",
    description:
      "Learn about 2FA, biometric login, and end-to-end encryption standards we use.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCP6Hu1LU7mzY1zvRVez_i-e3BoC4NNnBU1RDKLYu8AXt-ASHAk8SDqE98rGyza9arz5KDA7HkT41mREEnqBuvBS8QnGnicCWZAwIk7qKtpZQgv5svd-0HUN0Z3IPi1H7gUwIwHp7VVN4F2CDwAIBVhZt-rhDxZhbLEI-CQvQ8jm5EF0-MBXntf3sKNaLfp73_IZnq9BGIjnrByIT1ANcuf4UTaZ5rA4PGuRkQRsvR3jzemwRmfezXQCYf2QrYz96nlW16f4RlV5mXw",
  },
  {
    category: "Investing",
    title: "Digital Wallet vs Traditional Bank: What’s the difference?",
    description:
      "A clear comparison of flexibility, fees, and user control for modern finance.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAN0J_7BZUnx7h7EvvVQYUfI1gHhx6mAQQfTy-hctqKjKE1c8GMISurbYC3iRqNkSXLZuMzQcBXn9ehOIjRpkEmXSMghfLBRYqr-eMiSFTBMB4_MvmI-BGd8nQAZCwhsr2dj1TOSmaUmxVFNmu7JEjhnzuFt_Codqf7MF1dGLQCOiYGCermXONwTqOwYkqJGO3-dDhwa3DvLoQ3BvHBG4MOkdqLwmo0bl40alGGrPXvTEWmdaszLt246iQo6mTGYT_QAOSDbcAelrGq",
  },
]

export function BlogsSection() {
  return (
    <section className="py-16">
      <div>
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            Financial <span className="text-primary"> Insights
            </span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Stay ahead with expert analysis, market trends, and actionable tips to make smarter financial decisions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {blogs.map((blog) => (
            <Card
              key={blog.title}
              className="group cursor-pointer pt-0 overflow-hidden"
            >
              <div
                className="aspect-video bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${blog.image})` }}
              />

              <CardContent className="pt-4 space-y-2">
                <Badge variant="secondary" className="uppercase text-xs">
                  {blog.category}
                </Badge>

                <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {blog.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
