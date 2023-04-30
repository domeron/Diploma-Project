import { useContext, useEffect, useState } from "react";
import { SellerContext } from "../../../pages/SellerDashboard";
import { api_GetProductsOfSeller } from "../../../api/product_api";
import SellerProductListItem from "../SellerProductListItem";
import ProductCreateForm from "../ProductCreateForm";
import BackButton from "./BackButton";
import ProductEditForm from "../ProductEditForm";
import { api_GetAllCategoriesWithChildren } from "../../../api/category_api";

import AutorenewIcon from '@mui/icons-material/Autorenew';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function SellerProducts() {
    const {seller} = useContext(SellerContext);
    const [addingProduct, setAddingProduct] = useState(false);
    const [editingProductId, setEditingProductId] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, [])

    async function loadCategories() {
        await api_GetAllCategoriesWithChildren()
        .then((data) => {
            console.log(data)
            setCategories(data)
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="px-8 pt-4 pb-16 text-sm">
            <div className="py-4 mb-4 flex items-start justify-between border-b border-gray-300">
                <p className="text-2xl font-semibold">
                    {addingProduct && 'Create New Product'}
                    {editingProductId && `Product Editing`}
                    {!addingProduct && !editingProductId && `Products - ${seller.sellerName}`}
                </p>

                {!addingProduct && !editingProductId && <>
                    <button className="group flex gap-1 items-center py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded"
                    onClick={() => setAddingProduct(true)}>
                        <AddCircleIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform"/>
                        <p>Add New Product</p>
                    </button></>
                }
            </div>

            {addingProduct && <>
                <BackButton onBack={() => setAddingProduct(false)}/>
                <ProductCreateForm onCreate={() => setAddingProduct(false)} categories={categories}/>
            </>}

            {editingProductId && <>
                <BackButton onBack={() => setEditingProductId(null)}/>
                <ProductEditForm productId={editingProductId} categories={categories}/>
            </>}

            {!addingProduct && !editingProductId &&
            <>
            <SellerProductsList sellerId={seller.sellerId} setEditingProductId={setEditingProductId}/>
            </>
            }
            
        </div>
    );
}

function SellerProductsList({sellerId, setEditingProductId}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('useEffect call in SellerProductsList')
        loadProductsOfSeller(sellerId);
    }, [])

    async function loadProductsOfSeller(sellerId) {
        setLoading(true)
        await api_GetProductsOfSeller(sellerId)
        .then((dataResponse) => {
            setProducts(dataResponse);
            console.log(dataResponse)
        })
        .catch(err => console.log(err));
        setLoading(false)
    }

    return (
        <>
        <div className="flex flex-col gap-4">
            {loading && 
            <div>
                <AutorenewIcon className="w-8 h-8 animate-spin "/>
            </div>}
            
            {products.length > 0 ?
                products.map((product, index) => {
                    return <SellerProductListItem key={index} product={product}
                    setEditingProductId={setEditingProductId}/>
                })
                : <div className="text-lg">No Products.</div>
            }
        </div>
        </>
    );
}