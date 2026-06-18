import React, {useState, useEffect} from 'react'
import { Toast, Pagination, Popup, Tabs } from 'react-vant'
import { fetchOrderList } from '@services/api'
import Empty from '@components/empty';
import classnames from 'classnames'
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import Card from '@components/card'
import '../wallet/index.less'
import './index.less'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const Bank = (props) => {
  const [page, setPage] = useState(1);
  const [total , setTotal] = useState(0)
  const [currentTab, setCurrentTab] = useState(0);
  const [list, setList] = useState([])
  const [showList, setShowList] = useState([])
  const { t } = useTranslation();

  const { cardNum, cardStatus, cardStatusTwo, cardAmount, cardAmountTwo } = props.state

  useEffect(() => {
    setPage(1)
    getOrderList(1)
  }, [currentTab])

  const getOrderList = (pageNum) => {
    fetchOrderList({
      page: pageNum || page,
      cardType: currentTab
    }).then(res => {
      if (res.status === 'ok') {
        setList(res.list)
        setTotal(res.count)
      }
    })
  }

  const handleShowList = (index) => {
    if (showList.includes(index)) {
      setShowList(showList.filter(item => item !== index))
    } else {
      setShowList([...showList, index])
    }
  }

  const orderStatus = {
    CLOSED: t('完成'),
    PENDING: t('处理中'),
    FAIL: t('失败'),
    PROCESSING: t('处理中')
  }

  const recordTab = [t('虚拟卡'), t('实体卡')]

  return (
    <>
      <div className="wallet-page">
        <Card cardStatus={0} cardStatusTwo={cardStatusTwo} show={2} background="bg3" />
        <div className="wallet-title">{t('银行账户')}</div>
        <div className="wallet-head">
          <div className="wallet-head-title">{t('资产估值')}</div>
          <div className="wallet-head-amount">
            <span>$ {Math.round((Number(cardAmount || 0) + Number(cardAmountTwo || 0)) * 10000) / 10000} USD</span>
          </div>
          {/* <ul className="wallet-header-menu" style={{padding: '15px 30px 0 30px'}}>
            <li onClick={() => Toast.info(t('暂未开放'))}>
              <svg t="1752572338594" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="64243" width="24" height="24"><path d="M931.925333 88.874667c46.762667 0 85.034667 36.266667 88.32 82.176l0.170667 6.357333V425.514667a39.125333 39.125333 0 0 1-77.952 4.565333L942.208 425.514667v-97.28H81.749333v475.648c0 4.693333 3.2 8.704 7.552 9.898666l2.773334 0.384h889.258666a39.125333 39.125333 0 0 1 4.565334 77.952l-4.565334 0.256H92.074667a88.533333 88.533333 0 0 1-88.32-82.176L3.541333 803.925333V177.408C3.541333 130.645333 39.808 92.288 85.717333 89.088L92.074667 88.874667h839.850666z m-273.749333 345.130666c16.213333 11.52 20.992 33.237333 11.776 50.346667l-2.56 4.181333-79.616 111.786667h393.557333c20.053333 0 36.565333 15.104 38.826667 34.56l0.256 4.565333c0 20.053333-15.104 36.565333-34.56 38.826667l-4.522667 0.298667h-469.333333a39.125333 39.125333 0 0 1-34.389333-57.856l2.517333-3.968 123.52-173.568a39.125333 39.125333 0 0 1 54.528-9.173334z m273.749333-266.922666H92.074667a10.282667 10.282667 0 0 0-9.941334 7.552l-0.384 2.773333v72.618667H942.208V177.408a10.282667 10.282667 0 0 0-7.552-9.941333l-2.730667-0.384z" fill="#2c2c2c" p-id="64244"></path></svg>
              <span>入金</span>
            </li>
            <li onClick={() => Toast.info(t('暂未开放'))}>
              <svg t="1752572484634" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="77571" width="24" height="24"><path d="M656.79872 617.99936c15.60064 0 29.59872-13.99808 29.59872-29.59872s-13.99808-29.59872-29.5936-29.59872h-118.40512l108.40064-110.40256c12.00128-12.00128 12.00128-29.59872 0-41.6-12.00128-12.00128-29.59872-12.00128-41.6 0l-92.8 97.2032L417.59744 407.1936c-11.99616-12.00128-29.5936-12.00128-41.59488 0s-12.00128 29.59872 0 41.6l108.39552 110.40256H366.40256c-15.60064 0-29.60384 13.99808-29.60384 29.59872s14.0032 29.59872 29.59872 29.59872h114.40128v29.59872H366.39744c-15.59552 0-29.5936 14.0032-29.5936 29.60384s13.99808 29.59872 29.5936 29.59872h114.40128v84.79744c0 12.00128 14.0032 21.6064 29.59872 21.6064s29.60384-10.00448 29.60384-21.6064v-84.79744h114.40128c15.59552 0 29.5936-13.99808 29.5936-29.59872s-13.99808-29.60384-29.5936-29.60384h-114.40128v-29.5936h116.79744zM926.80192 42.39872H96.79872C43.60192 42.39872 0 86.00064 0 139.20256v128.39936c0 53.1968 43.60192 96.79872 96.79872 96.79872h72.80128v520.3968c0 53.20192 43.60192 96.80384 96.79872 96.80384h493.19936c53.20192 0 96.80384-43.60192 96.80384-96.79872V363.99616h73.20064c53.1968 0 94.7968-43.5968 94.7968-96.7936V138.79808c-0.79872-52.79744-44.40064-96.39936-97.59744-96.39936z m-136.00256 846.0032c0 27.5968-25.6 31.60064-55.19872 31.60064h-469.1968a31.4112 31.4112 0 0 1-31.60576-31.60064V298.79808a31.4112 31.4112 0 0 1 31.60064-31.59552h493.19936a31.4112 31.4112 0 0 1 31.60064 31.59552v589.60384z m169.6-753.2032V271.2064a31.4112 31.4112 0 0 1-31.60064 31.60064h-76.8c0-9.99936-1.9968-25.6-6.00064-35.59936 25.6 0 47.2064-21.6064 47.2064-47.2064 0-25.6-21.6064-47.19616-47.2064-47.19616H175.60064c-25.6 0-47.20128 21.60128-47.20128 47.20128 0 25.6 21.60128 47.20128 47.20128 47.20128-3.99872 9.99936-6.00064 23.59808-6.00064 35.59936h-76.8a31.4112 31.4112 0 0 1-31.60064-31.60064V135.19872a31.4112 31.4112 0 0 1 31.60064-31.60064h840.00256a31.4112 31.4112 0 0 1 31.59552 31.60064h-3.9936z" fill="#2c2c2c" p-id="77572"></path></svg>
              <span>提现</span>
            </li>
            <li onClick={() => Toast.info(t('暂未开放'))}>
              <svg t="1752572264192" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="60310" width="24" height="24"><path d="M459.093333 526.933333l-0.042666-0.042666a42.666667 42.666667 0 1 0-64.789334 55.552h0.042667L461.909333 661.333333H106.666667q-8.832 0-15.082667-6.250666T85.333333 640V170.666667q0-8.832 6.250667-15.082667T106.666667 149.333333h640q8.832 0 15.082666 6.250667T768 170.666667v149.333333a42.666667 42.666667 0 1 0 85.333333 0V170.666667q0-44.181333-31.253333-75.434667Q790.869333 64 746.666667 64H106.666667Q62.485333 64 31.232 95.232 0 126.506667 0 170.666667v469.333333q0 44.181333 31.232 75.413333Q62.506667 746.666667 106.666667 746.666667h448a42.666667 42.666667 0 0 0 32.384-70.442667L459.093333 526.933333z" fill="#2c2c2c" p-id="60311"></path><path d="M256 853.333333v-21.333333a42.666667 42.666667 0 1 0-85.333333 0v21.333333q0 44.181333 31.232 75.413334Q233.173333 960 277.333333 960h640q44.181333 0 75.413334-31.253333Q1024 897.536 1024 853.333333V384q0-44.181333-31.253333-75.434667Q961.536 277.333333 917.333333 277.333333H277.333333q-44.181333 0-75.434666 31.232Q170.666667 339.84 170.666667 384v181.333333a42.666667 42.666667 0 1 0 85.333333 0V384q0-8.832 6.250667-15.082667T277.333333 362.666667h640q8.832 0 15.082667 6.250666T938.666667 384v469.333333q0 8.832-6.250667 15.082667T917.333333 874.666667H277.333333q-8.832 0-15.082666-6.250667T256 853.333333z" fill="#2c2c2c" p-id="60312"></path></svg>
              <span>转账</span>
            </li>
          </ul> */}
        </div>
        <div className="bill">
          <div className="bill-title">
            <div className="bill-title-main">
              <span>{t('账单')}</span>
              {/* <ul>
                <li onClick={() => pendingModalRef.current.open()}>待出账单</li>
                <li onClick={() => detailsModalRef.current.open()}>明细账单</li>
              </ul> */}
            </div>
            {/* <div className="date-select-btn" onClick={() => setVisible(true)}>{dayjs(value).format('YYYY年MM月')}<BiSolidDownArrow /></div> */}
          </div>
          <Tabs defaultActive={0} onChange={(value) => {
            setCurrentTab(value)
          }}>
            {recordTab.map(item => (
              <Tabs.TabPane key={item} title={`${item}`}>
                <div className="bill-list">
                  {
                    list.length === 0 && <Empty style={{ margin: '60px 0' }} />
                  }
                  {
                    list.map((item, index) => (
                      <div className="bill-item" key={index}>
                        <div className="bill-content" onClick={() => handleShowList(index)}>
                          <div className="bill-item-box">
                            <div className="bill-item-left">
                              <div className="bill-item-title">{item.tradeDescription}</div>
                              <div className="bill-item-time">{t('交易金额')}: {item.tradeAmount}</div>
                            </div>
                            <div className="bill-item-right">
                              <span>{orderStatus[item.status]}</span>
                              <i className={classnames({
                                'arrow-icon': true,
                                'arrow-unfold': showList.includes(index)
                              })} />
                            </div>
                          </div>
                        </div>
                        <div className={classnames({
                          'bill-content-info': true,
                          'show-info': showList.includes(index)
                        })}>
                          <div className="bill-item-box">
                            {dayjs(Number(item.timestamp)).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')}
                          </div>
                          <div className="bill-item-box">
                            <div className="bill-item-left">{t('手续费')}: {item.serviceFee}</div>
                          </div>
                          <div className="bill-item-box">
                            <div className="bill-item-left">{t('备注')}: {item.detail}</div>
                          </div>
                          {
                            item.status === 'FAIL' && (
                              <div className="bill-item-box">
                                <div className="bill-item-left">{t('失败原因')}: {item.failReason}</div>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    ))
                  }

                  {
                    list.length / 20 > 1 && <><br /><Pagination value={page} mode="simple" onChange={value => {
                      setPage(value)
                      getOrderList()
                    }} pageCount={Math.ceil(total / 20)} /></>
                  }
                </div>
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default Bank;