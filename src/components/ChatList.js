import React, { useState, useEffect } from 'react'
import ChatListItem from './ChatListItem'
import URL from '../api/url';
import axios from 'axios';
import style from '../css/ChatList.module.css';

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
    const { data } = await axios.get(URL.LIST);
    setList(data);
  }, []);

  return (
    <div>
      <Header />
      {list && list.map(obj => <ChatListItem key={obj.roomId} item={obj} />)}
    </div>
  )
}

export default ChatList
