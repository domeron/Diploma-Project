import { useState, useContext } from "react";
import { UserContext } from "../../App";
import { api_UserLogin } from "../../API/UserAPI";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export default function SignInForm({setSignInView, setSignUpView}) {
    const {register, handleSubmit, setError, formState: {errors}} = useForm();
    const {setUser} = useContext(UserContext)
    const [loading, setLoading] = useState(false);

    async function handleSignIn(data) {
        console.log(data)
        setLoading(true);
        await api_UserLogin(data)
        .then((data) => {
            console.log(data);
            setUser(data)
            setSignInView(false);
        })
        .catch((err) => {
            console.log(err.response)
            if(err.response.data === 'User with provided email is not found.')
                setError('email', { type: 'custom', message: err.response.data });
            if(err.response.data === 'Wrong password')
                setError('password', { type: 'custom', message: err.response.data });
        })
        setLoading(false);
    }


    return (
        <>
        <p className="text-2xl font-semibold mb-4">Sign In</p>
        <form onSubmit={handleSubmit(handleSignIn)}>
            <div className="my-2">
                <label>E-mail</label>
                <input autoFocus type="email" label="E-mail" 
                className="p-1 w-full border-black border-[0.1pt]"
                {...register("email",
                {required:'E-mail is required'})}/>

                <ErrorMessage errors={errors} name="email"
                render={({message}) => 
                <p className="text-red-600 text-sm">{message}</p>}/>
            </div>

            <div className="my-2">
                <label>Password</label>
                <input type="password" label="E-mail" 
                className="p-1 w-full border-black border-[0.1pt]"
                {...register("password",
                {required: 'Password is required'})}/>

                <ErrorMessage errors={errors} name="password"
                render={({message}) => 
                <p className="text-red-600 text-sm">{message}</p>}/>
            </div>

            <div className="my-4">
                <button type="submit" 
                className="py-2 bg-blue-500 text-white hover:bg-blue-800">
                    <span className="mx-4">Sign In</span>
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