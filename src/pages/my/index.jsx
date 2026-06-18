import React, {useState, useEffect} from 'react'
import { IoQrCodeOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { RiTeamLine } from "react-icons/ri";
import { GrHelpBook } from "react-icons/gr";
import { FiShare2 } from "react-icons/fi";
import { LuCircleUser } from "react-icons/lu";

import './styles/index.less'

const levelMap = {
  '1': '区代',
  '2': '市代',
  '3': '省代',
}

const My = (props) => {
  const { t } = props

  useEffect(() => {
  }, [])

  const { address, vip, vipThree } = props.state
  const cardLevel = vipThree ?? 0

  return (
    <>
      <div className="my-page">
        <div className="my-info">
          <div className="my-address">
            <div className="user-info">
              <p>{props.formatAddress(address)}</p>
              {/* {
                levelMap[vipThree] && <p className="level-sign">{levelMap[vipThree]}</p>
              } */}
            </div>
            <div className="level">
              <i className="star-icon"></i>
              <span>V{vip}</span>
            </div>
            <div className="level-two">
              {/* <span>{t('实体卡级别')}</span>V{vipThree} */}
              <span>{t('用户级别')}</span>V{cardLevel}
            </div>
          </div>
          {/* <div className="my-uid">UID: 259948883</div> */}
        </div>
        <div className="my-menu">
          <div className="my-menu-item" onClick={() => props.navigate('/invite')}>
            <div className="menu-content">
              <FiShare2 />
              <span className="menu-content-text">{t('邀请链接')}</span>
            </div>
            <IoIosArrowForward style={{fontSize: 18}} />
          </div>
          <div className="my-menu-item" onClick={() => props.navigate('/team')}>
            <div className="menu-content">
              <RiTeamLine />
              <span className="menu-content-text">{t('我的团队')}</span>
            </div>
            <IoIosArrowForward style={{fontSize: 18}} />
          </div>
          <div className="my-menu-item">
            <div className="menu-content">
              <GrHelpBook />
              <span className="menu-content-text">{t('VISA资讯')}</span>
            </div>
            <IoIosArrowForward style={{fontSize: 18}} />
          </div>
          <div className="my-menu-item">
            <div className="menu-content">
              <LuCircleUser />
              <span className="menu-content-text">{t('关于我们')}</span>
            </div>
            <IoIosArrowForward style={{fontSize: 18}} />
          </div>
        </div>
      </div>
    </>
  )
}

export default My;