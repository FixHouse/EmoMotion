import { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

export const MetaTags: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Update document title and meta tags based on language
    const titleUA = 'EmoMotion — Студія самовираження для дітей в Празі | Танці без сліз';
    const titleCS = 'EmoMotion — Studio sebevyjádření pro děti v Praze | Tanec bez slz';
    
    const descUA = 'Авторська студія танцю та самовираження для дітей 2,5-8 років у Празі. Маленькі групи, анти-булінг підхід, пробне заняття 150 крон. Кожна дитина знаходить свою суперсилу через рух!';
    const descCS = 'Autorské studio tance a sebevyjádření pro děti 2,5-8 let v Praze. Malé skupiny, anti-šikanový přístup, zkušební lekce za 150 Kč. Každé dítě najde svou superschopnost pohybem!';

    document.title = language === 'uk' ? titleUA : titleCS;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', language === 'uk' ? descUA : descCS);
    }

    // Set language attribute on html element
    document.documentElement.lang = language === 'uk' ? 'uk' : 'cs';
  }, [language]);

  return null;
};
