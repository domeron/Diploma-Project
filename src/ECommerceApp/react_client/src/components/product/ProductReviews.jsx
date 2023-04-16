import { useEffect, useState } from "react";
import { api_GetAllReviewsAboutProduct } from "../../api/product_reviews_api";
import StarRating from "../elements/StarRating";

export default function ProductReviews({product}) {
    const [reviews, setReviews] = useState([]);
    const [sortOption, setSortOption] = useState(0);

    useEffect(() => {
        if(product !== null)
            loadProductReviews(product.productId);
    }, [product])

    useEffect(() => {
        console.log(sortOption)
        if(sortOption === 1) {
            setReviews(reviews.sort((a, b) => {return a.createdOn > b.createdOn ? 1 : -1}))
        } else if(sortOption === 2) {
            setReviews(reviews.sort((a, b) => {return a.createdOn < b.createdOn ? 1 : -1}))
        } else if(sortOption === 3) {
            setReviews(reviews.sort((a, b) => {return a.rating > b.rating ? 1 : -1}))
        } else if(sortOption === 4) {
            setReviews(reviews.sort((a, b) => {return a.rating < b.rating ? 1 : -1}))
        }
    }, [sortOption])

    async function loadProductReviews(productId) {
        await api_GetAllReviewsAboutProduct(productId)
        .then((data) => {
            console.log(data)
            setReviews(data)
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="my-4">
            <div className="mb-4">
                <p className="text-2xl font-semibold">Customer Reviews</p>
            </div>
            {reviews.length > 0 ?
                <>
                <div className="flex gap-4 items-start">
                    <div className="w-64">
                        <div className="flex gap-1">
                            <StarRating rating={product.rating}/>
                            <p className="text-lg font-semibold">{product.rating} out of 5</p>
                        </div>
                        <div>
                            <p className="text-gray-500">{product.reviewsCount}, reviews</p>
                        </div>
                    </div>

                    <div className="grow">
                        <div className="mb-4">
                            <select className="px-4 py-1 border border-gray-400"
                            value={sortOption} onChange={(e) => {setSortOption(parseInt(e.target.value))}}>
                                <option value={0}>Sort</option>
                                <option value={1}>Newest</option>
                                <option value={2}>Oldest</option>
                                <option value={3}>Rating: Highest</option>
                                <option value={4}>Rating: Lowest</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-4">
                            {reviews.map((review, index) => {
                                return <ProductReview key={index} review={review}/>
                            })}
                        </div>
                    </div>
                </div>
                </>
            :
            <p>No Reviews Yet</p>
            }
        </div>
    );
}

function ProductReview({review}) {
    const date = new Date(review.createdOn)
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    })

    return (
        <div className="py-4 px-4 border border-gray-400 shadow-md">
            <div className="flex justify-between">
                <div>
                    <p>{review.user.firstName} {review.user.lastName}</p>
                </div>
                <div>
                    <p>{formattedDate}</p>
                </div>
            </div>
            <div className="mt-2">  
                <p className="text-lg font-semibold">{review.title}</p>
            </div>
            <div className="mb-4">  
                <StarRating rating={review.rating}/>
            </div>
            <div className="w-full max-w-full ">
                <p className="w-full max-w-prose">{review.content}</p>
            </div>
        </div>
    )
}