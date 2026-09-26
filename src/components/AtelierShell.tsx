import React, { useState, useEffect, useRef } from 'react';
import { DynamicIslandNotificationCenter } from './notifications/DynamicIslandNotificationCenter';

interface AtelierShellProps {
  id?: string;
  children: React.ReactNode;
  showStatusBar?: boolean;
  className?: string;
  bottomPadding?: string;
  onNavigateToTab?: (tab: string) => void;
  isWideLayout?: boolean;
}

export const AtelierShell: React.FC<AtelierShellProps> = ({
  id = 'atelier-page-container',
  children,
  showStatusBar = true,
  className = '',
  bottomPadding = 'pb-24',
  onNavigateToTab,
  isWideLayout = false,
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());
  
  // Parallax coordinates state (normalized -1 to 1) with smooth spring-like lerp
  const [parallaxOffset, setParallaxOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mouse move parallax listener & animation loop
  useEffect(() => {
    let isRunning = true;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      if (innerWidth === 0 || innerHeight === 0) return;
      
      // Calculate normalized offset from center [-1 to 1]
      const nx = ((e.clientX / innerWidth) - 0.5) * 2;
      const ny = ((e.clientY / innerHeight) - 0.5) * 2;
      targetOffsetRef.current = { 
        x: Math.max(-1, Math.min(1, nx)), 
        y: Math.max(-1, Math.min(1, ny)) 
      };
    };

    const handleMouseLeave = () => {
      targetOffsetRef.current = { x: 0, y: 0 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Smooth physics lerp loop with buttery damping (no CSS transition conflict)
    const animate = () => {
      if (!isRunning) return;

      const target = targetOffsetRef.current;
      const current = currentOffsetRef.current;
      
      // 0.055 provides silky smooth liquid inertia
      const lerpFactor = 0.055;
      const dx = target.x - current.x;
      const dy = target.y - current.y;

      if (Math.abs(dx) > 0.0002 || Math.abs(dy) > 0.0002) {
        current.x += dx * lerpFactor;
        current.y += dy * lerpFactor;
        setParallaxOffset({ x: current.x, y: current.y });
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const hours = String(currentTime.getHours()).padStart(2, '0');
  const minutes = String(currentTime.getMinutes()).padStart(2, '0');
  const liveShortTimeEn = `${hours}:${minutes}`;

  const containerSizing = isWideLayout
    ? 'max-w-[430px] sm:max-w-[450px] h-[100dvh] sm:h-[874px] sm:max-h-[94vh]'
    : 'max-w-[420px] h-[100dvh] sm:h-[874px] sm:max-h-[94vh]';

  const px = parallaxOffset.x;
  const py = parallaxOffset.y;

  return (
    <div
      id={id}
      className={`relative w-full ${containerSizing} mx-auto glass-panel-vitality overflow-hidden rounded-[34px] sm:rounded-[42px] flex flex-col justify-start select-none transition-shadow duration-300 ${className}`}
    >
      {/* ─── Airy Pastel Background with Softly Sculpted 3D Parallax Organic Shapes ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10 bg-gradient-to-b from-[#f3f6fa] via-[#efeaf6] to-[#f5eee9]">
        {/* Powder Blue organic blurred shape: Top Left (Layer 1 - moves with slight forward lag) */}
        <div
          className="absolute -top-16 -left-14 w-72 h-72 will-change-transform"
          style={{
            transform: `translate3d(${px * 24}px, ${py * 20}px, 0)`,
          }}
        >
          <div className="w-full h-full rounded-full bg-[#bfddf4]/60 blur-[72px] animate-organic-1" />
        </div>

        {/* Lavender organic blurred shape: Center Right (Layer 2 - inverse deep parallax) */}
        <div
          className="absolute top-[26%] -right-16 w-80 h-80 will-change-transform"
          style={{
            transform: `translate3d(${px * -32}px, ${py * -26}px, 0)`,
          }}
        >
          <div className="w-full h-full rounded-full bg-[#ded4f5]/65 blur-[75px] animate-organic-2" />
        </div>

        {/* Blush organic blurred shape: Mid-Left (Layer 3 - lateral counter-shift) */}
        <div
          className="absolute top-[50%] -left-12 w-64 h-64 will-change-transform"
          style={{
            transform: `translate3d(${px * 20}px, ${py * -22}px, 0)`,
          }}
        >
          <div className="w-full h-full rounded-full bg-[#f8d0de]/60 blur-[68px] animate-organic-3" />
        </div>

        {/* Warm Peach organic blurred shape: Bottom Right (Layer 4 - anchor depth) */}
        <div
          className="absolute -bottom-16 -right-12 w-72 h-72 will-change-transform"
          style={{
            transform: `translate3d(${px * -24}px, ${py * 30}px, 0)`,
          }}
        >
          <div className="w-full h-full rounded-full bg-[#fed5c1]/65 blur-[72px] animate-organic-1" />
        </div>

        {/* Interactive 3D Ambient Specular Light reflecting cursor position */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + px * 25}% ${25 + py * 20}%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.15) 45%, transparent 75%)`,
          }}
        />

        {/* Subtle 3D clay-light specular highlight along top edge */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none" />
      </div>

      {/* iOS / Mobile Header & Status Bar */}
      {showStatusBar && (
        <header
          id="ios-status-bar"
          style={{ height: '48px' }}
          className="relative z-40 px-6 pt-3.5 pb-2 h-[48px] flex justify-center items-center text-stone-800 text-xs font-semibold tracking-tight shrink-0 select-none bg-white/50 backdrop-blur-xl border-b border-white/60 shadow-[0_4px_12px_-2px_rgba(45,30,65,0.05)]"
        >
          <DynamicIslandNotificationCenter onNavigateToTab={onNavigateToTab} />
        </header>
      )}

      <div className={`relative z-20 flex-1 min-h-0 flex flex-col overflow-hidden ${bottomPadding}`}>
        {children}
      </div>
    </div>
  );
};
