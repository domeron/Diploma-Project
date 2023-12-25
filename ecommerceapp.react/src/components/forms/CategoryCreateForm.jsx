import { useForm } from "react-hook-form";
import { api_CreateProductCategory } from "../../API/ProductCategoryAPI";

export default function CategoryCreateForm({categories}) {
    const {register, handleSubmit, setError, formState: {errors}} = useForm();

    async function handleCreateCategory(data) {
        console.log(data);

        await api_CreateProductCategory(data)
        .then((responseData) => {
            console.log(responseData);
        })
        .catch(err => console.log(err.response));
    }

    return (
        <form className="mb-6 p-6 border border-gray-400"
        onSubmit={handleSubmit(handleCreateCategory)}>
            <div className="">
            <p>Category Name</p>
                <input 
                type="text" className="my-2 text-indigo border border-gray-300" 
                {...register('categoryName')}/>
            </div>

            <div>
                <p>Parent Category</p>
                <select className="my-2"
                {...register('parentCategoryId')}>
                    <option value={0}>None</option>
                    {categories.map((category, index) => {
                        return <option
                        value={category.id} key={index}>
                            {category.categoryName}
                        </option>
                    })}
                </select>
            </div>

            <div>
                <button 
                className="my-4 py-2 px-4 text-white font-semibold bg-green-500 border border-gray-500 hover:bg-green-600"
                type="submit">Submit</button>
            </div>
        </form>
    );
}