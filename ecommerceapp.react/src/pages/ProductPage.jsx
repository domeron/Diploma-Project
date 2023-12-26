import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductImagesView from "../components/product/ProductImagesView";
import ProductReviews from "../components/product/ProductReviews";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import TopHeader from "../components/common/TopHeader";
import { UserContext } from "../App";
import StarRating from "../components/product/StarRating";

import PaymentIcon from '@mui/icons-material/Payment';
import PriceTag from "../components/product/ProductPriceTag";
import BackButton from "../components/common/BackButton";
import { api_AddProductToUserCart, api_AddProductToUserFavorites, api_IsProductExistInUserCart, api_IsProductExistInUserFavorites, api_RemoveProductFromUserFavorites } from "../API/UserAPI";
import { api_GetProductById } from "../API/ProductAPI";
import { Favorite, FavoriteBorder, ShoppingBasket } from "@mui/icons-material";

export default function ProductPage() {
    const params = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null)
    const {user} = useContext(UserContext)
    const [addedToCart, setAddedToCart] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        if(params.productId !== null) {
            loadProduct(params.productId)
        }
    }, [params])

    useEffect(() => {
        if(user !== null && product !== null) {
            checkIfProductInUserCart(user.userId, product.productId)
            checkIfProductInUseFavorites(user.userId, product.productId)
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

    async function checkIfProductInUserCart(userId, productId) {
        await api_IsProductExistInUserCart(userId, productId)
        .then((data) => {
            setAddedToCart(data)
        })
        .catch(err => console.log(err));
    }

    async function checkIfProductInUseFavorites(userId, productId) {
        await api_IsProductExistInUserFavorites(userId, productId)
        .then((data) => {
            console.log(data)
            setIsFavorite(data)
        })
        .catch(err => console.log(err));
    }

    async function handleAddToFavorites() {
        await api_AddProductToUserFavorites(user.userId, product.productId)
        .then((data) => {
            console.log(data)
            setIsFavorite(true)
        }).catch(err => console.log(err))
    }

    async function handleRemoveFromFavorites() {
        
        await api_RemoveProductFromUserFavorites(user.userId, product.productId)   
        .then((data) => {
            console.log(data)
            setIsFavorite(false)
        }).catch(err => console.log(err))
        
    }

    return (
        <>
        <TopHeader/>
        <Header/>
        <div className="z-10 pt-8 pb-32 bg-slate-100">
            <div className='mb-4 mx-auto max-w-6xl '>
                <BackButton onBack={() => navigate(-1)}/>
            </div>
            <div className='px-12 pt-12 pb-32 mx-auto max-w-6xl bg-white border border-gray-300'>
                {product &&
                <div>
                    <div className="mb-20 flex gap-4 bg-white">
                        <ProductImagesView product={product}/>

                        <div className=" grow bg-white">
                            <div className="pb-2 border-b border-gray-300">
                                <p className="text-2xl mb-2 font-semibold">{product.productName}</p>

                                <div className="items-end flex justify-between">

                                <p className="text-sm text-gray-500">Product Id: {product.productId}</p>

                                {user && (isFavorite ?
                                <div onClick={handleRemoveFromFavorites}
                                className="group flex gap-1 items-center text-sm hover:text-blue-800 cursor-pointer">
                                    <p>Added To Favorites</p>
                                    <Favorite className="text-blue-600 group-hover:text-blue-800"/>
                                </div>
                                :
                                <div onClick={handleAddToFavorites}
                                className="group flex gap-1 items-center text-sm hover:text-blue-800 cursor-pointer">
                                    <p>Add To Favorites</p>
                                    <FavoriteBorder />
                                </div>
                                )}
                                </div>
                            </div>

                            <div className="flex flex-col py-4 border-b border-gray-300">
                                <div className="mb-2 flex gap-2 items-end">
                                    <p className="text">Price:</p>
                                    <PriceTag price={product.priceUSD}/>
                                </div>
                                <div className="mb-2 flex gap-2 items-end">
                                    <p className="text">Rating:</p>
                                    <div className="flex items-start gap-1">
                                        <p className="text-xl">{product.rating}</p>
                                        <StarRating rating={product.rating} dimension={'24'}/>
                                        <p className="text-blue-500">({product.reviewsCount})</p>
                                    </div>
                                </div>
                                <div className="mb-2 flex gap-2 items-end">
                                    <p className="text">Items in Stock:</p>
                                    <p className="text-xl">{product.quantity}</p>
                                </div>

                                <div className="flex gap-2 justify-end">
                                    <button onClick={() => handlePurchase()}
                                    className="py-2 pl-4 pr-2 flex gap-2 justify-end bg-green-600 rounded-sm text-white
                                    hover:bg-green-700"> 
                                        <p>Buy Now</p>
                                        <PaymentIcon/>
                                    </button>
                                    <button onClick={handleAddToCart}
                                    className={`py-2 pl-4 pr-2 flex gap-2 justify-end text-white rounded-sm
                                    ${addedToCart ? 'bg-violet-600 ' : 'bg-blue-600 hover:bg-blue-700'}`}
                                    disabled={addedToCart}> 
                                        <p>{addedToCart ? 'Added to Cart' : 'Add to Cart'}</p>
                                        <ShoppingBasket/>
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

                    <ProductReviews onAdd={() => loadProduct(product.productId)} product={product}/>
                </div>
                }
            </div>
        </div>
        <Footer/>
        </>
    );
}