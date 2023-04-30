import axios from "axios";

export async function api_GetAllProductsInCategory(categoryId) {
    const promise = axios.get(`https://localhost:7077/Product/Category/${categoryId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetRandomProductsInCategory(categoryId, quantity) {
    const promise = axios.get(`https://localhost:7077/Product/Category/${categoryId}/Random/${quantity}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetProductById(productId) {
    const promise = axios.get(`https://localhost:7077/Product/${productId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetProductsInUserCart(userId) {
    const promise = axios.get(`https://localhost:7077/User/Cart/${userId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetProductsOfSeller(sellerId) {
    const promise = axios.get(`https://localhost:7077/Product/Seller/${sellerId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetRandomProducts(quantity) {
    const promise = axios.get(`https://localhost:7077/Product/Random/${quantity}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_DeleteProductFromUserCart(productId, userId) {
    const promise = axios.delete(`https://localhost:7077/User/Cart/${userId}/${productId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_AddProductToUserCart(productId, userId) {
    const promise = axios.post(`https://localhost:7077/User/Cart/Add/${userId}/${productId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_IsProductExistInUserCart(productId, userId) {
    const promise = axios.get(`https://localhost:7077/User/Cart/${userId}/HasProduct/${productId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_CreateProduct(data) {
    const promise = axios.post(`https://localhost:7077/Product/Create`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_UpdateProduct(productId, data) {
    const promise = axios.put(`https://localhost:7077/Product/Update/${productId}`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}