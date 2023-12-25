import logoIcon from "../../assets/alline.png"
import { useNavigate } from "react-router-dom";
import HeaderSearch from "./HeaderSearch";


export default function Header() {
    const navigate = useNavigate()

    return (
        <div className="z-50 border-b border-gray-300 bg-white shadow-sm">
            <div className="flex py-2 items-center max-w-6xl mx-auto gap-32 bg-white">

                <div className="flex items-start gap-8">
                    <div onClick={() => navigate('/')}
                    className="h-12 cursor-pointer">
                        <img className="h-full" src={logoIcon} alt="logo"/>
                    </div>
                </div>
                <HeaderSearch/>
            </div>
        </div>
    );
}
