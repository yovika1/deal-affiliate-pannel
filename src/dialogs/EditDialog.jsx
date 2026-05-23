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
          select
          label="Special Day (Optional)"
          fullWidth
          margin="normal"
          value={product?.specialDay || ""}
          onChange={(e) =>
            setProduct((prev) =>
              prev ? { ...prev, specialDay: e.target.value } : prev,
            )
          }
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="valentines">Valentine’s Day ❤️</MenuItem>
          <MenuItem value="diwali">Diwali 🪔</MenuItem>
          <MenuItem value="rakhi">Rakhi 🎁</MenuItem>
        </TextField>

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
        <TextField
          margin="dense"
          label="Image URL"
          fullWidth
          value={product?.product?.imageUrl || ""}
          onChange={(e) => handleProductFieldChange("imageUrl", e.target.value)}
        />
        <TextField
          margin="dense"
          label="Current Price"
          fullWidth
          value={product?.product?.currentPrice}
          onChange={(e) => handleProductFieldChange("currentPrice", e.target.value)}

        />
 {/* ✅ Category Dropdown */}
        <TextField
          select
          label="Category"
          fullWidth
          margin="normal"
          value={product?.category|| ""}
          onChange={(e) =>    setProduct((prev) =>
      prev ? { ...prev, category: e.target.value } : prev
    )}
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
