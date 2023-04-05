import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import {ReactComponent as ProfileIcon} from "../assets/svg/profile.svg"
import {ReactComponent as MessageIcon} from "../assets/svg/envelope.svg"
import {ReactComponent as CartIcon} from "../assets/svg/cart.svg"
import { useForm } from "react-hook-form";


function AuthSection() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    function handleLogout() {
        localStorage.removeItem('user');
        setUser(null);
    }

    if(user) {
        return (
            <>
            {user.userRole === 'User' ? 
                (<UserTabs handleLogout={handleLogout}/>) : 
                (<SellerTabs handleLogout={handleLogout}/>)}
            </>
        );
    } else {
        return (
            <div className="">
                <Link to="/Login" className="text-white py-1.5 px-4 mr-4 bg-blue-500 rounded-md">
                    Log In
                </Link>
                <Link to="/Register" className="text-white py-1.5 px-4 bg-blue-500 rounded-md">
                    Register
                </Link>
            </div>
        );
    }
}

export default function Header() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    function handleSearch(data) {
        if(data.searchInput.trim() == '') {
            console.log('empty search input');
            return;
        }
        navigate(`/Search`, {state: data.searchInput});
    }

    return (
        <div className="fixed py-2 border-b-2 w-full bg-white">
            <div className="container flex flex-row justify-between mx-auto items-center
            text-sm">
                <div className="">
                    <Link to="/" className="">
                        Home
                    </Link>
                </div>
                <form className="flex w-1/3" role="search" onSubmit={handleSubmit(handleSearch)}>
                    <input type="search" placeholder="Search" {...register('searchInput')}
                    className=" px-2 rounded-l-xl border-blue-500 border-2 w-3/4"/>
                    <button type="submit"
                    className="py-1 px-6 bg-blue-500 text-white rounded-r-lg border-blue-500 border-2">Search</button>
                </form>
                <span className="">
                    <AuthSection/>
                </span>
            </div>
        </div>
    );
}

function UserTabs(props) {
    return(
        <div className="flex flex-row">

            <div className="dropdown dropdown-hover dropdown-end">
                <div className="flex flex-col items-center mx-1">
                    <ProfileIcon className="w-6"/>
                    <span className="text-sm font-light">Profile</span>
                </div>
                <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to={'/Account'}>Account</Link></li>
                    <li><Link to={'/Login'} onClick={props.handleLogout}>Log Out</Link></li>
                </ul>
            </div>

            <div className="flex flex-col items-center mx-1">
                <MessageIcon className="w-6"/>
                <span className="text-sm font-light">Message</span>
            </div>

            <Link to={'/Cart'} className="flex flex-col items-center mx-1">
                <CartIcon className="w-6"/>
                <span className="text-sm font-light">Cart</span>
            </Link>
        </div>
    );
}

function SellerTabs(props) {
    return(
        <div className="flex flex-row">
            <div className="dropdown dropdown-hover dropdown-end">
                <div tabIndex={0} className="flex flex-col items-center mx-1">
                    <ProfileIcon className="w-6"/>
                    <span className="text-sm font-light">Profile</span>
                </div>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to={'/Seller/Dashboard'}>Seller Dashboard</Link></li>
                    <li><Link to={'/Login'} onClick={props.handleLogout}>Log Out</Link></li>
                </ul>
            </div>

            <div className="flex flex-col items-center mx-1">
                <MessageIcon className="w-6"/>
                <span className="text-sm font-light">Message</span>
            </div>
        </div>
    );
}
