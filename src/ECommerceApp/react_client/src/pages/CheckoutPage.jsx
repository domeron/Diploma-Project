import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import { useLocation } from "react-router-dom";
import { api_GetProductById } from "../api/product_api";

export default function CheckoutPage() {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        setProducts(location.state.products);
    }, [])
    
    return (
        <>
        <SubHeader/>
        <Header/>
        <div className='mx-auto max-w-6xl py-4'>
            <div className="flex gap-4 items-start">
                <div className="grow">
                    <ShipSection/>
                    <div className="flex flex-col gap-4 my-4 border border-gray-400">
                        <div className="py-4 px-6 border-b">
                            <p className="text-2xl font-semibold">Review Items and shipping</p>
                        </div>
                        {products.map((p, index) => <ProductCheckoutListItem product={p}/>)}
                    </div>
                </div>
                <div className='w-80 py-4 px-4 border border-gray-400'>
                        <div>
                            <button
                            className='w-full bg-blue-500 py-2 px-2 shadow hover:bg-blue-700 rounded'>
                                <p className='text-lg font-semibold text-white mx-auto'>Go to checkout</p>
                            </button>
                        </div>
                        <div className='flex justify-between my-4'>
                            <p>Items({products.length})</p>
                        </div>
                        <div className='py-3 flex justify-between items-center border-t border-gray-300'>
                            <p className='text-xl font-semibold'>Total</p>
                        </div>
                    </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}

function ProductCheckoutListItem({product}) {
    return (
        <div className="flex px-6 py-6 border-b border-gray-300">
            <div onClick={() => {}}
            className="w-36 h-36 border border-gray-300 cursor-pointer hover:p-1 transition-all
            flex items-center justify-center">
                <img className="object-contain h-full w-full" 
                src={`https://localhost:7077/${product.frontImagePath}`} />
            </div>
    
            <div className="grow px-4 flex flex-col">
                <p className="cursor-pointer hover:text-blue-500 hover:-translate-y-1 transition-transform
                text-xl font-semibold">{product.productName}</p>
                <p className="text-xl text-gray-700">${product.priceUSD}</p>
                <div className="max-w-xs my-4">
                    <p className="text-gray-500">This item may be subject to duties and taxes upon delivery</p>
                </div>
            </div>
        </div>
    );
}

function ShipSection() {
    return (
        <div className="py-4 px-4 border border-gray-400">
            <p className="text-2xl font-semibold">Ship To</p>
        </div>
    );
}