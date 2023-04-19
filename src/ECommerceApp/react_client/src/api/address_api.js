import axios from "axios";

export async function api_CreateShippingAddress(userId, data) {
    const promise = axios.get(`https://localhost:7077/ShippingAddress/${userId}`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}