import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import SentMessage from './SentMessage';
import style from '../css/ChatRoom.module.css';
import ReceivedMessage from './ReceivedMessage';
import InputMessage from './InputMessage';
import Divider from './Divider';
import { getDateTime, getDate, diff } from '../utils/date';
import ImageFileList from './ImageFileList';
import API from '../api';

const MY_USER_ID = 0;
const MY_USER_NAME = '김보미';

function Header({ name, clickFunc, isShow }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header__content">
        <button type="button" className={style['btn-back']} onClick={() => navigate("/list")} />
        <div className={style['header__title']}>{name}</div>
        <div className={style['button-wrapper']}>
          <button type="button" className={style['btn-upload']} onClick={() => clickFunc(!isShow)} />
          <button type="button" className={style['btn-search']} />
        </div>
      </div> 
    </header>
  )
}

function Body({ chat, cancelClickFunc }) {
  /**
   * 메시지를 비교해 배열에 divider와 divider에 들어갈 날짜를 추가해주는 함수
   */
  const messageWithDivider = chat.reduce((prev, cur) => {
    const { sentDateTime: prevSentDateTime } = prev.length > 0 && prev[prev.length - 1]
    const prevDate = new Date(prevSentDateTime);

    if (!cur.sentDateTime) {
      // dateTime 이 없는 경우 최근 날짜를 UTC 로 넣어준다.
      cur.sentDateTime = new Date().toISOString();
    }

    const curDate = new Date(cur.sentDateTime);

    if (!!prevDate && !!curDate) {
      const convertedDiff = Math.round(diff(curDate, prevDate) / (1000 * 3600 * 24));
      
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

    let hideTime = false; // 전송 시간 숨김 여부

    if (index >= 0 && index < messageWithDivider.length - 1) {
      const curDate = new Date(obj.sentDateTime);
      const nextDate = new Date(messageWithDivider[index+1].sentDateTime);
      const diffSeconds = Math.round(diff(nextDate, curDate) / 1000);

      // 한 사람이 1분 동안 메시지를 연속해서 보낸다면, 마지막 메시지만 전송 시간을 표시한다.
      hideTime = diffSeconds <= 60 && obj.userId === messageWithDivider[index+1].userId;
    } 
    
    const time = !hideTime && getDateTime(obj.sentDateTime);

    if (obj.userId !== MY_USER_ID) {
      return <ReceivedMessage key={obj.id} message={obj.message} time={time} />;
    } else {
      return <SentMessage key={obj.id} message={obj.message} time={time} cancelClickFunc={cancelClickFunc}/>;
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
  const [ showImageFileList, setShowImageFileList ] = useState(false);
  const [ canceledSendImage, setCanceledSendImage ] = useState(false);

  useEffect(async () => {
    const { data } = await API.ROOM.GET(roomId);
    setRoom(data);
  }, []);

  const updateRoomInfo = async(newRoom) => {
    // 채팅방 목록에서 일부 필드를 업데이트한다.
    const { chat } = newRoom;
    const { message, sentDateTime } = chat[chat.length - 1];
    const response = await API.CHAT_LIST.PATCH(roomId, {
      recentlySentMessage: /\.png|.jpg$/g.test(message) ? '(사진)' : message,
      unreadMessageCount: 0,
      lastSentDateTime: sentDateTime,
    });

    // 채팅방 정보를 업데이트한다.
    const { status } = await API.ROOM.UPDATE(roomId, newRoom);

    if (status === 200) {
      // state를 변경한다.
      setRoom(newRoom);
    }
  }

  const handleImageClick = async (url) => {
    const newRoom = JSON.parse(JSON.stringify(room)); // 복사본 생성
    const { chat } = newRoom;
    const sentDateTime = new Date().toISOString();
    const newChat = {
      id: chat.length + 1,
      message: url,
      sentDateTime,
      userId: MY_USER_ID,
      userName: MY_USER_NAME,
    };
    
    // 이미지를 클릭할 때 메시지를 새로 생성해 복사본의 chat 배열에 넣어준다.
    chat.push(newChat);

    if (!canceledSendImage) {
      const payload = { ...newRoom, lastSentDateTime: sentDateTime };

      updateRoomInfo(payload);
    }
  }

  const handleImageUploadCancelClick = async (imageUrl) => {
    setCanceledSendImage(true);

    const newRoom = JSON.parse(JSON.stringify(room)); // 복사본 생성
    const { chat } = newRoom;
    const targetMessageIndex = chat.findIndex(o => o.message === imageUrl);
    chat.splice(targetMessageIndex, 1);

    updateRoomInfo(newRoom);
  }

  return (
    <div className={style['chat-room']}>
      <Header name={room.name} clickFunc={(value) => setShowImageFileList(value)} isShow={showImageFileList} />
      {showImageFileList && <ImageFileList clickFunc={handleImageClick} />}
      <Body chat={room.chat} cancelClickFunc={handleImageUploadCancelClick} />
      <Footer />
    </div>
  )
}

export default ChatRoom
