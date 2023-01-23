import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Autoplay, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../features/product/ProductCard";
import ButtonSwipper from "./ButtonSwipper";
import "./swipper.css";

function SwiperCustom({ products }) {
  const dataList = products;
  const navigate=useNavigate()
  return (
    <Box sx={{ width: 1, height: 1, position: "relative" }}>
      <Swiper
        loop={true}
        autoplay={{ delay: 5000 }}
        navigation={true}
        breakpoints={{
          slidesPerView: 1,
          spaceBetween: 10,

          320: {
            slidesPerView: 1,
            spaceBetween: 5,
          },

          600: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          900: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 15,
          },
        }}
        modules={[Navigation, Autoplay]}
        className="main_swipper"
      >
        {dataList?.map((data) => {
          return (
            <SwiperSlide key={data._id} onClick={()=>navigate(`/product/${data._id}`)}>
              {({ isActive }) => {
                return <ProductCard product={data} />;
              }}
            </SwiperSlide>
          );
        })}
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: 9999,
            width: 1,
          }}
        >
          <ButtonSwipper property="left" />
          <ButtonSwipper property="right" />
        </Stack>
      </Swiper>
    </Box>
  );
}

export default SwiperCustom;
