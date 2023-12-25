export default function PriceTag({price}) {
    return (
        <div className="flex items-start gap-[0.2em]">
            <p className="text-xl leading-[0.75]">$</p>
            <p className="font-semibold text-2xl leading-[0.75]">{Math.floor(price)}</p>
            <p className="text-lg leading-[0.75]">{price.toString().split('.')[1] || '00'}</p>
        </div>
    )
}