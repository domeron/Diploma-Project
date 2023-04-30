import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { api_CreateReview, api_GetAllReviewsAboutProduct } from "../../api/product_reviews_api";
import StarRating from "../elements/StarRating";
import useUser from "../../hooks/useUser";
import { api_CreateProduct } from "../../api/product_api";
import ProfileImage from "../elements/ProfileImage";

export default function ProductReviews({product}) {
    const [reviews, setReviews] = useState([]);
    const [sortOption, setSortOption] = useState(0);
    const [writingReview, setWritingReview] = useState(false);

    useEffect(() => {
        if(product !== null)
            loadProductReviews(product.productId);
    }, [product])

    useEffect(() => {
        //console.log(sortOption)
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
            //console.log(data)
            setReviews(data)
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="my-8">
            <div className="mb-4">
                <p className="text-3xl font-semibold">Customer Reviews</p>
            </div>
                
            <div className="px-8">
                <div className="mb-4 flex gap-2 items-start">
                    <p className="text-lg font-semibold">{product.rating} out of 5</p>
                    <StarRating rating={product.rating}/>
                    <p className="text-gray-500">{product.reviewsCount}, reviews</p>
                </div>

                <div>
                {writingReview &&
                <ReviewForm product={product} setWritingReview={setWritingReview} 
                loadReviews={() => loadProductReviews(product.productId)}/>
                }

                {reviews.length > 0 &&
                <>
                    <div className="mb-4 flex gap-4">
                        {!writingReview &&
                        <button onClick={() => setWritingReview(true)}
                        className="px-4 py-2 hover:bg-blue-700 bg-blue-600 text-white rounded-sm">
                            <p className="text-sm">Write a Review</p>
                        </button>}

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
                </>}
                </div>
            </div>
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
        <div className="py-4 px-4 border border-gray-400 shadow">
            <div className="flex justify-between items-start">
                <div className="flex gap-2 items-center">
                    <ProfileImage user={review.user} dimension={32}/>
                    <p>{review.user.firstName} {review.user.lastName}</p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-gray-500 text-sm">{formattedDate}</p>
                    <StarRating rating={review.rating} dimension={20}/>
                </div>
            </div>
            <div className="mt-2">  
                <p className="text-lg font-semibold">{review.title}</p>
            </div>
            <div className="w-full">
                <p className="">{review.content}</p>
            </div>
        </div>
    )
}

function ReviewForm({setWritingReview, product, loadReviews}) {
    const {user} = useUser();
    const { register, handleSubmit, setValue, clearErrors, watch,setError, formState: { errors } } = useForm();
    const watchRating = watch('rating');

    async function handleSubmitReview(data) {
        if(watchRating === undefined || watchRating === null) {
            setError('rating', {type: 'custom', message: 'Please, provide rating'})
            return;
        }

        await api_CreateReview({
            userId: user.userId,
            productId: product.productId,
            ...data})
        .then((dataResponse) => {
            console.log(dataResponse)
            loadReviews()
            setWritingReview(false);
        })
        .catch(err => console.log(err)) 
    }

    return(
        <div className="bg-blue-50 px-16 py-8 border border-gray-400">
            <p className="font-semibold text-lg mb-4">Write a review for {product.productName}</p>
            <form onSubmit={handleSubmit(handleSubmitReview)} className="text-sm ">
                
                <div className="mb-4 flex items-start">
                    <div className="w-32">
                        <p className="font-semibold">Rating</p>
                    </div>
                    <div>
                        <StarRating rating={watchRating} dimension={'1.5em'}
                        onChangeRating={(newRating) => {
                            clearErrors('rating');
                            setValue('rating', newRating)
                            }}/>
                        <ErrorMessage errors={errors} name="rating"
                        render={({ message }) => <p className="text-red-500 mt-2">{message}</p>}/>
                    </div>
                </div>

                <div className="mb-4 flex items-start">
                    <div className="w-32">
                        <p className="font-semibold">Title</p>
                    </div>
                    <div className="grow">
                        <input 
                        {...register('title', {required: 'Please provide title'})}
                        className="w-full py-1 px-2 border border-gray-400 " type="text"/>
                        <ErrorMessage errors={errors} name="title"
                        render={({ message }) => <p className="text-red-500">{message}</p>}/>
                    </div>
                </div>


                <div className="mb-4 flex items-start">
                    <div className="w-32">
                        <span className="font-semibold">Review</span>
                    </div>
                    <div className="grow">
                        <textarea 
                        {...register('content', {required: 'Please provide review content'})}
                        className="w-full h-48 py-1 px-2 border border-gray-400"/>
                        <ErrorMessage errors={errors} name="content"
                        render={({ message }) => <p className="text-red-500">{message}</p>}/>
                    </div>
                </div>

                <div className="flex gap-2 justify-end">
                    <button 
                    className="w-32 py-2 bg-blue-600 text-white rounded-sm text-sm hover:bg-blue-700"
                    type="submit">Upload</button>
                    <button 
                    className="w-32 py-2 text-blue-600 border-blue-600 border rounded-sm text-sm hover:bg-gray-200"
                    onClick={() => setWritingReview(false)}
                    type="button" >Cancel</button>
                </div>
            </form>
        </div>
    );
}