import Header from '../components/Header';
import Footer from '../components/Footer';
import SubHeader from '../components/SubHeader';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';
import { api_DeleteProductFromUserCart, api_GetProductsInUserCart } from '../api/product_api';
import ProductCartListItem from '../components/product/ProductCartListItem';

export default function CartPage() {
    const {user} = useContext(UserContext)
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(user != null) {
            loadProductsInCart(user.userId);
        }
    }, [user])

    async function loadProductsInCart(userId) {
        await api_GetProductsInUserCart(userId)
        .then((data) => {
            console.log(data);
            setProducts(data);
            let price = 0;
            data.map((p) => price += p.priceUSD)
            setTotal(price);
        })
        .catch(err => console.log(err))
    }

    async function handleDeleteProductFromCart(productId) {
        await api_DeleteProductFromUserCart(productId, user.userId)
        .then(() => {
            loadProductsInCart(user.userId)
        })
        .catch(err => console.log(err.response))
    }

    function handleCheckout() {
        let productIds = products.map((p) => p.productId)
        navigate(`/Checkout`, {state: {products: products}});
    }

    return (
        <>
        <SubHeader/>
        <Header/>
        <div className='mx-auto max-w-6xl py-4 mb-16'>
            {user !== null ?
            <div>
                <div className="my-4">
                    <p className="font-semibold text-3xl">Shopping Cart</p>
                </div>

                {products.length > 0 &&
                <div className='flex gap-6 items-start'>
                    <div className='grow'>
                        <div className='flex flex-col gap-4'>
                            {products.map((product, index) => { 
                                return <ProductCartListItem key={index} product={product} 
                                onProductDeleteFromCart={handleDeleteProductFromCart}/>})}
                        </div>
                    </div>
                    <div className='w-80 py-4 px-4 border border-gray-400 shadow rounded'>
                        <div>
                            <button onClick={handleCheckout}
                            className='w-full bg-blue-500 py-2 px-2 shadow hover:bg-blue-700 rounded'>
                                <p className='text-lg font-semibold text-white mx-auto'>Go to checkout</p>
                            </button>
                        </div>
                        <div className='flex justify-between my-4'>
                            <p>Items({products.length})</p>
                        </div>
                        <div className='py-3 flex justify-between items-center border-t border-gray-300'>
                            <p className='text-xl font-semibold'>Total</p>
                            <p className='text-xl'>${total}</p>
                        </div>
                    </div>
                </div>
                }
            </div>
            :
            <p>Sign In</p>
            }
            
        </div>
        <Footer/>
        </>
    );
}