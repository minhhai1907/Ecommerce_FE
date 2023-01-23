import React, { useEffect, useState } from 'react'
import { Box, Breadcrumbs, Button, Chip, Container, Grid, Link, Paper, Rating, Stack, Typography } from '@mui/material'
import {Link as RouterLink, useParams} from "react-router-dom"
import { getProduct } from '../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { fCurrency } from '../utils/numberFormat';
import { updateQuantityProductCart } from '../features/cart/cartSlice';
import ProductTabs from "../features/product/ProductTabs"
import ProductSimilar from "../features/product/ProductSimilar"
import useAuth from '../hooks/useAuth';
// import { styled } from '@mui/system';
import { styled } from "@mui/material/styles";

const ProductImgStyle = styled("img")(({ theme }) => ({
  maxWidth: "65%",
  transition: theme.transitions.create(["transform", "hover"], {
    duration: theme.transitions.duration.standard,
  }),
  "&:hover": {
    transform: "scale(1.05)",
  },
}));
const ContainerChildImage = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: 0,
  padding: "5px",
  texAlign: "center",
  width: "80px",
  height: "80px",
  overflow: "hidden",
}));

function DetailPage() {
  const {isAuthenticated}=useAuth()
  const params=useParams()
  const {id}=params;
  const dispatch=useDispatch()
  const {product,isLoading}=useSelector(state=>state.product)
  const [imgUrl, setImgUrl] = useState(0);
  const {
    title,
    imageUrls,
    status,
    totalRatings,
    rateAverage,
    inventoryStatus,
    categoryId,
    price,
    priceSale,}=product
  useEffect(()=>{
    dispatch(getProduct(id))
  },[id])
  return (
   <Container sx={{my:3}}>
    <Breadcrumbs sx={{mb:4}}>
      <Link component={RouterLink} to="/" underline='none' color="inherit">
        CoderStore
      </Link>
      <Typography color="text.primary">
        {title?.length>50?title.slice(0,50)+"...":title}
      </Typography>
    </Breadcrumbs>
    <Box sx={{ position: "relative", height: 1, minHeight: "500px" }}>
      <Grid container spacing={2} sx={{ minHeight: "500px" }}>
        <Grid item xs={12} md={4} sx={{ height: "500px" }}>
          <Stack
            direction="column"
            justifyContent="space-between"
            sx={{ height: "100%" }}>
            <Stack direction="row" justifyContent="center">
              <ProductImgStyle alt={title} src={imageUrls?.[imgUrl]}/>
            </Stack>
            <Stack
                   direction="row"
                   sx={{ maxheight: "30%", p: 2 }}
                   spacing={2}
                   justifyContent="center"
                  >
                    {imageUrls?.slice(0, 3).map((img, index) => {
                      return (
                        <ContainerChildImage
                          onClick={() => setImgUrl(index)}
                          key={index}
                        >
                          {/* <SkeletonLoading
                            isLoading={isLoading}
                            width="80px"
                            height="80px"
                          > */}
                            {!isLoading ? (
                              <img alt={title} src={img} />
                            ) : null}
                          {/* </SkeletonLoading> */}
                        </ContainerChildImage>
                      );
                    })}
                  </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box  sx={{ p: 2 }}>
            <Chip
                avatar={<NewReleasesIcon />}
                label={status}
                sx={{
                  mt: 2,
                  mb: 1,
                  background:
                    status === "sale"
                      ? "linear-gradient(to right, #f12711, #f5af19)"
                      : "linear-gradient(to left, #009fff, #ec2f4b)",
                  textTransform: "uppercase",
                  "& .MuiChip-avatar": {
                    color: "white",
                  },
                }}
                color="info"
                size="medium"
              />
                   <Typography variant="h5" paragraph>
                      {title}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ mb: 2 }}
                  >
                      <Rating
                        name="read-only"
                        value={rateAverage || null}
                        precision={1}
                        readOnly
                      />

                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        ({totalRatings} reviews)
                      </Typography>
                  </Stack>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                      <Box
                        component="span"
                        sx={{
                          color: "text.disabled",
                          textDecoration: "line-through",
                        }}
                      >
                        {price && fCurrency(price)}
                      </Box>
                      &nbsp;{fCurrency(priceSale)}
                  </Typography>
                  <Box direction="column">
                    <Box>
                        <Chip
                            // avatar={<NewReleasesIcon />}
                          label={inventoryStatus}
                          sx={{
                            mt: 2,
                            mb: 1,

                            textTransform: "uppercase",
                            "& .MuiChip-avatar": {
                              color: "white",
                            },
                          }}
                          color="info"
                          size="medium"
                          variant="outlined"
                        />
                    </Box>
                      <Button
                        variant="contained"
                        onClick={() => {
                          if (!isAuthenticated) {
                            // toast.error(`Please login for add to Cart!`);
                            alert("please login!")
                          } else {
                            dispatch(
                              updateQuantityProductCart({
                                productId: id,
                                action: true,
                              })
                            );
                          }
                        }}
                        disabled={inventoryStatus !== "available"}
                        startIcon={<ShoppingCartIcon />}
                      >
                        Add to Cart
                      </Button>
                  </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
    <ProductTabs productId={id} />
    <ProductSimilar categoryId={categoryId} />
   </Container>
  )
}

export default DetailPage
