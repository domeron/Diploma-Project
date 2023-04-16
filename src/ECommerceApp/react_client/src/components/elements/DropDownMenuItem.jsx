import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DropDownMenuItem(props) {
    const navigate = useNavigate();
    useEffect(() => console.log(props))
    return (
        <div onClick={() => {
            if(props.url !== undefined) navigate(props.url)
            if(props.handleClick) props.handleClick();
        }}
        className="flex items-center gap-2 py-2 px-2 border-b border-x border-gray-400
        justify-end hover:bg-gray-200 cursor-pointer">
            {props.children}
        </div>
    );
}