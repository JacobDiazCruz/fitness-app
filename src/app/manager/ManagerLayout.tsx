'use client'

import { Box } from "@mui/system";
import Sidebar from "./Sidebar";
import Header from "./Header"

export default function ManagerLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%'
        }}
      >
        <Header />
        <Box sx={{ p: 5 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}