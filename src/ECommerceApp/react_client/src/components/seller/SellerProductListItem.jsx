import { useNavigate } from "react-router-dom";

export default function SellerProductListItem({product, setEditingProductId}) {
    const navigate = useNavigate();
    return (
        <div className="flex w-full border border-gray-300">
            <div
            className="w-36 h-36 border-r border-gray-300 cursor-pointer hover:p-1 transition-all
            flex items-center justify-center">
                <img className="object-contain h-full w-full" 
                src={`https://localhost:7077/${product.frontImagePath}`} />
            </div>
            <div className="py-2 px-4">
                <p className="text font-semibold">{product.productName}</p>
                <div>
                    <p onClick={() => {navigate(`/Product/${product.productId}`)}}
                    className="text-purple-500 hover:underline cursor-pointer">Go to store page</p>
                    <p onClick={() => {setEditingProductId(product.productId)}}
                    className="text-blue-500 hover:underline cursor-pointer">Edit</p>
                </div>
            </div>
        </div>
    );
}