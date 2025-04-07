"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card, CardMedia, Box } from "@mui/material";

type ImageCarouselProps = {
  images: string[];
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <Box className="max-w-7xl w-full mx-auto px-1 sm:px-6 py-10 mt-4 lg:px-2">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop
      >
        {images?.map((image, index) => (
          <SwiperSlide key={index}>
            <Card>
              <CardMedia
                component="img"
                image={image}
                alt={`Slide ${index + 1}`}
                sx={{
                  width: "100%",
                  height: {
                    xs: 60,
                    sm: 60,
                    md: 90,
                    lg: 140,
                  },
                  objectFit: "cover",
                }}
              />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageCarousel;
