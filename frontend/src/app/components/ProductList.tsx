"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Modal,
  Box
} from "@mui/material";
import axios from "axios";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<
    {
      _id: string;
      productName: string;
      category: string;
      description: string;
      price: number;
      image: string;
    }[]
  >([]);

  interface Product {
    _id: string;
    productName: string;
    category: string;
    description: string;
    price: number;
    image: string;
  }

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, ""); // Remove trailing slashes
    console.log("Sanitized API Base URL:", baseUrl);

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/products`);
        setProducts(response.data);
        console.log("Fetched products:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array = runs once on mount

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)", // small screens
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)", // larger screens
        },
        maxWidth: "100%",
        height: 1000,
        padding: "20px",
        overflowY: "scroll",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        gap: 3,
        p: 2,
        margin: "0px 15rem"
        // comment added
      }}
    >
      {products?.map((product) => (
        <Card
          key={product._id}
          onClick={() => setSelectedProduct(product)}
          sx={{
            height: 250,
            borderRadius: 2,
            overflow: "hidden",
            padding: 2,
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
            display: "flex",
            flexDirection: "row",
            "&:hover": {
              boxShadow: "0px 0px 6px",
              transform: "scale(1.05)",
              borderColor: "rgba(255, 255, 255, 0.5)",
            },
          }}
        >
          {/* Image section */}
          <CardMedia
            component="img"
            image={product.image}
            alt={product.productName}
            sx={{
              width: 100,
              height: "100%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />

          {/* Content section */}
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
              width: "100%",
            }}
          >
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                textTransform="capitalize"
              >
                {product.productName.length > 20
                  ? product.productName.slice(0, 20) + "..."
                  : product.productName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  textTransform: "capitalize",
                  mt: 1,
                }}
              >
                {product.description.length > 40
                  ? product.description.slice(0, 40) + "..."
                  : product.description}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" color="error" sx={{ mt: 1 }}>
                ₹{product.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                fullWidth
                sx={{ mt: 1 }}
              >
                Add to Cart
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
      {/* </div> */}

      {/* Modal */}
      <Modal
        open={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            p: 4,
            borderRadius: 2,
            color: "black",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgb(255, 255, 255)",
            backdropFilter: "blur(10px)",

            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.29)",
            boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.3)",

            transition: "all 0.3s ease-in-out",
            "&:hover": {
              cursor: "pointer",
              boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.95)",
              // Enhanced shadow on hover
              border: "1px solid rgba(255, 255, 255, 0.5)",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              zIndex: -1,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(0,0,0,0.1))",
              transition: "opacity 0.3s",
              opacity: 0,
            },
            "&:hover::before": {
              opacity: 1,
            },
          }}
        >
          {selectedProduct && (
            <>
              <CardMedia
                component="img"
                sx={{
                  height: "fitContent",
                  objectFit: "fill",
                  width: "100%",
                  overflow: "hidden",
                  m: "2px",
                  p: "4px",
                }}
                image={selectedProduct.image}
                alt={selectedProduct.image}
              />
              <Typography
                variant="h4"
                gutterBottom
                fontWeight="bold"
                className="text-black"
              >
                {selectedProduct.productName.toUpperCase()}
              </Typography>
              <Typography
                variant="body2"
                textTransform="capitalize"
                className="text-black"
              >
                {selectedProduct.description}
              </Typography>
              <Typography variant="h6" className="text-red-600 mt-2">
                ₹{selectedProduct.price}
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => setSelectedProduct(null)}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-2"
                  sx={{ mt: 2 }}
                >
                  Add to Cart
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export { ProductList };
