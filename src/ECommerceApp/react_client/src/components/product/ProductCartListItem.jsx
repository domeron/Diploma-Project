import { useNavigate } from "react-router-dom";
import { api_DeleteProductFromUserCart } from "../../api/product_api";

export default function ProductCartListItem({product, onProductDeleteFromCart}) {
    const navigate = useNavigate();

    async function handleDeleteProduct() {
        onProductDeleteFromCart(product.productId)
    }

    return (
        <div className="flex border border-gray-400 shadow hover:shadow-md">
            <div onClick={() => {}}
            className="w-48 h-48 border-r border-gray-300 cursor-pointer hover:p-1 transition-all
            flex items-center justify-center">
                <img className="object-contain h-full w-full" 
                src={`https://localhost:7077/${product.frontImagePath}`} />
            </div>
    
            <div className="grow py-4 px-4 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <p onClick={() => navigate(`/Product/${product.productId}`)}
                        className="cursor-pointer hover:text-blue-500 hover:-translate-y-1 transition-transform
                        text-lg font-semibold">{product.productName}</p>
                        <p className="text-3xl">${product.priceUSD}</p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button onClick={handleDeleteProduct}
                    className="py-2 px-4 text-red-500 hover:bg-gray-200 hover:underline rounded-md">
                        Remove From Cart</button>
                </div>
            </div>
        </div>
    );
}
