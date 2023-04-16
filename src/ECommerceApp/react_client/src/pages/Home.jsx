import Footer from "../components/Footer";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import PopularCategories from "../components/banners/PopularCategories";

export default function Home() {
    return (
        <>
        <SubHeader/>
        <Header/>
        <div className="max-w-6xl mx-auto">
            <PopularCategories/>
        </div>
        <Footer/>
        </>
    );
}