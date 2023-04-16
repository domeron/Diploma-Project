import { useNavigate } from "react-router-dom";
import StarRating from "../elements/StarRating";

export default function ProductListItem({product}) {
    const navigate = useNavigate();

    return (
        <div className="flex gap-4 border border-gray-300 shadow hover:shadow-lg">
            <div onClick={() => {}}
            className="w-48 h-48 border-r border-gray-300 cursor-pointer hover:p-1 transition-all
            flex items-center justify-center">
                <img className="object-contain h-full w-full" 
                src={`https://localhost:7077/${product.frontImagePath}`} />
            </div>

            <div className="grow py-4">
                <div className="flex">
                    <p onClick={() => navigate(`/Product/${product.productId}`)}
                    className="cursor-pointer hover:text-blue-500 hover:-translate-y-1 transition-transform
                    text-lg font-semibold">{product.productName}</p>
                </div>
                <div className="flex gap-1 mb-1">
                    <p className="text-lg">{product.rating}</p>
                    <StarRating rating={product.rating}/>
                    <p className="text-blue-500">({product.reviewsCount})</p>
                </div>
                <p className="text-2xl">${product.priceUSD}</p>
            </div>
        </div>
    );
}