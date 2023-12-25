import { useLocation } from "react-router-dom";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import TopHeader from "../components/common/TopHeader";
import CategoriesDropDown from "../components/common/CategoriesDropDown";
import { api_GetProducts } from "../API/ProductAPI";
import ProductListView from "../components/product/ProductListView";
import Loading from "../components/common/Loading";
import { useContext, useEffect, useState } from "react";
import { ProductListContext } from "../context/ProductListContext";
import ListOptions from "../components/list_products/ListOptions";
import { api_GetAllCategoriesWithChildren } from "../API/ProductCategoryAPI";

export default function SearchPage() {
    const [categories, setCategories] = useState([]);
    const [searchResults, setSearchResults] = useState([])
    const location = useLocation()
    const [loading, setLoading] = useState(true)

    const [categoryId, setCategoryId] = useState(0);
    const [sortOption, setSortOption] = useState(2);
    const [startPattern, setStartPattern] = useState();
    const [listView, setListView] = useState(true)

    useEffect(() => {
        console.log('useEff location')
        setStartPattern(location.state.searchInput)
        loadCategories()
    }, [location.state])

    useEffect(() => {
        //console.log(location.state)
        console.log(startPattern)
        if(startPattern != "")
            Search({StartPattern: startPattern, CategoryId: categoryId, SortOption: sortOption});
    }, [startPattern, categoryId, sortOption])

    async function loadCategories()
    {
        await api_GetAllCategoriesWithChildren()
        .then((dataResponse) => {
            setCategories(dataResponse)
            console.log(dataResponse)
        })
        .catch(err => console.log(err));
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

    return (
        <>
        <TopHeader/>
        <Header/>


        <div className="bg-slate-100 pt-8 pb-12">
            <div className='mx-auto max-w-6xl'>
                <div className="flex justify-between items-center">
                    <h1 className="mb-8 text-3xl">Search for '{location.state.searchInput}'</h1>
                    <p className="text-xl">{searchResults.length} results</p>
                </div>

                <ProductListContext.Provider value={
                    {
                    products: searchResults,
                    categoryId:categoryId, setCategoryId: setCategoryId, 
                    sortOption:sortOption, setSortOption:setSortOption, 
                    listView:listView, setListView:setListView, 
                    startPattern:startPattern, setStartPattern:setStartPattern, 
                    favoritesPage: false}}>
                    <div className="flex gap-4 items-start">
                        <CategoriesDropDown categories={categories}/>

                        <div className="grow">
                            <ListOptions/>
                            
                            {loading ? 
                            <Loading/> :
                            <ProductListView/>
                            }
                        </div>
                    </div>
                </ProductListContext.Provider>
            </div>
        </div>
        <Footer/>
        </>
    );
}