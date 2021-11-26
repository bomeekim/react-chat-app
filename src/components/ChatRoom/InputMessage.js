import React from 'react'
import sendIcon from '../../assets/icons/img-send.png';
import style from './InputMessage.module.css';

function InputMessage() {
  return (
    <div className={style['input-message-wrapper']}>
      <input type="text" className={style['input-message']} placeholder="메시지를 입력하세요." />
      <button type="button" className={style['btn-send']}>
        <img src={sendIcon} />
      </button>
    </div>
  )
}

export default InputMessage
