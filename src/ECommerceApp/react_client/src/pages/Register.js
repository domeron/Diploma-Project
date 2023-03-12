import { useState, useContext } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function Register() {
    const navigate = useNavigate();
    const { register, setError, handleSubmit, formState: { errors } } = useForm();
    const {user, setUser} = useContext(UserContext);

    async function onSubmit(data) {
        await axios.post('https://localhost:7077/User/Create', data)
            .then((response) => {
                console.log(response.data);
                setUser(response.data);
                navigate("/");
            })
            .catch(function (error) {
            if (error.response) {
                if(error.response.data === 'User with provided email already exists.') {
                    setError('email', {type: "manual", message: 'This email is taken'});
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
        <div className="bg-slate-100">
            <div className="container mx-auto py-6">
                <h1 className="text-2xl font-semibold">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)} 
                className="flex flex-col py-2 w-96">    
                    
                    <FormGroup name="firstName" label="Firstname" type="text" errors={errors} register={register}/>
                    <FormGroup name="lastName" label="Lastname" type="text" errors={errors} register={register}/>
                    <FormGroup name="email" label="E-mail" type="email" errors={errors} register={register}/>
                    <FormGroup name="password" label="Password" type="password" errors={errors} register={register}/>

                    <button type="submit" 
                    className="rounded-md bg-green-500 py-2 px-2 w-64 text-white">Register</button>
                </form>
            </div>
        </div>  
        </>
    );
}

function FormGroup(props) {
    return (
        <div className="form-group flex flex-col pb-2 w-64">
            <label htmlFor={props.name} className="fw-semibold mb-2">{props.label}</label>
            <input name={props.name} type={props.type} {...props.register(props.name, 
            {required: 'This field is required', } )} className="rounded-md px-2 py-1"/>
            <ErrorMessage errors={props.errors} name={props.name}
            render={({ message }) => <p className="text-red-500 italic text-right">{message}</p>}/>
        </div>
    );
}