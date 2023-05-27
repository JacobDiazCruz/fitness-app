import { useState } from "react";
import { useRouter } from 'next/navigation';
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";

export default function Sidebar () {
  const router = useRouter();
  const [navItems, setNavItems] = useState([
    {
      icon: "",
      name: "Profile",
      path: "/manager/profile"
    },
    {
      icon: "",
      name: "Exercises",
      path: "/manager/exercises"
    },
    {
      icon: "",
      name: "Workouts",
      path: "/manager/workouts"
    }
  ]);

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: '#FFF',
        width: '250px',
        height: '100vh',
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: '#ECECEC',
        position: 'sticky',
        top: 0
      }}
    >
      <List>
        {navItems.map((item) => (
          <ListItem disablePadding>
            <ListItemButton onClick={() => router.push(item.path)}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}