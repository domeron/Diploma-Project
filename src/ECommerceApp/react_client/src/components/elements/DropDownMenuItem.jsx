import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DropDownMenuItem(props) {
    const navigate = useNavigate();

    return (
        <div onClick={() => {
            if(props.url !== undefined) navigate(props.url)
            if(props.handleClick) props.handleClick();
        }}
        className="flex items-center gap-1 py-2 px-2 border-b w-48 border-x border-gray-400
        justify-end hover:bg-gray-200 cursor-pointer">
            {props.children}
        </div>
    );
}