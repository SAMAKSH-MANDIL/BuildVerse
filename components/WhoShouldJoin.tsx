"use client";

import { motion } from "framer-motion";
import { Code2, PenTool, Lightbulb, TrendingUp } from "lucide-react";

export default function WhoShouldJoin() {
  const profiles = [
    { title: "Founders", desc: "Building the next generation of deep tech startups.", icon: TrendingUp },
    { title: "Engineers", desc: "Writing the code that runs the future.", icon: Code2 },
    { title: "Designers", desc: "Shaping how humans interact with advanced systems.", icon: PenTool },
    { title: "Researchers", desc: "Pushing the theoretical boundaries of science.", icon: Lightbulb },
  ];

  return (
    <section className="py-24 px-6 bg-black relative z-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl uppercase mb-12 text-center">Who Should Join?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {profiles.map((profile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-2xl text-center group hover:border-accent-purple/50 transition-colors"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-accent-purple/10 flex items-center justify-center mb-6 text-accent-purple group-hover:scale-110 transition-transform">
                <profile.icon size={32} />
              </div>
              <h3 className="font-heading text-xl uppercase mb-3">{profile.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{profile.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
