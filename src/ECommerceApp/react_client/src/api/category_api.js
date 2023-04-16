import axios from "axios";

export async function api_GetAllCategoriesWithChildren() {
    const promise = axios.get(`https://localhost:7077/Category/Top`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetCategoryById(categoryId) {
    const promise = axios.get(`https://localhost:7077/Category/${categoryId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}
