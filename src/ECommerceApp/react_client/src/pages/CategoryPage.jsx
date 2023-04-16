import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api_GetCategoryById } from "../api/category_api";
import { ChevronRight } from "styled-icons/entypo";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { api_GetAllProductsInCategory } from "../api/product_api";
import ProductListItem from "../components/product/ProductListItem";
import ProductGridView from "../components/product/ProductGridView";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import Footer from "../components/Footer";

export default function CategoryPage() {
    const params = useParams();
    const [category, setCategory] = useState(null)
    const [products, setProducts] = useState([])
    const [gridView, setGridView] = useState(false);

    useEffect(() => {
        loadCategory(params.categoryId);
    }, [params])

    useEffect(() => {
        if(category !== null) {
            loadProducts(category.id);
        }
    }, [category])

    async function loadCategory(categoryId) {
        await api_GetCategoryById(categoryId)
        .then((data) => {
            setCategory(data);
        })
    }

    async function loadProducts(categoryId) {
        await api_GetAllProductsInCategory(categoryId)
        .then(setProducts)
        .catch(err => console.log(err));
    }

    return (
        <>
        <SubHeader/>
        <Header/>
        <div className='m-auto max-w-6xl py-4'>
        {category &&
            <div>
                <CategoryBreadcrumbs category={category}/>
                
                <div className="my-6">
                    <p className="font-semibold text-3xl">{category.categoryName}</p>
                </div>

                <div className="flex gap-8">
                    <div className="">

                    <CategoryList category={category}/>

                    </div>

                    <div className="grow border-black">
                        <div className="py-2">
                            <p>Grid View</p>
                            <input type="checkbox" value={gridView} onChange={(e) => setGridView(!gridView)}/>
                        </div>
                        {products.length > 0 &&
                        <>
                        {gridView 
                        ?
                        <div className="flex gap-4 flex-wrap border">
                            {products.map((product, index) => {
                                return <ProductGridView key={index} product={product}/>
                            })}
                        </div>
                        :
                        <div className="flex flex-col gap-4">
                            {products.map((product, index) => {
                                return <ProductListItem  key={index} product={product}/>
                            })}
                        </div>
                        }
                        </>
                        }
                    </div>
                </div>
            </div>
        }
        </div>
        <Footer/>
        </>
    );
}

function CategoryBreadcrumbs({category}) {
    const navigate = useNavigate();
    return (
        <div className="flex gap-1 items-end">
            {category.parent && category.parent.parent && 
            <CategoryBreadcrumb category={category.parent.parent}/>}

            {category.parent && <CategoryBreadcrumb category={category.parent}/>}

            <p>{category.categoryName}</p>
        </div>
    );

    function CategoryBreadcrumb({category}) {
        return (
            <><p onClick={() => navigate(`/Category/${category.id}`)}
            className="hover:text-blue-500 hover:-translate-y-1 transition-transform cursor-pointer"
            >{category.categoryName}</p> 
            <ChevronRight className="w-5 text-gray-800"/></>
        );
    }
}

function CategoryList({category}) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if(category.parent === null) {
            setCategories(category.childCategories)
        } else if (category.parent.parent === null) {
            setCategories([{id: category.id, categoryName: `All In ${category.categoryName}`}, 
            ...category.childCategories])
        } else {
            api_GetCategoryById(category.parentCategoryId)
            .then((data) => {
                setCategories([{id: data.id, categoryName: `All In ${data.categoryName}`},
                    ...data.childCategories]);
            })
        }
        console.log(category);
    }, [category])

    return(
        <div>
            <p className="text-lg font-semibold">Categories</p>
            <div className="my-2 w-56 border border-gray-300 rounded shadow">
                {categories.map((cat, index) => {
                    return(
                        <CategoryTab key={index} category={cat} selected={category.id === cat.id}/>
                    );
                })}
            </div>
        </div>
    );

    function CategoryTab({category, selected}) {
        const navigate = useNavigate();
        return (
            <div onClick={() => navigate(`/Category/${category.id}`)}  
            className={`px-4 py-2 cursor-pointer flex justify-between 
            hover:text-blue-500 
            ${selected && 'bg-gray-100'}`}>
                <p>{category.categoryName}</p>
            </div>
        );
    }
}