import axios from 'axios';

/**
 * json-server 사용한다.
 * Port 에는 띄울 때 사용한 포트 번호를 넣어준다.
 * ex) json-server --watch {현재 위치에서 db.json 파일 위치} --port {port}
 */
 const PORT = 3001;
 const BASE_URL = `http://localhost:${PORT}`;

const API = {
  CHAT_LIST: {
    GET: () => axios.get(`${BASE_URL}/list`),
    DETAIL: (id) => axios.get(`${BASE_URL}/list/${id}`),
    PATCH: (id, payload) => axios.patch(`${BASE_URL}/list/${id}`, payload),
  },
  IMAGE_LIST: {
    GET: () => axios.get(`${BASE_URL}/images`),  
  },
  ROOM: {
    GET: id => axios.get(`${BASE_URL}/room/${id}`),
    UPDATE: (id, payload) => axios.put(`${BASE_URL}/room/${id}`, payload)
  }
};

export default API;