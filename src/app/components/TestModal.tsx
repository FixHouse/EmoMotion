import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';

interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TestModal: React.FC<TestModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const questions = [
    {
      question: t('testQ1'),
      answers: [t('testQ1A1'), t('testQ1A2'), t('testQ1A3')],
    },
    {
      question: t('testQ2'),
      answers: [t('testQ2A1'), t('testQ2A2'), t('testQ2A3')],
    },
    {
      question: t('testQ3'),
      answers: [t('testQ3A1'), t('testQ3A2'), t('testQ3A3')],
    },
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate result
      const sum = newAnswers.reduce((a, b) => a + b, 0);
      if (sum <= 3) {
        setResult('testResultLion');
      } else if (sum <= 5) {
        setResult('testResultButterfly');
      } else {
        setResult('testResultCheetah');
      }
    }
  };

  const resetTest = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  const handleClose = () => {
    resetTest();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="relative bg-gradient-to-br from-[#FFF0F5] to-[#E0F2FE] rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 md:p-12">
              {!result ? (
                <>
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {t('testTitle')}
                  </h2>

                  {/* Progress */}
                  <div className="flex gap-2 mb-8 justify-center">
                    {questions.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all ${
                          index <= step ? 'bg-[#FF69B4] w-16' : 'bg-gray-300 w-8'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Question */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                    >
                      <h3 className="text-2xl font-bold mb-6 text-gray-800">
                        {questions[step].question}
                      </h3>

                      <div className="space-y-4">
                        {questions[step].answers.map((answer, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            className="w-full p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all text-left text-lg font-semibold text-gray-800"
                            whileHover={{ scale: 1.02, x: 10 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {answer}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </>
              ) : (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    className="text-6xl mb-6"
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: 2 }}
                  >
                    {result === 'testResultLion' ? '🦁' : result === 'testResultButterfly' ? '🦋' : '🐆'}
                  </motion.div>

                  <h2 className="text-4xl font-extrabold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <span className="bg-gradient-to-r from-[#FF69B4] to-[#FF69B4] bg-clip-text text-transparent">
                      {t('testResult')}
                    </span>
                  </h2>
                  
                  <p className="text-2xl font-bold mb-8 text-gray-800">
                    {t(result as any)}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      onClick={() => {
                        handleClose();
                        document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-8 py-4 bg-[#FF69B4] text-white rounded-full text-lg font-bold shadow-2xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Sparkles className="inline-block mr-2 w-5 h-5" />
                      {t('testCTA')}
                    </motion.button>

                    <motion.button
                      onClick={resetTest}
                      className="px-8 py-4 bg-white text-gray-800 rounded-full text-lg font-semibold shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Пройти ще раз
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};