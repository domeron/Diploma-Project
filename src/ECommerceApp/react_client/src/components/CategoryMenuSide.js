import { useState, useEffect } from "react";
import axios from "axios";
import {ReactComponent as ChevronRight} from "../assets/svg/chevron_right.svg";
import {ReactComponent as ChevronDown} from "../assets/svg/chevron_down.svg";
import {ReactComponent as ChevrunUp} from "../assets/svg/chevron_up.svg";

export default function CategoryMenuSide({onCategoryChoose}) {
    const [categories, setCategories] = useState([]);
    const [choosedCategory, setChoosedCategory] = useState();
    
    useEffect(() => {
        loadCategories();
      }, [])

    async function loadCategories() {
        await axios.get('https://localhost:7077/ProductCategory/Top')
        .then((response) => {
            setCategories(response.data);
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
        onCategoryChoose(category.id);
    }

    return (
        <>
        <div className="w-full">
            <div className="border">
                {categories.map((cat, index) => {
                    return (
                        <CategoryTab key={index} category={cat} level={1} 
                        onCategoryChoose={onCategoryChoose}/>
                    );
                })}
            </div>
        </div>
        </>
    );
}

function CategoryTab({category, level, onCategoryChoose}) {
    const [expanded, setExpanded] = useState(false);
    function handleCategoryExpand() {
        setExpanded(!expanded)
    }
    return (
    <>
        <div className='flex justify-between items-center px-2'>
            <span className={`py-2 grow cursor-pointer
            ${level===2 && 'pl-6 '} 
            ${level===3 && 'pl-10 '}`}
            onClick={() => onCategoryChoose(category.id)}>
                {category.categoryName}</span>
            {category.childCategories.length > 0 &&
            (!expanded ? 
            <ChevronDown onClick={handleCategoryExpand} className="cursor-pointer h-6"/> :
            <ChevrunUp onClick={handleCategoryExpand} className="cursor-pointer h-6"/>)
            }
        </div>
        <hr></hr>
        {expanded && 
        <div className="">
            {category.childCategories.map((sub, index) => {
                return (
                    <CategoryTab onCategoryChoose={onCategoryChoose} key={index} category={sub} level={level+1}/>
                );
            })}
        </div>
        }
    </>);
}