import Header from "../components/Header";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../App";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    const {register, handleSubmit, watch, formState: { errors } } = useForm();
    const [emailDontExistMessage, setEmailDontExistMessage] = useState();
    const [wrongPasswordMessage, setWorngPasswordMessage] = useState();

    function onSubmit (data) {
        console.log( {email: data.email, password: data.password} );
        axios.post('https://localhost:7077/User/Login', data)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('user', response.data);
                setUser(response.data);
                navigate("/");
            })
            .catch(function (error) {
            if (error.response) {
                if(error.response.data === 'User with provided email is not found.') {
                    setEmailDontExistMessage(`User with email ${data.email} doesn't exist.`);
                } 
                else if(error.response.data === 'Wrong password') {
                    setWorngPasswordMessage("Wrong password.");
                }
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) { console.log(error.request);
            } else { console.log('Error', error.message); }
            console.log(error.config);
            });
    }

    return (
        <>
        <div>
            <Header/>
        </div>
        <div className="container-fluid">
            <div className="col-3">
                <form onSubmit={handleSubmit(onSubmit)} className="p-3">
                    
                    <div className="form-group mb-2">
                        <label htmlFor="email" className="fw-semibold mb-2">E-mail</label>
                        <input name="email" type="email" className="form-control"
                        defaultValue={register.email} {...register("email", { required: true, onChange: (e) => {setEmailDontExistMessage('')} })}/>
                        {errors.email && <div className="text-danger">This field is required</div>}
                        {emailDontExistMessage && (<span className="py-2 text-danger" >{emailDontExistMessage}</span>)}
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="password" className="fw-semibold mb-2">Password</label>
                        <input name="password" type="password" className="form-control"
                        defaultValue={register.password} {...register("password", { required: true, onChange: (e) => {setWorngPasswordMessage('')}})}/>
                        {errors.password && <div className="text-danger">This field is required</div>}
                        {wrongPasswordMessage && (<span className="py-2 text-danger" >{wrongPasswordMessage}</span>)}
                    </div>

                    <input type="submit" className="btn btn-primary mt-2" />
                </form>
            </div>
        </div>
        </>
    );
}