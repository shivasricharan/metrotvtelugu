"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function FadeIn({ children, delay = 0, y = 18, className = "" }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: Math.min(delay, 0.12),
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
    >
      {children}
    </motion.div>
  );
}