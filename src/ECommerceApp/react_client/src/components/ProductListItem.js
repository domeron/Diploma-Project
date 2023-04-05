import StarRatings from "react-star-ratings";

export default function ProductListItem({product, handleItemClick}) {
    return (
        <div className="border-2 border-gray-200 gap-4 flex my-2 py-4 px-4">
            <div className="flex-col">
                <div className="w-40 h-40">
                    <img className="object-contain w-40 h-40" alt="product image" src={`https://localhost:7077/${product.frontImagePath}`}/>
                </div>
            </div>
            <div className="flex flex-col grow">
                <div>
                    <h2 onClick={handleItemClick}
                    className="font-semibold text-lg hover:text-blue-500 hover:cursor-pointer">{product.productName}</h2>
                </div>
                <div className="">
                    <StarRatings
                        rating={product.rating}
                        starRatedColor="orange"
                        starDimension="1.25em"
                        starSpacing="0.025em"
                        name='rating'
                    />
                </div>
                <div>
                    <span>{product.category.categoryName}</span>
                </div>
                <div>
                    <p className="text-lg">${product.priceUSD}</p>
                </div>
            </div>
        </div>
    );
}