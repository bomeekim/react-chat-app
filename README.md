## 실행 방법
### 프로젝트 빌드 및 실행
1. 아래 명령어를 입력해 프로젝트를 설치한다.
```
$npm install
```
2. 해당 프로젝트에서 API 역할을 해 줄 JSON Server를 띄운다.

```
$json-server --watch ./src/db/db.json --port 3001
```
3. 아래 명령어를 입력해 앱을 실행한다.
```
$npm start
```
## 소요 기간
**총 3일 (2021-11-23 ~ 2021-11-26)**
- 1일 리액트 함수형 컴포넌트 기반으로 개발할 때 필요한 것들 공부
- 2,3일 개발 진행

## 구현 내용
- iOS 및 Android 브라우저에서 볼 수 있도록 flexbox 를 이용해 구현
- 라우팅 구현
    - `localhost:3000` 진입 시 `localhost:3000/list` 로 리다이렉트
    - 채팅 목록에서 특정 채팅방을 클릭하면 `localhost:3000/room/:room_id` 로 이동
- 프로젝트에서 사용하는 채팅방 썸네일 및 전송용 이미지는 `public/images` 폴더 아래에 넣고, 절대 경로로 이미지를 로드해오록 함
- `components` 폴더 아래에 `ChatList`, `ChatRoom` 폴더를 만들어 관련된 컴포넌트 및 CSS를 한 곳에서 볼 수 있도록 함
### 채팅 목록
1. 시간표현
    - 일주일이 지난 메시지인 경우 `mm월 dd일`로 표시
    - 일주일 ~ 하루 전 메시지인 경우 `x요일`로 표시
    - 오늘 온 메시지인 경우 `hh:mm` 시간으로 표시
2. 메시지 관련
    - 읽지 않은 메시지가 있는 채팅방을 눌렀다 다시 채팅 목록으로 돌아온 경우 메시지 카운트 0으로 변경 및 db.json에 저장
    - 마지막 메시지가 사진인 경우 `(사진)` 으로 표시
    - 표시되는 너비에 비해 메시지가 긴 경우 ellipsis 적용

### 채팅방
1. 주고 받은 메시지가 많은 경우
    - 채팅방 메시지 영역 `overflow-y: auto` 적용
    - 가장 마지막 메시지로 스크롤 이동
2. 시간 표현
    -  `hh:mm` 포맷 적용
    -  한 사람이 1분 동안 메시지를 연속해서 보내는 경우 마지막 메시지만 전송 시간 표시
    -  1분 동안 메시지를 연속으로 보낸 경우 화자가 달라지면 각각 메시지 전송 시간을 표시
    -  날짜 바뀌는 경우 날짜 구분선과 함께 `yyyy년 mm월 dd일` 로 표시
3. 사진 전송 기능
    - 상단 이미지 아이콘을 누르면 파일 리스트 표시
    - 파일 리스트에 있는 이미지를 누르면 채팅방에 이미지가 보여진다.
        - 이미지 경로가 새로운 메시지로 추가되고, DB 업데이트 후 새로 채팅방 정보를 조회한다.
    - 이미지 업로드 시 Progress bar를 통해 진행 상태를 알 수 있다.
    - 이미지 업로드 시 취소 버튼을 누른 경우 업로드가 취소된다.
4. 채팅 목록으로 가기
    - < 버튼 클릭 시 `useNavigate` 를 이용해 채팅 목록으로 이동

## 스크린샷
|채팅 목록|사진 업로드|메시지 전송|
|:-:|:-:|:-:|
|<img src="https://user-images.githubusercontent.com/11264094/143612617-3dedee3a-8c7d-41f5-a94b-97b01495b537.png" width="300" />|<img src="https://user-images.githubusercontent.com/11264094/143612697-0708f2ee-7e80-471c-9fba-28cfc352337f.png" width="300" />|<img src="https://user-images.githubusercontent.com/11264094/143612771-d0a72431-94ab-4957-b537-55fcaea41907.png" width="300" />|
