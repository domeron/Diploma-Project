import { useEffect } from "react";
import { useState } from "react";
import {ReactComponent as TrashIcon} from "../assets/svg/trashIcon.svg"

export default function ProductImagesView({productImagesURLS}) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        console.log(productImagesURLS)
    }, [productImagesURLS])
    

    return (
        productImagesURLS && productImagesURLS.length > 0 &&
        <div className="w-full my-2">
            <div className="w-96 h-96 flex justify-center 
            border-[1px] border-gray-400 mb-4">
                <img className="object-contain max-w-full max-h-full" 
                src={`https://localhost:7077/${productImagesURLS[selectedImageIndex]}`} alt='img'/>
            </div>
            <div className="w-96 flex flex-wrap gap-2 justify-items-start">
                {productImagesURLS.map((imageURL, index) => {
                    return (
                        <div key={index}
                        className='relative w-20 h-20 flex items-center justify-center 
                        border-[1px] border-gray-400 
                        cursor-pointer'
                        onClick={() => setSelectedImageIndex(index)}>
                            <img className="object-contain max-w-full max-h-full" 
                            src={`https://localhost:7077/${imageURL}`} alt='img'/>
                            <div className="w-full h-full hover:bg-black hover:opacity-30 absolute"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}