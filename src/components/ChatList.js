import React from 'react'
import ChatListItem from './ChatListItem'
import style from '../css/ChatList.module.css';
import menuIcon from '../assets/icons/rectangle_2.png';
import accountIcon from '../assets/icons/rectangle.png';

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
  return (
    <div>
      {/* <header className={styles.header} /> */}
      <Header />
      <ChatListItem />
    </div>
  )
}

export default ChatList
