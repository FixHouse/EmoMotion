import React from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 sm:px-8 py-6 rounded-t-3xl flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {t('privacyTitle')}
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 sm:px-8 py-8 space-y-6">
              {/* Intro */}
              <div>
                <p className="text-gray-700 leading-relaxed">{t('privacyIntro')}</p>
              </div>

              {/* Data Controller */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('privacyController')}</h3>
                <p className="text-gray-700">{t('privacyControllerText')}</p>
              </div>

              {/* Data Processed */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('privacyDataProcessed')}</h3>
                <p className="text-gray-700">{t('privacyDataList')}</p>
              </div>

              {/* Purpose */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('privacyPurpose')}</h3>
                <p className="text-gray-700">{t('privacyPurposeText')}</p>
              </div>

              {/* Legal Basis */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('privacyLegalBasis')}</h3>
                <p className="text-gray-700">{t('privacyLegalBasisText')}</p>
              </div>

              {/* Rights */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('privacyRights')}</h3>
                <p className="text-gray-700">{t('privacyRightsList')}</p>
              </div>

              {/* Storage */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('privacyStorage')}</h3>
                <p className="text-gray-700">{t('privacyStorageText')}</p>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('privacyContact')}</h3>
                <p className="text-gray-700">{t('privacyContactText')}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 sm:px-8 py-6 rounded-b-3xl">
              <motion.button
                onClick={onClose}
                className="w-full py-4 bg-gradient-to-r from-[#FF69B4] to-[#FF1493] text-white rounded-2xl text-lg font-bold shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('privacyClose')}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
