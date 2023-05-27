import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Avatar, Box, Typography } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { usePathname } from 'next/navigation';

export default function Header () {
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dropdownIcon: SVGAElement = <svg t="1685162255200" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2379" width="18" height="18"><path d="M725.333333 426.666667L512 640 298.666667 426.666667z" p-id="2380"></path></svg>;

  const UserMenu = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem 
          onClick={() => router.push('/manager/exercises')}
        >Go to manager</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    );
  };

  return (
    <Box
      sx={{
        p: 5,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Typography variant="h5">Exercises</Typography>

      {/* Avatar action */}
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={handleClick}
      >
        <Avatar
          alt="User Profile"
          sx={{
            width: 45,
            height: 45
          }}
          src="https://res.cloudinary.com/dqrtlfjc0/image/upload/v1676531024/Oneguru%20Projects/Identifying%20the%20primary%20actions%20and%20sections/Q3_ITEM_B_zcgwbk.png"
        />
        <Box>
          {dropdownIcon}
        </Box>
      </Box>
      <UserMenu />
    </Box>
  );
}