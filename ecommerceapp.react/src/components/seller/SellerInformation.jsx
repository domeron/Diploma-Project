import { useContext } from "react";
import { UserContext } from "../../App";
import { useState } from "react";
import { useEffect } from "react";
import GridViewIcon from '@mui/icons-material/GridView';
import { useLocation, useNavigate } from "react-router-dom";
import SellerSignUpForm from "../forms/SellerSignUpForm";
import { api_GetSellerById } from "../../API/SellerAPI";

export default function SellerInformation() {
    const {user} = useContext(UserContext)
    const [seller, setSeller] = useState(null);
    const [signingUp, setSigningUp] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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
        <>
        <div className="pt-2 pb-4 mb-6 border-b border-gray-300 flex justify-between">
            <p className="font-medium text-2xl">Seller Information</p>
        </div>
        {user.isSeller ?
        <div>
            {location.pathname !== '/seller/dashboard' &&
            <button 
                onClick={() => navigate('/seller/dashboard')}
                className="px-4 py-2 mb-4 flex items-center gap-2 hover:bg-blue-800 bg-blue-500 text-white ">
                <p>Seller Dashboard</p>
                <GridViewIcon className="w-5"/>
            </button>   
            }
            {seller &&
            <>
            <InfoField fieldText={'Seller Name'} fieldValue={seller.sellerName}/>
            <InfoField fieldText={'Email'} fieldValue={seller.sellerEmail}/>
            <InfoField fieldText={'Description'} fieldValue={seller.sellerDescription}/>
            </>
            }
        </div>
        :
        <div>
            {signingUp ?
            <SellerSignUpForm setSigningUp={setSigningUp} loadSeller={loadSeller}/>
            :
            <>
            <p className="text-lg mb-4">You are not seller.</p>
            <button onClick={() => setSigningUp(true)}
            className="py-2 px-4 mb-4 flex gap-2 border border-blue-600 text-blue-600
            hover:bg-blue-600 hover:text-white">
                <span>Become a Seller</span>
            </button>
            <p>Become a seller, to place products to sell</p>
            </>
            }
        </div>
        }
        </>
        
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