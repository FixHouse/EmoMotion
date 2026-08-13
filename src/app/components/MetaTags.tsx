import { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import type { Language } from '../translations';

const SITE_URL = 'https://emomotion.com/';

const metaByLanguage: Record<Language, {
  title: string;
  description: string;
  keywords: string;
  locale: string;
}> = {
  cs: {
    title: 'EmoMotion - taneční a pohybové kroužky pro děti v Praze',
    description: 'Autorské studio tance a sebevyjádření pro děti 2-8 let v Praze. Malé skupiny, bezpečný přístup a zkušební lekce za 150 Kč.',
    keywords: 'taneční kroužek Praha, tanec pro děti Praha, pohybové kroužky pro děti, EmoMotion, děti tanec',
    locale: 'cs_CZ',
  },
  en: {
    title: 'EmoMotion - dance and movement classes for children in Prague',
    description: 'Creative dance and self-expression classes for children aged 2-8 in Prague. Small groups, a caring approach and trial lesson for 150 CZK.',
    keywords: 'dance classes Prague, kids dance Prague, movement classes for children, EmoMotion Prague, children dance',
    locale: 'en_US',
  },
  uk: {
    title: 'EmoMotion - танці та рухові заняття для дітей у Празі',
    description: 'Авторська студія танцю та самовираження для дітей 2-8 років у Празі. Малі групи, дбайливий підхід і пробне заняття за 150 Kč.',
    keywords: 'танці для дітей Прага, дитячі заняття Прага, рухові заняття для дітей, EmoMotion, танцювальна студія Прага',
    locale: 'uk_UA',
  },
};

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(url: string) {
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

export const MetaTags: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    const copy = metaByLanguage[language];

    document.title = copy.title;
    document.documentElement.lang = language;

    setMeta('name', 'description', copy.description);
    setMeta('name', 'keywords', copy.keywords);
    setMeta('name', 'robots', 'index, follow');
    setMeta('name', 'theme-color', '#7C3AED');

    setMeta('property', 'og:title', copy.title);
    setMeta('property', 'og:description', copy.description);
    setMeta('property', 'og:url', SITE_URL);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'EmoMotion');
    setMeta('property', 'og:locale', copy.locale);

    setMeta('name', 'twitter:card', 'summary');
    setMeta('name', 'twitter:title', copy.title);
    setMeta('name', 'twitter:description', copy.description);

    setCanonical(SITE_URL);
  }, [language]);

  return null;
};
