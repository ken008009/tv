import React, {useState, useEffect} from 'react'
import { useTranslation } from 'react-i18next';
import './index.less'

const Empty = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
  }, [])

  return (
    <>
      <div className="empty" style={props.style}>
        <i className="empty-icon"></i>
        {props.content || t('暂无数据')}
      </div>
    </>
  )
}

export default Empty;