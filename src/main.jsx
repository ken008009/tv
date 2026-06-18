import { createRoot } from 'react-dom/client'
import '@styles/global.less'
import { ConfigProvider } from 'react-vant';
import enUS from 'react-vant/es/locale/lang/en-US';
import zhCN from 'react-vant/es/locale/lang/zh-CN';
import App from './App.jsx'
import i18n from './i18n'
import { I18nextProvider } from 'react-i18next';

const language = localStorage.getItem('language') || 'en'

const languageList = {
  en: enUS,
  zh: zhCN
}

createRoot(document.getElementById('root')).render(
  <ConfigProvider locale={languageList[language] || enUS}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </ConfigProvider>
)
