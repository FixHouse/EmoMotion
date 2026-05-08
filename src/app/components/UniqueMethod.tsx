import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Heart, 
  Users, 
  Sparkles, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Target,
  Lightbulb,
  Award
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  questionKey: string;
  options: {
    textKey: string;
    icon: React.ElementType;
    color: string;
    trait: 'sensitive' | 'balanced' | 'confident' | 'creative' | 'analytical' | 'social';
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    questionKey: 'quizQ1',
    options: [
      { textKey: 'quizQ1A1', icon: Heart, color: '#EC4899', trait: 'sensitive' },
      { textKey: 'quizQ1A2', icon: Brain, color: '#8B5CF6', trait: 'analytical' },
      { textKey: 'quizQ1A3', icon: Sparkles, color: '#06B6D4', trait: 'social' },
    ],
  },
  {
    id: 2,
    questionKey: 'quizQ2',
    options: [
      { textKey: 'quizQ2A1', icon: Zap, color: '#F59E0B', trait: 'sensitive' },
      { textKey: 'quizQ2A2', icon: Heart, color: '#EC4899', trait: 'analytical' },
      { textKey: 'quizQ2A3', icon: Brain, color: '#8B5CF6', trait: 'balanced' },
    ],
  },
  {
    id: 3,
    questionKey: 'quizQ3',
    options: [
      { textKey: 'quizQ3A1', icon: Users, color: '#EC4899', trait: 'sensitive' },
      { textKey: 'quizQ3A2', icon: Target, color: '#8B5CF6', trait: 'balanced' },
      { textKey: 'quizQ3A3', icon: Award, color: '#06B6D4', trait: 'confident' },
    ],
  },
  {
    id: 4,
    questionKey: 'quizQ4',
    options: [
      { textKey: 'quizQ4A1', icon: Heart, color: '#EC4899', trait: 'sensitive' },
      { textKey: 'quizQ4A2', icon: Zap, color: '#F59E0B', trait: 'confident' },
      { textKey: 'quizQ4A3', icon: Users, color: '#06B6D4', trait: 'social' },
    ],
  },
  {
    id: 5,
    questionKey: 'quizQ5',
    options: [
      { textKey: 'quizQ5A1', icon: Brain, color: '#EC4899', trait: 'sensitive' },
      { textKey: 'quizQ5A2', icon: Lightbulb, color: '#8B5CF6', trait: 'balanced' },
      { textKey: 'quizQ5A3', icon: Sparkles, color: '#06B6D4', trait: 'analytical' },
    ],
  },
  {
    id: 6,
    questionKey: 'quizQ6',
    options: [
      { textKey: 'quizQ6A1', icon: Heart, color: '#EC4899', trait: 'sensitive' },
      { textKey: 'quizQ6A2', icon: Target, color: '#8B5CF6', trait: 'balanced' },
      { textKey: 'quizQ6A3', icon: Sparkles, color: '#06B6D4', trait: 'creative' },
    ],
  },
];

export const UniqueMethod: React.FC = () => {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    
    setTimeout(() => {
      const newAnswers = [...answers, optionIndex];
      setAnswers(newAnswers);
      
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 600);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  // Analyze quiz results
  const analyzeResults = () => {
    const traits: Record<string, number> = {
      sensitive: 0,
      balanced: 0,
      confident: 0,
      creative: 0,
      analytical: 0,
      social: 0,
    };

    // Count traits from answers
    answers.forEach((answerIndex, questionIndex) => {
      const trait = quizQuestions[questionIndex].options[answerIndex].trait;
      traits[trait]++;
    });

    // Find dominant traits (top 2)
    const sortedTraits = Object.entries(traits)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);

    const dominant1 = sortedTraits[0][0];
    const dominant2 = sortedTraits.length > 1 ? sortedTraits[1][0] : null;

    // Define personality profiles
    const profiles: Record<string, { titleKey: string; descKey: string; talentKeys: string[]; color: string; icon: React.ElementType }> = {
      sensitive: {
        titleKey: 'profileSensitiveTitle',
        descKey: 'profileSensitiveDesc',
        talentKeys: ['profileSensitiveTalent1', 'profileSensitiveTalent2', 'profileSensitiveTalent3'],
        color: '#EC4899',
        icon: Heart,
      },
      balanced: {
        titleKey: 'profileBalancedTitle',
        descKey: 'profileBalancedDesc',
        talentKeys: ['profileBalancedTalent1', 'profileBalancedTalent2', 'profileBalancedTalent3'],
        color: '#8B5CF6',
        icon: Target,
      },
      confident: {
        titleKey: 'profileConfidentTitle',
        descKey: 'profileConfidentDesc',
        talentKeys: ['profileConfidentTalent1', 'profileConfidentTalent2', 'profileConfidentTalent3'],
        color: '#06B6D4',
        icon: Award,
      },
      creative: {
        titleKey: 'profileCreativeTitle',
        descKey: 'profileCreativeDesc',
        talentKeys: ['profileCreativeTalent1', 'profileCreativeTalent2', 'profileCreativeTalent3'],
        color: '#F59E0B',
        icon: Sparkles,
      },
      analytical: {
        titleKey: 'profileAnalyticalTitle',
        descKey: 'profileAnalyticalDesc',
        talentKeys: ['profileAnalyticalTalent1', 'profileAnalyticalTalent2', 'profileAnalyticalTalent3'],
        color: '#8B5CF6',
        icon: Brain,
      },
      social: {
        titleKey: 'profileSocialTitle',
        descKey: 'profileSocialDesc',
        talentKeys: ['profileSocialTalent1', 'profileSocialTalent2', 'profileSocialTalent3'],
        color: '#06B6D4',
        icon: Users,
      },
    };

    const mainProfile = profiles[dominant1];
    const secondProfile = dominant2 ? profiles[dominant2] : null;

    return { mainProfile, secondProfile };
  };

  const { mainProfile, secondProfile } = showResult ? analyzeResults() : { mainProfile: null, secondProfile: null };

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-white">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-100 via-pink-100 to-cyan-100 mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Brain className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-bold text-gray-700">{t('quizBadge')}</span>
            <Sparkles className="w-4 h-4 text-pink-600" />
          </motion.div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-5"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {t('quizTitle').split(' ')[0]} <span className="bg-gradient-to-r from-[#FF69B4] to-[#8B5CF6] bg-clip-text text-transparent">
              {t('quizTitle').split(' ')[1]}
            </span> {t('quizTitle').split(' ').slice(2).join(' ')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('quizSubtitle')}
          </p>
        </motion.div>

        {/* Quiz Container */}
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-100"
            >
              {/* Progress bar */}
              <div className="relative h-3 bg-gray-100">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-r-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <div className="absolute inset-0 flex items-center justify-end pr-4">
                  <span className="text-xs font-bold text-gray-600">
                    {currentQuestion + 1}/{quizQuestions.length}
                  </span>
                </div>
              </div>

              {/* Question */}
              <div className="p-6 sm:p-10 lg:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Question number badge */}
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <Lightbulb className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-bold text-purple-800">
                        {t('quizQuestionLabel')} {currentQuestion + 1}
                      </span>
                    </motion.div>

                    {/* Question text */}
                    <h3 
                      className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-8 sm:mb-10 leading-tight"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {t(quizQuestions[currentQuestion].questionKey)}
                    </h3>

                    {/* Options */}
                    <div className="space-y-4">
                      {quizQuestions[currentQuestion].options.map((option, index) => {
                        const Icon = option.icon;
                        const isSelected = selectedOption === index;
                        const isHovered = hoveredOption === index;

                        return (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            onClick={() => handleAnswer(index)}
                            onMouseEnter={() => setHoveredOption(index)}
                            onMouseLeave={() => setHoveredOption(null)}
                            disabled={selectedOption !== null}
                            className="relative w-full group"
                          >
                            {/* Glow effect */}
                            <motion.div
                              className="absolute -inset-1 rounded-2xl opacity-0 blur-xl"
                              style={{ background: option.color }}
                              animate={{
                                opacity: isHovered || isSelected ? 0.4 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            />

                            <div
                              className={`relative flex items-center gap-4 p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${
                                isSelected
                                  ? 'border-transparent shadow-2xl scale-105'
                                  : isHovered
                                  ? 'border-gray-300 shadow-lg'
                                  : 'border-gray-200 shadow-md'
                              }`}
                              style={{
                                backgroundColor: isSelected ? `${option.color}15` : 'white',
                                borderColor: isSelected ? option.color : undefined,
                              }}
                            >
                              {/* Icon */}
                              <motion.div
                                className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg"
                                style={{ 
                                  backgroundColor: isSelected ? option.color : `${option.color}20`,
                                }}
                                animate={isSelected ? {
                                  rotate: [0, 360],
                                  scale: [1, 1.2, 1],
                                } : isHovered ? {
                                  scale: 1.1,
                                } : {}}
                                transition={{ duration: 0.6 }}
                              >
                                <Icon 
                                  className="w-6 h-6 sm:w-7 sm:h-7" 
                                  style={{ color: isSelected ? 'white' : option.color }}
                                />
                              </motion.div>

                              {/* Text */}
                              <span 
                                className={`flex-1 text-left text-sm sm:text-base lg:text-lg font-semibold ${
                                  isSelected ? 'text-gray-900' : 'text-gray-700'
                                }`}
                              >
                                {t(option.textKey)}
                              </span>

                              {/* Check icon when selected */}
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ type: "spring", stiffness: 200 }}
                                >
                                  <CheckCircle 
                                    className="w-6 h-6 sm:w-7 sm:h-7" 
                                    style={{ color: option.color }}
                                  />
                                </motion.div>
                              )}

                              {/* Arrow on hover */}
                              {isHovered && !isSelected && (
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="flex-shrink-0"
                                >
                                  <ArrowRight 
                                    className="w-5 h-5" 
                                    style={{ color: option.color }}
                                  />
                                </motion.div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            // Result Screen
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-200 p-8 sm:p-12 lg:p-16 text-center"
            >
              {/* Success animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                className="mb-8"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="inline-block"
                >
                  <Award className="w-20 h-20 sm:w-24 sm:h-24 text-purple-600 mx-auto" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {t('quizResultTitle')}
                </h3>

                {/* Main Profile */}
                {mainProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8 max-w-2xl mx-auto"
                  >
                    <div 
                      className="p-6 sm:p-8 rounded-3xl bg-white shadow-xl border-2 text-left"
                      style={{ borderColor: `${mainProfile.color}40` }}
                    >
                      {/* Profile icon and title */}
                      <div className="flex items-center gap-4 mb-4">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                          style={{ backgroundColor: `${mainProfile.color}20` }}
                        >
                          <mainProfile.icon className="w-8 h-8" style={{ color: mainProfile.color }} />
                        </div>
                        <div>
                          <h4 
                            className="text-xl sm:text-2xl font-bold"
                            style={{ fontFamily: 'Poppins, sans-serif', color: mainProfile.color }}
                          >
                            {t(mainProfile.titleKey)}
                          </h4>
                          <p className="text-sm text-gray-500">{t('quizDominantTrait')}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-base text-gray-700 leading-relaxed mb-5">
                        {t(mainProfile.descKey)}
                      </p>

                      {/* Talents */}
                      <div>
                        <p className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" style={{ color: mainProfile.color }} />
                          {t('quizTalentsLabel')}
                        </p>
                        <ul className="space-y-2">
                          {mainProfile.talentKeys.map((talentKey, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + idx * 0.1 }}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: mainProfile.color }} />
                              <span>{t(talentKey)}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Secondary Profile */}
                {secondProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mb-8 max-w-2xl mx-auto"
                  >
                    <div 
                      className="p-5 sm:p-6 rounded-2xl bg-white/60 shadow-lg border text-left"
                      style={{ borderColor: `${secondProfile.color}30` }}
                    >
                      {/* Profile icon and title */}
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${secondProfile.color}15` }}
                        >
                          <secondProfile.icon className="w-6 h-6" style={{ color: secondProfile.color }} />
                        </div>
                        <div>
                          <h5 
                            className="text-lg font-bold"
                            style={{ fontFamily: 'Poppins, sans-serif', color: secondProfile.color }}
                          >
                            {t(secondProfile.titleKey)}
                          </h5>
                          <p className="text-xs text-gray-500">{t('quizAdditionalTrait')}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {t(secondProfile.descKey)}
                      </p>
                    </div>
                  </motion.div>
                )}

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-base sm:text-lg text-gray-700 mb-8 max-w-xl mx-auto leading-relaxed font-semibold"
                  style={{ color: mainProfile?.color }}
                >
                  {t('quizMethodHelp')}
                </motion.p>

                {/* Key insight boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                  {[
                    { icon: Brain, key: 'quizInsight1', color: '#8B5CF6' },
                    { icon: Heart, key: 'quizInsight2', color: '#EC4899' },
                    { icon: Sparkles, key: 'quizInsight3', color: '#06B6D4' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="p-4 rounded-2xl bg-white shadow-lg border-2"
                      style={{ borderColor: `${item.color}40` }}
                    >
                      <item.icon className="w-8 h-8 mx-auto mb-2" style={{ color: item.color }} />
                      <p className="text-sm font-bold text-gray-800">{t(item.key)}</p>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="relative flex justify-center sm:justify-start sm:ml-20"
                >
                  {/* Animated glow */}
                  <motion.div
                    className="absolute -inset-3 rounded-2xl opacity-50 blur-2xl"
                    animate={{
                      background: [
                        'linear-gradient(45deg, #8B5CF6, #EC4899)',
                        'linear-gradient(90deg, #EC4899, #06B6D4)',
                        'linear-gradient(135deg, #06B6D4, #8B5CF6)',
                        'linear-gradient(45deg, #8B5CF6, #EC4899)',
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  />

                  <motion.button
                    onClick={() => {
                      const element = document.getElementById('final-cta');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="relative px-10 sm:px-12 py-5 sm:py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white rounded-2xl font-bold text-lg sm:text-xl shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-3">
                      <Sparkles className="w-6 h-6" />
                      <span>{t('quizCTA')}</span>
                      <motion.div
                        animate={{
                          x: [0, 5, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </span>
                  </motion.button>
                </motion.div>

                {/* Retry quiz */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={resetQuiz}
                  className="mt-6 mx-auto block text-sm text-gray-600 hover:text-gray-900 underline"
                >
                  {t('quizRetake')}
                </motion.button>
              </motion.div>

              {/* Confetti particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [0, -100],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                >
                  <Sparkles 
                    className="w-4 h-4" 
                    style={{ color: ['#8B5CF6', '#EC4899', '#06B6D4'][i % 3] }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom info */}
        {!showResult && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-gray-500"
          >
            {t('quizDisclaimer')}
          </motion.p>
        )}
      </div>
    </section>
  );
};