import { Divider, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
// import SkeletonLoading from "../../components/SkeletonLoading";
import { fCurrency } from "../../utils/numberFormat";
import { updateCart } from "./cartSlice";

function CartSideBar() {
  const dispatch = useDispatch();

  const { cart, isLoading, products, activeStep } = useSelector(
    (state) => state.cart
  );
  const calSubTotal = products.reduce(
    (acc, curr, index, arr) => {
      acc.subTotal = acc.subTotal + curr?.productId?.priceSale * curr.quantity;
      acc.shipping = acc.shipping + curr?.productId?.shipping;
      if (index === arr.length - 1) {
        acc.shipping = acc.shipping / arr.length;
        acc.total = acc.subTotal + (acc.subTotal * 10) / 100 + acc.shipping;
      }
      return acc;
    },
    { subTotal: 0, shipping: 0, total: 0 }
  );

  useEffect(() => {
    const handleUpdateCart = () => {
      const cartUpdate = {
        ...cart,
        payment: { ...cart.payment, total: { ...calSubTotal, tax: 10 } },
      };
      if (activeStep === 0) {
        dispatch(updateCart(cartUpdate));
      }
    };
    handleUpdateCart();
  }, [dispatch]);

  return (
    <Box component={Paper} spacing={3} sx={{ width: 1, p: 2 }}>
      {isLoading ? (
        <LoadingScreen/>
        // <SkeletonLoading
        //   count={4}
        //   isLoading={isLoading}
        //   height="25px"
        //   width="100%"
        // />
      ) : (
        <>
          <Stack direction="row" justifyContent="space-Between" spacing={2}>
            <Typography variant="subtitle1" textAlign="center">
              SubTotal:
            </Typography>
            <Typography variant="subtitle2" textAlign="center">
              {!isLoading && fCurrency(calSubTotal?.subTotal)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-Between" spacing={2}>
            <Typography variant="subtitle1" textAlign="center">
              Shipping:
            </Typography>
            <Typography variant="subtitle2" textAlign="center">
              {!isLoading && fCurrency(calSubTotal?.shipping)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-Between" spacing={2}>
            <Typography variant="subtitle1" textAlign="center">
              Tax (VAT):
            </Typography>
            <Typography variant="subtitle2" textAlign="center">
              10%
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-Between" spacing={2}>
            <Typography variant="subtitle1" textAlign="center">
              Discount:
            </Typography>
            <Typography variant="subtitle2" textAlign="center">
              __
            </Typography>
          </Stack>
        </>
      )}
      <Divider sx={{ m: 1 }} />
      {isLoading ? (
        <LoadingScreen/>
        // <SkeletonLoading isLoading={isLoading} height="30px" width="100%" />
      ) : (
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Typography variant="h6" textAlign="center">
            {!isLoading && fCurrency(calSubTotal?.total)}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}

export default CartSideBar;
