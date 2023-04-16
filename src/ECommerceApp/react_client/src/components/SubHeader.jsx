import {Bars3Icon, ChevronDownIcon, UserCircleIcon} from "@heroicons/react/24/solid"
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import DropDownMenu from "./elements/DropDownMenu";
import DropDownMenuItem from "./elements/DropDownMenuItem";
import { HeartOutlined } from "styled-icons/entypo";
import { Cart } from "styled-icons/fluentui-system-regular";
import { SignOut } from "styled-icons/octicons";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function SubHeader() {
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate();
    const [signInView, setSignInView] = useState(false);
    const [signUpView, setSignUpView] = useState(false);

    const [viewUserDropDown, setViewUserDropDown] = useState(false);

    function handleSignOut() {
        setUser(null);
    }

    return (
        <div className="border-b">
            <div className="max-w-6xl py-1 mx-auto flex justify-between text-sm">
                <div className="flex gap-4">
                    <div className="flex gap-1 items-center">
                        <Bars3Icon className="w-6"/>
                        <p>All Category</p>
                    </div>
                    <div className="flex items-center">
                        <p>Hot Offers</p>
                    </div>
                    <div className="flex items-center">
                        <p>Gift Boxes</p>
                    </div>
                    <div className="flex items-center">
                        <p>Projects</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p>Help</p>
                        <ChevronDownIcon className="w-4"/>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <p>English, USD</p>
                        <ChevronDownIcon className="w-4"/>
                    </div>
                    <div className="flex items-center gap-2">
                        <p>Ship to</p>
                        <ChevronDownIcon className="w-4"/>
                    </div>
                    <div onClick={() => navigate('/Cart')}
                    className="flex px-1 items-center gap-1 hover:bg-gray-100 cursor-pointer hover:text-blue-700">
                        <p>Cart</p>
                        <Cart className="w-6"/>
                    </div>

                    <div className="flex">
                        {user ?
                        <div className="flex items-center gap-1 relative">
                            <UserCircleIcon className="w-6"/>
                            <p>{user.firstName}</p>
                            <ChevronDownIcon 
                            onClick={() => {setViewUserDropDown(!viewUserDropDown)}}
                            className="w-4 cursor-pointer"/>
                            {viewUserDropDown &&
                            <DropDownMenu>
                                <DropDownMenuItem url='/Profile'>
                                    <p>Profile</p>
                                </DropDownMenuItem>
                                <DropDownMenuItem url='/Favorites'>
                                    <p>Favorites</p>
                                    <HeartOutlined className="w-5"/>
                                </DropDownMenuItem>
                                <DropDownMenuItem handleClick={handleSignOut}>
                                    <p>Sign Out</p>
                                    <SignOut className="w-4"/>
                                </DropDownMenuItem>
                            </DropDownMenu>
                            }
                        </div>
                        :
                        <>
                            <div onClick={() => setSignInView(true)}
                            className="px-2 flex items-center cursor-pointer hover:text-blue-500">
                                Sign In
                            </div>
                        </>
                        }
                    </div>
                </div>
            </div>
            {(signInView || signUpView) && 
                <div className="z-10 fixed top-0 bottom-0 right-0 left-0 py-16">
                    <div className="fixed right-0 left-0 max-w-sm mx-auto py-6 px-8 bg-white rounded-xl">
                        {signInView && <SignInForm setSignInView={setSignInView} setSignUpView={setSignUpView}/>}
                        {signUpView && <SignUpForm setSignInView={setSignInView} setSignUpView={setSignUpView}/>}
                    </div>
                    <div onClick={() => {setSignUpView(false); setSignInView(false)}}
                    className="-z-20 absolute top-0 right-0 left-0 bottom-0 bg-[rgb(60,60,60,0.4)]"> 
                    </div>
                </div>
            }
        </div>
    );
}

