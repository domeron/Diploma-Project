import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AccountSettings from "../components/AccountSettings";

export default function Account() {
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

    return (
        <>
        <div>
            <Header/>
        </div>
        <div className="bg-slate-100">
            <div className="container mx-auto py-6 flex flex-row gap-x-2">
                <AccountSideTabs onSelectTab={handleTabChange}/>
                <div className="grow border">
                    {activeTab === 1 && <AccountSettings user={user} setUser={setUser}/>}
                </div>
                <div className="col-2">
                </div>
            </div>
        </div>
        </>
    );
}

function AccountSideTabs({onSelectTab, user}) {
    return (
        <div className="border w-64 flex flex-col bg-white">
            <div onClick={onSelectTab(1)} className="py-2 px-4 border-b-2">Account Settings</div>
            <div className="py-2 px-4 border-b-2">History of Orders</div>
        </div>
    );
}