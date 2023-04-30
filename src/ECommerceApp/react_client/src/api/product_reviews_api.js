import axios from "axios";

export async function api_GetAllReviewsAboutProduct(productId) {
    const promise = axios.get(`https://localhost:7077/ProductReview/${productId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_CreateReview(data) {
    const promise = axios.post(`https://localhost:7077/ProductReview/Create`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}