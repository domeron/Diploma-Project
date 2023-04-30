import ProfileImage from "./ProfileImage";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GridViewIcon from '@mui/icons-material/GridView';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdownMenu({user}) {
    const navigate = useNavigate()
    const {setUser} = useUser();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
        <div className="flex gap-1 items-center cursor-pointer hover:bg-indigo-800"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
            <p>{user.firstName}</p>
            <ProfileImage user={user} dimension={24}/>
        </div>
        <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.25))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            <MenuItem onClick={() => {
                handleClose();
                navigate('/Profile')
            }}>
                <ProfileImage user={user} dimension={20}/> 
                Profile
            </MenuItem>
            <Divider/>
            <MenuItem>
                <ListItemIcon>
                    <FavoriteBorderIcon fontSize="small"/>
                </ListItemIcon>
                Favorites
            </MenuItem>
            {user.isSeller &&
            <MenuItem onClick={() => {
                handleClose()
                navigate('/SellerDashboard')
            }}>
                <ListItemIcon>
                    <GridViewIcon fontSize="small"/>
                </ListItemIcon>
                Seller Dashboard
            </MenuItem>
            }
            <MenuItem onClick={() => {
                handleClose()
                setUser(null)
                }}>
                <ListItemIcon>
                    <LogoutIcon fontSize="small"/>
                </ListItemIcon>
                <p className="text-sm">Sign-Out</p>
            </MenuItem>
        </Menu>
        </>
    );
}