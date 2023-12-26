import Header from "../components/common/Header";
import TopHeader from "../components/common/TopHeader";
import Footer from "../components/common/Footer";
import CategoryBar from "../components/home/CategoryBar";
import DealsAndOffers from "../components/home/DealsAndOffers";

import electronics_image from "../assets/Electronics.jpg"
import clothing_image from "../assets/men.jpg"


export default function HomePage() {
    
    return (
        <>
        <TopHeader/>
        <Header/>
        <div className="bg-slate-100 py-6">
            <div className="max-w-6xl mx-auto">
                <CategoryBar imgSrc={electronics_image} categoryId={2}/>
                <DealsAndOffers/>
                <CategoryBar imgSrc={clothing_image} categoryId={3}/>
            </div>
        </div>
        <Footer/>
        </>
    );
}