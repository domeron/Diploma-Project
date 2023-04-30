import Footer from "../components/Footer";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { api_GetSellerById } from "../api/seller_api";
import SellerInformation from "../components/seller/dashboard/SellerInformation";
import SellerProducts from "../components/seller/dashboard/SellerProducts";

export const SellerContext = React.createContext(null);

export default function SellerDashboard() {
    const {user} = useContext(UserContext)
    const [seller, setSeller] = useState();
    const [selectedTab, setSelectedTab] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(user !== null && user.isSeller) {
            loadSeller(user.sellerId);
        } else {
            navigate('/')
        }
    }, [])

    async function loadSeller(sellerId) {
        await api_GetSellerById(sellerId)
        .then((dataResponse) => {
            setSeller(dataResponse)
            console.log(dataResponse)
        })
        .catch(err => console.log(err));
    }

    return (
        <>
        <SubHeader/>
        <Header/>
        <div className="bg-slate-50">
            <div className='mx-auto max-w-6xl py-4'>
                <SellerContext.Provider value={{seller: seller, setSeller: setSeller}}>
                    {user && user.isSeller &&
                    <div className="flex gap-2 items-start">
                        <div className="w-64 border border-gray-300 rounded shadow bg-white">
                            <SideTab tabId={0} selectedTab={selectedTab} setTab={setSelectedTab} 
                            text={'Seller Information'}/>
                            <SideTab tabId={1} selectedTab={selectedTab} setTab={setSelectedTab} 
                            text={'Addresses'}/>
                            <SideTab tabId={2} selectedTab={selectedTab} setTab={setSelectedTab} 
                            text={'Products'}/>
                            <SideTab tabId={3} selectedTab={selectedTab} setTab={setSelectedTab} 
                            text={'Seller Information'}/>        
                        </div>
                        <div className="grow border rounded border-gray-300 bg-white">
                            {selectedTab === 0 && <SellerInformation/>}
                            {selectedTab === 2 && <SellerProducts/>}
                        </div>
                    </div>
                    }
                </SellerContext.Provider>
            </div>
        </div>
        <Footer/>
        </>
    )

    function SideTab({tabId, selectedTab, setTab, text}) {
        return (
            <div onClick={() => setTab(tabId)}
            className={`px-4 py-2 cursor-pointer flex justify-between hover:text-blue-500 
            ${selectedTab === tabId && 'bg-gray-200'}`}>
                <p>{text}</p>
            </div>
        );
    }
}