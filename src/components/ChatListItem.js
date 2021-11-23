import React from 'react'
import style from '../css/ChatListItem.module.css';

function ChatListItem() {
  return (
    <div className={style['list-item']}>
      <div className={style['list-item__avartar']}>
        <div className={style['image']}>
          <img src="https://pbs.twimg.com/media/DBsYbe8WAAUz0Yx.jpg"/>
        </div>
      </div>
      <div className={style['list-item__content']}>
        <div className={style['list-item__title']}>
          보낸 사람 이름
        </div>
        <div className={style['list-item__subtitle']}>
          최근 전송한 메시지
        </div>
      </div>
      <div className={style['list-item__action']}>
        <div className={style['lite-item__action-text']}>
          보낸 시각
        </div>
        <div className={style['list-item__action-icon']}>
          <div className={style['circle']}>
            1
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatListItem
