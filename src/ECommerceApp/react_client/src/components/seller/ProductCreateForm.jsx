import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useContext, useEffect, useState } from "react";
import { api_CreateProduct } from "../../api/product_api";
import { SellerContext } from "../../pages/SellerDashboard";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function ProductCreateForm({onCreate, categories}) {
    const {seller} = useContext(SellerContext);
    const { register, handleSubmit, watch, setValue, setError, formState: { errors } } = useForm();
    const watchImages = watch('imageFiles')
    
    useEffect(() => {
        console.log(watchImages)
    }, [watchImages])

    async function handleCreateProduct(data) {
        console.log(data);
        const formData = new FormData();
        formData.append('productName', data.productName);
        formData.append('priceUSD', data.priceUSD);
        formData.append('quantity', data.quantity);
        formData.append('productDescription', data.productDescription);
        formData.append('categoryId', data.categoryId);
        formData.append('sellerId', seller.sellerId);

        for (let i = 0; i < watchImages.length; i++) {
            formData.append('imageFiles',watchImages[i]);   
        }

        await api_CreateProduct(formData)
        .then((responseData) => {
            console.log(responseData)
            onCreate();
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleCreateProduct)}>
                <div className="mb-4 w-64">
                    <p className="mb-4 text-lg font-semibold">Product Name</p>
                    <input 
                    {...register('productName')}
                    className="w-full py-1 px-2 border border-gray-400 rounded-sm" type="text"/>
                </div>

                <div className="mb-4 w-64">
                    <p className="mb-4 text-lg font-semibold">Price (USD)</p>
                    <input 
                    {...register('priceUSD')}
                    className="w-full py-1 px-2 border border-gray-400 rounded-sm" 
                    type="number" step="0.01"/>
                </div>

                <div className="mb-4 w-64">
                    <p className="mb-4 text-lg font-semibold">Quantity</p>
                    <input 
                    {...register('quantity')}
                    className="w-full py-1 px-2 border border-gray-400 rounded-sm" type="number"/>
                </div>

                <div className="mb-4 border-b border-gray-400">
                    <p className="mb-4 text-lg font-semibold">Category</p>
                    <CategoryChoose categories={categories} setValue={setValue}/>
                </div>

                <div className="mb-4">
                <p className="mb-4 text-lg font-semibold">Description</p>
                    <textarea 
                    {...register('productDescription')}
                    className="w-full h-48 py-1 px-2 border border-gray-400 rounded-sm"/>
                </div>

                <div className="mb-4">
                    <p className="mb-4 text-lg font-semibold">Images</p>
                    <input 
                    {...register('imageFiles', 
                    {required:'Provide images'})}
                    type="file" multiple/>
                    <ErrorMessage errors={errors} name="imageFiles"
                    render={({ message }) => <p className="text-red-500">{message}</p>}/>
                    
                    {watchImages && watchImages.length > 0 &&
                    <div className="my-4">
                        <ImagesView imageFiles={watchImages}/>
                    </div>
                    }
                </div>


                <div>
                    <button type="submit"
                    className="py-1 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">
                        <p>Create Product</p>
                    </button>
                </div>
            </form>
        </div>
    );
}

function ImagesView({imageFiles}) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [images, setImages] = useState([]);

    useEffect(() => {
        console.log('useEffect int imagesView')
        setImages(Array.from(imageFiles).map((imageFile) => 
            URL.createObjectURL(imageFile)
            )
        );
    }, [imageFiles])

    return (
        <div className="flex items-start gap-4">
            {images && images.length > 0 &&
            <>
            <div className="w-96 h-96 border border-gray-400">
                <img src={images[focusedIndex > -1 ? focusedIndex : selectedIndex]} 
                alt='image' className="w-full h-full object-contain"/>
            </div>
            
            <div className="grow flex flex-wrap gap-1">
                {images.map((image, index) => {
                    return <ProductImageThumbnail key={index} image={image} index={index}
                    setSelectedIndex={setSelectedIndex}
                    setFocusedIndex={setFocusedIndex}/>
                })}
            </div>
            </>
            }
        </div>
    );
}

function ProductImageThumbnail({image, setSelectedIndex, setFocusedIndex, index}) {
    return (
        <div 
        onMouseEnter={() => setFocusedIndex(index)}
        onMouseLeave={() => setFocusedIndex(-1)}
        onClick={() => setSelectedIndex(index)}
        className="w-16 h-16 border border-gray-400 cursor-pointer hover:border-blue-500">
            <img src={image} alt="img thumbnail" className="w-full h-full object-contain"/>
        </div>
    );
}

export function CategoryChoose({disabled=false, categories, setValue=null, initialCategoryId}) {
    const [topCategory, setTopCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [subsubCategory, setSubSubCategory] = useState(null);

    useEffect(() => {
        console.log('useEffect In CategoryChoose depending on initialCategoryId')
        if(initialCategoryId) {
            categories.map((top) => {
                if(top.id === initialCategoryId) setTopCategory(top);
                else {
                    top.childCategories.map((sub) => {
                        if(sub.id === initialCategoryId) {
                            setTopCategory(top);
                            setSubCategory(sub);
                        } else {
                            sub.childCategories.map((subsub) => {
                                if(subsub.id === initialCategoryId) {
                                    setTopCategory(top);
                                    setSubCategory(sub);
                                    setSubSubCategory(subsub);
                                }
                            })
                        }
                    })
                }
            })
        }
    }, [initialCategoryId])

    useEffect(() => {
        if(setValue) {
            if(subsubCategory !== null) {
                setValue('categoryId', subsubCategory.id)
            } else if (subCategory !== null) {
                setValue('categoryId', subCategory.id)
            } else if(topCategory !== null) {
                setValue('categoryId', topCategory.id)
            }
        }
    }, [topCategory, subCategory, subsubCategory])
    return (
        <>
        <div className="flex gap-1 my-4">
            {topCategory && 
            <div className="flex gap-1">
                <p>{topCategory.categoryName}</p>
            </div>}
            {subCategory && 
            <div className="flex gap-1 items-center">
                <ChevronRightIcon className="w-5 h-5 text-gray-500"/>
                <p>{subCategory.categoryName}</p>
            </div>}
            {subsubCategory && 
            <div className="flex gap-1 items-center">
                <ChevronRightIcon className="w-5 h-5 text-gray-500"/>
                <p>{subsubCategory.categoryName}</p>
            </div>}
        </div>

        <div className="flex gap-4 mb-6">
            <select value={topCategory ? topCategory.id : -1}
            className="py-1 px-2 border border-gray-400 rounded-sm" disabled={disabled}
            onChange={(e) => {
                if(e.target.value != -1) {
                    setTopCategory(categories.find((c) => c.id == e.target.value))
                    setSubCategory(null)
                    setSubSubCategory(null)
                } else {
                    console.log('aa')   
                    setSubSubCategory();
                    setSubCategory();
                    setTopCategory();
                }
            }}>
                <option value={-1}>Choose Category</option>
                {categories.map((topCategory, index) => {
                    return <option value={topCategory.id} key={index}>{topCategory.categoryName}</option>
                })}
            </select>

            {topCategory && topCategory.childCategories.length > 0 &&
            <select value={subCategory ? subCategory.id : -1} disabled={disabled}
            className="py-1 px-2 border border-gray-400 rounded-sm"
            onChange={(e) => {
                if(e.target.value != -1)
                    setSubCategory(topCategory.childCategories.find((c) => c.id == e.target.value))
                else {
                    setSubCategory(null)
                    setSubSubCategory(null)
                }
            }}>
                <option value={-1}>Choose Subcategory</option>
                {topCategory.childCategories.map((sub, index) => {
                    return <option value={sub.id} key={index}>{sub.categoryName}</option>
                })}
            </select>
            }

            {topCategory && subCategory && subCategory.childCategories.length > 0 &&
            <select value={subsubCategory ? subsubCategory.id : -1} disabled={disabled}
            className="py-1 px-2 border border-gray-400 rounded-sm"
            onChange={(e) => {
                if(e.target.value != -1)
                    setSubSubCategory(subCategory.childCategories.find((c) => c.id == e.target.value))
                else {
                    setSubSubCategory(null)
                }
            }}>
                <option value={-1}>Choose Subcategory</option>
                {subCategory.childCategories.map((sub, index) => {
                    return <option value={sub.id} key={index}>{sub.categoryName}</option>
                })}
            </select>
            }
        </div>
        </>
    )
}