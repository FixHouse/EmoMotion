import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Languages } from 'lucide-react';
import { motion } from 'motion/react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      className="fixed top-3 right-3 sm:top-6 sm:right-6 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-1.5 sm:gap-2 bg-white rounded-full px-2 sm:px-4 py-1.5 sm:py-2 shadow-xl border-2 border-gray-100">
        <Languages className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF69B4] hidden sm:block" />
        <div className="flex gap-0.5 sm:gap-1">
          <motion.button
            onClick={() => setLanguage('cs')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all text-xs sm:text-sm font-bold ${
              language === 'cs'
                ? 'bg-gradient-to-r from-[#FF69B4] to-[#FF1493] text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CZ
          </motion.button>
          <motion.button
            onClick={() => setLanguage('en')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all text-xs sm:text-sm font-bold ${
              language === 'en'
                ? 'bg-gradient-to-r from-[#FF69B4] to-[#FF1493] text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            EN
          </motion.button>
          <motion.button
            onClick={() => setLanguage('uk')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all text-xs sm:text-sm font-bold ${
              language === 'uk'
                ? 'bg-gradient-to-r from-[#FF69B4] to-[#FF1493] text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            UA
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};