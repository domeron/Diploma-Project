import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState, useContext } from "react";
import { UserContext } from "../App";
import { EyeOutline } from "styled-icons/evaicons-outline";
import { EyeOff2 } from "styled-icons/evaicons-solid";
import { api_UserCreate } from "../api/user_api";

export default function SignUpPage() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const navigate=useNavigate();
    const [viewPassword, setViewPassword] = useState(false);
    const {setUser} = useContext(UserContext)

    async function onSignUp(data) {
        await api_UserCreate(data)
        .then((data) => {
            console.log(data);
            setUser(data)
            navigate('/')
        })
        .catch((err) => {
            console.log(err.response.data)
            if(err.response.data === 'User with provided email already exists.') {
                setError('email', { type: 'custom', message: err.response.data });
            }
        })
    }

    return (
        <div className="h-screen py-16">
            <div className="max-w-sm mx-auto py-6 px-6 border border-gray-400 shadow-md rounded-md">
                <p className="text-3xl font-bold mb-6">Sign Up</p>
                <form onSubmit={handleSubmit(onSignUp)}>
                    <div className="my-2">
                        <p className="mb-2">Firstname</p>
                        <input type="text" 
                        className="py-1 px-2 w-full rounded-md border border-gray-500"
                        {...register('firstName', {required: 'Please, enter your Name'})}/>
                        <ErrorMessage errors={errors} name="firstName"
                        render={({ message }) => <p className="text-red-500">{message}</p>}/>
                    </div>

                    <div className="my-2">
                        <p className="mb-2">Lastname</p>
                        <input type="text" 
                        className="py-1 px-2 w-full rounded-md border border-gray-500"
                        {...register('lastName', {required: 'Please, enter your Last Name'})}/>
                        <ErrorMessage errors={errors} name="lastName"
                        render={({ message }) => <p className="text-red-500">{message}</p>}/>
                    </div>

                    <div className="my-2">
                        <p className="mb-2">E-mail</p>
                        <input type="email" 
                        className="py-1 px-2 w-full rounded-md border border-gray-500"
                        {...register('email', {required: 'Please, enter your E-mail'})}/>
                        <ErrorMessage errors={errors} name="email"
                        render={({ message }) => <p className="text-red-500">{message}</p>}/>
                    </div>

                    <div className="my-2">
                        <p className="mb-2">Password</p>
                        <input type={viewPassword ? 'text' : 'password'}
                        className="py-1 px-2 mb-2 w-full rounded-md border border-gray-500"
                        {...register('password', {required: 'Please, enter your Password'})}/>
                        <div className=" flex gap-1 items-center cursor-pointer hover:text-blue-500"
                            onClick={() => setViewPassword(!viewPassword)}>
                                {viewPassword 
                                ? 
                                <><EyeOutline className="w-6 h-6"/> <p className="text-sm">Hide Password</p></>
                                : 
                                <><EyeOff2 className="w-6 h-6"/> <p className="text-sm">Show Password</p></>
                                }
                        </div>
                        
                        <ErrorMessage errors={errors} name="password"
                        render={({ message }) => <p className="text-red-500">{message}</p>}/>
                    </div>

                    <div className="my-4">
                        <button type="submit" className="py-2 px-2 w-full rounded-md bg-blue-500 text-white shadow-md">
                            Sign Up
                        </button>
                    </div>
                </form>
                <div>
                    <p>Already have an account?
                        <span onClick={() => navigate('/SignIn')}
                        className="text-blue-500 cursor-pointer hover:underline">Sign In</span>
                    </p>
                </div>
            </div>
        </div>
    );
}