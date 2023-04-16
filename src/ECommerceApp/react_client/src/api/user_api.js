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