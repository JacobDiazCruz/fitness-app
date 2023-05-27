import { useState } from "react";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box } from "@mui/system";

export default function Sidebar () {
  const router = useRouter();
  const pathname = usePathname();

  const [openNav, setOpenNav] = useState(true);
  const [navItems, setNavItems] = useState([
    {
      icon: <svg t="1685199933183" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8018" width="25" height="25"><path d="M858.5 763.6c-18.9-44.8-46.1-85-80.6-119.5-34.5-34.5-74.7-61.6-119.5-80.6-0.4-0.2-0.8-0.3-1.2-0.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-0.4 0.2-0.8 0.3-1.2 0.5-44.8 18.9-85 46-119.5 80.6-34.5 34.5-61.6 74.7-80.6 119.5C146.9 807.5 137 854 136 901.8c-0.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c0.1 4.4 3.6 7.8 8 7.8h60c4.5 0 8.1-3.7 8-8.2-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" p-id="8019"></path></svg>,
      name: "Profile",
      path: "/manager/profile"
    },
    {
      icon: <svg t="1685199965557" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8803" width="35" height="35"><path d="M781 290h-46c-50.729 0-92 41.271-92 92v95H377v-95c0-50.729-41.271-92-92-92h-46c-50.729 0-92 41.271-92 92v264c0 50.729 41.271 92 92 92h46c50.729 0 92-41.271 92-92v-95h266v95c0 50.729 41.271 92 92 92h46c50.729 0 92-41.271 92-92V382c0-50.729-41.271-92-92-92zM321 646c0 19.851-16.149 36-36 36h-46c-19.851 0-36-16.149-36-36V382c0-19.851 16.149-36 36-36h46c19.851 0 36 16.149 36 36v264z m496 0c0 19.851-16.149 36-36 36h-46c-19.851 0-36-16.149-36-36V382c0-19.851 16.149-36 36-36h46c19.851 0 36 16.149 36 36v264zM113 398c-15.464 0-28 12.536-28 28v176c0 15.464 12.536 28 28 28s28-12.536 28-28V426c0-15.464-12.536-28-28-28zM906 391c-15.464 0-28 12.536-28 28v176c0 15.464 12.536 28 28 28s28-12.536 28-28V419c0-15.464-12.536-28-28-28z" p-id="8804"></path></svg>,
      name: "Exercises",
      path: "/manager/exercises"
    },
    {
      icon: <svg t="1685199895910" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6990" width="24" height="24"><path d="M981.333333 938.666667 42.666667 938.666667c-25.6 0-42.666667-17.066667-42.666667-42.666667L0 128c0-25.6 17.066667-42.666667 42.666667-42.666667l938.666667 0c25.6 0 42.666667 17.066667 42.666667 42.666667l0 768C1024 921.6 1006.933333 938.666667 981.333333 938.666667zM85.333333 853.333333l853.333333 0L938.666667 170.666667 85.333333 170.666667 85.333333 853.333333z" p-id="6991"></path><path d="M981.333333 341.333333 42.666667 341.333333C17.066667 341.333333 0 324.266667 0 298.666667s17.066667-42.666667 42.666667-42.666667l938.666667 0c25.6 0 42.666667 17.066667 42.666667 42.666667S1006.933333 341.333333 981.333333 341.333333z" p-id="6992"></path><path d="M640 512 384 512c-25.6 0-42.666667-17.066667-42.666667-42.666667s17.066667-42.666667 42.666667-42.666667l256 0c25.6 0 42.666667 17.066667 42.666667 42.666667S665.6 512 640 512z" p-id="6993"></path></svg>,
      name: "Workouts",
      path: "/manager/workouts"
    },
    {
      icon: <svg width="26" height="26" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26.1215 2.18354H21.8231V1.67944C21.8231 1.20933 21.4567 0.829834 21.0028 0.829834C20.5489 0.829834 20.1824 1.20933 20.1824 1.67944V2.18354H7.60979V1.67944C7.60979 1.20933 7.24338 0.829834 6.78948 0.829834C6.33557 0.829834 5.96917 1.20933 5.96917 1.67944V2.18354H1.89221C1.28791 2.18354 0.798462 2.69048 0.798462 3.31636V27.0233C0.798462 27.6492 1.28791 28.1561 1.89221 28.1561H26.1215C26.7258 28.1561 27.2153 27.6492 27.2153 27.0233V3.31636C27.2153 2.69048 26.7258 2.18354 26.1215 2.18354ZM25.3039 26.1737H2.71252V10.6598H25.3039V26.1737ZM25.3039 8.9606H2.71252V3.88276H5.96917V4.38686C5.96917 4.85698 6.33557 5.23647 6.78948 5.23647C7.24338 5.23647 7.60979 4.85698 7.60979 4.38686V3.88276H20.1852V4.38686C20.1852 4.85698 20.5516 5.23647 21.0055 5.23647C21.4594 5.23647 21.8258 4.85698 21.8258 4.38686V3.88276H25.3039V8.9606ZM12.8625 15.613H21.6508C22.1485 15.613 22.5531 15.1939 22.5531 14.6785C22.5531 14.163 22.1485 13.7439 21.6508 13.7439H12.8625C12.3649 13.7439 11.9602 14.163 11.9602 14.6785C11.9602 15.1939 12.3649 15.613 12.8625 15.613ZM5.75042 15.9331L7.52229 17.7682L10.552 14.6303C10.8117 14.3613 10.8117 13.9223 10.552 13.6533C10.2922 13.3842 9.86838 13.3842 9.60862 13.6533L7.52229 15.8141L6.69377 14.956C6.43401 14.687 6.01018 14.687 5.75042 14.956C5.49065 15.225 5.49065 15.664 5.75042 15.9331ZM12.8625 22.2315H21.6508C22.1485 22.2315 22.5531 21.8124 22.5531 21.2969C22.5531 20.7815 22.1485 20.3624 21.6508 20.3624H12.8625C12.3649 20.3624 11.9602 20.7815 11.9602 21.2969C11.9602 21.8124 12.3649 22.2315 12.8625 22.2315ZM8.66252 20.368H6.80588C6.30823 20.368 5.90354 20.7872 5.90354 21.3026C5.90354 21.818 6.30823 22.2372 6.80588 22.2372H8.66252C9.16018 22.2372 9.56487 21.818 9.56487 21.3026C9.56487 20.7872 9.16018 20.368 8.66252 20.368Z" fill="#24282C"/></svg>,
      name: "Programs",
      path: "/manager/programs"
    },
  ]);

  return (
    <Box
      sx={{
        backgroundColor: '#FFF',
        width: openNav ? '250px' : '85px',
        height: '100vh',
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: '#ECECEC',
        position: 'sticky',
        top: 0
      }}
    >
      <Box sx={{ px: 4, pt: 4 }}>
        <Typography>Logo</Typography>
      </Box>
      <Box
        onClick={() => setOpenNav(!openNav)}
        sx={{
          borderRadius: '100%',
          width: '45px',
          height: '45px',
          display: 'flex',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: '#ECECEC',
          cursor: 'pointer',
          zIndex: 100,
          position: 'absolute',
          marginLeft: openNav ? '200px' : '60px',
          backgroundColor: '#FFF',
        }}
      >
        {openNav ? (
          <ArrowLeftIcon sx={{ m: 'auto' }} fontSize="large" />
        ) : (
          <ArrowRightIcon sx={{ m: 'auto' }} fontSize="large" />
        )}
      </Box>
      <List sx={{ pt: 7 }}>
        {navItems.map((item) => (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => router.push(item.path)} 
              disableRipple
              sx={{ 
                pl: 3,
                py: 2,
                borderRightStyle: pathname == item.path ? 'solid' : 'none',
                borderRightWidth: pathname == item.path ? '6px' : '0px',
                borderRightColor: pathname == item.path ? '#24282C' : '#FFF'
              }}
            >
              <ListItemIcon sx={{ color: '#90959A' }}>
                {item.icon}
              </ListItemIcon>
              {openNav && (
                <ListItemText 
                  primary={item.name} 
                  sx={{
                    color: pathname == item.path ? '#24282C' : '#7F8489'
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}