import React, { useState, useEffect, useCallback } from 'react'
import style from './SentMessage.module.css';
import { getDateTime } from '../../utils/date';

const formattedTime = (time) => `${time.hour}:${time.minute}`;

function ImageMessage({ message, time, cancelClickFunc, completedUpload }) {
  const [timeoutId, setTimeoutId] = useState(null);
  const [progressValue, setProgressValue] = useState(20);
  const [completed, setCompleted] = useState(false);
  const animateProgressbar = useCallback(
    () => {
      const timer = (1000 / progressValue) * 5;
  
      const progress = setTimeout(() => {
        if (progressValue <= 100) {
          setProgressValue(progressValue + 5);
        } else {
          setCompleted(true);
          completedUpload(); // 상위 컴포넌트로 이벤트 전달
        }
      }, timer);
      
      setTimeoutId(progress); // timeout 아이디 저장

      return () => clearTimeout(progress);
    },
    [progressValue, completedUpload]
  );

  useEffect(() => {
    const { hour, minute, seconds } = getDateTime(new Date());
    const currentTime = `${hour}:${minute}`;
    const sendingImage = formattedTime(time) === currentTime;
    const reEnteringInTime = seconds - time.seconds < 3;

    // 채팅방에 사진을 보낸 경우 (뒤로 갔다 재진입하는 경우 3초가 지나면 progress bar를 보여주지 않음)
    if (sendingImage && reEnteringInTime) {
      animateProgressbar();
    } else { // 채팅방을 불러왔을 때 과거에 사진을 보낸게 있을 경우
      setProgressValue(100);
      setCompleted(true);
    }
  }, [time, animateProgressbar, completed]);

  /**
   * 취소 버튼 클릭 시 호출되는 함수
   */
  const onClickHander = () => {
    clearTimeout(timeoutId); // setTimeout 해제
    cancelClickFunc(message); // 상위로 취소한 이미지 파일의 url 을 전달한다.
  };

  return (
    <div>
      <div className={style['message-box-image']}>
        <span className={style['message-box__subtitle']}>{time && formattedTime(time)}</span>
        <div className={style['image-wrapper']}>
          <img src={message} alt="The message I sent you."/>
          {!completed && <button onClick={onClickHander} />}
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
  )
}

function SentMessage({ message, time, cancelClickFunc, completedUpload }) {
  const isImage = /\.png|.jpg$/g.test(message);

  return (
    <div>
      {isImage && 
        <ImageMessage 
          message={message} 
          time={time} 
          cancelClickFunc={cancelClickFunc}
          completedUpload={completedUpload}
        />
      }
      {!isImage && <TextMessage message={message} time={time} />}
    </div>
  )
}

export default SentMessage
