import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

const animals = [
  { 
    key: 'turtle', 
    emoji: '🐢', 
    color: '#FFB6C1',
    gradient: 'from-[#FFB6C1] to-[#FF69B4]',
    shadow: 'rgba(255, 182, 193, 0.4)'
  },
  { 
    key: 'lion', 
    emoji: '🦁', 
    color: '#FFD700',
    gradient: 'from-[#FFD700] to-[#FFA500]',
    shadow: 'rgba(255, 215, 0, 0.4)'
  },
  { 
    key: 'butterfly', 
    emoji: '🦋', 
    color: '#7DD3FC',
    gradient: 'from-[#7DD3FC] to-[#0EA5E9]',
    shadow: 'rgba(125, 211, 252, 0.4)'
  },
  { 
    key: 'owl', 
    emoji: '🦉', 
    color: '#A7F3D0',
    gradient: 'from-[#A7F3D0] to-[#34D399]',
    shadow: 'rgba(167, 243, 208, 0.4)'
  },
  { 
    key: 'cheetah', 
    emoji: '🐆', 
    color: '#FDE047',
    gradient: 'from-[#FDE047] to-[#FACC15]',
    shadow: 'rgba(253, 224, 71, 0.4)'
  },
  { 
    key: 'wolf', 
    emoji: '🐺', 
    color: '#C4B5FD',
    gradient: 'from-[#C4B5FD] to-[#A78BFA]',
    shadow: 'rgba(196, 181, 253, 0.4)'
  },
];

export const AnimalInteractive: React.FC = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentAnimal = animals[currentIndex];

  // Auto-rotate animals
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % animals.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleAnimalClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
              left: `${15 + i * 10}%`,
              top: `${10 + i * 8}%`,
              background: `linear-gradient(135deg, ${animals[i % animals.length]?.color}40, ${animals[(i + 1) % animals.length]?.color}20)`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-lg px-4">
        {/* Call to action text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-lg sm:text-xl text-gray-700 font-medium">
            {t('animalClick')}
          </p>
        </motion.div>

        {/* Main Animal Display */}
        <div className="relative w-80 h-80 sm:w-96 sm:h-96">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ 
                opacity: 0, 
                scale: 0.8,
                rotateY: direction > 0 ? 90 : -90,
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotateY: 0,
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.8,
                rotateY: direction > 0 ? -90 : 90,
              }}
              transition={{ duration: 0.5, type: "spring" }}
              className="absolute inset-0"
            >
              {/* Glowing circle background */}
              <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${currentAnimal.gradient} opacity-30 blur-2xl`}
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Main circle */}
              <motion.div
                className={`relative w-full h-full rounded-full bg-gradient-to-br ${currentAnimal.gradient} shadow-2xl flex flex-col items-center justify-center p-8`}
                style={{
                  boxShadow: `0 25px 50px -12px ${currentAnimal.shadow}`,
                }}
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Animal emoji */}
                <motion.div
                  className="text-8xl sm:text-9xl mb-6"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {currentAnimal.emoji}
                </motion.div>

                {/* Animal name and power */}
                <div className="text-center text-white">
                  <h3 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {t(currentAnimal.key as any)}
                  </h3>
                  <p className="text-base sm:text-lg font-medium opacity-95 leading-relaxed">
                    {t(`${currentAnimal.key}Power` as any)}
                  </p>
                </div>

                {/* Sparkles decoration */}
                <motion.div
                  className="absolute top-8 right-8"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles className="w-6 h-6 text-white opacity-80" />
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Animal selector dots */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {animals.map((animal, index) => (
            <motion.button
              key={animal.key}
              onClick={() => handleAnimalClick(index)}
              className={`relative group transition-all ${
                index === currentIndex ? 'w-16 h-16' : 'w-12 h-12'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`w-full h-full rounded-full bg-gradient-to-br ${animal.gradient} shadow-lg flex items-center justify-center text-2xl transition-all border-2 ${
                  index === currentIndex ? 'border-white' : 'border-transparent'
                }`}
                style={{
                  boxShadow: index === currentIndex ? `0 10px 30px -5px ${animal.shadow}` : 'none',
                }}
                animate={index === currentIndex ? {
                  scale: [1, 1.05, 1],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                {animal.emoji}
              </motion.div>
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full">
                  {t(animal.key as any)}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};