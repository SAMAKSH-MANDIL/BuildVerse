"use client";

import { motion } from "framer-motion";
import { Cpu, Rocket, Brain } from "lucide-react";

export default function Highlights() {
  return (
    <section className="py-32 px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-5xl md:text-7xl uppercase mb-6">The Trinity of <br/><span className="text-accent-purple">Tomorrow</span></h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">Three core tracks designed to push the boundaries of what&apos;s possible.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {/* Main vertical card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1 md:row-span-3 glass rounded-[32px] p-8 flex flex-col justify-end relative overflow-hidden group min-h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-accent-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="font-heading text-4xl uppercase mb-4 relative z-10">Cross-Disciplinary<br/>Convergence</h3>
            <p className="text-muted relative z-10">Where these fields intersect is where the true magic happens.</p>
          </motion.div>

          {/* Three smaller cards */}
          {[
            { title: "Artificial Intelligence", desc: "Sentience, AGI, and the ethical frontiers.", icon: Brain, color: "text-accent-pink" },
            { title: "Advanced Robotics", desc: "Automation, biomechatronics, and physical labor.", icon: Cpu, color: "text-accent-cyan" },
            { title: "Space Exploration", desc: "Multi-planetary habitation and orbital tech.", icon: Rocket, color: "text-accent-orange" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="md:col-span-2 glass rounded-[24px] p-8 flex items-center space-x-6 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className={`p-4 rounded-full bg-white/5 border border-white/10 ${item.color}`}>
                <item.icon size={32} />
              </div>
              <div>
                <h4 className="font-heading text-2xl uppercase mb-2">{item.title}</h4>
                <p className="text-muted">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
