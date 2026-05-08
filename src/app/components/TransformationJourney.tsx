import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Heart, 
  Users, 
  Trophy, 
  Rocket, 
  Star,
  Brain,
  Smile,
  Zap,
  Target,
  Award,
  TrendingUp
} from 'lucide-react';

interface JourneyStep {
  id: number;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  skillKeys: string[];
  emoji: string;
  color: string;
  gradient: string;
  icon: React.ElementType;
  futureKey: string;
}

const journeySteps: JourneyStep[] = [
  {
    id: 1,
    titleKey: 'journeyStep1Title',
    subtitleKey: 'journeyStep1Subtitle',
    descriptionKey: 'journeyStep1Desc',
    skillKeys: ['journeyStep1Skill1', 'journeyStep1Skill2', 'journeyStep1Skill3'],
    emoji: '🌱',
    color: '#10B981',
    gradient: 'from-green-400 to-emerald-500',
    icon: Sparkles,
    futureKey: 'journeyStep1Future',
  },
  {
    id: 2,
    titleKey: 'journeyStep2Title',
    subtitleKey: 'journeyStep2Subtitle',
    descriptionKey: 'journeyStep2Desc',
    skillKeys: ['journeyStep2Skill1', 'journeyStep2Skill2', 'journeyStep2Skill3'],
    emoji: '🎭',
    color: '#8B5CF6',
    gradient: 'from-violet-400 to-purple-500',
    icon: Heart,
    futureKey: 'journeyStep2Future',
  },
  {
    id: 3,
    titleKey: 'journeyStep3Title',
    subtitleKey: 'journeyStep3Subtitle',
    descriptionKey: 'journeyStep3Desc',
    skillKeys: ['journeyStep3Skill1', 'journeyStep3Skill2', 'journeyStep3Skill3'],
    emoji: '🦸',
    color: '#EC4899',
    gradient: 'from-pink-400 to-rose-500',
    icon: Users,
    futureKey: 'journeyStep3Future',
  },
  {
    id: 4,
    titleKey: 'journeyStep4Title',
    subtitleKey: 'journeyStep4Subtitle',
    descriptionKey: 'journeyStep4Desc',
    skillKeys: ['journeyStep4Skill1', 'journeyStep4Skill2', 'journeyStep4Skill3'],
    emoji: '💪',
    color: '#F59E0B',
    gradient: 'from-amber-400 to-orange-500',
    icon: Trophy,
    futureKey: 'journeyStep4Future',
  },
  {
    id: 5,
    titleKey: 'journeyStep5Title',
    subtitleKey: 'journeyStep5Subtitle',
    descriptionKey: 'journeyStep5Desc',
    skillKeys: ['journeyStep5Skill1', 'journeyStep5Skill2', 'journeyStep5Skill3', 'journeyStep5Skill4', 'journeyStep5Skill5'],
    emoji: '🚀',
    color: '#06B6D4',
    gradient: 'from-cyan-400 to-blue-500',
    icon: Rocket,
    futureKey: 'journeyStep5Future',
  },
];

export const TransformationJourney: React.FC = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
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
            <Star className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-bold text-gray-700">{t('journeyBadge')}</span>
            <Star className="w-4 h-4 text-pink-600" />
          </motion.div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-5"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {t('journeyTitle')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('journeySubtitle')}
          </p>

          {/* Interactive hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-yellow-500" />
            {t('journeyHint')}
          </motion.p>
        </motion.div>

        {/* Journey Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical connecting line */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-purple-400 via-pink-400 via-orange-400 to-cyan-400 opacity-30 hidden sm:block" 
            style={{ transform: 'translateX(-50%)' }}
          />

          {/* Steps */}
          <div className="space-y-8 sm:space-y-12">
            {journeySteps.map((step, index) => {
              const isActive = activeStep === step.id;
              const isHovered = hoveredStep === step.id;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`relative ${isEven ? 'sm:pr-8 lg:pr-12' : 'sm:pl-8 lg:pl-12'} sm:w-1/2 ${!isEven ? 'sm:ml-auto' : ''}`}
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className={`absolute top-8 w-12 h-12 rounded-full flex items-center justify-center shadow-xl z-10 ${
                      isEven 
                        ? 'left-8 sm:left-auto sm:right-[-1.5rem] lg:right-[-1.75rem]' 
                        : 'left-8 sm:left-[-1.5rem] lg:left-[-1.75rem]'
                    }`}
                    style={{ 
                      backgroundColor: step.color,
                    }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-2xl">{step.emoji}</span>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    className="relative cursor-pointer ml-20 sm:ml-0"
                    onClick={() => setActiveStep(isActive ? null : step.id)}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Glow effect */}
                    <motion.div
                      className="absolute -inset-1 rounded-3xl opacity-0 blur-xl"
                      style={{ background: step.color }}
                      animate={{
                        opacity: isHovered || isActive ? 0.4 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative bg-white rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-gray-100 overflow-hidden">
                      {/* Top gradient bar */}
                      <div 
                        className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${step.gradient}`}
                      />

                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div
                          className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                          animate={isHovered ? {
                            rotate: [0, -10, 10, 0],
                            scale: [1, 1.1, 1],
                          } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <step.icon className="w-7 h-7 text-white" />
                        </motion.div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                              {t('journeyStage')} {step.id}
                            </span>
                            {isActive && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full"
                              >
                                {t('journeyExpanded')}
                              </motion.div>
                            )}
                          </div>
                          <h3 
                            className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            {t(step.titleKey)}
                          </h3>
                          <p className="text-sm font-bold" style={{ color: step.color }}>
                            {t(step.subtitleKey)}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {t(step.descriptionKey)}
                      </p>

                      {/* Expandable content */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            {/* Skills */}
                            <div className="mb-4 p-4 rounded-2xl bg-gray-50 border-2 border-gray-200">
                              <div className="flex items-center gap-2 mb-3">
                                <Brain className="w-5 h-5" style={{ color: step.color }} />
                                <h4 className="font-bold text-gray-900">{t('journeySkillsTitle')}</h4>
                              </div>
                              <div className="space-y-2">
                                {step.skillKeys.map((skillKey, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-2"
                                  >
                                    <div 
                                      className="flex-shrink-0 w-2 h-2 rounded-full mt-2"
                                      style={{ backgroundColor: step.color }}
                                    />
                                    <span className="text-sm text-gray-700">{t(skillKey)}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            {/* Future impact */}
                            <div className="p-4 rounded-2xl border-2" style={{ 
                              backgroundColor: `${step.color}10`,
                              borderColor: `${step.color}40`,
                            }}>
                              <div className="flex items-start gap-3">
                                <motion.div
                                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: step.color }}
                                  animate={{
                                    rotate: [0, 360],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                >
                                  <TrendingUp className="w-5 h-5 text-white" />
                                </motion.div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-gray-900 mb-1">
                                    {t('journeyFutureTitle')}
                                  </h4>
                                  <p className="text-sm text-gray-700 font-semibold">
                                    {t(step.futureKey)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Click hint */}
                      {!isActive && (
                        <motion.div
                          className="mt-4 flex items-center gap-2 text-sm font-bold"
                          style={{ color: step.color }}
                          animate={{
                            x: [0, 5, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        >
                          <span>{t('journeyClickHint')}</span>
                          <Zap className="w-4 h-4" />
                        </motion.div>
                      )}

                      {/* Floating particles on hover */}
                      {isHovered && (
                        <>
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute"
                              style={{
                                top: `${Math.random() * 80 + 10}%`,
                                left: `${Math.random() * 80 + 10}%`,
                              }}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0],
                                y: [0, -30],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            >
                              <Sparkles className="w-3 h-3" style={{ color: step.color }} />
                            </motion.div>
                          ))}
                        </>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="inline-block p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 border-2 border-purple-200 shadow-2xl max-w-3xl">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="text-6xl mb-4"
            >
              ✨🚀💫
            </motion.div>
            <h3 
              className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {t('journeyBottomTitle')}
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {t('journeyBottomDesc')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};