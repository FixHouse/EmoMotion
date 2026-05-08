import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Home, Info, Star, DollarSign, Phone, Sparkles } from 'lucide-react';

export const MobileMenu: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: t('menuHome'), href: '#hero', color: '#FF69B4' },
    { icon: Info, label: t('menuWhy'), href: '#recognize', color: '#7DD3FC' },
    { icon: Sparkles, label: t('menuMethod'), href: '#method', color: '#A7F3D0' },
    { icon: Star, label: t('menuPrograms'), href: '#programs', color: '#FDE047' },
    { icon: DollarSign, label: t('menuPricing'), href: '#pricing', color: '#FF69B4' },
    { icon: Phone, label: t('menuContact'), href: '#cta', color: '#7DD3FC' },
  ];

  const handleClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 lg:hidden w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-gray-100"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF69B4]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-white z-40 lg:hidden shadow-2xl overflow-y-auto"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="p-6 sm:p-8 pt-20 sm:pt-24">
                {/* Header */}
                <div className="mb-8 sm:mb-12">
                  <motion.h2
                    className="text-3xl sm:text-4xl font-extrabold mb-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="bg-gradient-to-r from-[#FF69B4] to-[#FF1493] bg-clip-text text-transparent">
                      EmoMotion
                    </span>
                  </motion.h2>
                  <motion.p
                    className="text-gray-600 text-sm sm:text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {t('menuTagline')}
                  </motion.p>
                </div>

                {/* Navigation */}
                <nav className="space-y-3">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleClick(item.href)}
                        className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all text-left group"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${item.color}20` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: item.color }} />
                        </div>
                        <span className="font-bold text-gray-800 text-base sm:text-lg">{item.label}</span>
                      </motion.button>
                    );
                  })}
                </nav>

                {/* Footer */}
                <motion.div
                  className="mt-8 sm:mt-12 pt-6 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-xs sm:text-sm text-gray-500 text-center">
                    © 2026 EmoMotion Prague
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};