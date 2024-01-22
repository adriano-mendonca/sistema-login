import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import Login from "./Components/Login/Login.jsx";
import Home from "./Components/Home.jsx";
import { UserStorage } from "./UserContext.jsx";
import ProtectedRoute from "./Helper/ProtectedRouter.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
            <Route path="login/*" element={<Login />} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
