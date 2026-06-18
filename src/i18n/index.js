import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en/translation.json';
import zh from '../locales/zh/translation.json';
import ko from '../locales/ko/translation.json';
import ar from '../locales/ar/translation.json';
import ja from '../locales/ja/translation.json';
import tw from '../locales/tw/translation.json';
import ae from '../locales/ae/translation.json';
import pk from '../locales/pk/translation.json';
import my from '../locales/my/translation.json';
import sg from '../locales/sg/translation.json';

const savedLanguage = localStorage.getItem('language') || 'en';
// 语言资源
const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
  ko: {
    translation: ko,
  },
  ar: {
    translation: ar,
  },
  ja: {
    translation: ja,
  },
  tw: {
    translation: tw,
  },
  ae: {
    translation: ae,
  },
  pk: {
    translation: pk,
  },
  my: {
    translation: my,
  },
  sg: {
    translation: sg,
  }
};

i18next
  .use(initReactI18next)  // 将 i18next 和 React 连接
  .init({
    lng: savedLanguage,  // 默认语言
    fallbackLng: 'zh',  // 如果当前语言没有翻译，使用的回退语言
    resources,
    keySeparator: false,  // 关闭键分隔符（如果不需要嵌套）
    interpolation: {
      escapeValue: false,  // 不需要转义
    },
    react: {
      useSuspense: false,  // 关闭 Suspense
    },
  });

export default i18next;