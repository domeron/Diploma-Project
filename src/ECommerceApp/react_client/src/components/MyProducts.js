import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import EditProductForm from "./EditProductForm";

export default function MyProducts() {
    const {user, setUser} = useContext(UserContext);
    const [myProducts, setMyProducts] = useState();
    const [editingProduct, setEditingProduct] = useState(null);

    async function getMyProducts() {
        await axios.get(`https://localhost:7077/Product/Seller/${user.sellerId}`)
        .then((response) => {
            console.log(response.data);
            setMyProducts(response.data);
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
    }


    useEffect(() => {
        getMyProducts();
    }, []);

    function handleEdit(product) {
        console.log(product);
        setEditingProduct(product);
    }

    function handleBackToMyProducts() {
        setEditingProduct(null); 
        getMyProducts();
    }

    return (
        <div>

            {editingProduct ? 
            (<>
                <div className="flex gap-2 items-center">
                    <button className="py-1 px-2 border-2 rounded" 
                    onClick={handleBackToMyProducts}>Back</button>
                    <div className="text-xl font-semibold">Edit Product: {editingProduct.productName}</div>
                </div>
                <EditProductForm product={editingProduct} onReturn={handleBackToMyProducts}/>
            </>) : 
            (<>
                <div className="text-xl font-semibold">My Products</div>
                {myProducts && myProducts.length > 0 ? (
                    <> {myProducts.map((product) => {
                        return <ProductListItem product={product} handleEdit={handleEdit}/>
                    })} </>
                ) : (
                    <> <h1>No products</h1> </>
                )}
            </>)}
        </div>
    );
}

function ProductListItem({product, handleEdit}) {
    return (
        <div key={product.productId} className="border-2 mt-2 px-4 py-2 rounded-md flex">
            <div className="w-4/6">
                <p className="text-lg font-semibold">{product.productName}</p>
                <div className="flex gap-x-4">
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: {product.priceUSD}$</p>
                </div>
                <div className="collapse">
                    <input type="checkbox" /> 
                    <div className="flex collapse-title text-base text-gray-500 underline">
                        Description
                    </div>
                    <div className="collapse-content mt-2"> 
                        <p className="text-sm px-4 py-2 border-2 rounded-md">{product.productDescription}</p>
                    </div>
                </div>
            </div>
            <div className="grow flex flex-col justify-end">
                <div className="flex gap-2 justify-end">    
                    <button className="bg-blue-500 text-white py-1 px-2 w-16 rounded-md hover:bg-sky-700">View</button>
                    <button className="bg-blue-500 text-white py-1 px-4 w-16 rounded-md hover:bg-sky-700"
                        onClick={() => handleEdit(product)}>Edit</button>
                </div>
            </div>
        </div>
    );
}