import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState();

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    function handleRegister() {
        axios.post('https://localhost:7077/User/Create', user)
            .then((response) => {
                console.log(response.data);
            // navigate("/");
            })
            .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                setErrorMessage(error.response.data);
            } else if (error.request) { console.log(error.request);
            } else { console.log('Error', error.message); }
            console.log(error.config);
            setUser({ ...user, password: ''});
            });
    }

    return (
        <div className="container">
            <form onSubmit={(e) => e.preventDefault()}
            className="p-3">
                
                <div className="form-group">
                    <label htmlFor="firstName" className="mb-2">First Name</label>
                    <input name="firstName" type="text" value={user.firstName} onChange={handleChange} className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName" className="mb-2">Last Name</label>
                    <input name="lastName" type="text" value={user.lastName} onChange={handleChange} className="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="mb-2">E-mail</label>
                    <input name="email" type="email" value={user.email} onChange={handleChange} className="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="mb-2">Password</label>
                    <input name="password" type="password" value={user.password} onChange={handleChange} className="form-control"/>
                </div>

                <button onClick={handleRegister} className="btn btn-primary mt-2">
                    Register
                </button>

                {errorMessage && (
                <div className="p-2 border border-danger rounded text-danger" >
                    {errorMessage}
                </div>)}
            </form>
        </div>
    );
}