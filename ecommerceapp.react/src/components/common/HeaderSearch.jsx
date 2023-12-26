import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderSearch() {
    const inputSearchRef = useRef(null);
    const navigate = useNavigate()

    function handleSearch(e) {
        e.preventDefault();
        console.log(inputSearchRef.current.value)
        if(inputSearchRef.current.value !== '')
            navigate(`/search`, {state:{searchInput:inputSearchRef.current.value}})
    }

    return (
        <form className='group/search flex grow border border-blue-500 bg-white ' 
        onSubmit={handleSearch}>
            <input className="grow py-1 px-2 text-sm w-96 outline-none border-blue-500 "
            ref={inputSearchRef} type='text' placeholder="Search"/>
            <button type="submit" 
            className="px-4 py-0 text-white text-sm border-blue-500 bg-blue-500 hover:bg-blue-700">
                Search</button>
        </form>
    );
}