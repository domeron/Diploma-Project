import Header from "../components/Header";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { UserContext } from "../App";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const [userLogin, setUserLogin] = useState(true);

    const {register, setError, clearErrors, reset, handleSubmit, formState: { errors } } = useForm();

    function onLogin (data) {
        console.log( {email: data.email, password: data.password} );
        let url = userLogin ? 'https://localhost:7077/User/Login' : 'https://localhost:7077/Seller/Login';
        axios.post(url, data)
            .then((response) => {
                console.log(response.data);
                setUser(response.data);
                navigate("/");
            })
            .catch(function (error) {
            if (error.response) {
                if(error.response.data === 'User with provided email is not found.') {
                    setError('email', {type: "manual", message: `The user with ${data.email} doesn't exist`});
                } 
                else if(error.response.data === 'Wrong password') {
                    setError('password', {type: "manual", message: 'Wrong password.'});
                }
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) { console.log(error.request);
            } else { console.log('Error', error.message); }
            console.log(error.config);
            });
    }

    function handleChangeUserLogin() {
        setUserLogin(!userLogin); 
        clearErrors();
        reset();
    }

    function handleForgotPassword() {
        navigate('/Forget-Password');   
    }

    return (
        <>
        <div>
            <Header/>
        </div>
        <div className="bg-slate-100 py-12">
            <div className="container mx-auto py-6">
                <h1 className="text-2xl font-semibold">
                    {userLogin ? ('Login'): ('Seller Login')}
                </h1>
                <form onSubmit={handleSubmit(onLogin)} 
                className="flex flex-col py-2 w-96">
                    {userLogin ? (
                        <>
                        <FormGroup name="email" label="E-mail:" type="email" errors={errors} register={register}/>
                        <FormGroup name="password" label="Password:" type="password" errors={errors} register={register}/>
                        <p className="underline cursor-pointer text-gray-500"
                        onClick={handleForgotPassword}>Forgot Password?</p>
                        </>
                    ) : (
                        <>
                        <FormGroup name="email" label="Seller E-mail:" type="email" errors={errors} register={register}/>
                        <FormGroup name="password" label="Password:" type="password" errors={errors} register={register}/>
                        </>
                    )}

                    <button type="submit" 
                    className="rounded-md bg-green-500 py-2 px-2 w-64 text-white mt-4">Login</button>
                </form>
                <button onClick={handleChangeUserLogin}
                className="text-gray-500 underline decoration-2 hover:font-semibold hover:text-black">
                    {userLogin ? ('For Sellers'): ('For Users')}
                </button>
            </div>
        </div>
        </>
    );
}

function FormGroup(props) {
    return (
        <div className="flex flex-col pb-2 w-64">
            <label htmlFor={props.name} className="fw-semibold mb-2">{props.label}</label>
            <input name={props.name} type={props.type}
             {...props.register(props.name, 
            {required: 'This field is required', } )} className="rounded-md px-2 py-1 border-2"/>
            <ErrorMessage errors={props.errors} name={props.name}
            render={({ message }) => <p className="text-red-500 italic text-right">{message}</p>}/>
        </div>
    );
}