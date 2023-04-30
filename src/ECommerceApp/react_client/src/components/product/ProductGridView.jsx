import { useNavigate } from "react-router-dom";
import StarRating from "../elements/StarRating";
import { PriceTag } from "../../pages/ProductPage";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function ProductGridView({product, handleClick}) {
    
    return (
        <div className="w-1/4 p-2">
            <div className="flex flex-col border border-gray-400 rounded-sm bg-white shadow-sm">
                <div onClick={handleClick}
                className="group/img_wrap w-full h-52 overflow-hidden border-b border-gray-400 flex items-center cursor-pointer relative">

                    <img className="object-cover h-full w-full group-hover/img_wrap:scale-125 ease-in-out duration-200" 
                    src={`https://localhost:7077/${product.frontImagePath}`} />

                    <div title="Add To Favorites" onClick={(e) => {e.stopPropagation()}}
                    className="absolute top-0 right-0 p-2 opacity-40 hover:text-blue-500 hover:opacity-100">
                        <FavoriteBorderIcon className=""/>
                    </div>
                </div>

                <div className="px-2 pt-1 pb-4">
                    <p className="font-semibold text-lg h-16 overflow-hidden text-ellipsis">{product.productName}</p>
                    <div className="flex gap-2 mb-2 items-start">
                        <p className="text-lg">{product.rating}</p>
                        <StarRating rating={product.rating}/>
                        <p className="text-blue-500">({product.reviewsCount})</p>
                    </div>
                    <PriceTag price={product.priceUSD}/>
                </div>
            </div>
        </div>
    );
}