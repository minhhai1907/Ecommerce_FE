import React from 'react'
import {Stack} from "@mui/material"
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo"
function BlankLayout() {
  return (
  <Stack  minHeight="100vh" justifyContent="center" alignItems="center">
    <Logo sx={{height:90,width:90,mb:5}}/>
    <Outlet/>
  </Stack>
  )
}

export default BlankLayout
