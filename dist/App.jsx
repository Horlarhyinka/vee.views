import './App.css';
import ChatsPage from "./containers/chats-page";
import AppHead from "./components/app-head";
function App() {
    return (<div className="App">
      <AppHead title={"home"}/>
      {/* <Home /> */}
      {/* <Register /> */}
      {/* <Chat /> */}
      <ChatsPage />
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <ForgetPassword /> */}
      {/* <ResetPassword /> */}
    </div>);
}
export default App;
