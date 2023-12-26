import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';
import ProductCartListItem from '../components/product/ProductCartListItem';
import TopHeader from '../components/common/TopHeader';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BackButton from '../components/common/BackButton';
import { api_GetProductsInUserCart, api_RemoveProductFromUserCart } from '../API/UserAPI';
import { ShoppingBasket } from '@mui/icons-material';

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
        await api_RemoveProductFromUserCart(user.userId, productId)
        .then(() => {
            loadProductsInCart(user.userId)
        })
        .catch(err => console.log(err.response))
    }

    function handleCheckout() {
        // let productIds = products.map((p) => p.productId)
        navigate(`/Checkout`, {state: {products: products}});
    }

    return (
        <>
        <TopHeader/>
        <Header/>
        <div className='bg-slate-100'>
            <div className='pt-4 pb-32 mx-auto max-w-6xl'>
                {user ?
                <div>
                    <div className='mb-2 mx-auto max-w-6xl '>
                        <BackButton onBack={() => navigate(-1)}/>
                    </div>
                    <div className="mt-4 mb-8 flex gap-4 items-center">
                        <p className="font-semibold text-3xl">Shopping Cart</p>
                        <ShoppingBasket className="text-blue-600" fontSize="large"/>
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
                        <div className='w-96 py-4 px-4 border border-gray-400 shadow rounded-sm bg-white'>
                            <div className='pb-4 flex justify-between items-center'>
                                <p className='text-2xl font-semibold'>Total</p>
                                <p className='text-2xl'>${total}</p>
                            </div>
                            <div className='flex justify-between mb-8 py-2 border-t border-gray-300'>
                                <p>Items({products.length})</p>
                            </div>
                            <button onClick={handleCheckout}
                            className='w-full bg-blue-500 py-2 px-2 shadow hover:bg-blue-700 rounded'>
                                <p className='text-lg font-semibold text-white mx-auto'>Go to checkout</p>
                            </button>
                        </div>
                    </div>
                    }
                </div>
                :
                <p>Sign In</p>
                }
                
            </div>
        </div>
        <Footer/>
        </>
    );
}