import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Clock, Users, Zap, Sparkles, ArrowRight } from 'lucide-react';

export const AgePrograms: React.FC<{ onCTAClick: () => void }> = ({ onCTAClick }) => {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const programs = [
    {
      emoji: '🎨',
      color: '#FF69B4',
      lightBg: '#FFF0F5',
      darkColor: '#FF1493',
    },
    {
      emoji: '🎭',
      color: '#7DD3FC',
      lightBg: '#E0F2FE',
      darkColor: '#0EA5E9',
    },
    {
      emoji: '✨',
      color: '#A78BFA',
      lightBg: '#EDE9FE',
      darkColor: '#7C3AED',
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {programs.map((program, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: '300px',
              height: '300px',
              background: `radial-gradient(circle, ${program.color}30, transparent 70%)`,
              left: `${15 + i * 30}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
            animate={{
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-100 via-pink-100 to-cyan-100 mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-bold text-gray-700">{t('ageProgramsBadge')}</span>
            <Sparkles className="w-4 h-4 text-pink-600" />
          </motion.div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-5"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {t('ageProgramsTitle')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('ageProgramsSubtitle')}
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16 max-w-7xl mx-auto">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative"
            >
              {/* Card */}
              <motion.div
                className="relative bg-white rounded-3xl shadow-xl overflow-hidden h-full"
                style={{
                  borderTop: `4px solid ${program.color}`,
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute -inset-0.5 rounded-3xl opacity-0 blur-xl"
                  style={{ background: program.color }}
                  animate={{
                    opacity: hoveredIndex === index ? 0.3 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative p-6 sm:p-7">
                  {/* Age Badge */}
                  <motion.div
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-white text-sm shadow-lg"
                    style={{ backgroundColor: program.color }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-2xl">{program.emoji}</span>
                    <span>{t(index === 0 ? 'ageRange25' : index === 1 ? 'ageRange35' : 'ageRange58')}</span>
                  </motion.div>

                  {/* Info Cards */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {/* Duration */}
                    <motion.div
                      className="rounded-2xl p-4 border-2"
                      style={{ 
                        backgroundColor: program.lightBg,
                        borderColor: `${program.color}30`,
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4" style={{ color: program.color }} />
                        <span className="text-xs font-bold text-gray-600">{t('duration')}</span>
                      </div>
                      <p className="text-sm font-bold" style={{ color: program.darkColor }}>
                        {t(index === 0 ? 'duration40' : index === 1 ? 'duration45' : 'duration50')}
                      </p>
                    </motion.div>

                    {/* Group Size */}
                    <motion.div
                      className="rounded-2xl p-4 border-2"
                      style={{ 
                        backgroundColor: program.lightBg,
                        borderColor: `${program.color}30`,
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4" style={{ color: program.color }} />
                        <span className="text-xs font-bold text-gray-600">{t('group')}</span>
                      </div>
                      <p className="text-sm font-bold" style={{ color: program.darkColor }}>
                        {t(index === 0 ? 'groupSize8' : 'groupSize10')}
                      </p>
                    </motion.div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 leading-relaxed mb-6">
                    {t(index === 0 ? 'program25Description' : index === 1 ? 'program35Description' : 'program58Description')}
                  </p>

                  {/* Transformation Block */}
                  <motion.div
                    className="rounded-2xl p-4 border-2"
                    style={{ 
                      backgroundColor: program.lightBg,
                      borderColor: program.color,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex items-start gap-3">
                      <motion.div
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: program.color }}
                        animate={hoveredIndex === index ? {
                          rotate: [0, -10, 10, 0],
                          scale: [1, 1.1, 1],
                        } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <Zap className="w-4 h-4 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-xs font-bold mb-1" style={{ color: program.darkColor }}>
                          {t('transformationLabel')}
                        </p>
                        <p className="text-sm font-semibold text-gray-800 leading-relaxed">
                          {t(index === 0 ? 'transformation25' : index === 1 ? 'transformation35' : 'transformation58')}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating sparkles on hover */}
                  {hoveredIndex === index && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute"
                          style={{
                            top: `${20 + i * 30}%`,
                            right: `${10 + i * 10}%`,
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            y: [0, -20],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        >
                          <Sparkles className="w-4 h-4" style={{ color: program.color }} />
                        </motion.div>
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <motion.div
            className="inline-block relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated glow */}
            <motion.div
              className="absolute -inset-2 rounded-2xl opacity-50 blur-xl"
              animate={{
                background: [
                  'linear-gradient(45deg, #9333EA, #EC4899)',
                  'linear-gradient(90deg, #EC4899, #06B6D4)',
                  'linear-gradient(135deg, #06B6D4, #9333EA)',
                  'linear-gradient(45deg, #9333EA, #EC4899)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />

            <button
              onClick={onCTAClick}
              className="relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#FF69B4] to-[#FF1493] text-white rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 flex items-center gap-3"
            >
              <span>{t('ageProgramsCTA')}</span>
              <motion.div
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm text-gray-600"
          >
            {t('ageProgramsFirstFree').split(' — ')[0]} — <span className="font-bold text-[#FF69B4]">{t('ageProgramsFirstFree').split(' — ')[1]}</span>
          </motion.p>
        </motion.div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-10 left-10 opacity-20 pointer-events-none">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
            }}
            className="text-6xl"
          >
            {programs[0].emoji}
          </motion.div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-20 pointer-events-none">
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
            }}
            className="text-6xl"
          >
            {programs[1].emoji}
          </motion.div>
        </div>
      </div>
    </section>
  );
};