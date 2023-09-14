import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ListUser from "./pages/ListUser/ListUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home/Home";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/ListUser"
            // element={user ? <ListUser /> : <Navigate to="/Login" />}
            element = {<ListUser/>}
          />
          <Route path="/" element={user ? <Home /> : <Navigate to="/Login" />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
