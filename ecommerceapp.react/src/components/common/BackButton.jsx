import { ChevronLeft } from "@mui/icons-material";


export default function BackButton({onBack}) {
    return (
        <div onClick={onBack}
        className="group w-fit p-2 flex gap-1 items-center cursor-pointer hover:bg-gray-200" >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform"/>
            <p className="group-hover:underline">Back</p>
        </div>
    );
}