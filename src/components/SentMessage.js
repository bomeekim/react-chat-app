import React, { useState, useEffect } from 'react'
import style from '../css/SentMessage.module.css';

function ImageMessage({ message, time, cancelClickFunc }) {
  const [progressValue, setProgressValue] = useState(20);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // progress bar 에 색상이 채워지는 모습을 자연스럽게 보여주기 위해 다음과 같이 timeout 을 설정함
    const time = (1000 / progressValue) * 5;

    const progress = setTimeout(() => {
      if (progressValue <= 100) {
        setProgressValue(progressValue + 5);
      } else {
        setCompleted(true);
      }
    }, time);

    return () => clearTimeout(progress);
  }, [progressValue, completed]);

  return (
    <div>
      <div className={style['message-box-image']}>
        <span className={style['message-box__subtitle']}>{time}</span>
        <div className={style['image-wrapper']}>
          <img src={message}/>
          {!completed && <button onClick={() => cancelClickFunc(message)} />}
        </div>
      </div>
      
      {!completed &&
        <div className={style['progress-bar-box']}>
          <progress className={style['progress-bar']} value={progressValue} max="100" />
        </div>
      }
    </div>
  )
}

function TextMessage({ message, time }) {
  return (
    <div className={style['message-box']}>
      <span className={style['message-box__subtitle']}>{time}</span>
      <div className={style['message-box__contents']}>{message}</div>
    </div>
  );
}

function SentMessage({ message, time, cancelClickFunc }) {
  const isImage = /\.png|.jpg$/g.test(message);

  return (
    <div>
      {isImage && <ImageMessage message={message} time={time} cancelClickFunc={cancelClickFunc}/>}
      {!isImage && <TextMessage message={message} time={time} />}
    </div>
  )
}

export default SentMessage
