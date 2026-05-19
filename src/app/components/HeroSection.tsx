import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Play, Sparkles, Calendar } from 'lucide-react';
import { VideoModal } from './VideoModal';
import { AnimalInteractive } from './AnimalInteractive';

export const HeroSection: React.FC<{ onCTAClick: () => void }> = ({ onCTAClick }) => {
  const { t } = useLanguage();
  const [showVideo, setShowVideo] = useState(false);

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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-6 sm:space-y-8"
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

            {/* Schedule Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 max-w-5xl mx-auto lg:mx-0"
            >
              {[
                { age: t('age23'), time: t('time23'), days: t('days23'), color: '#FACC15' },
                { age: t('age46'), time: t('time46'), days: t('days46'), color: '#FF69B4' },
                { age: t('age79'), time: t('time79'), days: t('days79'), color: '#7DD3FC' },
                { age: t('age3545'), time: t('time3545'), days: t('days3545'), color: '#34D399' },
                { age: t('age1012'), time: t('time1012'), days: t('days1012'), color: '#A78BFA' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl p-4 shadow-md border-2 border-transparent hover:border-[#FF69B4] transition-all"
                  whileHover={{ y: -5, boxShadow: '0 20px 40px -10px rgba(255,105,180,0.2)' }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Calendar className="w-4 h-4 shrink-0" style={{ color: item.color }} />
                    <span className="text-sm font-bold text-gray-900 whitespace-nowrap">{item.age}</span>
                  </div>
                  <div className="text-lg font-extrabold mb-1 whitespace-nowrap" style={{ color: item.color }}>
                    {item.time}
                  </div>
                  <div className="text-sm text-gray-600 font-semibold">
                    {item.days}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.button
                onClick={onCTAClick}
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
            className="relative"
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