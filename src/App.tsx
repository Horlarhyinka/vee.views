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
import ChatPreview from "./containers/chat-preview";
import RequireAuth from "./containers/require-auth";
import MailConsent from "./containers/mail-consent";
import {getToken } from "./utils/token";
import useSocket, {app_socket_type} from "./services/socket";
import NewPost from "./containers/new-post";
import CommentPage from "./containers/comment-page";
import PostPreview from "./containers/post-preview";

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
              <Route path="/chats/:id" element={<RequireAuth NodeElement={<ChatPreview socket={appSocket} />} />} />
              <Route path="/forget-password" element={<ForgetPassword/>} />
              <Route path="/forget-password/:token" element={<ResetPassword/>} />
              <Route path="/new" element={<RequireAuth NodeElement={<NewPost socket={appSocket} />} />} />
              <Route path="/posts/:postId/comment" element={<RequireAuth NodeElement={<CommentPage socket={appSocket} />} />} />
              <Route path="/posts/:postId" element={<RequireAuth NodeElement={<PostPreview socket={appSocket} />} />} />

        </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
