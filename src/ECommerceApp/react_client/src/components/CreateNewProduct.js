import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import axios from "axios";
import CategoryMenuForm from "./CategoryMenuForm";
import ProductImagesViewDashboard from "./ProductImagesViewDashboard";


export default function CreateNewProduct({goToProducts}) {
    const {user, setUser} = useContext(UserContext);
    const { register, setError, setValue, getValues, clearErrors, reset, watch, handleSubmit, formState: { errors } } = useForm();
    const[uploadedFiles, setUploadedFiles] = useState([]);
    const watchImages = watch('imageFiles');

    async function onSubmit(data) {
        const formData = new FormData();
        formData.append('sellerId', user.sellerId);
        formData.append('productName', data.productName);
        formData.append('productDescription', data.productDescription);
        formData.append('priceUSD', data.priceUSD);
        formData.append('quantity', data.quantity);
        formData.append('categoryId', data.categoryId);
        
        for (let i = 0; i < watchImages.length; i++) {
            formData.append('imageFiles',watchImages[i]);   
        }
        
        console.log(formData);
        await axios.post('https://localhost:7077/Product/Create', formData)
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

    function handleFileUpload(e) {
        const file = e.target.files[0];
        if(file.size > 5000000) {
            setError('imageFiles', { type: 'custom', message: 'file too big' })
            return;
        }

        setUploadedFiles([...uploadedFiles, file]);
    }

    useEffect(() => {
        console.log(uploadedFiles);
        console.log(watchImages)
        setValue('imageFiles', uploadedFiles);
    }, [uploadedFiles])

    function handleDeleteImage(index) {
        setUploadedFiles(uploadedFiles.filter((file) => {return file !== uploadedFiles[index]}));
    }

    function handleSetFrontImage(e, index) {
        console.log(e.target.checked);
        const selectedImage = uploadedFiles[index]
        console.log(index)
        setUploadedFiles([selectedImage, ...uploadedFiles.filter((file, ind) => {if(ind !== index) return file})])
        console.log(selectedImage)
    }

    return (
        <>
        <div>
            <h1 className="text-2xl font-semibold mb-6">Create New Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} 
            className="flex py-2 gap-4 items-start">
                <div className="flex flex-col w-full">

                    {/* PRODUCT NAME */}
                    <div className="flex flex-col my-2 max-w-xs">
                        <label htmlFor="productName" className="fw-semibold mb-2">Product Name:</label>
                        <input name="productName" type="text" {...register("productName", 
                        {required: 'This field is required', } )} 
                        className="rounded-md px-2 py-1 border-2"/>
                        <ErrorMessage errors={errors} name="productName"
                        render={({ message }) => <p className="text-red-500 italic text-right">{message}</p>}/>
                    </div>

                    {/* CATEGORIES */}
                    <div className="form-group my-2">
                        <h2 htmlFor="productCategory" className="fw-semibold mb-2">Category:</h2>
                        <CategoryMenuForm onCategoryChoose={(categoryId) => setValue('categoryId', categoryId)}/>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="form-group flex flex-col my-2">
                        <label htmlFor="productDescription" className="fw-semibold mb-2">Description:</label>
                        <textarea name="productDescription" {...register("productDescription", 
                        {required: 'This field is required', } )} 
                        className="rounded-md px-2 py-1 border-2 h-56"/>
                        <ErrorMessage errors={errors} name="productDescription"
                        render={({ message }) => <p className="text-red-500 italic text-right">{message}</p>}/>
                    </div>

                    {/* PRICE USD */}
                    <div className="form-group flex flex-col my-2 max-w-xs">
                        <label htmlFor="priceUSD" className="fw-semibold mb-2">Price (USD):</label>
                        <input name="priceUSD" type="number" step="0.01" {...register("priceUSD", 
                        {required: 'This field is required', } )} className="rounded-md px-2 py-1 border-2"/>
                        <ErrorMessage errors={errors} name="priceUSD"
                        render={({ message }) => <p className="text-red-500 italic text-right">{message}</p>}/>
                    </div>

                    {/* QUANTITY */}
                    <div className="form-group flex flex-col my-2 max-w-xs">
                        <label htmlFor="quantity" className="fw-semibold mb-2">Quantity:</label>
                        <input name="quantity" type="number" {...register("quantity", 
                        {required: 'This field is required', } )} className="rounded-md px-2 py-1 border-2"/>
                        <ErrorMessage errors={errors} name="quantity"
                        render={({ message }) => <p className="text-red-500 italic text-right">{message}</p>}/>
                    </div>

                    {/* IMAGES */}
                    <div className="my-2">
                        <div>
                            <h2 className="fw-semibold mb-4">Images:</h2>

                            <div className="my-4">
                                {uploadedFiles.length >= 10 ?
                                <p>Maximum number of images allowed to upload is 10</p>
                                :
                                <label className="py-2 px-2 bg-sky-500 text-white rounded-md
                                cursor-pointer"
                                htmlFor="in_imageFiles">Add Image</label>
                                }
                                
                                <input className="hidden" name="imageFiles" type="file" id="in_imageFiles"
                                {...register('imageFiles')}
                                onChange={handleFileUpload} 
                                disabled={uploadedFiles && uploadedFiles.length >= 10}/>
                                <ErrorMessage errors={errors} name='imageFiles'
                                render={({ message }) => <p className="text-red-500 italic">{message}</p>}/>
                            </div>

                            <p>Uploaded {uploadedFiles.length} files</p>
                        </div>
                        {uploadedFiles.length > 0 &&
                        <div>
                            <ProductImagesViewDashboard files={uploadedFiles} 
                            onDeleteImage={handleDeleteImage} 
                            setFrontImage={handleSetFrontImage}/>
                        </div>
                        }
                    </div>

                    <button type="submit" 
                    className="rounded-md bg-green-500 py-2 px-2 w-64 text-white">Create</button>
                </div>
            </form>
        </div>
        </>
    );
}