import { useContext, useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import TopHeader from "../components/common/TopHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { api_GetCategoryById, api_GetCategoryByIdWithChildren } from "../API/ProductCategoryAPI";
import { ProductListContext } from "../context/ProductListContext";
import ListOptions from "../components/list_products/ListOptions";
import Loading from "../components/common/Loading";
import ProductListView from "../components/product/ProductListView";
import CategoriesDropDown from "../components/common/CategoriesDropDown";
import { ChevronRight } from "@mui/icons-material";
import { api_GetProducts } from "../API/ProductAPI";
import ProductGridItem from "../components/product/ProductGridItem";
import ProductListItem from "../components/product/ProductListItem";
import { api_AddProductToUserFavorites, api_GetProductsInUserFavorites, api_RemoveProductFromUserFavorites } from "../API/UserAPI";
import { UserContext } from "../App";

export default function CategoryPage() {
    const {user} = useContext(UserContext)

    const [category, setCategory] = useState(null);
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [searchResults, setSearchResults] = useState([]);
    const [topRatedProducts, setTopProducts] = useState([]);
    const [recentlyAddedProducts, setRecentlyAddedProducts] = useState([])
    const [userFavoritesIds, setUserFavoritesIds] = useState([])

    const [categoryId, setCategoryId] = useState()
    const [sortOption, setSortOption] = useState(2);
    const [startPattern, setStartPattern] = useState('');
    const [listView, setListView] = useState(false)

    useEffect(() => {
        loadCategory(pathname.substring(pathname.lastIndexOf('/')+1));
        console.log(startPattern)
        setSearchResults([])
    }, [pathname])

    useEffect(() => {
        console.log(startPattern)
        if(startPattern != "")
            Search({StartPattern: startPattern, CategoryId: categoryId, SortOption: sortOption});
    }, [startPattern, sortOption, categoryId])

    async function loadCategory(categoryId) {
        await api_GetCategoryByIdWithChildren(categoryId)
        .then((data) => {
            setCategory(data)
            setCategoryId(data.id)
            loadRecentlyAddedProducts(data.id)
            loadTopRatedProducts(data.id)
            console.log(data)
            if(user != null)
                loadUserFavorites()
        })
        .catch(err => console.log(err))
    }

    async function loadRecentlyAddedProducts(catId)
    {
        await api_GetProducts({CategoryId: catId, SortOption: 0, PageSize: 8})
        .then((data) => {
            setRecentlyAddedProducts(data)
        }).catch(err => console.log(err));
    }

    async function loadTopRatedProducts(catId)
    {
        await api_GetProducts({CategoryId: catId, SortOption: 2, PageSize: 8})
        .then((data) => {
            setTopProducts(data)
        }).catch(err => console.log(err));
    }

    async function Search(request)
    {
        setLoading(true)
        console.log(request)
        await api_GetProducts(request)
        .then((data) => {
            console.log(data)
            setSearchResults(data)
        })
        .catch(err => console.log(err));
        setLoading(false)
    }

    async function loadUserFavorites()
    {
        await api_GetProductsInUserFavorites(user.userId)
        .then((data) => {
            const ids = data.map(p => p.productId);
            setUserFavoritesIds(ids)
            console.log(ids)
        })
    }

    async function handleAddToFavorites(productId) {
        await api_AddProductToUserFavorites(user.userId, productId)
        .then((data) => {
            setUserFavoritesIds(current => [...current, productId])
        }).catch(err => console.log(err))
    }

    async function handleRemoveFromFavorites(productId) {
        await api_RemoveProductFromUserFavorites(user.userId, productId)   
        .then((data) => {
            if(userFavoritesIds.indexOf(productId) != -1)
                setUserFavoritesIds(current => current.filter(id => {return id !== productId}))
        }).catch(err => console.log(err))
        
    }

    return (
        <>
        <TopHeader/>
        <Header/>


        <div className="bg-slate-100 pt-8 pb-12">
            <div className='mx-auto max-w-6xl'>
                {category &&
                <>
                <div className="mb-8 flex items-end gap-4">
                    {category.parentParentCategoryName && <>
                    <span 
                        onClick={() => navigate(`/category/${category.parentParentCategoryId}`)}
                        className="text-3xl font-semibold text-gray-500 cursor-pointer hover:text-blue-600">{category.parentParentCategoryName}</span>
                    <ChevronRight fontSize="large"/> </>}
                    {category.parentCategoryName && <>
                    <span 
                        onClick={() => navigate(`/category/${category.parentCategoryId}`)}
                        className="text-3xl font-semibold text-gray-500 cursor-pointer hover:text-blue-600">{category.parentCategoryName}</span>
                    <ChevronRight fontSize="large"/> </>}
                    <span className="text-3xl font-semibold">{category.categoryName}</span>
                </div>

                <ProductListContext.Provider 
                    value={{
                    products:searchResults,
                    categoryId:categoryId, setCategoryId: (categoryId) => {navigate(`/category/${categoryId}`)}, 
                    sortOption:sortOption, setSortOption:setSortOption, 
                    listView:listView, setListView:setListView, 
                    startPattern:startPattern, setStartPattern:setStartPattern, 
                    favoritesPage: false, categoryPage:true}}>

                    <div className="flex gap-4 items-start">
                        <CategoriesDropDown categories={[category]} firstExpanded={true}/>
                        
                        <div className="grow">
                            <ListOptions/>
                            
                            {(startPattern != '') ?
                            (loading ? 
                                <Loading/> :
                                <ProductListView/>
                            )
                            :
                            
                            <div>
                                <div className="mb-8 p-6 bg-white border border-gray-300">
                                    <p className="mb-8 text-2xl font-semibold">Top Rated Products</p>
                                    <div className="flex flex-wrap gap-4 items-start">
                                        {topRatedProducts.map((p, i) => 
                                        <ProductGridItem onClick={() => navigate(`/product/${p.productId}`)}
                                        product={p} key={i} imageWidth={48}
                                        onAddToFavorites={handleAddToFavorites}
                                        onRemoveFromFavorites={handleRemoveFromFavorites}
                                        isFavorite={userFavoritesIds.includes(p.productId)}
                                        />)}
                                    </div>
                                </div>

                                <div className="mb-8 p-6 bg-white border border-gray-300">
                                    <p className="mb-8 text-2xl font-semibold">Recently Added Products</p>
                                    <div className="flex flex-col gap-4">
                                        {topRatedProducts.map((p, i) => 
                                        <ProductListItem onClick={() => navigate(`/product/${p.productId}`)}
                                        product={p} key={i} imageWidth={48}
                                        onAddToFavorites={handleAddToFavorites}
                                        onRemoveFromFavorites={handleRemoveFromFavorites}
                                        isFavorite={userFavoritesIds.includes(p.productId)}
                                        />)}
                                    </div>
                                </div>
                            </div>
                            }
                        
                        </div>
                    </div>
                </ProductListContext.Provider> 
                </>
                }
            </div>
        </div>
        <Footer/>
        </>
    );
}