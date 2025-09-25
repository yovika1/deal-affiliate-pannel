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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const handleAddDetail = () => {
    setProduct((prev) =>
      prev
        ? { ...prev, details: [...prev.details, { name: "", value: "" }] }
        : prev
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

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Product Name"
          fullWidth
          value={product?.productName || ""}
          onChange={(e) =>
            setProduct((prev) =>
              prev ? { ...prev, productName: e.target.value } : null
            )
          }
        />
        <TextField
          margin="dense"
          label="Product Title"
          fullWidth
          value={product?.productTitle || ""}
          onChange={(e) =>
            setProduct((prev) =>
              prev ? { ...prev, productTitle: e.target.value } : null
            )
          }
        />
        <TextField
          margin="dense"
          label="Product URL"
          fullWidth
          value={product?.productUrl || ""}
          onChange={(e) =>
            setProduct((prev) =>
              prev ? { ...prev, productUrl: e.target.value } : null
            )
          }
        />
        <TextField
          margin="dense"
          label="Image URL"
          fullWidth
          value={product?.imageUrl || ""}
          onChange={(e) =>
            setProduct((prev) =>
              prev ? { ...prev, imageUrl: e.target.value } : null
            )
          }
        />

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
