import axios from "axios";

export async function api_GetAllCountries() {
    const promise = axios.get(`https://localhost:7077/Country/All`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}
