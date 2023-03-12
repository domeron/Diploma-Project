import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import {ReactComponent as ProfileIcon} from "../assets/svg/profile.svg"
import {ReactComponent as MessageIcon} from "../assets/svg/envelope.svg"


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
    return (
        <div className="py-4 border-b-2">    
            <div className="container flex flex-row justify-between mx-auto items-center">
                <div className="">
                    <Link to="/" className="">
                        Home
                    </Link>
                </div>
                <form className="flex" role="search">
                    <input type="search" placeholder="Search" 
                    className="py-1 px-2 rounded-l-lg border-blue-500 border-2 w-96"/>
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
                <div tabIndex={0} className="flex flex-col items-center mx-1">
                    <ProfileIcon className="w-6"/>
                    <span className="text-sm font-light">Profile</span>
                </div>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to={'/Account'}>Account</Link></li>
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

function SellerTabs(props) {
    return(
        <div className="flex flex-row">
            <div className="dropdown dropdown-hover dropdown-end">
                <div tabIndex={0} className="flex flex-col items-center mx-1">
                    <ProfileIcon className="w-6"/>
                    <span className="text-sm font-light">Profile</span>
                </div>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to={'/Account'}>Account</Link></li>
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
