import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import axios from "axios";

export default function Forget_Password() {
    const {register, setError, clearErrors, reset, handleSubmit, formState: { errors } } = useForm();

    function handleSendEmail() {
        
    }

    return (
        <>
        <div>
            <Header/>
        </div>
        <div className="bg-slate-100 h-screen">
            <div className="container mx-auto">
                <div className="w-2/5 mx-auto border-2 bg-white px-8 py-8">
                    <div className="py-2">
                        <h2 className="text-xl font-semibold">Forgot Password</h2>
                    </div>
                    <hr className="h-px my-2"/>
                    <form onSubmit={handleSubmit(handleSendEmail)}>
                        <div className="my-4">
                            <label htmlFor="email" className="">Your e-mail:</label>
                            <input className="border-2 w-full py-2 px-2 rounded-md mt-2"
                            type="email" name="email" {...register('email', {required: 'This field is required'})}/>
                            <ErrorMessage errors={errors} name="email"
                            render={({ message }) => <p className="text-red-500 italic">{message}</p>}/>
                        </div>
                        <div>
                            <button type="submit"
                            className="py-2 px-4 w-full rounded-md bg-blue-500 text-white">
                                Send recovery link
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}