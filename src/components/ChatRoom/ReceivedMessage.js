import React from 'react'
import style from './ReceivedMessage.module.css';

function ReceivedMessage({ message, time }) {
  const formattedTime = `${time.hour}:${time.minute}`;

  return (
    <div className={style['message-box']}>
      <div className={style['message-box__contents']}>{message}</div>
      <span className={style['message-box__subtitle']}>{time && formattedTime}</span>
    </div>
  )
}

export default ReceivedMessage
