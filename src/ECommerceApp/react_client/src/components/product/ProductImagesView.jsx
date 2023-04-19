import { useEffect, useState } from "react";

export default function ProductImagesView({product}) {
    const [imageURLS, setImageURLS] = useState([]);
    const [choosedImageURL, setChoosedImageURL] = useState();
    const [focusedImageURL, setFocusedImageURL] = useState(null);
    useEffect(() => {
        if(product.imagesURL.length > 0) {
            setImageURLS(product.imagesURL);
            setChoosedImageURL(product.imagesURL[0]);
        }
    }, [product])
    return (
        <div className="flex items-start gap-4">
            {imageURLS.length > 0 &&
            <div className="flex flex-col gap-1">
                {imageURLS.map((url, index) => {
                    return <ProductImageThumbnail key={index} imageURL={url} 
                    setFocusedImageURL={setFocusedImageURL}
                    setChoosedImageURL={setChoosedImageURL}/>
                })}
            </div>
            }
            {choosedImageURL &&
            <div className="w-96 h-96 border border-gray-400">
                <img src={`https://localhost:7077/${focusedImageURL !== null ? focusedImageURL : choosedImageURL}`} 
                alt='image' className="w-full h-full object-contain"/>
            </div>
            }
        </div>
    );
}

function ProductImageThumbnail({imageURL, setChoosedImageURL, setFocusedImageURL}) {
    return (
        <div 
        onMouseEnter={() => setFocusedImageURL(imageURL)}
        onMouseLeave={() => setFocusedImageURL(null)}
        onClick={() => setChoosedImageURL(imageURL)}
        className="w-16 h-16 border border-gray-400 cursor-pointer hover:border-blue-500">
            <img src={`https://localhost:7077/${imageURL}`} alt="img thumbnail" className="w-full h-full object-contain"/>
        </div>
    );
}