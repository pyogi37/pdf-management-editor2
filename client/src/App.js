import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import Homepage from "./pages/Homepage";
import { UserState } from "./Context/UserProvider";

function App() {
  const { user } = UserState();
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={AuthPage}></Route>
        <Route path="/home" Component={Homepage}></Route>
      </Routes>
    </div>
  );
}

export default App;
