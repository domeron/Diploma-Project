import React, {useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Account from './pages/Account';
import SellerDashboard from './pages/SellerDashboard';
import './index.css';

export const UserContext = React.createContext(null);

function App() {
  const [user, setUser] = useState(null);

  return (
      <BrowserRouter>
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
          <Routes>  
            <Route path="/" element={<Home />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            {user && (<Route path="/Account" element={<Account />} />)}
            {user && user.userRole === 'Seller' && (<Route path="/Seller/Dashboard" element={<SellerDashboard />}/>)}
            
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
