import axios from "axios";

export async function api_GetAllReviewsAboutProduct(productId) {
    const promise = axios.get(`https://localhost:7077/ProductReview/${productId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}