import React, { useState, useEffect } from 'react'
import ChatListItem from './ChatListItem'
import style from '../css/ChatList.module.css';
import menuIcon from '../assets/icons/rectangle_2.png';
import accountIcon from '../assets/icons/rectangle.png';
import URL from '../api/url';
import axios from 'axios';

function Header() {
  return (
    <header className={style.header}>
      <div className={style.header__content}>
        <button type="button">
          <img src={menuIcon} />
        </button>
        <div className={style.header__title}>채팅</div>
        <button type="button">
          <img src={accountIcon} />
        </button>
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
