import { useContext } from "react";
import { useForm } from "react-hook-form";
import { api_CreateReview } from "../../API/ProductReviewsAPI";
import StarRating from "../product/StarRating";
import { UserContext } from "../../App";
import { ErrorMessage } from "@hookform/error-message";

export default function ReviewForm({product, onCreate, setWritingReview}) {
    const {user} = useContext(UserContext);
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
            onCreate()
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