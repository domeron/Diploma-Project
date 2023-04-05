import { useEffect } from "react";
import { useState } from "react";
import {ReactComponent as TrashIcon} from "../assets/svg/trashIcon.svg"

export default function ProductImagesViewDashboard({files, onDeleteImage, setFrontImage}) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [images, setImages] = useState([]);
    useEffect(() => {
        setImages(files.map((file) => 
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        ));
    }, [files])


    return (
        images && images.length > 0 &&
        <div className="w-full my-2">
            <div className="w-96 h-96 flex justify-center 
            border-[1px] border-gray-400 mb-4">
                <img className="object-contain max-w-full max-h-full" 
                src={images[selectedImageIndex].preview} alt='img'/>
            </div>
            <div className="mb-4">
                <input className="mr-2" name="setAsFrontCheckbox" type="checkbox"
                checked={selectedImageIndex === 0}
                onChange={(e) => {
                    setSelectedImageIndex(0);
                    setFrontImage(e, selectedImageIndex)
                    }}/>
                <label className="text-sm" htmlFor="setAsFrontCheckbox">
                    {selectedImageIndex === 0 ? 'Front Image' : 'Set as front image'}</label>
            </div>
            <div className="w-full flex flex-wrap gap-2 justify-items-start">
                {images.map((image, index) => {
                    return (
                        <div key={index}
                        className={`relative w-28 h-28 flex items-center justify-center 
                        border-[1px] border-gray-400 
                        cursor-pointer ${index === 0 && 'outline-double outline-1'}`}
                        onClick={() => setSelectedImageIndex(index)}>
                            <img className="object-contain max-w-full max-h-full" 
                            src={image.preview} alt='img'/>
                            <div className="w-full h-full hover:bg-black hover:opacity-30 absolute"></div>

                            <span className="absolute right-0 bottom-0 p-1 bg-white border-t-[1px] border-l-[1px] 
                            border-gray-400 hover:p-2"
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedImageIndex(0)
                                onDeleteImage(index)
                            }}>
                                <TrashIcon/>
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}