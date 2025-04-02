import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card, CardMedia, Box } from "@mui/material";

const images = [
  "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/3d7827c92a670177.jpg?q=20",
  "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/57d9b129e302642e.jpg?q=22",
  "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/a354077c3747d8f6.png?q=21",
];

const ImageCarousel: React.FC = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: "1280px", mx: "auto", mt: 1 }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Card>
              <CardMedia component="img" image={image} alt={`Slide ${index + 1}`} />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageCarousel;
