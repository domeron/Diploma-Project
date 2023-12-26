import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect, useState } from "react";
import { CategoryChoose } from "./ProductCreateForm";
import ProductImagesView from "../product/ProductImagesView";

import AutorenewIcon from '@mui/icons-material/Autorenew';
import { api_GetProductById, api_UpdateProduct } from "../../API/ProductAPI";

export default function ProductEditForm({productId, categories}) {
    const [product, setProduct] = useState(null)

    useEffect(() => {
        loadProduct(productId)
    }, [])

    async function loadProduct(productId) {
        await api_GetProductById(productId)
        .then((dataResponse) => {
            console.log(dataResponse)
            setProduct(dataResponse)
        })
    }
    return (
        <div>
            {product &&
            <>
            {/* PRODUCT NAME */}
            <EditField text='Product Name' defaultValue={product.productName} fieldName={'productName'}
            productId={product.productId} onSave={() => loadProduct(product.productId)}>
                <input 
                className="w-full py-1 px-2 border border-gray-400 rounded-sm 
                disabled:text-gray-500 disabled:bg-gray-100" 
                type="text"/>
            </EditField>

            {/* PRICE  */}
            <EditField text='Price (USD)' defaultValue={product.priceUSD} fieldName={'priceUSD'}
            productId={product.productId} onSave={() => loadProduct(product.productId)}>
                <input
                className="w-full py-1 px-2 border border-gray-400 rounded-sm 
                disabled:text-gray-500 disabled:bg-gray-100" 
                type="number" step="0.01"/>
            </EditField>

            {/* QUANTITY */}
            <EditField text='Quantity' defaultValue={product.quantity} fieldName={'quantity'}
            productId={product.productId} onSave={() => loadProduct(product.productId)}>
                <input className="w-full py-1 px-2 border border-gray-400 rounded-sm 
                disabled:text-gray-500 disabled:bg-gray-100" 
                type="number"/>
            </EditField>

            {/* CATEGORY */}
            <EditCategoryField text='Category' initialCategoryId={product.categoryId} categories={categories}
            productId={product.productId} onSave={() => loadProduct(product.productId)}/>

            {/* DESCRIPTION */}
            <EditField text='Description' defaultValue={product.productDescription} fieldName={'productDescription'}
            productId={product.productId} onSave={() => loadProduct(product.productId)}>
                <textarea 
                className="w-full h-48 py-1 px-2 border border-gray-400 rounded-sm 
                disabled:text-gray-500 disabled:bg-gray-100" />
            </EditField>

            {/* IMAGES */}
            <EditImages product={product} onEdit={() => loadProduct(product.productId)}/>
            </>
            }
        </div>
    );
}

function EditField(props) {
    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm();
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if(props.defaultValue)
            setValue(props.fieldName, props.defaultValue);
    }, [])

    async function handleSave(data) {
        const formData = new FormData()
        formData.append('productId', props.productId)
        formData.append(props.fieldName, getValues(props.fieldName))
        await api_UpdateProduct(formData)
        .then((response) => {
            console.log(response)
            setEditing(false)
            props.onSave()
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="mb-4">
            <div className="mb-4 flex gap-2 items-center">
                <p className="text-lg font-semibold">{props.text}</p>
                {!editing &&
                <p onClick={() => setEditing(true)}
                className="text-blue-500 hover:underline cursor-pointer">Edit</p>
                }
            </div>
            <form onSubmit={handleSubmit(handleSave)}>
                {React.cloneElement(props.children, {...register(props.fieldName), disabled: !editing})}
                {editing &&
                <div className="mt-4 flex gap-2">
                    <button 
                    className="w-32 py-2 px-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    type="submit" >Save</button>
                    <button 
                    className="w-32 py-2 px-2 text-blue-500 border-blue-500 border rounded hover:bg-gray-200"
                    onClick={() => setEditing(false)}
                    type="button" >Cancel</button>
                </div>
                }
            </form>
        </div>
    );
}

function EditCategoryField(props) {
    const {handleSubmit, getValues, setValue, formState: { errors } } = useForm({
        defaultValues: {'categoryId': props.defaultValue}
    });
    const [editing, setEditing] = useState(false);

    async function handleSave(data) {
        const formData = new FormData()
        formData.append('productId', props.productId)
        formData.append('categoryId', getValues('categoryId'))
        await api_UpdateProduct(props.productId, formData)
        .then((response) => {
            console.log(response)
            setEditing(false)
            props.onSave()
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="mb-4">
            <div className="mb-4 flex gap-2 items-center">
                <p className="text-lg font-semibold">{props.text}</p>
                {!editing &&
                <p onClick={() => setEditing(true)}
                className="text-blue-500 hover:underline cursor-pointer">Edit</p>
                }
            </div>
            <form onSubmit={handleSubmit(handleSave)}>
                <CategoryChoose disabled={!editing} categories={props.categories} setValue={setValue} initialCategoryId={props.initialCategoryId}/>
                {editing &&
                    <div className="mt-4 flex gap-2">
                        <button 
                        className="w-32 py-2 px-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        type="submit" >Save</button>
                        <button 
                        className="w-32 py-2 px-2 text-blue-500 border-blue-500 border rounded hover:bg-gray-200"
                        onClick={() => setEditing(false)}
                        type="button" >Cancel</button>
                    </div>
                }
            </form>
        </div>
    );
}

function EditImages(props) {
    const {register, watch, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [addingNewImages, setAddingNewImages] = useState(false);
    const watchNewImages = watch('newImageFiles');

    async function setAsFrontImage(imagePath) {
        setLoading(true);
        const formData = new FormData();
        formData.append('productId', props.product.productId)
        formData.append('frontImagePath', imagePath)
        await api_UpdateProduct(formData)
        .then((response) => {
            console.log(response);
            props.onEdit();
        })
        .catch(err => console.log(err));
        setLoading(false);
    }

    async function deleteImage(imageId) {
        setLoading(true);
        const formData = new FormData();
        formData.append('productId', props.product.productId)
        formData.append('DeletedImagesIds', [imageId])
        await api_UpdateProduct(formData)
        .then((response) => {
            console.log(response);
            props.onEdit();
        })
        .catch(err => console.log(err));
        setLoading(false);
    }

    async function addNewImages(data) {
        setLoading(true);
        const formData = new FormData();
        formData.append('productId', props.product.productId)
        for (let i = 0; i < watchNewImages.length; i++) {
            formData.append('newImageFiles',watchNewImages[i]);
        }

        await api_UpdateProduct(formData)
        .then((response) => {
            console.log(response);
            props.onEdit();
        })
        .catch(err => console.log(err));
        setLoading(false);
    }

    return (
        <div className="relative mb-4">
            {loading &&
                <div className="absolute top-0 bottom-0 right-0 left-0 bg-[rgba(255,255,255,0.5)]">
                    <AutorenewIcon className="w-8 h-8 animate-spin "/>
                </div>
            }
            <div className="mb-4 flex gap-2 items-center">
                <p className="text-lg font-semibold">Images</p>
            </div>

            <div className="flex gap-2 mb-4">
                {selectedImage &&
                <>
                    {selectedImage[1] !== props.product.frontImagePath &&
                        <button onClick={() => setAsFrontImage(selectedImage[1])}
                        className="px-2 py-2 text-blue-500 rounded hover:bg-gray-200 hover:underline"
                        >Set as Front Image</button>
                    }

                    {selectedImage[1] !== props.product.frontImagePath &&
                    <button onClick={() => deleteImage(selectedImage[0])}
                    className="px-2 py-2 text-red-500 rounded hover:bg-gray-200 hover:underline"
                    >Delete</button>
                    }
                </>
                }
            </div>
            
            <ProductImagesView setImage={setSelectedImage} customizing={true} product={props.product}/>

            <div className="my-4">
            {addingNewImages ? <>
                <p className="mb-4 text-lg font-semibold">Add Images</p>
                <form onSubmit={handleSubmit(addNewImages)}>
                    <input 
                    {...register('newImageFiles', 
                    {required:'Provide images'})}
                    type="file" multiple/>
                    <ErrorMessage errors={errors} name="newImageFiles"
                    render={({ message }) => <p className="text-red-500">{message}</p>}/>
                    {watchNewImages && watchNewImages.length > 0 &&
                    <div className="mt-4 flex gap-2">
                        <button 
                        className="w-32 py-2 px-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        type="submit">Upload</button>
                        <button 
                        className="w-32 py-2 px-2 text-blue-500 border-blue-500 border rounded hover:bg-gray-200"
                        onClick={() => setAddingNewImages(false)}
                        type="button" >Cancel</button>
                    </div>
                    }
                </form>
            </> :
            <div>
                <span onClick={() => setAddingNewImages(true)}
                className="px-2 py-2 text-blue-500 hover:bg-gray-200 hover:underline cursor-pointer rounded">
                    Add New Images</span>
            </div>
            }    
            </div>
        </div>
    );
}