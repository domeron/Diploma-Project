export default function ProductGridView({product}) {
    return (
        <div className="flex flex-col w-52 border-2 border-black">
            <div className="-z-50 w-52 h-52 border flex items-center justify-center">
                <img className="object-contain" 
                src={`https://localhost:7077/${product.frontImagePath}`} />
            </div>

            <div className="">
                <p className="text-lg font-semibold">{product.productName}</p>
                <p className="text-2xl">${product.priceUSD}</p>
            </div>
        </div>
    );
}