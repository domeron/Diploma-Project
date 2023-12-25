import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASEURL

export async function api_GetCategoryById(categoryId)
{
    const promise = axios.get(`category/${categoryId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetCategoryByIdWithChildren(categoryId)
{
    const promise = axios.get(`category/children/${categoryId}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetAllCategories()
{
    const promise = axios.get('/Category/All');
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_GetAllCategoriesWithChildren()
{
    const promise = axios.get('/Category/All/Children');
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_CreateProductCategory(model) {
    const promise = axios.post('/category/create', model);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}

export async function api_RenameProductCategory(cateogryId, name) {
    const promise = axios.post(`/category/update?categoryId=${cateogryId}&name=${name}`);
    const dataPromise = await promise.then((response) => response.data);
    return dataPromise;
}