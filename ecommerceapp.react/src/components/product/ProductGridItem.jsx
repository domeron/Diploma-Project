import { DisabledByDefault, Favorite, FavoriteBorder } from "@mui/icons-material";
import PriceTag from "./ProductPriceTag";
import StarRating from "./StarRating";
import { useContext } from "react";
import { ProductListContext } from "../../context/ProductListContext";
import { UserContext } from "../../App";

export default function ProductGridItem({product, onClick, isFavorite, onAddToFavorites, onRemoveFromFavorites, imageWidth=52}) {
    const {favoritesPage} = useContext(ProductListContext)
    const {user} = useContext(UserContext)

    return (
        
        <div className={`w-[23%] flex flex-col border border-gray-300 bg-white`}>
            <div 
            onClick={onClick}
            className={`h-52 group/img_wrap w-full overflow-hidden border-b border-gray-300 flex items-center cursor-pointer relative`}>

                <img className="object-cover h-full w-full group-hover/img_wrap:scale-125 ease-in-out duration-200" 
                src={`https://localhost:7077/${product.frontImagePath}`} />

                <div title="Add To Favorites" 
                className="absolute top-0 right-0 p-2 hover:text-blue-500 hover:opacity-100">
                    {user && (isFavorite ?
                     <Favorite onClick={(e) => {
                        onRemoveFromFavorites(product.productId)
                        e.stopPropagation()
                    }}
                     className='text-blue-600 cursor-pointer hover:text-blue-800'/>
                     :
                     <FavoriteBorder onClick={(e) => {
                        onAddToFavorites(product.productId)
                        e.stopPropagation()
                    }}
                     className="hover:opacity-100 hover:text-blue-500 cursor-pointer opacity-40"/>
                     )}
                </div>
            </div>

            <div className="px-2 pt-2 pb-4">
                <p onClick={onClick}
                className="font-semibold text-base h-12 overflow-hidden text-ellipsis hover:text-blue-500 cursor-pointer">{product.productName}</p>
                <div className="flex gap-2 mb-2 items-start">
                    <p className="text-lg">{product.rating}</p>
                    <StarRating rating={product.rating}/>
                    <p className="text-blue-500">({product.reviewsCount})</p>
                </div>
                <PriceTag price={product.priceUSD}/>
                
                {favoritesPage &&
                <div 
                onClick={() => onRemoveFromFavorites(product.productId)}
                className="group mt-4 flex justify-between gap-1 items-center text-red-500 cursor-pointer bg-red-50">
                    <span className="pl-2 group-hover:text-red-700 text-sm font-semibold">Remove from favorites </span>
                    <DisabledByDefault className="group-hover:text-red-700"/>
                </div>}
            </div>
        </div>
    );
}