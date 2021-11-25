/**
 * json-server 사용한다.
 * Port 에는 띄울 때 사용한 포트 번호를 넣어준다.
 * ex) json-server --watch {현재 위치에서 db.json 파일 위치} --port {port}
 */
const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;

export default URL = {
  LIST: `${BASE_URL}/list`,
  GET: id => `${BASE_URL}/room/${id}`
}