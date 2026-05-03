"use client";

import { motion } from "framer-motion";

export default function Schedule() {
  const days = [
    {
      date: "Sep 18",
      title: "The State of AI",
      events: [
        { time: "09:00 AM", title: "Opening Keynote: The AGI Horizon", speaker: "Dr. Elara Vance" },
        { time: "11:30 AM", title: "Panel: Ethics in Machine Sentience", speaker: "David Alaba & Guests" },
        { time: "02:00 PM", title: "Workshop: Building Autonomous Agents", speaker: "Sarah Jenkins" },
      ]
    },
    {
      date: "Sep 19",
      title: "Robotics & Physical Labor",
      events: [
        { time: "10:00 AM", title: "Humanoid Robotics at Scale", speaker: "Elena Rostova" },
        { time: "01:00 PM", title: "The Brain-Computer Interface", speaker: "NeuralTech Team" },
        { time: "04:00 PM", title: "Fireside Chat: The End of Work?", speaker: "Industry Leaders" },
      ]
    }
  ];

  return (
    <section id="schedule" className="py-32 px-6 bg-black relative z-20 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-5xl md:text-7xl uppercase mb-20 text-center">The <span className="text-accent-cyan">Schedule</span></h2>

        <div className="space-y-16">
          {days.map((day, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-white/10 rounded-[32px] p-8 md:p-12 glass relative overflow-hidden"
            >
              {/* Decorative background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/10 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="flex flex-col md:flex-row gap-8 mb-12 border-b border-white/10 pb-8 relative z-10">
                <div className="font-mono text-accent-cyan text-xl border border-accent-cyan/30 rounded-full px-4 py-2 self-start">
                  {day.date}
                </div>
                <h3 className="font-heading text-4xl uppercase">{day.title}</h3>
              </div>

              <div className="space-y-8 relative z-10">
                {day.events.map((event, j) => (
                  <div key={j} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start group">
                    <div className="text-muted font-mono">{event.time}</div>
                    <div className="md:col-span-3">
                      <h4 className="font-heading text-xl uppercase mb-2 group-hover:text-accent-cyan transition-colors">{event.title}</h4>
                      <p className="text-muted text-sm">{event.speaker}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
