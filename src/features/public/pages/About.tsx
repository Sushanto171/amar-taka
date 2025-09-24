"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Target, Briefcase } from "lucide-react"
import { motion } from "framer-motion"

export default function About() {
  return (
    <div className="py-24 space-y-24 overflow-hidden">
      {/* Story Section */}
      <section className="container px-4 mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-primary">Our Story</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Amar Taka started with a vision to simplify personal finance for
          everyone. We provide blogs, tools, and resources to help users make
          smarter money decisions. Our journey began with the belief that
          finance should be accessible, transparent, and easy to understand.
        </p>
      </section>

      {/* Mission Section (with animation like services) */}
      <section className="container px-4 mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-primary">Our Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <Card className="border border-border rounded-xl flex flex-col gap-4 hover:shadow-lg h-full">
                <CardHeader className="flex flex-col items-center gap-4">
                  <motion.div
                    className="bg-primary/10 p-3 rounded-full"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 1 }}
                  >
                    {mission.icon}
                  </motion.div>
                  <CardTitle className="text-lg font-semibold">
                    {mission.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {mission.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container px-4 mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-primary">Meet the Team</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
          Our dedicated team works hard to bring you the best tools, resources,
          and insights to simplify your financial journey.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <Card
              key={idx}
              className="hover:shadow-lg transition flex flex-col items-center"
            >
              <CardHeader className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={member.image} />
                  <AvatarFallback>{member.fallback}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg ">{member.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-center">
                {member.role}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

const missions = [
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "Empower Users",
    description:
      "Helping users take control of their finances with clarity and confidence.",
  },
  {
    icon: <Briefcase className="w-6 h-6 text-primary" />,
    title: "Simplify Finance",
    description:
      "Making complex financial concepts easy to understand for everyone.",
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Build Community",
    description:
      "Creating a space where people share, learn, and grow together.",
  },
]

const team = [
  {
    name: "Sushanto Kumar",
    role: "Founder & Developer",
    image: "https://i.pravatar.cc/300?img=12",
    fallback: "SK",
  },
  {
    name: "Team Member",
    role: "Finance Expert",
    image: "https://i.pravatar.cc/300?img=32",
    fallback: "TM",
  },
  {
    name: "Team Member",
    role: "Content Strategist",
    image: "https://i.pravatar.cc/300?img=45",
    fallback: "CM",
  },
]
