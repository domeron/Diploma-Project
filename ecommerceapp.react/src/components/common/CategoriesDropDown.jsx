import { useContext, useEffect, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ProductListContext } from "../../context/ProductListContext";

export default function CategoriesDropDown({categories, firstExpanded=false})
{
    const {categoryId, setCategoryId, categoryPage} = useContext(ProductListContext)
    const [selectedId, setSelectedId] = useState(0);
    const allCat = {
        id:0,
        categoryName:'All Categories', 
        childCategories:[]
    };

    useEffect(() => {
        setSelectedId(categoryId)
    }, [categoryId])

    useEffect(() => {
        console.log(selectedId);
        if(selectedId !== 0)
            setCategoryId(selectedId)
        console.log('firstExpanded: ' + firstExpanded)
    }, [selectedId, setCategoryId, firstExpanded])
    

    return (
        <div className={`w-64 shrink-0 shadow-sm ${categoryPage && 'border-t border-gray-300'}`}>
            {!categoryPage && <CategoryTab category={allCat} 
            selectedId={selectedId} setSelectedId={setSelectedId} level={1}/>}

            {categories.map((category, index) => 
                <CategoryTab category={category} key={index} selectedId={selectedId} setSelectedId={setSelectedId} level={1} expanded={firstExpanded && index === 0}/>)}
        </div>
    );
}

function CategoryTab({category, selectedId, setSelectedId, level, expanded=false}) {
    const [expand, setExpand] = useState(expanded)


    function handleExpand(e)
    {
        e.stopPropagation();
        setExpand(!expand);
    }

    function handleClick()
    {
        setSelectedId(category.id)
    }

    return (
        <>
            <div className={`flex  justify-between cursor-pointer border-b border-x border-gray-300
            ${category.id === 0 && 'border-t'}
            ${level === 1 && ''}
            ${level === 2 && ''}
            ${level === 3 && ''}
            ${selectedId !== category.id ? 'bg-white hover:bg-gray-100' : 'bg-gray-200 '}`}>
                <p className={`py-2 grow 
                ${selectedId !== category.id ? 'hover:text-blue-500' : 'font-semibold'}
                ${level === 1 && 'pl-4'}
                ${level === 2 && 'pl-10'}
                ${level === 3 && 'pl-16'}`}
                    onClick={handleClick}>
                    {category.categoryName}
                </p>
                
                {category.childCategories.length > 0 && 
                <div className="px-2 flex items-center group"
                onClick={handleExpand}>
                    {expand ? 
                        <ExpandLess className="text-blue-500 group-hover:scale-150 group-hover:transition-all"/> 
                    :   <ExpandMore className=" group-hover:scale-150 group-hover:transition-all"/>}
                </div>}
            </div>

        {category.childCategories.length > 0 &&
            <>
            {expand && category.childCategories.map((child, index) =>
            <CategoryTab category={child} key={index} selectedId={selectedId} setSelectedId={setSelectedId} level={level+1}/>)}
            </>
        }
        </>
    );
}