import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { api_GetUserShippingAddress } from "../../API/UserAPI";
import AddressCreateForm from "../forms/AddressCreateForm";
import AddressUpdateForm from "../forms/AddressUpdateForm";

export default function ShippingAddress() {
    const {user} = useContext(UserContext)
    const [shippingAddress, setShippingAddress] = useState(null);
    const [creating, setCreating] = useState(false)
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        if(user != null)
            loadShippingAddress();
    }, [user])

    async function loadShippingAddress()
    {
        await api_GetUserShippingAddress(user.userId)
        .then((data) => {
            console.log(data)
            setShippingAddress(data)
        }).catch(err => console.log(err))
    }

    return (
        <div className="pt-4">
            <div className="pt-2 pb-4 mb-8 border-b border-gray-300">
                <p className="font-medium text-2xl">Shipping Address</p>
            </div>
            {!creating && !editing && (shippingAddress ?
            <>
            <div className="mb-8">
                <InfoField fieldName={'Full Name'} fieldValue={shippingAddress.fullName}/>
                <InfoField fieldName={'Phone Number'} fieldValue={shippingAddress.phoneNumber}/>
                <InfoField fieldName={'Country'} fieldValue={shippingAddress.countryName}/>
                <InfoField fieldName={'State'} fieldValue={shippingAddress.state}/>
                <InfoField fieldName={'City'} fieldValue={shippingAddress.city}/>
                <InfoField fieldName={'Postal Code'} fieldValue={shippingAddress.postalCode}/>
                <InfoField fieldName={'Street Address'} fieldValue={shippingAddress.streetAddress}/>
                <InfoField fieldName={'Street Address 2'} fieldValue={shippingAddress.streetAddress2}/>
            </div>
            <button className="px-3 py-2 bg-blue-500 text-white hover:bg-blue-800 rounded-sm"
                onClick={() => setEditing(true)}>
                    Update Address</button>
            </>
            :
            <div>
                <p className="text-xl mb-8 font-medium">You didn't specified a shipping address</p>
                <button className="px-3 py-2 bg-blue-500 text-white hover:bg-blue-800 rounded-sm"
                onClick={() => setCreating(true)}>
                    Add Shipping Address</button>
            </div>
            )}
            {creating && 
            <div>
                <AddressCreateForm onCreate={() => {
                    setCreating(false)
                    loadShippingAddress()
                    }}/>
                <button className="px-3 py-2 rounded-sm border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                onClick={() => setCreating(false)}>
                    Cancel</button>
            </div>}

            {editing && 
            <div>
                <AddressUpdateForm address={shippingAddress}
                onUpdate={() => {
                    setEditing(false)
                    loadShippingAddress()
                    }}/>
                <button className="px-3 py-2 rounded-sm border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                onClick={() => setEditing(false)}>
                    Cancel</button>
            </div>}
        </div>
    );
}

function InfoField({fieldName, fieldValue}) {
    return (
        <div className="flex pt-4 pb-6 border-b border-gray-300">
            <div className="w-64">
                <p>{fieldName}</p>
            </div>
            <div className="grow">
               <p className="italic">{fieldValue ? fieldValue : 'No Information'}</p>
            </div>
        </div>
    );

}