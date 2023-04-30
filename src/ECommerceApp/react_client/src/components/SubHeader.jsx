
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ProfileImage from "./elements/ProfileImage";

import { api_GetAllCategoriesWithChildren } from "../api/category_api";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProfileDropdownMenu from "./elements/ProfileDropdownMenu";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';

export default function SubHeader() {
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate();
    const [signInView, setSignInView] = useState(false);
    const [signUpView, setSignUpView] = useState(false);
    const [viewCategories, setViewCategories] = useState(false);

    const [viewUserDropDown, setViewUserDropDown] = useState(false);

    return (
        <div className="border-b bg-indigo-900">
            <div className="max-w-6xl mx-auto flex justify-between text-sm">
                <div className="flex gap-4 text-white">
                    <div onClick={() => setViewCategories(true)}
                    className="py-1 px-2 group flex gap-1 items-center hover:bg-indigo-800 cursor-pointer">
                        <MenuIcon className="w-6"/>
                        <p className="">All Category</p>
                    </div>
                    <div className="py-1 px-2 flex items-center gap-2 cursor-pointer hover:bg-indigo-800">
                        <p>Help</p>
                        <ExpandMoreIcon className="w-4"/>
                    </div>
                </div>

                <div className="flex text-white">
                    <div className="py-1 px-2 flex items-center gap-2 cursor-pointer hover:bg-indigo-800">
                        <p>English, USD</p>
                        <ExpandMoreIcon className="w-4"/>
                    </div>
                    <div onClick={() => navigate('/Cart')}
                    className="flex py-1 px-2 items-center gap-1 hover:bg-indigo-800 cursor-pointer ">
                        <p>Cart</p>
                        <ShoppingCartIcon className="scale-75"/>
                    </div>

                    {user ?
                    <div className="py-1 px-2 flex items-center gap-1 relative hover:bg-indigo-800">
                        <ProfileDropdownMenu user={user}/>
                    </div>
                    :
                    <div onClick={() => setSignInView(true)}
                    className="py-1 px-2 flex items-center cursor-pointer hover:bg-indigo-800">
                        Sign In
                    </div>}
                </div>
            </div>
            {(signInView || signUpView) && 
                <div className="z-10 fixed top-0 bottom-0 right-0 left-0 py-16">
                    <div className="fixed right-0 left-0 max-w-sm mx-auto py-6 px-8 bg-white rounded">
                        {signInView && <SignInForm setSignInView={setSignInView} setSignUpView={setSignUpView}/>}
                        {signUpView && <SignUpForm setSignInView={setSignInView} setSignUpView={setSignUpView}/>}
                    </div>
                    <div onClick={() => {setSignUpView(false); setSignInView(false)}}
                    className="-z-20 absolute top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.41)]"> 
                    </div>
                </div>
            }
            {viewCategories &&
                <CategoriesView setViewCategories={setViewCategories}/>
            }
        </div>
    );
}

function CategoriesView({setViewCategories}) {
    const [focusedCategory, setFocusedCategory] = useState();
    const [focusedSubCategory, setFocusedSubCategory] = useState();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

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
        className="z-30 flex absolute top-0 bottom-0 right-0 left-0">
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
            className="grow bg-[rgb(60,60,60,0.4)]"></div>
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

