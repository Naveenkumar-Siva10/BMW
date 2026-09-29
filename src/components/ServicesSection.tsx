'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { garageData, GarageService } from '@/data/garageData';
import { soundEngine } from '@/utils/audio';
import { 
  Wrench, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Gauge, 
  Battery, 
  Snowflake, 
  ShieldAlert, 
  Droplet, 
  Search 
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceTitle: string) => void;
}

const serviceIcons: Record<string, React.ElementType> = {
  'general-service': Wrench,
  'periodic-maintenance': Clock,
  'ac-service': Snowflake,
  'engine-diagnostics': Cpu,
  'brake-service': ShieldAlert,
  'oil-filter-change': Droplet,
  'battery-service': Battery,
  'wheel-alignment': Gauge,
  'car-detailing': Sparkles,
  'car-inspection': Search,
};

export default function ServicesSection({ onSelectServiceToBook }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'ALL SERVICES (10)' },
    { id: 'MAINTENANCE', label: 'MAINTENANCE' },
    { id: 'DIAGNOSTICS', label: 'DIAGNOSTICS & ELECTRICAL' },
    { id: 'PERFORMANCE', label: 'BRAKES & SUSPENSION' },
    { id: 'DETAILING', label: 'DETAILING' },
  ];

  const filteredServices =
    activeCategory === 'ALL'
      ? garageData.services
      : garageData.services.filter((s) => s.category === activeCategory);

  return (
    <section id="services-section" className="py-24 px-6 bg-[#F5F5F5] text-[#111111] relative z-20 border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5E5] pb-8 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#0066FF]" />
              <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-[#0066FF] uppercase">
                EXPERT AUTOMOTIVE SOLUTIONS
              </span>
            </div>
            <h2 className="font-orbitron font-black text-3xl md:text-5xl tracking-tight text-[#111111] uppercase">
              PROFESSIONAL GARAGE SERVICES
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 border border-[#E5E5E5]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`px-3.5 py-1.5 font-orbitron text-xs font-bold tracking-wider transition-all duration-200 uppercase ${
                  activeCategory === cat.id
                    ? 'bg-[#0066FF] text-white shadow-xs'
                    : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredServices.map((service, index) => {
              const IconComponent = serviceIcons[service.id] || Wrench;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-white border border-[#E5E5E5] hover:border-[#0066FF] p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden"
                >
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-12 h-12 bg-[#F5F5F5] group-hover:bg-[#0066FF] text-[#0066FF] group-hover:text-white flex items-center justify-center transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-orbitron text-[10px] font-bold tracking-widest text-[#666666] bg-[#F5F5F5] px-2.5 py-1 border border-[#E5E5E5]">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="font-orbitron font-extrabold text-lg md:text-xl text-[#111111] group-hover:text-[#0066FF] transition-colors uppercase">
                      {service.title}
                    </h3>
                    <p className="font-rajdhani text-sm text-[#666666] leading-relaxed font-medium">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Key Deliverables Bullet Points */}
                  <div className="space-y-1.5 border-t border-[#E5E5E5] pt-4">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs font-rajdhani text-[#555555] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Duration & Warranty Footer */}
                  <div className="bg-[#F5F5F5] p-3 border border-[#E5E5E5] flex items-center justify-between text-[11px] font-orbitron text-[#666666]">
                    <span>⏱ {service.estimatedDuration}</span>
                    <span className="text-[#0066FF] font-bold">{service.warranty}</span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      onSelectServiceToBook(service.title);
                    }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="w-full py-2.5 bg-white group-hover:bg-[#0066FF] text-[#111111] group-hover:text-white border border-[#E5E5E5] group-hover:border-[#0066FF] font-orbitron text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>BOOK THIS SERVICE</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-2 h-2 bg-[#E5E5E5] group-hover:bg-[#0066FF] transition-colors" />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
