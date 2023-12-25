import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_BASEURL

export async function api_GetAllReviewsAboutProduct(params) {
    const promise = axios.get(`/product/reviews`, {params});
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_CreateReview(data) {
    const promise = axios.post(`/product/add-review`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_DeleteReview(reviewId) {
    const promise = axios.delete(`/product/delete-review?reviewId=${reviewId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}