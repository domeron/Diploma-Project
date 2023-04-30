import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api_AddProductToUserCart, api_GetProductById, api_IsProductExistInUserCart } from "../api/product_api";
import ProductImagesView from "../components/product/ProductImagesView";
import ProductReviews from "../components/product/ProductReviews";
import SubHeader from "../components/SubHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../App";

import PaymentIcon from '@mui/icons-material/Payment';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarRating from "../components/elements/StarRating";

export default function ProductPage() {
    const params = useParams();
    const navigate = useNavigate();

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

    function handlePurchase() {
        navigate(`/Checkout`, {state: {products: [product]}});
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
        <div className="z-10 bg-slate-100">
            <div className='mx-auto max-w-6xl bg-white border-x border-gray-400 px-8 py-6'>
                <div className="flex  mb-6">
                    <div onClick={() => navigate(-1)}
                    className="group flex gap-1 cursor-pointer hover:text-blue-700 items-center">
                        <ChevronLeftIcon className="w-6 group-hover:-translate-x-1 group-hover:transition-all"/>
                        <p className="text-lg">Back</p>
                    </div>
                </div>
                {product &&
                <div>
                    <div className="flex gap-4 bg-white">
                        <ProductImagesView product={product}/>

                        <div className=" grow bg-white">
                            <div className="flex items-start justify-between border-b border-gray-300">
                                <p className="text-2xl font-semibold">{product.productName}</p>
                                <div className="shrink-0 flex gap-2 items-center hover:text-blue-500 cursor-pointer">
                                    <p>Add To Favorites</p>
                                    <FavoriteBorderIcon className=""/>
                                </div>
                            </div>

                            <div className="flex py-4 border-b border-gray-300">
                                <div className="grow">
                                    <div className="mb-2 flex gap-2 items-end">
                                        <p className="text">Price:</p>
                                        <PriceTag price={product.priceUSD}/>
                                    </div>
                                    <div className="mb-2 flex gap-2 items-end">
                                        <p className="text">Rating:</p>
                                        <div className="flex items-start gap-1">
                                            <p className="text-xl">{product.rating}</p>
                                            <StarRating rating={product.rating} dimension={24}/>
                                            <p className="text-blue-500">({product.reviewsCount})</p>
                                        </div>
                                    </div>
                                    <div className="mb-2 flex gap-2 items-end">
                                        <p className="text">Items in Stock:</p>
                                        <p className="text-xl">{product.quantity}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 items-start">
                                    <button onClick={() => handlePurchase()}
                                    className="py-2 px-4 flex gap-2 bg-green-500 w-full rounded-md text-white
                                    hover:bg-green-700"> 
                                        <PaymentIcon/>
                                        <p>Buy Now</p>
                                    </button>
                                    <button onClick={handleAddToCart}
                                    className="py-2 px-4 flex gap-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
                                    disabled={addedToCart}> 
                                        {addedToCart 
                                        ? <CheckCircleOutlineIcon/>
                                        : <AddShoppingCartIcon/>}
                                        <p>{addedToCart ? 'Added to Cart' : 'Add to Cart'}</p>
                                    </button>
                                </div>
                            </div>

                            <div className="py-4">
                                <p className="font-semibold text-lg mb-4">About this item</p>
                                <div>
                                    <p className="font-semibold mb-2">Description:</p>
                                    <p className="text-justify">{product.productDescription}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ProductReviews product={product}/>
                </div>
                }
            </div>
        </div>
        <Footer/>
        </>
    );
}

export function PriceTag({price}) {
    return (
        <div className="flex items-start gap-[0.2em]">
            <p className="text-xl leading-none">$</p>
            <p className="font-semibold text-3xl leading-[0.75em]">{Math.floor(price)}</p>
            <p className="text-xl leading-none">{price.toString().split('.')[1] || '00'}</p>
        </div>
    )
}