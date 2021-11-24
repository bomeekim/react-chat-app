import React from 'react'
import style from '../css/SentMessage.module.css';

function SentMessage({ message, time }) {
  return (
    <div className={style['message-box']}>
      <span className={style['message-box__subtitle']}>{time}</span>
      <div className={style['message-box__contents']}>{message}</div>
    </div>
  )
}

export default SentMessage
