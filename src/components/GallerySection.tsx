'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '@/utils/audio';
import { Maximize2, X, Eye } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'EXTERIOR' | 'ENGINE' | 'AERO' | 'COCKPIT';
  tag: string;
  src: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'hero-exterior',
    title: 'BMW M4 GT3 EVO Studio Profile',
    category: 'EXTERIOR',
    tag: 'HERO EXTERIOR',
    src: '/images/car-exterior.png',
    description: 'Championship GT3 endurance aerodynamics in pristine studio infinity cove.',
  },
  {
    id: 'hero-engine',
    title: 'Twin-Turbo P58 Racing Engine Bay',
    category: 'ENGINE',
    tag: 'POWERTRAIN BLUEPRINT',
    src: '/images/car-engine.png',
    description: 'Open-hood inspection of the 3.0L twin-turbocharged inline-six powerplant.',
  },
  {
    id: 'front-splitter',
    title: 'Carbon Splitter & Laser Headlights',
    category: 'EXTERIOR',
    tag: 'FRONT END AERO',
    src: '/images/bmw-m4-gt3-evo-sequence/1.jpg',
    description: 'Aggressive kidney grille, dive planes, and endurance yellow laser illumination.',
  },
  {
    id: 'rear-wing',
    title: 'Swan-Neck Adjustable GT3 Wing',
    category: 'AERO',
    tag: 'REAR DOWNFORCE',
    src: '/images/bmw-m4-gt3-evo-sequence/60.jpg',
    description: 'Multi-element carbon wing engineered for 650kg high-speed downforce.',
  },
  {
    id: 'butterfly-doors',
    title: '70° Butterfly Lightweight Doors',
    category: 'COCKPIT',
    tag: 'FIA COCKPIT',
    src: '/images/bmw-m4-gt3-evo-sequence/140.jpg',
    description: 'Rapid driver change mechanism, carbon door cards, and FIA roll cage cell.',
  },
  {
    id: 'engine-unlatched',
    title: 'Engine Bay & Cooling Ducting',
    category: 'ENGINE',
    tag: 'THERMAL FLUIDICS',
    src: '/images/bmw-m4-gt3-evo-sequence/185.jpg',
    description: 'Direct air intake routing, titanium manifolds, and dry-sump oiling system.',
  },
];

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'ALL', label: 'ALL SHOTS (6)' },
    { id: 'EXTERIOR', label: 'EXTERIOR' },
    { id: 'ENGINE', label: 'ENGINE & POWERTRAIN' },
    { id: 'AERO', label: 'AERODYNAMICS' },
    { id: 'COCKPIT', label: 'COCKPIT & DOORS' },
  ];

  const filteredItems =
    selectedCategory === 'ALL'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery-section" className="py-24 px-6 bg-[#F5F5F5] text-[#111111] relative z-20 border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5E5] pb-8 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#0066FF]" />
              <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-[#0066FF] uppercase">
                AUTOMOTIVE VISUAL ARCHIVE
              </span>
            </div>
            <h2 className="font-orbitron font-black text-3xl md:text-5xl tracking-tight text-[#111111] uppercase">
              WORKSHOP & CAR GALLERY
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 border border-[#E5E5E5]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedCategory(cat.id);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`px-3.5 py-1.5 font-orbitron text-xs font-bold tracking-wider transition-all duration-200 uppercase ${
                  selectedCategory === cat.id
                    ? 'bg-[#0066FF] text-white shadow-xs'
                    : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => {
              const isLarge = index === 0 || index === 1;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveLightboxItem(item);
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`group relative bg-white border border-[#E5E5E5] hover:border-[#0066FF] overflow-hidden cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
                    isLarge ? 'md:col-span-1 lg:col-span-1' : ''
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Hover Overlay Icon */}
                    <div className="absolute inset-0 bg-[#0066FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-white/90 text-[#0066FF] flex items-center justify-center shadow-md">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Caption Bar */}
                  <div className="p-4 bg-white border-t border-[#E5E5E5] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-orbitron text-[10px] font-bold text-[#0066FF] tracking-wider uppercase">
                        {item.tag}
                      </span>
                      <Maximize2 className="w-3.5 h-3.5 text-[#AAAAAA] group-hover:text-[#0066FF] transition-colors" />
                    </div>
                    <div className="font-orbitron font-bold text-sm text-[#111111] uppercase truncate">
                      {item.title}
                    </div>
                    <p className="font-rajdhani text-xs text-[#666666] line-clamp-1 font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeLightboxItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/75 backdrop-blur-md">
              <div
                className="absolute inset-0"
                onClick={() => setActiveLightboxItem(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative z-10 max-w-5xl w-full bg-white border border-[#E5E5E5] shadow-2xl p-4 md:p-6 space-y-4"
              >
                {/* Lightbox Header */}
                <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-4 bg-[#0066FF] -skew-x-12 inline-block" />
                    <span className="font-orbitron font-bold text-sm text-[#111111] uppercase">
                      {activeLightboxItem.title}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveLightboxItem(null)}
                    className="p-1 text-[#666666] hover:text-[#111111] transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Lightbox Image */}
                <div className="relative aspect-[16/9] w-full bg-[#FAFAFA] border border-[#E5E5E5] overflow-hidden">
                  <Image
                    src={activeLightboxItem.src}
                    alt={activeLightboxItem.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>

                {/* Lightbox Footer */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 text-xs font-orbitron text-[#666666]">
                  <span>TAG: <strong className="text-[#0066FF]">{activeLightboxItem.tag}</strong></span>
                  <p className="font-rajdhani text-sm text-[#555555]">
                    {activeLightboxItem.description}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
