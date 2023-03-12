import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import axios from "axios";

export default function CreateNewProduct({goToProducts}) {
    const {user, setUser} = useContext(UserContext);
    const { register, setError, setValue, reset, handleSubmit, formState: { errors } } = useForm();

    async function onSubmit(data) {
        await axios.post('https://localhost:7077/Product/Create', {
            sellerId: user.sellerId,
            productName: data.productName,
            productDescription: data.productDescription,
            priceUSD: data.priceUSD,
            quantity: data.quantity
        })
            .then((response) => {
                console.log(response.data);
                goToProducts();
                reset();
            })
            .catch(function (error) {
            if (error.response) {
                if(error.response.data === 'Product with provided name by this seller already exists.')
                    setError('productName', {type: "manual", message: error.response.data});
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
        <h1 className="text-2xl font-semibold mb-6">Create New Product</h1>
        <form onSubmit={handleSubmit(onSubmit)} 
        className="flex flex-col py-2">    
            
            <div className="form-group flex flex-col pb-2 w-64">
                <label htmlFor="productName" className="fw-semibold mb-2">Product Name:</label>
                <input name="productName" type="text" {...register("productName", 
                {required: 'This field is required', } )} className="rounded-md px-2 py-1 border-2"/>
                <ErrorMessage errors={errors} name="productName"
                render={({ message }) => <p className="text-red-500 italic text-right">{message}</p>}/>
            </div>

            <div className="form-group flex flex-col pb-2">
                <label htmlFor="productDescription" className="fw-semibold mb-2">Description:</label>
                <textarea name="productDescription" {...register("productDescription", 
                {required: 'This field is required', } )} className="rounded-md px-2 py-1 border-2"/>
                <ErrorMessage errors={errors} name="productDescription"
                render={({ message }) => <p className="text-red-500 italic text-right">{message}</p>}/>
            </div>


            <div className="form-group flex flex-col pb-2 w-64">
                <label htmlFor="priceUSD" className="fw-semibold mb-2">Price (USD):</label>
                <input name="priceUSD" type="number" step="0.01" {...register("priceUSD", 
                {required: 'This field is required', } )} className="rounded-md px-2 py-1 border-2"/>
                <ErrorMessage errors={errors} name="priceUSD"
                render={({ message }) => <p className="text-red-500 italic text-right">{message}</p>}/>
            </div>

            <div className="form-group flex flex-col pb-2 w-64">
                <label htmlFor="quantity" className="fw-semibold mb-2">Quantity:</label>
                <input name="quantity" type="number" {...register("quantity", 
                {required: 'This field is required', } )} className="rounded-md px-2 py-1 border-2"/>
                <ErrorMessage errors={errors} name="quantity"
                render={({ message }) => <p className="text-red-500 italic text-right">{message}</p>}/>

            </div>

            <button type="submit" 
            className="rounded-md bg-green-500 py-2 px-2 w-64 text-white">Create</button>
        </form>
        </>
    );
}