import { Box, Stack } from '@mui/material';
import React from 'react'
import { Outlet } from "react-router-dom";
import CategoryBar from '../features/category/CategoryBar';
import SearchPage from '../pages/SearchPage';
import MainFooter from "./MainFooter"
import MainHeader from "./MainHeader"
function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
    <MainHeader />
    <Box sx={{ height: "80px" }}></Box>
    <SearchPage/>
    {/* <CategoryBar /> */}
    {/* <AlertMsg /> */}

    <Outlet />

    <Box sx={{ flexGrow: 1 }} />

    <MainFooter />
  </Stack>
  )
}

export default MainLayout
