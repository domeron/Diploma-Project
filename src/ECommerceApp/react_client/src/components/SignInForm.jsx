import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState, useContext } from "react";
import { UserContext } from "../App";
import { api_UserLogin } from "../api/user_api";
import TextField from '@mui/material/TextField';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export default function SignInForm({setSignInView, setSignUpView}) {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [viewPassword, setViewPassword] = useState(false);
    const {setUser} = useContext(UserContext)
    const [loading, setLoading] = useState(false);

    async function onSignIn(data) {
        setLoading(true);
        await api_UserLogin(data)
        .then((data) => {
            console.log(data);
            setUser(data)
            setSignInView(false);
        })
        .catch((err) => {
            console.log(err.response.data)
            if(err.response.data === 'User with provided email is not found.') {
                setError('email', { type: 'custom', message: err.response.data });
            } else if(err.response.data === 'Wrong password') {
                setError('password', { type: 'custom', message: err.response.data });
            }
        })
        setLoading(false);
    }

    return (
        <>
        <p className="text-3xl font-semi    bold mb-6">Sign In</p>
        <form onSubmit={handleSubmit(onSignIn)}>
            <div className="my-4">
                <TextField 
                type="email" 
                label="Email"
                className="w-full"
                variant="filled"
                {...register('email', {required: 'Please, enter your E-mail'})}/>
                <ErrorMessage errors={errors} name="email"
                render={({ message }) => <p className="text-red-500">{message}</p>}/>
            </div>

            <div className="my-4">
                <TextField 
                type={viewPassword ? 'text' : 'password'}
                label="Password"
                variant="filled"
                className="w-full"
                {...register('password', {required: 'Please, enter your Password'})}/>

                <div className="my-4 flex gap-1 items-center cursor-pointer hover:text-blue-500 text-gray-500 text-sm"
                    onClick={() => setViewPassword(!viewPassword)}>
                        {viewPassword ?
                        <>
                        <VisibilityIcon className="w-6 h-6"/>
                        <p>Hide Password</p>
                        </>
                        : 
                        <>
                        <VisibilityOffIcon className="w-6 h-6"/>
                        <p>Show Password</p>
                        </>
                        }
                </div>

                <ErrorMessage errors={errors} name="password"
                render={({ message }) => <p className="text-red-500">{message}</p>}/>

            </div>
                                
            <div className="my-1 flex gap-2 items-center">
                <input type="checkbox" className="p-1"/>
                <p>Remember me?</p>
            </div>

            <div className="my-4">
                <button type="submit" className={`flex items-center justify-center px-2 h-12 w-full rounded-md bg-blue-500 text-white shadow-md`}>
                    <span className="mx-4">Sign In</span>
                    {loading && <AutorenewIcon className="w-8 h-8 animate-spin "/>}
                </button>
            </div>
        </form>
        <div>
            <p>Don't have an account yet?
                <span onClick={() => {setSignUpView(true); setSignInView(false)}}
                className="text-blue-500 cursor-pointer hover:underline">Sign Up</span>
            </p>
        </div>
        </>
    );
}