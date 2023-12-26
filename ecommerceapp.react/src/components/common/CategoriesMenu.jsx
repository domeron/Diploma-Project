import { useEffect, useState } from "react";
import { api_GetAllCategoriesWithChildren } from "../../API/ProductCategoryAPI";
import { useNavigate } from "react-router-dom";
import { Menu } from "@mui/icons-material";

export default function CategoriesMenu({isShowing}) {
    const [showMenu, setShowMenu] = useState(false);
    const [categories, setCategories] = useState([])
    const [focusedTopCategory, setFocusedTopCategory] = useState(null)
    const [focusedSubCategory, setFocusedSubCategory] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        loadCategories()
    }, [])

    async function loadCategories() {
        await api_GetAllCategoriesWithChildren()
        .then((data) => {
            setCategories(data)
            console.log(data)
        })
        .catch(err => console.log(err))
    }

    function handleClick(category) {
        navigate(`/category/${category.id}`, {state:{categoryId:category.id}})
    }

    return (
        <div onMouseLeave={() => {
            setShowMenu(false)
            setFocusedTopCategory(null)
            setFocusedSubCategory(null)
        }}
        className="relative hover:bg-indigo-800 cursor-pointer">
            <div onMouseOver={() => {if(!showMenu) setShowMenu(true)}}
            className="py-2 px-2 flex gap-2 items-center">
                <Menu/>
                <p className="">All Category</p>
            </div>

            <div className={`flex absolute z-50 top-full left-0 bg-white text-black border border-gray-500 shadow-lg
            ${showMenu ? '' : 'hidden'}`}>
                <ul className={`flex flex-col border-gray-300
                    ${focusedTopCategory && 'border-r'}`}>
                    {categories.map((cat, ind) => {
                        return (
                            <li key={ind} 
                            onClick={() => handleClick(cat)}
                            onMouseEnter={() => {
                                setFocusedTopCategory(cat)
                                setFocusedSubCategory(null)
                            }}
                            className={`p-3 min-w-[12rem] text-base hover:bg-gray-200 border-b border-b-gray-300 last:border-b-0
                            ${focusedTopCategory && (focusedTopCategory.id === cat.id && 'bg-gray-200')}`}>   
                                {cat.categoryName}
                            </li>
                        );
                    })}
                
                </ul>
                {focusedTopCategory && focusedTopCategory.childCategories.length > 0 &&
                    <ul className={`flex flex-col  border-gray-300
                    ${focusedSubCategory && 'border-r'}`}>
                        {focusedTopCategory.childCategories.map((sub, ind) => {
                            return (
                                <li key={ind} 
                                onClick={() => handleClick(sub)}
                                onMouseOver={() => setFocusedSubCategory(sub)}
                                className={`p-3 min-w-[12rem] text-base hover:bg-gray-200 border-b border-b-gray-300 last:border-b-0
                                ${focusedSubCategory && (focusedSubCategory.id === sub.id && 'bg-gray-200')}`}>
                                    {sub.categoryName}
                                </li>
                            );
                        })}
                    </ul>
                }

                {focusedTopCategory && focusedSubCategory && focusedTopCategory.childCategories.length > 0 && focusedSubCategory.childCategories.length > 0 &&
                    <ul className="flex flex-col">
                        {focusedSubCategory.childCategories.map((subsub, ind) => {
                            return (
                                <li onClick={() => handleClick(subsub)}
                                key={ind}
                                className="p-3 min-w-[12rem] text-base hover:bg-gray-200 border-b border-b-gray-300 last:border-b-0">   
                                    {subsub.categoryName}
                                </li>
                            );
                        })}
                    </ul>
                }
            </div>
        </div>
    );
}
