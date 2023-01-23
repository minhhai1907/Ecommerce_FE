// material
import { Box, Container, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_PER_PAGE, REACT_APP_LIMIT } from "../app/config";
import PaginationBar from "../components/PaginationBar";
// import CategoriesMenu from "../features/category/CategoryMenu";
import ProductFilterSideBar from "../features/product/ProductFilterSideBar";
import ProductList from "../features/product/ProductList";
import ProductSideBar from "../features/product/ProductSideBar";
import { getAllProducts } from "../features/product/productSlice";
import {
  // getAllProducts,
  handleChangeFilters,
} from "../features/product/productSlice";
import ProductSort from "../features/product/ProductSort";
import useResponsive from "../hooks/useResponsive";

export default function HomePage() {
  const upLg = useResponsive("up", "lg");
  let { totalPage, currentPage } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const [openFilter, setOpenFilter] = useState(false);

  const handleDispatch = (value) => {
    dispatch(handleChangeFilters(value));
  };
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleChangePage = (page) => {
    let pagination = { page, limit: Number(PRODUCT_PER_PAGE) };
    dispatch(getAllProducts(pagination));
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="flex-end"
        spacing={2}
        sx={{ mb: 5 }}
      >
        {/* <CategoriesMenu/> */}
        <ProductFilterSideBar
          isOpenFilter={openFilter}
          onOpenFilter={handleOpenFilter}
          onCloseFilter={handleCloseFilter}
        />
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductSort handleDispatch={handleDispatch}  />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {upLg && (
          <Grid item xs={3}>
            <ProductSideBar disableScrollBar={true} />
          </Grid>
        )}
        <Grid item xs={12} md={12} lg={9}>
          <Stack spacing={3} justifyContent="space-between">
            <ProductList />

            <Stack alignItems="flex-end">
              <PaginationBar
                totalPage={+totalPage}
                setPage={handleChangePage}
                page={+currentPage}
              />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
