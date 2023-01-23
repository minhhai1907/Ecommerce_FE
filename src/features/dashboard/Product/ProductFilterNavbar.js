// material
import SortIcon from "@mui/icons-material/Sort";
import { Box, InputAdornment } from "@mui/material";
import Grid from "@mui/material/Grid";
import { default as React, default as React, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FSelect, FTextField } from "../../../components/form";
import { FormProvider } from "../../components/form";
import { handleChangeFilters } from "./productSlice";

const defaultValues = {
  sortBy: "",
  rating: 1,
};

function ProductFilterNavbar(props) {
  const { filters } = useSelector((state) => state.product);

  const { categories } = useSelector((state) => state.category);

  const methods = useForm({ defaultValues, mode: "onChange" });

  const { handleSubmit, reset, watch } = methods;

  useEffect(() => {
    const subscription = watch((value) => {
      dispatch(
        handleChangeFilters({
          rating: value.rating,
          sortBy: "rateAverage.asc",
          price_min: value.price[0],
          price_max: value.price[1],
        })
      );
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={1}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          alignContent="stretch"
          wrap="nowrap"
        >
          <Grid Item xs={12} md={6} lg={4}>
            <FTextField name="title" />
          </Grid>
          <Grid Item xs={12} md={6} lg={4}>
            <FSelect name="catgoryId" />
          </Grid>
          <Grid Item xs={12} md={6} lg={4}>
            <FTextField name="price" />
          </Grid>
          <Grid Item xs={12} md={6} lg={4}>
            <FSelect
              name="sortBy"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SortIcon />
                  </InputAdornment>
                ),
              }}
            >
              {SORT_BY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FSelect>
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
}

export default ProductFilterNavbar;
