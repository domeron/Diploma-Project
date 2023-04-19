import axios from "axios";

export async function api_CreateSeller(data) {
    const promise = axios.post(`https://localhost:7077/Seller/Create`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetSellerById(sellerId) {
    const promise = axios.get(`https://localhost:7077/Seller/${sellerId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_UpdateSeller(sellerId, data) {
    const promise = axios.put(`https://localhost:7077/Seller/Update/${sellerId}`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}