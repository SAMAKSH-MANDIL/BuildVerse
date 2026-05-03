"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 bg-black relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-muted">
        <div className="mb-6 md:mb-0">
          <Link href="/" className="font-heading text-2xl tracking-tighter text-white">
            CONCLAVE<span className="text-accent-purple">&apos;26</span>
          </Link>
          <p className="mt-2">Defining the trajectory of human progress.</p>
        </div>
        
        <div className="flex space-x-6 uppercase tracking-wider font-mono text-xs">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
