import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Users, Target, Smile, Award } from 'lucide-react';

const problems = [
  {
    problemKey: 'recognizeProblem1',
    solutionKey: 'recognizeSolution1',
    emoji: '😳',
    solutionEmoji: '🎬',
    icon: Target,
    color: '#FF69B4',
    lightBg: '#FFF0F5',
  },
  {
    problemKey: 'recognizeProblem2',
    solutionKey: 'recognizeSolution2',
    emoji: '📱',
    solutionEmoji: '💃',
    icon: Smile,
    color: '#7DD3FC',
    lightBg: '#E0F2FE',
  },
  {
    problemKey: 'recognizeProblem3',
    solutionKey: 'recognizeSolution3',
    emoji: '😔',
    solutionEmoji: '🎉',
    icon: Heart,
    color: '#FDE047',
    lightBg: '#FEF9C3',
  },
  {
    problemKey: 'recognizeProblem4',
    solutionKey: 'recognizeSolution4',
    emoji: '😢',
    solutionEmoji: '🦁',
    icon: Award,
    color: '#C4B5FD',
    lightBg: '#F3E8FF',
  },
  {
    problemKey: 'recognizeProblem5',
    solutionKey: 'recognizeSolution5',
    emoji: '😤',
    solutionEmoji: '🤝',
    icon: Users,
    color: '#34D399',
    lightBg: '#D1FAE5',
  },
  {
    problemKey: 'recognizeProblem6',
    solutionKey: 'recognizeSolution6',
    emoji: '😰',
    solutionEmoji: '⭐',
    icon: Sparkles,
    color: '#FB923C',
    lightBg: '#FFEDD5',
  },
];

export const RecognizeSection: React.FC = () => {
  const { t } = useLanguage();
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              background: `radial-gradient(circle, ${problems[i]?.color}20, transparent 70%)`,
              left: `${10 + i * 20}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {t('recognizeTitle')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            {t('recognizeSubtitle')}
          </p>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {problems.map((item, i) => (
              <motion.div
                key={i}
                className="relative"
                animate={{
                  scale: flippedCards.has(i) ? 1.2 : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: flippedCards.has(i) ? item.color : '#E5E7EB',
                    color: flippedCards.has(i) ? 'white' : '#9CA3AF',
                  }}
                >
                  {flippedCards.has(i) ? '✓' : i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {problems.map((item, index) => {
            const isFlipped = flippedCards.has(index);
            const isHovered = hoveredCard === index;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.problemKey}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative h-[320px] sm:h-[360px]"
                style={{ perspective: '1500px' }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card */}
                <motion.div
                  className="relative w-full h-full cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{
                    rotateY: isFlipped ? 180 : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                  onClick={() => toggleCard(index)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* FRONT - Problem */}
                  <div
                    className="absolute inset-0 rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Dark pattern overlay */}
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)`,
                      }}
                    />

                    {/* Content */}
                    <div className="relative h-full flex flex-col p-7 sm:p-8">
                      {/* Top badge */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            {t('cardProblem')}
                          </span>
                        </div>
                        <motion.div
                          animate={isHovered ? {
                            rotate: [0, -10, 10, 0],
                          } : {}}
                          transition={{ duration: 0.5 }}
                          className="text-4xl"
                        >
                          {item.emoji}
                        </motion.div>
                      </div>

                      {/* Main text */}
                      <div className="flex-1 flex items-center">
                        <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                          {t(item.problemKey as any)}
                        </p>
                      </div>

                      {/* Bottom hint */}
                      <div className="mt-auto">
                        <motion.div
                          className="flex items-center justify-center gap-2 text-white/70 text-sm py-3 px-4 rounded-xl bg-white/5 border border-white/10"
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          <motion.span
                            animate={{
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            🔄
                          </motion.span>
                          <span className="font-medium">{t('cardClickHint')}</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Decorative glow */}
                    <div
                      className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>

                  {/* BACK - Solution */}
                  <div
                    className="absolute inset-0 rounded-3xl shadow-2xl overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      backgroundColor: item.lightBg,
                    }}
                  >
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-40">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`dots-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="2" fill={item.color} opacity="0.3" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#dots-${index})`} />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col p-7 sm:p-8">
                      {/* Top section */}
                      <div className="flex items-center justify-between mb-6">
                        <motion.div
                          className="flex items-center gap-2 px-4 py-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ scale: 0, x: -50 }}
                          animate={isFlipped ? {
                            scale: 1,
                            x: 0,
                          } : { scale: 0, x: -50 }}
                          transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
                        >
                          <Icon className="w-4 h-4 text-white" />
                          <span className="text-xs font-bold text-white uppercase tracking-wider">
                            EmoMotion
                          </span>
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={isFlipped ? {
                            scale: 1,
                            rotate: 0,
                          } : { scale: 0, rotate: -180 }}
                          transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 150 }}
                          className="text-5xl"
                        >
                          {item.solutionEmoji}
                        </motion.div>
                      </div>

                      {/* Main solution text */}
                      <motion.div
                        className="flex-1 flex items-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isFlipped ? {
                          opacity: 1,
                          y: 0,
                        } : { opacity: 0, y: 30 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <p className="text-lg sm:text-xl font-bold text-gray-900 leading-relaxed">
                          {t(item.solutionKey as any)}
                        </p>
                      </motion.div>

                      {/* Success indicator */}
                      <motion.div
                        className="mt-auto flex items-center gap-3 p-4 rounded-2xl border-2"
                        style={{ 
                          borderColor: item.color,
                          backgroundColor: 'white',
                        }}
                        initial={{ scale: 0, y: 50 }}
                        animate={isFlipped ? {
                          scale: 1,
                          y: 0,
                        } : { scale: 0, y: 50 }}
                        transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 200 }}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        >
                          <motion.svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                            initial={{ pathLength: 0 }}
                            animate={isFlipped ? { pathLength: 1 } : { pathLength: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </motion.svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">{t('modalItWorks')}</p>
                          <p className="text-xs text-gray-600">{t('modalClickAgain')}</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Floating sparkles */}
                    {isFlipped && [...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          top: `${20 + i * 15}%`,
                          left: `${10 + i * 20}%`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          y: [0, -30, -60],
                        }}
                        transition={{
                          delay: 0.7 + i * 0.1,
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      >
                        <Sparkles className="w-4 h-4" style={{ color: item.color }} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Final Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative"
        >
          {/* Glowing border */}
          <motion.div
            className="absolute -inset-1 rounded-3xl opacity-50 blur-2xl"
            animate={{
              background: [
                `linear-gradient(45deg, ${problems[0].color}, ${problems[1].color})`,
                `linear-gradient(90deg, ${problems[2].color}, ${problems[3].color})`,
                `linear-gradient(135deg, ${problems[4].color}, ${problems[5].color})`,
                `linear-gradient(45deg, ${problems[0].color}, ${problems[1].color})`,
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          />

          <div className="relative bg-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl">
            {/* Corner decorations */}
            {[
              { emoji: '🎨', pos: { top: '1rem', left: '1rem' } },
              { emoji: '💫', pos: { top: '1rem', right: '1rem' } },
              { emoji: '🌟', pos: { bottom: '1rem', left: '1rem' } },
              { emoji: '✨', pos: { bottom: '1rem', right: '1rem' } },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl"
                style={item.pos}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                {item.emoji}
              </motion.div>
            ))}

            <p
              className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-center leading-relaxed px-12"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <span className="bg-gradient-to-r from-[#FF69B4] via-[#7DD3FC] to-[#34D399] bg-clip-text text-transparent">
                {t('recognizeForWho')}
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};