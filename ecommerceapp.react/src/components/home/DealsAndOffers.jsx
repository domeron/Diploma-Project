import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_GetProducts } from "../../API/ProductAPI";
import CountdownTimer from "../common/CountdownTimer";

export default function DealsAndOffers() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadRandomProducts({SortOption: 5, PageSize: 5});
    }, [])

    async function loadRandomProducts(params) {
        await api_GetProducts(params)
        .then(setProducts)
        .catch(err => console.log(err));
    }

    function getRandomArbitrary(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor((Math.random() * (max - min + 1) + min) / 10) * 10; 
    }
      
    return (
        <div className="flex my-12 border border-gray-300 bg-white">
            <div className="flex flex-col shrink-0 w-72 py-2 px-4 group border-r border-gray-300">
                <p className="mb-2 text-lg font-semibold">New Years Sale</p>
                <p className="mb-2 text-gray-700">Until 31'st December</p>
                <CountdownTimer expiryTime={'31 december 2023 15:30:25'}/>
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
                                <p className="text-red-600 font-semibold text-sm">-{getRandomArbitrary(20, 60)}%</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}