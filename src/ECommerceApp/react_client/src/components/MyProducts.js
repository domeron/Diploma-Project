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

    async function handleSearchChange(e) {
        if(e.target.value === '') { 
            await getMyProducts();
            return;
        }
        await axios.get(`https://localhost:7077/Product/Seller/Search/${user.sellerId}/${e.target.value}`)
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
                <div className="text-xl font-semibold mb-4">My Products</div>
                <form className="flex gap-2 mb-8" onSubmit={(e) => {e.preventDefault()}}>
                    <input type="search" placeholder="search" className="py-2 px-2 border-2 rounded-md grow"
                    onChange={handleSearchChange}/>
                </form>
                {myProducts && myProducts.length > 0 ? (
                    <> {myProducts.map((product) => {
                        return <ProductListItem key={product.productId} product={product} handleEdit={handleEdit}/>
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
        <div className="flex gap-6 border-2 mt-2 px-4 py-4 rounded-md">
            <div className="w-40 h-40">
                <img className="object-contain h-40 w-40"
                alt="product image" src={`https://localhost:7077/${product.frontImagePath}`}/>
            </div>
            <div className="grow">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold">{product.productName}</p>
                    <div className="flex gap-2">    
                        <button className="bg-blue-500 text-white py-1 px-2 w-16 rounded-md hover:bg-sky-700">View</button>
                        <button className="bg-blue-500 text-white py-1 px-4 w-16 rounded-md hover:bg-sky-700"
                            onClick={() => handleEdit(product)}>Edit</button>
                    </div>
                </div>
                <div className="text-sm breadcrumbs">
                    <ul>
                        {product.category.parent && product.category.parent.parent && <li>{product.category.parent.parent.categoryName}</li>}
                        {product.category.parent && <li>{product.category.parent.categoryName}</li>}
                        <li>{product.category.categoryName}</li> 
                    </ul>
                </div>
                <div className="flex gap-x-4">
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: {product.priceUSD}$</p>
                </div>
                {/* <div className="max-w-prose">
                    <p>Description</p>
                    <p>{product.productDescription}</p>
                </div> */}
            </div>
        </div>
    );
}