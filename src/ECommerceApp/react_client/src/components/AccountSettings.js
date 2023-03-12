
import { useContext, useRef, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
import {useForm} from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';

export default function AccountSettings({user, setUser}) {
    const { register, clearErrors,setError, setValue, handleSubmit, formState: { errors } } = useForm(
        {defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        }}
    );
    const [changing, setChanging] = useState(false);

    

    async function onSubmit(data) {
        await axios.put(`https://localhost:7077/User/Update/${user.userId}`, data)
            .then((response) => {
                console.log(response.data);
                setUser(response.data);
                setChanging(false);
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

    function handleCancel() {
        setChanging(false);
        setValue('firstName', user.firstName);
        setValue('lastName', user.lastName);
        setValue('email', user.email);
        setValue('password', user.password);
        clearErrors();
    }

    function handleChange() {
        setChanging(true);
    }

    return (
        <div className="px-8 py-4 bg-white">
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="py-2 w-96">    
                <FormGroup name="firstName" label="Firstname" type="text" errors={errors} register={register} changing={changing}/>
                <FormGroup name="lastName" label="Lastname" type="text" errors={errors} register={register} changing={changing}/>
                <FormGroup name="email" label="Email" type="email" errors={errors} register={register} changing={changing}/>
                <FormGroup name="password" label="Password" type="password" errors={errors} register={register} changing={changing}/>

                <div className="w-80 flex flex-row mt-4">
                {changing ? (
                    <>
                        <button type="submit" className="text-white bg-blue-500 py-2 px-4 rounded-md w-28 mr-4">Save</button>
                        <button className="text-white bg-red-500 py-2 px-4 rounded-md w-28" onClick={handleCancel}>Cancel</button>
                    </>) : (
                        <>
                        <button className="text-white bg-blue-500 py-2 px-4 rounded-md w-28" onClick={handleSubmit(handleChange)}>Change</button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}

function FormGroup(props) {
    return (
        <div className="form-group flex flex-col pb-2 w-80">
            <label htmlFor={props.name} className="fw-semibold mb-2">{props.label}</label>
            <input name={props.name} type={props.type} {...props.register(props.name, 
            {required: 'This field is required', } )}
            className="rounded-md px-2 py-1 border-2 disabled:bg-gray-200 disabled:border-gray-300" disabled={!props.changing}/>
            <ErrorMessage errors={props.errors} name={props.name}
            render={({ message }) => <p className="text-red-500 italic">{message}</p>}/>
        </div>
    );
}