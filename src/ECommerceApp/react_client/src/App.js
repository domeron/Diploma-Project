import React, {useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Account from './pages/Account';
import SellerDashboard from './pages/SellerDashboard';
import SearchPage from './pages/SearchPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import './index.css';
import Forget_Password from './pages/Forget_Password';

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
            <Route path="/Forget-Password" element={<Forget_Password/>} />
            <Route path="/Search" element={<SearchPage />} />
            <Route path="/Product/:productId" element={<ProductPage />} />
            <Route path="/Cart" element={<CartPage />} />
            {user && (<Route path="/Account" element={<Account />} />)}
            {user && user.userRole === 'Seller' && (<Route path="/Seller/Dashboard" element={<SellerDashboard />}/>)}
            
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
