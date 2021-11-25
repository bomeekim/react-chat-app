import React from 'react'
import style from '../css/ChatListItem.module.css';
import { getDateTime, getDate, getDayText } from '../utils/date';

const WEEKDAY_NUM = 7;

function ChatListItem({ item }) {
  const { 
    imageUrl,
    lastSentDateTime, 
    recentlySentMessage, 
    name, 
    unreadMessageCount 
  } = item;

  /** 
   * UTC 를 locale 에 맞는 시간으로 변경해주는 함수
   * @param dateTime 메시지를 보낸 시간
   */
  const convertedDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const now = new Date();

    /**
     * dateTime이 없는 경우 현재 시간으로 대체한다.
     * [참고] hh:mm 형태를 나타내기 위해 roomId 1,2 에 해당하는 데이터의 lastSentDateTime 에 "" 을 넣어둠
     */
    if (!dateTime) {
      const { hour, minute } = getDateTime();
      return `${hour}:${minute}`;
    } else {
      const isOverWeek = now.getDate() - date.getDate() >= WEEKDAY_NUM;
      const { month, date: convertedDate } = getDate(dateTime);

      return isOverWeek ? `${month}월 ${convertedDate}일` : getDayText(dateTime);
    }
  }

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
          {name}
        </div>
        <div className={style['list-item__subtitle']}>
          {recentlySentMessage}
        </div>
      </div>
      <div className={style['list-item__action']}>
        <div className={style['lite-item__action-text']}>
          {convertedDateTime(lastSentDateTime)}
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
