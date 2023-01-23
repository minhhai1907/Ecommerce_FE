import { Box, Card, Container, Divider, Link, Stack, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import { styled } from '@mui/system';
import { capitalCase } from 'change-case';
import OrderPage from './OrderPage';
import CheckOutPage from './CheckOutPage';
import HomePage from './HomePage';
import HomeIcon from '@mui/icons-material/Home';
import ReorderIcon from '@mui/icons-material/Reorder';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { NavLink } from 'react-router-dom';


const TabsWrapperStyle=styled("div")(({theme})=>({
    zIndex:9,
    position:"absolute",
    width:"100%",
    bottom:0,
    display:"flex",
    backgroundColor:"#fff",
    [theme.breakpoints.up("sm")]:{
      justifyContent:"center",
    },
    [theme.breakpoints.up("md")]:{
      justifyContent:"center",
      paddingRight:theme.spacing(3),
    },
  }))
  const MenuItemstyled = styled(Link)(({ theme }) => ({
    cursor: "pointer",
  }));
function SearchPage() {
    const [currentTab,setCurrentTab]=useState("homepage")
    const TABS_VALUES=[
      {
        id:1,
        value:"homepage",
        icon:<HomeIcon sx={{fontSize:24}}/>,
        component:<HomePage />
      },
      {
        id:2,
        value:"order",
        icon:<ReorderIcon sx={{fontSize:24}}/>,
        component:<OrderPage/>
      },
      {
        id:3,
        value:"checkout",
        icon:<DoneOutlineIcon sx={{fontSize:24}}/>,
        component:<CheckOutPage/>
      },
    //   {
    //     id:4,
    //     value:"add_friends",
    //     icon:<PersonAddIcon sx={{fontSize:24}}/>,
    //     component:<AddFriend/>
    //   },
    ]
    return (
      <Container>
           <Stack
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <MenuItemstyled component={NavLink} to="/">
              Home
            </MenuItemstyled>
            {/* <MenuItemstyled component={NavLink} to="/category">
              Category
            </MenuItemstyled> */}
            <MenuItemstyled component={NavLink} to="/checkout">
              Checkout
            </MenuItemstyled>
            <MenuItemstyled component={NavLink} to="/order">
              Order
            </MenuItemstyled>
          </Stack>
        {/* <Card sx={{
          height:50,
          position:"relative",
          mb:3,
          mt:2
        }}>
          {/* <ProfileCover profile={user}/> */}
          {/* <TabsWrapperStyle>
        <Tabs
        variant="scrollable"
        scrollButtons
        value={currentTab}
        onChange={(e,value)=>setCurrentTab(value)}>
          {TABS_VALUES.map((tab)=>
          <Tab
          key={tab.value}
          disableRipple
          value={tab.value}
          label={capitalCase(tab.value) }
          icon={tab.icon}
          />
          )}
        </Tabs>
        </TabsWrapperStyle>
        </Card>
        {TABS_VALUES.map((tab)=>{
          const isMatch=tab.value===currentTab
          return (isMatch&&<Box>{tab.component}</Box>)
        })} */} 
      </Container>
    )
  }
  


export default SearchPage
