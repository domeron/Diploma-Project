import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useState, useContext } from "react";
import { UserContext } from "../App";
import { EyeOutline } from "styled-icons/evaicons-outline";
import { EyeOff2 } from "styled-icons/evaicons-solid";
import { api_UserLogin } from "../api/user_api";

export default function SignInPage() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const navigate=useNavigate();
    const [viewPassword, setViewPassword] = useState(false);
    const {setUser} = useContext(UserContext)

    async function onSignIn(data) {
        await api_UserLogin(data)
        .then((data) => {
            console.log(data);
            setUser(data)
            navigate('/')
        })
        .catch((err) => {
            console.log(err.response.data)
            if(err.response.data === 'User with provided email is not found.') {
                setError('email', { type: 'custom', message: err.response.data });
            } else if(err.response.data === 'Wrong password') {
                setError('password', { type: 'custom', message: err.response.data });
            }
        })
    }

    return (
        <div className="h-screen py-16">
            <div className="max-w-sm mx-auto py-6 px-8 border border-gray-400 shadow-md rounded-md">
                <p className="text-3xl font-bold mb-6">Sign In</p>
                <form onSubmit={handleSubmit(onSignIn)}>
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
                        <div className="py-1 pl-2 w-full flex rounded-md border border-gray-500">
                            <input type={viewPassword ? 'text' : 'password'}
                            className="grow outline-none"
                            {...register('password', {required: 'Please, enter your Password'})}/>

                            <div className="px-2 cursor-pointer hover:text-blue-500 text-gray-500"
                                onClick={() => setViewPassword(!viewPassword)}>
                                    {viewPassword ?
                                    <EyeOutline className="w-6 h-6"/>
                                    : 
                                    <EyeOff2 className="w-6 h-6"/>}
                            </div>
                        </div>

                        <ErrorMessage errors={errors} name="password"
                        render={({ message }) => <p className="text-red-500">{message}</p>}/>

                    </div>
                                        
                    <div className="my-1 flex gap-2 items-center">
                        <input type="checkbox" className="p-1"/>
                        <p>Remember me?</p>
                    </div>

                    <div className="my-4">
                        <button type="submit" className="py-2 px-2 w-full rounded-md bg-blue-500 text-white shadow-md">
                            Sign In
                        </button>
                    </div>
                </form>
                <div>
                    <p>Don't have an account yet?
                        <span onClick={() => navigate('/SignUp')}
                        className="text-blue-500 cursor-pointer hover:underline">Sign Up</span>
                    </p>
                </div>
            </div>
        </div>
    );
}