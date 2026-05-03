"use client";

import { motion } from "framer-motion";

export default function Speakers() {
  // Using placehold.co or simple colored divs with names to mimic portraits
  const speakers = [
    { name: "Dr. Elara Vance", role: "Head of AI, Nexus Core" },
    { name: "Marcus Chen", role: "Founder, Orbital Dynamics" },
    { name: "Sarah Jenkins", role: "Lead Engineer, SynthCorp" },
    { name: "David Alaba", role: "Ethicist, Future Institute" },
    { name: "Elena Rostova", role: "Chief Roboticist, Automata" },
    { name: "James Holden", role: "Captain, Rocinante Ventures" },
  ];

  return (
    <section id="speakers" className="py-32 px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2 className="font-heading text-5xl md:text-7xl uppercase">The <br/><span className="text-accent-pink">Visionaries</span></h2>
          <p className="text-muted max-w-sm mt-6 md:mt-0 md:text-right">Hear from the pioneers who are actively building the world of tomorrow.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-square bg-white/5 border border-white/10 rounded-[24px] mb-6 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                {/* Simulated portrait background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay" />
                <div className="absolute inset-0 flex items-center justify-center opacity-20 font-heading text-9xl">
                  {speaker.name.charAt(0)}
                </div>
              </div>
              <h3 className="font-heading text-2xl uppercase mb-1">{speaker.name}</h3>
              <p className="text-accent-pink text-sm uppercase tracking-wider">{speaker.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
