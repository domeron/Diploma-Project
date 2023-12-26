import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import TopHeader from "../components/common/TopHeader";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import PersonalInformation from "../components/profile/PersonalInformation";
import SellerInformation from "../components/seller/SellerInformation";
import ShippingAddress from "../components/profile/ShippingAddress";

export default function ProfilePage() {
    const {user} = useContext(UserContext);
    const [selectedSection, setSelectedSection] = useState(0);

    useEffect(() => {
        console.log('Profile page useEffect')
    }, [])

    return (
        <>
        <TopHeader/>
        <Header/>
        <div className="bg-gray-50 pt-8 pb-12">
            <div className='mx-auto max-w-6xl'>
                <h1 className="mb-8 text-3xl">Profile - {user.firstName} {user.lastName}</h1>
                {user ?
                <div className="flex gap-4 items-start">
                    <ul className="w-64 shrink-0 border-[0.3pt] border-gray-400 bg-white shadow-sm">
                        
                        <SideTab tabId={0} selectedTab={selectedSection} setTab={setSelectedSection} 
                        text={'Personal Information'}/>
                        <SideTab tabId={1} selectedTab={selectedSection} setTab={setSelectedSection} 
                        text={'Seller Information'}/>
                        <SideTab tabId={2} selectedTab={selectedSection} setTab={setSelectedSection} 
                        text={'Shipping Address'}/>
                        {/* <SideTab tabId={3} selectedTab={selectedSection} setTab={setSelectedSection} 
                        text={'Payment Information'}/> */}
                        
                    </ul>
                    <div className="grow border border-gray-400 bg-white shadow-sm">
                        <div className="px-10 pt-4 pb-12">
                            {selectedSection === 0 && <PersonalInformation/>}
                            {selectedSection === 1 && <SellerInformation/>}
                            {selectedSection === 2 && <ShippingAddress/>}
                            {/* {selectedSection === 3 && <SellerInformation/>}  */}
                        </div>
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
            <li onClick={() => setTab(tabId)}
            className={`px-4 py-2 flex border-b border-gray-300 last:border-none justify-between cursor-pointer hover:text-blue-500 hover:bg-gray-100
            ${selectedTab === tabId && 'bg-gray-200'}`}>
                <p>{text}</p>
            </li>
        );
    }
}