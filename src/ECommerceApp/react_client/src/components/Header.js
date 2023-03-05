import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function AuthSection() {
    const navigate = useNavigate();
    const userItem = localStorage.getItem('user');
    const {user, setUser} = useContext(UserContext);

    function handleLogout() {
        localStorage.removeItem('user');
        setUser(null);
        navigate("/Login");
    }

    if(userItem) {
        return (
            <div className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link to="/Login" className="nav-link">
                    Hello, {user.firstName}
                </Link>
                <Link onClick={handleLogout} className="nav-link">
                    Log Out
                </Link>
            </div>
        );
    } else {
        return (
            <div className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link to="/Login" className="nav-link">
                    Log In
                </Link>
                <Link to="/Register" className="nav-link">
                    Register
                </Link>
            </div>
        );
    }
}

export default function Header() {
    return (
        <nav className="navbar navbar-expand-md" style={{backgroundColor: '#e3f2fd'}}>
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                        <a className="nav-link" href="#">Link</a>
                    </div>
                    <form className="d-flex me-5" role="search">
                        <input className="form-control mx-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <span className="d-flex">
                        <AuthSection/>
                    </span>
                </div>
            </div>
        </nav>
    );
}