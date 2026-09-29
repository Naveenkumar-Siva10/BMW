'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Gauge, Wind, Settings } from 'lucide-react';

interface TechDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TechDataModal({ isOpen, onClose }: TechDataModalProps) {
  const techCategories = [
    {
      title: 'POWERTRAIN & ENGINE BLUEPRINT',
      icon: Gauge,
      specs: [
        { key: 'Engine Code', val: 'BMW P58 EVO (3.0L TwinPower Turbo)' },
        { key: 'Displacement', val: '2,993 cc Inline 6-Cylinder' },
        { key: 'Max Power', val: 'Up to 540 HP (Dyno Calibrated)' },
        { key: 'Max Torque', val: '650 Nm @ 3,000–6,500 RPM' },
        { key: 'Turbochargers', val: 'Dual Monoscroll Motorsport Turbos' },
        { key: 'Engine Management', val: 'Bosch MS 7.4 ECU with Motorsport Software' },
      ],
    },
    {
      title: 'TRANSMISSION & DRIVETRAIN',
      icon: Settings,
      specs: [
        { key: 'Gearbox', val: 'Sequential Xtrac 6-Speed Transaxle' },
        { key: 'Shift Actuation', val: 'Electro-Pneumatic Steering Wheel Paddles' },
        { key: 'Clutch', val: 'ZF Sachs 4-Plate Sintered Carbon Clutch' },
        { key: 'Differential', val: 'Visco-Mechanical Ramp Limited Slip' },
      ],
    },
    {
      title: 'CHASSIS & AERODYNAMICS',
      icon: Wind,
      specs: [
        { key: 'Chassis Type', val: 'BMW M Steel Body with Welded FIA Safety Cage' },
        { key: 'Bodywork', val: 'Full Carbon Fiber Aerodynamic Body Panels' },
        { key: 'Front Aero', val: 'EVO Splitter, Carbon Canards & Brake Ducts' },
        { key: 'Rear Wing', val: 'Swan-Neck Carbon Rear Wing (Adjustable)' },
        { key: 'Overall Dimensions', val: 'L: 5,020 mm | W: 2,040 mm | H: 1,308 mm' },
      ],
    },
    {
      title: 'BRAKES, SUSPENSION & WHEELS',
      icon: Shield,
      specs: [
        { key: 'Front Brakes', val: 'AP Racing 6-Piston Calipers, 390 mm Discs' },
        { key: 'Rear Brakes', val: 'AP Racing 4-Piston Calipers, 380 mm Discs' },
        { key: 'Suspension', val: 'KW 5-Way Adjustable Competition Dampers' },
        { key: 'Wheels', val: 'Forged Center-Lock Motorsport Alloys (18")' },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-white border border-[#E5E5E5] p-6 md:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4 sticky top-0 bg-white z-20">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <span className="w-2 h-4 bg-[#0066FF] -skew-x-12 inline-block" />
                  <span className="w-2 h-4 bg-[#0048C9] -skew-x-12 inline-block" />
                  <span className="w-2 h-4 bg-[#CC0000] -skew-x-12 inline-block" />
                </div>
                <div>
                  <h3 className="font-orbitron font-extrabold text-lg text-[#111111] uppercase">
                    NAVEEN GARAGE // TECHNICAL SPECIFICATIONS
                  </h3>
                  <p className="font-rajdhani text-xs text-[#666666]">
                    FIA GT3 Homologation File & Precision Workshop Telemetry Benchmark
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-[#666666] hover:text-[#111111] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Spec Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {techCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.title}
                    className="p-5 bg-[#F5F5F5] border border-[#E5E5E5] space-y-3"
                  >
                    <div className="flex items-center space-x-2 border-b border-[#E5E5E5] pb-2">
                      <Icon className="w-4 h-4 text-[#0066FF]" />
                      <h4 className="font-orbitron font-bold text-xs tracking-wider text-[#111111] uppercase">
                        {cat.title}
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {cat.specs.map((item) => (
                        <div key={item.key} className="flex justify-between text-xs">
                          <span className="font-orbitron text-[#666666]">{item.key}</span>
                          <span className="font-rajdhani font-bold text-[#111111] text-right">
                            {item.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer note */}
            <div className="pt-4 border-t border-[#E5E5E5] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-orbitron text-[#666666]">
              <span>NAVEEN GARAGE WORKSHOP · PRECISION ENGINEERING</span>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#0066FF] text-white font-bold uppercase hover:bg-[#0048C9] transition-colors"
              >
                CLOSE SPECIFICATION
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
