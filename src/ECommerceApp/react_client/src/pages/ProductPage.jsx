import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api_AddProductToUserCart, api_GetProductById, api_IsProductExistInUserCart } from "../api/product_api";
import ProductImagesView from "../components/product/ProductImagesView";
import ProductReviews from "../components/product/ProductReviews";
import { Payment } from "styled-icons/material";
import { Cart } from "styled-icons/fluentui-system-filled";
import { HeartOutlined } from "styled-icons/entypo";
import SubHeader from "../components/SubHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../App";
import { CheckCircleFill } from "styled-icons/octicons";

export default function ProductPage() {
    const params = useParams();
    const [product, setProduct] = useState(null)
    const {user} = useContext(UserContext)
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        if(params.productId !== null) {
            loadProduct(params.productId)
        }
    }, [params])

    useEffect(() => {
        if(user !== null && product !== null) {
            checkIfProductInUserCart(product.productId, user.userId)
        } else {
            setAddedToCart(false)
        }
    }, [product, user])

    async function loadProduct(productId) {
        await api_GetProductById(productId)
        .then(async (data) => {
            setProduct(data)
            console.log(data);
        })
        .catch(err => console.log(err))
    }

    async function handleAddToCart() {
        console.log('add to cart')
        if(user !== null && !addedToCart) {
            await api_AddProductToUserCart(product.productId, user.userId)
            .then((data) => {
                setAddedToCart(true)
            })
            .catch(err => console.log(err));
        }
    }

    async function checkIfProductInUserCart(productId, userId) {
        await api_IsProductExistInUserCart(productId, userId)
        .then((data) => {
            setAddedToCart(data)
        })
        .catch(err => console.log(err));
    }

    return (
        <>
        <SubHeader/>
        <Header/>
        <div className='mx-auto max-w-6xl py-4'>
        {product &&
        <div>
            <div className="flex gap-6">
                <ProductImagesView product={product}/>

                <div className="grow">
                    <div className="pb-4 border-b border-gray-300">
                        <p className="text-xl font-semibold">{product.productName}</p>
                    </div>

                    <div className="flex py-4 border-b border-gray-300">
                        <div className="grow">
                            <div className="flex gap-2">
                                <p className="text-lg">Price:</p>
                                <p className="text-3xl font-semibold">${product.priceUSD}</p>
                            </div>
                        </div>
                        <div className="w-52 flex flex-col gap-2">
                            <button className="py-2 px-6 flex gap-2 items-center bg-green-500 w-full
                            hover:bg-blue-700"> 
                                <Payment className="w-6 text-white"/>
                                <p className="text-white">Purchase</p>
                            </button>
                            <button onClick={handleAddToCart}
                            className="py-2 px-6 flex gap-2 items-center bg-blue-500 hover:bg-blue-700 w-full"
                            disabled={addedToCart}> 
                                <Cart className="w-6 text-white"/>
                                <p className="text-white">
                                    {addedToCart ? 'Added to Cart' : 'Add to Cart'}</p>
                            </button>
                            <button className="py-2 px-6 flex gap-2 items-center bg-violet-500 w-full">     
                                <HeartOutlined className="w-6 text-white"/>
                                <p className="text-white">Add to Favorites</p>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <ProductReviews product={product}/>
        </div>
        }
        </div>
        <Footer/>
        </>
    );
}