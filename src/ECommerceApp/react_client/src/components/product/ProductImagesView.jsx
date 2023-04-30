import { useEffect, useState } from "react";

export default function ProductImagesView({setImage=null, customizing=false, product}) {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [focusedImage, setFocusedImage] = useState(null);
    useEffect(() => {
        if(product.imagesURL) {
            setImages(Object.entries(product.imagesURL));
            setSelectedImage(Object.entries(product.imagesURL)[0]);
        }
    }, [product])

    useEffect(() => {
        if(setImage !== null && selectedImage !== null)
            setImage(selectedImage);
    }, [selectedImage])

    return (
        <div className={`flex items-start gap-4`}>
            {!customizing ? <>
                {images.length > 0 &&
                <div className={`h-96 flex flex-col gap-1 overflow-scroll`}>
                    {images.map((image, index) => {return <ProductImageThumbnail key={index} image={image} 
                    setFocusedImage={setFocusedImage} setChoosedImage={setSelectedImage} choosedImage={selectedImage}/>})}
                </div>}
                {selectedImage &&
    
                <div className="w-96 h-96 border border-gray-400">
                    <img src={`https://localhost:7077/${focusedImage !== null ? focusedImage[1] : selectedImage[1]}`} 
                    alt='image' className="w-full h-full object-contain"/>
                </div>}
            </>
            :
            <>
                {selectedImage &&
                <div className="w-96 h-96 border border-gray-400">
                    <img src={`https://localhost:7077/${focusedImage !== null ? focusedImage[1] : selectedImage[1]}`} 
                    alt='image' className="w-full h-full object-contain"/>
                </div>}

                {images.length > 0 && selectedImage &&
                <div className={`flex flex-wrap gap-1`}>
                    {images.map((image, index) => {return <ProductImageThumbnail key={index} image={image} 
                    setFocusedImage={setFocusedImage} setChoosedImage={setSelectedImage} choosedImage={selectedImage}/>})}
                </div>}
            </>
            }
        </div>
    );
}

function ProductImageThumbnail({image, choosedImage, setChoosedImage, setFocusedImage}) {
    return (
        <div 
        onMouseEnter={() => setFocusedImage(image)}
        onMouseLeave={() => setFocusedImage(null)}
        onClick={() => setChoosedImage(image)}
        className={`w-16 h-16 relative border border-gray-400 cursor-pointer hover:border-blue-500 `}>
            {choosedImage[0] !== image[0] && 
            <div className="w-full h-full bg-[rgb(60,60,60,0.3)] hover:bg-[rgb(60,60,60,0.0)] absolute top-0"></div>}
            <img src={`https://localhost:7077/${image[1]}`} alt="img thumbnail" className="w-full h-full object-contain"/>
        </div>
    );
}