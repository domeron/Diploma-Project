import { useContext } from "react";
import { ProductListContext } from "../../context/ProductListContext";

export default function SearchListInput() {
    const {startPattern, setStartPattern} = useContext(ProductListContext)

    function handleChange(e) {
        console.log(e.target.value)
        setStartPattern(e.target.value)
    }

    return (
        <div className="basis-0 h-full bg-white border border-blue-600">
            <input value={startPattern} onChange={handleChange}
            className="h-full px-2 py-1 w-full outline-none" type="text" placeholder="Search"/>
        </div>
    );
}