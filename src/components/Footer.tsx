'use client';

import React from 'react';
import { soundEngine } from '@/utils/audio';
import { garageData } from '@/data/garageData';
import { Phone, Mail, MapPin, Calendar, Clock, ArrowUp } from 'lucide-react';
import { useLenisScroll } from './LenisProvider';

interface FooterProps {
  onOpenBookService: () => void;
}

export default function Footer({ onOpenBookService }: FooterProps) {
  const { lenis } = useLenisScroll();

  const handleScrollToTop = () => {
    soundEngine.playClick();
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id: string) => {
    soundEngine.playClick();
    const el = document.getElementById(id);
    if (el) {
      if (lenis) lenis.scrollTo(el, { duration: 1.2 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer-section" className="bg-white border-t-2 border-[#0066FF] text-[#111111] pt-16 pb-12 px-6 relative z-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <span className="w-2.5 h-5 bg-[#0066FF] -skew-x-12 inline-block" />
                <span className="w-2.5 h-5 bg-[#0048C9] -skew-x-12 inline-block" />
                <span className="w-2.5 h-5 bg-[#CC0000] -skew-x-12 inline-block" />
              </div>
              <span className="font-orbitron font-black text-xl tracking-wider text-[#111111] uppercase">
                NAVEEN GARAGE
              </span>
            </div>

            <p className="font-orbitron text-xs tracking-widest text-[#0066FF] font-bold uppercase">
              "PRECISION. PERFORMANCE. CARE."
            </p>

            <p className="font-rajdhani text-sm text-[#666666] max-w-sm leading-relaxed font-medium">
              A specialized automotive care and engineering facility dedicated to manufacturer-spec maintenance, laser alignment, computer diagnostics, and powertrain excellence.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs font-orbitron text-[#666666]">
              <Clock className="w-4 h-4 text-[#0066FF]" />
              <span>{garageData.businessHours.weekdays}</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-orbitron text-xs font-bold text-[#111111] uppercase tracking-wider border-b border-[#E5E5E5] pb-2">
              NAVIGATION
            </div>
            <ul className="space-y-2 font-orbitron text-xs">
              {[
                { label: 'HOME', id: 'home-top' },
                { label: 'ABOUT THE WORKSHOP', id: 'about-section' },
                { label: 'GARAGE SERVICES', id: 'services-section' },
                { label: 'SPECS & TELEMETRY', id: 'specs-section' },
                { label: 'WHY NAVEEN GARAGE', id: 'why-us-section' },
                { label: 'GALLERY & CAR ARCHIVE', id: 'gallery-section' },
                { label: 'CINEMATIC VIDEO REEL', id: 'video-section' },
                { label: 'CONTACT & LOCATION', id: 'contact-section' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="text-[#666666] hover:text-[#0066FF] transition-colors py-0.5"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & CTA Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-orbitron text-xs font-bold text-[#111111] uppercase tracking-wider border-b border-[#E5E5E5] pb-2">
              WORKSHOP DESK
            </div>

            <div className="space-y-2 text-xs font-rajdhani font-semibold">
              <div className="flex items-center space-x-2 text-[#111111]">
                <Phone className="w-4 h-4 text-[#0066FF] shrink-0" />
                <a href={`tel:${garageData.phone}`} className="hover:text-[#0066FF] font-orbitron">
                  {garageData.phone}
                </a>
              </div>

              <div className="flex items-center space-x-2 text-[#111111]">
                <Mail className="w-4 h-4 text-[#0066FF] shrink-0" />
                <a href={`mailto:${garageData.email}`} className="hover:text-[#0066FF]">
                  {garageData.email}
                </a>
              </div>

              <div className="flex items-start space-x-2 text-[#666666] pt-1">
                <MapPin className="w-4 h-4 text-[#CC0000] shrink-0 mt-0.5" />
                <span>{garageData.address}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenBookService();
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="w-full py-3 bg-[#0066FF] hover:bg-[#0048C9] text-white font-orbitron text-xs font-bold tracking-widest uppercase transition-all shadow-sm flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>BOOK A SERVICE APPOINTMENT</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="border-t border-[#E5E5E5] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-rajdhani text-[#777777]">
          <div>
            © {new Date().getFullYear()} <strong className="text-[#111111] font-bold">NAVEEN GARAGE</strong>. All rights reserved. Dedicated to automotive precision.
          </div>

          <button
            onClick={handleScrollToTop}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center space-x-1.5 font-orbitron text-[10px] font-bold uppercase text-[#111111] hover:text-[#0066FF] transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
