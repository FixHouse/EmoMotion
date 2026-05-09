import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const PaymentSuccessBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      setIsVisible(true);
      params.delete('payment');
      const newSearch = params.toString();
      const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : '') + window.location.hash;
      window.history.replaceState({}, '', newUrl);

      const timer = setTimeout(() => setIsVisible(false), 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] w-[92%] sm:w-auto max-w-md"
          role="status"
          aria-live="polite"
        >
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-green-200 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400" />
            <div className="p-5 flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base text-gray-800 mb-1">
                  {t('paymentSuccessTitle')}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('paymentSuccessMessage')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsVisible(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
