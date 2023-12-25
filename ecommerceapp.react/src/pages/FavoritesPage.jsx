import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import TopHeader from "../components/common/TopHeader";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import { api_GetProductsInUserFavorites } from "../API/UserAPI";
import { ProductListContext } from "../context/ProductListContext";
import CategoriesDropDown from "../components/common/CategoriesDropDown";
import ListOptions from "../components/list_products/ListOptions";
import ProductListView from "../components/product/ProductListView";
import Loading from "../components/common/Loading";
import { Favorite, FavoriteBorder, ShoppingBasket } from "@mui/icons-material";

export default function FavoritesPage() {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [categoryId, setCategoryId] = useState(0);
    const [sortOption, setSortOption] = useState(2);
    const [startPattern, setStartPattern] = useState('');
    const [listView, setListView] = useState(false)

    useEffect(() => {
        if(user != null)
            loadFavorites()
    }, [user])

    async function loadFavorites() {
        setLoading(true)
        await api_GetProductsInUserFavorites(user.userId)
        .then((data) => {
            setProducts(data)
            console.log(data)
        })
        .catch(err => console.log(err))
        setLoading(false)
    }

    return (
        <>
        <TopHeader/>
        <Header/>
        <div className='bg-slate-100'>
            <div className='pt-4 pb-32 mx-auto max-w-6xl'>
                {user ?
                <div>
                    <div className='mb-2 mx-auto max-w-6xl '>
                        <BackButton onBack={() => navigate(-1)}/>
                    </div>
                    <div className="mt-4 mb-8 flex gap-4 items-center">
                        <p className="font-semibold text-3xl">Favorites</p>
                        <Favorite className="text-blue-600" fontSize="large"/>
                    </div>

                    {products.length > 0 ?
                    <ProductListContext.Provider value={{
                        products: products, setProducts: setProducts,
                        categoryId:categoryId, setCategoryId: setCategoryId, sortOption:sortOption, setSortOption:setSortOption, 
                        listView:listView, setListView:setListView, startPattern:startPattern, setStartPattern:setStartPattern, favoritesPage:true}}>
                        <div className="flex gap-4 items-start">

                            <div className="grow">
                                <ListOptions/>
                                
                                {loading ? 
                                <Loading/> :
                                <ProductListView/>
                                }
                            </div>
                            
                            
                        </div>
                    </ProductListContext.Provider>
                    :

                    <div>
                        <p className="text-xl">You don't have favorite products.</p>
                    </div>}
                </div>
                :
                <p>Sign In</p>
                }
                
            </div>
        </div>
        <Footer/>
        </>
    );
}