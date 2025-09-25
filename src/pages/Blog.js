import React, { useState } from "react";
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
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import API_BASE from "../config";


export const AddBlog = () => {
  const [productUrl, setProductUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [category, setCategory] = useState("general"); // ✅ new
  const [details, setDetails] = useState([{ name: "", value: "" }]);
  const [snackOpen, setSnackOpen] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE}/create`, {
        productUrl,
        imageUrl,
        productName,
        productTitle,
        category,  
        details,
      });
      console.log(res);

      // Reset form
      setProductUrl("");
      setImageUrl("");
      setProductName("");
      setProductTitle("");
      setCategory("general");
      setDetails([{ name: "", value: "" }]);
      setSnackOpen(true);
    } catch (err) {
      console.error("Error creating product:", err);
      alert("Failed to add product");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Add New Product
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Product URL"
          fullWidth
          margin="normal"
          value={productUrl}
          onChange={(e) => setProductUrl(e.target.value)}
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
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="fashion">Fashion</MenuItem>
          <MenuItem value="beauty">Beauty</MenuItem>
          <MenuItem value="general">General</MenuItem>
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
          <Button variant="contained" color="primary" type="submit">
            ADD
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
