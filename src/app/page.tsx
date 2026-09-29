'use client';

import React, { useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import Navbar from '@/components/Navbar';
import BMWScrollCanvas from '@/components/BMWScrollCanvas';
import BMWExperience from '@/components/BMWExperience';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import SpecsGrid from '@/components/SpecsGrid';
import FeaturesSection from '@/components/FeaturesSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import GallerySection from '@/components/GallerySection';
import VideoSection from '@/components/VideoSection';
import CtaBanner from '@/components/CtaBanner';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import TechDataModal from '@/components/TechDataModal';
import Preloader from '@/components/Preloader';
import { soundEngine } from '@/utils/audio';

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // MASTER SCROLL ARCHITECTURE: One shared useScroll attached to 600vh container
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
  });

  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedServiceToBook, setSelectedServiceToBook] = useState<string>('General Car Service');
  const [isTechDataOpen, setIsTechDataOpen] = useState<boolean>(false);
  const [driveMode, setDriveMode] = useState<'QUALIFYING' | 'ENDURANCE' | 'WET'>('QUALIFYING');
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.25) {
      setActivePhaseIndex(0);
    } else if (latest < 0.5) {
      setActivePhaseIndex(1);
    } else if (latest < 0.75) {
      setActivePhaseIndex(2);
    } else {
      setActivePhaseIndex(3);
    }
  });

  const handleToggleAudio = () => {
    const muted = soundEngine.toggleMute();
    setIsAudioMuted(muted);
  };

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceToBook(serviceName);
    }
    setIsBookingOpen(true);
  };

  return (
    <main id="home-top" className="relative bg-white text-[#111111] min-h-screen">
      {/* Interactive Motorsport Preloader */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Fixed Navigation Bar with Naveen Garage Telemetry Header */}
      <Navbar
        scrollYProgress={scrollYProgress}
        driveMode={driveMode}
        onSelectDriveMode={(mode) => setDriveMode(mode)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        activePhaseIndex={activePhaseIndex}
        onOpenBookService={handleOpenBooking}
      />

      {/* 600vh Master Scroll Sequence */}
      <div ref={scrollContainerRef} className="relative h-[600vh] bg-white">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
          <BMWScrollCanvas scrollYProgress={scrollYProgress} totalFrames={192} />
          <BMWExperience
            scrollYProgress={scrollYProgress}
            driveMode={driveMode}
            onOpenTechData={() => setIsTechDataOpen(true)}
            onOpenBookService={() => handleOpenBooking()}
          />
        </div>
      </div>

      {/* 1. About Naveen Garage Section */}
      <AboutSection onOpenBookService={() => handleOpenBooking()} />

      {/* 2. Professional Commercial Services Section */}
      <ServicesSection onSelectServiceToBook={(srv) => handleOpenBooking(srv)} />

      {/* 3. Garage Specifications & Telemetry Grid */}
      <SpecsGrid />

      {/* 4. Engineering & Workshop Capabilities */}
      <FeaturesSection />

      {/* 5. Customer-Facing Benefits (Why Choose Us) */}
      <WhyChooseUsSection />

      {/* 6. Real Vehicle & Workshop Gallery Archive */}
      <GallerySection />

      {/* 7. Dedicated 4K Cinematic Video Reel */}
      <VideoSection />

      {/* 8. High-Impact Conversion CTA Banner */}
      <CtaBanner onOpenBookService={() => handleOpenBooking()} />

      {/* 9. Validated Contact & Location Section */}
      <ContactSection />

      {/* 10. Commercial Footer */}
      <Footer onOpenBookService={() => handleOpenBooking()} />

      {/* Interactive Service Booking & Technical Benchmarking Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={selectedServiceToBook}
      />
      <TechDataModal
        isOpen={isTechDataOpen}
        onClose={() => setIsTechDataOpen(false)}
      />
    </main>
  );
}
