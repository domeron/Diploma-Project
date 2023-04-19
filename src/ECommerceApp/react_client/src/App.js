import React, {useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import SellerDashboard from './pages/SellerDashboard';

export const UserContext = React.createContext(null);

function App() {
  const [user, setUser] = useState(null);

  return (
      <BrowserRouter>
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
            <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Profile" element={<ProfilePage />} />
                  <Route path="/SellerDashboard" element={<SellerDashboard />} />
                  <Route path="/Category/:categoryId" element={<CategoryPage/>} />
                  <Route path="/Product/:productId" element={<ProductPage/>}/>
                  <Route path="/Cart" element={<CartPage/>}/>
                  <Route path="/Checkout" element={<CheckoutPage/>}/>
            </Routes>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
