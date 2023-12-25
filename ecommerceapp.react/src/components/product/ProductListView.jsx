import { useContext, useEffect, useState } from "react";
import ListOptions from "../list_products/ListOptions";
import ProductListItem from "./ProductListItem";
import ProductGridItem from "./ProductGridItem";
import { ProductListContext } from "../../context/ProductListContext";
import { useFetcher, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { api_AddProductToUserFavorites, api_GetProductsInUserFavorites, api_RemoveProductFromUserFavorites } from "../../API/UserAPI";

export default function ProductListView() {
    const {listView, products, setProducts} = useContext(ProductListContext)
    const {user} = useContext(UserContext)
    const {favoritesPage} = useContext(ProductListContext)

    const [userFavoritesIds, setUserFavoritesIds] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if(user)
            loadUserFavorites()
    }, [user])

    async function loadUserFavorites()
    {
        await api_GetProductsInUserFavorites(user.userId)
        .then((data) => {
            const ids = data.map(p => p.productId);
            setUserFavoritesIds(ids)
            console.log(ids)
        })
    }

    async function handleAddToFavorites(productId) {
        await api_AddProductToUserFavorites(user.userId, productId)
        .then((data) => {
            setUserFavoritesIds(current => [...current, productId])
        }).catch(err => console.log(err))
    }

    async function handleRemoveFromFavorites(productId) {
        
        await api_RemoveProductFromUserFavorites(user.userId, productId)   
        .then((data) => {
            if(userFavoritesIds.indexOf(productId) != -1) {
                setUserFavoritesIds(current => current.filter(id => {return id !== productId}))
            }
            if(favoritesPage) {
                setProducts(current => current.filter(p => {return p.productId !== productId}))
            }
        }).catch(err => console.log(err))
        
    }

    return (
        <>
        {products && products.length > 0 ?
        (listView ?
        <div className="flex flex-col gap-3">
            {products.map((product, index) => {
                const isFavorite = userFavoritesIds.includes(product.productId)
                return (
                    <ProductListItem product={product} key={index} 
                    onClick={() => navigate(`/product/${product.productId}`)}
                    onAddToFavorites={handleAddToFavorites}
                    onRemoveFromFavorites={handleRemoveFromFavorites}
                    isFavorite={isFavorite}
                    />
                );
            }
            )}
        </div>
        :   
        <div className="flex flex-wrap gap-3">
            {products.map((product, index) => {
                const isFavorite = userFavoritesIds.includes(product.productId)
                return (
                    <ProductGridItem product={product} key={index} 
                    onClick={() => navigate(`/product/${product.productId}`)}
                    onAddToFavorites={handleAddToFavorites}
                    onRemoveFromFavorites={handleRemoveFromFavorites}
                    isFavorite={isFavorite}
                    /> 
                );
            }
            )}
        </div>)
        :
        <p>No results</p>
        }
        
        </>
    );
}