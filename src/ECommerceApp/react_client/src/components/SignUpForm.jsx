import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState, useContext } from "react";
import { UserContext } from "../App";
import { api_UserCreate } from "../api/user_api";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export default function SignUpForm({setSignInView, setSignUpView}) {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [viewPassword, setViewPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const {setUser} = useContext(UserContext)

    async function onSignUp(data) {
        setLoading(true);
        await api_UserCreate(data)
        .then((data) => {
            console.log(data);
            setUser(data)
            setSignUpView(false)
        })
        .catch((err) => {
            console.log(err.response.data)
            if(err.response.data === 'User with provided email already exists.') {
                setError('email', { type: 'custom', message: err.response.data });
            }
        })
        setLoading(false);
    }

    return (
        <>
        <p className="text-3xl font-bold mb-6">Sign Up</p>
        <form onSubmit={handleSubmit(onSignUp)}>
            <div className="my-2">
                <p className="mb-2">Firstname</p>
                <input type="text" 
                className="py-1 px-2 w-full rounded-sm border border-gray-500"
                {...register('firstName', {required: 'Please, enter your Name'})}/>
                <ErrorMessage errors={errors} name="firstName"
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            <div className="my-2">
                <p className="mb-2">Lastname</p>
                <input type="text" 
                className="py-1 px-2 w-full rounded-sm border border-gray-500"
                {...register('lastName', {required: 'Please, enter your Last Name'})}/>
                <ErrorMessage errors={errors} name="lastName"
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            <div className="my-2">
                <p className="mb-2">E-mail</p>
                <input type="email" 
                className="py-1 px-2 w-full rounded-sm border border-gray-500"
                {...register('email', {required: 'Please, enter your E-mail'})}/>
                <ErrorMessage errors={errors} name="email"
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            <div className="my-2">
                <p className="mb-2">Password</p>
                <input type={viewPassword ? 'text' : 'password'}
                className="py-1 px-2 mb-2 w-full rounded-sm border border-gray-500"
                {...register('password', {required: 'Please, enter your Password'})}/>
                <div className="flex">
                    <div className="flex gap-1 items-center cursor-pointer hover:text-blue-500"
                        onClick={() => setViewPassword(!viewPassword)}>
                            {viewPassword 
                            ? 
                            <><VisibilityIcon className="w-6 h-6"/> <p className="text-sm">Hide Password</p></>
                            : 
                            <><VisibilityOffIcon className="w-6 h-6"/> <p className="text-sm">Show Password</p></>
                            }
                    </div>
                </div>
                
                <ErrorMessage errors={errors} name="password"
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            <div className="my-4">
                <button type="submit" className={`flex items-center justify-center px-2 h-12 w-full rounded-md bg-blue-500 text-white shadow-md`}>
                    <span className="mx-4">Sign Up</span>
                    {loading && <AutorenewIcon className="w-8 h-8 animate-spin "/>}
                </button>
            </div>
        </form>
        <div>
            <p>Already have an account?
            <span onClick={() => {setSignUpView(false); setSignInView(true)}}
                className="text-blue-500 cursor-pointer hover:underline">Sign In</span>
            </p>
        </div>
    </>
    );
}