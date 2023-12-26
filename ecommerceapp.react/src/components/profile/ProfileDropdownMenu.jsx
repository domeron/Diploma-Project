import GridViewIcon from '@mui/icons-material/GridView';
import { Fade, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { UserContext } from '../../App';
import ProfileImage from './ProfileImage';
import { AccountCircle, FavoriteBorder, Logout } from '@mui/icons-material';

export default function ProfileDropdownMenu({user}) {
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)
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
        <div className="flex gap-2 items-center cursor-pointer hover:bg-indigo-800"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
            <p>{user.firstName}</p>
            <ProfileImage dimension={24} profileImagePath={user.profileImagePath}/>
        </div>
        
        <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        TransitionComponent={Fade}>

            <MenuItem onClick={() => {
                handleClose();
                navigate('/Profile')
            }}>
                <ListItemIcon>
                    <AccountCircle fontSize="medium" className='text-blue-500'/>
                </ListItemIcon>
                Profile
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <FavoriteBorder fontSize="medium" className='text-blue-500'/>
                </ListItemIcon>
                Favorites
            </MenuItem>
            {user.isSeller &&
            <MenuItem onClick={() => {
                handleClose()
                navigate('/seller/dashboard')
            }}>
                <ListItemIcon>
                    <GridViewIcon fontSize="medium" className='text-blue-500'/>
                </ListItemIcon>
                Seller Dashboard
            </MenuItem>
            }
            <MenuItem onClick={() => {
                handleClose()
                setUser(null)
                navigate('/')
                }}>
                <ListItemIcon>
                    <Logout fontSize="medium" className='text-blue-500'/>
                </ListItemIcon>
                Sign-Out
            </MenuItem>
        </Menu>
        </>
    );
}