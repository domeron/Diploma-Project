import { useContext } from "react";
import { SearchContext } from "../components/Header";

export default function useSearch() {
    const {searchRef, category, setCategory} = useContext(SearchContext);
    return {searchRef, category, setCategory}
}