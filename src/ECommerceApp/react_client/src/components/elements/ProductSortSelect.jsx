import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function ProductSortSelect() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const sortOptions = [
        'Sort',
        'Price: Low to High',
        'Price: High to Low',
        'Rating: High to Low',
        'Rating: Low to High',
    ]
    const open = Boolean(anchorEl);
    const [sortOption, setSortOption] = React.useState(0)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className='flex items-center rounded-sm px-2 text-sm h-full bg-blue-600 text-white cursor-pointer hover:bg-blue-700'
        id="basic-button"
        onClick={handleClick}
      >
        {sortOptions[sortOption]}
        {open 
        ? <ExpandLessIcon className='h-6 w-6'/>
        : <ExpandMoreIcon className='h-6 w-6'/>
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
        <MenuItem onClick={() => {
            handleClose()
            setSortOption(1)
        }}>Price: Low to High</MenuItem>
        <MenuItem onClick={() => {
            handleClose()
            setSortOption(2)
        }}>Price: High to Low</MenuItem>
        <MenuItem onClick={() => {
            handleClose()
            setSortOption(3)
        }}>Rating: High to Low</MenuItem>
        <MenuItem onClick={() => {
            handleClose()
            setSortOption(4)
        }}>Rating: Low to High</MenuItem>
      </Menu>
    </div>
  );
}