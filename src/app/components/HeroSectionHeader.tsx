"use client";

import IconCloud from "@/components/magicui/icon-cloud";
import Particles from "@/components/magicui/particles";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { useAuthStore } from "@/store/Auth";
import Link from "next/link";
import React from "react";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

const HeroSectionHeader = () => {
  const { session } = useAuthStore();

  return (
    <section className="relative overflow-hidden">
      {/* Background particles */}
      <Particles
        className="fixed inset-0 -z-10 h-full w-full"
        quantity={500}
        ease={100}
        color="#ffffff"
        refresh
      />

      {/* Hero container */}
      <div className="container mx-auto min-h-[80vh] px-4 flex items-center">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 w-full">

          {/* LEFT CONTENT */}
          <div className="flex items-start justify-center pt-16">
            <div className="space-y-6 text-center md:text-left max-w-xl">
              <h1 className="bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-transparent">
                DevOverflow
              </h1>

              <p className="text-lg md:text-xl font-medium text-neutral-700 dark:text-neutral-300">
                Ask questions, share knowledge, and collaborate with developers
                worldwide. Join our community and grow your coding skills.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                {session ? (
                  <Link href="/questions/ask">
                    <ShimmerButton className="shadow-xl">
                      <span className="text-sm lg:text-lg font-medium text-white">
                        Ask a question
                      </span>
                    </ShimmerButton>
                  </Link>
                ) : (
                  <>
                    <Link href="/register">
                      <ShimmerButton className="shadow-xl">
                        <span className="text-sm lg:text-lg font-medium text-white">
                          Sign up
                        </span>
                      </ShimmerButton>
                    </Link>

                    <Link
                      href="/login"
                      className="relative rounded-full border border-neutral-300 px-8 py-3 text-sm lg:text-lg font-medium text-neutral-800 dark:border-white/20 dark:text-white"
                    >
                      Login
                      <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex items-start justify-center pt-16">
            <div className="relative max-w-[28rem] w-full">
              <IconCloud iconSlugs={slugs} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSectionHeader;
