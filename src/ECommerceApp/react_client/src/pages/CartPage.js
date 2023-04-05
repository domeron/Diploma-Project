import Header from "../components/Header";
import { UserContext } from "../App";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import ProductListItem from "../components/ProductListItem";

export default function CartPage() {
    const {user, setUser} = useContext(UserContext);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if(user) {
            loadUserCart();
        }
    }, [])

    async function loadUserCart() {
        await axios.get(`https://localhost:7077/User/Cart/${user.userId}`)
        .then((response) => {
            console.log(response.data);
            let price = 0;
            response.data.map((p) => {
                price += p.priceUSD;
            })
            setTotalPrice(price);
            setCartProducts(response.data);
        })
        .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) { console.log(error.request);
        } else { console.log('Error', error.message); }
        console.log(error.config);
        });
    }

    return (
        <>
        <Header/>
        <div className="bg-slate-100 py-12">
            <div className="container mx-auto py-6 flex gap-x-2 items-start">
                    {cartProducts.length > 0 ? 
                    <>
                    <div className="bg-white px-6 py-6 grow">
                        <h2 className="text-lg">{cartProducts.length} products in cart</h2>
                        {cartProducts.map((product, index) => {
                            return (
                                <ProductListItem key={index} product={product} />
                            );
                        })}
                    </div>

                    <div className="w-1/4 bg-white p-6 border">
                        <div>
                            <p>Total of {cartProducts.length} products</p>
                        </div>

                        <div>
                            <p>Total price is: {totalPrice} $</p>
                        </div>
                    </div>
                    </>
                    :
                    <div>No Products</div>
                    }
            </div>

        </div>
        </>
    );
}