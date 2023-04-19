import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { api_GetUserShippingAddress } from "../../api/user_api";
import { AddCircle } from "styled-icons/fluentui-system-regular";
import AddressAddForm from "../address/AddressAddForm";

export default function AddressesInformation() {
    const {user} = useContext(UserContext);
    const [shippingAddress, setShippingAddress] = useState(null);

    useEffect(() => {
        loadShippingAddress();
    }, [])

    async function loadShippingAddress() {
        await api_GetUserShippingAddress(user.userId)
        .then((data) => {
            console.log(data)
            setShippingAddress(data);
        })
        .catch(err => {
            console.log(err.response)
        })
    }
    return (
        <div className="px-8 pt-4 pb-16">
            <div className="py-4 mb-4 border-b border-gray-300">
                <p className="text-3xl font-semibold">Addresses</p>
            </div>
            <AddressSection address={shippingAddress} text={'Shipping Address'} shippingAddress={true}/>
        </div>
    );
}

function AddressSection({address, text, shippingAddress}) {
    const [addingAddress, setAddingAddress] = useState(false);

    return (
        <div className="py-2">
                <p className="text-xl font-semibold mb-4">{text}</p>
                <div className="pl-4 flex justify-between items-start">
                    {address ? 
                        <p>{address.countryName}</p>
                    :
                    <>
                        <p>No {text}</p>
                        <button onClick={() => setAddingAddress(true)}
                        className="py-2 px-2 flex items-center gap-2 text-green-600 hover:bg-gray-200 
                        hover:-translate-y-1 transition-transform">
                            <AddCircle className="w-6"/>
                            Add {text}</button>
                    </>
                    }
                </div>
                {addingAddress && 
                 <AddressAddForm shippingAddress={shippingAddress}/>
                }
            </div>
    );
}