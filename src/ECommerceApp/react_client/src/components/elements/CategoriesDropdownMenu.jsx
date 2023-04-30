import ProfileImage from "./ProfileImage";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GridViewIcon from '@mui/icons-material/GridView';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useSearch from "../../hooks/useSearch";

export default function CategoriesDropdownMenu({categories}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const {category, setCategory} = useSearch();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
        <div 
        className="group/category px-4 py-1 flex items-center text-sm cursor-pointer"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
            <p className="">
                {category ?
                category.categoryName
                : 'All Categories'}
            </p>
            {open ? 
            <ExpandMoreIcon className="scal-110 text-blue-700"/>
            :
            <ChevronRightIcon className="scale-110 text-blue-700 group-hover/category:translate-x-1 group-hover/category:transition-all"/>
            }
        </div>

        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        >
            {categories.map((top, index) => {
                return (
                    <MenuItem onClick={() => {
                        setCategory(top)
                        handleClose()
                    }}
                    key={index}>
                        <p>{top.categoryName}</p>
                    </MenuItem>
                )
            })}
        </Menu>
        </>
    );
}