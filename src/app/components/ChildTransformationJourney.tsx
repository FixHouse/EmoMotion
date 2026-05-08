import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { Sparkles } from 'lucide-react';

const journeyStages = [
  {
    id: 1,
    emoji: '😔',
    titleUk: 'Початок',
    titleCs: 'Začátek',
    descUk: 'Сором\'язлива, боїться камери, тиха',
    descCs: 'Stydlivá, bojí se kamery, tichá',
    position: 0,
  },
  {
    id: 2,
    emoji: '🌱',
    titleUk: 'Перші кроки',
    titleCs: 'První kroky',
    descUk: 'Починає відкриватись у грі',
    descCs: 'Začína se otevírat ve hře',
    position: 33,
  },
  {
    id: 3,
    emoji: '🦋',
    titleUk: 'Розвиток',
    titleCs: 'Rozvoj',
    descUk: 'Впевнено танцює, знімає відео',
    descCs: 'Sebevědomě tančí, natáčí videa',
    position: 66,
  },
  {
    id: 4,
    emoji: '⭐',
    titleUk: 'Розквіт',
    titleCs: 'Rozkvět',
    descUk: 'Сяє, радіє, сама проситься на заняття',
    descCs: 'Září, raduje se, sama prosí jít na lekce',
    position: 100,
  },
];

export const ChildTransformationJourney: React.FC = () => {
  const { language } = useLanguage();
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Mobile: Vertical Journey */}
      <div className="md:hidden space-y-6">
        {journeyStages.map((stage, index) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            {/* Connecting Line */}
            {index < journeyStages.length - 1 && (
              <motion.div
                className="absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-[#FF69B4] to-gray-200"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                style={{ transformOrigin: 'top' }}
              />
            )}

            {/* Stage Card */}
            <motion.div
              className="flex gap-4 items-start"
              whileHover={{ x: 10 }}
              onHoverStart={() => setActiveStage(stage.id)}
              onHoverEnd={() => setActiveStage(null)}
            >
              {/* Emoji Circle */}
              <motion.div
                className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all ${
                  stage.id === 4
                    ? 'bg-gradient-to-br from-[#FF69B4] to-[#FDE047] shadow-xl'
                    : 'bg-white shadow-lg'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {stage.emoji}
              </motion.div>

              {/* Content */}
              <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-xl font-bold text-gray-800">
                    {language === 'uk' ? stage.titleUk : stage.titleCs}
                  </h4>
                  {stage.id === 4 && (
                    <Sparkles className="w-5 h-5 text-[#FF69B4]" />
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'uk' ? stage.descUk : stage.descCs}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Desktop: Horizontal Journey */}
      <div className="hidden md:block relative py-12">
        {/* Main Path Line */}
        <div className="absolute top-28 left-0 right-0 h-1 bg-gray-200 rounded-full">
          <motion.div
            className="h-full bg-[#FF69B4] rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
        </div>

        {/* Animated Dots on Path */}
        <motion.div
          className="absolute top-28 left-0 w-3 h-3 -translate-y-1/2"
          initial={{ left: '0%' }}
          animate={{ left: '100%' }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="w-3 h-3 bg-[#FF69B4] rounded-full blur-sm animate-pulse" />
        </motion.div>

        {/* Stages */}
        <div className="relative flex justify-between">
          {journeyStages.map((stage, index) => (
            <motion.div
              key={stage.id}
              className="flex flex-col items-center w-1/4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3 }}
            >
              {/* Emoji Circle */}
              <motion.div
                className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-6 transition-all cursor-pointer ${
                  stage.id === 4
                    ? 'bg-gradient-to-br from-[#FF69B4] to-[#FDE047] shadow-2xl'
                    : 'bg-white shadow-xl'
                }`}
                whileHover={{ scale: 1.15, rotate: 10 }}
                onHoverStart={() => setActiveStage(stage.id)}
                onHoverEnd={() => setActiveStage(null)}
                animate={
                  activeStage === stage.id
                    ? { y: -10 }
                    : { y: 0 }
                }
              >
                {stage.emoji}
                {stage.id === 4 && (
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-6 h-6 text-[#FDE047]" />
                  </motion.div>
                )}
              </motion.div>

              {/* Content Card */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-[220px] min-h-[140px]"
                animate={
                  activeStage === stage.id
                    ? { scale: 1.05, boxShadow: '0 20px 50px rgba(255, 105, 180, 0.3)' }
                    : { scale: 1, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }
                }
              >
                <h4 className="text-lg font-bold text-gray-800 mb-3 text-center">
                  {language === 'uk' ? stage.titleUk : stage.titleCs}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed text-center">
                  {language === 'uk' ? stage.descUk : stage.descCs}
                </p>
              </motion.div>

              {/* Stage Number */}
              <motion.div
                className="mt-4 text-[#FF69B4] font-bold text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.3 + 0.2 }}
              >
                {stage.id}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#FF69B4] rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Bottom Text */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-xl md:text-2xl text-gray-700 font-semibold">
          {language === 'uk' 
            ? '🎯 Весь шлях займає всього 2-3 місяці' 
            : '🎯 Celá cesta trvá jen 2-3 měsíce'}
        </p>
        <p className="text-gray-500 mt-2">
          {language === 'uk'
            ? 'І батьки бачать результати вже після першого заняття!'
            : 'A rodiče vidí výsledky už po první lekci!'}
        </p>
      </motion.div>
    </div>
  );
};