import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_BASEURL

export async function api_GetProductById(productId) {
    const promise = axios.get(`/product/${productId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetProducts(params) {
    console.log(params);
    const promise = axios.get(`/product`, {params});
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_CreateProduct(data) {
    const promise = axios.post(`/product/create`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_UpdateProduct(data) {
    const promise = axios.post(`/product/update`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}
