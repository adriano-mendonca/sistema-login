import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header.jsx";
import Login from "./Components/Login/Login.jsx";
import Home from "./Components/Home.jsx";
import { UserStorage } from "./UserContext.jsx";
import ProtectedRoute from "./Helper/ProtectedRouter.jsx";
import Cadastro from "./Components/Cadastro/Cadastro.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cadastro"
              element={
                <ProtectedRoute>
                  <Cadastro />
                </ProtectedRoute>
              }
            />
            <Route path="/login/*" element={<Login />} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
