import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Play, Sparkles, Calendar, MapPin } from 'lucide-react';
import { VideoModal } from './VideoModal';
import { AnimalInteractive } from './AnimalInteractive';
import { AutumnEnrollmentBanner } from './AutumnEnrollmentBanner';
import { locations, scheduleByLocation, LocationKey, groupSlots } from '../scheduleData';

export const HeroSection: React.FC<{ onCTAClick: () => void }> = ({ onCTAClick }) => {
  const { t } = useLanguage();
  const [showVideo, setShowVideo] = useState(false);
  const [activeLoc, setActiveLoc] = useState<LocationKey | null>(null);
  const activeLocation = activeLoc ? locations.find((l) => l.key === activeLoc)! : null;
  const slots = activeLoc ? scheduleByLocation[activeLoc] : [];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0F5]/30 via-white to-[#E0F2FE]/20" />
      
      {/* Minimal floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
              background: i % 2 === 0 ? '#FF69B4' : '#7DD3FC',
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <AutumnEnrollmentBanner onCTAClick={onCTAClick} />
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 text-center lg:text-left space-y-6 sm:space-y-8"
          >
            {/* Main Heading */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-4 px-6 py-2 bg-[#FF69B4]/10 rounded-full"
              >
                <span className="text-sm sm:text-base font-bold text-[#FF69B4]">
                  ✨ {t('heroSchedule')}
                </span>
              </motion.div>
              
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-[#FF69B4] to-[#FF1493] bg-clip-text text-transparent block mb-2">
                  EmoMotion
                </span>
                <span className="text-gray-900 block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                  {t('heroTitle')}
                </span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {t('heroSubtitle')}
              </motion.p>
            </div>

            {/* Location tabs + Schedule Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="max-w-6xl mx-auto lg:mx-0 space-y-3"
            >
              {/* Schedule heading */}
              <div className="text-center">
                <div className="text-base sm:text-lg font-bold text-gray-900">
                  {t('scheduleHeader')}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#FF69B4]">
                  {t('scheduleStartDate')}
                </div>
              </div>

              {/* Location tabs */}
              <div className="flex gap-2">
                {locations.map((loc) => {
                  const active = loc.key === activeLoc;
                  return (
                    <motion.button
                      key={loc.key}
                      type="button"
                      onClick={() => setActiveLoc(loc.key)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all ${
                        active ? 'bg-white text-gray-900' : 'bg-white/60 text-gray-600 hover:bg-white/90'
                      }`}
                      style={active ? { borderBottom: `3px solid ${loc.color}` } : undefined}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MapPin className="w-4 h-4 shrink-0" style={{ color: loc.color }} />
                      <span>{t(loc.nameKey as any)}</span>
                      <span className="hidden sm:inline text-xs font-semibold text-gray-500">
                        · {t(loc.addressKey as any)}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Schedule cards for active location */}
              {activeLocation && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {groupSlots(slots).map((group, gi) => (
                    <motion.div
                      key={`${activeLoc}-${gi}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => onCTAClick()}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCTAClick(); } }}
                      className="bg-white rounded-2xl p-3 lg:p-4 shadow-md border-2 border-transparent hover:border-[#FF69B4] transition-all min-w-0 cursor-pointer"
                      whileHover={{ y: -5, boxShadow: '0 20px 40px -10px rgba(255,105,180,0.2)' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <Calendar className="w-4 h-4 shrink-0" style={{ color: group.color }} />
                        <span className="text-sm font-bold text-gray-900 whitespace-nowrap">
                          {t(group.ageKey as any)}
                        </span>
                      </div>
                      {group.titleKey && (
                        <div
                          className="text-xs font-semibold mb-1"
                          style={{ color: group.color }}
                        >
                          {t(group.titleKey as any)}
                        </div>
                      )}
                      {group.times.map((tm, ti) => {
                        const days = tm.dayOverrideKey
                          ? t(tm.dayOverrideKey as any)
                          : t(activeLocation.daysKey as any);
                        return (
                          <div key={tm.id} className={ti > 0 ? 'mt-2 pt-2 border-t border-gray-100' : ''}>
                            <div
                              className="text-base lg:text-lg font-extrabold mb-0.5 whitespace-nowrap"
                              style={{ color: group.color }}
                            >
                              {t(tm.timeKey as any)}
                            </div>
                            <div className="text-sm text-gray-600 font-semibold">{days}</div>
                          </div>
                        );
                      })}
                    </motion.div>
                ))}
              </div>
              )}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.button
                onClick={() => onCTAClick()}
                className="group relative px-8 py-5 bg-gradient-to-r from-[#FF69B4] to-[#FF1493] text-white rounded-2xl font-bold text-lg shadow-xl overflow-hidden"
                whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(255,105,180,0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {t('ctaFree')}
                </span>
              </motion.button>

              <motion.button
                onClick={() => setShowVideo(true)}
                className="px-8 py-5 bg-white text-gray-800 rounded-2xl font-semibold text-lg shadow-lg border-2 border-gray-200 hover:border-[#7DD3FC] transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <Play className="w-5 h-5 text-[#7DD3FC]" />
                  {t('ctaVideo')}
                </span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-700 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="font-semibold">4.9/5</span>
              </div>
              <div className="w-px h-6 bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className="text-2xl">👥</span>
                <span className="font-semibold">{t('stats500Kids')}</span>
              </div>
              <div className="w-px h-6 bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <span className="font-semibold">{t('statsPrague')}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Animals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 relative"
          >
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF69B4]/10 to-[#7DD3FC]/10 blur-3xl" />
            <div className="relative">
              <AnimalInteractive />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={showVideo} onClose={() => setShowVideo(false)} />
    </section>
  );
};