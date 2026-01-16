import React from "react";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Footer = () => {
  const links = [
    { title: "Home", href: "/" },
    { title: "Questions", href: "/questions" },
    { title: "About", href: "/about" },
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Terms of Service", href: "/terms-of-service" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-background py-16">
      <div className="container mx-auto px-4 relative z-10">

        {/* TOP SECTION */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

          {/* BRAND */}
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                DevOverflow
              </span>
            </h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              A community-driven platform to ask questions, share knowledge,
              and grow together as developers.
            </p>
          </div>

          {/* NAV LINKS */}
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* DIVIDER */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* BOTTOM */}
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} DevOverflow. Built by developers, for developers.
        </div>
      </div>

      {/* BACKGROUND ANIMATION */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.35}
        duration={3}
        repeatDelay={1}
        className={cn(
          "pointer-events-none absolute inset-0",
          "[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
        )}
      />
    </footer>
  );
};

export default Footer;
