import logo from './logo.svg';
import './App.css';
import React, {useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

export const UserContext = React.createContext(null);

function App() {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <Routes>  
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
