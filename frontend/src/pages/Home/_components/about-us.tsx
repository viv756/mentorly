import { motion, type Variants } from "framer-motion";
import { Award, Heart, Target, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To make mentorship accessible and impactful by connecting learners with the right guidance at the right time.",
  },
  {
    icon: Users,
    title: "Our Community",
    description:
      "A growing network of mentors and learners collaborating to share knowledge and grow together.",
  },
  {
    icon: Award,
    title: "Gamification Experience",
    description:
      "Engage with our badge system and achievement tracking to make learning and mentorship fun, rewarding, and motivating.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Trust, transparency, inclusively, and a deep commitment to personal and professional growth.",
  },
];

export function AboutUsSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-background px-4 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center">
          <Badge className="mb-4">About Us</Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">Who We Are</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We are passionate professionals dedicated to empowering growth through meaningful
            mentorship, real-time guidance, and continuous learning.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div key={value.title} variants={itemVariants}>
                <Card className="group h-full border-2 p-6 transition-all hover:border-primary hover:shadow-lg">
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 rounded-lg border-2 border-primary/20 bg-primary/5 p-8 text-center">
          <h3 className="mb-4 text-2xl font-bold">Join Our Mission</h3>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We're always looking for passionate mentors and learners to be part of our community.
            Help us build meaningful mentorship experiences that make growth accessible to everyone.
          </p>
        </motion.div>
      </div>
    </section>
  );
}