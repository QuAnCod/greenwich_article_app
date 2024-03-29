// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import HomeTemplate from "./Templates/HomeTemplate/HomeTemplate";
import Guest from "./Pages/Guest/Guest";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import MarketingCoordinator from "./Pages/MarketingCordinator/MarketingCoordinator";
import MarketingManager from "./Pages/MarketingManager/MarketingManager";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import AcceptArticle from "./Components/AcceptArticle/AcceptArticle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="*">"404 Not Found"</Route>
        <Route path="/register" element={<Register />} />
        <Route element={<HomeTemplate />}>
          <Route path="/students/:id" element={<Home />}></Route>
          <Route path="/guest" element={<Guest />}></Route>
        </Route>
        <Route path="admin" element={<AdminDashboard />}></Route>
        <Route path="coordinator" element={<MarketingCoordinator />} />
        <Route path="manager" element={<MarketingManager />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="accept-article" element={<MarketingCoordinator />}></Route>
        <Route path="accept-article/:id" element={<AcceptArticle />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
