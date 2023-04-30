import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api_GetCategoryById, api_GetCategoryByIdWithParentsAndChildren } from "../api/category_api";
import { api_GetAllProductsInCategory } from "../api/product_api";
import ProductListItem from "../components/product/ProductListItem";
import ProductGridView from "../components/product/ProductGridView";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import Footer from "../components/Footer";
import GridListViewSelect from "../components/elements/GridListViewSelect";
import ProductSortSelect from "../components/elements/ProductSortSelect";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function CategoryPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null)
    const [products, setProducts] = useState([])
    const [isGridView, setIsGridView] = useState(false);

    useEffect(() => {
        loadCategory(params.categoryId);
    }, [params])

    useEffect(() => {
        if(category !== null) {
            loadProducts(category.id);
        }
    }, [category])

    async function loadCategory(categoryId) {
        await api_GetCategoryByIdWithParentsAndChildren(categoryId)
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
        <div className="bg-slate-50">
            <div className='m-auto max-w-6xl py-4'>
            {category &&
                <div>
                    <CategoryBreadcrumbs category={category}/>

                    <div className="flex gap-8">
                        <div className="">
                            <CategoryList category={category}/>
                        </div>

                        <div className="grow border-black">
                            <div className="flex gap-2 mb-4">
                                <GridListViewSelect state={isGridView} setState={setIsGridView}/>
                                <ProductSortSelect/>
                            </div>

                            {products.length > 0 &&
                            <>
                            {isGridView 
                            ?
                            <div className="flex flex-wrap">
                                {products.map((product, index) => {
                                    return <ProductGridView key={index} product={product}
                                    handleClick={() => navigate(`/Product/${product.productId}`)}/>
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
        </div>
        <Footer/>
        </>
    );
}

function CategoryBreadcrumbs({category}) {
    const navigate = useNavigate();
    return (
        category.parent ?
        <div className="flex gap-1 items-end mb-4">
            {category.parent.parent && 
            <CategoryBreadcrumb category={category.parent.parent}/>}

            <CategoryBreadcrumb category={category.parent}/>

            <p className="">{category.categoryName}</p>
        </div>
        : <></>
    );

    function CategoryBreadcrumb({category}) {
        return (
            <><p onClick={() => navigate(`/Category/${category.id}`)}
            className="hover:text-blue-500 hover:-translate-y-1 transition-transform cursor-pointer"
            >{category.categoryName}</p> 
            <ChevronRightIcon className="w-5 text-gray-800"/></>
        );
    }
}

function CategoryList({category}) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories([{id: category.id, categoryName: `All In ${category.categoryName}`}, 
        ...category.childCategories])
        console.log(category);
    }, [category])

    return(
        <div>
            <div className="mb-6">
                <p className="font-semibold text-3xl">{category.categoryName}</p>
            </div>
            <p className="font-semibold text-lg">Categories</p>
            <div className="my-2 w-64 border border-gray-400 rounded-sm shadow bg-white">
                {categories.map((cat, index) => {
                    return(
                        <CategoryTab key={index} category={cat} selected={category.id === cat.id}/>
                    );
                })}
            </div>
        </div>
    );

}
function CategoryTab({category, selected}) {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/Category/${category.id}`)}  
        className={`px-4 py-2 border-b  cursor-pointer flex justify-between 
        hover:text-blue-500 hover:bg-gray-100
        ${selected && 'bg-gray-100'}`}>
            <p>{category.categoryName}</p>
        </div>
    );
}