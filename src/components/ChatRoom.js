import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import SentMessage from './SentMessage';
import style from '../css/ChatRoom.module.css';
import ReceivedMessage from './ReceivedMessage';
import InputMessage from './InputMessage';
import Divider from './Divider';
import axios from 'axios';
import { getDateTime, getDate } from '../utils/date';

const MY_ID = 0;

function Header({ name }) {
  return (
    <header className="header">
      <div className="header__content">
        <button type="button" className={style['btn-back']} />
        <div className={style['header__title']}>{name}</div>
        <div className={style['button-wrapper']}>
          <button type="button" className={style['btn-upload']} />
          <button type="button" className={style['btn-search']} />
        </div>
      </div> 
    </header>
  )
}

function Body({ chat }) {
  /**
   * 메시지를 비교해 배열에 divider와 divider에 들어갈 날짜를 추가해주는 함수
   */
  const messageWithDivider = chat.reduce((prev, cur) => {
    let prevDate = prev.length > 0 && new Date(prev[prev.length - 1].sentDateTime);
    let curDate = !cur.sentDateTime ? new Date() : new Date(cur.sentDateTime);

    if (!!prevDate && !!curDate) {
      const diff = curDate.getTime() - prevDate.getTime();
      const convertedDiff = Math.round(diff / (1000 * 3600 * 24));
      
      convertedDiff > 0 && prev.push({ divider: true, date: getDate(curDate) });
    }

    prev.push(cur);

    return prev;
  }, []);

  /**
   * 메시지 Body 를 그리는 함수
   * divider 가 있는 경우 <Divider /> 컴포넌트를 리턴하고,
   * 없는 경우 userId 를 비교해 메시지 컴포넌트를 리턴한다.
   */
  const messageBody = messageWithDivider.map((obj, index) => {
    if (obj.divider) {
      return <Divider key={obj.date.date} text={`${obj.date.year}년 ${obj.date.month}월 ${obj.date.date}일`} />;
    }

    const { hour, minute } = getDateTime(obj.sentDateTime);
    const time = `${hour}:${minute}`;

    if (obj.userId !== MY_ID) {
      return <ReceivedMessage key={obj.id} message={obj.message} time={time} />;
    } else {
      return <SentMessage key={obj.id} message={obj.message} time={time} />;
    }
  })

  return (
    <div className={style['chat-room__contents']}>
      {messageBody}
    </div>
  )
}

function Footer() {
  return (
    <footer>
      <InputMessage className={style['input-message']} />
    </footer>
  )
}

function ChatRoom() {
  const { room_id: roomId } = useParams();
  const [ room, setRoom ] = useState({ name: '', chat: [] });

  useEffect(async () => {
    const { data } = await axios.get(URL.GET(roomId));
    setRoom(data);
  }, []);

  return (
    <div className={style['chat-room']}>
      <Header name={room.name} />
      <Body chat={room.chat}/>
      <Footer />
    </div>
  )
}

export default ChatRoom
