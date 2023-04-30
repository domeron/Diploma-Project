import Footer from "../components/Footer";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import electronics_image from "../assets/Home/CategoryImages/Electronics.jpg"
import clothing_image from "../assets/Home/CategoryImages/Clothing.jpg"
import { useEffect, useState } from "react";
import { api_GetCategoryById } from "../api/category_api";
import { api_GetRandomProducts, api_GetRandomProductsInCategory } from "../api/product_api";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../components/elements/CountdownTimer";

export default function Home() {
    
    return (
        <>
        <SubHeader/>
        <Header/>
        <div className="bg-slate-50 py-6">
            <div className="max-w-6xl mx-auto">
                <CategoryBar imgSrc={clothing_image} categoryId={3}/>
                <DealsAndOffers/>
                <CategoryBar imgSrc={electronics_image} categoryId={1}/>
            </div>
        </div>
        <Footer/>
        </>
    );
}

function CategoryBar({imgSrc, categoryId}) {
    const [category, setCategory] = useState();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if(categoryId)
            loadCategory(categoryId)
    }, [])

    useEffect(() => {
        if(category)
            loadRandomProducts();
    }, [category])

    async function loadRandomProducts() {
        await api_GetRandomProductsInCategory(category.id, 8)
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
                <img src={imgSrc} alt="category image"
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
                                <img src={`https://localhost:7077/${p.frontImagePath}`} className="w-full h-full object-cover"/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        : <></>
    );
}

function DealsAndOffers() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadRandomProducts();
    }, [])

    async function loadRandomProducts() {
        await api_GetRandomProducts(5)
        .then(setProducts)
        .catch(err => console.log(err));
    }

    return (
        <div className="flex my-12 border border-gray-300 bg-white">
            <div className="flex flex-col shrink-0 w-64 py-2 px-4 group border-r border-gray-300">
                <p className="mb-2 text-lg font-semibold">Deals and Offers</p>
                <p className="mb-2 text-gray-700">Hygiene Equipments</p>
                <CountdownTimer expiryTime={'5 may 2023 15:30:25'}/>
            </div>
            
            <div className="flex grow">
                {products.map((p, index) => {
                    return (
                        <div onClick={() => navigate(`/Product/${p.productId}`)}
                        className={`py-3 px-4 w-1/5 flex flex-col items-center border-gray-300 cursor-pointer hover:bg-gray-200
                        ${index !== 0 && 'border-l'}`}
                        key={index}>
                            <div className="w-28 h-28">
                                <img src={`https://localhost:7077/${p.frontImagePath}`} className="w-full h-full object-cover"/>
                            </div>

                            <p className="my-2 w-full h-7 text-ellipsis overflow-hidden">{p.productName}</p>

                            <div className="py-1 px-4 bg-red-200 rounded-full">
                                <p className="text-red-600 font-semibold text-sm">-20%</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}