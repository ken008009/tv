import React, { useState, useEffect } from "react";
import { fetchCardInfo } from "@services/api";
import bg1 from '@images/card-bg.png'
import bg2 from '@images/card-bg-2.png'
import bg3 from '@images/card-bg-3.png'
import { Toast } from "react-vant";
import "./index.less";
import { t } from "i18next";

const CardInfo = ({ cardStatus, show, cardStatusTwo, background }) => {
  const [accessToken, setAccessToken] = useState(null)
  const [accessTwoToken, setAccessTwoToken] = useState(null)

  useEffect(() => {
    if (open) {
      if (show === 1) {
        getCardInfo()
      } else if (show === 2) {
        getCardTwoInfo()
      } else {
        getCardInfo()
        getCardTwoInfo()
      }
    }
  }, []);

  const getCardInfo = async () => {
    try {
      fetchCardInfo({
        cardType: 1
      }).then((res) => {
        setAccessToken(res.accessToken);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCardTwoInfo = async () => {
    try {
      fetchCardInfo({
        cardType: 2
      }).then((res) => {
        setAccessTwoToken(res.accessToken);
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  const bg = {
    bg1: bg1,
    bg2: bg2,
    bg3: bg3
  }

  return (
    <>
      <div className="card-module" style={{background: `url('${bg[background]}') no-repeat`, backgroundSize: 'cover'}}>
        <div className="card-info">
          {
            cardStatus === '2' && (
              <div className="card-nember">
                <p>{t('虚拟卡')}</p>
                {
                  accessToken ? <iframe
                    style={{
                      border: 'none',
                      boxShadow: 'none',
                      width: '100%',
                      height: '30px',
                    }}
                    src={`/card.html?clientAccessToken=${accessToken}`}
                  /> : <div className="card-content" id="card-pan">...</div>
                }
              </div>
            )
          }
          {
            cardStatusTwo === '2' && (
              <div className="card-nember">
                <p>{t('实体卡')}</p>
                {
                  accessTwoToken ? <iframe
                    style={{
                      border: 'none',
                      boxShadow: 'none',
                      width: '100%',
                      height: '30px',
                    }}
                    src={`/card.html?clientAccessToken=${accessTwoToken}`}
                  /> : <div className="card-content" id="card-pan">...</div>
                }
              </div>
            )
          }
        </div>
        <div className="card-footer">
          <span>{t('虚拟卡')}1%{t('池子')}<br />({t('数量')})</span>
          <span>{t('实体卡')}1%{t('池子')}<br />({t('数量')})</span>
        </div>
      </div>
    </>
  );
};

export default CardInfo;