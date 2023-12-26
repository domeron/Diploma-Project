import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_GetCategoryById } from "../../API/ProductCategoryAPI";
import { api_GetProducts } from "../../API/ProductAPI";

export default function CategoryBar({imgSrc, categoryId}) {
    const [category, setCategory] = useState();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if(categoryId)
            loadCategory(categoryId)
    }, [])

    useEffect(() => {
        if(category)
            loadRandomProducts({CategoryId: categoryId, PageSize: 8});
    }, [category])

    async function loadRandomProducts(params) {
        await api_GetProducts(params)
        .then(setProducts)
        .catch(err => console.log(err))
    }

    async function loadCategory(categoryId) {
        await api_GetCategoryById(categoryId)
        .then(setCategory)
        .catch(err => console.log(err));
    }

    return (
        category ?
        <div className="flex my-8 bg-white">
            <div onClick={() => navigate(`/Category/${category.id}`)}
            className="rounded-l group w-64 h-64 shrink-0 overflow-hidden relative cursor-pointer">
                <img src={imgSrc} alt={''}
                className="rounded-l w-full h-full scale-100 object-cover group-hover:scale-125 ease-in-out duration-300"/>
                <div className="rounded-l absolute top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,0.12)]">
                    <div className="px-6 py-4 font-semibold">
                        <p className="text-3xl text-white">{category.categoryName}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap grow items-start border border-gray-300 rounded-r">
                {products.map((p, index) => {
                    return(
                        <div onClick={() => navigate(`/Product/${p.productId}`)}
                        key={index} className={`w-1/4 h-1/2 px-2 pb-2 pt-3 flex border-gray-300 items-center hover:bg-gray-200 cursor-pointer
                        ${(index+1) % 4 !== 0 && 'border-r'} ${index < 4 && 'border-b'}`}>

                            <div className="grow flex flex-col h-full">
                                <p className="text-ellipsis overflow-hidden text-sm">{p.productName}</p>
                                <p>$ {p.priceUSD}</p>
                            </div>
                            <div className="w-20 h-20 shrink-0 border-black ">
                                <img alt={''}
                                src={`${process.env.REACT_APP_BASEURL}/${p.frontImagePath}`} className="w-full h-full object-cover"/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        : <></>
    );
}