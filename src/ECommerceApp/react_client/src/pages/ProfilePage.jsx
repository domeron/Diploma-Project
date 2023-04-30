import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import SubHeader from "../components/SubHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PersonalInformation from "../components/profile/PersonalInformation";
import PaymentInformation from "../components/profile/PaymentInformation";
import SellerInformation from "../components/profile/SellerInformation";
import ShippingAddressInformation from "../components/profile/ShippingAddressInformation";


export default function ProfilePage() {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [selectedSection, setSelectedSection] = useState(0);

    useEffect(() => {
        console.log('Profile page useEffect')
    }, [])

    return (
        <>
        <SubHeader/>
        <Header/>
        <div className="bg-slate-50">
            <div className='mx-auto max-w-6xl py-4'>
                {user ?
                <div className="flex gap-2 items-start my-6">
                    <div className="w-72 border border-gray-300 bg-white rounded shadow">
                        
                        <SideTab tabId={0} selectedTab={selectedSection} setTab={setSelectedSection} 
                        text={'Personal Information'}/>
                        <SideTab tabId={1} selectedTab={selectedSection} setTab={setSelectedSection} 
                        text={'Shipping Address'}/>
                        <SideTab tabId={2} selectedTab={selectedSection} setTab={setSelectedSection} 
                        text={'Payment Information'}/>
                        <SideTab tabId={3} selectedTab={selectedSection} setTab={setSelectedSection} 
                        text={'Seller Information'}/>
                        
                    </div>
                    <div className="mb-16 grow border border-gray-300 bg-white rounded shadow-sm">
                        {selectedSection === 0 && <PersonalInformation/>}
                        {selectedSection === 1 && <ShippingAddressInformation/>}
                        {selectedSection === 2 && <PaymentInformation/>}
                        {selectedSection === 3 && <SellerInformation/>}
                    </div>
                </div>
                : <p>Sign In</p>}
            </div>
        </div>
        <Footer/>
        </>
    );

    function SideTab({tabId, selectedTab, setTab, text}) {
        return (
            <div onClick={() => setTab(tabId)}
            className={`px-4 py-2 cursor-pointer flex justify-between hover:text-blue-500 
            ${selectedTab === tabId && 'bg-slate-100 border-y'}`}>
                <p>{text}</p>
            </div>
        );
    }
}