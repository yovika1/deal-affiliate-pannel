import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { EditProductDialog } from "../dialogs/EditDialog";
import API_BASE from "../config";

export const ManageBlogs = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get(`${API_BASE}/getBlogs`);
    setProducts(res.data.blogs )
  };
console.log("Products state:", products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${API_BASE}/delete/${id}`);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleSave = async () => {
    if (selectedProduct) {
      await axios.put(
        `${API_BASE}/update/${selectedProduct._id}`,
        selectedProduct
      );
      setOpen(false);
      fetchProducts();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Manage Products
      </Typography>

      <List>
        {products?.map((product) => (
          <ListItem
            key={product._id}
            secondaryAction={
              <>
                <IconButton onClick={() => handleEdit(product)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(product._id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemAvatar>
              <Avatar
                src={product.imageUrl}
                alt={product.productName}
                variant="square"
                sx={{ width: 60, height: 60, mr: 2 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.productName}
              secondary={
                <>
                  {product.productTitle}
                  <br />
                  {product.details &&
                    product.details.map((d) => `${d.name}: ${d.value}`).join(", ")}
                </>
              }
            />
          </ListItem>
        ))}
      </List>

      <EditProductDialog
        open={open}
        onClose={() => setOpen(false)}
        product={selectedProduct}
        setProduct={setSelectedProduct}
        onSave={handleSave}
      />
    </Box>
  );
};
