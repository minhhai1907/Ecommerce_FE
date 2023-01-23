import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import CartDelivery from "../features/cart/CartDelivery";
import CartItem from "../features/cart/CartItem";
import CartPayment from "../features/cart/CartPayment";
import { getCart, setActiveStep } from "../features/cart/cartSlice";
import CartSummary from "../features/cart/CartSummary";

function CartPage() {
  const dispatch = useDispatch();
  const { products, activeStep } = useSelector((state) => state.cart);

  const handleStep = (step) => {
    dispatch(setActiveStep(step));
  };

  const STEPS = [
    {
      value: "Cart",
      Cart: 0,
      component: <CartItem products={products} />,
    },
    {
      value: "Delivery",
      Delivery: 1,
      component: <CartDelivery />,
    },
    {
      value: "Payment",
      Payment: 2,
      component: <CartPayment />,
    },
    {
      value: "Summary",
      Summary: 3,
      component: <CartSummary />,
    },
  ];

  useEffect(() => {
    dispatch(getCart());
  }, [activeStep]);

  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link color="inherit" component={RouterLink} to="/">
          Coder eCommerce
        </Link>
        <Typography color="text.primary">Cart</Typography>
      </Breadcrumbs>

      <Stack spacing={3}>
        <Box sx={{ width: { sx: "100%", md: "60%" }, mx: "auto" }}>
          <Stepper nonLinear activeStep={activeStep} sx={{ flexWrap: "wrap" }}>
            {STEPS.map((step, index) => (
              <Step key={step[step.value]}>
                <StepButton disableRipple onClick={() => handleStep(step[step.value])}>
                  {step.value}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>

        {STEPS.map((step, idx) => {
          const isMatched = step[step.value] === activeStep;
          return (
            isMatched && <Box key={step[step.value]}>{step.component}</Box>
          );
        })}
      </Stack>
    </Container>
  );
}

export default CartPage;
