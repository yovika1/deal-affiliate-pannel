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
    setProducts(res.data.blogs);
  };

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
        {products?.map((blog) => (
          <ListItem
            key={blog._id}
            secondaryAction={
              <>
                <IconButton onClick={() => handleEdit(blog)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(blog._id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemAvatar>
              <Avatar
                src={blog.product?.imageUrl}
                alt={blog.product?.productName}
                variant="square"
                sx={{ width: 60, height: 60, mr: 2 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={blog.product?.productName || blog.productTitle || "Unnamed"}
              secondary={
                <>
                  {blog.product?.currentPrice && (
                    <Typography
                      component="span"
                      sx={{
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      💰 {blog.product.currentPrice}
                    </Typography>
                  )}
                  <br />
                  {blog.product?.originalPrice && (
                    <Typography
                      component="span"
                      sx={{ color: "red", textDecoration: "line-through" }}
                    >
                      {blog.product.originalPrice}
                    </Typography>
                  )}
                  <br />
                  {blog.details &&
                    blog.details.map((d) => `${d.name}: ${d.value}`).join(", ")}
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
