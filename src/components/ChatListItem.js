import React, { useState, useEffect } from 'react'
import style from '../css/ChatListItem.module.css';

function ChatListItem({ item }) {
  console.log(item);
  const { 
    imageUrl,
    lastSentDateTime, 
    recentlySentMessage, 
    senderName, 
    unreadMessageCount 
  } = item;

  return (
    <div className={style['list-item']}>
      <div className={style['list-item__avartar']}>
        <div className={style['image']}>
          {/* TODO: 이미지 처리 */}
          <img src="https://pbs.twimg.com/media/DBsYbe8WAAUz0Yx.jpg" />
        </div>
      </div>
      <div className={style['list-item__content']}>
        <div className={style['list-item__title']}>
          {senderName}
        </div>
        <div className={style['list-item__subtitle']}>
          {recentlySentMessage}
        </div>
      </div>
      <div className={style['list-item__action']}>
        <div className={style['lite-item__action-text']}>
          {/* TODO UTC -> Local Time */}
          {lastSentDateTime}
        </div>

        {/* 안읽은 메시지 수가 있는 경우에만 보여준다. */}
        { unreadMessageCount > 0 && 
          <div className={style['list-item__action-icon']}>
            <div className={style['circle']}>
              {unreadMessageCount}
            </div>
          </div>
          }
      </div>
    </div>
  )
}

export default ChatListItem
