
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

import SignUpForm from "../forms/SignUpForm";
import SignInForm from "../forms/SignInForm";
import ProfileDropdownMenu from "../profile/ProfileDropdownMenu";
import { FavoriteBorder, ShoppingBasket } from "@mui/icons-material";
import CategoriesMenu from "./CategoriesMenu";

export default function TopHeader() {
    const {user} = useContext(UserContext)
    const navigate = useNavigate();
    const [signInView, setSignInView] = useState(false);
    const [signUpView, setSignUpView] = useState(false);

    return (
        <div className="border-b bg-indigo-900">
            <div className="max-w-6xl mx-auto flex justify-between text-sm">
                <div className="flex gap-4 text-white">
                    <CategoriesMenu/>
                </div>

                <div className="flex text-white">
                    {user && 
                    <div onClick={() => navigate('/Favorites')}
                    className="relative flex py-1 px-2 items-center gap-2 hover:bg-indigo-800 cursor-pointer ">
                        <p>Favorites</p>
                        <FavoriteBorder className="" fontSize="small"/>
                    </div>
                    }
                    <div onClick={() => navigate('/Cart')}
                    className="flex py-1 px-2 items-center gap-2 hover:bg-indigo-800 cursor-pointer ">
                        <p>Cart</p>
                        <ShoppingBasket className="" fontSize="small"/>
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
                    <div className="fixed right-0 left-0 max-w-sm mx-auto py-6 px-8 bg-white rounded-sm">
                        {signInView && <SignInForm setSignInView={setSignInView} setSignUpView={setSignUpView}/>}
                        {signUpView && <SignUpForm setSignInView={setSignInView} setSignUpView={setSignUpView}/>}
                    </div>
                    <div onClick={() => {setSignUpView(false); setSignInView(false)}}
                    className="-z-20 absolute top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.41)]"> 
                    </div>
                </div>
            }
            
        </div>
    );
}
    