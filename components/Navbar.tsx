"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4"
    >
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-heading text-xl tracking-tighter">
          CONCLAVE<span className="text-accent-purple">&apos;26</span>
        </Link>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted">
          <Link href="#speakers" className="hover:text-white transition-colors">Speakers</Link>
          <Link href="#schedule" className="hover:text-white transition-colors">Schedule</Link>
          <Link href="#tickets" className="hover:text-white transition-colors">Tickets</Link>
        </div>
        <Link 
          href="#tickets"
          className="bg-white text-black font-semibold text-sm px-5 py-2 rounded-full hover:scale-105 transition-transform"
        >
          Get Tickets
        </Link>
      </div>
    </motion.nav>
  );
}
