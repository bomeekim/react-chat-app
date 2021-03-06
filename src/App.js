import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import ChatList from './components/ChatList/ChatList';
import ChatRoom from './components/ChatRoom/ChatRoom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/list" />} />
        <Route path="/list" element={<ChatList />} />
        <Route path="/room/:room_id" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
