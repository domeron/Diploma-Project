import React, {useRef, useState, useEffect } from "react";
import logoIcon from "../assets/shopify.svg"

import { api_GetAllCategoriesWithChildren } from "../api/category_api";
import CategoriesDropdownMenu from "./elements/CategoriesDropdownMenu";
import { useNavigate } from "react-router-dom";


export default function Header() {
    const navigate = useNavigate()

    return (
        <div className="z-50 border-b border-slate-400 bg-white shadow-sm">
            <div className="pt-4 pb-6 max-w-6xl mx-auto flex gap-32 bg-white">

                <div className="flex items-center gap-8">
                    <div onClick={() => navigate('/')}
                    className="h-10 cursor-pointer">
                        <img className="h-full" src={logoIcon} alt="logo"/>
                    </div>
                    {/* <div
                    className="flex items-center cursor-pointer w-20 text-sm hover:text-blue-500">
                        <span>Shop by category</span>
                        <KeyboardArrowDownIcon className="w-8"/>
                    </div> */}
                </div>

                <SearchInput/>
                

            </div>
        </div>
    );
}

export const SearchContext = React.createContext(null);

function SearchInput() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const inputSearchRef = useRef(null);

    useEffect(() => {
        api_GetAllCategoriesWithChildren()
        .then(setCategories)
        .catch(err => console.log(err));
    }, []);

    function handleSearch(e) {
        e.preventDefault();
        console.log(inputSearchRef.current.value)
    }

    return (
        <SearchContext.Provider value={{ searchRef: inputSearchRef, category: category, setCategory: setCategory }}>
            <form className='group/search flex grow border border-blue-500 rounded-sm bg-white ' 
            onSubmit={handleSearch}>
                <input className="grow py-1 px-2 w-96 rounded-l-md outline-none border-r border-blue-500 "
                ref={inputSearchRef} type='text' placeholder="Search"/>

                <CategoriesDropdownMenu categories={categories}/>
                <button type="submit" 
                className="px-4 text-white bg-blue-500 hover:bg-blue-700">
                    Search</button>
            </form>
        </SearchContext.Provider>
    );
}