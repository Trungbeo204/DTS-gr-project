import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ListUser from "./pages/ListUser/ListUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home/Home";

function App() {
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/ListUser"
            element={token ? <ListUser /> : <Navigate to="/Login" />}
            // element={<ListUser/>}
          />
          <Route
            path="/"
            element={token ? <Home /> : <Navigate to="/Login" />}
            // element={<Home/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
