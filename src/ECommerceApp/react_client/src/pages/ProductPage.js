import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import { UserContext } from "../App";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import StarRatings from "react-star-ratings";
import ProductImagesView from "../components/ProductImagesView";


export default function ProductPage() {
    const currentLocation = useLocation();
    const navigate = useNavigate();

    const [product, setProduct] = useState();

    const {user, setUser} = useContext(UserContext);
    const [addedToCart, setAddedToCart] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [isWritingReview, setIsWritingReview] = useState(false);
    const [sortOption, setSortOption] = useState('');
    const { register, getValues,setValue,watch, setError, 
        reset, clearErrors, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            rating: 0
        }
    });
    const watchRating = watch('rating');

    useEffect(() => {
        loadProduct(currentLocation.state);
        
        loadReviewsSorted('highest-rating');
    }, [currentLocation])

    function handleBackButton() {
        navigate(-1);
    }

    async function loadReviews() {
        setSortOption('newest');
        await loadReviewsSorted('newest');
    }

    async function loadReviewsSorted(sortOption) {
        setSortOption(sortOption);
        await axios.get(`https://localhost:7077/ProductReview/${currentLocation.state}/${sortOption}`)
        .then((response) => {
            console.log(response.data);
            setReviews(response.data);
        })
        .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) { console.log(error.request);
        } else { console.log('Error', error.message); }
        console.log(error.config);
        });
    }

    async function loadProduct(productId) {

        await axios.get(`https://localhost:7077/Product/${productId}`)
        .then((response) => {
            console.log(response.data);
            setProduct(response.data);
        })
        .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) { console.log(error.request);
        } else { console.log('Error', error.message); }
        console.log(error.config);
        });
    }

    function handleReviewWrite() {
        setIsWritingReview(true);
    }

    function handleCancelReviewWrite() {
        setIsWritingReview(false);
        reset();
    }

    async function handleReviewSubmit(data) {
        console.log(data);
        if(data.rating === 0) {
            setError('rating', { type: 'custom', message: 'You must provide rating'});
            return;
        }
        await axios.post('https://localhost:7077/ProductReview/Create', 
        {title: data.title, content: data.content, rating: data.rating, productId: product.productId,
        userId: user.userId})
        .then((response) => {
            console.log(response.data);
            setIsWritingReview(false);
            setProduct(response.data.product);
            reset();
            loadReviews();
        })
        .catch(function (error) {
        if (error.response) {
            if(error.response.data === 'Review By User For Product Exists') {
                setError('form', { type: 'custom', message: 'You already rated this product'});
            }
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) { console.log(error.request);
        } else { console.log('Error', error.message); }
        console.log(error.config);
        });
    }

    async function handleSortChange(e) {
        if(e.target.value !== 0) {
            console.log(e.target.value);
            await loadReviewsSorted(e.target.value);
        }
    }

    function handleAddToCart() {
        axios.post(`https://localhost:7077/User/Cart/Add/${user.userId}/${product.productId}`)
        .then((response) => {
            console.log(response.data);
            setAddedToCart(true);
        })
        .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) { console.log(error.request);
        } else { console.log('Error', error.message); }
        console.log(error.config);
        });
    }

    return (
        <>
        <Header/>
        <div className="bg-slate-100 py-12">
            <div className="container mx-auto py-6 flex gap-x-2 items-start">
                {product && (
                <>
                <div className="border grow px-6 bg-white py-6">
                    <div>
                        <span className="underline cursor-pointer" onClick={handleBackButton}>Back</span>
                    </div>
                    <div className="flex gap-6 my-4">
                        <div>
                            <ProductImagesView productImagesURLS={product.imagesURL}/>
                        </div>
                        <div className="flex flex-col">
                            {/* PRODUCT NAME */}
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold">{product.productName}</h2>
                            </div>

                            {/* CATEGORY */}
                            <div className="text-sm breadcrumbs">
                                <ul>
                                    {product.category.parent && product.category.parent.parent && <li>{product.category.parent.parent.categoryName}</li>}
                                    {product.category.parent && <li>{product.category.parent.categoryName}</li>}
                                    <li>{product.category.categoryName}</li> 
                                </ul>
                            </div>

                            {/* RATING */}
                            <div className="mb-4 flex items-start gap-2">
                                <span className="text-lg">{product.rating}</span>
                                <StarRatings rating={product.rating}
                                starRatedColor="orange" starDimension="1.5em" starSpacing="0.05em" name='rating'/>
                                <span className="text-blue-600 text-lg">({product.reviewsCount})</span>
                            </div>
                            {/* {PRICE} */}
                            <div className="mb-2">
                                <p>Price: <span className="font-semibold">${product.priceUSD}</span></p>
                            </div>
                            {/* QUANTITY */}
                            <div className="mb-2">
                                <p>Quantity: <span className="font-semibold">{product.quantity}</span></p>
                            </div>
                            {/* DESCRIPTION */}
                            <div className="mb-2 w-96">
                                <p className="mb-2">Description:</p>
                                <p className="p-4 border-2">{product.productDescription}</p>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        {reviews.length > 0 
                        ? (<h2 className="text-lg font-semibold mb-2">Reviews</h2>)
                        : (<h2 className="text-lg font-semibold mb-2">No Reviews</h2>)}
                        {reviews.length > 0 
                        && (<div className="mb-4">
                        <select value={sortOption} onChange={handleSortChange} className="px-2 py-1">
                            <option value={''}>Sort</option>
                            <option value={'oldest'}>Oldest first</option>
                            <option value={'newest'}>Newest first</option>
                            <option value={'highest-rating'}>Highest Rating</option>
                        </select></div>)}
                        {user && (
                            <>
                            {!isWritingReview ? (
                                <button onClick={handleReviewWrite}
                                className="text-sm text-white py-2 px-4 rounded-md bg-blue-500">Write a Review</button>
                            ) : (
                                <div>
                                    <form onSubmit={handleSubmit(handleReviewSubmit)} className="my-2 w-2/4">
                                        <div>
                                            <p>Rating</p>
                                            <StarRatings rating={getValues('rating')} starRatedColor="orange"
                                            starDimension="1.5em" starSpacing="0.05em" name='rating' starHoverColor="orange"
                                            changeRating={(newRating) => {
                                                setValue('rating', newRating);
                                                clearErrors('rating')}}/>
                                            <ErrorMessage errors={errors} name="rating"
                                            render={({ message }) => <p className="text-red-500 italic">{message}</p>}/>
                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="title" className="block mb-2">Title:</label>
                                            <input className="w-full border-2 border-gray-300 rounded-md px-2 py-2"
                                            type="text" name="title" placeholder="Title" {...register('title', 
                                            {required: 'The title is required'})}/>
                                            <ErrorMessage errors={errors} name="title"
                                            render={({ message }) => <p className="text-red-500 italic">{message}</p>}/>
                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="content" className="block mb-2">Review:</label>
                                            <textarea maxLength={1048}
                                            className="w-full h-32 border-2 border-gray-300 rounded-md px-2 py-2 resize-none"
                                            name="content" {...register('content')}/>
                                        </div>
                                        <div>
                                            <button type="submit"
                                            className="text-sm py-2 mr-2 text-white px-4 rounded-md bg-blue-500">Submit</button>
                                            <button onClick={handleCancelReviewWrite}
                                            className="text-sm py-2 text-white px-4 rounded-md bg-red-500">Cancel</button>
                                        </div>
                                        <ErrorMessage errors={errors} name="form"
                                        render={({ message }) => <p className="text-red-500 italic">{message}</p>}/>
                                    </form>
                                </div>
                            )
                            }
                            </>
                        )}
                        {reviews.length > 0
                        && reviews.map((review) => (<ReviewItem key={review.id} review={review}/> ))}
                    </div>
                </div>

                {/* RIGHT SIDE TAB */}
                <div className="w-64 bg-white p-6 border">
                    <div className="mb-4">
                        <span className="text-2xl font-semibold">${product.priceUSD}</span>
                    </div>
                    <div>
                        <span>In Stock: {product.quantity}</span>
                    </div>
                    <div className="my-2">
                        {addedToCart 
                        ? 
                        <div className="flex content-center">Added to Cart!</div>
                        : 
                        <button className="py-2 w-full bg-blue-500 text-white font-semibold rounded-md"
                        onClick={handleAddToCart}> Add to Cart</button>
                        }
                    </div>
                    <div className="my-2">
                        <button className="py-2 w-full bg-purple-500 text-white font-semibold rounded-md">
                            By Now</button>
                    </div>
                </div>
                </>
                )}
            </div>
        </div>
        </>
    );
}

function ReviewItem({review}) {
    return (
        <div className="border-2 rounded-md py-4 px-4 my-2">
            <div className="flex justify-between w-full">
                <div>
                    <h3>{review.user.firstName} {review.user.lastName}</h3>
                </div>
                <div>
                    <span className="text-gray-500 italic">{review.createdOn}</span>
                </div>
            </div>
            <div>
                <p className="font-semibold text-lg">{review.title}</p>
                <StarRatings rating={review.rating} starRatedColor="orange" starDimension="1.25em" starSpacing="0.05em"/>
                <p>{review.content}</p>
            </div>
        </div>
    );
}