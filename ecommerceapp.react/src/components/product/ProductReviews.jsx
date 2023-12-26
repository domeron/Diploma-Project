import { useContext, useEffect, useState } from "react";
import { api_GetAllReviewsAboutProduct } from "../../API/ProductReviewsAPI";
import StarRating from "./StarRating";
import { UserContext } from "../../App";
import ReviewForm from "../forms/ReviewForm";
import ProductReviewItem from "./ProductReviewItem";

export default function ProductReviews({product, onAdd}) {
    const [reviews, setReviews] = useState([]);
    const [writingReview, setWritingReview] = useState(false);
    const {user} = useContext(UserContext)
    
    const [sortOption, setSortOption] = useState(2);

    useEffect(() => {
        console.log(sortOption)
        if(product !== null && sortOption !== -1) {
            loadProductReviews({productId: product.productId, sortOption: sortOption});
        }
    }, [product, sortOption])


    async function loadProductReviews(params) {
        await api_GetAllReviewsAboutProduct(params)
        .then((data) => {
            setReviews(data)
        })
        .catch(err => console.log(err));
    }

    function handleProductCreated() {
        setWritingReview(false)
        loadProductReviews(product.productId)
        onAdd()
    }

    return (
        <div className="mb-8">
            <div className="mb-4">
                <p className="text-3xl font-semibold">Customer Reviews</p>
            </div>
                
            <div className="">
                <div className="mb-4 flex gap-2 items-start">
                    <p className="text-lg font-semibold">{product.rating} out of 5</p>
                    <StarRating rating={product.rating}/>
                    <p className="text-gray-500">{product.reviewsCount}, reviews</p>
                </div>

                <div>
                {writingReview &&
                <ReviewForm 
                product={product} onCreate={handleProductCreated} setWritingReview={setWritingReview}/>
                }

                <div className="flex items-center justify-between">
                    <div>
                        {!writingReview && user &&
                        <button onClick={() => setWritingReview(true)}
                        className="px-4 py-2 hover:bg-blue-700 bg-blue-600 text-white rounded-sm">
                            <p className="text-sm">Write a Review</p>
                        </button>}
                    </div>
                    {reviews.length > 0 &&
                    <div className="my-4 flex gap-4">
                        <select className="px-4 py-1 border border-gray-400"
                        value={sortOption} onChange={(e) => {setSortOption(parseInt(e.target.value))}}>
                            <option value={-1}>Sort</option>
                            <option value={0}>Newest</option>
                            <option value={1}>Oldest</option>
                            <option value={2}>Rating: Highest</option>
                            <option value={3}>Rating: Lowest</option>
                        </select>
                    </div>
                    }
                </div>

                {reviews.length > 0 &&
                    <div className="flex flex-col gap-4">
                        {reviews.map((review, index) => <ProductReviewItem key={index} review={review}/>)}
                    </div>
                }
                </div>
            </div>
        </div>
    );
}


