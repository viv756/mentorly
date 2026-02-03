"use client";

import { motion, type Variants, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Award,
  Facebook,
  Github,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Target,
  Twitter,
  Users,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/store";

// Glowy Waves Hero
type Point = {
  x: number;
  y: number;
};

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

const highlightPills = [
  "Real time mentoring",
  "Interactive sessions",
  "Seamless performance",
] as const;

const heroStats: { label: string; value: string }[] = [
  { label: "Active mentors", value: "320+" },
  { label: "Avg response time", value: "8s" },
  { label: "Learners onboarded", value: "1.2k+" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const statsVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 },
  },
};

function GlowyWavesHero() {
  const user = useAuthStore();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let animationId: number;
    let time = 0;

    const computeThemeColors = () => {
      const rootStyles = getComputedStyle(document.documentElement);

      // Helper to convert any CSS color to a Canvas-compatible format
      const resolveColor = (variables: string[], alpha = 1) => {
        // Create a temporary element to get computed color
        const tempEl = document.createElement("div");
        tempEl.style.position = "absolute";
        tempEl.style.visibility = "hidden";
        tempEl.style.width = "1px";
        tempEl.style.height = "1px";
        document.body.appendChild(tempEl);

        let color = `rgba(255, 255, 255, ${alpha})`;

        for (const variable of variables) {
          const value = rootStyles.getPropertyValue(variable).trim();
          if (value) {
            // Try to set the background color using the CSS variable
            tempEl.style.backgroundColor = `var(${variable})`;
            const computedColor = getComputedStyle(tempEl).backgroundColor;

            if (computedColor && computedColor !== "rgba(0, 0, 0, 0)") {
              // Convert RGB to RGBA with alpha if needed
              if (alpha < 1) {
                const rgbMatch = computedColor.match(
                  /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/,
                );
                if (rgbMatch) {
                  color = `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${alpha})`;
                } else {
                  color = computedColor;
                }
              } else {
                color = computedColor;
              }
              break;
            }
          }
        }

        document.body.removeChild(tempEl);
        return color;
      };

      return {
        backgroundTop: resolveColor(["--background"], 1),
        backgroundBottom: resolveColor(["--muted", "--background"], 0.95),
        wavePalette: [
          {
            offset: 0,
            amplitude: 70,
            frequency: 0.003,
            color: resolveColor(["--primary"], 0.8),
            opacity: 0.45,
          },
          {
            offset: Math.PI / 2,
            amplitude: 90,
            frequency: 0.0026,
            color: resolveColor(["--accent", "--primary"], 0.7),
            opacity: 0.35,
          },
          {
            offset: Math.PI,
            amplitude: 60,
            frequency: 0.0034,
            color: resolveColor(["--secondary", "--foreground"], 0.65),
            opacity: 0.3,
          },
          {
            offset: Math.PI * 1.5,
            amplitude: 80,
            frequency: 0.0022,
            color: resolveColor(["--primary-foreground", "--foreground"], 0.25),
            opacity: 0.25,
          },
          {
            offset: Math.PI * 2,
            amplitude: 55,
            frequency: 0.004,
            color: resolveColor(["--foreground"], 0.2),
            opacity: 0.2,
          },
        ] satisfies WaveConfig[],
      };
    };

    let themeColors = computeThemeColors();

    const handleThemeMutation = () => {
      themeColors = computeThemeColors();
    };

    const observer = new MutationObserver(handleThemeMutation);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mouseInfluence = prefersReducedMotion ? 10 : 70;
    const influenceRadius = prefersReducedMotion ? 160 : 320;
    const smoothing = prefersReducedMotion ? 0.04 : 0.1;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const recenterMouse = () => {
      const centerPoint = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = centerPoint;
      targetMouseRef.current = centerPoint;
    };

    const handleResize = () => {
      resizeCanvas();
      recenterMouse();
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseLeave = () => {
      recenterMouse();
    };

    resizeCanvas();
    recenterMouse();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();

      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / influenceRadius);
        const mouseEffect =
          influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) +
          mouseEffect;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 35;
      ctx.shadowColor = wave.color;
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      time += 1;

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, themeColors.backgroundTop);
      gradient.addColorStop(1, themeColors.backgroundBottom);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      themeColors.wavePalette.forEach(drawWave);

      animationId = window.requestAnimationFrame(animate);
    };

    animationId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-background"
      role="region"
      aria-label="Glowing waves hero section">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-130 w-130 -translate-x-1/2 rounded-full bg-foreground/[0.035] blur-[140px] dark:bg-foreground/6" />
        <div className="absolute bottom-0 right-0 h-90 w-90 rounded-full bg-foreground/2.5 blur-[120px] dark:bg-foreground/5" />
        <div className="absolute top-1/2 left-1/4 h-100 w-100 rounded-full bg-primary/2 blur-[150px] dark:bg-primary/5" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center md:px-8 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full">
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/70 dark:border-border/60 dark:bg-background/70 dark:text-foreground/80">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
            Reactive Mentoring Canvas
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Welcome to immersive{" "}
            <span className="bg-linear-to-r from-primary via-primary/60 to-foreground/80 bg-clip-text text-transparent">
              realtime mentoring experiences.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-10 max-w-3xl text-lg text-foreground/70 md:text-2xl">
            Power adaptive mentoring environments with structured guidance, live collaboration, and
            data driven growth unified in a single platform.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {user ? (
              <>
                <Link to={"/overview"}>
                  <Button
                    size="lg"
                    className="group gap-2 rounded-full px-8 text-base uppercase tracking-[0.2em]">
                    Go to Dashboard
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Button>
                </Link>
                <Link to={"/find-people"}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-border/40 bg-background/60 px-8 text-base text-foreground/80 backdrop-blur transition-all hover:border-border/60 hover:bg-background/70 dark:border-border/50 dark:bg-background/40 dark:text-foreground/70 dark:hover:border-border/70 dark:hover:bg-background/50">
                    Explore learning
                  </Button>
                </Link>
              </>
            ) : (
              <Button
                disabled
                size="lg"
                className="group gap-2 rounded-full px-8 text-base uppercase tracking-[0.2em]">
                Go to Dashboard
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1 disabled:bg-secondary"
                  aria-hidden="true"
                />
              </Button>
            )}
          </motion.div>

          <motion.ul
            variants={itemVariants}
            className="mb-12 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-foreground/70 dark:text-foreground/80">
            {highlightPills.map((pill) => (
              <li
                key={pill}
                className="rounded-full border border-border/40 bg-background/60 px-4 py-2 backdrop-blur dark:border-border/60 dark:bg-background/70">
                {pill}
              </li>
            ))}
          </motion.ul>

          <motion.div
            variants={statsVariants}
            className="grid gap-4 rounded-2xl border border-border/30 bg-background/60 p-6 backdrop-blur-sm dark:border-border/60 dark:bg-background/70 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <motion.div key={stat.label} variants={itemVariants} className="space-y-1">
                <div className="text-xs uppercase tracking-[0.3em] text-foreground/50 dark:text-foreground/60">
                  {stat.label}
                </div>
                <div className="text-3xl font-semibold text-foreground">{stat.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// About Us

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
      "Trust, transparency, inclusivity, and a deep commitment to personal and professional growth.",
  },
];

function AboutUsSection() {
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

// Footer Block
const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Documentation", "API Reference"],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Blog", "Press Kit"],
  },
  {
    title: "Resources",
    links: ["Community", "Help Center", "Partners", "Status"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookie Policy", "Licenses"],
  },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "/" },
  { icon: Facebook, label: "Facebook", href: "/" },
  { icon: Instagram, label: "Instagram", href: "/" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/vr-vivek" },
  { icon: Github, label: "GitHub", href: "https://github.com/viv756" },
];

function FooterBlock() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shouldReduceMotion = useReducedMotion();

  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative w-full overflow-hidden border-t border-border bg-card/90 backdrop-blur-xl">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-[160px]"
          animate={
            shouldReduceMotion ? undefined : { opacity: [0.2, 0.45, 0.2], scale: [0.9, 1.05, 0.95] }
          }
          transition={
            shouldReduceMotion ? undefined : { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute -bottom-36 right-0 h-96 w-96 rounded-full bg-[hsl(var(--primary)/0.18)] blur-[200px]"
          animate={
            shouldReduceMotion ? undefined : { opacity: [0.18, 0.4, 0.18], rotate: [0, 25, 0] }
          }
          transition={
            shouldReduceMotion ? undefined : { duration: 16, repeat: Infinity, ease: "linear" }
          }
        />
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2">
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="mb-4 inline-flex items-center gap-3">
              <Card className="rounded-2xl border border-border/60 bg-card/80 px-3 py-1 text-sm uppercase tracking-[0.32em] text-muted-foreground shadow-[0_10px_30px_-20px_rgba(15,23,42,0.8)]">
                Mentorly
              </Card>
              <Badge variant="outline" className="text-sm text-muted-foreground">
                Since 2026
              </Badge>
            </motion.div>
            <p className="mb-4 max-w-md text-md text-muted-foreground">
              Building meaningful mentorship experiences with modern technology. Join us on our
              mission to help learners and mentors connect, grow, and succeed.
            </p>

            {/* Newsletter */}
            <div className="mb-4">
              <p className="mb-2 text-md font-medium text-foreground">
                Subscribe to our newsletter
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-10 rounded-xl border-border/60 bg-background/60 backdrop-blur placeholder:text-muted-foreground"
                />
                <Button
                  size="sm"
                  className="h-10 rounded-xl border border-border/60 bg-primary/90 px-4 text-primary-foreground shadow-[0_12px_35px_-20px_rgba(15,23,42,0.7)] hover:bg-primary"
                  aria-label="Subscribe">
                  <Mail className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { x: 5 }}
                className="flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden />
                <span className="text-md">Thrissur, Kerala, India</span>
              </motion.div>
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { x: 5 }}
                className="flex items-center gap-2">
                <Phone className="h-4 w-4" aria-hidden />
                <span className="text-md">9074071639</span>
              </motion.div>
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { x: 5 }}
                className="flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden />
                <span className="text-md">vrvivekofficial@gmail.com</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}>
              <h4 className="mb-4 text-md font-semibold text-foreground/90">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: linkIndex * 0.05 }}>
                    <motion.a
                      href="#"
                      whileHover={
                        shouldReduceMotion ? undefined : { x: 5, color: "hsl(var(--primary))" }
                      }
                      className="text-md text-muted-foreground transition-colors hover:text-foreground">
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
     

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row mt-10 ">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex gap-2">
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.label}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.6 + index * 0.05,
                }}>
                <Link to={social.href}>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-12 w-12 rounded-full border border-border/60 bg-white/5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    aria-label={social.label}>
                    <motion.div transition={{ duration: shouldReduceMotion ? 0.25 : 0.3 }}>
                      <social.icon className="h-4 w-4" aria-hidden />
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-md">© 2026 Brand. All rights reserved.</span>
            <Badge variant="outline" className="text-xs">
              v1.0.0
            </Badge>
          </motion.div>

          {/* Scroll to Top */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}>
            <Button
              size="icon"
              variant="outline"
              className="h-9 w-9 rounded-full border-border/60"
              onClick={scrollToTop}>
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -3, 0] }}
                transition={shouldReduceMotion ? undefined : { repeat: Infinity, duration: 1.5 }}>
                <ArrowUp className="h-4 w-4" aria-hidden />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <div className="mx-auto pt-12">
      <div className="mx-auto  space-y-12">
        {/* Glowy Waves Hero */}
        <section>
          <GlowyWavesHero />
        </section>

        {/* About Us */}
        <section>
          <AboutUsSection />
        </section>

        {/* Footer Block */}
        <section>
          <FooterBlock />
        </section>
      </div>
    </div>
  );
}
