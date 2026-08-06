import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  IconButton,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useProductAutoFetch } from "../hooks/useProductAutoFetch";
import React, { useEffect } from "react";

export const EditProductDialog = ({
  open,
  onClose,
  product,
  setProduct,
  onSave,
}) => {
  const handleDetailChange = (index, field, value) => {
    setProduct((prev) => {
      if (!prev) return prev;
      const updatedDetails = [...prev.details];

      updatedDetails[index][field] = value;
      return { ...prev, details: updatedDetails };
    });
  };
  const { fetchProductDetails, fetching } = useProductAutoFetch();

  const handleAddDetail = () => {
    setProduct((prev) =>
      prev
        ? { ...prev, details: [...prev.details, { name: "", value: "" }] }
        : prev,
    );
  };

  // const { fetchProductDetails, fetching } = useProductAutoFetch();

  useEffect(() => {
    if (product?.product?.currentPrice && product?.product?.originalPrice) {
      const current = Number(product.product.currentPrice);
      const original = Number(product.product.originalPrice);

      if (original > 0) {
        const discount = Math.round(((original - current) / original) * 100);

        if (discount !== Number(product.product.discountPercent)) {
          setProduct((prev) => {
            if (!prev) return prev;

            return {
              ...prev,
              product: {
                ...prev.product,
                discountPercent: discount,
              },
            };
          });
        }
      }
    }
  }, [product?.product?.currentPrice, product?.product?.originalPrice]);

  const handleRemoveDetail = (index) => {
    setProduct((prev) => {
      if (!prev) return prev;
      const updatedDetails = [...prev.details];
      updatedDetails.splice(index, 1);
      return { ...prev, details: updatedDetails };
    });
  };

  const handleProductFieldChange = (field, value) => {
    setProduct((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        product: { ...prev.product, [field]: value },
      };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProduct((prev) =>
      prev
        ? {
            ...prev,
            imageFile: file,
          }
        : prev,
    );
  };

  const handleEditAutoFetch = async (url) => {
    const data = await fetchProductDetails(url);

    if (!data) return;

    setProduct((prev) =>
      prev
        ? {
            ...prev,
            product: {
              ...prev.product,
              ...data,
            },
          }
        : prev,
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Product Title"
          fullWidth
          value={product?.productTitle || ""}
          onChange={(e) =>
            setProduct((prev) =>
              prev ? { ...prev, productTitle: e.target.value } : null,
            )
          }
        />
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1">Product Info</Typography>

        <TextField
          margin="dense"
          label="Product Name"
          fullWidth
          value={product?.product?.productName || ""}
          onChange={(e) =>
            handleProductFieldChange("productName", e.target.value)
          }
        />
        <TextField
          margin="dense"
          label="Affiliate URL"
          fullWidth
          value={product?.product?.affiliateUrl || ""}
          onChange={(e) =>
            handleProductFieldChange("affiliateUrl", e.target.value)
          }
        />
        <TextField
          margin="dense"
          label="Product URL"
          fullWidth
          value={product?.product?.productUrl || ""}
          onChange={(e) =>
            handleProductFieldChange("productUrl", e.target.value)
          }
          onBlur={(e) => handleEditAutoFetch(e.target.value)}
          helperText={fetching ? "Fetching product details..." : ""}
        />
        <Button component="label" variant="outlined">
          Change Image
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>

        {product?.imageFile && (
          <Typography>{product.imageFile.name}</Typography>
        )}

        <TextField
          margin="dense"
          label="Rating (e.g. 4.5)"
          fullWidth
          value={product?.product?.rating }
          onChange={(e) => handleProductFieldChange("rating", e.target.value)}
        />

        <TextField
          margin="dense"
          label="Reviews Count"
          fullWidth
          inputProps={{ min: 0, max: 5, step: 0.1 }}
          value={product?.product?.reviewsCount}
          onChange={(e) =>
            handleProductFieldChange("reviewsCount", e.target.value)
          }
        />

        <TextField
          label="External Image URL"
          fullWidth
          margin="dense"
          value={product?.product?.imageUrl || ""}
          onChange={(e) => handleProductFieldChange("imageUrl", e.target.value)}
        />

        <TextField
          label="Discount %"
          type="number"
          fullWidth
          margin="normal"
          value={product?.product?.discountPercent || ""}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          margin="dense"
          label="Current Price"
          type="number"
          fullWidth
          value={product?.product?.currentPrice || ""}
          onChange={(e) =>
            handleProductFieldChange("currentPrice", e.target.value)
          }
        />

        <TextField
          margin="dense"
          label="Original Price"
          type="number"
          fullWidth
          value={product?.product?.originalPrice || ""}
          onChange={(e) =>
            handleProductFieldChange("originalPrice", e.target.value)
          }
        />
        {/* ✅ Category Dropdown */}
        <TextField
          select
          label="Category"
          fullWidth
          margin="normal"
          value={product?.category || ""}
          onChange={(e) =>
            setProduct((prev) =>
              prev ? { ...prev, category: e.target.value } : prev,
            )
          }
        >
          <MenuItem value="fashion">Fashion</MenuItem>
          <MenuItem value="beauty">Beauty</MenuItem>
          <MenuItem value="general">General</MenuItem>
        </TextField>

        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1">Details</Typography>
        {product?.details?.map((detail, index) => (
          <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
            <TextField
              label="Name"
              value={detail.name}
              onChange={(e) =>
                handleDetailChange(index, "name", e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Value"
              value={detail.value}
              onChange={(e) =>
                handleDetailChange(index, "value", e.target.value)
              }
              fullWidth
            />
            <IconButton onClick={() => handleRemoveDetail(index)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        <Button onClick={handleAddDetail}>+ Add Detail</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
