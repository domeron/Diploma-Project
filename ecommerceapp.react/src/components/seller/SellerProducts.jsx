import { useContext, useEffect, useState } from "react";

import AutorenewIcon from '@mui/icons-material/Autorenew';
import { api_GetProducts } from "../../API/ProductAPI";
import { api_GetAllCategoriesWithChildren } from "../../API/ProductCategoryAPI";
import { useNavigate } from "react-router-dom";
import ProductCreateForm from "../forms/ProductCreateForm";
import ProductEditForm from "../forms/ProductEditForm";
import BackButton from "../common/BackButton";
import { SellerContext } from "../../pages/SellerDashboardPage";
import { Add } from "@mui/icons-material";

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
        <>
            <div className="pt-2 pb-4 mb-6 border-b border-gray-300 flex justify-between">
                <p className="text-2xl font-medium">
                    {addingProduct && 'Create New Product'}
                    {editingProductId && `Product Editing`}
                    {!addingProduct && !editingProductId && `Products - ${seller.sellerName}`}
                </p>
            </div>

            {!addingProduct && !editingProductId && <>
                <button 
                    className="px-4 py-2 mb-4 flex items-center gap-2 hover:bg-blue-800 bg-blue-500 text-white"
                    onClick={() => setAddingProduct(true)}>
                    <p>Add New Product</p>
                    <Add className="w-5 group-hover:-translate-x-1 transition-transform"/>
                </button></>
            }

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
        </>

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
        await api_GetProducts({sellerId:sellerId, sortOption: 0})
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

function SellerProductListItem({product, setEditingProductId}) {
    const navigate = useNavigate();
    return (
        <div className="flex w-full border border-gray-300">
            <div
            className="w-36 h-36 border-r border-gray-300 cursor-pointer hover:p-1 transition-all
            flex items-center justify-center">
                <img alt={''}
                className="object-cover h-full w-full" 
                src={`${process.env.REACT_APP_BASEURL}/${product.frontImagePath}`} />
            </div>
            <div className="py-2 px-4">
                <p className="text font-semibold">{product.productName}</p>
                <div>
                    <p onClick={() => {navigate(`/Product/${product.productId}`)}}
                    className="text-purple-500 hover:underline cursor-pointer">Go to store page</p>
                    <p onClick={() => {setEditingProductId(product.productId)}}
                    className="text-blue-500 hover:underline cursor-pointer">Edit</p>
                </div>
            </div>
        </div>
    );
}