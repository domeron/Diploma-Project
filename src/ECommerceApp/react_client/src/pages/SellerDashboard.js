import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { useForm } from "react-hook-form";
import CreateNewProduct from "../components/CreateNewProduct";
import MyProducts from "../components/MyProducts";
import axios from "axios";
import {ReactComponent as ChevronDownIcon} from "../assets/svg/chevron_down.svg"

export default function SellerDashboard() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        if(!user) {
            navigate("/Login");
        }
    }, []);

    function handleTabChange(index) {
        setActiveTab(index);
    }

    return (<>
        <div>
            <Header/>
        </div>
        <div className="bg-slate-100">
            <div className="container mx-auto py-6 flex flex-row gap-x-2">
                <SellerDashboardSideTabs activeTab={activeTab} handleTabChange={handleTabChange}/>
                <div className="grow border bg-white py-4 px-6">
                    {activeTab === 1 && <MyProducts/>}
                    {activeTab === 2 && <CreateNewProduct goToProducts={() => handleTabChange(1)}/>}
                </div>
                <div className="col-2">
                </div>
            </div>
        </div>
    </>);
}

function SellerDashboardSideTabs(props) {
    return (
        <div className="border w-64 flex flex-col bg-white">
            <div className={`py-2 px-4 border-b-2 hover:bg-slate-100 ${props.activeTab === 1 && 'bg-gray-200'}`}
            onClick={() => props.handleTabChange(1)}>My Products</div>
            <div className={`py-2 px-4 border-b-2 hover:bg-slate-100 ${props.activeTab === 2 && 'bg-gray-200'}`}
            onClick={() => props.handleTabChange(2)}>Add New Product</div>
        </div>
    );
}
