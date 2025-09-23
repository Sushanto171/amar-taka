import blog_1 from "@/assets/images/blog_1.png";
import blog_2 from "@/assets/images/blog_2.png";
import blog_3 from "@/assets/images/blog_3.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const blogs = [
  {
    title: "Why Choose Amar Taka for Your Daily Transactions?",
    image: blog_2,
    description: [
      "Amar Taka is built to make your financial life easier, safer, and faster.",
      "With Amar Taka, you can send money, cash out, pay bills, and recharge mobiles instantly without standing in long queues.",
      "We focus on secure transactions with OTP verification and advanced fraud detection, so you can trust your money is always safe.",
      "Amar Taka is not just a wallet — it’s your trusted financial partner for everyday needs.",
    ],
  },
  {
    title: "How Amar Taka Empowers Businesses and Shops",
    image: blog_1,
    description: [
      "Small shops, freelancers, and online businesses are adopting Amar Taka to accept payments instantly.",
      "No need to handle cash or deal with risky transactions — just a few taps and the money is transferred.",
      "Amar Taka also provides transparency in financial flows, which helps business owners track their income and build customer trust.",
      "With Amar Taka, businesses save time, reduce cash handling risk, and grow in the digital economy.",
    ],
  },
  {
    title: "Amar Taka: Driving Bangladesh Towards a Cashless Future",
    image: blog_3,
    description: [
      "Bangladesh is moving towards a digital economy, and Amar Taka is at the center of this transformation.",
      "From sending money to family members to paying utility bills or shopping online — everything is possible with Amar Taka.",
      "Our goal is to bring financial services to everyone, even in rural areas, so that no one is left behind.",
      "By adopting Amar Taka, you are not just using a service — you are contributing to a smarter, faster, and cashless Bangladesh.",
    ],
  },
];

export default function Blog() {
  return (
    <section className="py-16 px-4 md:px-12 bg-background">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Latest Blogs
        </h2>
        <p className="text-muted-foreground mt-2">
          Insights on Mobile Financial Services and the future of digital money
        </p>
      </div>

      <div className="space-y-8">
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden flex flex-col md:flex-row rounded-2xl shadow-lg hover:shadow-xl transition">
              {/* Left Content */}
              <div className="flex-1 flex flex-col justify-center p-6">
                <CardHeader className="p-0">
                  <CardTitle className="text-xl font-semibold">
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-4">
                  <div className="text-md leading-relaxed text-muted-foreground space-y-2">
                    {blog.description.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </CardContent>
              </div>

              {/* Right Image */}
              <div className="md:w-1/2 max-w-md max-h-72 rounded-3xl overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
