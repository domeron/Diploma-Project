import logoIcon from "../assets/shopify.svg"
import { ChevronDownIcon} from "@heroicons/react/24/solid"
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
    return (
        <>
        <div className=" bg-slate-200 border-y border-gray-300 shadow-lg">
            <div className="max-w-6xl mx-auto">
                <div className="flex gap-16 py-16 text-sm">
                    <div className="flex flex-col max-w-xs gap-4">
                        <div className="w-16 h-16">
                            <img className="h-full w-full" src={logoIcon} alt="logo"/>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        </p>
                        <div className="flex gap-4 cursor-pointer">
                            <InstagramIcon className="w-8 text-gray-400 hover:text-blue-500 hover:-translate-y-1 transition-transform"/>
                            <FacebookIcon className="w-8 text-gray-400 hover:text-blue-500 hover:-translate-y-1 transition-transform"/>
                            <LinkedInIcon className="w-8 text-gray-400 hover:text-blue-500 hover:-translate-y-1 transition-transform"/>
                            <TwitterIcon className="w-8 text-gray-400 hover:text-blue-500 hover:-translate-y-1 transition-transform"/>
                            <YouTubeIcon className="w-8 text-gray-400 hover:text-blue-500 hover:-translate-y-1 transition-transform"/>
                        </div>
                    </div>
                    <div className="flex gap-8">
                        <div className="flex flex-col gap-4">
                            <p className="font-bold">About</p>
                            <div className="flex flex-col gap-2">
                                <p>About Us</p>
                                <p>Find Store</p>
                                <p>Categories</p>
                                <p>Blogs</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className="font-bold">Partnership</p>
                            <div className="flex flex-col gap-2">
                                <p>About Us</p>
                                <p>Find Store</p>
                                <p>Categories</p>
                                <p>Blogs</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className="font-bold">Information</p>
                            <div className="flex flex-col gap-2">
                                <p>About Us</p>
                                <p>Find Store</p>
                                <p>Categories</p>
                                <p>Blogs</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className="font-bold">For Users</p>
                            <div className="flex flex-col gap-2">
                                <p>About Us</p>
                                <p>Find Store</p>
                                <p>Categories</p>
                                <p>Blogs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-indigo-900 py-2 text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between">
                    <div>
                        <p>© 2023 ECommerce.</p>
                    </div>
                    <div className="flex gap-2">
                        <p>English</p>
                        <ChevronDownIcon className="w-6"/>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}