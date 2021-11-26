import React, { useState, useEffect } from 'react'
import style from './SentMessage.module.css';
import { getDateTime } from '../../utils/date';

const formattedTime = (time) => `${time.hour}:${time.minute}`;

function ImageMessage({ message, time, cancelClickFunc }) {
  const [progressValue, setProgressValue] = useState(20);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const { hour, minute, seconds } = getDateTime(new Date());
    const currentTime = `${hour}:${minute}`;
    const sendingImage = formattedTime(time) === currentTime;
    const reEnteringInTime = seconds - time.seconds < 3

    // 채팅방에 사진을 보낸 경우 (뒤로 갔다 재진입하는 경우 3초가 지나면 progress bar를 보여주지 않음)
    if (sendingImage && reEnteringInTime) {
      animateProgressbar();
    } else { // 채팅방을 불러왔을 때 과거에 사진을 보낸게 있을 경우
      setProgressValue(100);
      setCompleted(true);
    }
  }, [progressValue, completed]);

  const animateProgressbar = () => {
    // progress bar 에 색상이 채워지는 모습을 자연스럽게 보여주기 위해 다음과 같이 timeout 을 설정함
    const timer = (1000 / progressValue) * 5;

    const progress = setTimeout(() => {
      if (progressValue <= 100) {
        setProgressValue(progressValue + 5);
      } else {
        setCompleted(true);
      }
    }, timer);

    return () => clearTimeout(progress);
  }

  return (
    <div>
      <div className={style['message-box-image']}>
        <span className={style['message-box__subtitle']}>{time && formattedTime(time)}</span>
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
      <span className={style['message-box__subtitle']}>{time && formattedTime(time)}</span>
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
