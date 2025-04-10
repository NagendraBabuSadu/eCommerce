"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Modal,
  Box,
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
    <div>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)", // 2 cards on mobile
            sm: "repeat(3, 1fr)", // 3 cards on small screens
            md: "repeat(4, 1fr)", // 4 cards on medium
            lg: "repeat(5, 1fr)", // 5 cards on large screens
          },
          gap: 2, // spacing between cards
          px: {
            xs: 1,
            sm: 2,
            md: 4,
            lg: 6,
          },
          py: 2,
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto", // center the grid
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {products?.map((product) => (
          <Card
            key={product._id}
            onClick={() => setSelectedProduct(product)}
            sx={{
              display: "flex",
              flexDirection: "row", // image left, content right
              height: 250,
              borderRadius: 2,
              overflow: "hidden",
              p: 1,
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
              border: "2px solid grey",
              "&:hover": {
                boxShadow: "0px 0px 6px",
                transform: "scale(1.02)",
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
            }}
          >
            {/* Image Section */}
            <CardMedia
              component="img"
              image={product.image}
              alt={product.productName}
              sx={{
                width: "40%", // adjust as needed
                height: "100%",
                objectFit: "contain",
                borderRadius: 1,
                // transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.3)  translateX(10px)",
                }
              }}
            />

            {/* Content Section */}
            <CardContent
              sx={{
                width: "60%", // complement of image width
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 2
              }}
            >
              {/* Top Section */}
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  textTransform="capitalize"
                  noWrap
                >
                  {product.productName}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    color: "text.secondary",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    textTransform: "capitalize",
                  }}
                >
                  {product.description}
                </Typography>
              </Box>

              {/* Bottom Section */}
              <Box>
                <Typography variant="h6" color="error">
                  ₹{product.price}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={()=> alert("add to cart")}
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
                boxShadow: "0px 0px 10px",
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
    </div>
  );
};

export { ProductList };
