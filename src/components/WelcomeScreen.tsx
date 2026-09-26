import React from 'react';
import { ATELIER_IMAGES } from '../data/mockData';
import { AtelierShell } from './AtelierShell';
import { Scissors, Clock, MessageSquare, HeartHandshake, ArrowLeft, ChevronLeft } from 'lucide-react';

interface WelcomeScreenProps {
  onEnter: () => void;
  onStartOnboarding: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onEnter,
  onStartOnboarding,
}) => {
  return (
    <AtelierShell id="welcome-screen-container" bottomPadding="pb-8">
      {/* Top Header */}
      <header
        id="welcome-brand-header"
        className="relative z-30 px-6 pt-2 flex items-center justify-between shrink-0"
        dir="rtl"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-stone-800">
            آرایشگاه رویال · تهران
          </span>
        </div>

        <div className="w-8 h-8 rounded-full bg-white/90 text-[#4e3b6e] flex items-center justify-center shadow-xs border border-white">
          <Scissors className="w-4 h-4" />
        </div>
      </header>

      {/* Main Floating Glass Container */}
      <section
        id="welcome-glass-card"
        className="relative z-20 mx-auto w-[350px] clay-card rounded-[34px] p-3.5 flex flex-col justify-between mt-1 max-h-[660px] overflow-hidden"
        dir="rtl"
      >
        {/* Upper Centerpiece Image Banner */}
        <div
          className="relative w-full h-[215px] rounded-[24px] overflow-hidden shadow-inner shrink-0 cursor-pointer group"
          onClick={onEnter}
        >
          <img
            src={ATELIER_IMAGES.yourNextCut}
            alt="آرایشگاه رویال تهران"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105 transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 pointer-events-none" />

          {/* Top Floating Badge */}
          <div className="absolute top-3.5 right-4 left-4 flex justify-between items-center">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-medium text-white border border-white/25">
              سیستم هوشمند رزرو نوبت
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-semibold shadow-xs">
              پذیرش آنلاین
            </span>
          </div>

          {/* Bottom Title overlay */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h2 className="text-xl font-bold tracking-tight leading-snug">
              رزرو نوبت آرایشگاه، بدون تماس تلفنی
            </h2>
            <p className="text-[11px] text-stone-200 font-light mt-1 leading-relaxed">
              نوبتتون رو در چند ثانیه رزرو کنید، آرایشگر و ساعت دلخواهتون رو انتخاب کنید و یادآوری خودکار دریافت کنید.
            </p>
          </div>
        </div>

        {/* 3 Value Pillars with soft colorful pastel iconography */}
        <div className="py-2.5 px-0.5 space-y-2">
          <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-2xs">
            <div className="w-7 h-7 rounded-xl bg-[#c5def0]/50 text-blue-900 flex items-center justify-center shrink-0 shadow-2xs">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-stone-800">
              رزرو آنلاین ۲۴ ساعته
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-2xs">
            <div className="w-7 h-7 rounded-xl bg-[#e4ddf6]/50 text-purple-900 flex items-center justify-center shrink-0 shadow-2xs">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-stone-800">
              یادآوری خودکار پیامکی
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-2xs">
            <div className="w-7 h-7 rounded-xl bg-[#fadfe8]/50 text-rose-900 flex items-center justify-center shrink-0 shadow-2xs">
              <HeartHandshake className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-semibold text-stone-800">
              سابقه و سلیقه شما نزد آرایشگر ثبت می‌شود
            </span>
          </div>
        </div>

        {/* Action Controls - One Clear Primary Action */}
        <div className="w-full space-y-2 pt-1 shrink-0">
          <button
            id="welcome-start-booking-btn"
            type="button"
            onClick={onStartOnboarding}
            className="clay-button-primary w-full py-3.5 px-4 rounded-[18px] text-xs font-bold tracking-normal flex items-center justify-center gap-2 cursor-pointer active:scale-[0.985] transition-all"
          >
            <span>شروع و رزرو نوبت</span>
            <ArrowLeft className="w-4 h-4 text-[#fedecb]" />
          </button>

          <button
            id="welcome-direct-services-btn"
            type="button"
            onClick={onEnter}
            className="w-full py-2 px-3 text-stone-600 hover:text-stone-900 rounded-xl text-xs font-medium tracking-normal flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <span>مشاهده مستقیم خدمات</span>
            <ChevronLeft className="w-3.5 h-3.5 text-stone-400" />
          </button>
        </div>
      </section>

      {/* Footer Info Strip */}
      <section className="relative z-20 px-6 mt-2 shrink-0" dir="rtl">
        <div className="p-2.5 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-2xs flex items-center justify-between text-[11px] text-stone-700 font-medium">
          <span>شعبه سعادت‌آباد · پذیرش با رزرو قبلی</span>
          <span className="text-emerald-700 font-bold">آماده خدمات</span>
        </div>
      </section>
    </AtelierShell>
  );
};
