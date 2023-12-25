import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {CLIENT_ID} from '../config/config.js'

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { format } from "date-fns";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { UserContext } from "../App.js";
import { CheckCircleOutline } from "@mui/icons-material";
import Footer from "../components/common/Footer.jsx";
import { api_GetUserShippingAddress } from "../API/UserAPI.js";


export default function CheckoutPage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const [productsTotal, setProductsTotal] = useState(0)
    const [orderTotal, setOrderTotal] = useState(0)
    const [shippingTotal, setShippingTotal] = useState(0)

    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const [orderId, setOrderId] = useState()
    const [paymentTime, setPaymentTime] = useState('');

    const location = useLocation();

    useEffect(() => {
        setProducts(location.state.products);
    }, [])

    useEffect(() => {
        let price = 0;
        products.map((p) => price += p.priceUSD)
        setProductsTotal(price);

        setShippingTotal(price * 0.12);
        setOrderTotal(price + (price * 0.12));
    }, [products])

    function createOrder(data, actions) {
        return actions.order.create({
          purchase_units: products.map((p) => {
            return {
              'reference_id': `${p.productId}`,
              'description': p.productName,
              'intent': 'CAPTURE',
              'amount': {
                'currency_code': 'USD',
                'value': '1.0'
              }
            }})
        }).then((orderId) => {
          console.log(orderId)
          setOrderId(orderId)
          return orderId
        })
      }
    
      function onApprove(data, actions) {
        return actions.order.capture().then(function (details) {
          const {payer} = details;
          console.log(details);
          console.log('onApprove')
          setPaymentTime(details.update_time)
          setSuccess(true)
        });
      }
    
      const onError = (data, actions) => {
        console.log('onError')
        setErrorMessage("An Error occured with your payment ");
      };
    
    return (
        <>
        <div className="bg-slate-100">
            <div className='pb-32 pt-16 mx-auto max-w-5xl'>
                {success ? <SuccessPage orderId={orderId} paymentTime={paymentTime} products={products}/>
                :
                <>
                <div onClick={() => navigate(-1)}
                className="mb-8 group flex gap-4 items-center cursor-pointer">
                    <ChevronLeftIcon className="scale-125 group-hover:-translate-x-1 group-hover:transition-transform duration-500"/>
                    <p className="hover:underline text-lg">Return</p>
                </div>

                <p className="mb-6 text-3xl font-semibold">Checkout</p>
                <div className="flex gap-4 items-start">
                    <div className="grow">
                        <ShipSection/>
                        <div className="flex flex-col gap-4 my-4 border border-gray-400 bg-white">
                            <div className="py-4 px-6 border-b border-gray-300">
                                <p className="text-xl font-semibold">Review Items and shipping</p>
                            </div>
                            {products.map((p, index) => <ProductCheckoutListItem product={p} index={index}/>)}
                        </div>
                    </div>
                    <div className='w-96 px-6 border border-gray-400 bg-white'>
                            <div className='py-4 mb-4 flex justify-between items-center border-b border-gray-300'>
                                <p className='text-2xl font-semibold'>Total</p>
                                <p className="text-2xl font-semibold">$ {orderTotal}</p>
                            </div>
                            <div className='flex justify-between my-4'>
                                <p>Items({products.length})</p>
                                <p>$ {productsTotal}</p>
                            </div>
                            <div className='flex justify-between my-4'>
                                <p>Shipping</p>
                                <p>$ {shippingTotal}</p>
                            </div>
                            <div className="mt-8">
                                {products.length > 0 &&
                                <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
                                    <PayPalButtons
                                    style={{layout: "vertical"}}
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                    />
                                </PayPalScriptProvider>
                                }
                            </div>
                        </div>
                </div>
                </>
                }
            </div>
        </div>
        <Footer/>
        </>
    );
}

function ProductCheckoutListItem({product, index}) {
    return (
        <div className={`flex px-6 py-6 ${index !== 0 && 'border-t border-gray-300'}`}>
            <div onClick={() => {}}
            className="w-36 h-36 border shrink-0 border-gray-400 cursor-pointer
            flex items-center justify-center">
                <img className="object-contain h-full w-full" 
                src={`https://localhost:7077/${product.frontImagePath}`} />
            </div>
    
            <div className="grow px-4 flex flex-col">
                <p className="cursor-pointer hover:text-blue-500 hover:-translate-y-1 transition-transform
                text-xl font-semibold">{product.productName}</p>
                <p className="text-xl text-gray-700">$ {product.priceUSD}</p>
                <div className="max-w-sm my-4">
                    <p className="text-gray-500 text-sm">This item may be subject to duties and taxes upon delivery</p>
                </div>
            </div>
        </div>
    );
}

function ShipSection() {
    const [addingAddress, setAddingAddress] = useState(false);
    const [address, setAddress] = useState(null);
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(user)
            loadUserAddress(user.userId)
    }, [])

    async function loadUserAddress(userId) {
        await api_GetUserShippingAddress(userId)
        .then((data) => {
            console.log(data)
            setAddress(data)
        })
        .catch(err => console.log(err.response));
    }

    return (
        <div className="border border-gray-400 bg-white">
            <div className="py-4 px-6 border-b border-gray-300">
                <p className="text-xl font-semibold">Ship To</p>
            </div>
            {address && 
            <div className="py-4 px-6 flex flex-col gap-1">
                <div className="flex gap-2">
                    <p>{address.countryName}</p>
                    <p>{address.city}</p>
                    <p>{address.streetAddress}</p>
                    <p>{address.streetAddress2}</p>
                    <p>{address.postalCode}</p>
                </div>
                <p>{address.phoneNumber}</p>
                <p>{address.fullName}</p>
            </div>}
        </div>
    );
}

function SuccessPage({orderId, paymentTime, products}) {
    const date = new Date(paymentTime)
    const formattedDate = format(date, 'MMMM do, yyyy H:mma')
    const navigate = useNavigate()

    return (
        <div>
            <div className="pt-12">
                <div onClick={() => navigate('/')}
                className="group w-fit p-2 flex gap-1 items-center cursor-pointer hover:bg-gray-200" >
                    <ChevronLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform"/>
                    <p className="group-hover:underline">Home</p>
                </div>
            </div>
            <div className="py-6 flex flex-col items-center">
                <div className="my-8 flex flex-col items-center gap-4">
                    <div className="p-6 rounded-full bg-green-200">
                        <CheckCircleOutline fontSize="large" className=" text-green-600"/>
                    </div>
                    <p className="text-2xl font-semibold">Thank you for your order!</p>
                </div>
                <div className="px-8 py-8 border bg-white border-gray-300 rounded shadow-lg">
                    <p className="mb-4 text-lg font-semibold">Payment Details:</p>
                    <div className="py-4 flex flex-col gap-2 border-t-2 border-dashed border-gray-600 ">
                        <div className="flex justify-between">
                            <p>Order Id:</p>
                            <p>{orderId}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Payment Time:</p>
                            <p>{formattedDate}</p>
                        </div>
                        <div className="">
                            <p className="mb-2">Purchased Items:</p>
                            <ul className="pl-4 list-decimal"> 
                                {products.map((p, index) => {
                                    return <li className="text-sm text-ellipsis"
                                    key={index}>{p.productName}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}