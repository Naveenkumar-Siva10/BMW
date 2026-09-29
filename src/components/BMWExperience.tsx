'use client';

import React, { useState, useRef } from 'react';
import { MotionValue, motion, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { garageData } from '@/data/garageData';
import { useLenisScroll } from './LenisProvider';
import { soundEngine } from '@/utils/audio';
import { Activity, Navigation, Calendar, ArrowDownRight, Wrench } from 'lucide-react';

interface BMWExperienceProps {
  scrollYProgress: MotionValue<number>;
  driveMode: 'QUALIFYING' | 'ENDURANCE' | 'WET';
  onOpenTechData?: () => void;
  onOpenBookService?: () => void;
}

// Interactive Hotspots per phase
const phaseHotspots = [
  {
    phaseIndex: 0,
    top: '55%',
    left: '28%',
    title: 'LASER OPTICAL ALIGNMENT & HEADLAMPS',
    detail: 'Precision headlight beam leveling and optical laser chassis alignment station.',
  },
  {
    phaseIndex: 1,
    top: '40%',
    left: '72%',
    title: 'SWAN-NECK CARBON AERO & STABILITY',
    detail: 'Carbon aerodynamic wing balance generating optimal high-speed downforce distribution.',
  },
  {
    phaseIndex: 2,
    top: '48%',
    left: '52%',
    title: 'LIGHTWEIGHT DOORS & DIGITAL COCKPIT',
    detail: 'Ergonomic cockpit calibration with digital CAN telemetry diagnostics.',
  },
  {
    phaseIndex: 3,
    top: '42%',
    left: '42%',
    title: 'TWIN-TURBO 3.0L RACING POWERTRAIN',
    detail: 'Blueprint assembly, dyno calibration, and high-temp synthetic cooling maintenance.',
  },
];

export default function BMWExperience({
  scrollYProgress,
  driveMode,
  onOpenTechData,
  onOpenBookService,
}: BMWExperienceProps) {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [scrollSpeed, setScrollSpeed] = useState<number>(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState<boolean>(true);
  const [selectedHotspot, setSelectedHotspot] = useState<typeof phaseHotspots[0] | null>(null);

  const prevProgressRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(Date.now());
  const { lenis } = useLenisScroll();

  // Scroll progress & velocity calculation
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const now = Date.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    const dp = Math.abs(latest - prevProgressRef.current);
    const calculatedSpeed = Math.min(295, Math.floor((dp / dt) * 14000));

    setScrollSpeed(calculatedSpeed);
    prevProgressRef.current = latest;
    lastTimeRef.current = now;

    soundEngine.updateEngineRPM(latest);

    if (latest > 0.05) {
      setShowScrollIndicator(false);
    } else {
      setShowScrollIndicator(true);
    }

    let nextPhase = 0;
    if (latest < 0.25) {
      nextPhase = 0;
    } else if (latest < 0.5) {
      nextPhase = 1;
    } else if (latest < 0.75) {
      nextPhase = 2;
    } else {
      nextPhase = 3;
    }

    if (nextPhase !== activePhaseIndex) {
      setActivePhaseIndex(nextPhase);
      soundEngine.playPhaseBeep();
      setSelectedHotspot(null);
    }
  });

  const activePhase = garageData.phases[activePhaseIndex];
  const activeHotspot = phaseHotspots[activePhaseIndex];

  const handleScrollToExplore = () => {
    soundEngine.playClick();
    if (lenis) {
      lenis.scrollTo(window.innerHeight * 1.5, { duration: 1.5 });
    } else {
      window.scrollTo({ top: window.innerHeight * 1.5, behavior: 'smooth' });
    }
  };

  const handleScrollToServices = () => {
    soundEngine.playClick();
    const targetEl = document.getElementById('services-section');
    if (targetEl) {
      if (lenis) lenis.scrollTo(targetEl, { duration: 1.5 });
      else targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const modeColor =
    driveMode === 'QUALIFYING' ? '#CC0000' : driveMode === 'ENDURANCE' ? '#0066FF' : '#0048C9';

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 md:p-10 pt-24 text-[#111111] select-none">
      {/* HUD Corner Decorators */}
      <div className="hud-corner-tl" style={{ top: '80px' }} />
      <div className="hud-corner-tr" style={{ top: '80px' }} />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      {/* DYNAMIC FLOATING TELEMETRY HOTSPOT PIN ON CAR */}
      <AnimatePresence>
        {activeHotspot && (
          <motion.div
            key={activeHotspot.title}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{ top: activeHotspot.top, left: activeHotspot.left }}
            className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 z-30"
          >
            <div className="relative group">
              {/* Pulsing Target Ring */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedHotspot(selectedHotspot ? null : activeHotspot);
                }}
                className="relative w-8 h-8 flex items-center justify-center rounded-full bg-[#0066FF]/10 border border-[#0066FF] hover:bg-[#0066FF] text-[#0066FF] hover:text-white transition-all shadow-md"
              >
                <span className="absolute inset-0 rounded-full bg-[#0066FF]/30 animate-ping" />
                <Activity className="w-4 h-4" />
              </button>

              {/* Hover/Click Detail Tooltip */}
              <div
                className={`absolute left-10 top-0 w-64 p-4 bg-white/95 border border-[#E5E5E5] backdrop-blur-md shadow-xl transition-all duration-300 ${
                  selectedHotspot
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'
                }`}
              >
                <div className="flex items-center space-x-1.5 border-b border-[#E5E5E5] pb-1.5 mb-2">
                  <span className="w-1.5 h-1.5 bg-[#CC0000]" />
                  <span className="font-orbitron text-[10px] font-bold text-[#0066FF] uppercase tracking-wider">
                    TELEMETRY HOTSPOT
                  </span>
                </div>
                <div className="font-orbitron font-bold text-xs text-[#111111] uppercase">
                  {activeHotspot.title}
                </div>
                <p className="font-rajdhani text-xs text-[#666666] mt-1 leading-normal">
                  {activeHotspot.detail}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CENTER DYNAMIC PHASE HUD CONTENT */}
      <div className="w-full my-auto flex items-center justify-between pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase.id}
            initial={{ y: 30, opacity: 0, filter: 'blur(8px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4 md:space-y-6">
              {/* Phase Badge */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#F5F5F5] border border-[#E5E5E5] rounded-none">
                <span className="w-2 h-2" style={{ backgroundColor: modeColor }} />
                <span className="font-orbitron text-xs font-bold tracking-widest text-[#0066FF] uppercase">
                  {activePhase.label}
                </span>
                <span className="text-[#AAAAAA] text-xs font-orbitron">// {driveMode}</span>
              </div>

              {/* Title & Subtitle */}
              {activePhaseIndex === 0 ? (
                <div>
                  <div className="font-orbitron text-sm md:text-base font-extrabold tracking-[0.25em] text-[#0066FF] uppercase mb-1">
                    PRECISION. PERFORMANCE. CARE.
                  </div>
                  <h1 className="font-orbitron font-black text-4xl md:text-6xl lg:text-7xl tracking-tight text-[#111111] uppercase leading-none">
                    YOUR CAR DESERVES BETTER.
                  </h1>
                  <p className="font-orbitron text-sm md:text-lg font-bold tracking-wider text-[#CC0000] uppercase mt-2">
                    NAVEEN GARAGE WORKSHOP
                  </p>
                </div>
              ) : (
                <div>
                  <h1 className="font-orbitron font-black text-4xl md:text-6xl lg:text-7xl tracking-tight text-[#111111] uppercase leading-none">
                    {activePhase.title}
                  </h1>
                  <p className="font-orbitron text-base md:text-xl font-bold tracking-widest text-[#CC0000] uppercase mt-2">
                    {activePhase.subtitle}
                  </p>
                </div>
              )}

              {/* Description */}
              <p className="font-rajdhani font-medium text-base md:text-lg text-[#666666] leading-relaxed max-w-2xl">
                {activePhase.description}
              </p>

              {/* Hero Action Buttons */}
              {activePhaseIndex === 0 && (
                <div className="pt-4 flex flex-wrap items-center gap-4 pointer-events-auto">
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      onOpenBookService?.();
                    }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="px-6 py-3.5 bg-[#0066FF] hover:bg-[#0048C9] text-white font-orbitron text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 flex items-center space-x-2.5 shadow-md hover:shadow-lg"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>BOOK A SERVICE</span>
                  </button>

                  <button
                    onClick={handleScrollToServices}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="px-6 py-3.5 bg-white hover:bg-[#F5F5F5] border border-[#E5E5E5] text-[#111111] hover:text-[#0066FF] font-orbitron text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 flex items-center space-x-2"
                  >
                    <Wrench className="w-4 h-4 text-[#0066FF]" />
                    <span>EXPLORE SERVICES</span>
                  </button>

                  <button
                    onClick={handleScrollToExplore}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="px-4 py-3.5 text-[#666666] hover:text-[#111111] font-orbitron text-xs font-bold tracking-widest uppercase transition-colors flex items-center space-x-1.5"
                  >
                    <span>SCROLL TO EXPLORE</span>
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Phase 2, 3, 4 Buttons */}
              {activePhaseIndex > 0 && (
                <div className="pt-2 flex flex-wrap items-center gap-3 pointer-events-auto">
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      onOpenBookService?.();
                    }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="px-5 py-2.5 bg-[#0066FF] hover:bg-[#0048C9] text-white font-orbitron text-xs font-bold tracking-widest uppercase transition-all shadow-sm"
                  >
                    BOOK DIAGNOSTICS
                  </button>
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      onOpenTechData?.();
                    }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="px-5 py-2.5 bg-white hover:bg-[#F5F5F5] border border-[#E5E5E5] text-[#111111] font-orbitron text-xs font-bold tracking-widest uppercase transition-colors"
                  >
                    TECHNICAL BENCHMARK
                  </button>
                </div>
              )}
            </div>

            {/* Right Telemetry Column */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center space-y-6">
              {/* Speed & Live Telemetry Gauge Card */}
              <div className="p-6 bg-white/95 border border-[#E5E5E5] backdrop-blur-md shadow-lg space-y-4 min-w-[280px]">
                <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-3">
                  <span className="font-orbitron text-xs font-bold text-[#666666] uppercase">
                    SCROLL VELOCITY
                  </span>
                  <span className="font-orbitron text-xs font-bold text-[#0066FF]">
                    {scrollSpeed} KM/H
                  </span>
                </div>

                {/* Phase 1 Telemetry */}
                {activePhaseIndex === 0 && (
                  <div className="space-y-3">
                    <div className="text-xs font-orbitron text-[#666666] tracking-widest">
                      WORKSHOP TUNING ({driveMode})
                    </div>
                    <div className="text-4xl md:text-5xl font-orbitron font-extrabold text-[#0066FF]">
                      {driveMode === 'QUALIFYING' ? '540 HP' : driveMode === 'ENDURANCE' ? '515 HP' : '480 HP'}
                    </div>
                    <div className="h-1 w-full bg-gradient-to-r from-[#0066FF] via-[#0048C9] to-[#CC0000]" />
                    <div className="text-xs font-orbitron font-bold text-[#111111] tracking-wider">
                      NAVEEN GARAGE PRECISION BENCH
                    </div>
                  </div>
                )}

                {/* Phase 2 Telemetry (Aerodynamics & Alignment) */}
                {activePhaseIndex === 1 && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-[#0066FF]" />
                      <span className="font-orbitron text-xs font-bold tracking-widest text-[#111111]">
                        CHASSIS & AERO ALIGNMENT
                      </span>
                    </div>
                    <div className="space-y-2 font-orbitron text-xs text-[#666666]">
                      <div className="flex justify-between">
                        <span>LASER CAMBER</span>
                        <span className="text-[#0066FF] font-bold">-3.2° CALIBRATED</span>
                      </div>
                      <div className="flex justify-between">
                        <span>REAR DOWNFORCE</span>
                        <span className="text-[#111111] font-bold">650 KG @ 240 KM/H</span>
                      </div>
                      <div className="flex justify-between">
                        <span>AERO EFFICIENCY</span>
                        <span className="text-[#CC0000] font-bold">OPTIMIZED AIRFLOW</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Phase 3 Telemetry (Cockpit & Electrical) */}
                {activePhaseIndex === 2 && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-orbitron text-xs font-bold text-[#111111]">
                        CAN-BUS DIAGNOSTICS
                      </span>
                      <span className="font-orbitron text-2xl font-extrabold text-[#0066FF]">
                        100% OK
                      </span>
                    </div>
                    <p className="font-rajdhani text-xs text-[#666666] leading-relaxed">
                      Complete digital cockpit interface, sensor live stream logging, and wiring loom integrity tested.
                    </p>
                    <div className="w-full bg-[#F5F5F5] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0066FF] h-full w-[100%]" />
                    </div>
                  </div>
                )}

                {/* Phase 4 Telemetry (Powertrain) */}
                {activePhaseIndex === 3 && (
                  <div className="space-y-3">
                    <div className="border-b border-[#E5E5E5] pb-2">
                      <span className="font-orbitron text-[10px] text-[#666666] tracking-widest block">
                        MEASURED OUTPUT
                      </span>
                      <span className="font-orbitron text-3xl font-extrabold text-[#0066FF]">
                        540 HP / 650 NM
                      </span>
                    </div>
                    <div className="border-b border-[#E5E5E5] pb-2">
                      <span className="font-orbitron text-[10px] text-[#666666] tracking-widest block">
                        ENGINE SPEC
                      </span>
                      <span className="font-orbitron text-sm font-bold text-[#111111]">
                        3.0L TWIN-TURBO I6
                      </span>
                    </div>
                    <div>
                      <span className="font-orbitron text-[10px] text-[#666666] tracking-widest block">
                        TRANSMISSION
                      </span>
                      <span className="font-orbitron text-sm font-bold text-[#CC0000]">
                        6 SPEED SEQUENTIAL
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM PERSISTENT HUD BAR */}
      <div className="w-full flex items-end justify-between pt-4 border-t border-[#E5E5E5]/60">
        {/* Animated Scroll Indicator (Phase 1 only) */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-3 pointer-events-auto cursor-pointer"
              onClick={handleScrollToExplore}
              onMouseEnter={() => soundEngine.playHover()}
            >
              <div className="relative w-0.5 h-10 bg-[#E5E5E5] overflow-hidden">
                <motion.div
                  animate={{ y: [0, 40, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  className="w-full h-4 bg-[#0066FF]"
                />
              </div>
              <span className="font-orbitron text-[10px] font-bold tracking-[0.25em] text-[#0066FF] uppercase">
                SCROLL TO EXPLORE
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Right Location & Track Tag */}
        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-xs font-orbitron text-[#666666]">
            <Navigation className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>PRECISION CORRIDOR · BAYS 1–8</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
          <span className="font-orbitron text-xs font-semibold tracking-widest text-[#666666]">
            NAVEEN GARAGE WORKSHOP
          </span>
        </div>
      </div>
    </div>
  );
}
