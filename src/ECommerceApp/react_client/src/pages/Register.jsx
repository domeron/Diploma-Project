import { useState } from "react";
import axios from "axios";


export default function Register() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit() {
        console.log(user);
        axios.post('https://localhost:7077/user/create', user)
            .then((response) => {
            console.log(response.data);
            })
            .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
            });
    }

    return (
        <div>
            <form>
                <label for="firstName">First Name:</label>
                <input type="text" name="firstName" onChange={handleChange}/>

                <label for="lastName">Last Name:</label>
                <input type="text" name="lastName" onChange={handleChange}/>

                <label for="email">E-mail:</label>
                <input type="email" name="email" onChange={handleChange}/>

                <label for="password">Password:</label>
                <input type="password" name="password" onChange={handleChange}/>

                <button type="button" onClick={handleSubmit}>Register</button>
            </form>
        </div>
    );
}