'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

interface BMWScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames?: number;
  imageFolderPath?: string;
}

export default function BMWScrollCanvas({
  scrollYProgress,
  totalFrames = 192,
  imageFolderPath = '/images/bmw-m4-gt3-evo-sequence',
}: BMWScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [loadedCount, setLoadedCount] = useState<number>(0);

  // Draw frame function
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.save();
    ctx.scale(dpr, dpr);

    // Pure White Studio Canvas Background #FFFFFF
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, rect.width, rect.height);

    const img = imagesRef.current[frameIndex - 1];
    if (img && img.complete && img.naturalWidth !== 0) {
      // True FULL SCREEN Object-Fit Cover Logic (Fills viewport edge-to-edge)
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = rect.width / rect.height;

      let drawWidth = rect.width;
      let drawHeight = rect.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasAspect > imgAspect) {
        // Canvas is wider than image aspect -> scale to fill full width
        drawWidth = rect.width;
        drawHeight = rect.width / imgAspect;
        offsetY = (rect.height - drawHeight) / 2;
      } else {
        // Canvas is taller than image aspect -> scale to fill full height
        drawHeight = rect.height;
        drawWidth = rect.height * imgAspect;
        offsetX = (rect.width - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
    ctx.restore();
  }, []);

  // Preload frames progressively
  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = new Array(totalFrames);
    let count = 0;

    imagesRef.current = loadedImages;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `${imageFolderPath}/${i}.jpg`;

      img.onload = () => {
        if (!isMounted) return;
        loadedImages[i - 1] = img;
        count++;
        setLoadedCount(count);
        setLoadProgress(Math.floor((count / totalFrames) * 100));

        // Render frame 1 immediately when ready
        if (i === 1 || count === 1) {
          renderFrame(1);
        }

        // Transition out loading overlay as soon as initial batch ready
        if (count >= Math.min(10, totalFrames)) {
          setIsLoading(false);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        setLoadProgress(Math.floor((count / totalFrames) * 100));

        if (count >= Math.min(10, totalFrames)) {
          setIsLoading(false);
        }
      };
    }

    return () => {
      isMounted = false;
    };
  }, [totalFrames, imageFolderPath, renderFrame]);

  // Update frame on scrollYProgress change
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clampedProgress = Math.min(1, Math.max(0, latest));
    const targetFrame = Math.min(
      totalFrames,
      Math.max(1, Math.floor(clampedProgress * (totalFrames - 1)) + 1)
    );

    if (targetFrame !== currentFrameRef.current) {
      currentFrameRef.current = targetFrame;
      renderFrame(targetFrame);
    }
  });

  // ResizeObserver for canvas window resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      renderFrame(currentFrameRef.current);
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(container);
    handleResize();

    return () => {
      observer.disconnect();
    };
  }, [renderFrame]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-white">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white text-[#111111] px-6 transition-opacity duration-300">
          <div className="w-full max-w-sm space-y-4 text-center">
            <div className="flex items-center justify-center space-x-1.5">
              <span className="w-2.5 h-2.5 bg-[#0066FF]" />
              <span className="w-2.5 h-2.5 bg-[#0048C9]" />
              <span className="w-2.5 h-2.5 bg-[#CC0000]" />
              <span className="font-orbitron text-xs font-bold tracking-widest text-[#111111] uppercase ml-1">
                NAVEEN GARAGE
              </span>
            </div>

            <div className="relative w-full h-1.5 bg-[#E5E5E5] overflow-hidden rounded-full">
              <div
                className="h-full bg-[#0066FF] transition-all duration-150 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-orbitron text-[#666666]">
              <span>PRE-FLIGHT TELEMETRY</span>
              <span className="text-[#0066FF] font-bold">{loadProgress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Main HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-contain pointer-events-none"
      />
    </div>
  );
}
