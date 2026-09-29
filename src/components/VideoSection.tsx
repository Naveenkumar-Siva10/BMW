'use client';

import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { soundEngine } from '@/utils/audio';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const togglePlay = () => {
    soundEngine.playClick();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    soundEngine.playClick();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = () => {
    soundEngine.playClick();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="video-section" className="py-24 px-6 bg-white text-[#111111] relative z-20 border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5E5] pb-8 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#CC0000]" />
              <span className="font-orbitron text-xs font-bold tracking-[0.2em] text-[#CC0000] uppercase">
                CINEMATIC ENGINEERING REEL
              </span>
            </div>
            <h2 className="font-orbitron font-black text-3xl md:text-5xl tracking-tight text-[#111111] uppercase">
              VEHICLE CINEMATIC SHOWCASE
            </h2>
          </div>
          <p className="font-rajdhani text-base md:text-lg text-[#666666] max-w-md font-medium leading-relaxed">
            High-definition 4K footage capturing the vehicle’s aerodynamic profile, open cockpit, and precision powertrain architecture.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative border border-[#E5E5E5] bg-[#F5F5F5] p-2 md:p-3 shadow-2xl overflow-hidden group">
          <div className="relative aspect-video w-full overflow-hidden bg-white">
            <video
              ref={videoRef}
              src="/videos/bmw.mp4"
              poster="/images/car-exterior.png"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Subtle Gradient Vignette at Bottom */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* On-Video Controls Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto z-10">
              <div className="flex items-center space-x-2">
                <button
                  onClick={togglePlay}
                  className="p-2.5 bg-white/90 hover:bg-[#0066FF] text-[#111111] hover:text-white transition-colors rounded-none shadow-md backdrop-blur-sm"
                  aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2.5 bg-white/90 hover:bg-[#0066FF] text-[#111111] hover:text-white transition-colors rounded-none shadow-md backdrop-blur-sm"
                  aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-[#CC0000]" /> : <Volume2 className="w-4 h-4 text-[#0066FF]" />}
                </button>

                <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-black/50 text-white font-orbitron text-[10px] tracking-wider uppercase backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-pulse" />
                  <span>4K 60FPS · CINEMATIC 192-FRAME REEL</span>
                </div>
              </div>

              <button
                onClick={handleFullscreen}
                className="p-2.5 bg-white/90 hover:bg-[#0066FF] text-[#111111] hover:text-white transition-colors rounded-none shadow-md backdrop-blur-sm"
                aria-label="View Fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Under-Video Technical Spec Bar */}
          <div className="p-4 bg-white border-t border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-orbitron text-[#666666]">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <span className="w-2 h-4 bg-[#0066FF] -skew-x-12 inline-block" />
                <span className="w-2 h-4 bg-[#0048C9] -skew-x-12 inline-block" />
                <span className="w-2 h-4 bg-[#CC0000] -skew-x-12 inline-block" />
              </div>
              <span className="font-bold text-[#111111] uppercase tracking-wider">
                NAVEEN GARAGE BENCHMARK CINEMA
              </span>
            </div>
            <div className="flex items-center space-x-4 text-[11px]">
              <span>CONTAIN: <strong className="text-[#111111]">RESPONSIVE 16:9</strong></span>
              <span>AUDIO: <strong className="text-[#0066FF]">{isMuted ? 'MUTED (COMPLIANT)' : 'ACTIVE'}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
