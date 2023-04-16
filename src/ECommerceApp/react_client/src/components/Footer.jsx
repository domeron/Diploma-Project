import logoIcon from "../assets/shopify.svg"
import styled from 'styled-components'
import { InstagramWithCircle } from "styled-icons/entypo-social";
import { LinkedinWithCircle } from "styled-icons/entypo-social";
import { TwitterWithCircle } from "styled-icons/entypo-social";
import { Youtube } from "styled-icons/entypo-social";
import { Facebook } from "styled-icons/fa-brands";
import { ChevronDownIcon} from "@heroicons/react/24/solid"
export default function Footer() {
    return (
        <>
        <div className=" bg-gray-100 border-y border-gray-200 shadow-lg">
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
                            <InstagramWithCircle className="w-8 text-gray-400 hover:text-blue-500 hover:-translate-y-1 transition-transform"/>
                            <Facebook className="w-8 text-gray-400 hover:text-blue-500 hover:-translate-y-1 transition-transform"/>
                            <LinkedinWithCircle className="w-8 text-gray-400 hover:text-blue-500 hover:-translate-y-1 transition-transform"/>
                            <TwitterWithCircle className="w-8 text-gray-400 hover:text-blue-500 hover:-translate-y-1 transition-transform"/>
                            <Youtube className="w-8 text-gray-400 hover:text-blue-500 hover:-translate-y-1 transition-transform"/>
                            
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
        <div className="bg-gray-200 py-4">
            <div className="max-w-5xl mx-auto">
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