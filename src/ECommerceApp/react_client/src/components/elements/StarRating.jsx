import StarRatings from "react-star-ratings";

export default function StarRating({rating, dimension=null, spacing=null}) {
    return (
        <StarRatings
        numberOfStars={5} rating={rating} 
        starRatedColor="orange"
        starDimension={dimension !== null ? dimension : "1.25em"}
        starSpacing={spacing !== null ? spacing : "0.05em"}/>
    );
}