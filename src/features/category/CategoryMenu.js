import CameraIcon from "@mui/icons-material/Camera";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DevicesIcon from "@mui/icons-material/Devices";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LaptopIcon from "@mui/icons-material/Laptop";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import PrintIcon from "@mui/icons-material/Print";
import WatchIcon from "@mui/icons-material/Watch";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { handleChangeFilters } from "../product/productSlice";
import CategoryList from "./CategoryList";
import {getMainCategories } from "./categorySlice";

const arrIcon = [
  <DevicesIcon />,
  <LaptopIcon />,
  <CameraIcon />,
  <HeadphonesIcon />,
  <PrintIcon />,
  <WatchIcon />,
  <PhoneIphoneIcon />,
];

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    // borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 250,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "15px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
      },
    },
  },
}));

const Container = styled("div")(({ theme }) => ({
  position: "relative",
}));

export default function CategoriesMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { categories } = useSelector((state) => state.category);
  const ref = useRef();
  const el = ref.current;

  const [hovered, setHovered] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setHovered(false);
  };
  const handlePopoverOpen = (event, id, children) => {
    dispatch(getMainCategories());

    if (children.length > 0) {
      setHovered(true);
    } else {
      setHovered(false);
    }
  };

  const handleSetFilters = async (categoryId) => {
    setAnchorEl(null);
    setHovered(false);

    dispatch(handleChangeFilters({ categoryId }));

    if (!path.toLowerCase().includes("category")) {
      navigate("/category");
    }
  };

  useEffect(() => {
    // if (el) {
    //   el.addEventListener("mouseleave", handleClose);
    //   return () => {
    //     el.removeEventLisener("mouseleave", handleClose);
    //   };
    // }
    dispatch(getMainCategories());
  }, [dispatch]);

  return (
    <Container>
      <Button
        id="categories-button"
        aria-controls={open ? "categories-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        disableElevation
        onClick={handleClick}
        startIcon={<WidgetsIcon />}
        endIcon={anchorEl ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
        sx={{
          width: 250,
          textAlign: "left",
          textTransform: "capitalize",
          color: "grey[500_8]",
          borderColor: "grey[500_8]",
        }}
      >
        <Typography style={{ margin: 0, flexGrow: 1 }}>Categories</Typography>
      </Button>
      <StyledMenu
        id="categories-menu"
        MenuListProps={{
          "aria-labelledby": "categories-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {categories?.map((cate, idx) => {
          return (
            <MenuItem
              onClick={() => {
                handleSetFilters(cate._id);
                handleClose();
              }}
              key={cate._id}
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              sx={{ p: 1 }}
              onMouseEnter={(e) =>
                handlePopoverOpen(e, cate._id, cate.children)
              }
            >
              {arrIcon[idx]}
              <Typography
                underline="none"
                style={{
                  marginLeft: "5px",
                  flexGrow: 1,
                  color: "inherit",
                }}
              >
                {cate.title}
              </Typography>
              <ChevronRightIcon />
            </MenuItem>
          );
        })}
      </StyledMenu>
      {hovered && (
        <Paper
          sx={{
            position: "absolute",
            top: "45px",
            left: "270px",
            width: "700px",
            minHeight: "500px",
            p: 2,
            zIndex: 9999,
          }}
          ref={ref}
          onMouseLeave={handleClose}
        >
          <CategoryList handleSetFilters={handleSetFilters} />
        </Paper>
      )}
    </Container>
  );
}
