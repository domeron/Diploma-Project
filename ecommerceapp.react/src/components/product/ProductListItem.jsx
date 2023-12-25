import StarRating from "./StarRating";
import PriceTag from "./ProductPriceTag";
import { UserContext } from '../../App';
import { useContext } from 'react';
import { DisabledByDefault, Favorite, FavoriteBorder } from "@mui/icons-material";
import { ProductListContext } from "../../context/ProductListContext";

export default function ProductListItem({product, onClick, isFavorite, onAddToFavorites, onRemoveFromFavorites}) {
    const {favoritesPage} = useContext(ProductListContext)
    const {user} = useContext(UserContext)

    return (
        <div className="flex border border-gray-300 bg-white">
            <div onClick={onClick}
            className="w-36 h-36 border-r border-gray-300 cursor-pointer overflow-hidden
            flex items-center justify-center">
                <img className="object-fill hover:scale-125 transition-all" 
                src={`https://localhost:7077/${product.frontImagePath}`} />
            </div>

            <div className="grow py-3 pl-6 pr-4">
                <div className="flex mb-2 justify-between">
                    <p onClick={onClick}
                    className="cursor-pointer hover:text-blue-500
                     font-semibold text-lg">{product.productName}</p>
                     
                     {user && (isFavorite ?
                     <Favorite 
                     onClick={() => onRemoveFromFavorites(product.productId)}
                     className='text-blue-600 cursor-pointer hover:text-blue-800'/>
                     :
                     <FavoriteBorder 
                     onClick={() => onAddToFavorites(product.productId)}
                     className="hover:opacity-100 hover:text-blue-500 cursor-pointer opacity-40"/>
                     )}
                </div>
                <div className="flex gap-2 mb-2 items-start">
                    <p className="text-lg">{product.rating}</p>
                    <StarRating rating={product.rating}/>
                    <p className="text-blue-500 text-lg">({product.reviewsCount})</p>
                </div>
                <PriceTag price={product.priceUSD}/>
                {favoritesPage &&
                <div 
                onClick={() => onRemoveFromFavorites(product.productId)}
                className="group mt-4 flex w-fit justify-between gap-1 items-center text-red-500 cursor-pointer bg-red-50">
                    <span className="pl-2 group-hover:text-red-700 text-sm font-semibold">Remove from favorites </span>
                    <DisabledByDefault className="group-hover:text-red-700"/>
                </div>}
            </div>
        </div>
    );
}