import React from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Clock, Check, Star, Calendar } from 'lucide-react';

type ScheduleItem = {
  age: string;
  time: string;
  spots: string;
  color: string;
  titleKey?: string;
};

const schedule: ScheduleItem[] = [
  { age: 'age23', time: 'time23full', spots: '4 з 6', color: '#FACC15', titleKey: 'program23Title' },
  { age: 'age35', time: 'time35', spots: '6 з 10', color: '#FF69B4' },
  { age: 'age68', time: 'time68', spots: '9 з 10', color: '#7DD3FC' },
  { age: 'age58', time: 'time58', spots: '5 з 10', color: '#A78BFA' },
];

type PlanConfig = {
  nameKey: string;
  subtitleKey: string;
  priceKey: string;
  priceDisplay: string; // static price label for "ZDARMA"
  emoji: string;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  features: string[];
  badge?: string; // translation key for badge
  saveKey?: string; // translation key for save label
  buttonStyle: 'primary' | 'featured' | 'subtle' | 'gold' | 'purple';
  isPopular?: boolean;
  isBest?: boolean;
};

const plans: PlanConfig[] = [
  {
    nameKey: 'planTrialName',
    subtitleKey: 'planTrialSubtitle',
    priceKey: 'price0',
    priceDisplay: '150 Kč',
    emoji: '🎁',
    accentColor: '#22c55e',
    bgColor: '#f0fdf4',
    borderColor: '#86efac',
    features: ['feature1Free', 'feature2Free', 'feature3Free'],
    buttonStyle: 'primary',
  },
  {
    nameKey: 'planSingleName',
    subtitleKey: 'planSingleSubtitle',
    priceKey: 'price350',
    priceDisplay: '',
    emoji: '💃',
    accentColor: '#f59e0b',
    bgColor: '#fffbeb',
    borderColor: '#fcd34d',
    features: ['feature1Single', 'feature2Single', 'feature3Single'],
    buttonStyle: 'subtle',
  },
  {
    nameKey: 'plan4Name',
    subtitleKey: 'plan4Subtitle',
    priceKey: 'price1200',
    priceDisplay: '',
    emoji: '⭐',
    accentColor: '#f59e0b',
    bgColor: '#fefce8',
    borderColor: '#fde68a',
    features: ['feature1Pack4', 'feature2Pack4', 'feature3Pack4'],
    buttonStyle: 'gold',
  },
  {
    nameKey: 'plan8Name',
    subtitleKey: 'plan8Subtitle',
    priceKey: 'price2000',
    priceDisplay: '',
    emoji: '💗',
    accentColor: '#FF69B4',
    bgColor: '#fff0f6',
    borderColor: '#FF69B4',
    features: ['feature1Pack8', 'feature2Pack8', 'feature3Pack8', 'feature4Pack8', 'feature5Pack8'],
    badge: 'badgeMostPopular',
    saveKey: 'plan8Save',
    buttonStyle: 'featured',
    isPopular: true,
  },
  {
    nameKey: 'plan12Name',
    subtitleKey: 'plan12Subtitle',
    priceKey: 'price2800',
    priceDisplay: '',
    emoji: '🦋',
    accentColor: '#8b5cf6',
    bgColor: '#f5f3ff',
    borderColor: '#a78bfa',
    features: ['feature1Pack12', 'feature2Pack12', 'feature3Pack12', 'feature4Pack12', 'feature5Pack12'],
    saveKey: 'plan12Save',
    buttonStyle: 'purple',
    isBest: true,
  },
];

export const PricingSection: React.FC<{ onCTAClick: () => void }> = ({ onCTAClick }) => {
  const { t } = useLanguage();

  const getButtonClass = (style: PlanConfig['buttonStyle']) => {
    switch (style) {
      case 'featured':
        return 'bg-gradient-to-r from-[#FF69B4] to-[#FF1493] text-white shadow-lg shadow-pink-200';
      case 'primary':
        return 'bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white shadow-lg shadow-green-200';
      case 'gold':
        return 'bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white shadow-lg shadow-amber-200';
      case 'purple':
        return 'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white shadow-lg shadow-purple-200';
      case 'subtle':
      default:
        return 'bg-gray-100 text-gray-600 hover:bg-gray-200';
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-b from-[#E0F2FE]/20 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-6 py-2 bg-[#FF69B4]/10 rounded-full"
          >
            <span className="text-sm sm:text-base font-bold text-[#FF69B4]">
              {t('pricingBadge')}
            </span>
          </motion.div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <span className="text-gray-900">{t('pricingTitlePart1')} </span>
            <span className="bg-gradient-to-r from-[#FF69B4] to-[#FF1493] bg-clip-text text-transparent">
              {t('pricingTitlePart2')}
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600">
            {t('pricingSubtitle')}
          </p>
        </motion.div>

        {/* Pricing Cards — flex wrap so last 2 are centred */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-5 mb-10 max-w-screen-xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative flex flex-col w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(20%-16px)] ${plan.isPopular ? 'xl:scale-105 xl:z-10' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              {/* Badge */}
              {plan.badge && (
                <motion.div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold shadow-md z-20 text-white"
                  style={{
                    background: plan.isPopular
                      ? 'linear-gradient(135deg, #FF69B4, #FF1493)'
                      : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  {t(plan.badge as any)}
                </motion.div>
              )}

              <motion.div
                className="flex flex-col h-full rounded-3xl shadow-md overflow-hidden border-2 transition-shadow duration-200 hover:shadow-xl"
                style={{
                  backgroundColor: plan.bgColor,
                  borderColor: plan.isPopular || plan.isBest ? plan.borderColor : 'transparent',
                }}
                whileHover={{ y: -6 }}
              >
                {/* Card Header */}
                <div
                  className="p-5 text-center"
                  style={{ borderBottom: `2px solid ${plan.accentColor}20` }}
                >
                  {/* Emoji icon */}
                  <div
                    className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-3 text-2xl"
                    style={{ backgroundColor: `${plan.accentColor}20` }}
                  >
                    {plan.emoji}
                  </div>

                  <h3 className="font-bold text-gray-900 mb-1 text-base leading-tight">
                    {t(plan.nameKey as any)}
                  </h3>

                  <p className="text-xs text-gray-500 mb-3">
                    {t(plan.subtitleKey as any)}
                  </p>

                  {/* Save badge */}
                  {plan.saveKey && (
                    <span
                      className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-2 text-white"
                      style={{ backgroundColor: plan.accentColor }}
                    >
                      {t(plan.saveKey as any)}
                    </span>
                  )}

                  {/* Price */}
                  <div
                    className="text-2xl sm:text-3xl font-extrabold mt-1"
                    style={{ fontFamily: 'Poppins, sans-serif', color: plan.accentColor }}
                  >
                    {plan.priceDisplay
                      ? <span>{plan.priceDisplay}</span>
                      : t(plan.priceKey as any)
                    }
                  </div>
                </div>

                {/* Features */}
                <div className="flex-1 px-4 py-4 space-y-2">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: plan.accentColor }}
                      />
                      <span className="text-xs sm:text-sm text-gray-700 leading-snug">
                        {t(feat as any)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="px-4 pb-5">
                  <motion.button
                    onClick={onCTAClick}
                    className={`w-full py-3 rounded-2xl font-bold text-sm transition-all ${getButtonClass(plan.buttonStyle)}`}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {plan.buttonStyle === 'subtle'
                      ? t('ctaChoosePlan')
                      : t('ctaBookNow')}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Small groups notice */}
        <motion.div
          className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-base sm:text-lg font-bold text-gray-700 flex items-center justify-center gap-2">
            <Star className="w-5 h-5 text-[#FF69B4]" />
            {t('smallGroupsNotice')}
          </p>
          <p className="text-sm sm:text-base font-semibold text-[#FF69B4]">
            {t('limitedSpotsNotice')}
          </p>
        </motion.div>

        {/* Schedule */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
            <Clock className="w-6 h-6 text-[#FF69B4]" />
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {t('scheduleHeader')}
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {schedule.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border-2 border-transparent hover:border-[#FF69B4]/30 transition-all"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                  <Calendar className="w-4 h-4 shrink-0" style={{ color: item.color }} />
                  <h4 className="text-sm sm:text-base font-bold whitespace-nowrap" style={{ color: item.color }}>
                    {t(item.age as any)}
                  </h4>
                  {item.titleKey && (
                    <span
                      className="text-xs sm:text-sm font-extrabold whitespace-nowrap"
                      style={{ color: item.color }}
                    >
                      {t(item.titleKey as any)}
                    </span>
                  )}
                </div>

                <p className="text-sm font-bold text-gray-700 mb-3 whitespace-nowrap">
                  {t(item.time as any)}
                </p>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(parseInt(item.spots.split(' ')[0]) / parseInt(item.spots.split(' ')[2])) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-600 whitespace-nowrap">
                    {item.spots} {t('spotsLabel')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};