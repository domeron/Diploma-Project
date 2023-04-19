export default function SellerProductListItem({product}) {
    return (
        <div className="p-6 w-full border">
            {product.productName}
        </div>
    );
}