import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#FFF0F5] via-[#E0F2FE] to-[#A7F3D0]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity },
              }}
              className="mb-6"
            >
              <Sparkles className="w-20 h-20 text-[#FF69B4] mx-auto" />
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold mb-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-[#FF69B4] to-[#FF69B4] bg-clip-text text-transparent">
                EmoMotion
              </span>
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {t('loadingTagline')}
            </motion.p>
            
            {/* Loading dots */}
            <div className="flex gap-2 justify-center mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-[#FF69B4] rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};