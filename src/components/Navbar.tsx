'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValueEvent, MotionValue, AnimatePresence } from 'framer-motion';
import { useLenisScroll } from './LenisProvider';
import { soundEngine } from '@/utils/audio';
import { Volume2, VolumeX, Radio, Menu, X, Phone, Calendar } from 'lucide-react';
import { garageData } from '@/data/garageData';

interface NavbarProps {
  scrollYProgress: MotionValue<number>;
  driveMode: 'QUALIFYING' | 'ENDURANCE' | 'WET';
  onSelectDriveMode: (mode: 'QUALIFYING' | 'ENDURANCE' | 'WET') => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  activePhaseIndex: number;
  onOpenBookService: (serviceName?: string) => void;
}

export default function Navbar({
  scrollYProgress,
  driveMode,
  onSelectDriveMode,
  isAudioMuted,
  onToggleAudio,
  activePhaseIndex,
  onOpenBookService,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { lenis } = useLenisScroll();

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setCurrentProgress(latest);
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', target: 'home-top' },
    { label: 'ABOUT', target: 'about-section' },
    { label: 'SERVICES', target: 'services-section' },
    { label: 'GARAGE & SPECS', target: 'specs-section' },
    { label: 'WHY US', target: 'why-us-section' },
    { label: 'GALLERY', target: 'gallery-section' },
    { label: 'VIDEO', target: 'video-section' },
    { label: 'CONTACT', target: 'contact-section' },
  ];

  const handleNavClick = (targetId: string) => {
    soundEngine.playClick();
    setMobileMenuOpen(false);

    if (targetId === 'home-top') {
      if (lenis) lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      if (lenis) {
        lenis.scrollTo(targetEl, { duration: 1.2 });
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const modeColor =
    driveMode === 'QUALIFYING' ? '#CC0000' : driveMode === 'ENDURANCE' ? '#0066FF' : '#0048C9';

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] shadow-sm py-2.5'
          : 'bg-white/85 backdrop-blur-sm border-b border-[#E5E5E5]/70 py-3.5'
      }`}
    >
      <div className="max-w-[1680px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Left: NAVEEN GARAGE Branding */}
        <div
          className="flex items-center space-x-3 cursor-pointer shrink-0"
          onClick={() => handleNavClick('home-top')}
          onMouseEnter={() => soundEngine.playHover()}
        >
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-5 bg-[#0066FF] -skew-x-12 inline-block" />
            <span className="w-2.5 h-5 bg-[#0048C9] -skew-x-12 inline-block" />
            <span className="w-2.5 h-5 bg-[#CC0000] -skew-x-12 inline-block" />
          </div>
          <div className="flex flex-col">
            <span className="font-orbitron font-black text-sm md:text-base tracking-wider text-[#111111] uppercase leading-tight">
              NAVEEN GARAGE
            </span>
            <span className="font-orbitron text-[10px] font-semibold tracking-widest text-[#666666] uppercase">
              PRECISION AUTOMOTIVE CARE
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden xl:flex items-center space-x-6">
          <nav className="flex items-center space-x-5">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.target)}
                onMouseEnter={() => soundEngine.playHover()}
                className="font-orbitron text-[11px] font-bold tracking-widest text-[#111111] hover:text-[#0066FF] transition-colors duration-200 uppercase relative group py-1"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0066FF] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <span className="h-4 w-px bg-[#E5E5E5]" />

          {/* Service Mode Selector */}
          <div className="flex items-center space-x-1 bg-[#F5F5F5] p-1 border border-[#E5E5E5]">
            <div className="flex items-center space-x-1 px-1.5 text-[9px] font-orbitron font-bold text-[#666666]">
              <Radio className="w-3 h-3 text-[#0066FF] animate-pulse" />
              <span className="hidden 2xl:inline">TUNING</span>
            </div>
            {(['QUALIFYING', 'ENDURANCE', 'WET'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => onSelectDriveMode(mode)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`px-2 py-0.5 font-orbitron text-[9px] font-bold tracking-wider transition-all duration-200 uppercase ${
                  driveMode === mode
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Sound, Mini Progress, Primary CTA & Mobile Toggle */}
        <div className="flex items-center space-x-3 md:space-x-4 shrink-0">
          {/* Sound Toggle Button */}
          <button
            onClick={onToggleAudio}
            onMouseEnter={() => soundEngine.playHover()}
            title={isAudioMuted ? 'Unmute Audio Engine' : 'Mute Audio Engine'}
            className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 bg-[#F5F5F5] hover:bg-[#E5E5E5] border border-[#E5E5E5] text-[#111111] transition-colors"
          >
            {isAudioMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-[#CC0000]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#0066FF] animate-pulse" />
            )}
            <span className="font-orbitron text-[10px] font-bold uppercase">
              {isAudioMuted ? 'MUTE' : 'AUDIO'}
            </span>
          </button>

          {/* Quick Call link */}
          <a
            href={`tel:${garageData.phone}`}
            onMouseEnter={() => soundEngine.playHover()}
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 bg-[#F5F5F5] hover:bg-[#E5E5E5] border border-[#E5E5E5] text-[#111111] font-orbitron text-[11px] font-bold tracking-wider uppercase transition-colors"
          >
            <Phone className="w-3 h-3 text-[#0066FF]" />
            <span>{garageData.phone}</span>
          </a>

          {/* Primary CTA: Book a Service */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenBookService();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-4 md:px-5 py-2 bg-[#0066FF] hover:bg-[#0048C9] text-white font-orbitron text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 flex items-center space-x-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>BOOK A SERVICE</span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="xl:hidden p-2 text-[#111111] hover:text-[#0066FF] hover:bg-[#F5F5F5] border border-[#E5E5E5] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="xl:hidden bg-white border-b border-[#E5E5E5] px-6 py-6 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              <div className="text-xs font-orbitron font-bold tracking-widest text-[#0066FF] border-b border-[#E5E5E5] pb-2">
                NAVIGATION
              </div>
              <div className="grid grid-cols-2 gap-3">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.target)}
                    className="text-left font-orbitron text-xs font-bold tracking-wider text-[#111111] hover:text-[#0066FF] py-2 px-2 hover:bg-[#F5F5F5] border border-transparent hover:border-[#E5E5E5] transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Quick Action Buttons */}
              <div className="pt-4 border-t border-[#E5E5E5] flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBookService();
                  }}
                  className="w-full py-3 bg-[#0066FF] text-white font-orbitron text-xs font-bold tracking-widest uppercase text-center flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK A SERVICE</span>
                </button>

                <a
                  href={`tel:${garageData.phone}`}
                  className="w-full py-3 bg-[#F5F5F5] border border-[#E5E5E5] text-[#111111] font-orbitron text-xs font-bold tracking-widest uppercase text-center flex items-center justify-center space-x-2"
                >
                  <Phone className="w-4 h-4 text-[#0066FF]" />
                  <span>CALL {garageData.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
