"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "300+", label: "Visionary Builders" },
  { value: "50+", label: "Keynote Sessions" },
  { value: "3", label: "Days of Innovation" },
  { value: "1", label: "Global Movement" },
];

export default function Stats() {
  return (
    <section className="py-20 px-6 border-y border-white/10 bg-black/50 backdrop-blur-sm relative z-20">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="font-heading text-4xl md:text-5xl lg:text-6xl mb-2 text-white">
              {stat.value}
            </div>
            <div className="text-sm md:text-base text-muted font-medium uppercase tracking-wider">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
