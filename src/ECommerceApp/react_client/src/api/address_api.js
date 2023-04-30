import axios from "axios";

export async function api_CreateShippingAddress(userId, data) {
    const promise = axios.post(`https://localhost:7077/User/ShippingAddress/${userId}`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetUserShippingAddress(userId) {
    const promise = axios.get(`https://localhost:7077/User/ShippingAddress/${userId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_UpdateUserShippingAddress(data) {
    const promise = axios.put(`https://localhost:7077/User/ShippingAddress`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}