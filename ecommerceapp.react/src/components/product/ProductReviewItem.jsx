import ProfileImage from "../profile/ProfileImage"
import StarRating from "./StarRating"

export default function ProductReviewItem({review}) {
    const date = new Date(review.createdOn)
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    })

    return (
        <div className="p-6 border border-gray-400">
            <div className="flex mb-4 justify-between items-start">
                <div className="flex gap-4 items-center">
                    <ProfileImage profileImagePath={review.userProfileImagePath} userName={review.userName} dimension={36}/>
                    <p className="font-semibold">{review.userName}</p>
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