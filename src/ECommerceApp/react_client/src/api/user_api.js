import axios from "axios";

export async function api_UserLogin(data) {
    const promise = axios.post(`https://localhost:7077/User/Login`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_UserCreate(data) {
    const promise = axios.post(`https://localhost:7077/User/Create`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetUserById(userId) {
    const promise = axios.get(`https://localhost:7077/User/${userId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_UpdateUser(userId, data) {
    const promise = axios.put(`https://localhost:7077/User/Update/${userId}`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetUserShippingAddress(userId) {
    const promise = axios.get(`https://localhost:7077/User/ShippingAddress/${userId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}