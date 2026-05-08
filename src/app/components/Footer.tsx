import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { PrivacyPolicy } from './PrivacyPolicy';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  
  return (
    <>
      <footer className="bg-[#FF69B4] py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-6 h-6 text-white fill-white" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                EmoMotion
              </h3>
            </div>
            
            <p className="text-white/90 text-sm md:text-base mb-4">
              {t('footerTagline')}
            </p>
            
            <button
              onClick={() => setShowPrivacyPolicy(true)}
              className="text-white/80 hover:text-white text-xs md:text-sm underline mb-4 transition-colors"
            >
              {t('formConsentLink')}
            </button>
            
            <div className="text-white/80 text-xs md:text-sm">
              © 2026 EmoMotion. {t('footerRights')}
            </div>
            
            <div className="mt-4 text-white/70 text-xs">
              {t('footerLocation')} 🇨🇿
            </div>
          </motion.div>
        </div>
      </footer>
      
      <PrivacyPolicy isOpen={showPrivacyPolicy} onClose={() => setShowPrivacyPolicy(false)} />
    </>
  );
};