import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import axios from "axios";
import CategoryMenuForm from "./CategoryMenuForm";

export default function EditProductForm({product, onReturn}) {
    const { register, setError, setValue, reset, handleSubmit, formState: { errors } } = useForm(
        {defaultValues: {
            productName: product.productName,
            productDescription: product.productDescription,
            priceUSD: product.priceUSD,
            quantity: product.quantity,
            sellerId: product.sellerId,
            categoryId: product.categoryId
        }}
    );

    async function onSubmit(data) {
        await axios.put(`https://localhost:7077/Product/Update/${product.productId}`, data)
            .then((response) => {
                console.log(response.data);
                onReturn();
            })
            .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) { console.log(error.request);
            } else { console.log('Error', error.message); }
            console.log(error.config);
            });
    }
    async function deleteProduct() {
        await axios.delete(`https://localhost:7077/Product/Delete/${product.productId}`)
        .then((response) => {
            console.log(response.data);
            onReturn();
        })
        .catch(function (error) {
        if (error.response) {
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
                {required: 'This field is required', } )} 
                className="rounded-md px-2 py-1 border-2 max-h-64"/>
                <ErrorMessage errors={errors} name="productDescription"
                render={({ message }) => <p className="text-red-500 italic text-right">{message}</p>}/>
            </div>

            {/* CATEGORIES */}
            <div className="form-group pb-2">
                <h2 htmlFor="productCategory" className="fw-semibold mb-2">Category:</h2>
                <CategoryMenuForm initialCategory={product.category}
                onCategoryChoose={(categoryId) => setValue('categoryId', categoryId)}/>
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

            <div className="flex gap-2">
                <button type="submit" 
                className="rounded-md bg-blue-500 py-1 px-4 text-white">Apply Changes</button>
                <button type="button" 
                className="rounded-md bg-gray-500 py-1 px-4 text-white"
                onClick={() => reset()}>Reset</button>
            </div>

        </form>
        <button type="button" 
            className="rounded-md bg-red-500 py-1 px-4 text-white mt-4"
            onClick={deleteProduct}>Delete product</button>
        </>
    );
}
