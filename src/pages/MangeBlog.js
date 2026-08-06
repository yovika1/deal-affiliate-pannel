import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  // ListItemAvatar,
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
  // const [fetching, setFetching] = useState(false);

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
    if (!selectedProduct) return;

    try {
      const formData = new FormData();

      formData.append("productTitle", selectedProduct.productTitle);
      formData.append("category", selectedProduct.category);
      formData.append("details", JSON.stringify(selectedProduct.details));

      formData.append(
        "product",
        JSON.stringify({
          productName: selectedProduct.product.productName,
          affiliateUrl: selectedProduct.product.affiliateUrl,
          productUrl: selectedProduct.product.productUrl,
          rating:selectedProduct.product.rating,
          reviewsCount: selectedProduct.product.reviewsCount,
          discountPercent: selectedProduct.product.discountPercent,
          currentPrice: selectedProduct.product.currentPrice,
          originalPrice: selectedProduct.product.originalPrice,
          imageUrl: selectedProduct.product.imageUrl,
        }),
      );

      if (selectedProduct.imageFile) {
        formData.append("image", selectedProduct.imageFile);
      }

      await axios.put(`${API_BASE}/update/${selectedProduct._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setOpen(false);
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Update failed");
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
            <Avatar
              src={
                blog.product?.imageUrl?.startsWith("http")
                  ? blog.product.imageUrl
                  : blog.product?.imageUrl
                    ? `${API_BASE}${blog.product.imageUrl}`
                    : ""
              }
              alt={blog.product?.productName}
              variant="square"
              sx={{ width: 60, height: 60, mr: 2 }}
            />

            <ListItemText
              primary={
                blog.product?.productName || blog.productTitle || "Unnamed"
              }
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
