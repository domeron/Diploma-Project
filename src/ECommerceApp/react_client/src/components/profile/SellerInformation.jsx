import { useContext } from "react";
import { UserContext } from "../../App";
import { useState } from "react";
import SellerSignUpForm from "../seller/SellerSignUpForm";
import { useEffect } from "react";
import { api_GetSellerById } from "../../api/seller_api";
import { DashboardCustomize } from "styled-icons/material";
import { useNavigate } from "react-router-dom";

export default function SellerInformation() {
    const {user} = useContext(UserContext)
    const [seller, setSeller] = useState(null);
    const [signingUp, setSigningUp] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(user !== null && user.isSeller) {
            loadSeller();
        }
    }, [])

    async function loadSeller() {
        await api_GetSellerById(user.sellerId)
        .then((dataResponse) => {
            console.log(dataResponse)
            setSeller(dataResponse)
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="px-8 pt-4 pb-16 text-sm">
            <div className="py-4 mb-6 border-b border-gray-300">
                <p className="text-2xl font-semibold">Seller Information</p>
            </div>
            {user.isSeller ?
            <div>
                <button onClick={() => navigate('/SellerDashboard')}
                className="px-4 py-2 rounded-md hover:bg-blue-700 flex gap-2 bg-blue-500 text-white">
                    <p>Seller Dashboard</p>
                    <DashboardCustomize className="w-5"/>
                </button>
                {seller &&
                <>
                <InfoField fieldText={'Name'} fieldValue={seller.sellerName}/>
                <InfoField fieldText={'Email'} fieldValue={seller.sellerEmail}/>
                <InfoField fieldText={'Description'} fieldValue={seller.sellerDescription}/>
                </>
                }
            </div>
            :
            <div>
                {signingUp ?
                <SellerSignUpForm setSigningUp={setSigningUp}/>
                :
                <>
                <p className="text-lg mb-4">You are not seller</p>
                <button onClick={() => setSigningUp(true)}
                className="py-1 px-4 flex gap-2 bg-blue-500 text-white rounded-md shadow-md
                hover:bg-blue-700">
                    <span>Become a Seller</span>
                </button>
                </>
                }
            </div>
            }
        </div>
    );
}

function InfoField({fieldText, fieldValue}) {
    return (
        <div className="flex py-6 border-b border-gray-300">
            <div className="w-64 font-semibold">
                <p>{fieldText}</p>
            </div>
            <div className="grow">
                    <p>{fieldValue ? fieldValue : 'No Information'}</p>
            </div>
        </div>
    );
}