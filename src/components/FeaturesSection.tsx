'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { featuresData } from '@/data/garageData';

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-[#F5F5F5] text-[#111111] relative z-20 border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5E5] pb-8 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#CC0000]" />
              <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-[#CC0000] uppercase">
                ENGINEERING EXCELLENCE
              </span>
            </div>
            <h2 className="font-orbitron font-black text-3xl md:text-5xl tracking-tight text-[#111111] uppercase">
              WORKSHOP CAPABILITIES
            </h2>
          </div>
          <p className="font-rajdhani text-base md:text-lg text-[#666666] max-w-md font-medium">
            Purpose-built workshop stations designed to optimize aerodynamic balance, thermal endurance, precision chassis geometry, and powertrain health.
          </p>
        </div>

        {/* Features 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuresData.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 md:p-10 bg-white border border-[#E5E5E5] hover:border-[#0066FF] transition-all duration-300 relative space-y-6 shadow-sm hover:shadow-md"
            >
              {/* Feature Header */}
              <div className="flex items-center justify-between">
                <span className="font-orbitron font-black text-3xl text-[#0066FF]">
                  {feature.id}
                </span>
                <span className="font-orbitron text-xs font-bold tracking-widest text-[#666666] bg-[#F5F5F5] px-3 py-1 border border-[#E5E5E5]">
                  {feature.tag}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="font-orbitron font-bold text-xl md:text-2xl text-[#111111] group-hover:text-[#0066FF] transition-colors uppercase">
                  {feature.title}
                </h3>
                <p className="font-rajdhani text-base text-[#666666] leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>

              {/* Motorsport Tri-color Accent Bar on Hover */}
              <div className="pt-4 flex items-center space-x-1 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                <span className="h-1 w-8 bg-[#0066FF]" />
                <span className="h-1 w-8 bg-[#0048C9]" />
                <span className="h-1 w-8 bg-[#CC0000]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
