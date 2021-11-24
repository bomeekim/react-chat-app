import React from 'react'
import style from '../css/ReceivedMessage.module.css';

function ReceivedMessage({ message, time }) {
  return (
    <div className={style['message-box']}>
      <div className={style['message-box__contents']}>{message}</div>
      <span className={style['message-box__subtitle']}>{time}</span>
    </div>
  )
}

export default ReceivedMessage
