'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { specsData } from '@/data/garageData';
import { soundEngine } from '@/utils/audio';

const specCategories = [
  { id: 'WORKSHOP', label: 'WORKSHOP BENCHMARK' },
  { id: 'PERFORMANCE', label: 'PERFORMANCE & TELEMETRY' },
  { id: 'CHASSIS', label: 'CHASSIS & GEOMETRY' },
];

export default function SpecsGrid() {
  const [activeCategory, setActiveCategory] = useState<'WORKSHOP' | 'PERFORMANCE' | 'CHASSIS'>('WORKSHOP');

  const filteredSpecs =
    activeCategory === 'WORKSHOP'
      ? specsData
      : activeCategory === 'PERFORMANCE'
      ? [
          { label: '0-100 KM/H CALIBRATION', value: '2.8 SEC', detail: 'Endurance Clutch Launch Control' },
          { label: 'TOP SPEED CAPACITY', value: '295+ KM/H', detail: 'Aerodynamic Stability Package' },
          { label: 'MAX DOWNFORCE', value: '650 KG', detail: '@ 240 KM/H High-Speed Balance' },
          { label: 'LATERAL GRIP', value: '2.45 G', detail: 'Suspension Camber Optimization' },
          { label: 'BRAKING (200-0 KM/H)', value: '4.1 SEC', detail: '6-Piston AP / Brembo Setup' },
          { label: 'DIAGNOSTIC SCANNER', value: 'BOSCH MS 7.4', detail: 'Real-time CAN-Bus Telemetry' },
          { label: 'WEIGHT DISTRIBUTION', value: '50 : 50', detail: 'Corner Weight Scale Balancing' },
          { label: 'ENGINE TEST RIG', value: 'AWD DYNO', detail: 'Computerized Power Profiling' },
        ]
      : [
          { label: 'CHASSIS RIG LENGTH', value: '5,020 MM', detail: 'Extended Wheelbase Capacity' },
          { label: 'TOLERANCE RESOLUTION', value: '0.01 MM', detail: 'Sub-Millimeter Laser Cameras' },
          { label: 'LIFT MAXIMUM LOAD', value: '5,000 KG', detail: 'Commercial Hydraulic 2-Post & 4-Post' },
          { label: 'ALIGNMENT HEADS', value: '4-CAMERA 3D', detail: 'Hunter Engineering High-Definition' },
          { label: 'WHEEL DIAMETER', value: 'UP TO 24"', detail: 'Touchless Tire Mounting Machine' },
          { label: 'BRAKE LATHE', value: 'ON-CAR DIGITAL', detail: 'Eliminates Lateral Rotor Runout' },
          { label: 'FLUID PURGE SYSTEM', value: 'CLOSED-LOOP', detail: 'Zero Air Contamination Bleeding' },
          { label: 'STANDARDS', value: 'ISO / DIN', detail: 'Strict German Workshop Norms' },
        ];

  return (
    <section id="specs-section" className="py-24 px-6 bg-white text-[#111111] relative z-20 border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5E5] pb-8 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#0066FF]" />
              <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-[#0066FF] uppercase">
                TECHNICAL CAPABILITY & RIGOR
              </span>
            </div>
            <h2 className="font-orbitron font-black text-3xl md:text-5xl tracking-tight text-[#111111] uppercase">
              GARAGE SPECS & TELEMETRY
            </h2>
          </div>

          {/* Interactive Category Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#F5F5F5] p-1.5 border border-[#E5E5E5]">
            {specCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveCategory(cat.id as typeof activeCategory);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`px-4 py-2 font-orbitron text-xs font-bold tracking-wider transition-all duration-200 uppercase ${
                  activeCategory === cat.id
                    ? 'bg-[#0066FF] text-white shadow-sm'
                    : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8-Grid Specs Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredSpecs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative p-6 bg-[#F5F5F5] border border-[#E5E5E5] hover:border-[#0066FF] hover:bg-white transition-all duration-300 flex flex-col justify-between h-48 overflow-hidden shadow-xs hover:shadow-md"
              >
                {/* Top Accent Lines */}
                <div className="flex justify-between items-center text-xs font-orbitron text-[#666666]">
                  <span className="tracking-widest font-semibold">{spec.label}</span>
                  <span className="text-[#AAAAAA] group-hover:text-[#0066FF] transition-colors">
                    0{index + 1}
                  </span>
                </div>

                {/* Main Spec Value */}
                <div className="my-auto">
                  <div className="font-orbitron font-black text-2xl lg:text-3xl text-[#111111] group-hover:text-[#0066FF] transition-colors duration-300 tracking-tight">
                    {spec.value}
                  </div>
                  <div className="font-rajdhani text-xs md:text-sm text-[#666666] font-medium mt-1">
                    {spec.detail}
                  </div>
                </div>

                {/* Bottom Animated Blue/Red Underline */}
                <div className="w-full bg-[#E5E5E5] h-1 relative overflow-hidden mt-4">
                  <div className="absolute top-0 left-0 h-full w-0 bg-gradient-to-r from-[#0066FF] via-[#0048C9] to-[#CC0000] group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
