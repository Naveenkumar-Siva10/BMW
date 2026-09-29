'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { whyChooseUsData } from '@/data/garageData';
import { ShieldCheck, MessageSquare, PackageCheck, Cpu, Sparkles, Clock } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  MessageSquare,
  PackageCheck,
  Cpu,
  Sparkles,
  Clock,
};

export default function WhyChooseUsSection() {
  return (
    <section id="why-us-section" className="py-24 px-6 bg-white text-[#111111] relative z-20 border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5E5] pb-8 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#0066FF]" />
              <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-[#0066FF] uppercase">
                THE CUSTOMER COMMITMENT
              </span>
            </div>
            <h2 className="font-orbitron font-black text-3xl md:text-5xl tracking-tight text-[#111111] uppercase">
              WHY CHOOSE NAVEEN GARAGE
            </h2>
          </div>
          <p className="font-rajdhani text-base md:text-lg text-[#666666] max-w-md font-medium leading-relaxed">
            Real customer-facing advantages built around clarity, mechanical excellence, and transparent vehicle care.
          </p>
        </div>

        {/* 6 Benefit Cards in 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUsData.map((item, index) => {
            const Icon = iconMap[item.icon] || ShieldCheck;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group p-8 bg-[#F5F5F5] border border-[#E5E5E5] hover:border-[#0066FF] hover:bg-white transition-all duration-300 space-y-4 shadow-xs hover:shadow-md relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-white group-hover:bg-[#0066FF] text-[#0066FF] group-hover:text-white border border-[#E5E5E5] flex items-center justify-center transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-orbitron text-xs font-bold text-[#AAAAAA] group-hover:text-[#0066FF] transition-colors">
                    0{index + 1}
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="font-orbitron font-bold text-lg text-[#111111] group-hover:text-[#0066FF] transition-colors uppercase">
                    {item.title}
                  </h3>
                  <p className="font-rajdhani text-sm text-[#666666] leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Subtle Accent Bottom Stripe */}
                <div className="w-full bg-[#E5E5E5] h-0.5 relative overflow-hidden pt-2">
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#0066FF] group-hover:w-full transition-all duration-300 ease-out" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
