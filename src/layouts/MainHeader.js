import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar, Badge, Divider, Link, Stack, useScrollTrigger } from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import useAuth from '../hooks/useAuth';
import { useNavigate,Link as RouterLink } from 'react-router-dom';
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Logo from '../components/Logo';
import logo from "../logo.png"
import SearchHeader from '../components/SearchHeader';
import { useDispatch, useSelector } from 'react-redux';
import { handleChangeFilters } from '../features/product/productSlice';






export default function MainHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const { user, logout, isAuthenticated } = useAuth();
  const {totalProduct}=useSelector(state=>state.cart)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const mdDown = useResponsive("down", "md");
  const mdUp = useResponsive("up", "md");

  const handleProfileMenuOpen=(e)=>{
    setAnchorEl(e.currentTarget)
  }
  const handleOpenCart = (event) => {
    navigate("/checkout");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDispatch = (searchQuery) =>
  dispatch(
    handleChangeFilters({ title: searchQuery })
  )
  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };
  const menuId = "primary-search-account-menu";
  const renderMenu=(
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      <Box>
        <MenuItem
          onClick={handleMenuClose}
          to="/profile"
          component={RouterLink}
          sx={{ mx: 1 }}
        >
          My Profile
        </MenuItem>
      </Box>

      {user?.role === "admin" && (
        <MenuItem
          onClick={handleMenuClose}
          to="/dashboard"
          component={RouterLink}
          sx={{ mx: 1 }}
        >
          Dashboard
        </MenuItem>
      )}
      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  )
  // const isScroll = useScrollTrigger({
  //   disableHysteresis: true,
  //   threshold: 10,
  // });

  return (
    <Box sx={{mb:0}} >
      <AppBar position="fixed" color='inherit' >
        {/* <Box maxWidth="lg" sx={{ px: 0, mx: "auto", width: 1 }}> */}
        <Toolbar>
              <Stack alignItems="center"
             justifyContent="space-between"
             direction="row"
             sx={{ flexGrow: 1 }}
             >
            {mdUp&&
             <>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
          <SearchHeader handleDispatch={handleDispatch} />
          </>
          }
          { mdDown &&
          <Box sx={{ width: 280, m: 0, p: 0, height: "100%" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
        </Box>
        }     
        </Stack>
        <Stack
              direction="row"
              spacing={3}
              justifyContent="flex-end"
              sx={{ width: 280, flexGrow: 1 }}
              >
        {isAuthenticated ?
                  (
                    <>
                      <Badge badgeContent={totalProduct?.data} color="primary">
                        <Avatar
                          onClick={handleOpenCart}
                          alt="Cart"
                          sx={{ width: 32, height: 32, cursor: "pointer" }}
                        >
                          <ShoppingCartOutlinedIcon />
                        </Avatar>
                      </Badge>
                      <Avatar
                        onClick={handleProfileMenuOpen}
                        src={user?.avatarUrl}
                        alt={user?.name}
                        sx={{ width: 32, height: 32, cursor: "pointer" }}
                      />
                    </>
                  ):
                 (
                  <Avatar
                    onClick={() => navigate("/login")}
                    alt="Cart"
                    sx={{
                      width: 32,
                      height: 32,
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "primary.main" },
                    }}
                  >
                    <LockOpenIcon />
                  </Avatar>
                ) 
                }
        </Stack>
        </Toolbar>
        {/* </Box> */}
      </AppBar>
      {renderMenu}
    </Box>
  );
}