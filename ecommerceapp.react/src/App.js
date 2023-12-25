import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from './pages/AdminPage';
import AdminProductCategory from "./components/admin/AdminProductCategory";
import HomePage from "./pages/HomePage";
import React, { useState } from "react";
import ProfilePage from "./pages/ProfilePage";
import SellerDashboardPage from "./pages/SellerDashboardPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/common/Footer";

export const UserContext = React.createContext(null);

function App() {
  const [user, setUser] = useState(null);

  return (
      <BrowserRouter>
        <UserContext.Provider value={{user:user, setUser: setUser}}>
            <Routes>
                <Route path="/" element={<HomePage/>} ></Route>

                <Route path="/admin/category" element={<AdminProductCategory/>} ></Route>

                <Route path="/profile" element={<ProfilePage/>} />
                
                <Route path="/seller/dashboard" element={<SellerDashboardPage/>} />

                <Route path="/product/:productId" element={<ProductPage/>} />
                
                <Route path="/category/:categoryId" element={<CategoryPage/>}/>

                <Route path="/search" element={<SearchPage/>} />

                <Route path="/cart" element={<CartPage/>} />
                <Route path="/favorites" element={<FavoritesPage/>} />

                <Route path="/checkout" element={<CheckoutPage/>}/>
            </Routes>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
