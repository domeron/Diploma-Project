import { useContext,useState, useRef, useEffect } from "react";
import { ChevronDownIcon, ArrowRightOnRectangleIcon, ChevronRightIcon} from "@heroicons/react/24/solid"
import { UserContext } from "../App";
import logoIcon from "../assets/shopify.svg"
import { api_GetAllCategoriesWithChildren } from "../api/category_api";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "styled-icons/entypo";

export default function Header() {
    const inputSearchRef = useRef(null);
    const [viewCategories, setViewCategories] = useState(false);

    function handleSearch(e) {
        e.preventDefault();
        console.log(inputSearchRef.current.value)
    }
    return (
        <div className="border-b  shadow-sm">
            <div className="py-4 max-w-6xl mx-auto flex gap-32 bg-white">

                <div className="flex items-center gap-8">
                    <div className="h-10">
                        <img className="h-full" src={logoIcon} alt="logo"/>
                    </div>
                    <div onClick={() => setViewCategories(true)}
                    className="flex items-center cursor-pointer w-20 text-sm hover:text-blue-500">
                        <span>Shop by category</span>
                        <ChevronDownIcon className="w-8"/>
                    </div>
                </div>

                    <form className='flex grow border-2 border-blue-500 rounded-md bg-white' onSubmit={handleSearch}>
                        <input className="grow py-1 px-2 w-96 rounded-l-md outline-none border-r border-blue-500"
                        ref={inputSearchRef} type='text' placeholder="Search"/>

                        <div className="px-4 py-1 flex items-center gap-2 text-sm">
                            <p>All Category</p>
                            <ChevronDownIcon className="w-4"/>
                        </div>
                        <button type="submit" className="px-4 text-white bg-blue-500">
                            Search</button>
                    </form>
                

            </div>
            {viewCategories &&
                <CategoriesView setViewCategories={setViewCategories}/>
            }
        </div>
    );
}

function CategoriesView({setViewCategories}) {
    const [categories, setCategories] = useState([]);
    const [focusedCategory, setFocusedCategory] = useState();
    const [focusedSubCategory, setFocusedSubCategory] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        api_GetAllCategoriesWithChildren()
        .then(setCategories)
        .catch(err => console.log(err));
    }, []);

    function selectCategory(categoryId) {
        navigate(`/Category/${categoryId}`);
        setViewCategories(false)
    }

    return (
        // onMouseLeave={() => setViewCategories(false)}
        <div 
        className="flex absolute top-0 bottom-0 right-0 left-0">
            <div className="w-64 flex flex-col border-r-2 bg-white">
            {categories.map((cat, index) => {
                return (
                    <div
                    onClick={() => selectCategory(cat.id)}
                    onMouseEnter={() => setFocusedCategory(cat)}
                    key={index} className={`py-3 pl-4 pr-2 flex justify-between items-center cursor-pointer
                    ${focusedCategory && focusedCategory.id === cat.id && 'bg-gray-200'}`}>
                        <p>{cat.categoryName}</p>
                        <ChevronRightIcon className="w-5"/>
                    </div>
                );
            })}
            </div>
            {focusedCategory &&
            <div className="w-64 flex flex-col border-r-2 bg-white">
                {focusedCategory.childCategories.map((cat, index) => {
                    return (
                        <div
                        onClick={() => selectCategory(cat.id)}
                        onMouseEnter={() => setFocusedSubCategory(cat)}
                        key={index} className="py-3 pl-4 pr-2 flex justify-between items-center hover:bg-gray-100 cursor-pointer">
                            <p>{cat.categoryName}</p>
                            {cat.childCategories.length > 0 && 
                            <ChevronRightIcon className="w-5"/>
                            }
                        </div>
                    );
                })}
            </div>
            }

            {focusedSubCategory && focusedSubCategory.childCategories.length > 0 && 
            <div className="w-64 flex flex-col border-r-2 bg-white">
                {focusedSubCategory.childCategories.map((cat, index) => {
                    return (
                        <div
                        onClick={() => selectCategory(cat.id)}
                        key={index} className="py-3 pl-4 pr-2 flex justify-between items-center hover:bg-gray-100 cursor-pointer">
                            <p>{cat.categoryName}</p>
                        </div>
                    );
                })}
            </div>
            }
            <div onClick={() => setViewCategories(false)}
            className="grow bg-[rgb(60,60,60,0.4)]">a</div>
            {/* {focusedCategory &&
            <div className="py-4 px-6 grow flex flex-wrap items-start">
                {focusedCategory.childCategories.map((sub, index) => {
                    return (
                        <div key={index} className="flex flex-col gap-2 w-1/4 border cursor-pointer">
                            <p 
                            onClick={() => selectCategory(sub.id)}
                            className="font-semibold hover:text-blue-500"
                            >{sub.categoryName}</p>
                            {sub.childCategories.map((subsub, ind) => {
                                return (
                                    <p key={ind} 
                                    onClick={() => selectCategory(subsub.id)}
                                    className="hover:text-blue-500 cursor-pointer"
                                    >{subsub.categoryName}</p>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            } */}
        </div>
    );
}