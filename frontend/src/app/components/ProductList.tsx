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
import Grid from "@mui/material/Grid";
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

  const [selectedProduct, setSelectedProduct] = useState<Product | null >(null);

  useEffect(() => {
    console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL); // Debug line
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
        );
        setProducts(response.data);
        console.log("Fetched products:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array = runs once on mount

  return (
    <div className="container mx-auto p-4">
      <Grid container spacing={10} justifyContent="center">
        {products?.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card
              className="shadow-lg rounded-lg hover:shadow-xl transition-shadow"
              sx={{
                height: "22rem",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "15px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease-in-out",
                position: "relative",
                "&:hover": {
                  cursor: "pointer",
                  boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.3)",
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
              onClick={() => setSelectedProduct(product)}
            >
              <CardMedia
                component="img"
                sx={{
                  height: "24rem",
                  objectFit: "fill",
                  width: "160px",
                  overflow: "hidden",
                  m: "10px",
                  p: "4px",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                image={product.image}
                alt={product.image}
              />
              <CardContent sx={{ textAlign: "left", flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  className="font-semibold"
                  sx={{
                    textTransform: "capitalize",
                  }}
                  title={product.productName}
                >
                  {product.productName.length > 13
                    ? product.productName.slice(0, 13) + "..."
                    : product.productName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    height: 40,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    textTransform: "capitalize",
                  }}
                  title={product.description}
                >
                  {product.description.length > 15
                    ? product.description.slice(0, 15) + " ...more"
                    : product.description}
                </Typography>
                <Typography variant="h6" className="text-red-500 mt-2">
                  ₹{product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-3 w-full"
                  sx={{ width: "100%", marginBottom: 1 }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Modal */}
      <Modal open={Boolean(selectedProduct)} onClose={() => setSelectedProduct(null)}>
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
    </div>
  );
};

export { ProductList };
