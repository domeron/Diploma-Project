import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import TopHeader from "../components/common/TopHeader";
import Header from "../components/common/Header";
import { UserContext } from "../App";
import { api_GetSellerById } from "../API/SellerAPI";
import SellerInformation from "../components/seller/SellerInformation";
import SellerProducts from "../components/seller/SellerProducts";
import Footer from "../components/common/Footer";

export const SellerContext = React.createContext(null);

export default function SellerDashboardPage() {
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
        <TopHeader/>
        <Header/>
        <div className="bg-gray-50 pt-8 pb-12">
            <div className='mx-auto max-w-6xl'>
                <h1 className="mb-8 text-3xl">Seller Dashboard - {seller && seller.sellerName}</h1>
                <SellerContext.Provider value={{seller: seller, setSeller: setSeller}}>
                    {user && user.isSeller &&
                    <div className="flex gap-4 items-start">
                        <ul className="w-64 shrink-0 border-[0.3pt] border-gray-400 bg-white shadow-sm">
                            <SideTab tabId={0} selectedTab={selectedTab} setTab={setSelectedTab} 
                            text={'Seller Information'}/>
                            <SideTab tabId={1} selectedTab={selectedTab} setTab={setSelectedTab} 
                            text={'Products'}/>    
                        </ul>
                        <div className="grow border border-gray-400 bg-white shadow-sm">
                            <div className="px-10 pt-4 pb-12">
                                {selectedTab === 0 && <SellerInformation/>}
                                {selectedTab === 1 && <SellerProducts/>}
                            </div>
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
            <li onClick={() => setTab(tabId)}
            className={`px-4 py-2 flex border-b border-gray-300 last:border-none justify-between cursor-pointer hover:text-blue-500 hover:bg-gray-100
            ${selectedTab === tabId && 'bg-gray-200'}`}>
                <p>{text}</p>
            </li>
        );
    }
}