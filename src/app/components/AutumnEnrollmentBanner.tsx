import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const DEADLINE = new Date('2026-07-31T23:59:59');

type Unit = { value: number; labelKey: string };

function calcRemaining(deadline: Date) {
  const diff = Math.max(0, deadline.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: diff === 0,
  };
}

export const AutumnEnrollmentBanner: React.FC<{ onCTAClick: () => void }> = ({ onCTAClick }) => {
  const { t } = useLanguage();
  const [remaining, setRemaining] = useState(() => calcRemaining(DEADLINE));

  useEffect(() => {
    const id = setInterval(() => setRemaining(calcRemaining(DEADLINE)), 1000);
    return () => clearInterval(id);
  }, []);

  if (remaining.expired) return null;

  const units: Unit[] = [
    { value: remaining.days, labelKey: 'autumnBannerDays' },
    { value: remaining.hours, labelKey: 'autumnBannerHours' },
    { value: remaining.minutes, labelKey: 'autumnBannerMinutes' },
    { value: remaining.seconds, labelKey: 'autumnBannerSeconds' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFF7ED] via-[#FFF0F5] to-[#FFF7ED] p-4 sm:p-5 mb-6 shadow-md"
    >
      {/* Decorative autumn leaves */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-2 -left-1 text-3xl sm:text-4xl opacity-60 pointer-events-none select-none"
        animate={{ rotate: [-8, 12, -8], y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🍁
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute top-1 right-4 text-2xl sm:text-3xl opacity-50 pointer-events-none select-none"
        animate={{ rotate: [10, -10, 10], y: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        🍂
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-2 right-12 text-2xl sm:text-3xl opacity-40 pointer-events-none select-none"
        animate={{ rotate: [-15, 15, -15], y: [0, -3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        🍁
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute bottom-1 left-1/3 text-xl sm:text-2xl opacity-40 pointer-events-none select-none hidden sm:block"
        animate={{ rotate: [0, 20, 0], x: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        🍃
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute top-1/2 right-1/3 text-xl opacity-30 pointer-events-none select-none hidden lg:block"
        animate={{ rotate: [0, -25, 0], y: [0, 4, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        🍂
      </motion.div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
        {/* Left: Title + subtitle */}
        <div className="text-center lg:text-left lg:flex-1">
          <div className="text-base sm:text-lg font-extrabold text-[#FB923C]">
            🍂 {t('autumnBannerTitle')}
          </div>
          <div className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">
            {t('autumnBannerSubtitle')}
          </div>
        </div>

        {/* Center: Countdown */}
        <div className="flex gap-2 sm:gap-3">
          {units.map((u, i) => (
            <div
              key={i}
              className="w-14 sm:w-16 h-14 sm:h-16 bg-white rounded-xl shadow-sm border border-[#FB923C]/20 flex flex-col items-center justify-center"
            >
              <div className="text-xl sm:text-2xl font-extrabold text-[#FB923C] leading-none tabular-nums">
                {String(u.value).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500 font-semibold mt-0.5">
                {t(u.labelKey as any)}
              </div>
            </div>
          ))}
        </div>

        {/* Right: CTA */}
        <motion.button
          type="button"
          onClick={onCTAClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FF69B4] to-[#FF1493] text-white rounded-2xl font-bold text-sm shadow-md lg:flex-shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t('autumnBannerCTA')}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
