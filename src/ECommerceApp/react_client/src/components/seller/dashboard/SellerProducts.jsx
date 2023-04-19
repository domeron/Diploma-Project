import { useContext, useEffect, useState } from "react";
import { SellerContext } from "../../../pages/SellerDashboard";
import { api_GetProductsOfSeller } from "../../../api/product_api";
import SellerProductListItem from "../SellerProductListItem";
import { Spinner3 } from "styled-icons/evil";
import ProductCreateForm from "../ProductCreateForm";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { AddCircle } from "styled-icons/fluentui-system-regular";

export default function SellerProducts() {
    const {seller} = useContext(SellerContext);
    const [addingProduct, setAddingProduct] = useState(false);
    return (
        <div className="px-8 pt-4 pb-16 text-sm">
            <div className="py-4 mb-2 flex items-start justify-between border-b border-gray-300">
                <p className="text-2xl font-semibold">
                    {addingProduct 
                    ? 'Create New Product'
                    : `Products - ${seller.sellerName}`}
                </p>
                {!addingProduct &&
                <button className="group flex gap-1 items-center py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded"
                onClick={() => setAddingProduct(true)}>
                    <AddCircle className="w-5 h-5 group-hover:-translate-x-1 transition-transform"/>
                    <p>Add New Product</p>
                </button>
                }
            </div>

            {addingProduct 
            ? 
            <>
            <div className="group w-fit p-2 flex gap-1 items-center cursor-pointer hover:bg-gray-200" onClick={() => setAddingProduct(false)}>
                <ChevronLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform"/>
                <p className="group-hover:underline">Back</p>
            </div>
            <ProductCreateForm onCreate={() => setAddingProduct(false)}/>
            </>
            : 
            <>
            <SellerProductsList sellerId={seller.sellerId}/>
            </>
            }
        </div>
    );
}

function SellerProductsList({sellerId}) {
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
        })
        .catch(err => console.log(err));
        setLoading(false)
    }

    return (
        <>
        <div className="flex flex-col">
            {loading && 
            <div>
                <Spinner3 className="w-8 h-8 animate-spin "/>
            </div>}
            
            {products.length > 0 ?
                products.map((product, index) => {
                    return <SellerProductListItem key={index} product={product}/>
                })
                : <div className="text-lg">No Products.</div>
            }
        </div>
        </>
    );
}