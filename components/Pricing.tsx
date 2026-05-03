"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Pricing() {
  const barcodeWidths = [2, 4, 2, 2, 4, 3, 2, 4, 2, 3, 4, 2, 2, 4, 3, 2, 4, 2, 3, 2];
  const plans = [
    {
      name: "Standard Pass",
      price: "$899",
      features: ["Full 3-Day Access", "Main Stage Keynotes", "Networking Lounge", "Digital Resources"],
      highlight: false
    },
    {
      name: "VIP Pass",
      price: "$1,499",
      features: ["Everything in Standard", "Exclusive VIP Dinner", "1-on-1 Speaker Meets", "Front-Row Seating"],
      highlight: true
    }
  ];

  return (
    <section id="tickets" className="py-32 px-6 relative z-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-5xl md:text-7xl uppercase mb-16 text-center">Secure Your <br/><span className="text-accent-orange">Access</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`relative glass rounded-[24px] p-8 flex flex-col h-full overflow-hidden ${
                plan.highlight ? 'border-accent-orange/50 glow-orange' : 'border-white/10'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent-orange to-accent-pink" />
              )}
              
              <h3 className="font-heading text-3xl uppercase mb-2">{plan.name}</h3>
              <div className="text-4xl font-mono text-white mb-8">{plan.price}</div>
              
              <ul className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center space-x-3 text-muted">
                    <Check size={18} className={plan.highlight ? 'text-accent-orange' : 'text-white'} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-full font-bold uppercase tracking-wider transition-transform hover:scale-105 ${
                plan.highlight 
                  ? 'bg-white text-black' 
                  : 'bg-transparent border border-white/20 text-white hover:bg-white/10'
              }`}>
                Buy Ticket
              </button>

              {/* Barcode graphic simulation */}
              <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-end opacity-50">
                <div className="flex gap-1 h-8">
                  {barcodeWidths.map((width, k) => (
                    <div key={k} className="bg-white" style={{ width: `${width}px`, height: '100%' }} />
                  ))}
                </div>
                <div className="font-mono text-xs uppercase tracking-widest">
                  ADM-2601
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
