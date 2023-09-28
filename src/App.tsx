import Home from "./containers/home"
import './App.css';
import Register from "./containers/register";
import Login from "./containers/login";
import ForgetPassword from "./containers/forgot-password";
import ResetPassword from "./containers/reset-password";
import ChatsPage from "./containers/chats-page";
import store from "./containers/store/store";
import { Provider } from "react-redux";
import {Routes, BrowserRouter, Route} from "react-router-dom";
// import ChatPreview from "./containers/chat-preview";
import RequireAuth from "./containers/require-auth";
import MailConsent from "./containers/mail-consent";
import {getToken } from "./utils/token";
import useSocket, {app_socket_type} from "./services/socket";
import NewPost from "./containers/new-post";
import CommentPage from "./containers/comment-page";
import PostPreview from "./containers/post-preview";
import AppHead from "./components/app-head";
import Profile from "./containers/profile";

function App() {

  const token = getToken()
  const appSocket: app_socket_type = useSocket(token)
  
  return (
    <BrowserRouter>
      <Provider store={store} >
        <div className="App">
        <Routes>
              <Route path="/" element={<RequireAuth NodeElement={<Home socket={appSocket} />} />} />
              <Route path="/register" element={<Register />}/>
              <Route path="/login" element={<Login/>} />
              <Route path="/consent" element={<MailConsent/>} />
              <Route path="/chats" element={<RequireAuth NodeElement={<ChatsPage socket={appSocket} />} />} />
              <Route path="/forget-password" element={<ForgetPassword/>} />
              <Route path="/forget-password/:token" element={<ResetPassword/>} />
              <Route path="/new" element={<RequireAuth NodeElement={<div><AppHead/><NewPost socket={appSocket} /></div>} />} />
              <Route path="/posts/:postId/comment" element={<RequireAuth NodeElement={<CommentPage socket={appSocket} />} />} />
              <Route path="/posts/:postId" element={<RequireAuth NodeElement={<PostPreview socket={appSocket} />} />} />
              <Route path="/profile" element={<RequireAuth NodeElement={<Profile editable />} />} />
              <Route path="/users/:userId" element={<RequireAuth NodeElement={<div className="user-preview" ><Profile /></div>} />} />
              <Route path="*" element={<div><AppHead/><h1 style={{fontFamily:"fantasy", fontSize:"18px",margin:"30px 4px"}} >page not found</h1></div>} />
              
        </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
