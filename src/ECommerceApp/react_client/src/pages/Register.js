import { useState, useContext } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [emailExistsMessage, setEmailExistsMessage] = useState();
    const {user, setUser} = useContext(UserContext);

    function onSubmit(data) {
        console.log(data);
        axios.post('https://localhost:7077/User/Create', data)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('user', response.data);
                setUser(response.data);
                navigate("/");
            })
            .catch(function (error) {
            if (error.response) {
                if(error.response.data === 'User with provided email already exists.') {
                    setEmailExistsMessage(error.response.data);
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
        <div className="container-fluid">
            <div className="col-3">
                <form onSubmit={handleSubmit(onSubmit)} className="p-3">
                    
                    <div className="form-group mb-2">
                        <label htmlFor="firstName" className="fw-semibold mb-2">First Name</label>
                        <input name="firstName" type="text" defaultValue={register.firstName} {...register("firstName", { required: true })} className="form-control"/>
                        {errors.firstName && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="lastName" className="fw-semibold mb-2">Last Name</label>
                        <input name="lastName" type="text" defaultValue={register.lastName} {...register("lastName", { required: true })} className="form-control"/>
                        {errors.lastName && <span className="text-danger">This field is required</span>}
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="email" className="fw-semibold mb-2">E-mail</label>
                        <input name="email" type="email" defaultValue={"email"} {...register("email", {required: true, onChange: (e) => {setEmailExistsMessage('')}} )} className="form-control"/>
                        {errors.email && <div className="text-danger">This field is required</div>}
                        {emailExistsMessage && (<span className="py-2 text-danger" >{emailExistsMessage}</span>)}
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="password" className="fw-semibold mb-2">Password</label>
                        <input name="password" type="password" defaultValue={"password"} {...register("password", {required: true})} className="form-control"/>
                        {errors.password && <span className="text-danger">This field is required</span>}
                    </div>

                    <input type="submit" className="btn btn-primary mt-2" />
                </form>
            </div>
        </div>  
        </>
    );
}