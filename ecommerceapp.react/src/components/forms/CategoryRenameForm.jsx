import { useForm } from "react-hook-form";
import { api_RenameProductCategory, api_UpdateProductCategory } from "../../API/ProductCategoryAPI";
import { useEffect, useState } from "react";

export default function CategoryRenameForm({categories}) {
    const {register, handleSubmit, setError, setValue,watch, formState: {errors}} = useForm();
    const watchCategory = watch('CategoryId', 0)
    const [category, setCategory] = useState(null)

    useEffect(() => {
        if(watchCategory != 0)
            setCategory(categories.find(e => e.id == watchCategory))
    }, [watchCategory])

    useEffect(() => {
        if(category != null) {
            console.log(category.parentCategoryId)
            if(category.parentCategoryId != null)
                setValue('ParentCategoryId', category.parentCategoryId)
            else
                setValue('ParentCategoryId', 0)
        }
    }, [category])

    async function handleEditCategory(data) {
        await api_RenameProductCategory(data.categoryId, data.name)
        .then((responseData) => {
            console.log(responseData);
        })
        .catch(err => console.log(err.response));
    }

    return (
        <form className="mb-6 p-6 border border-gray-400"
        onSubmit={handleSubmit(handleEditCategory)}>

            <div>
                <p>Choose Category:</p>
                <select className="my-2"
                {...register('categoryId', {required:true})}>
                    <option value={null}>None</option>
                    {categories.map((category, index) => {
                        return <option
                        value={category.id} key={index}>
                            {category.categoryName}
                        </option>
                    })}
                </select>
            </div>

            <div className="">
            <p>Category Name</p>
                <input 
                type="text" className="my-2 text-indigo border border-gray-300" 
                {...register('name')}/>
            </div>

            <div>
                <button 
                className="my-4 py-2 px-4 text-white font-semibold bg-green-500 border border-gray-500 hover:bg-green-600"
                type="submit">Submit</button>
            </div>
        </form>
    );
}