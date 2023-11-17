// src/main/frontend/src/App.js
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Card from "./components/Card";
import Home from "./Home";
import { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberInfo from "./pages/MemberInfo";

import React from "react";
import Logout from "./pages/Logout";

export const memberData = createContext();
function App() {
  const [memberName, setMemberName] = useState(null);
  const [memberEmail, setMemberEmail] = useState(null);
  const [memberPassword, setMemberPassword] = useState(null);
  const [memberRole, setMemberRole] = useState(null);
  return (
    <div>
      <memberData.Provider
        value={{
          setMemberName,
          setMemberEmail,
          setMemberPassword,
          setMemberRole,
          memberName,
          memberEmail,
          memberPassword,
          memberRole,
        }}
      >
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Card />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/memberinfo" element={<MemberInfo />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </memberData.Provider>
    </div>
  );
}

export default App;
