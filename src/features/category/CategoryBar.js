import { Container, Divider, Link, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import CategoriesMenu from "./CategoryMenu";

const StackStyled = styled(Stack)(({ theme }) => ({
  boxShadow: "0px 4px 16px rgb(43 52 69 / 10%)",
  height: 70,
}));

const MenuItemstyled = styled(Link)(({ theme }) => ({
  cursor: "pointer",
}));

function CategoryBar() {
  const downMd = useResponsive("down", "md");
  const downLg = useResponsive("down", "lg");

  return (
    <StackStyled alignItems="center" direction="row">
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          {downMd && <CategoriesMenu />}

          <Stack
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <MenuItemstyled component={NavLink} to="/">
              Home
            </MenuItemstyled>
            <MenuItemstyled component={NavLink} to="/category">
              Category
            </MenuItemstyled>
            <MenuItemstyled component={NavLink} to="/checkout">
              Checkout
            </MenuItemstyled>
            <MenuItemstyled component={NavLink} to="/order">
              Order
            </MenuItemstyled>
          </Stack>
        </Stack>
      </Container>
    </StackStyled>
  );
}

export default CategoryBar;
