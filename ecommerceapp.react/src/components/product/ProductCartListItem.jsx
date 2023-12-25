import { useNavigate } from "react-router-dom";

export default function ProductCartListItem({product, onProductDeleteFromCart}) {
    const navigate = useNavigate();

    async function handleDeleteProduct() {
        onProductDeleteFromCart(product.productId)
    }

    return (
        <div className="flex border border-gray-400 shadow hover:shadow-md bg-white">
            <div onClick={() => {}}
            className="w-32 h-32 shrink-0 border-r border-gray-300 cursor-pointer hover:p-1 transition-all
            flex items-center justify-center">
                <img className="object-contain h-full w-full" 
                src={`https://localhost:7077/${product.frontImagePath}`} />
            </div>
    
            <div className="grow py-4 px-4 flex">
                <div className="grow">
                    <p onClick={() => navigate(`/Product/${product.productId}`)}
                    className="cursor-pointer hover:text-blue-500 hover:-translate-y-1 transition-transform
                    text-lg ">{product.productName}</p>
                </div>

                <div className="w-48 shrink-0 flex flex-col justify-between items-end">
                    <p className="text-2xl">${product.priceUSD}</p>
                    <button onClick={handleDeleteProduct}
                    className="py-1 px-2 text-red-500 hover:bg-gray-200 hover:underline rounded">
                        Remove From Cart</button>
                </div>
            </div>
        </div>
    );
}
