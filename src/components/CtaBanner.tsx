'use client';

import React from 'react';
import { garageData } from '@/data/garageData';
import { Calendar, Phone, MessageCircle } from 'lucide-react';
import { soundEngine } from '@/utils/audio';

interface CtaBannerProps {
  onOpenBookService: () => void;
}

export default function CtaBanner({ onOpenBookService }: CtaBannerProps) {
  const whatsappUrl = `https://wa.me/${garageData.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Naveen%20Garage,%20I%20would%20like%20to%20inquire%20about%20a%20service%20booking.`;

  return (
    <section className="py-20 px-6 bg-[#0066FF] text-white relative z-20 overflow-hidden">
      {/* Motorsport Background Accent Lines */}
      <div className="absolute top-0 right-0 w-96 h-full bg-[#0048C9] -skew-x-12 translate-x-32 pointer-events-none opacity-50" />
      <div className="absolute top-0 right-32 w-16 h-full bg-[#CC0000] -skew-x-12 pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
        {/* Left Copy */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center justify-center lg:justify-start space-x-2">
            <span className="w-2 h-2 bg-[#CC0000]" />
            <span className="font-orbitron text-xs font-bold tracking-widest text-white/90 uppercase">
              RESERVE YOUR SERVICE SLOT
            </span>
          </div>

          <h2 className="font-orbitron font-black text-3xl md:text-5xl uppercase tracking-tight text-white leading-tight">
            READY TO GIVE YOUR CAR THE CARE IT DESERVES?
          </h2>

          <p className="font-rajdhani text-base md:text-lg text-white/90 font-medium">
            Connect with our certified technicians today. We guarantee genuine OEM components, transparent diagnostics, and factory-grade care.
          </p>
        </div>

        {/* Right CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
          {/* Primary CTA */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenBookService();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-7 py-4 bg-white hover:bg-[#F5F5F5] text-[#111111] hover:text-[#0066FF] font-orbitron text-xs md:text-sm font-bold tracking-widest uppercase transition-all shadow-lg flex items-center space-x-2.5 active:scale-95"
          >
            <Calendar className="w-4 h-4 text-[#0066FF]" />
            <span>BOOK A SERVICE</span>
          </button>

          {/* Call Now */}
          <a
            href={`tel:${garageData.phone}`}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-6 py-4 bg-[#0048C9] hover:bg-[#0038A8] text-white border border-white/30 font-orbitron text-xs md:text-sm font-bold tracking-widest uppercase transition-all flex items-center space-x-2 active:scale-95 shadow-md"
          >
            <Phone className="w-4 h-4" />
            <span>CALL NOW</span>
          </a>

          {/* WhatsApp Us */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundEngine.playHover()}
            className="px-6 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-orbitron text-xs md:text-sm font-bold tracking-widest uppercase transition-all flex items-center space-x-2 active:scale-95 shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WHATSAPP US</span>
          </a>
        </div>
      </div>
    </section>
  );
}
