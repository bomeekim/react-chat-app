import React, { useState, useEffect } from 'react'
import ChatListItem from './ChatListItem'
import style from '../css/ChatList.module.css';
import { Link } from 'react-router-dom';
import API from '../api';

function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <button type="button" className={style['btn-menu']} />
        <div className="header__title">채팅</div>
        <button type="button" className={style['btn-account']} />
      </div> 
    </header>
  )
}

function ChatList() {
  const [ list, setList ] = useState();

  useEffect(async () => {
    const { data } = await API.CHAT_LIST.GET();
    setList(data);
  }, []);

  return (
    <div>
      <Header />
      {list && list.map(obj => 
        <Link to={`/room/${obj.roomId}`} key={obj.roomId}>
          <ChatListItem key={obj.roomId} item={obj} />
        </Link>)}
    </div>
  )
}

export default ChatList
