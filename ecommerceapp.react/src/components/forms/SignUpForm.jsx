
import { useState, useContext } from "react";
import { UserContext } from "../../App";
import { api_UserRegister } from "../../API/UserAPI";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export default function SignUpForm({setSignInView, setSignUpView}) {
    const [viewPassword, setViewPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const {setUser} = useContext(UserContext)
    const {register, handleSubmit, formState: {errors}} = useForm();

    async function handleSignUp(data) {
        setLoading(true);
        await api_UserRegister(data)
        .then((data) => {
            setUser(data)
            setSignUpView(false)
        })
        .catch((err) => {
            console.log(err.response.data)
        })
        setLoading(false);
    }

    return (
        <>
        <p className="text-3xl font-bold mb-6">Sign Up</p>
        <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="my-2">
                <p className="mb-2">First Name</p>
                <input type="text" 
                className="py-1 px-2 w-full rounded-sm border border-gray-500"
                {...register('firstName',
                {required: 'First Name is required'})}/>

                <ErrorMessage errors={errors} name="firstName"
                render={({message}) => 
                <p className="text-red-600 text-sm">{message}</p>}/>
            </div>

            <div className="my-2">
                <p className="mb-2">Last Name</p>
                <input type="text" 
                className="py-1 px-2 w-full rounded-sm border border-gray-500"
                {...register('lastName',
                {required: 'Last Name is required'})}/>
                
                <ErrorMessage errors={errors} name="lastName"
                render={({message}) => 
                <p className="text-red-600 text-sm">{message}</p>}/>
            </div>

            <div className="my-2">
                <p className="mb-2">E-mail</p>
                <input type="email" 
                className="py-1 px-2 w-full rounded-sm border border-gray-500"
                {...register('email',
                {required: 'E-mail is required'})}/>
                
                <ErrorMessage errors={errors} name="email"
                render={({message}) => 
                <p className="text-red-600 text-sm">{message}</p>}/>
            </div>

            <div className="my-2">
                <p className="mb-2">Password</p>
                <input type={viewPassword ? 'text' : 'password'}
                className="py-1 px-2 mb-2 w-full rounded-sm border border-gray-500"
                {...register('password',
                {required: 'Password is required'})}/>
                
                <ErrorMessage errors={errors} name="password"
                render={({message}) => 
                <p className="text-red-600 text-sm">{message}</p>}/>
            </div>

            <div className="my-4">
                <button type="submit" className={`flex items-center justify-center px-2 h-12 w-full rounded-md bg-blue-500 text-white shadow-md`}>
                    <span className="mx-4">Sign Up</span>
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