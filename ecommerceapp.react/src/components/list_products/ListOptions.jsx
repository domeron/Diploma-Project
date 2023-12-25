import { useContext } from "react";
import GridListSwitch from "./GridListSwitch";
import SearchListInput from "./SearchListInput";
import SortSelect from "./SortSelect";
import { ProductListContext } from "../../context/ProductListContext";

export default function ListOptions() {
    const {startPattern} = useContext(ProductListContext)

    return (
        <div className="mb-3 flex gap-2 justify-between">
            <div className="grow">
                <SearchListInput/>
            </div>
            {startPattern && startPattern != '' &&
                <div className="flex gap-2">
                    <GridListSwitch/>
                    <SortSelect/>
                </div>
            }
        </div>
    );
}