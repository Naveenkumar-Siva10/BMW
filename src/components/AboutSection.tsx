'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShieldCheck, Cpu, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { soundEngine } from '@/utils/audio';

interface AboutSectionProps {
  onOpenBookService: () => void;
}

export default function AboutSection({ onOpenBookService }: AboutSectionProps) {
  const coreValues = [
    {
      title: 'Automotive Precision',
      desc: 'Obsessive attention to manufacturer torque values, laser tolerances, and fluid cleanliness.',
      icon: Cpu,
    },
    {
      title: 'Professional Service',
      desc: 'Transparent digital job tracking, honest consultation, and expert mechanical craftsmanship.',
      icon: ShieldCheck,
    },
    {
      title: 'Customer Trust',
      desc: 'No hidden surcharges. Clear photographic inspections and upfront diagnostic walkarounds.',
      icon: Award,
    },
    {
      title: 'Quality Workmanship',
      desc: 'Only genuine OEM spare parts, synthetic European lubricants, and factory-grade equipment.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="about-section" className="py-24 px-6 bg-white text-[#111111] relative z-20 border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5E5] pb-8 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#0066FF]" />
              <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-[#0066FF] uppercase">
                THE NAVEEN GARAGE STANDARD
              </span>
            </div>
            <h2 className="font-orbitron font-black text-3xl md:text-5xl tracking-tight text-[#111111] uppercase">
              ABOUT NAVEEN GARAGE
            </h2>
          </div>
          <p className="font-rajdhani text-base md:text-lg text-[#666666] max-w-lg font-medium leading-relaxed">
            Founded on the principles of racing precision, honest customer consultation, and uncompromising mechanical standards.
          </p>
        </div>

        {/* Content Layout: Left Story + Right Real Car Image Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Values */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-orbitron font-extrabold text-2xl md:text-3xl text-[#111111] uppercase leading-snug">
                WHERE MOTORSPORT PRECISION MEETS COMMERCIAL CARE.
              </h3>
              <p className="font-rajdhani text-base md:text-lg text-[#666666] leading-relaxed font-medium">
                Modern high-performance and daily passenger vehicles require more than conventional wrenching. Today’s sophisticated multi-link suspensions, twin-turbo forced induction engines, and CAN-bus sensor networks demand digital diagnostics, laser alignment accuracy, and sterile mechanical hygiene.
              </p>
              <p className="font-rajdhani text-base md:text-lg text-[#666666] leading-relaxed font-medium">
                At <strong className="text-[#111111] font-bold">Naveen Garage</strong>, we treat every vehicle that enters our facility with the same methodical rigor used by racing pit crews. Whether you require a routine periodic service or complex engine blueprinting, your car receives genuine OEM components, factory-spec calibrations, and complete diagnostic accountability.
              </p>
            </div>

            {/* Core Values 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {coreValues.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="p-4 bg-[#F5F5F5] border border-[#E5E5E5] hover:border-[#0066FF] transition-all space-y-2 group"
                  >
                    <div className="flex items-center space-x-2 text-[#0066FF]">
                      <Icon className="w-5 h-5" />
                      <span className="font-orbitron font-bold text-xs uppercase text-[#111111] group-hover:text-[#0066FF] transition-colors">
                        {val.title}
                      </span>
                    </div>
                    <p className="font-rajdhani text-xs text-[#666666] leading-relaxed font-medium">
                      {val.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenBookService();
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="px-6 py-3 bg-[#0066FF] hover:bg-[#0048C9] text-white font-orbitron text-xs font-bold tracking-widest uppercase transition-all flex items-center space-x-2 shadow-sm"
              >
                <span>EXPERIENCE THE WORKSHOP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Real Car Asset Image Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative border border-[#E5E5E5] bg-[#F5F5F5] p-2 shadow-xl group overflow-hidden">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-white">
                <Image
                  src="/images/car-exterior.png"
                  alt="Naveen Garage Automotive Benchmark Visual"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Image Footer Caption */}
              <div className="p-4 bg-white border-t border-[#E5E5E5] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#CC0000]" />
                  <span className="font-orbitron text-[10px] font-bold text-[#111111] uppercase tracking-wider">
                    PRECISION SERVICE & CHASSIS ENGINEERING
                  </span>
                </div>
                <span className="font-orbitron text-[10px] text-[#0066FF] font-bold uppercase">
                  NAVEEN GARAGE BENCHMARK
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
