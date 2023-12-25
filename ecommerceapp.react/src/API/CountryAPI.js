import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_BASEURL

export async function api_GetCountries() {
    const promise = axios.get(`/country/all`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}