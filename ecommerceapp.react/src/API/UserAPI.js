import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASEURL

export async function api_UserLogin(data) {
    const promise = axios.post('/User/Login', data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_UserRegister(data) {
    const promise = axios.post('/User/Register', data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_UserUpdate(data) {
    const promise = axios.post('/User/Update', data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

//#region SHIPPING ADDRESS
export async function api_GetUserShippingAddress(userId) {
    const promise = axios.get(`/user/${userId}/shipping-address`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_CreateShippingAddress(data) {
    const promise = axios.post(`/shipping-address/create`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_UpdateShippingAddress(data) {
    const promise = axios.post(`/shipping-address/update`, data);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}
//#endregion 

//#region USER CART

export async function api_GetProductsInUserCart(userId) {
    const promise = axios.get(`/user/cart/${userId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_IsProductExistInUserCart(userId, productId) {
    const promise = axios.get(`/user/cart/has?userId=${userId}&productId=${productId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_AddProductToUserCart(productId, userId) {
    const promise = axios.post(`/user/cart/add?userId=${userId}&productId=${productId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_RemoveProductFromUserCart(userId, productId) {
    const promise = axios.delete(`/user/cart/remove?userId=${userId}&productId=${productId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

//#endregion

//#region USER FAVORITES

export async function api_GetProductsInUserFavorites(userId) {
    const promise = axios.get(`/user/${userId}/favorites`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_IsProductExistInUserFavorites(userId, productId) {
    const promise = axios.get(`/user/favorites/has?userId=${userId}&productId=${productId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_AddProductToUserFavorites(userId, productId) {
    const promise = axios.post(`/user/favorites/add?userId=${userId}&productId=${productId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_RemoveProductFromUserFavorites(userId, productId) {
    const promise = axios.delete(`/user/favorites?userId=${userId}&productId=${productId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

//#endregion