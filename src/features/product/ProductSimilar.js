import { Box, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import SwiperCustom from "../../components/swipper/SwiperCustom";

function ProductSimilar() {
  let { products } = useSelector((state) => state.product);

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" sx={{ mb: 1 }} color="primary">
        PRODUCT SIMILAR
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <SwiperCustom products={products} />
    </Box>
  );
}

export default ProductSimilar;
