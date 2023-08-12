import Home from "./containers/home"
import './App.css';
import Register from "./containers/register";
import Chat from "./containers/chat";
import Login from "./containers/login";
import ForgetPassword from "./containers/forgot-password";
import ResetPassword from "./containers/reset-password";
import ChatsPage from "./containers/chats-page";
import AppHead from "./components/app-head";

function App() {
  return (
    <div className="App">
      <AppHead title={"home"} />
      {/* <Home /> */}
      {/* <Register /> */}
      {/* <Chat /> */}
      <ChatsPage />
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <ForgetPassword /> */}
      {/* <ResetPassword /> */}
    </div>
  );
}

export default App;
