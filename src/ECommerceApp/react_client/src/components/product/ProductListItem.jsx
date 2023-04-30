import { useNavigate } from "react-router-dom";
import StarRating from "../elements/StarRating";
import { PriceTag } from "../../pages/ProductPage";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function ProductListItem({product}) {
    const navigate = useNavigate();

    return (
        <div className="flex border bg-white border-gray-400 shadow hover:shadow-md">
            <div onClick={() => {}}
            className="w-36 h-36 border-r border-gray-400 cursor-pointer hover:p-1 transition-all
            flex items-center justify-center">
                <img className="object-contain h-full w-full" 
                src={`https://localhost:7077/${product.frontImagePath}`} />
            </div>

            <div className="grow py-3 px-4">
                <div className="flex mb-2 justify-between">
                    <p onClick={() => navigate(`/Product/${product.productId}`)}
                    className="cursor-pointer hover:text-blue-500
                     font-semibold text-xl">{product.productName}</p>
                     <FavoriteBorderIcon className="hover:opacity-100 hover:text-blue-500 cursor-pointer opacity-40"/>
                </div>
                <div className="flex gap-2 mb-2 items-start">
                    <p className="text-lg">{product.rating}</p>
                    <StarRating rating={product.rating}/>
                    <p className="text-blue-500 text-lg">({product.reviewsCount})</p>
                </div>
                <PriceTag price={product.priceUSD}/>
            </div>
        </div>
    );
}