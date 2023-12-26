import { useContext } from "react";
import { ProductListContext } from "../../context/ProductListContext";

export default function SortSelect() {
    const {sortOption, setSortOption} = useContext(ProductListContext);

    function handleChange(e) {
        setSortOption(e.target.value);
    }

    return (
        <select onChange={handleChange} value={sortOption}
        className="basis-0 bg-white border border-blue-700 text-blue-700 px-2">
            <option value={2}>Sort by</option>
            <option value={2}>Rating</option>
            <option value={3}>Lower Price</option>
            <option value={4}>Higher Price</option>
            <option value={1}>Date: Older</option>
            <option value={0}>Date: Newer</option>
        </select>
    );
}