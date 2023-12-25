import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_BASEURL

export async function api_CreateSeller(data) {
    const promise = axios.post('/Seller/Create', data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetSellerById(sellerId) {
    const promise = axios.get(`/Seller/${sellerId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}