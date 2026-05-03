"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background gradients mimicking digital art */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-accent-purple/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] bg-accent-pink/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vw] bg-accent-indigo/30 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark overlay */}
      </div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-block border border-white/20 rounded-full px-4 py-1.5 mb-8 text-xs font-mono tracking-widest text-white/80 uppercase"
        >
          Sep 18-20 / San Francisco
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-heading text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85] tracking-tighter mb-6"
        >
          The Future <br />
          <span className="text-gradient bg-gradient-to-r from-accent-purple via-accent-pink to-accent-orange">
            Unfolds
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted max-w-2xl mb-10 font-medium"
        >
          Join the brightest minds in AI, Robotics, and Space Exploration for a three-day summit that will redefine tomorrow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <a href="#tickets" className="glow-purple bg-white text-black font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform inline-block">
            Reserve Your Spot
          </a>
        </motion.div>
      </div>
    </section>
  );
}
