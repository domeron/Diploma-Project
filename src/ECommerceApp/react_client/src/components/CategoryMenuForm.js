import { useState, useEffect } from "react";
import axios from "axios";

export default function CategoryMenuForm({onCategoryChoose, initialCategory = null}) {
    const [categories, setCategories] = useState([]);
    const [choosedCategory, setChoosedCategory] = useState(initialCategory);
    const [choosingCategory, setChoosingCategory] = useState(false);
    const [focusedCategory, setFocusedCategory] = useState();
    const [focusedSub, setFocusedSub] = useState();
    const [focusedSubSub, setFocusedSubSub] = useState();
    
    useEffect(() => {
        loadCategories();
      }, [])

    async function loadCategories() {
        await axios.get('https://localhost:7077/ProductCategory/Top')
        .then((response) => {
            setCategories(response.data);
            console.log(categories);
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

    function handleCategoryChoose(category) {
        setChoosedCategory(category);
        setChoosingCategory(false);
        onCategoryChoose(category.id);
    }

    return (
        <>
        {choosedCategory && 
            <span className="py-2 px-2 border-2">{choosedCategory.categoryName}</span>
        }
        <button type="button" className="bg-blue-500 px-2 py-2 text-white"
        onClick={() => setChoosingCategory(!choosingCategory)}>
            {choosingCategory ? 'Cancel' : 'Choose Category'}</button>
        {choosingCategory && 
        <div className="flex w-full">
            <div className="flex flex-col w-56 border">
                {categories.map((cat) => {
                    return (
                        <div className={`px-2 py-2 hover:bg-gray-300 cursor-pointer 
                        ${focusedCategory && focusedCategory.id === cat.id && 'bg-gray-300' }`}
                        onMouseEnter={() => {setFocusedSub(null); setFocusedCategory(cat);}}
                        onClick={() => handleCategoryChoose(cat)}
                        key={cat.id}>{cat.categoryName}</div>
                    );
                })}
            </div>
            {focusedCategory &&
            <div className="flex flex-col w-56 border">
                {focusedCategory.childCategories.length > 0 && 
                focusedCategory.childCategories.map((sub) => {
                    return (
                        <div className={`px-2 py-2 hover:bg-gray-300 cursor-pointer
                        ${focusedSub && focusedSub.id === sub.id && 'bg-gray-300'}`}
                        onMouseEnter={() => {setFocusedSub(sub)}}
                        onClick={() => handleCategoryChoose(sub)}
                        key={sub.id}>{sub.categoryName}</div>
                    );
                })}
            </div>}
            {focusedSub &&
            <div className="flex flex-col w-56 border"
            onMouseLeave={() => setFocusedSubSub(null)}>
                {focusedSub.childCategories.length > 0 && 
                focusedSub.childCategories.map((subsub) => {
                    return (
                        <div className={`px-2 py-2 hover:bg-gray-300 cursor-pointer
                        ${focusedSubSub && focusedSubSub.id === subsub.id && 'bg-gray-300'}`}
                        onMouseEnter={() => {setFocusedSubSub(subsub)}}
                        onClick={() => handleCategoryChoose(subsub)}
                        key={subsub.id}>{subsub.categoryName}</div>
                    );
                })}
            </div>}
        </div>
        }
        </>
    );
}