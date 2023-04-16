import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import SubHeader from "../components/SubHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PersonalInformation from "../components/profile/PersonalInformation";
import PaymentInformation from "../components/profile/PaymentInformation";
import SellerDashboard from "../components/profile/SellerDashboard";


export default function ProfilePage() {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [selectedSection, setSelectedSection] = useState(0);

    return (
        <>
        <SubHeader/>
        <Header/>
        <div className='mx-auto max-w-6xl py-4'>
            {user ?
            <div className="flex gap-2 items-start">
                <div className="w-64 border border-gray-300 rounded shadow">
                    <div onClick={() => setSelectedSection(0)}
                    className={`px-4 py-2 cursor-pointer flex justify-between hover:text-blue-500 
                    ${selectedSection === 0 && 'bg-gray-200'}`}>
                        <p>Personal Information</p>
                    </div>
                    <div onClick={() => setSelectedSection(1)}
                    className={`px-4 py-2 cursor-pointer flex justify-between hover:text-blue-500 
                    ${selectedSection === 1 && 'bg-gray-200'}`}>
                        <p>Payment Information</p>
                    </div>
                    <div onClick={() => setSelectedSection(2)}
                    className={`px-4 py-2 cursor-pointer flex justify-between hover:text-blue-500 
                    ${selectedSection === 2 && 'bg-gray-200'}`}>
                        <p>Seller Dashboard</p>
                    </div>
                </div>
                <div className="grow bg-green-500 h-[500px]">
                    {selectedSection === 0 && <PersonalInformation/>}
                    {selectedSection === 1 && <PaymentInformation/>}
                    {selectedSection === 2 && <SellerDashboard/>}
                </div>
            </div>
            : <p>Sign In</p>}
        </div>
        <Footer/>
        </>
    );
}