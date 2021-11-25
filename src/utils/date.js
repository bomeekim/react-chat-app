/**
   * 메시지 보낸 시각을 object로 리턴해주는 함수
   * @param {*} dateTime 메시지 보낸 시각
   * @returns hh:mm
   */
 export const getDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const now = new Date();

  // dateTime이 없는 경우 현재 시간으로 대체한다.
  let hour = !dateTime ? now.getHours() : date.getHours();
  let minute = !dateTime ? now.getMinutes() : date.getMinutes();

  hour = hour >= 10 ? hour : `0${hour}`;
  minute = minute >= 10 ? minute : `0${minute}`;

  return { hour, minute };
}

/**
 * 날짜를 파싱해 리턴해주는 함수
 * @param {*} dateTime 파싱하려는 날짜
 * @returns { year, month, date }
 */
export const getDate = (dateTime) => {
  const target = !dateTime ? new Date() : new Date(dateTime);
  const year = target.getFullYear();

  let month = target.getMonth() + 1;
  month = month >= 10 ? month : `0${month}`;
  
  let date = target.getDate();
  date = date >= 10 ? date : `0${date}`;

  return { year, month, date };
}

/**
 * 해당하는 날의 요일을 반환하는 함수
 * @param {*} dateTime 요일을 구하려는 날짜
 * @returns x요일
 */
export const getDayText = (dateTime) => {
  const weekday = [ '일', '월', '화', '수', '목', '금', '토' ];
  const date = !dateTime ? new Date() : new Date(dateTime);
  
  return `${weekday[date.getDay()]}요일`;
}