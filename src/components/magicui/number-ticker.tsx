"use client";

import { cn } from "@/lib/utils";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type NumberTickerProps = {
  value: number;
  className?: string;
};

export default function NumberTicker({
  value,
  className,
}: NumberTickerProps) {
  // Motion value always starts from the real value (SSR-safe)
  const motionValue = useMotionValue(value);

  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  // React-controlled display value (NO DOM mutation)
  const [displayValue, setDisplayValue] = useState(value);

  // Sync motion value whenever prop changes
  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  // Update display value from animation
  useEffect(() => {
    return springValue.on("change", latest => {
      setDisplayValue(Math.round(latest));
    });
  }, [springValue]);

  return (
    <span
      className={cn(
        "inline-block tabular-nums text-black dark:text-white",
        className
      )}
    >
      {Intl.NumberFormat("en-US").format(displayValue)}
    </span>
  );
}