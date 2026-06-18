import React, {useState, useEffect, useRef} from 'react'
import { IoMdWallet } from "react-icons/io";
import { IoCard } from "react-icons/io5";
import { BiSolidDownArrow } from "react-icons/bi";
import { Toast, Pagination, ActionSheet } from 'react-vant'
import logo from '@images/logo.png'
import Empty from '@components/empty';
import { useTranslation } from 'react-i18next';
import PendingModal from './components/pendingModal';
import DetailsModal from './components/detailsModal';
import classnames from 'classnames'
import emojiFlags from 'emoji-flags'
import Card from '@components/card'
import dayjs from 'dayjs';

import './index.less'


const languageList = {
  zh: { label: '中文', language: 'zh', flag: emojiFlags.CN.emoji },
  en: { label: 'English', language: 'en', flag: '🇬🇧' },  // 英语没有单一国家，常用英国🇬🇧或美国🇺🇸
  ko: { label: '한국어', language: 'ko', flag: emojiFlags.KR.emoji },
  ar: { label: 'العربية', language: 'ar', flag: emojiFlags.SA.emoji }, // 代表阿拉伯文用沙特国旗
  ja: { label: '日本語', language: 'ja', flag: emojiFlags.JP.emoji },
  tw: { label: '繁體中文', language: 'tw', flag: emojiFlags.TW.emoji },
  ae: { label: 'العربية', language: 'ae', flag: emojiFlags.AE.emoji }, // 迪拜属阿联酋
  pk: { label: 'اُردُو', language: 'pk', flag: emojiFlags.PK.emoji },
  my: { label: 'Bahasa Melayu', language: 'my', flag: emojiFlags.MY.emoji },
  sg: { label: '简体中文', language: 'sg', flag: emojiFlags.SG.emoji },
};

const Index = (props) => {
  const lang = localStorage.getItem('language') || 'en';
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(new Date());
  const [language, setLanguage] = useState(languageList[lang])
  const [dropdownMenuShow, setDropdownMenuShow] = useState(false)

  const { i18n } = useTranslation();

  const pendingModalRef = useRef(null)
  const detailsModalRef = useRef(null)

  const { t } = props

  useEffect(() => {
    console.log(emojiFlags.countryCode('CN'))
  }, [])

  const handleClose = () => {
    setVisible(false);
  };

  const handleConfirm = (val) => {
    console.log(val, new Date())
    console.log(dayjs(val).format('YYYY-MM'))
    setValue(val);
    setVisible(false);
  };

  const { cardNum, cardStatus, amount, cardAmount, cardAmountTwo, cardStatusTwo } = props.state

  const onCancel = (values) => {
    setDropdownMenuShow(false);
  }

  const onSelect = (action, index) => {
    localStorage.setItem('language', action.language)
    i18n.changeLanguage(action.language);
    setLanguage(languageList[action.language])
    setDropdownMenuShow(false);
  }

  const actions = Object.keys(languageList).map(key => ({
    name: languageList[key].flag + ' ' + languageList[key].label,
    language: languageList[key].language,
  }));

  return (
    <>
      <div className="index-page">
        <div className="header">
          <div className="logo">
            Global Digital Card
          </div>
          <div className="lang-btn" onClick={() => setDropdownMenuShow(true)}>{language.flag} {language.label}</div>
        </div>
        <Card cardStatus={cardStatus} cardStatusTwo={cardStatusTwo} background='bg1' />
        {/* <div className="card home-card">
        </div> */}
        <div className="menu">
          <div className="menu-item" onClick={() => props.navigate('/recharge')}>
            <i className="menu-icon"><IoMdWallet /></i>
            <span>{t('充值')}</span>
          </div>
          <div className="menu-item" onClick={() => cardStatus === '1' ? Toast.info(t('已提交')) : cardStatus === '2' ? Toast.info(t('已申请成功')) : props.navigate('/createCard')}>
            <i className="menu-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_128_10)">
            <path d="M13.64 0.825012H0.990002C0.715002 0.825012 0.440002 1.10001 0.440002 1.37501V17.325C0.440002 17.6 0.715002 17.875 0.990002 17.875H4.29V16.225H2.64C2.365 16.225 2.09 15.95 2.09 15.675V3.02501C2.09 2.75001 2.365 2.47501 2.64 2.47501H11.99C12.265 2.47501 12.54 2.75001 12.54 3.02501V4.12501H14.19V1.37501C14.19 1.10001 13.97 0.825012 13.64 0.825012Z" fill="#0463B7"/>
            <path d="M12.54 16.225C12.54 13.475 14.74 11.275 17.49 11.275C17.655 11.275 17.875 11.275 18.04 11.33V4.675C18.04 4.4 17.765 4.125 17.49 4.125H4.83998C4.56498 4.125 4.28998 4.4 4.28998 4.675V20.625C4.28998 20.9 4.56498 21.175 4.83998 21.175H17.49C14.795 21.175 12.54 18.975 12.54 16.225ZM7.03998 7.975C7.03998 7.7 7.31498 7.425 7.58998 7.425H15.29C15.565 7.425 15.84 7.7 15.84 7.975V8.525C15.84 8.8 15.565 9.075 15.29 9.075H7.58998C7.31498 9.075 7.03998 8.8 7.03998 8.525V7.975ZM10.34 15.125C10.34 15.4 10.065 15.675 9.78998 15.675H7.58998C7.31498 15.675 7.03998 15.4 7.03998 15.125V14.575C7.03998 14.3 7.31498 14.025 7.58998 14.025H9.78998C10.065 14.025 10.34 14.3 10.34 14.575V15.125ZM11.99 11.825C11.99 12.1 11.715 12.375 11.44 12.375H7.58998C7.31498 12.375 7.03998 12.1 7.03998 11.825V11.275C7.03998 11 7.31498 10.725 7.58998 10.725H11.44C11.715 10.725 11.99 11 11.99 11.275V11.825Z" fill="#0463B7"/>
            <path d="M16.72 18.315L14.795 16.39C14.575 16.17 14.575 15.84 14.795 15.62L15.18 15.235C15.4 15.015 15.73 15.015 15.95 15.235L17.875 17.16C18.095 17.38 18.095 17.71 17.875 17.93L17.49 18.315C17.27 18.535 16.94 18.535 16.72 18.315Z" fill="#0463B7"/>
            <path d="M17.105 18.7L16.72 18.315C16.5 18.095 16.5 17.765 16.72 17.545L20.24 14.025C20.46 13.805 20.79 13.805 21.01 14.025L21.395 14.41C21.615 14.63 21.615 14.96 21.395 15.18L17.875 18.7C17.655 18.92 17.325 18.92 17.105 18.7Z" fill="#0463B7"/>
            </g>
            <defs>
            <clipPath id="clip0_128_10">
            <rect width="22" height="22" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            </i>
            <span>{t('申请虚拟卡')}</span>
          </div>
          <div className="menu-item" onClick={() => cardStatusTwo === '1' ? Toast.info(t('已提交')) : cardStatusTwo === '2' ? Toast.info(t('已申请成功')) : props.navigate('/activate')}>
            <i className="menu-icon">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_128_10)">
            <path d="M13.64 0.825012H0.990002C0.715002 0.825012 0.440002 1.10001 0.440002 1.37501V17.325C0.440002 17.6 0.715002 17.875 0.990002 17.875H4.29V16.225H2.64C2.365 16.225 2.09 15.95 2.09 15.675V3.02501C2.09 2.75001 2.365 2.47501 2.64 2.47501H11.99C12.265 2.47501 12.54 2.75001 12.54 3.02501V4.12501H14.19V1.37501C14.19 1.10001 13.97 0.825012 13.64 0.825012Z" fill="#0463B7"/>
            <path d="M12.54 16.225C12.54 13.475 14.74 11.275 17.49 11.275C17.655 11.275 17.875 11.275 18.04 11.33V4.675C18.04 4.4 17.765 4.125 17.49 4.125H4.83998C4.56498 4.125 4.28998 4.4 4.28998 4.675V20.625C4.28998 20.9 4.56498 21.175 4.83998 21.175H17.49C14.795 21.175 12.54 18.975 12.54 16.225ZM7.03998 7.975C7.03998 7.7 7.31498 7.425 7.58998 7.425H15.29C15.565 7.425 15.84 7.7 15.84 7.975V8.525C15.84 8.8 15.565 9.075 15.29 9.075H7.58998C7.31498 9.075 7.03998 8.8 7.03998 8.525V7.975ZM10.34 15.125C10.34 15.4 10.065 15.675 9.78998 15.675H7.58998C7.31498 15.675 7.03998 15.4 7.03998 15.125V14.575C7.03998 14.3 7.31498 14.025 7.58998 14.025H9.78998C10.065 14.025 10.34 14.3 10.34 14.575V15.125ZM11.99 11.825C11.99 12.1 11.715 12.375 11.44 12.375H7.58998C7.31498 12.375 7.03998 12.1 7.03998 11.825V11.275C7.03998 11 7.31498 10.725 7.58998 10.725H11.44C11.715 10.725 11.99 11 11.99 11.275V11.825Z" fill="#0463B7"/>
            <path d="M16.72 18.315L14.795 16.39C14.575 16.17 14.575 15.84 14.795 15.62L15.18 15.235C15.4 15.015 15.73 15.015 15.95 15.235L17.875 17.16C18.095 17.38 18.095 17.71 17.875 17.93L17.49 18.315C17.27 18.535 16.94 18.535 16.72 18.315Z" fill="#0463B7"/>
            <path d="M17.105 18.7L16.72 18.315C16.5 18.095 16.5 17.765 16.72 17.545L20.24 14.025C20.46 13.805 20.79 13.805 21.01 14.025L21.395 14.41C21.615 14.63 21.615 14.96 21.395 15.18L17.875 18.7C17.655 18.92 17.325 18.92 17.105 18.7Z" fill="#0463B7"/>
            </g>
            <defs>
            <clipPath id="clip0_128_10">
            <rect width="22" height="22" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            </i>
            <span>{t('申请实体卡')}</span>
          </div>
          <div className="menu-item" onClick={() => cardStatus != 2 ? Toast.info(t('请激活卡片')) : props.navigate('/cardInfo?type=1')}>
            <i className="menu-icon"><IoCard /></i>
            <span>{t('虚拟卡信息')}</span>
          </div>
          <div className="menu-item" onClick={() => cardStatusTwo != 2 ? Toast.info(t('请激活卡片')) : props.navigate('/cardInfo?type=2')}>
            <i className="menu-icon"><IoCard /></i>
            <span>{t('实体卡信息')}</span>
          </div>
          <div className="menu-item" onClick={() => props.navigate('/password')}>
            <i className="menu-icon">
              <svg t="1768920397386" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12648" width="22" height="22"><path d="M952.115 516.401v-32.275 32.275z m0 410.774c0 46.945-38.144 88.023-88.023 88.023H159.908c-49.88 0-88.023-38.144-88.023-88.023V516.4c0-46.945 46.946-96.825 93.892-96.825h689.512c46.946 0 93.892 49.88 93.892 96.825l2.934 410.774zM573.616 639.633c0-35.209-29.34-61.616-61.616-61.616s-61.616 29.341-61.616 61.616v187.782c0 35.21 29.34 61.617 61.616 61.617s61.616-29.341 61.616-61.617V639.633z m190.716-284.607c0-137.903-117.364-258.2-255.266-258.2-137.903 0-246.464 120.297-246.464 258.2h-96.825c0-167.244 155.507-346.224 340.355-346.224s349.157 178.98 349.157 346.224h-90.957z" p-id="12649" fill="#0463B7"></path></svg>
            </i>
            <span>{t('修改密码')}</span>
          </div>
          <div className="menu-item" onClick={() => props.navigate('/log')}>
            <i className="menu-icon">
              <svg t="1754924898783" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8356" width="22" height="22"><path d="M871.616 64H152.384c-31.488 0-60.416 25.28-60.416 58.24v779.52c0 32.896 26.24 58.24 60.352 58.24h719.232c34.112 0 60.352-25.344 60.352-58.24V122.24c0.128-32.96-28.8-58.24-60.288-58.24zM286.272 512c-23.616 0-44.672-20.224-44.672-43.008 0-22.784 20.992-43.008 44.608-43.008 23.616 0 44.608 20.224 44.608 43.008A43.328 43.328 0 0 1 286.272 512z m0-202.496c-23.616 0-44.608-20.224-44.608-43.008 0-22.784 20.992-43.008 44.608-43.008 23.616 0 44.608 20.224 44.608 43.008a43.456 43.456 0 0 1-44.608 43.008zM737.728 512H435.904c-23.68 0-44.672-20.224-44.672-43.008 0-22.784 20.992-43.008 44.608-43.008h299.264c23.616 0 44.608 20.224 44.608 43.008a42.752 42.752 0 0 1-41.984 43.008z m0-202.496H435.904c-23.616 0-44.608-20.224-44.608-43.008 0-22.784 20.992-43.008 44.608-43.008h299.264c23.616 0 44.608 20.224 44.608 43.008a42.88 42.88 0 0 1-42.048 43.008z" p-id="8357" fill="#0463B7"></path></svg>
            </i>
            <span>{t('验证码列表')}</span>
          </div>
          <div className="menu-item" onClick={() => props.navigate('/activateCard')}>
            <i className="menu-icon">
              <svg t="1752562932371" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21992" width="24" height="24"><path d="M962.56 371.94752v416.2048c0 49.96096-39.1168 91.00288-87.47008 92.44672L872.448 880.64H151.552c-48.68096 0-88.65792-40.1408-90.07104-89.77408L61.44 788.15232V371.94752h901.12zM728.2688 503.8592a27.0336 27.0336 0 0 0-26.9824 25.32352l-0.0512 1.71008v92.42624h-89.57952a27.56608 27.56608 0 0 0-1.7408 55.0912l1.7408 0.0512h89.57952v92.43648a27.0336 27.0336 0 0 0 54.016 1.71008l0.0512-1.71008v-92.43648h89.57952a27.56608 27.56608 0 0 0 1.7408-55.08096l-1.7408-0.0512H755.3024v-92.43648a27.0336 27.0336 0 0 0-27.0336-27.0336z m-352.03072 76.1856H197.20192a23.12192 23.12192 0 0 0-1.5872 46.19264l1.5872 0.0512h179.03616a23.12192 23.12192 0 1 0 0-46.24384z m135.168-92.48768H197.20192a23.12192 23.12192 0 0 0-1.5872 46.1824l1.5872 0.06144h314.20416a23.12192 23.12192 0 0 0 0-46.24384zM872.448 163.84c49.5616 0 90.112 41.6256 90.112 92.48768v69.36576H61.44v-69.36576C61.44 205.4656 101.9904 163.84 151.552 163.84z" fill="#0463B7" p-id="21993"></path></svg>
            </i>
            <span>{t('激活卡片')}</span>
          </div>
        </div>
        <div className="assets-box" style={{padding: 0}}>
          <div className="assets-title">{t('资产')}</div>
          <div className="assets-list">
            <div className="assets-item">
              <div className="assets-info">
                <div className="assets-icon usd"></div>
                <div className="assets-name">{t('虚拟卡')} USD</div>
              </div>
              <div className="assets-amount">{Math.round((Number(cardAmount) || 0) * 10000) / 10000}</div>
            </div>
            <div className="assets-item">
              <div className="assets-info">
                <div className="assets-icon usd"></div>
                <div className="assets-name">{t('实体卡')} USD</div>
              </div>
              <div className="assets-amount">{Math.round((Number(cardAmountTwo || 0)) * 10000) / 10000}</div>
            </div>
            <div className="assets-item">
              <div className="assets-info">
                <div className="assets-icon usdt"></div>
                <div className="assets-name">USDT</div>
              </div>
              <div className="assets-amount">{amount}</div>
            </div>
            <div className="assets-item">
              <div className="assets-info">
                <div className="assets-icon usdc"></div>
                <div className="assets-name">USDC</div>
              </div>
              <div className="assets-amount">0.0</div>
            </div>
            <div className="assets-item">
              <div className="assets-info">
                <div className="assets-icon busd"></div>
                <div className="assets-name">BUSD</div>
              </div>
              <div className="assets-amount">0.0</div>
            </div>
            <div className="assets-item">
              <div className="assets-info">
                <div className="assets-icon omnispere"></div>
                <div className="assets-name">OMNISPERE</div>
              </div>
              <div className="assets-amount">0.0</div>
            </div>
          </div>
        </div>
      </div>
      {/* <Popup
        visible={visible}
        position="bottom"
        round
        onClose={handleClose}
        style={{ height: '300px' }}
      >
        <DatetimePicker
          type="year-month"
          title="选择年月"
          value={value}
          maxDate={new Date(2025, 11, 31)}
          defaultValue={value}
          onConfirm={handleConfirm}
          onCancel={handleClose}
        />
      </Popup> */}
      <PendingModal ref={pendingModalRef} />
      <DetailsModal ref={detailsModalRef} />
      <ActionSheet
        visible={dropdownMenuShow}
        onCancel={onCancel}
        onSelect={onSelect}
        actions={actions}
      />
    </>
  )
}
export default Index;