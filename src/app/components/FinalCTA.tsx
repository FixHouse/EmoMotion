import React, { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Sparkles, Phone, Instagram, MessageCircle, MapPin, CheckCircle, Send, CreditCard, Banknote, Calendar as CalendarIcon } from 'lucide-react';
import { format, parse, startOfDay } from 'date-fns';
import { cs as csLocale, enUS, uk as ukLocale } from 'date-fns/locale';
import { sendToTelegram } from '../utils/telegram';
import { PrivacyPolicy } from './PrivacyPolicy';
import { LocationsMap } from './LocationsMap';
import { Calendar } from './ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { locations, scheduleByLocation, getSlotById, LocationKey } from '../scheduleData';

type PaymentMethod = 'card' | 'cash' | '';

const DEFAULT_STRIPE_PAYMENT_LINK_URL = 'https://buy.stripe.com/5kQbIV6wbglT1kBaTGcjS00';
const STRIPE_PAYMENT_LINK_URL =
  (import.meta.env.VITE_STRIPE_PAYMENT_LINK_URL as string | undefined) || DEFAULT_STRIPE_PAYMENT_LINK_URL;

const ENROLLMENT_START = new Date(2026, 8, 7);

// The Telegram message uses parse_mode HTML — user-typed values must be
// escaped or a stray "<" makes Telegram reject the whole message.
const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildStripeUrl(baseUrl: string, email: string, refId: string, language: string): string {
  const url = new URL(baseUrl);
  if (email) url.searchParams.set('prefilled_email', email);
  if (refId) url.searchParams.set('client_reference_id', refId);
  if (language === 'cs' || language === 'en') {
    url.searchParams.set('locale', language);
  }
  return url.toString();
}

export const FinalCTA: React.FC<{ selectedPlan?: string }> = ({ selectedPlan = 'planTrialName' }) => {
  const { t, language } = useLanguage();
  const isTrialPlan = selectedPlan === 'planTrialName';
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    phone: '',
    email: '',
    location: '' as LocationKey | '',
    ageGroup: '',
    date: '',
    paymentMethod: '' as PaymentMethod,
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const dateLocale = language === 'cs' ? csLocale : language === 'en' ? enUS : ukLocale;
  const selectedDate = formData.date
    ? (() => {
        const parsed = parse(formData.date, 'dd.MM.yyyy', new Date());
        return isNaN(parsed.getTime()) ? undefined : parsed;
      })()
    : undefined;

  // Non-trial plans (4 lekce, 8 lekcí, 12 lekcí, jednorázová) don't have card
  // payment — Stripe link is only for the 150 Kč trial. Force cash automatically.
  useEffect(() => {
    if (!isTrialPlan && formData.paymentMethod !== 'cash') {
      setFormData((prev) => ({ ...prev, paymentMethod: 'cash' }));
    }
  }, [isTrialPlan, formData.paymentMethod]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      alert(language === 'cs' ? 'Prosím, souhlaste se zpracováním osobních údajů' :
            language === 'en' ? 'Please consent to personal data processing' :
            'Будь ласка, дайте згоду на обробку персональних даних');
      return;
    }

    if (!formData.email.includes('@')) {
      alert(t('formEmailInvalid'));
      return;
    }

    if (!formData.location) {
      alert(t('locationRequired'));
      return;
    }

    if (!formData.date) {
      alert(t('formDateRequired'));
      return;
    }

    if (!formData.paymentMethod) {
      alert(t('formPaymentRequired'));
      return;
    }

    setIsSubmitting(true);

    const refId = `EMO-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Build group text from new schedule data
    const slotInfo = getSlotById(formData.ageGroup);
    let ageGroupText = formData.ageGroup;
    let locationText = '';
    if (slotInfo) {
      const { slot, location } = slotInfo;
      const ageTxt = t(slot.ageKey as any);
      const timeTxt = t(slot.timeKey as any);
      const daysTxt = slot.dayOverrideKey
        ? t(slot.dayOverrideKey as any)
        : t(location.daysKey as any);
      const titleTxt = slot.titleKey ? ` · ${t(slot.titleKey as any)}` : '';
      ageGroupText = `${ageTxt} (${timeTxt}, ${daysTxt})${titleTxt}`;
      locationText = `${t(location.nameKey as any)} — ${t(location.addressKey as any)}`;
    }

    const dateText = formData.date;

    const titleText = language === 'cs' ? 'NOVÁ PŘIHLÁŠKA!' :
                      language === 'en' ? 'NEW APPLICATION!' :
                      'НОВА ЗАЯВКА!';

    const planPriceMap: Record<string, string> = {
      planTrialName: '150 Kč',
      planSingleName: t('price350' as any),
      plan4Name: t('price1200' as any),
      plan8Name: t('price2000' as any),
      plan30Name: t('price6000' as any),
    };
    const planPriceText = planPriceMap[selectedPlan] || '';
    const planNameText = t(selectedPlan as any);

    const planLabel = language === 'cs' ? (isTrialPlan ? 'Lekce' : 'Balíček') :
                      language === 'en' ? (isTrialPlan ? 'Class' : 'Package') :
                      (isTrialPlan ? 'Заняття' : 'Пакет');
    
    const parentNameLabel = language === 'cs' ? 'Jméno rodiče' :
                            language === 'en' ? 'Parent\'s name' :
                            'Ім\'я батька';
    
    const childNameLabel = language === 'cs' ? 'Jméno dítěte' :
                           language === 'en' ? 'Child\'s name' :
                           'Ім\'я дитини';
    
    const childAgeLabel = language === 'cs' ? 'Věk dítěte' :
                          language === 'en' ? 'Child\'s age' :
                          'Вік дитини';
    
    const groupLabel = language === 'cs' ? 'Skupina' :
                       language === 'en' ? 'Group' :
                       'Група';
    
    const phoneLabel = language === 'cs' ? 'Telefon' :
                       language === 'en' ? 'Phone' :
                       'Телефон';

    const emailLabel = language === 'cs' ? 'E-mail' :
                       language === 'en' ? 'Email' :
                       'Email';
    
    const dateLabel = isTrialPlan
      ? (language === 'cs' ? 'Datum lekce' :
         language === 'en' ? 'Class date' :
         'Дата заняття')
      : (language === 'cs' ? 'Preferovaný datum startu' :
         language === 'en' ? 'Preferred start date' :
         'Бажана дата початку');

    const scheduleLabel = language === 'cs' ? 'Rozvrh' :
                          language === 'en' ? 'Schedule' :
                          'Розклад';

    const locationLabel = language === 'cs' ? 'Umístění' :
                          language === 'en' ? 'Location' :
                          'Локація';

    const paymentLabel = language === 'cs' ? 'Způsob platby' :
                         language === 'en' ? 'Payment method' :
                         'Спосіб оплати';

    const paymentValueText = formData.paymentMethod === 'card'
      ? (language === 'cs' ? '💳 Kartou (Stripe – čeká na potvrzení)' :
         language === 'en' ? '💳 By card (Stripe – pending confirmation)' :
         '💳 Карткою (Stripe – очікує підтвердження)')
      : (language === 'cs' ? '💵 Hotově na první lekci' :
         language === 'en' ? '💵 Cash at the first lesson' :
         '💵 Готівкою на першому занятті');

    const refLabel = language === 'cs' ? 'Reference' :
                     language === 'en' ? 'Reference' :
                     'Референс';

    const languageEmoji = language === 'cs' ? '🇨🇿' :
                         language === 'en' ? '🇬🇧' :
                         '🇺🇦';

    const message = `
🎉 <b>${titleText}</b> ${languageEmoji}
🎟 <b>${planLabel}:</b> ${planNameText}${planPriceText ? ` (${planPriceText})` : ''}

━━━━━━━━━━━━━━━━━━━━
👤 <b>${parentNameLabel}:</b> ${escapeHtml(formData.parentName)}
👶 <b>${childNameLabel}:</b> ${escapeHtml(formData.childName)}
🎂 <b>${childAgeLabel}:</b> ${formData.childAge} років / let / years
👥 <b>${groupLabel}:</b> ${ageGroupText}
📱 <b>${phoneLabel}:</b> ${escapeHtml(formData.phone)}
✉️ <b>${emailLabel}:</b> ${escapeHtml(formData.email)}
📅 <b>${dateLabel}:</b> ${dateText}
━━━━━━━━━━━━━━━━━━━━
<b>${paymentLabel}:</b> ${paymentValueText}
<b>${refLabel}:</b> <code>${refId}</code>
━━━━━━━━━━━━━━━━━━━━

⏰ <b>${scheduleLabel}:</b> ${slotInfo ? t(slotInfo.location.daysFullKey as any) : ''}
📍 <b>${locationLabel}:</b> ${locationText || 'EmoMotion Studio, Praha'}

✨ EmoMotion Studio Prague
    `;

    const success = await sendToTelegram(message);

    if (success) {
      // Stripe Payment Link is for the 150 Kč trial lesson ONLY.
      // Never redirect when a paid package (4/8/12 lekcí or single) is selected.
      if (isTrialPlan && formData.paymentMethod === 'card') {
        const stripeUrl = buildStripeUrl(STRIPE_PAYMENT_LINK_URL, formData.email, refId, language);
        window.location.href = stripeUrl;
        return;
      }

      setIsSuccess(true);

      // Confetti effect
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          confetti.style.left = Math.random() * 100 + 'vw';
          confetti.style.background = ['#FF69B4', '#7DD3FC', '#FFF0F5', '#E0F2FE'][Math.floor(Math.random() * 4)];
          confetti.style.animationDelay = Math.random() * 0.5 + 's';
          document.body.appendChild(confetti);
          setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
      }

      setFormData({ parentName: '', childName: '', childAge: '', phone: '', email: '', location: '', ageGroup: '', date: '', paymentMethod: '', consent: false });

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } else {
      alert(language === 'cs' ? 'Chyba při odesílání. Zkuste to znovu.' :
            language === 'en' ? 'Error sending. Please try again.' :
            'Помилка відправлення. Спробуйте ще раз.');
    }

    setIsSubmitting(false);
  };

  return (
    <section id="cta" className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-white via-[#FFF0F5] to-[#E0F2FE]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-[#FF69B4]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-[#7DD3FC]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Success Message */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{t('formSuccessTitle')}</h3>
                <p className="text-sm text-gray-600">{t('formSuccessMessage')}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Title */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 text-gray-800">
            {t('ctaTitle')}
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
            {t('ctaSubtitle')}
          </p>
        </motion.div>

        {/* Registration Form - Full Width */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border-2 border-gray-100 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FF69B4] to-[#7DD3FC] rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">{t('formTitle')}</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Parent Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t('formParentNameLabel')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder={t('formParentNamePlaceholder')}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF69B4] focus:outline-none transition-colors text-gray-800"
                />
              </div>

              {/* Child Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t('formChildNameLabel')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.childName}
                  onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                  placeholder={t('formChildNamePlaceholder')}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF69B4] focus:outline-none transition-colors text-gray-800"
                />
              </div>

              {/* Child Age */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t('formChildAgeLabel')}
                </label>
                <select
                  required
                  value={formData.childAge}
                  onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF69B4] focus:outline-none transition-colors text-gray-800 bg-white"
                >
                  <option value="">{t('formChildAgePlaceholder')}</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t('formPhoneLabel')}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t('formPhonePlaceholder')}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF69B4] focus:outline-none transition-colors text-gray-800"
                />
              </div>

              {/* Location selector */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t('locationFormLabel')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {locations.map((loc) => {
                    const active = formData.location === loc.key;
                    return (
                      <button
                        key={loc.key}
                        type="button"
                        onClick={() => setFormData({ ...formData, location: loc.key, ageGroup: '' })}
                        className={`flex items-center gap-2 px-3 py-3 rounded-xl border-2 text-left transition-all ${
                          active
                            ? 'bg-white text-gray-900 border-[#FF69B4]'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <MapPin className="w-5 h-5 shrink-0" style={{ color: loc.color }} />
                        <div className="flex flex-col leading-tight min-w-0">
                          <span className="text-sm font-bold truncate">
                            {t(loc.nameKey as any)} · {t(loc.addressKey as any)}
                          </span>
                          <span className="text-xs text-gray-500 truncate">
                            {t(loc.daysFullKey as any)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Age Group */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t('formAgeLabel')}
                </label>
                <select
                  required
                  value={formData.ageGroup}
                  disabled={!formData.location}
                  onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF69B4] focus:outline-none transition-colors text-gray-800 bg-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {formData.location ? t('formAgePlaceholder') : t('locationFormPlaceholder')}
                  </option>
                  {formData.location &&
                    scheduleByLocation[formData.location as LocationKey].map((slot) => {
                      const ageTxt = t(slot.ageKey as any);
                      const timeTxt = t(slot.timeKey as any);
                      const daysTxt = slot.dayOverrideKey
                        ? t(slot.dayOverrideKey as any)
                        : t(locations.find((l) => l.key === formData.location)!.daysKey as any);
                      const titleTxt = slot.titleKey ? ` · ${t(slot.titleKey as any)}` : '';
                      return (
                        <option key={slot.id} value={slot.id}>
                          {ageTxt} ({timeTxt}, {daysTxt}){titleTxt}
                        </option>
                      );
                    })}
                </select>
              </div>

              {/* Trial Date - Calendar picker */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t('formTrialDateLabel')}
                </label>
                <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 focus:border-[#FF69B4] focus:outline-none transition-colors bg-white text-left flex items-center justify-between"
                    >
                      <span className={formData.date ? 'text-gray-800' : 'text-gray-400'}>
                        {formData.date || t('formDatePlaceholder')}
                      </span>
                      <CalendarIcon className="w-5 h-5 text-gray-400 shrink-0 ml-2" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 data-[state=closed]:hidden" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        if (date) {
                          setFormData({ ...formData, date: format(date, 'dd.MM.yyyy') });
                          setIsDateOpen(false);
                        }
                      }}
                      disabled={{ before: ENROLLMENT_START }}
                      locale={dateLocale}
                      defaultMonth={selectedDate || ENROLLMENT_START}
                      classNames={{
                        day_selected: 'bg-[#FF69B4] text-white hover:bg-[#FF69B4] hover:text-white focus:bg-[#FF69B4] focus:text-white',
                        day_today: 'text-[#FF69B4] font-bold',
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {t('formEmailLabel')}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t('formEmailPlaceholder')}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF69B4] focus:outline-none transition-colors text-gray-800"
                />
              </div>
            </div>

            {/* Trial Class / Selected Plan Badge */}
            <div className="bg-gradient-to-r from-[#FFF0F5] to-[#E0F2FE] rounded-xl p-4 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF69B4]" />
              <span className="font-bold text-gray-800">
                {isTrialPlan ? t('formTrialClassLabel') : t(selectedPlan as any)}
              </span>
              <Sparkles className="w-5 h-5 text-[#7DD3FC]" />
            </div>

            {/* Payment Method Selection — card option only for trial lesson (150 Kc) */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                {isTrialPlan ? t('formPaymentMethodLabel') : t('formPaymentMethodLabelPackage')}
              </label>
              <p className="text-xs text-gray-500 mb-3">
                {isTrialPlan ? t('formPaymentMethodHint') : t('formPaymentMethodHintPackage')}
              </p>
              <div className={`grid grid-cols-1 ${isTrialPlan ? 'md:grid-cols-2' : ''} gap-3`}>
                {isTrialPlan && (
                  <label
                    className={`relative flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-[#FF69B4] bg-gradient-to-br from-[#FFF0F5] to-white shadow-md'
                        : 'border-gray-200 bg-white hover:border-[#FF69B4]/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="mt-1 w-4 h-4 text-[#FF69B4] focus:ring-[#FF69B4] flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CreditCard className="w-5 h-5 text-[#FF69B4]" />
                        <span className="font-bold text-gray-800 text-sm">{t('formPaymentCard')}</span>
                      </div>
                      <p className="text-xs text-gray-600">{t('formPaymentCardDesc')}</p>
                    </div>
                  </label>
                )}

                <label
                  className={`relative flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === 'cash'
                      ? 'border-[#7DD3FC] bg-gradient-to-br from-[#E0F2FE] to-white shadow-md'
                      : 'border-gray-200 bg-white hover:border-[#7DD3FC]/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                    className="mt-1 w-4 h-4 text-[#7DD3FC] focus:ring-[#7DD3FC] flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Banknote className="w-5 h-5 text-[#7DD3FC]" />
                      <span className="font-bold text-gray-800 text-sm">
                        {isTrialPlan ? t('formPaymentCash') : t('formPaymentCashPackage')}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      {isTrialPlan ? t('formPaymentCashDesc') : t('formPaymentCashDescPackage')}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <input
                type="checkbox"
                id="consent"
                required
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-[#FF69B4] focus:ring-[#FF69B4]"
              />
              <label htmlFor="consent" className="text-sm text-gray-700 flex-1">
                {t('formConsent')}{' '}
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-[#FF69B4] font-bold underline hover:text-[#7DD3FC] transition-colors"
                >
                  {t('formConsentLink')}
                </button>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-[#FF69B4] to-[#7DD3FC] text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  {formData.paymentMethod === 'card' ? t('formRedirecting') : t('formSubmitting')}
                </>
              ) : formData.paymentMethod === 'card' ? (
                <>
                  <CreditCard className="w-5 h-5" />
                  {t('formSubmitCard')}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t('formSubmit')}
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Contacts & Map - Two Columns */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Contacts */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('contactsTitle')}</h3>

            <a
              href="https://wa.me/420778616851"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-[#FFF0F5] hover:to-[#E0F2FE] transition-all mb-4 group"
            >
              <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-base text-gray-800">WhatsApp</div>
                <div className="text-sm text-gray-600">+420 778 616 851</div>
              </div>
            </a>

            <a
              href="https://instagram.com/emomotion_dance_praha"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-[#FFF0F5] hover:to-[#E0F2FE] transition-all mb-4 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-base text-gray-800">Instagram</div>
                <div className="text-sm text-gray-600">@emomotion_dance_praha</div>
              </div>
            </a>

            <div className="flex items-start gap-4 p-4">
              <div className="w-12 h-12 bg-[#7DD3FC] rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="w-full">
                <div className="font-bold text-base text-gray-800 mb-3">{t('addressLabel')}</div>

                {/* Locations */}
                <div className="space-y-2">
                  {locations.map((loc) => (
                    <div
                      key={loc.key}
                      className="bg-gradient-to-r from-[#FFF0F5] to-[#E0F2FE] rounded-xl p-3"
                    >
                      <div className="flex items-start gap-2">
                        <MapPin
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: loc.color }}
                        />
                        <div className="text-sm font-medium text-gray-800">
                          <span className="font-bold">{t(loc.nameKey as any)}</span>
                          {' · '}
                          {t(loc.addressKey as any)}
                          <div className="text-xs font-semibold text-gray-500 mt-0.5">
                            {t(loc.daysFullKey as any)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map with markers */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl h-full min-h-[300px] sm:min-h-[400px] border-2 border-gray-100">
            <LocationsMap />
          </div>
        </motion.div>

        {/* Vision */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-700 max-w-3xl mx-auto">
            {t('visionText')}
          </p>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .confetti {
          position: fixed;
          top: -10px;
          width: 10px;
          height: 10px;
          z-index: 9999;
          animation: confetti-fall 3s linear forwards;
        }
      `}} />
      
      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <PrivacyPolicy onClose={() => setShowPrivacyModal(false)} />
      )}
    </section>
  );
};