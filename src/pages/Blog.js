import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Snackbar,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import API_BASE from "../config";
import { useProductAutoFetch } from "../hooks/useProductAutoFetch";

export const AddBlog = () => {
  const [affiliateUrl, setaffiliateUrl] = useState("");
  const [productUrl, setproductUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [subCategory, setSubCategory] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [badge, setBadge] = useState("Trending");
  const [rating, setRating] = useState("");
  const [reviewsCount, setReviewsCount] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [details, setDetails] = useState([{ name: "", value: "" }]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { fetchProductDetails, fetching } = useProductAutoFetch();

  const handleAddDetail = () => {
    setDetails([...details, { name: "", value: "" }]);
  };

  const handleRemoveDetail = (index) => {
    const newDetails = details.filter((_, i) => i !== index);
    setDetails(newDetails);
  };

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...details];
    newDetails[index][field] = value;
    setDetails(newDetails);
  };

  const handleAutoFetch = async () => {
    const data = await fetchProductDetails(productUrl);

    if (!data) return;

    setProductName(data.productName);
    setImageUrl(data.imageUrl);
    setCurrentPrice(data.currentPrice);
    setOriginalPrice(data.originalPrice);
    setRating(data.rating);
    setReviewsCount(data.reviewsCount);
    setDiscountPercent(data.discountPercent);
  };

  const categoryMap = {
    fashion: ["dresses", "jeans", "mens-collection"],
    beauty: ["makeup", "skincare"],
    general: ["trending","bestSeller","newArrival"],
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSubCategory(""); 
  };
  useEffect(() => {
    if (currentPrice && originalPrice) {
      const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
      setDiscountPercent(Math.round(discount));
    }
  }, [currentPrice, originalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        productTitle,
        category,
        subCategory,
        affiliateUrl,
        productUrl,
        badge,
        details,

        product: {
          affiliateUrl,
          productUrl,
          productName,
          imageUrl,
          currentPrice: Number(currentPrice),
          originalPrice: Number(originalPrice),
          rating: Number(rating),
          reviewsCount: Number(reviewsCount),
          discountPercent: Number(discountPercent),
        },
      };
      await axios.post(`${API_BASE}/create`, payload);

      setaffiliateUrl("");
      setproductUrl("");
      setImageUrl("");
      setProductName("");
      setProductTitle("");
      setCurrentPrice("");
      setOriginalPrice("");
      setBadge("Trending");
      setRating("");
      setReviewsCount("");
      setDiscountPercent("");
      setCategory("general");
      setSubCategory("");
      setDetails([{ name: "", value: "" }]);
      setSnackOpen(true);
    } catch (err) {
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Add New Product
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          select
          label="Badge"
          fullWidth
          margin="normal"
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
        >
          <MenuItem value="Trending">Trending</MenuItem>
          <MenuItem value="Best Seller">Best Seller</MenuItem>
          <MenuItem value="New Arrival">New Arrival</MenuItem>
        </TextField>

        <TextField
          label="Product Page URL"
          fullWidth
          margin="normal"
          value={productUrl}
          onChange={(e) => setproductUrl(e.target.value)}
          // onBlur={handleAutoFetch}
          // helperText={fetching ? "Fetching product details..." : ""}
        />

        <TextField
          label="Affiliate URL"
          fullWidth
          margin="normal"
          value={affiliateUrl}
          onChange={(e) => setaffiliateUrl(e.target.value)}
        />

        <TextField
          label="Product Image URL"
          fullWidth
          margin="normal"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <TextField
          label="Product Name"
          fullWidth
          margin="normal"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <TextField
          label="Rating (e.g. 4.5)"
          type="number"
          fullWidth
          margin="normal"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <TextField
          label="Reviews Count"
          type="number"
          fullWidth
          inputProps={{ min: 0, max: 5, step: 0.1 }}
          margin="normal"
          value={reviewsCount}
          onChange={(e) => setReviewsCount(e.target.value)}
        />

        <TextField
          label="Discount %"
          type="number"
          fullWidth
          margin="normal"
          value={discountPercent}
          onChange={(e) => setDiscountPercent(e.target.value)}
        />

        <TextField
          label="Current Price"
          fullWidth
          type="number"
          margin="normal"
          value={currentPrice}
          onChange={(e) => setCurrentPrice(e.target.value)}
        />

        <TextField
          label="Original Price"
          fullWidth
          type="number"
          margin="normal"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
        />

        <TextField
          label="Product Title"
          fullWidth
          margin="normal"
          value={productTitle}
          onChange={(e) => setProductTitle(e.target.value)}
        />

        {/* ✅ Category Dropdown */}
        <TextField
          select
          label="Category"
          fullWidth
          margin="normal"
          value={category}
          onChange={handleCategoryChange}
        >
          <MenuItem value="fashion">Fashion</MenuItem>
          <MenuItem value="beauty">Beauty</MenuItem>
          <MenuItem value="general">General</MenuItem>
        </TextField>

        <TextField
          select
          label="Sub Category"
          fullWidth
          margin="normal"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          disabled={!category}
        >
          {categoryMap[category]?.map((sub) => (
            <MenuItem key={sub} value={sub}>
              {sub.charAt(0).toUpperCase() + sub.slice(1)}
            </MenuItem>
          ))}
        </TextField>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Product Details
        </Typography>

        {details.map((detail, index) => (
          <Box key={index} sx={{ display: "flex", gap: 2, my: 1 }}>
            <TextField
              label="Details Name"
              value={detail.name}
              onChange={(e) =>
                handleDetailChange(index, "name", e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Details Value"
              value={detail.value}
              onChange={(e) =>
                handleDetailChange(index, "value", e.target.value)
              }
              fullWidth
            />
            {index > 0 && (
              <IconButton
                color="error"
                onClick={() => handleRemoveDetail(index)}
              >
                <Delete />
              </IconButton>
            )}
          </Box>
        ))}

        <Button onClick={handleAddDetail} sx={{ mt: 1 }}>
          + Add More
        </Button>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "Adding..." : "Add Blog"}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        message="Product added successfully!"
        onClose={() => setSnackOpen(false)}
      />
    </Container>
  );
};
