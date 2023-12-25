import { GridView, TableRows, ViewList, ViewStream } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { ProductListContext } from "../../context/ProductListContext";

export default function GridListSwitch() {
    const {listView, setListView} = useContext(ProductListContext)

    function handleViewChange(isList) {
        if(listView !== isList) {
            setListView(isList)
        }
    }

    return (
        <div title="List View" 
            className="basis-0 flex border border-blue-600 cursor-pointer">
            <div className={`p-1 ${listView ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
            onClick={() => handleViewChange(true)}>
                <TableRows className=""/>
            </div>
            <div title="Grid View"
            className={`p-1 ${!listView ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
            onClick={() => handleViewChange(false)}>
                <GridView className=""/>
            </div>
        </div>
    );
}