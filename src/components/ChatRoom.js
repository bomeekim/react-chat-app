import React from 'react'
import SentMessage from './SentMessage';
import style from '../css/ChatRoom.module.css';
import ReceivedMessage from './ReceivedMessage';
import InputMessage from './InputMessage';
import Divider from './Divider';

function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <button type="button" className={style['btn-back']} />
        <div className={style['header__title']}>장만월 사장님</div>
        <div className={style['button-wrapper']}>
          <button type="button" className={style['btn-upload']} />
          <button type="button" className={style['btn-search']} />
        </div>
      </div> 
    </header>
  )
}

function Body() {
  return (
    <div className={style['chat-room__contents']}>
      <ReceivedMessage message="출근했니?" time="02:34"/>
      <ReceivedMessage message="출근했냐구?" time="02:35"/>
      <Divider text="2020년 5월 7일" />
      <ReceivedMessage message="어딘데 출근안하니?" time="02:36"/>
      <SentMessage message="해외 출장중입니다." time="02:37" />
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
  return (
    <div className={style['chat-room']}>
      <Header />
      <Body />
      <Footer />
    </div>
  )
}

export default ChatRoom
