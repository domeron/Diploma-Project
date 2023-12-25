import { useState, useEffect } from "react";
import { api_GetAllCategories } from "../../API/ProductCategoryAPI";
import CategoryCreateForm from "../forms/CategoryCreateForm";
import CategoryRenameForm from "../forms/CategoryRenameForm";

export default function AdminProductCategory() {
    const [categories, setCategories] = useState([])
    const [creating, setCreating] = useState(false)
    const [renaming, setRenaming] = useState(false)

    useEffect(() => {
        loadCategories();
    }, [])

    async function loadCategories()
    {
        await api_GetAllCategories()
        .then((data) => {
            setCategories(data);
        })
        .catch(err => console.log(err.response))
    }
    return (
        <div className="px-6 py-6">
            {categories.length > 0 && creating &&
            <div>
                <CategoryCreateForm categories={categories}/> 
                <button className="py-2 px-4 border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white"
                onClick={() => setCreating(false)}>Cancel</button>
            </div>
            }   

            {categories.length > 0 && renaming &&
            <div>
                <CategoryRenameForm categories={categories}/> 
                <button className="py-2 px-4 border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white"
                onClick={() => {
                    setCreating(false)
                    setRenaming(false)
                }}>Cancel</button>
            </div>
            }

            {!creating && !renaming &&
            <div className="flex gap-4">
                <button className="py-2 px-4 border border-gray-500 hover:bg-gray-300"
                onClick={() => setCreating(true)}>Add Category</button>

                <button className="py-2 px-4 border border-gray-500 hover:bg-gray-300"
                onClick={() => setRenaming(true)}>Rename Category</button>
            </div>
            }
        </div>
    );
}