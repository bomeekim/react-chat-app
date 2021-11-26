import React, { useState, useRef } from 'react'
import sendIcon from '../../assets/icons/img-send.png';
import style from './InputMessage.module.css';

function InputMessage({ sendClickFunc }) {
  const [ message, setMessage ] = useState('');
  const inputRef = useRef(null);

  const onClickHander = () => {
    sendClickFunc(message); // 상위로 input 에 입력한 메시지를 전달한다.
    setMessage(''); // 메시지를 초기화한다.
    inputRef.current.focus(); // input 에 포커스를 준다.
  }

  return (
    <div className={style['input-message-wrapper']}>
      <input 
        type="text" 
        ref={inputRef}
        className={style['input-message']} 
        placeholder="메시지를 입력하세요." 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="button" className={style['btn-send']}  onClick={onClickHander} >
        <img src={sendIcon} alt="Send Button" />
      </button>
    </div>
  )
}

export default InputMessage
