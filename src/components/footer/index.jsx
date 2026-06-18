import React, {useState, useEffect} from 'react'
import { BsCreditCard, BsCreditCardFill  } from "react-icons/bs";
import { IoWalletOutline, IoWallet } from "react-icons/io5";
import { RiBankLine, RiBankFill } from "react-icons/ri";
import { HiOutlineUser, HiMiniUser } from "react-icons/hi2";
import './index.less'

const Footer = (props) => {
  const { t } = props;

  useEffect(() => {

  }, [])

  return (
    <div className='footer'>
      <div className="tab-bar">
        <div className={props.match.pathname === '/' ? 'tab-bar-item active' : 'tab-bar-item'} onClick={() => props.navigate('/')}>
          {
            props.match.pathname === '/' ? <BsCreditCardFill style={{fontSize: 20, color: '#0463B7'}} /> : <BsCreditCard style={{fontSize: 20}} />
          }
          {t('卡片')}
        </div>
        <div className={props.match.pathname === '/wallet' ? 'tab-bar-item active' : 'tab-bar-item'} onClick={() => props.navigate('/wallet')}>
          {
            props.match.pathname === '/wallet' ? <IoWallet style={{fontSize: 20, color: '#0463B7'}} /> : <IoWalletOutline style={{fontSize: 20}} />
          }
          {t('钱包')}
        </div>
        <div className={props.match.pathname === '/bank' ? 'tab-bar-item active' : 'tab-bar-item'} onClick={() => props.navigate('/bank')}>
          {
            props.match.pathname === '/bank' ? <RiBankFill style={{fontSize: 20, color: '#0463B7'}} /> : <RiBankLine style={{fontSize: 20}} />
          }
          {t('银行')}
        </div>
        <div className={props.match.pathname === '/my' ? 'tab-bar-item active' : 'tab-bar-item'} onClick={() => props.navigate('/my')}>
          {
            props.match.pathname === '/my' ? <HiMiniUser style={{fontSize: 20, color: '#0463B7'}} /> : <HiOutlineUser style={{fontSize: 20}} />
          }
          {t('我的')}
        </div>
      </div>
    </div>
  )
}

export default Footer;